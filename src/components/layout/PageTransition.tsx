import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { easeExpo } from '../ui/motion'

// Cortina que cobre a tela ao sair de uma página e se recolhe ao entrar na próxima
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[90] origin-bottom bg-ink-2"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.6, ease: easeExpo }}
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-brand" />
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[90] origin-top bg-ink-2"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0, transition: { duration: 0.6, ease: easeExpo, delay: 0.08 } }}
        exit={{ scaleY: 0 }}
      >
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-brand" />
      </motion.div>
      {children}
    </>
  )
}
