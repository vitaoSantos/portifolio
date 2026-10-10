import type { ReactNode } from 'react'

export function SectionLabel({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <p className={`flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-cyan ${className}`}>
      <span aria-hidden className="h-px w-8 bg-gradient-brand" />
      <span>
        <span aria-hidden className="text-faint">// </span>
        {children}
      </span>
    </p>
  )
}
