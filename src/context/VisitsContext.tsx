import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { registerVisit } from '../lib/api'

// Total de visitantes, registrado uma vez quando o site abre e compartilhado entre os componentes
const VisitsContext = createContext<number | null>(null)

export function VisitsProvider({ children }: { children: ReactNode }) {
  const [total, setTotal] = useState<number | null>(null)

  useEffect(() => {
    let active = true
    registerVisit()
      .then((value) => active && setTotal(value))
      .catch(() => {})
    return () => {
      active = false
    }
  }, [])

  return <VisitsContext.Provider value={total}>{children}</VisitsContext.Provider>
}

export const useVisits = () => useContext(VisitsContext)
