import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'
import { useReducedMotion } from '../hooks/useMediaQuery'

type IntroState = {
  // true quando a tela de carregamento terminou e o hero pode animar
  introDone: boolean
  finishIntro: () => void
  showLoader: boolean
}

const IntroContext = createContext<IntroState | null>(null)

export function IntroProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion()
  const [done, setDone] = useState(false)
  const finishIntro = useCallback(() => setDone(true), [])

  return (
    <IntroContext.Provider value={{ introDone: done || reduced, finishIntro, showLoader: !reduced }}>
      {children}
    </IntroContext.Provider>
  )
}

export function useIntro() {
  const ctx = useContext(IntroContext)
  if (!ctx) throw new Error('useIntro precisa estar dentro de IntroProvider')
  return ctx
}
