import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState, type FormEvent } from 'react'
import { TbCheck, TbMessageCircle, TbSend } from 'react-icons/tb'
import { fetchComments, sendComment, type GuestComment } from '../../lib/api'
import { easeOut } from '../ui/motion'
import { Reveal } from '../ui/Reveal'
import { SectionLabel } from '../ui/SectionLabel'
import { VisitorCount } from '../ui/VisitorCount'

const PAGE = 6
const MAX = { name: 60, role: 60, message: 500 }

const relativeTime = new Intl.RelativeTimeFormat('pt-BR', { numeric: 'auto' })

function timeAgo(iso: string) {
  const seconds = (new Date(iso).getTime() - Date.now()) / 1000
  const steps: [Intl.RelativeTimeFormatUnit, number][] = [
    ['year', 31536000],
    ['month', 2592000],
    ['week', 604800],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
  ]
  for (const [unit, size] of steps) {
    if (Math.abs(seconds) >= size) return relativeTime.format(Math.round(seconds / size), unit)
  }
  return 'agora mesmo'
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('')
}

function CommentCard({ comment }: { comment: GuestComment }) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: easeOut }}
      className="border-gradient rounded-2xl bg-ink-2/70 p-5"
    >
      <div className="flex items-center gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-gradient-brand text-sm font-semibold text-ink">
          {initials(comment.name)}
        </span>
        <div className="min-w-0">
          <p className="truncate font-medium text-fg">{comment.name}</p>
          <p className="truncate text-xs text-faint">
            {comment.role ? `${comment.role} · ` : ''}
            {timeAgo(comment.createdAt)}
          </p>
        </div>
      </div>
      <p className="mt-4 whitespace-pre-line break-words leading-relaxed text-muted">{comment.message}</p>
    </motion.li>
  )
}

type Status = 'idle' | 'sending' | 'sent' | 'error'

function GuestForm() {
  const [values, setValues] = useState({ name: '', role: '', message: '' })
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const startedAt = useRef(Date.now())
  const honeypot = useRef<HTMLInputElement>(null)

  function update(field: keyof typeof values, value: string) {
    setValues((v) => ({ ...v, [field]: value }))
    if (error) setError('')
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (values.name.trim().length < 2) return setError('Digite seu nome.')
    if (values.message.trim().length < 3) return setError('Escreva uma mensagem.')
    setStatus('sending')
    try {
      await sendComment({ ...values, website: honeypot.current?.value ?? '', startedAt: startedAt.current })
      setStatus('sent')
      setValues({ name: '', role: '', message: '' })
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Não foi possível enviar agora.')
    }
  }

  if (status === 'sent') {
    return (
      <div role="status" className="flex flex-col items-center rounded-3xl border border-ok/30 bg-ok/5 p-8 text-center">
        <span className="grid size-14 place-items-center rounded-full bg-ok/15 text-2xl text-ok">
          <TbCheck aria-hidden />
        </span>
        <p className="mt-5 font-display text-xl font-semibold">Recado recebido!</p>
        <p className="mt-2 text-muted">Obrigado. Ele aparece no mural assim que eu aprovar.</p>
        <button
          type="button"
          onClick={() => {
            startedAt.current = Date.now()
            setStatus('idle')
          }}
          className="mt-6 text-sm text-cyan hover:underline"
        >
          Deixar outro recado
        </button>
      </div>
    )
  }

  const field =
    'w-full rounded-2xl border border-line bg-white/[0.03] px-5 py-3.5 text-fg placeholder:text-faint outline-none transition-colors focus:border-violet/70 focus:bg-violet/[0.06]'

  return (
    <form onSubmit={onSubmit} noValidate className="border-gradient grid gap-4 rounded-3xl bg-ink-2/70 p-6 sm:p-7">
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Não preencha
          <input ref={honeypot} name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="mural-nome" className="mb-2 block text-sm text-muted">
            Nome
          </label>
          <input
            id="mural-nome"
            autoComplete="name"
            maxLength={MAX.name}
            placeholder="Seu nome"
            value={values.name}
            onChange={(e) => update('name', e.target.value)}
            className={field}
          />
        </div>
        <div>
          <label htmlFor="mural-papel" className="mb-2 block text-sm text-muted">
            O que você faz <span className="text-faint">(opcional)</span>
          </label>
          <input
            id="mural-papel"
            maxLength={MAX.role}
            placeholder="Ex.: dev, aluno"
            value={values.role}
            onChange={(e) => update('role', e.target.value)}
            className={field}
          />
        </div>
      </div>
      <div>
        <label htmlFor="mural-mensagem" className="mb-2 flex items-center justify-between text-sm text-muted">
          Mensagem
          <span className="font-mono text-xs text-faint">
            {values.message.length}/{MAX.message}
          </span>
        </label>
        <textarea
          id="mural-mensagem"
          rows={4}
          maxLength={MAX.message}
          placeholder="Conte o que achou, mande um oi ou uma ideia"
          value={values.message}
          onChange={(e) => update('message', e.target.value)}
          className={`${field} resize-none`}
        />
      </div>
      {error && (
        <p role="alert" className="text-sm text-red-400">
          {error}
        </p>
      )}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-xs text-faint">Os recados aparecem depois de aprovados.</p>
        <button
          type="submit"
          disabled={status === 'sending'}
          className="group inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 font-semibold text-ink transition-[filter,opacity] hover:brightness-110 disabled:opacity-70"
        >
          {status === 'sending' ? 'Enviando…' : 'Enviar recado'}
          <TbSend aria-hidden className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </button>
      </div>
    </form>
  )
}

export function Guestbook() {
  const [comments, setComments] = useState<GuestComment[] | null>(null)
  const [failed, setFailed] = useState(false)
  const [visible, setVisible] = useState(PAGE)

  useEffect(() => {
    let active = true
    fetchComments()
      .then((list) => active && setComments(list))
      .catch(() => active && setFailed(true))
    return () => {
      active = false
    }
  }, [])

  return (
    <section id="mural" className="container-x py-28 sm:py-36">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <SectionLabel>mural de recados</SectionLabel>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Deixe seu <span className="text-gradient">recado</span>.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              Passou por aqui? Conte o que achou do portfólio, mande um oi ou compartilhe uma ideia.
            </p>
            <VisitorCount className="mt-6 rounded-full border border-line px-4 py-2 text-sm text-muted" />
          </Reveal>
          <Reveal className="mt-8" delay={0.1}>
            <GuestForm />
          </Reveal>
        </div>

        <div>
          {comments === null && !failed && (
            <ul className="grid gap-4 sm:grid-cols-2" aria-hidden>
              {Array.from({ length: 4 }, (_, i) => (
                <li key={i} className="h-36 animate-pulse rounded-2xl border border-line bg-white/[0.02]" />
              ))}
            </ul>
          )}

          {failed && (
            <p className="rounded-2xl border border-line p-6 text-muted">Não foi possível carregar os recados agora.</p>
          )}

          {comments && comments.length === 0 && (
            <Reveal className="flex h-full min-h-64 flex-col items-center justify-center rounded-3xl border border-dashed border-line-strong p-10 text-center">
              <span className="grid size-14 place-items-center rounded-2xl bg-violet/15 text-2xl text-violet-soft">
                <TbMessageCircle aria-hidden />
              </span>
              <p className="mt-5 font-display text-xl font-semibold">O mural está esperando o primeiro recado</p>
              <p className="mt-2 max-w-sm text-muted">Que tal ser a primeira pessoa a deixar uma mensagem?</p>
            </Reveal>
          )}

          {comments && comments.length > 0 && (
            <>
              <ul className="grid gap-4 sm:grid-cols-2">
                <AnimatePresence initial={false}>
                  {comments.slice(0, visible).map((c) => (
                    <CommentCard key={c.id} comment={c} />
                  ))}
                </AnimatePresence>
              </ul>
              {visible < comments.length && (
                <div className="mt-8 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setVisible((v) => v + PAGE)}
                    className="rounded-full border border-line-strong px-6 py-3 text-sm font-medium text-fg transition-colors hover:border-violet/60 hover:bg-violet/10"
                  >
                    Ver mais recados
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  )
}
