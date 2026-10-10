import { marqueeTech } from '../../data/skills'
import { Marquee } from '../ui/Marquee'

export function TechMarquee() {
  const half = Math.ceil(marqueeTech.length / 2)
  return (
    <section aria-label="Tecnologias" className="flex flex-col gap-6 border-y border-line py-10">
      <Marquee items={marqueeTech.slice(0, half)} duration={38} />
      <Marquee items={marqueeTech.slice(half)} duration={44} reverse />
    </section>
  )
}
