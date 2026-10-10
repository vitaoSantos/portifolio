import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useEffect, useState } from 'react'
import { TbMenu2, TbX } from 'react-icons/tb'
import { Link, useLocation } from 'react-router'
import { profile } from '../../data/profile'
import { socialLinks } from '../../data/social'
import { Magnetic } from '../ui/Magnetic'
import { easeExpo, easeOut } from '../ui/motion'
import { isActivePath, navLinks } from './nav'

export function Navbar() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => {
    const previous = scrollY.getPrevious() ?? 0
    setScrolled(y > 24)
    setHidden(y > previous && y > 240)
  })

  useEffect(() => {
    setOpen(false)
    setHidden(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6"
        animate={{ y: hidden && !open ? '-120%' : '0%' }}
        transition={{ duration: 0.45, ease: easeOut }}
      >
        <div
          className={`mx-auto flex max-w-6xl items-center justify-between rounded-full border py-2 pl-5 pr-2 transition-[background-color,border-color] duration-500 ${
            scrolled || open ? 'glass border-line' : 'border-transparent'
          }`}
        >
          <Link to="/" aria-label="Ir para o início" className="font-display text-xl font-bold tracking-tight">
            <span className="text-gradient">{profile.initials}</span>
          </Link>

          <nav aria-label="Principal" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => {
                const active = isActivePath(pathname, link.to)
                return (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      aria-current={active ? 'page' : undefined}
                      className={`relative block rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
                        active ? 'text-fg' : 'text-muted hover:text-fg'
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 rounded-full border border-line bg-white/[0.06]"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        />
                      )}
                      <span className="relative">{link.label}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-1">
            {socialLinks.map((s) => (
              <a
                key={s.id}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="hidden size-10 place-items-center rounded-full text-muted transition-colors hover:text-fg sm:grid md:hidden xl:grid"
              >
                <s.icon className="text-xl" aria-hidden />
              </a>
            ))}
            <div className="hidden md:block">
              <Magnetic>
                <Link
                  to="/contato"
                  className="ml-1 inline-flex items-center rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-ink transition-[filter] hover:brightness-110"
                >
                  Fale comigo
                </Link>
              </Magnetic>
            </div>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={open}
              className="grid size-11 place-items-center rounded-full border border-line text-fg md:hidden"
            >
              {open ? <TbX className="text-xl" aria-hidden /> : <TbMenu2 className="text-xl" aria-hidden />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>{open && <MobileMenu pathname={pathname} />}</AnimatePresence>
    </>
  )
}

function MobileMenu({ pathname }: { pathname: string }) {
  return (
    <motion.div
      className="fixed inset-0 z-40 flex flex-col justify-between bg-ink px-6 pb-10 pt-28 md:hidden"
      initial={{ clipPath: 'inset(0 0 100% 0)' }}
      animate={{ clipPath: 'inset(0 0 0% 0)', transition: { duration: 0.5, ease: easeExpo } }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      <nav aria-label="Menu">
        <ul className="flex flex-col gap-2">
          {navLinks.map((link, i) => {
            const active = isActivePath(pathname, link.to)
            return (
              <li key={link.to} className="overflow-hidden">
                <motion.div
                  initial={{ y: '100%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.7, ease: easeOut, delay: 0.15 + i * 0.06 }}
                >
                  <Link
                    to={link.to}
                    aria-current={active ? 'page' : undefined}
                    className={`flex items-baseline gap-4 font-display text-5xl font-semibold tracking-tight ${active ? 'text-gradient' : 'text-fg'}`}
                  >
                    <span className="font-mono text-xs text-faint">0{i + 1}</span>
                    {link.label}
                  </Link>
                </motion.div>
              </li>
            )
          })}
        </ul>
      </nav>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col gap-4 border-t border-line pt-6 text-sm text-muted"
      >
        <a href={`mailto:${profile.email}`} className="font-mono text-fg">
          {profile.email}
        </a>
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          {socialLinks.map((s) => (
            <a key={s.id} href={s.href} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-fg">
              <s.icon aria-hidden /> {s.label}
            </a>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
