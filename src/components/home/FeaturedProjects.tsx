import { motion, useScroll, useTransform } from 'motion/react'
import { useLayoutEffect, useRef, useState } from 'react'
import { TbArrowRight, TbArrowUpRight } from 'react-icons/tb'
import { Link } from 'react-router'
import { featuredProjects, type Project } from '../../data/projects'
import { useIsDesktop, useReducedMotion } from '../../hooks/useMediaQuery'
import { ProjectCover } from '../projects/ProjectCover'
import { Reveal } from '../ui/Reveal'
import { SectionLabel } from '../ui/SectionLabel'

function Header() {
  return (
    <div className="container-x flex flex-wrap items-end justify-between gap-6">
      <div>
        <SectionLabel>projetos em destaque</SectionLabel>
        <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Coisas que <span className="text-gradient">construí</span>
        </h2>
      </div>
      <Link to="/projetos" className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg">
        Ver todos os projetos
        <TbArrowRight aria-hidden className="transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  )
}

function FeaturedCard({ project, index }: { project: Project; index: number }) {
  return (
    <Link
      to={`/projetos/${project.slug}`}
      className="border-gradient group relative block w-[min(78vw,880px)] shrink-0 overflow-hidden rounded-[28px] bg-ink-2"
    >
      <ProjectCover project={project} className="aspect-[16/10]" />
      <div className="relative p-5 sm:absolute sm:inset-x-0 sm:bottom-0 sm:bg-gradient-to-t sm:from-ink sm:via-ink/85 sm:to-transparent sm:p-9 sm:pt-32">
        <div className="flex items-end justify-between gap-6">
          <div>
            <span className="font-mono text-xs text-cyan">
              {String(index + 1).padStart(2, '0')} · {project.category}
              {project.solo && ' · Projeto individual'}
            </span>
            <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight sm:text-4xl">{project.title}</h3>
            <p className="mt-2 max-w-xl text-sm text-muted sm:text-base">{project.summary}</p>
          </div>
          <span className="hidden size-14 shrink-0 place-items-center rounded-full border border-line-strong transition-colors duration-300 group-hover:border-transparent group-hover:bg-gradient-brand group-hover:text-ink sm:grid">
            <TbArrowUpRight aria-hidden className="text-2xl" />
          </span>
        </div>
      </div>
    </Link>
  )
}

function SeeAllCard() {
  return (
    <Link
      to="/projetos"
      className="group grid w-[min(60vw,420px)] shrink-0 place-items-center rounded-[28px] border border-dashed border-line-strong text-center transition-colors hover:border-violet/60"
    >
      <div>
        <span className="mx-auto grid size-20 place-items-center rounded-full bg-gradient-brand text-ink transition-transform duration-500 group-hover:rotate-45">
          <TbArrowUpRight aria-hidden className="text-3xl" />
        </span>
        <p className="mt-6 font-display text-2xl font-semibold">Ver todos os projetos</p>
      </div>
    </Link>
  )
}

export function FeaturedProjects() {
  const desktop = useIsDesktop()
  const reduced = useReducedMotion()
  const section = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)
  const horizontal = desktop && !reduced

  // Distância que a faixa precisa andar para mostrar todos os cards
  useLayoutEffect(() => {
    if (!horizontal) return
    const measure = () => {
      if (track.current) setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [horizontal])

  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance])

  if (!horizontal) {
    return (
      <section className="py-24">
        <Header />
        <div className="container-x mt-12 grid gap-8">
          {featuredProjects.map((p, i) => (
            <Reveal key={p.slug}>
              <div className="[&>a]:w-full">
                <FeaturedCard project={p} index={i} />
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section ref={section} className="relative" style={{ height: `calc(100vh + ${distance}px)` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center gap-12 overflow-hidden">
        <Header />
        <motion.div
          ref={track}
          style={{ x }}
          className="flex w-max items-stretch gap-8 pl-[max(2rem,calc((100vw-80rem)/2+2rem))] pr-[8vw]"
        >
          {featuredProjects.map((p, i) => (
            <FeaturedCard key={p.slug} project={p} index={i} />
          ))}
          <SeeAllCard />
        </motion.div>
        <div className="container-x">
          <div className="h-px w-full bg-line">
            <motion.div className="h-px origin-left bg-gradient-brand" style={{ scaleX: scrollYProgress }} />
          </div>
        </div>
      </div>
    </section>
  )
}
