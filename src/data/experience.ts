export type TimelineEntry = {
  year: string
  period: string
  title: string
  org: string
  place?: string
  kind: 'trabalho' | 'formação' | 'ensino'
  description: string
  tags?: string[]
}

// Linha do tempo em ordem cronológica: da lan house até hoje
export const timeline: TimelineEntry[] = [
  {
    year: '2014',
    period: 'fev/2014 – jun/2015',
    title: 'Atendente',
    org: 'LanHouse Três Irmãos',
    place: 'Valença, RJ',
    kind: 'trabalho',
    description: 'Onde tudo começou: atendimento ao cliente, gestão de caixa e manutenção de computadores.',
  },
  {
    year: '2016',
    period: 'mar/2016 – jan/2018',
    title: 'Auxiliar administrativo',
    org: 'SamTech Informática',
    place: 'Valença, RJ',
    kind: 'trabalho',
    description: 'Gerenciamento de banco de dados, controle financeiro e de estoque, e manutenção de computadores.',
  },
  {
    year: '2018',
    period: '2018 – 2020',
    title: 'Tecnólogo em Análise e Desenvolvimento de Sistemas',
    org: 'Faculdade de São Lourenço',
    place: 'São Lourenço, MG',
    kind: 'formação',
    description: 'A virada de chave: da manutenção de computadores para o desenvolvimento de software.',
  },
  {
    year: '2019',
    period: 'out/2019 – mai/2023',
    title: 'Desenvolvedor Full Stack',
    org: 'Grupo Mury',
    place: 'São Lourenço, MG',
    kind: 'trabalho',
    description:
      'Sistema monolítico crítico com mais de 3.000 clientes simultâneos. Diagnóstico de gargalos em código legado, melhorias de arquitetura, logs e monitoramento, otimização de banco e mentoria de novos desenvolvedores.',
    tags: ['Java', 'Java EE', 'SQL Server', 'MVC', 'Scrum'],
  },
  {
    year: '2021',
    period: '2021 – 2022',
    title: 'Pós-graduação em Ciência de Dados e Big Data',
    org: 'PUC Minas',
    kind: 'formação',
    description: 'Especialização em dados, estatística e processamento em larga escala.',
  },
  {
    year: '2023',
    period: 'ago/2023 – mar/2024',
    title: 'Programador Java',
    org: 'Crossover',
    place: 'Remoto · time internacional',
    kind: 'trabalho',
    description:
      'APIs RESTful em Java e Spring para aplicações financeiras, integração com gateways de pagamento (PayPal, Amazon Pay) e mensageria assíncrona com RabbitMQ. Comunicação diária em inglês.',
    tags: ['Java', 'Spring', 'RabbitMQ', 'Event-driven'],
  },
  {
    year: '2023',
    period: 'mar/2023 – out/2024',
    title: 'Pós-graduação em Arquitetura e Desenvolvimento Java',
    org: 'FIAP',
    kind: 'formação',
    description: 'Especialização em arquitetura de software, microsserviços e o ecossistema Java.',
  },
  {
    year: '2024',
    period: 'fev/2024 – abr/2025',
    title: 'Professor universitário',
    org: 'Faculdade de São Lourenço',
    place: 'São Lourenço, MG',
    kind: 'ensino',
    description:
      'Disciplinas de Arquitetura de Computadores, Sistemas Operacionais e Redes. Planejamento de aulas práticas e teóricas, avaliação e orientação de projetos.',
  },
  {
    year: '2025',
    period: 'fev/2025 – atual',
    title: 'Engenheiro de Software',
    org: 'Fortram Soluções Digitais',
    place: 'Poços de Caldas, MG',
    kind: 'trabalho',
    description:
      'Desenvolvimento full stack da arquitetura à entrega: PWAs, microsserviços com foco em segurança e escalabilidade, modelagem de MySQL e integração de soluções de IA com scripts e automações.',
    tags: ['PHP', 'JavaScript', 'Microsserviços', 'MySQL', 'IA aplicada'],
  },
  {
    year: '2026',
    period: '1º semestre de 2026',
    title: 'Professor de Programação Orientada a Objetos',
    org: 'Faculdade de São Lourenço',
    place: 'São Lourenço, MG',
    kind: 'ensino',
    description:
      'Duas turmas de POO com o mesmo conteúdo em stacks diferentes: uma aprendeu os conceitos em Java e a outra em PHP.',
    tags: ['POO', 'Java', 'PHP'],
  },
]

export const education = [
  { org: 'FIAP', title: 'Pós-graduação em Arquitetura e Desenvolvimento Java', period: '2023 – 2024' },
  { org: 'PUC Minas', title: 'Pós-graduação em Ciência de Dados e Big Data', period: '2021 – 2022' },
  { org: 'Faculdade de São Lourenço', title: 'Tecnólogo em Análise e Desenvolvimento de Sistemas', period: '2018 – 2020' },
]
