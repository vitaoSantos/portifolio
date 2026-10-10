import { motion, useScroll, useSpring } from 'motion/react'
import { useRef } from 'react'
import { timeline, type TimelineEntry } from '../../data/experience'
import { easeOut } from '../ui/motion'

const kindStyle: Record<TimelineEntry['kind'], string> = {
  trabalho: 'border-violet/40 bg-violet/10 text-violet-soft',
  formação: 'border-cyan/40 bg-cyan/10 text-cyan-soft',
  ensino: 'border-ok/40 bg-ok/10 text-ok',
}

function Item({ entry, index }: { entry: TimelineEntry; index: number }) {
  const right = index % 2 === 1

  return (
    <li className="relative grid pl-14 lg:grid-cols-2 lg:pl-0">
      <span
        aria-hidden
        className="absolute left-[11px] top-8 grid size-[18px] place-items-center rounded-full border border-line-strong bg-ink lg:left-1/2 lg:-translate-x-1/2"
      >
        <span className="size-2 rounded-full bg-gradient-brand" />
      </span>

      <motion.article
        initial={{ opacity: 0, x: right ? 40 : -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: easeOut }}
        className={`rounded-3xl border border-line bg-ink-2/80 p-6 backdrop-blur sm:p-8 ${
          right ? 'lg:col-start-2 lg:ml-14' : 'lg:mr-14'
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-gradient font-display text-4xl font-semibold tracking-tight">{entry.year}</span>
          <span className={`rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-wider ${kindStyle[entry.kind]}`}>
            {entry.kind}
          </span>
        </div>
        <h3 className="mt-4 font-display text-xl font-semibold leading-snug">{entry.title}</h3>
        <p className="mt-1 text-sm text-muted">
          {entry.org}
          {entry.place && <> · {entry.place}</>}
        </p>
        <p className="mt-1 font-mono text-xs text-faint">{entry.period}</p>
        <p className="mt-4 leading-relaxed text-muted">{entry.description}</p>
        {entry.tags && (
          <ul className="mt-5 flex flex-wrap gap-2">
            {entry.tags.map((tag) => (
              <li key={tag} className="rounded-full border border-line px-3 py-1 text-xs text-muted">
                {tag}
              </li>
            ))}
          </ul>
        )}
      </motion.article>
    </li>
  )
}

export function Timeline() {
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 110, damping: 28 })

  return (
    <div className="relative">
      <div aria-hidden className="absolute bottom-0 left-5 top-0 w-px bg-line lg:left-1/2">
        <motion.div className="h-full w-px origin-top bg-gradient-to-b from-violet via-violet-soft to-cyan" style={{ scaleY }} />
      </div>
      <ol ref={ref} className="relative grid gap-10 lg:gap-6">
        {timeline.map((entry, i) => (
          <Item key={`${entry.org}-${entry.title}`} entry={entry} index={i} />
        ))}
      </ol>
    </div>
  )
}
