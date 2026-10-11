import { projectsVisible } from '../../data/projects'

export const navLinks = [
  { to: '/', label: 'Início' },
  { to: '/sobre', label: 'Sobre' },
  { to: '/projetos', label: 'Projetos' },
  { to: '/ensino', label: 'Ensino' },
  { to: '/contato', label: 'Contato' },
].filter((link) => projectsVisible || link.to !== '/projetos')

export function isActivePath(pathname: string, to: string) {
  return to === '/' ? pathname === '/' : pathname.startsWith(to)
}
