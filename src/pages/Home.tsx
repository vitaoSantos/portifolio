import { AIWorkflow } from '../components/home/AIWorkflow'
import { FeaturedProjects } from '../components/home/FeaturedProjects'
import { FinalCTA } from '../components/home/FinalCTA'
import { Guestbook } from '../components/home/Guestbook'
import { HomeHero } from '../components/home/HomeHero'
import { Stats } from '../components/home/Stats'
import { TechMarquee } from '../components/home/TechMarquee'
import { PageTransition } from '../components/layout/PageTransition'
import { projectsVisible } from '../data/projects'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function Home() {
  useDocumentTitle()
  return (
    <PageTransition>
      <HomeHero />
      <TechMarquee />
      <Stats />
      {projectsVisible && <FeaturedProjects />}
      <AIWorkflow />
      <Guestbook />
      <FinalCTA />
    </PageTransition>
  )
}
