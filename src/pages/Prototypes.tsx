import { TbBrandGithub, TbFlask } from 'react-icons/tb'
import { PageTransition } from '../components/layout/PageTransition'
import { PageHeader } from '../components/ui/PageHeader'
import { Reveal } from '../components/ui/Reveal'
import { profile } from '../data/profile'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function Prototypes() {
  useDocumentTitle('Protótipos')

  return (
    <PageTransition>
      <PageHeader
        label="protótipos"
        title="Laboratório"
        lead="Protótipos interativos e experimentos que você pode testar direto no navegador."
      />

      <section className="container-x pb-32">
        <Reveal>
          <div className="border-gradient flex flex-col items-center rounded-[28px] bg-ink-2/70 px-6 py-20 text-center">
            <span className="grid size-16 place-items-center rounded-2xl bg-gradient-brand text-ink">
              <TbFlask aria-hidden className="text-3xl" />
            </span>
            <h2 className="mt-6 font-display text-2xl font-semibold sm:text-3xl">Os primeiros protótipos estão a caminho</h2>
            <p className="mt-3 max-w-md text-muted">Enquanto isso, você pode ver meus repositórios no GitHub.</p>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3 font-medium transition-colors hover:border-violet/60 hover:bg-violet/10"
            >
              <TbBrandGithub aria-hidden /> github.com/{profile.handles.github}
            </a>
          </div>
        </Reveal>
      </section>
    </PageTransition>
  )
}
