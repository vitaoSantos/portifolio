import { TbArrowUpRight, TbMail } from 'react-icons/tb'
import { Link } from 'react-router'
import { profile } from '../../data/profile'
import { socialLinks } from '../../data/social'
import { navLinks } from './nav'

export function Footer() {
  return (
    <footer className="relative mt-10 overflow-hidden border-t border-line">
      <div className="container-x grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link to="/" className="font-display text-2xl font-bold">
            <span className="text-gradient">{profile.initials}</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            {profile.name}
            <br />
            {profile.headline.join(' · ')}
          </p>
        </div>

        <nav aria-label="Rodapé">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-faint">Navegação</p>
          <ul className="grid gap-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-muted transition-colors hover:text-fg">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-faint">Conecte-se</p>
          <ul className="grid gap-2 text-sm">
            {socialLinks.map((s) => (
              <li key={s.id}>
                <a href={s.href} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 text-muted hover:text-fg">
                  <s.icon aria-hidden /> {s.label}
                  <TbArrowUpRight aria-hidden className="opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 text-muted hover:text-fg">
                <TbMail aria-hidden /> {profile.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-x flex flex-col justify-between gap-2 border-t border-line py-6 font-mono text-xs text-faint sm:flex-row">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <span>Feito com React, Three.js e Claude</span>
      </div>

      <p
        aria-hidden
        className="pointer-events-none select-none whitespace-nowrap text-center font-display text-[15vw] font-bold leading-[0.78] tracking-tighter text-transparent [-webkit-text-stroke:1px_rgb(255_255_255/0.07)]"
      >
        {profile.shortName}
      </p>
    </footer>
  )
}
