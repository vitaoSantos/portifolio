import { getStore } from '@netlify/blobs'
// Traz a declaração do objeto global Netlify (Netlify.env)
import type {} from '@netlify/functions'

// Armazenamento chave-valor do próprio Netlify (Netlify Blobs), sem banco de dados para manter
export const store = () => getStore({ name: 'portfolio', consistency: 'strong' })

export type Comment = {
  id: string
  name: string
  role?: string
  message: string
  createdAt: string
}

export type ApprovedIndex = { comments: Comment[] }

export const APPROVED_KEY = 'comments/approved'
export const PENDING_PREFIX = 'comments/pending/'

// Lê, altera e grava um JSON com controle de concorrência (etag): se outra requisição
// gravou no meio do caminho, tenta de novo com o valor atualizado
export async function updateJSON<T>(key: string, fallback: T, update: (current: T) => T, attempts = 6): Promise<T> {
  const s = store()
  for (let i = 0; i < attempts; i++) {
    const entry = await s.getWithMetadata(key, { type: 'json' })
    const next = update((entry?.data as T | undefined) ?? fallback)
    const result = !entry
      ? await s.setJSON(key, next, { onlyIfNew: true })
      : entry.etag
        ? await s.setJSON(key, next, { onlyIfMatch: entry.etag })
        : await s.setJSON(key, next)
    if (result.modified) return next
  }
  throw new Error('Conflito ao gravar, tente novamente')
}

export function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  })
}

export async function sha256(text: string) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
  return new Uint8Array(digest)
}

// Comparação em tempo constante para não vazar a senha pelo tempo de resposta
export async function safeEqual(a: string, b: string) {
  const [ha, hb] = await Promise.all([sha256(a), sha256(b)])
  let diff = 0
  for (let i = 0; i < ha.length; i++) diff |= ha[i] ^ hb[i]
  return diff === 0
}

export function env(name: string) {
  return typeof Netlify !== 'undefined' ? Netlify.env.get(name) : undefined
}
