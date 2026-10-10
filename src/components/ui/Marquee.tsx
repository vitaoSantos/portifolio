import type { CSSProperties } from 'react'
import type { IconType } from 'react-icons'

type Item = { name: string; icon: IconType }

export function Marquee({ items, reverse = false, duration = 40 }: { items: Item[]; reverse?: boolean; duration?: number }) {
  return (
    <div className="relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
      <ul
        className="marquee-track flex w-max shrink-0"
        data-reverse={reverse}
        style={{ '--marquee-duration': `${duration}s` } as CSSProperties}
      >
        {[...items, ...items].map((item, i) => (
          <li
            key={i}
            aria-hidden={i >= items.length}
            className="flex shrink-0 items-center gap-3 pr-12 font-display text-2xl font-medium text-muted transition-colors duration-300 hover:text-fg sm:text-3xl"
          >
            <item.icon className="text-violet-soft" aria-hidden />
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  )
}
