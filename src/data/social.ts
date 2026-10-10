import type { IconType } from 'react-icons'
import { TbBrandGithub, TbBrandInstagram, TbBrandLinkedin, TbBrandWhatsapp } from 'react-icons/tb'
import { profile, whatsappUrl } from './profile'

export type SocialLink = { id: string; label: string; handle: string; href: string; icon: IconType; description: string }

// Redes na ordem em que aparecem no site. Links vazios ficam de fora.
export const socialLinks: SocialLink[] = (
  [
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      handle: profile.whatsapp.display,
      href: whatsappUrl,
      icon: TbBrandWhatsapp,
      description: 'O jeito mais rápido de falar comigo',
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      handle: profile.handles.linkedin,
      href: profile.links.linkedin,
      icon: TbBrandLinkedin,
      description: 'Experiência e carreira',
    },
    {
      id: 'instagram',
      label: 'Instagram',
      handle: profile.handles.instagram ? `@${profile.handles.instagram}` : '',
      href: profile.links.instagram,
      icon: TbBrandInstagram,
      description: 'Conteúdos sobre IA, programação e ensino',
    },
    {
      id: 'github',
      label: 'GitHub',
      handle: profile.handles.github,
      href: profile.links.github,
      icon: TbBrandGithub,
      description: 'Código e repositórios',
    },
  ] satisfies SocialLink[]
).filter((s) => s.href)
