import { useLenis } from 'lenis/react'
import { animate, AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { useIntro } from '../../context/IntroContext'
import { profile } from '../../data/profile'
import { easeExpo } from '../ui/motion'

// Tela de abertura: conta de 0 a 100% e sobe como uma cortina
export function Loader() {
  const { showLoader, finishIntro } = useIntro()
  const lenis = useLenis()
  const [count, setCount] = useState(0)
  const [visible, setVisible] = useState(showLoader)

  useEffect(() => {
    if (!visible) return
    lenis?.stop()
    document.documentElement.style.overflow = 'hidden'
  }, [visible, lenis])

  useEffect(() => {
    if (!showLoader) return
    let cancelled = false
    const controls = animate(0, 100, {
      duration: 1.7,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setCount(Math.round(v)),
    })
    Promise.all([controls, document.fonts.ready]).then(() => {
      if (cancelled) return
      setVisible(false)
      setTimeout(finishIntro, 350)
    })
    return () => {
      cancelled = true
      controls.stop()
    }
  }, [showLoader, finishIntro])

  function release() {
    document.documentElement.style.overflow = ''
    lenis?.start()
  }

  return (
    <AnimatePresence onExitComplete={release}>
      {visible && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[95] flex flex-col justify-between bg-ink p-6 sm:p-10"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.95, ease: easeExpo }}
        >
          <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.2em] text-faint">
            <span>{profile.shortName}</span>
            <span>Portfólio · {new Date().getFullYear()}</span>
          </div>

          <div className="flex flex-col items-center gap-6">
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="text-gradient font-display text-6xl font-bold tracking-tight sm:text-7xl"
            >
              {profile.initials}
            </motion.span>
            <div className="h-px w-48 overflow-hidden bg-line">
              <div className="h-full bg-gradient-brand" style={{ width: `${count}%` }} />
            </div>
          </div>

          <div className="flex items-end justify-between">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-faint">Carregando experiência</span>
            <span className="font-display text-6xl font-semibold tabular-nums text-fg sm:text-8xl">
              {count.toString().padStart(3, '0')}
              <span className="text-gradient">%</span>
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
