import { useEffect, useState, type FormEvent } from 'react'
import { TbCheck, TbLock, TbRefresh, TbTrash, TbX } from 'react-icons/tb'
import { PageTransition } from '../components/layout/PageTransition'
import { SectionLabel } from '../components/ui/SectionLabel'
import { VisitorCount } from '../components/ui/VisitorCount'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { fetchModeration, moderate, type GuestComment } from '../lib/api'

const SESSION_KEY = 'vs-admin'

function readSaved() {
  try {
    return sessionStorage.getItem(SESSION_KEY) ?? ''
  } catch {
    return ''
  }
}

function ModerationItem({
  comment,
  actions,
}: {
  comment: GuestComment
  actions: { label: string; icon: typeof TbCheck; tone: string; onClick: () => void }[]
}) {
  return (
    <li className="rounded-2xl border border-line bg-ink-2/70 p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="font-medium text-fg">
            {comment.name}
            {comment.role && <span className="text-faint"> · {comment.role}</span>}
          </p>
          <p className="font-mono text-xs text-faint">{new Date(comment.createdAt).toLocaleString('pt-BR')}</p>
        </div>
        <div className="flex gap-2">
          {actions.map((a) => (
            <button
              key={a.label}
              type="button"
              onClick={a.onClick}
              className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${a.tone}`}
            >
              <a.icon aria-hidden /> {a.label}
            </button>
          ))}
        </div>
      </div>
      <p className="mt-3 whitespace-pre-line break-words text-muted">{comment.message}</p>
    </li>
  )
}

// Moderação do mural de recados. Não aparece no menu e não é indexada.
export default function Admin() {
  useDocumentTitle('Moderação')
  const [password, setPassword] = useState(readSaved)
  const [input, setInput] = useState('')
  const [data, setData] = useState<{ pending: GuestComment[]; approved: GuestComment[] } | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex, nofollow'
    document.head.appendChild(meta)
    return () => meta.remove()
  }, [])

  async function load(pass = password) {
    setLoading(true)
    setError('')
    try {
      setData(await fetchModeration(pass))
      setPassword(pass)
      try {
        sessionStorage.setItem(SESSION_KEY, pass)
      } catch {
        // sem sessionStorage: pede a senha de novo na próxima vez
      }
    } catch (err) {
      setData(null)
      setError(err instanceof Error ? err.message : 'Não foi possível carregar.')
      if (pass === password) setPassword('')
    } finally {
      setLoading(false)
    }
  }

  // Se a senha já estava salva nesta aba, entra direto
  useEffect(() => {
    if (password) load(password)
  }, [])

  async function act(action: 'approve' | 'reject' | 'remove', id: string) {
    try {
      await moderate(password, action, id)
      await load()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível completar a ação.')
    }
  }

  function onLogin(e: FormEvent) {
    e.preventDefault()
    if (input) load(input)
  }

  return (
    <PageTransition>
      <section className="container-x min-h-[80svh] pb-24 pt-36">
        <SectionLabel>moderação</SectionLabel>
        <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight sm:text-5xl">Mural de recados</h1>

        {!data ? (
          <form onSubmit={onLogin} className="mt-10 grid max-w-md gap-4">
            <label htmlFor="admin-senha" className="text-sm text-muted">
              Senha de moderação
            </label>
            <div className="flex gap-3">
              <input
                id="admin-senha"
                type="password"
                autoComplete="current-password"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full rounded-2xl border border-line bg-white/[0.03] px-5 py-3.5 text-fg outline-none focus:border-violet/70"
              />
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 font-semibold text-ink disabled:opacity-70"
              >
                <TbLock aria-hidden /> Entrar
              </button>
            </div>
            {error && (
              <p role="alert" className="text-sm text-red-400">
                {error}
              </p>
            )}
          </form>
        ) : (
          <div className="mt-10 grid gap-14">
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
              <VisitorCount className="rounded-full border border-line px-4 py-2" />
              <button
                type="button"
                onClick={() => load()}
                className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 transition-colors hover:text-fg"
              >
                <TbRefresh aria-hidden /> Atualizar
              </button>
              {error && <span className="text-red-400">{error}</span>}
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold">Aguardando aprovação ({data.pending.length})</h2>
              {data.pending.length === 0 ? (
                <p className="mt-4 text-muted">Nenhum recado novo.</p>
              ) : (
                <ul className="mt-6 grid gap-4">
                  {data.pending.map((c) => (
                    <ModerationItem
                      key={c.id}
                      comment={c}
                      actions={[
                        { label: 'Aprovar', icon: TbCheck, tone: 'border-ok/40 text-ok hover:bg-ok/10', onClick: () => act('approve', c.id) },
                        { label: 'Recusar', icon: TbX, tone: 'border-red-400/40 text-red-300 hover:bg-red-400/10', onClick: () => act('reject', c.id) },
                      ]}
                    />
                  ))}
                </ul>
              )}
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold">Publicados ({data.approved.length})</h2>
              {data.approved.length === 0 ? (
                <p className="mt-4 text-muted">Nenhum recado publicado ainda.</p>
              ) : (
                <ul className="mt-6 grid gap-4">
                  {data.approved.map((c) => (
                    <ModerationItem
                      key={c.id}
                      comment={c}
                      actions={[
                        { label: 'Remover', icon: TbTrash, tone: 'border-red-400/40 text-red-300 hover:bg-red-400/10', onClick: () => act('remove', c.id) },
                      ]}
                    />
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </section>
    </PageTransition>
  )
}
