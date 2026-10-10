import { useVisits } from '../../context/VisitsContext'
import { Counter } from './Counter'

// "● 1.234 visitantes" com o ponto pulsando; não aparece enquanto o total não chega
export function VisitorCount({ className = '' }: { className?: string }) {
  const total = useVisits()
  if (total === null) return null

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="relative flex size-2">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-ok opacity-60" />
        <span className="relative inline-flex size-2 rounded-full bg-ok" />
      </span>
      <span>
        <Counter value={total} /> {total === 1 ? 'visitante' : 'visitantes'}
      </span>
    </span>
  )
}
