import { TbArrowRight, TbBrandWhatsapp } from 'react-icons/tb'
import { Link } from 'react-router'
import { whatsappUrl } from '../../data/profile'
import { CopyEmail } from '../ui/CopyEmail'
import { Magnetic } from '../ui/Magnetic'
import { Reveal } from '../ui/Reveal'
import { SectionLabel } from '../ui/SectionLabel'

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-32 sm:py-44">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 size-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet/[0.12] blur-[120px]"
      />
      <Reveal className="container-x relative flex flex-col items-center text-center">
        <SectionLabel>vamos conversar</SectionLabel>
        <h2 className="mt-8 max-w-5xl font-display text-[clamp(2.75rem,8vw,7rem)] font-semibold leading-[0.95] tracking-tight">
          Vamos construir algo <span className="text-gradient">juntos?</span>
        </h2>
        <p className="mt-8 max-w-xl text-lg text-muted">
          Projetos, oportunidades ou uma boa conversa sobre tecnologia e IA. Me chame no WhatsApp ou mande um e-mail.
        </p>
        <div className="mt-12 flex flex-col items-center gap-5 sm:flex-row">
          <Magnetic>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-brand px-7 py-3.5 font-semibold text-ink transition-[filter] hover:brightness-110"
            >
              <TbBrandWhatsapp aria-hidden className="text-lg" />
              Chamar no WhatsApp
            </a>
          </Magnetic>
          <CopyEmail />
        </div>
        <Link to="/contato" className="group mt-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg">
          Ver todos os canais de contato
          <TbArrowRight aria-hidden className="transition-transform group-hover:translate-x-1" />
        </Link>
      </Reveal>
    </section>
  )
}
