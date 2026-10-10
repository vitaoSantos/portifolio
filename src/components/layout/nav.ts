export const navLinks = [
  { to: '/', label: 'Início' },
  { to: '/sobre', label: 'Sobre' },
  { to: '/projetos', label: 'Projetos' },
  { to: '/ensino', label: 'Ensino' },
  { to: '/contato', label: 'Contato' },
]

export function isActivePath(pathname: string, to: string) {
  return to === '/' ? pathname === '/' : pathname.startsWith(to)
}
