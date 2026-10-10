import type { IconType } from 'react-icons'
import {
  SiClaude,
  SiFigma,
  SiGit,
  SiJavascript,
  SiMysql,
  SiOpenjdk,
  SiPhp,
  SiPython,
  SiRabbitmq,
  SiSpring,
} from 'react-icons/si'
import { TbBolt, TbDatabase, TbHierarchy3, TbRobot } from 'react-icons/tb'

export type SkillGroup = { title: string; color: string; items: string[] }

export const skillGroups: SkillGroup[] = [
  { title: 'Backend', color: '#a78bfa', items: ['Java', 'Spring', 'Java EE', 'PHP', 'Swoole', 'APIs REST', 'Microsserviços'] },
  { title: 'IA', color: '#22d3ee', items: ['Claude', 'Engenharia de prompts', 'IA aplicada', 'n8n'] },
  { title: 'Arquitetura', color: '#c4b5fd', items: ['Arquitetura de software', 'Event-driven', 'RabbitMQ', 'Performance', 'Observabilidade'] },
  { title: 'Dados', color: '#67e8f9', items: ['MySQL', 'SQL Server', 'Python', 'Ciência de dados'] },
  { title: 'Frontend', color: '#e9d5ff', items: ['JavaScript', 'PWA'] },
  { title: 'Ferramentas e processo', color: '#a5f3fc', items: ['Git', 'Figma', 'Scrum'] },
]

export const softSkills = [
  'Resolução de problemas',
  'Comunicação técnica',
  'Trabalho em equipe',
  'Pensamento analítico',
  'Aprendizado contínuo',
  'Didática e mentoria',
]

// Faixa infinita do início
export const marqueeTech: { name: string; icon: IconType }[] = [
  { name: 'Java', icon: SiOpenjdk },
  { name: 'Spring', icon: SiSpring },
  { name: 'PHP', icon: SiPhp },
  { name: 'Swoole', icon: TbBolt },
  { name: 'RabbitMQ', icon: SiRabbitmq },
  { name: 'MySQL', icon: SiMysql },
  { name: 'SQL Server', icon: TbDatabase },
  { name: 'Claude', icon: SiClaude },
  { name: 'n8n', icon: TbRobot },
  { name: 'Microsserviços', icon: TbHierarchy3 },
  { name: 'JavaScript', icon: SiJavascript },
  { name: 'Python', icon: SiPython },
  { name: 'Git', icon: SiGit },
  { name: 'Figma', icon: SiFigma },
]
