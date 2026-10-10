import { useEffect, useState } from 'react'
import { TbArrowUpRight, TbBrandWhatsapp, TbBuilding, TbClock, TbMapPin } from 'react-icons/tb'
import { ContactForm } from '../components/contact/ContactForm'
import { PageTransition } from '../components/layout/PageTransition'
import { CopyEmail } from '../components/ui/CopyEmail'
import { Magnetic } from '../components/ui/Magnetic'
import { PageHeader } from '../components/ui/PageHeader'
import { Reveal } from '../components/ui/Reveal'
import { profile, whatsappUrl } from '../data/profile'
import { socialLinks } from '../data/social'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

function LocalTime() {
  const format = () =>
    new Intl.DateTimeFormat('pt-BR', { timeZone: profile.timezone, hour: '2-digit', minute: '2-digit' }).format(new Date())
  const [time, setTime] = useState(format)

  useEffect(() => {
    const id = setInterval(() => setTime(format()), 15_000)
    return () => clearInterval(id)
  }, [])

  return <span className="tabular-nums">{time}</span>
}

const channels = socialLinks.filter((s) => s.id !== 'whatsapp')

export default function Contact() {
  useDocumentTitle('Contato')

  return (
    <PageTransition>
      <PageHeader
        label="contato"
        title="Vamos conversar?"
        lead="Projetos, oportunidades, parcerias ou uma troca de ideias sobre tecnologia e IA. Para algo rápido, me chame no WhatsApp."
      />

      <section className="container-x grid gap-12 pb-32 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="flex flex-col gap-6">
          <Reveal>
            <Magnetic strength={0.12} className="w-full">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="group relative flex items-center justify-between gap-4 overflow-hidden rounded-2xl border border-ok/30 bg-ok/[0.07] p-5 transition-colors hover:bg-ok/[0.12]"
              >
                <span className="flex items-center gap-4">
                  <span className="grid size-12 place-items-center rounded-xl bg-ok text-2xl text-ink">
                    <TbBrandWhatsapp aria-hidden />
                  </span>
                  <span>
                    <span className="block font-display text-lg font-semibold">Chamar no WhatsApp</span>
                    <span className="block text-sm text-muted">{profile.whatsapp.display} · resposta mais rápida</span>
                  </span>
                </span>
                <TbArrowUpRight
                  aria-hidden
                  className="text-xl text-ok transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </Magnetic>
          </Reveal>

          <Reveal>
            <p className="mb-3 font-mono text-xs uppercase tracking-wider text-faint">E-mail · clique para copiar</p>
            <CopyEmail className="w-full justify-between" />
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {channels.map((c, i) => (
              <Reveal key={c.id} delay={0.05 + i * 0.05}>
                <Magnetic strength={0.15} className="w-full">
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noreferrer"
                    className="border-gradient group flex items-center justify-between gap-4 rounded-2xl bg-ink-2/70 p-5 transition-colors hover:bg-violet/[0.06]"
                  >
                    <span className="flex items-center gap-4">
                      <span className="grid size-12 place-items-center rounded-xl bg-white/[0.04] text-2xl text-fg">
                        <c.icon aria-hidden />
                      </span>
                      <span>
                        <span className="block font-display text-lg font-semibold">{c.label}</span>
                        <span className="block text-sm text-muted">{c.description}</span>
                        <span className="block font-mono text-xs text-faint">{c.handle}</span>
                      </span>
                    </span>
                    <TbArrowUpRight
                      aria-hidden
                      className="text-xl text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan"
                    />
                  </a>
                </Magnetic>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15} className="grid gap-3 rounded-2xl border border-line p-5 text-sm text-muted">
            <p className="flex items-center gap-3">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-ok opacity-60" />
                <span className="relative inline-flex size-2.5 rounded-full bg-ok" />
              </span>
              <TbMapPin aria-hidden className="text-cyan" />
              {profile.location} · {profile.country}
            </p>
            <p className="flex items-center gap-3 pl-[22px]">
              <TbBuilding aria-hidden className="text-cyan" />
              {profile.locationNote}
            </p>
            <p className="flex items-center gap-3 pl-[22px]">
              <TbClock aria-hidden className="text-cyan" />
              <span>
                Agora são <LocalTime /> aqui
              </span>
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </section>
    </PageTransition>
  )
}
