import { TbQuote } from 'react-icons/tb'
import { firstTeaching, teaching } from '../../data/oop'
import { Reveal } from '../ui/Reveal'
import { SectionLabel } from '../ui/SectionLabel'

// Primeira experiência como professor: disciplinas, rotina e o que aprendi
export function FirstTeaching() {
  return (
    <section className="container-x pb-28">
      <Reveal>
        <SectionLabel>
          primeira experiência · {firstTeaching.period}
        </SectionLabel>
        <h2 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          Do mercado para a <span className="text-gradient">sala de aula</span>.
        </h2>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          {firstTeaching.intro} Foi na {teaching.institution}, onde também me formei em Análise e Desenvolvimento de Sistemas.
        </p>
      </Reveal>

      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {firstTeaching.subjects.map((s, i) => (
          <Reveal as="li" key={s.id} delay={i * 0.06} className="border-gradient flex flex-col gap-5 rounded-2xl bg-ink-2/70 p-6">
            <span className="grid size-12 place-items-center rounded-xl bg-violet/15 text-2xl text-violet-soft">
              <s.icon aria-hidden />
            </span>
            <div>
              <p className="font-mono text-xs text-faint">Disciplina {String(i + 1).padStart(2, '0')}</p>
              <p className="mt-1 font-display text-lg font-semibold leading-snug">{s.name}</p>
            </div>
          </Reveal>
        ))}
      </ul>

      <div className="mt-14 grid gap-12 lg:grid-cols-2">
        <Reveal>
          <h3 className="font-display text-xl font-semibold">O que fazia no dia a dia</h3>
          <ul className="mt-5 grid gap-3">
            {firstTeaching.activities.map((item) => (
              <li key={item} className="flex gap-4 leading-relaxed text-muted">
                <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-gradient-brand" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.08}>
          <h3 className="font-display text-xl font-semibold">O que essa experiência me deu</h3>
          <ul className="mt-5 flex flex-wrap gap-2">
            {firstTeaching.skills.map((item) => (
              <li key={item} className="rounded-full border border-line-strong px-4 py-2 text-sm text-fg">
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <Reveal className="mt-14">
        <figure className="relative overflow-hidden rounded-3xl border border-line bg-ink-2/60 p-8 sm:p-10">
          <div aria-hidden className="absolute -right-16 -top-16 size-56 rounded-full bg-violet/15 blur-3xl" />
          <TbQuote aria-hidden className="relative text-4xl text-violet-soft" />
          <blockquote className="relative mt-4 max-w-3xl font-display text-2xl font-medium leading-snug text-fg sm:text-3xl">
            {firstTeaching.quote}
          </blockquote>
          <figcaption className="relative mt-5 font-mono text-xs uppercase tracking-wider text-faint">
            Sobre minha primeira experiência como professor
          </figcaption>
        </figure>
      </Reveal>
    </section>
  )
}
