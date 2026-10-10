// Chamadas às Netlify Functions (contador de visitas e mural de recados)
const FN = '/.netlify/functions'

export type GuestComment = {
  id: string
  name: string
  role?: string
  message: string
  createdAt: string
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${FN}/${path}`, init)
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error ?? 'Não foi possível completar a ação agora.')
  return data as T
}

const VISIT_KEY = 'vs-ultima-visita'

// Conta no máximo uma visita por navegador por dia; nas outras vezes só lê o total
export async function registerVisit() {
  const today = new Date().toISOString().slice(0, 10)
  let counted = false
  try {
    counted = localStorage.getItem(VISIT_KEY) === today
    // Marca antes de enviar, para duas chamadas seguidas não contarem a mesma visita
    if (!counted) localStorage.setItem(VISIT_KEY, today)
  } catch {
    // localStorage indisponível (aba anônima, por exemplo): conta normalmente
  }
  const { total } = await request<{ total: number }>('visits', { method: counted ? 'GET' : 'POST' })
  return total
}

export async function fetchComments() {
  const { comments } = await request<{ comments: GuestComment[] }>('comments')
  return comments
}

export async function sendComment(input: { name: string; role: string; message: string; website: string; startedAt: number }) {
  await request('comments', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(input),
  })
  // Avisa por e-mail via Netlify Forms; se falhar, o recado já está salvo
  fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ 'form-name': 'recado', nome: input.name, mensagem: input.message }).toString(),
  }).catch(() => {})
}

// Moderação
const adminHeaders = (password: string) => ({ 'content-type': 'application/json', 'x-admin-password': password })

export function fetchModeration(password: string) {
  return request<{ pending: GuestComment[]; approved: GuestComment[] }>('comments-admin', { headers: adminHeaders(password) })
}

export function moderate(password: string, action: 'approve' | 'reject' | 'remove', id: string) {
  return request('comments-admin', { method: 'POST', headers: adminHeaders(password), body: JSON.stringify({ action, id }) })
}
