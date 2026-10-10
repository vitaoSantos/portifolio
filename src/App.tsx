import { useLenis } from 'lenis/react'
import { AnimatePresence, MotionConfig } from 'motion/react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router'
import { Background } from './components/layout/Background'
import { Cursor } from './components/layout/Cursor'
import { Footer } from './components/layout/Footer'
import { Loader } from './components/layout/Loader'
import { Navbar } from './components/layout/Navbar'
import { SmoothScroll } from './components/layout/SmoothScroll'
import { IntroProvider } from './context/IntroContext'
import About from './pages/About'
import Contact from './pages/Contact'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import ProjectDetail from './pages/ProjectDetail'
import Projects from './pages/Projects'
import Teaching from './pages/Teaching'

function AnimatedRoutes() {
  const location = useLocation()
  const lenis = useLenis()

  // Volta ao topo enquanto a cortina cobre a tela
  function scrollTop() {
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true })
    else window.scrollTo(0, 0)
  }

  return (
    <AnimatePresence mode="wait" onExitComplete={scrollTop}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<About />} />
        <Route path="/projetos" element={<Projects />} />
        <Route path="/projetos/:slug" element={<ProjectDetail />} />
        <Route path="/ensino" element={<Teaching />} />
        <Route path="/prototipos" element={<Navigate to="/ensino" replace />} />
        <Route path="/contato" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <MotionConfig reducedMotion="user">
        <IntroProvider>
          <SmoothScroll>
            <Background />
            <Loader />
            <Cursor />
            <Navbar />
            <main id="conteudo">
              <AnimatedRoutes />
            </main>
            <Footer />
          </SmoothScroll>
        </IntroProvider>
      </MotionConfig>
    </BrowserRouter>
  )
}
