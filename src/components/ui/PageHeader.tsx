import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { useIntro } from '../../context/IntroContext'
import { easeOut } from './motion'
import { SectionLabel } from './SectionLabel'
import { SplitText } from './SplitText'

type Props = {
  label: string
  title: string
  lead?: ReactNode
}

export function PageHeader({ label, title, lead }: Props) {
  const { introDone } = useIntro()
  return (
    <header className="container-x pb-16 pt-40 sm:pt-48">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: introDone ? 1 : 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
        <SectionLabel>{label}</SectionLabel>
      </motion.div>
      <h1 className="mt-6 max-w-5xl font-display text-[clamp(2.6rem,7vw,5.75rem)] font-semibold leading-[0.98] tracking-tight">
        <SplitText text={title} play={introDone} delay={0.35} stagger={0.018} />
      </h1>
      {lead && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.9, ease: easeOut, delay: 0.75 }}
          className="mt-8 max-w-2xl text-lg leading-relaxed text-muted"
        >
          {lead}
        </motion.p>
      )}
    </header>
  )
}
