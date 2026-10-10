import type { Context } from '@netlify/functions'
import { APPROVED_KEY, env, json, PENDING_PREFIX, sha256, store, type ApprovedIndex, type Comment } from '../lib/store'

const LIMITS = { name: 60, role: 60, message: 500 }
const RATE_WINDOW_MS = 60_000

// Remove caracteres de controle e espaços repetidos
function clean(value: unknown, max: number) {
  if (typeof value !== 'string') return ''
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
    .slice(0, max)
}

async function ipKey(ip: string) {
  const bytes = await sha256(`${ip}:${env('ADMIN_PASSWORD') ?? 'mural'}`)
  return 'rate/' + Array.from(bytes.slice(0, 12), (b) => b.toString(16).padStart(2, '0')).join('')
}

// GET: lista os recados aprovados. POST: recebe um recado novo, que fica pendente até ser aprovado.
export default async (req: Request, context: Context) => {
  const s = store()

  if (req.method === 'GET') {
    const data = (await s.get(APPROVED_KEY, { type: 'json' })) as ApprovedIndex | null
    return json({ comments: data?.comments ?? [] })
  }

  if (req.method !== 'POST') return json({ error: 'Método não permitido' }, 405)

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return json({ error: 'Envio inválido' }, 400)
  }

  // Armadilhas para robôs: campo escondido preenchido ou envio rápido demais.
  // Respondemos como sucesso para o robô não perceber que foi barrado.
  const startedAt = Number(body.startedAt)
  if (clean(body.website, 200) || !Number.isFinite(startedAt) || Date.now() - startedAt < 3000) {
    return json({ ok: true }, 201)
  }

  const name = clean(body.name, LIMITS.name)
  const role = clean(body.role, LIMITS.role)
  const message = clean(body.message, LIMITS.message)
  if (name.length < 2) return json({ error: 'Digite seu nome.' }, 400)
  if (message.length < 3) return json({ error: 'Escreva uma mensagem.' }, 400)

  const rateKey = await ipKey(context.ip ?? 'desconhecido')
  const last = (await s.get(rateKey, { type: 'json' })) as { at: number } | null
  if (last && Date.now() - last.at < RATE_WINDOW_MS) {
    return json({ error: 'Você acabou de enviar um recado. Aguarde um minuto para mandar outro.' }, 429)
  }

  const comment: Comment = {
    id: crypto.randomUUID(),
    name,
    ...(role ? { role } : {}),
    message,
    createdAt: new Date().toISOString(),
  }

  await s.setJSON(PENDING_PREFIX + comment.id, comment)
  await s.setJSON(rateKey, { at: Date.now() })
  return json({ ok: true }, 201)
}
