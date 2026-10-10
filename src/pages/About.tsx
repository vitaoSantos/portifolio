import { useInView } from 'motion/react'
import { lazy, Suspense, useRef } from 'react'
import { TbArrowUpRight, TbLanguage, TbMapPin } from 'react-icons/tb'
import { Portrait } from '../components/about/Portrait'
import { Timeline } from '../components/about/Timeline'
import { PageTransition } from '../components/layout/PageTransition'
import { PageHeader } from '../components/ui/PageHeader'
import { Reveal } from '../components/ui/Reveal'
import { SectionLabel } from '../components/ui/SectionLabel'
import { education } from '../data/experience'
import { profile } from '../data/profile'
import { skillGroups, softSkills } from '../data/skills'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const SkillsSphere = lazy(() => import('../components/three/SkillsSphere'))

function SphereSlot() {
  const ref = useRef<HTMLDivElement>(null)
  // Só carrega o 3D quando a seção está perto de aparecer
  const near = useInView(ref, { once: true, margin: '400px' })
  return (
    <div ref={ref} className="relative aspect-square w-full">
      <div aria-hidden className="absolute inset-[12%] rounded-full bg-violet/10 blur-3xl" />
      {near && (
        <Suspense fallback={null}>
          <SkillsSphere />
        </Suspense>
      )}
    </div>
  )
}

export default function About() {
  useDocumentTitle('Sobre')

  return (
    <PageTransition>
      <PageHeader
        label="sobre"
        title="Da lan house à engenharia de software com IA"
        lead="Uma trajetória construída na prática: do atendimento e manutenção de computadores a sistemas críticos, microsserviços e IA em produção."
      />

      <section className="container-x grid gap-12 pb-28 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <Portrait />
        </Reveal>

        <div>
          <Reveal>
            <SectionLabel>quem sou</SectionLabel>
          </Reveal>
          <div className="mt-6 grid gap-6 text-lg leading-relaxed text-muted">
            {profile.about.map((paragraph, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <p className={i === 0 ? 'text-xl text-fg sm:text-2xl sm:leading-snug' : ''}>{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-line bg-ink-2/70 p-5">
              <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-faint">
                <TbMapPin aria-hidden className="text-cyan" /> Localização
              </p>
              <p className="mt-2 text-fg">
                {profile.location} · {profile.country}
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-ink-2/70 p-5">
              <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-faint">
                <TbLanguage aria-hidden className="text-cyan" /> Idiomas
              </p>
              <p className="mt-2 text-fg">{profile.languages.map((l) => `${l.name} (${l.level.toLowerCase()})`).join(' · ')}</p>
            </div>
          </Reveal>

          <Reveal className="mt-8">
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
            >
              Ver perfil completo no LinkedIn
              <TbArrowUpRight aria-hidden className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </Reveal>
        </div>
      </section>

      <section className="container-x py-28">
        <Reveal className="mb-16">
          <SectionLabel>trajetória</SectionLabel>
          <h2 className="mt-5 max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Cada etapa somou <span className="text-gradient">uma peça</span>.
          </h2>
        </Reveal>
        <Timeline />
      </section>

      <section className="container-x py-28">
        <Reveal>
          <SectionLabel>skills</SectionLabel>
          <h2 className="mt-5 max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Ferramentas que uso para <span className="text-gradient">resolver problemas</span>.
          </h2>
        </Reveal>

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <SphereSlot />
            <p className="mt-2 text-center font-mono text-xs text-faint">Arraste para girar · passe o mouse nas palavras</p>
          </Reveal>

          <div className="grid gap-8 sm:grid-cols-2">
            {skillGroups.map((group, i) => (
              <Reveal key={group.title} delay={i * 0.05}>
                <h3 className="flex items-center gap-2 font-display text-lg font-semibold">
                  <span aria-hidden className="size-2 rounded-full" style={{ background: group.color }} />
                  {group.title}
                </h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item} className="rounded-full border border-line bg-white/[0.02] px-3 py-1.5 text-sm text-muted">
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x grid gap-16 py-28 lg:grid-cols-2">
        <div>
          <Reveal>
            <SectionLabel>formação</SectionLabel>
          </Reveal>
          <ul className="mt-8 grid gap-4">
            {education.map((item, i) => (
              <Reveal as="li" key={item.title} delay={i * 0.06} className="border-gradient rounded-2xl bg-ink-2/70 p-6">
                <p className="font-mono text-xs text-cyan">{item.period}</p>
                <p className="mt-2 font-display text-lg font-semibold">{item.title}</p>
                <p className="mt-1 text-sm text-muted">{item.org}</p>
              </Reveal>
            ))}
          </ul>
        </div>
        <div>
          <Reveal>
            <SectionLabel>como trabalho</SectionLabel>
          </Reveal>
          <ul className="mt-8 flex flex-wrap gap-3">
            {softSkills.map((skill, i) => (
              <Reveal
                as="li"
                key={skill}
                delay={i * 0.04}
                className="rounded-full border border-line-strong px-5 py-3 text-fg transition-colors hover:border-violet/60 hover:bg-violet/10"
              >
                {skill}
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </PageTransition>
  )
}
