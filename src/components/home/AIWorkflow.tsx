import { motion, useScroll, useSpring, useTransform, type MotionValue } from 'motion/react'
import { useRef } from 'react'
import type { IconType } from 'react-icons'
import { SiClaude } from 'react-icons/si'
import { TbBolt, TbRobot, TbSparkles } from 'react-icons/tb'
import { aiWorkflow } from '../../data/profile'
import { Reveal } from '../ui/Reveal'
import { SectionLabel } from '../ui/SectionLabel'

const icons: IconType[] = [SiClaude, TbSparkles, TbRobot, TbBolt]

function Step({ index, progress }: { index: number; progress: MotionValue<number> }) {
  const step = aiWorkflow[index]
  const Icon = icons[index]
  const threshold = index / (aiWorkflow.length - 1)
  const opacity = useTransform(progress, [threshold - 0.25, threshold], [0.35, 1])
  const glow = useTransform(progress, [threshold - 0.1, threshold], [0, 1])

  return (
    <motion.li style={{ opacity }} className="relative flex gap-5 lg:flex-col lg:gap-6">
      <div className="relative grid size-14 shrink-0 place-items-center rounded-2xl border border-line-strong bg-ink-2">
        <motion.span
          aria-hidden
          style={{ opacity: glow }}
          className="absolute inset-0 rounded-2xl bg-gradient-brand shadow-[0_0_40px_-4px_rgb(139_92_246/0.8)]"
        />
        <Icon aria-hidden className="relative text-2xl text-fg" />
      </div>
      <div>
        <span className="font-mono text-xs text-faint">0{index + 1}</span>
        <h3 className="mt-1 font-display text-xl font-semibold">{step.title}</h3>
        <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">{step.text}</p>
      </div>
    </motion.li>
  )
}

export function AIWorkflow() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <section className="container-x py-28 sm:py-36">
      <Reveal>
        <SectionLabel>ia no meu fluxo</SectionLabel>
        <h2 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          IA do primeiro commit <span className="text-gradient">até a produção</span>.
        </h2>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          O Claude é minha principal ferramenta no dia a dia. Uso IA para pensar arquitetura, escrever e revisar código, automatizar processos e
          entregar soluções inteligentes que rodam em sistemas reais.
        </p>
      </Reveal>

      <div ref={ref} className="relative mt-16">
        {/* Linha que se desenha com o scroll: vertical no celular, horizontal no desktop */}
        <div aria-hidden className="absolute bottom-0 left-7 top-0 w-px bg-line lg:hidden">
          <motion.div className="h-full w-px origin-top bg-gradient-to-b from-violet to-cyan" style={{ scaleY: progress }} />
        </div>
        <div aria-hidden className="absolute left-7 right-[20%] top-7 hidden h-px bg-line lg:block">
          <motion.div className="h-px w-full origin-left bg-gradient-to-r from-violet to-cyan" style={{ scaleX: progress }} />
        </div>

        <ol className="relative grid gap-12 lg:grid-cols-4 lg:gap-8">
          {aiWorkflow.map((step, i) => (
            <Step key={step.title} index={i} progress={progress} />
          ))}
        </ol>
      </div>
    </section>
  )
}
