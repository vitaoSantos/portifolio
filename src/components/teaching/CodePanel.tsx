import { useMemo } from 'react'
import { SiOpenjdk, SiPhp } from 'react-icons/si'
import { highlight, type Lang } from './highlight'

const meta: Record<Lang, { label: string; file: string; icon: typeof SiPhp; color: string }> = {
  java: { label: 'Java', file: 'Main.java', icon: SiOpenjdk, color: 'text-violet-soft' },
  php: { label: 'PHP', file: 'main.php', icon: SiPhp, color: 'text-cyan' },
}

export function CodePanel({ code, lang, className = '' }: { code: string; lang: Lang; className?: string }) {
  const html = useMemo(() => highlight(code, lang), [code, lang])
  const m = meta[lang]

  return (
    <figure className={`border-gradient overflow-hidden rounded-2xl bg-[#0b0b13] ${className}`}>
      <figcaption className="flex items-center justify-between border-b border-line px-4 py-3">
        <span className="flex items-center gap-2 text-sm font-medium text-fg">
          <m.icon aria-hidden className={`text-lg ${m.color}`} />
          {m.label}
        </span>
        <span className="flex items-center gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-white/10" />
          <span className="size-2.5 rounded-full bg-white/10" />
          <span className="size-2.5 rounded-full bg-white/10" />
        </span>
        <span className="font-mono text-xs text-faint">{m.file}</span>
      </figcaption>
      <pre
        data-lenis-prevent
        className="code-block max-h-[560px] overflow-auto p-4 font-mono text-[12.5px] leading-relaxed sm:p-5 sm:text-[13px]"
        tabIndex={0}
        aria-label={`Código em ${m.label}`}
      >
        <code dangerouslySetInnerHTML={{ __html: html }} />
      </pre>
    </figure>
  )
}
