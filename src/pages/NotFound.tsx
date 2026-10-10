import { TbArrowLeft } from 'react-icons/tb'
import { Link } from 'react-router'
import { PageTransition } from '../components/layout/PageTransition'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function NotFound() {
  useDocumentTitle('Página não encontrada')

  return (
    <PageTransition>
      <section className="container-x flex min-h-[80svh] flex-col items-center justify-center text-center">
        <p className="text-gradient font-display text-[clamp(7rem,22vw,16rem)] font-bold leading-none tracking-tighter">404</p>
        <p className="mt-4 font-mono text-sm text-muted">Essa rota não existe (ainda).</p>
        <Link
          to="/"
          className="group mt-10 inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3 transition-colors hover:border-violet/60 hover:bg-violet/10"
        >
          <TbArrowLeft aria-hidden className="transition-transform group-hover:-translate-x-1" />
          Voltar para o início
        </Link>
      </section>
    </PageTransition>
  )
}
