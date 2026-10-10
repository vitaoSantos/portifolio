import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { useFinePointer, useIsDesktop } from '../../hooks/useMediaQuery'
import { easeExpo } from '../ui/motion'

// Desktop: cortina que cobre a tela ao sair e se recolhe ao entrar.
// Celular: fade curto só de opacidade, que roda fora da thread principal e não trava.
export function PageTransition({ children }: { children: ReactNode }) {
  const desktop = useIsDesktop()
  const fine = useFinePointer()
  const rich = desktop && fine

  if (!rich) {
    return (
      <>
        <motion.div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[90] bg-ink"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0, transition: { duration: 0.3, ease: 'easeOut' } }}
          exit={{ opacity: 1, transition: { duration: 0.18, ease: 'easeIn' } }}
        />
        {children}
      </>
    )
  }

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[90] origin-bottom bg-ink-2"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.55, ease: easeExpo }}
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-brand" />
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[90] origin-top bg-ink-2"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0, transition: { duration: 0.55, ease: easeExpo, delay: 0.05 } }}
        exit={{ scaleY: 0 }}
      >
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-brand" />
      </motion.div>
      {children}
    </>
  )
}
