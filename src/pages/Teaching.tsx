import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { SiOpenjdk, SiPhp } from 'react-icons/si'
import { TbSchool } from 'react-icons/tb'
import { PageTransition } from '../components/layout/PageTransition'
import { CodePanel } from '../components/teaching/CodePanel'
import { FirstTeaching } from '../components/teaching/FirstTeaching'
import type { Lang } from '../components/teaching/highlight'
import { RunOutput } from '../components/teaching/RunOutput'
import { easeOut } from '../components/ui/motion'
import { PageHeader } from '../components/ui/PageHeader'
import { Reveal } from '../components/ui/Reveal'
import { SectionLabel } from '../components/ui/SectionLabel'
import { oopConcepts, teaching } from '../data/oop'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function Teaching() {
  useDocumentTitle('Ensino')
  const [active, setActive] = useState(0)
  // No celular os dois códigos não cabem lado a lado: mostra um por vez
  const [lang, setLang] = useState<Lang>('java')
  const concept = oopConcepts[active]

  return (
    <PageTransition>
      <PageHeader
        label="ensino"
        title="Professor universitário"
        lead={`Desde 2024 dou aula na ${teaching.institution}, ajudando a formar os próximos profissionais de computação. Da arquitetura de computadores à orientação a objetos, levo para a sala de aula a experiência de quem desenvolve software todos os dias.`}
      />

      <FirstTeaching />

      <section className="container-x pb-12">
        <Reveal>
          <SectionLabel>{teaching.period}</SectionLabel>
          <h2 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            POO em <span className="text-gradient">Java e PHP</span>
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            Dei Programação Orientada a Objetos para duas turmas: uma aprendeu em Java e a outra em PHP. Estes são os conceitos que trabalhei, lado a lado nas duas linguagens.
          </p>
        </Reveal>
        <Reveal className="mt-8 flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2 text-sm text-muted">
            <TbSchool aria-hidden className="text-cyan" /> {teaching.institution} · {teaching.period}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2 text-sm text-muted">
            <SiOpenjdk aria-hidden className="text-violet-soft" /> Turma de Java
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2 text-sm text-muted">
            <SiPhp aria-hidden className="text-cyan" /> Turma de PHP
          </span>
        </Reveal>
      </section>

      <section className="container-x grid grid-cols-1 gap-10 pb-32 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-12">
        <nav aria-label="Conceitos de POO" className="lg:sticky lg:top-28 lg:self-start">
          <SectionLabel className="mb-5">conceitos</SectionLabel>
          <ol className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0" data-lenis-prevent>
            {oopConcepts.map((c, i) => {
              const selected = i === active
              return (
                <li key={c.id} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={selected}
                    className={`relative flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition-colors ${
                      selected ? 'text-fg' : 'text-muted hover:text-fg'
                    }`}
                  >
                    {selected && (
                      <motion.span
                        layoutId="oop-active"
                        className="absolute inset-0 rounded-xl border border-violet/40 bg-violet/10"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className={`relative font-mono text-xs ${selected ? 'text-cyan' : 'text-faint'}`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="relative whitespace-nowrap font-medium">{c.title}</span>
                  </button>
                </li>
              )
            })}
          </ol>
        </nav>

        <AnimatePresence mode="wait">
          <motion.div
            key={concept.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: easeOut }}
            className="min-w-0"
          >
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{concept.title}</h2>
            <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted">{concept.summary}</p>

            <div role="group" aria-label="Linguagem" className="mt-8 inline-flex rounded-full border border-line p-1 lg:hidden">
              {(['java', 'php'] as Lang[]).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLang(l)}
                  aria-pressed={lang === l}
                  className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                    lang === l ? 'bg-gradient-brand text-ink' : 'text-muted'
                  }`}
                >
                  {l === 'java' ? 'Java' : 'PHP'}
                </button>
              ))}
            </div>

            <div className="mt-6 grid gap-4 lg:mt-8 xl:grid-cols-2">
              <CodePanel code={concept.java} lang="java" className={lang === 'java' ? '' : 'hidden lg:block'} />
              <CodePanel code={concept.php} lang="php" className={lang === 'php' ? '' : 'hidden lg:block'} />
            </div>

            <div className="mt-4">
              <RunOutput key={concept.id} lines={concept.output} />
            </div>

            <div className="mt-10">
              <SectionLabel>java x php</SectionLabel>
              <ul className="mt-5 grid gap-3">
                {concept.differences.map((item) => (
                  <li key={item} className="flex gap-4 leading-relaxed text-muted">
                    <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-gradient-brand" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>
    </PageTransition>
  )
}
