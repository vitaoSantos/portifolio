import { AIWorkflow } from '../components/home/AIWorkflow'
import { FeaturedProjects } from '../components/home/FeaturedProjects'
import { FinalCTA } from '../components/home/FinalCTA'
import { HomeHero } from '../components/home/HomeHero'
import { Stats } from '../components/home/Stats'
import { TechMarquee } from '../components/home/TechMarquee'
import { PageTransition } from '../components/layout/PageTransition'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function Home() {
  useDocumentTitle()
  return (
    <PageTransition>
      <HomeHero />
      <TechMarquee />
      <Stats />
      <FeaturedProjects />
      <AIWorkflow />
      <FinalCTA />
    </PageTransition>
  )
}
