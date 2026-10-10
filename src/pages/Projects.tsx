import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { TbArrowUpRight, TbLock, TbShieldLock, TbWorld } from 'react-icons/tb'
import { Link } from 'react-router'
import { PageTransition } from '../components/layout/PageTransition'
import { ProjectCover } from '../components/projects/ProjectCover'
import { easeOut } from '../components/ui/motion'
import { SoloBadge } from '../components/projects/SoloBadge'
import { PageHeader } from '../components/ui/PageHeader'
import { TiltCard } from '../components/ui/TiltCard'
import { linkHost, projectCategories, projects, type Project, type ProjectCategory } from '../data/projects'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

type Filter = 'Todos' | ProjectCategory

function ProjectCard({ project }: { project: Project }) {
  return (
    <TiltCard className="border-gradient rounded-[28px] bg-ink-2" max={5}>
      <Link to={`/projetos/${project.slug}`} className="block overflow-hidden rounded-[28px]">
        <ProjectCover project={project} className="aspect-[16/10]" />
        <div className="p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <span className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-wider text-cyan">{project.category}</span>
              {project.solo && <SoloBadge />}
            </span>
            {project.link ? (
              <span className="flex items-center gap-1.5 text-xs text-faint">
                <TbWorld aria-hidden /> {linkHost(project.link)}
              </span>
            ) : project.internal ? (
              <span className="flex items-center gap-1.5 text-xs text-faint">
                <TbShieldLock aria-hidden /> Sistema interno
              </span>
            ) : (
              project.privateCode && (
                <span className="flex items-center gap-1.5 text-xs text-faint">
                  <TbLock aria-hidden /> Código privado
                </span>
              )
            )}
          </div>
          <h2 className="mt-3 flex items-start justify-between gap-4 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            {project.title}
            <TbArrowUpRight
              aria-hidden
              className="mt-1 shrink-0 text-muted transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-cyan"
            />
          </h2>
          <p className="mt-3 leading-relaxed text-muted">{project.summary}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li key={tag} className="rounded-full border border-line px-3 py-1 text-xs text-muted">
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </Link>
    </TiltCard>
  )
}

export default function Projects() {
  useDocumentTitle('Projetos')
  const [filter, setFilter] = useState<Filter>('Todos')

  // Só mostra filtros de categorias que têm projetos
  const filters: Filter[] = ['Todos', ...projectCategories.filter((c) => projects.some((p) => p.category === c))]
  const visible = filter === 'Todos' ? projects : projects.filter((p) => p.category === filter)

  return (
    <PageTransition>
      <PageHeader
        label="projetos"
        title="Projetos"
        lead="Produtos reais, no ar e usados por clientes: plataformas, e-commerce, comunidades e soluções com IA. São projetos corporativos, então o código não é público, mas a maioria você pode visitar."
      />

      <section className="container-x pb-32">
        <div role="group" aria-label="Filtrar por categoria" className="mb-12 flex flex-wrap gap-2">
          {filters.map((f) => {
            const active = f === filter
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={active}
                className={`relative rounded-full border px-5 py-2.5 text-sm transition-colors ${
                  active ? 'border-transparent text-ink' : 'border-line-strong text-muted hover:text-fg'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="project-filter"
                    className="absolute inset-0 rounded-full bg-gradient-brand"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative font-medium">{f}</span>
              </button>
            )
          })}
        </div>

        <motion.ul layout className="grid gap-8 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {visible.map((project, i) => (
              <motion.li
                key={project.slug}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: easeOut, delay: i * 0.06 }}
              >
                <ProjectCard project={project} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </section>
    </PageTransition>
  )
}
