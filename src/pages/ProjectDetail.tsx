import { useInView } from 'motion/react'
import { lazy, Suspense, useRef } from 'react'
import { TbArrowLeft, TbArrowRight, TbArrowUpRight, TbBrandGithub, TbLock, TbShieldLock } from 'react-icons/tb'
import { Link, useParams } from 'react-router'
import { PageTransition } from '../components/layout/PageTransition'
import { ProjectCover } from '../components/projects/ProjectCover'
import { SoloBadge } from '../components/projects/SoloBadge'
import { Magnetic } from '../components/ui/Magnetic'
import { PageHeader } from '../components/ui/PageHeader'
import { Reveal } from '../components/ui/Reveal'
import { SectionLabel } from '../components/ui/SectionLabel'
import { linkHost, projects, type Project } from '../data/projects'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import NotFound from './NotFound'

const PokerScene = lazy(() => import('../components/three/PokerScene'))

function SceneSlot() {
  const ref = useRef<HTMLDivElement>(null)
  const near = useInView(ref, { once: true, margin: '300px' })
  return (
    <div ref={ref} className="border-gradient relative aspect-[16/10] overflow-hidden rounded-[28px] bg-ink-2 sm:aspect-[16/8]">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_80%,rgb(139_92_246/0.22),transparent_60%)]" />
      {near && (
        <Suspense fallback={null}>
          <PokerScene />
        </Suspense>
      )}
      <span className="absolute bottom-4 left-5 font-mono text-[11px] uppercase tracking-wider text-faint">Cena 3D · mova o mouse</span>
    </div>
  )
}

function Access({ project }: { project: Project }) {
  if (project.link) {
    return (
      <a href={project.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-cyan">
        {linkHost(project.link)} <TbArrowUpRight aria-hidden />
      </a>
    )
  }
  if (project.internal) {
    return (
      <span className="inline-flex items-center gap-2 text-muted">
        <TbShieldLock aria-hidden /> Sistema interno, sem acesso público
      </span>
    )
  }
  return <span className="text-muted">Não publicado</span>
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const index = projects.findIndex((p) => p.slug === slug)
  const project = projects[index]
  useDocumentTitle(project?.title ?? 'Projeto não encontrado')

  if (!project) return <NotFound />

  const next = projects[(index + 1) % projects.length]

  return (
    <PageTransition>
      <div className="container-x pt-32">
        <Link to="/projetos" className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg">
          <TbArrowLeft aria-hidden className="transition-transform group-hover:-translate-x-1" />
          Todos os projetos
        </Link>
      </div>

      <div className="[&>header]:pt-10 [&>header]:sm:pt-12">
        <PageHeader label={project.category.toLowerCase()} title={project.title} lead={project.summary} />
      </div>

      <section className="container-x">
        <Reveal>
          <dl className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-ink-2 p-5">
              <dt className="font-mono text-xs uppercase tracking-wider text-faint">Função</dt>
              <dd className="mt-2 flex flex-wrap items-center gap-2 text-fg">
                {project.role}
                {project.solo && <SoloBadge />}
              </dd>
            </div>
            <div className="bg-ink-2 p-5">
              <dt className="font-mono text-xs uppercase tracking-wider text-faint">Tecnologias</dt>
              <dd className="mt-2 text-fg">{project.tags.join(' · ')}</dd>
            </div>
            <div className="bg-ink-2 p-5">
              <dt className="font-mono text-xs uppercase tracking-wider text-faint">Acesso</dt>
              <dd className="mt-2 text-fg">
                <Access project={project} />
              </dd>
            </div>
            <div className="bg-ink-2 p-5">
              <dt className="font-mono text-xs uppercase tracking-wider text-faint">Código</dt>
              <dd className="mt-2 text-fg">
                {project.github ? (
                  <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-cyan">
                    <TbBrandGithub aria-hidden /> Repositório
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 text-muted">
                    <TbLock aria-hidden /> Privado (projeto corporativo)
                  </span>
                )}
              </dd>
            </div>
          </dl>
        </Reveal>

        <Reveal className="mt-10">
          {project.scene === 'poker' ? (
            <SceneSlot />
          ) : (
            <div className="border-gradient group overflow-hidden rounded-[28px]">
              <ProjectCover project={project} className="aspect-[16/10]" />
            </div>
          )}
        </Reveal>

        <div className="grid gap-16 py-24 lg:grid-cols-2">
          <Reveal>
            <SectionLabel>sobre o projeto</SectionLabel>
            <p className="mt-6 text-xl leading-relaxed text-fg">{project.about}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionLabel>minha atuação</SectionLabel>
            <ul className="mt-6 grid gap-4">
              {project.contributions.map((item) => (
                <li key={item} className="flex gap-4 leading-relaxed text-muted">
                  <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-gradient-brand" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal>
          <SectionLabel>destaques</SectionLabel>
        </Reveal>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {project.highlights.map((item, i) => (
            <Reveal as="li" key={item} delay={i * 0.05} className="border-gradient rounded-2xl bg-ink-2/70 p-6">
              <span className="font-mono text-xs text-cyan">{String(i + 1).padStart(2, '0')}</span>
              <p className="mt-3 leading-relaxed text-fg">{item}</p>
            </Reveal>
          ))}
        </ul>

        {project.scene && (
          <Reveal className="mt-24">
            <SectionLabel>no ar</SectionLabel>
            <div className="border-gradient group mt-8 overflow-hidden rounded-[28px]">
              <ProjectCover project={project} className="aspect-[16/10]" />
            </div>
          </Reveal>
        )}

        {(project.link || project.github) && (
          <Reveal className="flex flex-wrap gap-4 pt-16">
            {project.link && (
              <Magnetic>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-7 py-4 font-semibold text-ink transition-[filter] hover:brightness-110"
                >
                  Ver o site <TbArrowUpRight aria-hidden />
                </a>
              </Magnetic>
            )}
            {project.github && (
              <Magnetic>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-line-strong px-7 py-4 font-medium"
                >
                  <TbBrandGithub aria-hidden /> Ver código
                </a>
              </Magnetic>
            )}
          </Reveal>
        )}

        {next && next.slug !== project.slug && (
          <Link to={`/projetos/${next.slug}`} className="group mb-24 mt-24 flex items-center justify-between gap-6 border-t border-line pt-10">
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-faint">Próximo projeto</p>
              <p className="mt-2 font-display text-3xl font-semibold tracking-tight transition-colors group-hover:text-cyan sm:text-5xl">
                {next.title}
              </p>
            </div>
            <span className="grid size-14 shrink-0 place-items-center rounded-full border border-line-strong transition-colors group-hover:border-transparent group-hover:bg-gradient-brand group-hover:text-ink sm:size-20">
              <TbArrowRight aria-hidden className="text-2xl" />
            </span>
          </Link>
        )}
      </section>
    </PageTransition>
  )
}
