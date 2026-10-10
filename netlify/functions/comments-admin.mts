import { APPROVED_KEY, env, json, PENDING_PREFIX, safeEqual, store, updateJSON, type ApprovedIndex, type Comment } from '../lib/store'

const EMPTY: ApprovedIndex = { comments: [] }

// Moderação do mural, protegida pela senha da variável de ambiente ADMIN_PASSWORD.
// GET: recados pendentes e aprovados. POST { action, id }: aprovar, recusar ou remover.
export default async (req: Request) => {
  const password = env('ADMIN_PASSWORD')
  if (!password) return json({ error: 'Defina a variável ADMIN_PASSWORD no Netlify para usar a moderação.' }, 503)

  const sent = req.headers.get('x-admin-password') ?? ''
  if (!(await safeEqual(sent, password))) return json({ error: 'Senha incorreta.' }, 401)

  const s = store()

  if (req.method === 'GET') {
    const { blobs } = await s.list({ prefix: PENDING_PREFIX })
    const pending = (await Promise.all(blobs.map((b) => s.get(b.key, { type: 'json' }) as Promise<Comment | null>)))
      .filter((c): c is Comment => !!c)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    const approved = ((await s.get(APPROVED_KEY, { type: 'json' })) as ApprovedIndex | null)?.comments ?? []
    return json({ pending, approved })
  }

  if (req.method !== 'POST') return json({ error: 'Método não permitido' }, 405)

  let body: { action?: string; id?: string }
  try {
    body = await req.json()
  } catch {
    return json({ error: 'Envio inválido' }, 400)
  }
  const id = typeof body.id === 'string' ? body.id : ''
  if (!/^[0-9a-f-]{36}$/i.test(id)) return json({ error: 'Recado inválido' }, 400)

  if (body.action === 'approve') {
    const comment = (await s.get(PENDING_PREFIX + id, { type: 'json' })) as Comment | null
    if (!comment) return json({ error: 'Recado não encontrado' }, 404)
    await updateJSON(APPROVED_KEY, EMPTY, (current) => ({
      comments: [comment, ...current.comments.filter((c) => c.id !== id)].sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    }))
    await s.delete(PENDING_PREFIX + id)
    return json({ ok: true })
  }

  if (body.action === 'reject') {
    await s.delete(PENDING_PREFIX + id)
    return json({ ok: true })
  }

  if (body.action === 'remove') {
    await updateJSON(APPROVED_KEY, EMPTY, (current) => ({ comments: current.comments.filter((c) => c.id !== id) }))
    return json({ ok: true })
  }

  return json({ error: 'Ação inválida' }, 400)
}
