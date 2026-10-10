import { stats } from '../../data/profile'
import { Counter } from '../ui/Counter'
import { Reveal } from '../ui/Reveal'
import { SectionLabel } from '../ui/SectionLabel'

export function Stats() {
  return (
    <section className="container-x py-28 sm:py-36">
      <Reveal>
        <SectionLabel>em números</SectionLabel>
        <h2 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          Da lan house a sistemas com <span className="text-gradient">milhares de usuários</span> ao mesmo tempo.
        </h2>
      </Reveal>

      <dl className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.08} className="flex flex-col-reverse bg-ink-2 p-6 sm:p-10">
            <dt className="mt-3 text-sm leading-snug text-muted sm:text-base">{stat.label}</dt>
            <dd className="text-gradient font-display text-5xl font-semibold tracking-tight sm:text-6xl">
              <Counter value={stat.value} suffix={stat.suffix} />
            </dd>
          </Reveal>
        ))}
      </dl>
    </section>
  )
}
