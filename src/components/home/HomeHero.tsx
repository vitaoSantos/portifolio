import { AnimatePresence, motion } from 'motion/react'
import { lazy, Suspense, useEffect, useState } from 'react'
import { TbArrowRight, TbMapPin } from 'react-icons/tb'
import { Link } from 'react-router'
import { useIntro } from '../../context/IntroContext'
import { profile } from '../../data/profile'
import { projectsVisible } from '../../data/projects'
import { socialLinks } from '../../data/social'
import { useIsDesktop } from '../../hooks/useMediaQuery'
import { Magnetic } from '../ui/Magnetic'
import { easeOut } from '../ui/motion'
import { SplitText } from '../ui/SplitText'

const HeroScene = lazy(() => import('../three/HeroScene'))

function RotatingWords({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), 2800)
    return () => clearInterval(id)
  }, [words.length])

  return (
    <span className="relative inline-flex overflow-hidden align-bottom">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[index]}
          className="text-gradient inline-block font-medium"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.5, ease: easeOut }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export function HomeHero() {
  const { introDone } = useIntro()
  const desktop = useIsDesktop()
  // Cria o WebGL só depois da transição de página, para não disputar a thread com a animação
  const [sceneReady, setSceneReady] = useState(false)

  useEffect(() => {
    const id = setTimeout(() => setSceneReady(true), 650)
    return () => clearTimeout(id)
  }, [])

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    transition: { duration: 0.9, ease: easeOut, delay },
  })

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      <div
        className={`absolute inset-0 transition-opacity duration-1000 [mask-image:linear-gradient(to_bottom,#000_65%,transparent)] ${
          sceneReady ? (desktop ? 'opacity-100' : 'opacity-60') : 'opacity-0'
        }`}
      >
        {sceneReady && (
          <Suspense fallback={null}>
            <HeroScene offsetX={desktop ? 2.7 : 0} mobile={!desktop} />
          </Suspense>
        )}
      </div>
      {/* Escurece a área do texto para manter a leitura sobre o 3D */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgb(7_7_12/0.85),transparent_60%)]"
      />

      <div className="container-x relative z-10 pb-24 pt-32">
        <motion.p {...fade(0)} className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-cyan">
          <span aria-hidden className="h-px w-10 bg-gradient-brand" />
          Olá, eu sou
        </motion.p>

        <h1 className="max-w-4xl font-display text-[clamp(2.9rem,8vw,6.5rem)] font-semibold leading-[0.95] tracking-tight">
          <SplitText text={profile.name} play={introDone} delay={0.05} />
        </h1>

        <motion.ul {...fade(0.55)} className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-base text-fg sm:text-lg">
          {profile.headline.map((item, i) => (
            <li key={item} className="flex items-center gap-3">
              {i > 0 && <span aria-hidden className="size-1.5 rounded-full bg-gradient-brand" />}
              {item}
            </li>
          ))}
        </motion.ul>

        <motion.p {...fade(0.7)} className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
          Construo <RotatingWords words={profile.building} />
          <br />
          {profile.bio}
        </motion.p>

        <motion.div {...fade(0.85)} className="mt-10 flex flex-wrap items-center gap-4">
          {projectsVisible && (
            <Magnetic>
              <Link
                to="/projetos"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-brand px-7 py-4 font-semibold text-ink shadow-[0_0_40px_-8px_rgb(139_92_246/0.7)] transition-[filter] hover:brightness-110"
              >
                Ver projetos
                <TbArrowRight aria-hidden className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Magnetic>
          )}
          <Magnetic>
            <Link
              to="/contato"
              className="inline-flex items-center gap-2 rounded-full border border-line-strong px-7 py-4 font-medium text-fg transition-colors hover:border-violet/60 hover:bg-violet/10"
            >
              Fale comigo
            </Link>
          </Magnetic>
        </motion.div>

        <motion.div {...fade(1)} className="mt-10 flex flex-wrap items-center gap-6 text-sm text-muted">
          <span className="flex items-center gap-2">
            <TbMapPin aria-hidden className="text-cyan" /> {profile.location}
          </span>
          {socialLinks.map((s) => (
            <a key={s.id} href={s.href} target="_blank" rel="noreferrer" className="flex items-center gap-2 transition-colors hover:text-fg">
              <s.icon aria-hidden /> {s.label}
            </a>
          ))}
        </motion.div>
      </div>

      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: introDone ? 1 : 0 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 sm:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-faint">Role</span>
        <span className="flex h-10 w-6 justify-center rounded-full border border-line-strong pt-2">
          <motion.span
            className="size-1 rounded-full bg-cyan"
            animate={{ y: [0, 14, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </motion.div>
    </section>
  )
}
