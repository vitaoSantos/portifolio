import { TbUser } from 'react-icons/tb'

// Selo para projetos criados por uma pessoa só
export function SoloBadge({ className = '' }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border border-violet/40 bg-violet/10 px-2.5 py-0.5 text-[11px] font-medium text-violet-soft ${className}`}
    >
      <TbUser aria-hidden /> Projeto individual
    </span>
  )
}
