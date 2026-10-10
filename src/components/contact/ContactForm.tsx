import { useState, type FormEvent } from 'react'
import { TbCheck, TbSend } from 'react-icons/tb'
import { profile } from '../../data/profile'

type Status = 'idle' | 'sending' | 'sent' | 'error'
type Fields = { nome: string; email: string; mensagem: string }
type Errors = Partial<Record<keyof Fields, string>>

function validate(values: Fields): Errors {
  const errors: Errors = {}
  if (!values.nome.trim()) errors.nome = 'Digite seu nome.'
  if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) errors.email = 'Digite um e-mail válido.'
  if (values.mensagem.trim().length < 10) errors.mensagem = 'Escreva uma mensagem com pelo menos 10 caracteres.'
  return errors
}

// Envia para o Netlify Forms (o formulário estático está no index.html)
export function ContactForm() {
  const [values, setValues] = useState<Fields>({ nome: '', email: '', mensagem: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')

  function update(field: keyof Fields, value: string) {
    setValues((v) => ({ ...v, [field]: value }))
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }))
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length) return

    const honeypot = new FormData(e.currentTarget).get('bot-field')
    setStatus('sending')
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ 'form-name': 'contato', 'bot-field': String(honeypot ?? ''), ...values }).toString(),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('sent')
      setValues({ nome: '', email: '', mensagem: '' })
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div role="status" className="flex h-full flex-col items-center justify-center rounded-[28px] border border-ok/30 bg-ok/5 p-10 text-center">
        <span className="grid size-16 place-items-center rounded-full bg-ok/15 text-3xl text-ok">
          <TbCheck aria-hidden />
        </span>
        <p className="mt-6 font-display text-2xl font-semibold">Mensagem enviada</p>
        <p className="mt-2 text-muted">Obrigado pelo contato. Respondo assim que possível.</p>
        <button type="button" onClick={() => setStatus('idle')} className="mt-8 text-sm text-cyan hover:underline">
          Enviar outra mensagem
        </button>
      </div>
    )
  }

  const field =
    'w-full rounded-2xl border bg-white/[0.03] px-5 py-4 text-fg placeholder:text-faint outline-none transition-colors focus:border-violet/70 focus:bg-violet/[0.06]'

  return (
    <form name="contato" method="POST" onSubmit={onSubmit} noValidate className="border-gradient grid gap-5 rounded-[28px] bg-ink-2/70 p-6 sm:p-8">
      <p hidden>
        <label>
          Não preencha: <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="nome" className="mb-2 block text-sm text-muted">
            Nome
          </label>
          <input
            id="nome"
            name="nome"
            autoComplete="name"
            placeholder="Seu nome"
            value={values.nome}
            onChange={(e) => update('nome', e.target.value)}
            aria-invalid={!!errors.nome}
            aria-describedby={errors.nome ? 'nome-erro' : undefined}
            className={`${field} ${errors.nome ? 'border-red-400/70' : 'border-line'}`}
          />
          {errors.nome && (
            <p id="nome-erro" className="mt-2 text-sm text-red-400">
              {errors.nome}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm text-muted">
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="voce@empresa.com"
            value={values.email}
            onChange={(e) => update('email', e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-erro' : undefined}
            className={`${field} ${errors.email ? 'border-red-400/70' : 'border-line'}`}
          />
          {errors.email && (
            <p id="email-erro" className="mt-2 text-sm text-red-400">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="mensagem" className="mb-2 block text-sm text-muted">
          Mensagem
        </label>
        <textarea
          id="mensagem"
          name="mensagem"
          rows={6}
          placeholder="Conte um pouco sobre o projeto ou a oportunidade"
          value={values.mensagem}
          onChange={(e) => update('mensagem', e.target.value)}
          aria-invalid={!!errors.mensagem}
          aria-describedby={errors.mensagem ? 'mensagem-erro' : undefined}
          className={`${field} resize-none ${errors.mensagem ? 'border-red-400/70' : 'border-line'}`}
        />
        {errors.mensagem && (
          <p id="mensagem-erro" className="mt-2 text-sm text-red-400">
            {errors.mensagem}
          </p>
        )}
      </div>

      {status === 'error' && (
        <p role="alert" className="rounded-2xl border border-red-400/30 bg-red-400/5 px-5 py-4 text-sm text-red-300">
          Não foi possível enviar agora. Me escreva direto em{' '}
          <a href={`mailto:${profile.email}`} className="underline">
            {profile.email}
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-brand px-7 py-4 font-semibold text-ink transition-[filter,opacity] hover:brightness-110 disabled:opacity-70"
      >
        {status === 'sending' ? 'Enviando…' : 'Enviar mensagem'}
        <TbSend aria-hidden className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </button>
    </form>
  )
}
