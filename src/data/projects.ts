import ampliturCover from '../assets/projects/amplitur.webp'
import egApostasCover from '../assets/projects/eg-apostas.svg'
import facilAquiCover from '../assets/projects/facilaqui.webp'
import flopCover from '../assets/projects/floppoker.jpg'
import nestoryCover from '../assets/projects/nestory.webp'
import nownCover from '../assets/projects/nown.svg'
import salaDoReiCover from '../assets/projects/saladorei.webp'
import toylogCover from '../assets/projects/toylog.webp'
import wevoCover from '../assets/projects/wevo.svg'

// Página de projetos em reformulação: troque para true para voltar a exibir
export const projectsVisible = false

export type ProjectCategory = 'Plataformas' | 'E-commerce' | 'Social' | 'Dados e IA'

export type Project = {
  slug: string
  title: string
  summary: string
  category: ProjectCategory
  tags: string[]
  cover: string
  // A capa é uma ilustração, não um print real do projeto
  illustrativeCover?: boolean
  // Aparece no scroll horizontal da página inicial
  featured?: boolean
  // Cena 3D exclusiva na página do projeto
  scene?: 'poker'
  role: string
  // Projeto criado por uma pessoa só, de ponta a ponta
  solo?: boolean
  about: string
  highlights: string[]
  contributions: string[]
  link?: string
  github?: string
  // Sistema usado só pela equipe do cliente, sem endereço público
  internal?: boolean
  // Código de empresa, sem repositório público
  privateCode?: boolean
}

export const projects: Project[] = [
  {
    slug: 'amplitur',
    title: 'Amplitur',
    summary: 'Plataforma de turismo musical: pacotes de viagem para shows e festivais, com checkout completo, três idiomas e quatro moedas.',
    category: 'E-commerce',
    tags: ['PHP 8', 'JavaScript', 'Integração com API', 'PWA', 'Bootstrap'],
    cover: ampliturCover,
    featured: true,
    role: 'Desenvolvedor full stack',
    solo: true,
    about:
      'Site de vendas de uma agência especializada em turismo musical. O cliente escolhe o show ou festival e monta o próprio pacote: transporte em excursão, hospedagem, transfers ou experiências completas, com serviços adicionais por passageiro, contrato digital e pagamento por cartão, Pix ou boleto.',
    highlights: [
      'Checkout em 4 etapas com quatro modalidades: transporte, hospedagem, shuttle e experience',
      'Trilíngue (português, inglês e espanhol), com endereços traduzidos, e multimoeda (BRL, USD, EUR e GBP)',
      'Navegação sem recarregar a página e instalação como aplicativo (PWA)',
      'Área do cliente com mapa de assentos do ônibus, troca de passageiro, Pix com QR Code e documentos',
      'Token de acesso guardado só no servidor, proteção contra requisições forjadas e documentos entregues com autenticação',
      'Cache em três camadas (memória, Memcached e disco) para as respostas da API',
    ],
    contributions: [
      'Criei o projeto sozinho, da arquitetura à publicação',
      'Fluxo de compra completo integrado à API da agência, com checkout em 4 etapas',
      'Internacionalização em três idiomas, suporte a quatro moedas e instalação como aplicativo',
      'Área do cliente, segurança de sessão e entrega autenticada de vouchers, contratos e boletos',
      'Cache em três camadas e CSS organizado com tokens de tema claro e escuro',
    ],
    link: 'https://fortram.site/htmls/amplitur/pt',
    privateCode: true,
  },
  {
    slug: 'nestory',
    title: 'Nestory',
    summary: 'Plataforma de histórias infantis para a família, com produção editorial completa e gamificação para as crianças.',
    category: 'Plataformas',
    tags: ['PHP', 'JavaScript', 'MySQL', 'Notificações', 'Assinaturas'],
    cover: nestoryCover,
    featured: true,
    role: 'Desenvolvedor full stack',
    solo: true,
    about:
      'Plataforma para pais e filhos lerem e ouvirem histórias juntos, em texto, áudio, PDF e vídeo. De um lado, uma equipe editorial produz e revisa o acervo. Do outro, a família consome as histórias, e a criança ganha estrelas e medalhas ao responder um quiz no fim de cada uma.',
    highlights: [
      'Fluxo editorial em 7 etapas, do rascunho à publicação, com permissões por papel: autor, editor, revisor e gerente',
      'Cada troca de status avisa as pessoas certas por notificação no app, push e e-mail',
      'Gamificação com quiz no fim da história, estrelas por acerto e medalhas configuráveis',
      'Correção do quiz feita no servidor, sem expor o gabarito no navegador',
      'Quatro planos de assinatura, incluindo um plano educacional com instituições, salas e alunos',
      '"Continue de onde parou", fascículos e recomendações pelo gosto de cada criança',
    ],
    contributions: [
      'Criei a plataforma sozinho, da modelagem do banco às telas',
      'Fluxo editorial com papéis, trilha de alterações e notificações',
      'Gamificação com quiz corrigido no servidor, estrelas e medalhas',
      'Planos de assinatura, dashboard da família e plano educacional com instituições, salas e alunos',
    ],
    link: 'https://nestory.fortram.site/',
    privateCode: true,
  },
  {
    slug: 'facil-aqui',
    title: 'Fácil Aqui',
    summary: 'Super-app de cidade que reúne rede social, chat, delivery, produtos, serviços, imóveis e vagas de emprego.',
    category: 'Social',
    tags: ['PHP', 'JavaScript', 'MySQL', 'Tempo real', 'PWA'],
    cover: facilAquiCover,
    featured: true,
    role: 'Desenvolvedor full stack',
    about:
      'Hub digital da cidade: moradores e negócios encontram, em uma única conta, rede social, chat em tempo real, delivery de restaurantes, anúncios de produtos, prestadores de serviço, imóveis e vagas de emprego. Cada seção funciona como um produto próprio.',
    highlights: [
      'Rede social com feed infinito, reações, comentários, comunidades com moderação e anúncios no feed',
      'Delivery em cidade → restaurante → prato → carrinho, com horário de funcionamento validado em tempo real',
      'Empregos com match ponderado entre vaga e currículo: área, local, salário, regime e formação',
      'Marketplace de produtos com anúncio em etapas, busca, filtros e contato direto com o anunciante',
      'Chat e notificações em tempo real',
      'Planos com cotas de uso e páginas otimizadas para buscadores',
    ],
    contributions: [
      'Restaurantes: cadastro do restaurante, dos produtos e da localização, e o fluxo de pedido',
      'Empregos: vagas, currículos, skills e contato entre contratante e candidato',
      'Produtos: anúncio, preço e contato com o interessado, no estilo marketplace',
      'Rede social da plataforma',
    ],
    link: 'https://facilaqui.com/',
    privateCode: true,
  },
  {
    slug: 'flop-poker',
    title: 'Flop Poker',
    summary: 'Inscrições online e hospedagem para um festival de torneios de poker, com pagamento por Pix e voucher em QR Code.',
    category: 'E-commerce',
    tags: ['PHP', 'JavaScript', 'MySQL', 'Pix', 'QR Code'],
    cover: flopCover,
    featured: true,
    scene: 'poker',
    role: 'Desenvolvedor full stack',
    about:
      'Plataforma do Flop Poker Tour. O jogador conhece os eventos, vê a programação e a estrutura de blinds de cada torneio, faz a inscrição com Pix ou cartão e reserva o quarto no hotel oficial do evento. A organização gerencia tudo por um painel próprio.',
    highlights: [
      'Inscrição online em torneios com Pix ou cartão e vaga reservada por tempo limitado durante o pagamento',
      'Confirmação da inscrição com voucher em QR Code',
      'Reserva de hospedagem no hotel oficial, inclusive quartos compartilhados com amigos',
      'Programação dos eventos com filtros e a estrutura de blinds de cada torneio',
      'Área do jogador com torneios, reservas e compras',
      'Painel de gestão de eventos, torneios, locais, quartos e e-mails de confirmação',
    ],
    contributions: [
      'Gerenciamento de cadastros de eventos e torneios',
      'Fluxo de inscrição com pagamento e voucher',
      'Reserva de hospedagem integrada ao evento',
    ],
    link: 'https://floppoker.com.br/',
    privateCode: true,
  },
  {
    slug: 'toylog',
    title: 'Toylog',
    summary: 'App para colecionadores: a partir de uma foto, a IA identifica o item, preenche a ficha e estima o valor de mercado.',
    category: 'Dados e IA',
    tags: ['IA generativa', 'Google Gemini', 'Engenharia de prompts', 'PHP', 'JavaScript'],
    cover: toylogCover,
    featured: true,
    role: 'Engenheiro de software',
    solo: true,
    about:
      'Plataforma para catalogar coleções de brinquedos, cards, moedas e jogos retrô. O usuário envia a foto do item, a inteligência artificial reconhece o que é, categoriza e estima o valor de mercado. Depois é só revisar, publicar e, se quiser, anunciar para outros colecionadores.',
    highlights: [
      'Reconhecimento do item pela foto com IA (Google Gemini) e respostas estruturadas',
      'Ficha automática com nome, fabricante, série, ano, material, raridade, condição e categoria',
      'Estimativa de valor em reais, tendência de demanda e recomendação de manter ou vender, com nível de confiança',
      'Coleções e catálogo com filtros, além de páginas públicas do item e do colecionador',
      'Planos gratuito, básico e premium, com painel de receita, churn e conversão',
    ],
    contributions: [
      'Criei o produto sozinho, de ponta a ponta',
      'Integração com o Google Gemini para identificar e categorizar itens pela foto',
      'Engenharia de prompts para fichas precisas e estimativa de valor de mercado',
      'Coleções, páginas públicas, planos de assinatura e painel de métricas do negócio',
    ],
    link: 'https://toylog.fortram.site/',
    privateCode: true,
  },
  {
    slug: 'sala-do-rei',
    title: 'Sala do Rei',
    summary: 'Plataforma para igrejas com relógio de oração, Bíblia online, pedidos de oração e chamadas de vídeo em grupo.',
    category: 'Social',
    tags: ['PHP', 'JavaScript', 'WebRTC', 'Tempo real', 'MySQL'],
    cover: salaDoReiCover,
    role: 'Desenvolvedor full stack',
    about:
      'Criada para uma igreja e pronta para atender qualquer comunidade de fé. Os membros se organizam em relógios de oração, compartilham pedidos, leem a Bíblia na própria plataforma e se reúnem em chamadas de vídeo em grupo.',
    highlights: [
      'Relógio de oração com horários em grupo, agenda e lembretes',
      'Bíblia online com várias traduções, favoritos, destaques e histórico de leitura',
      'Chamadas de voz e vídeo em grupo direto no navegador, com WebRTC',
      'Pedidos de oração com comentários e participantes',
      'Diário devocional ligado aos versículos',
      'Painel com engajamento, distribuição por região e horários mais procurados',
    ],
    contributions: [
      'Módulos Hora da Fé e de oração',
      'Cadastro de Bíblias e leitura na plataforma',
      'Chamadas de vídeo entre grupos',
    ],
    link: 'https://saladorei.com.br/',
    privateCode: true,
  },
  {
    slug: 'nown',
    title: 'Nown',
    summary: 'Plataforma proprietária que entrega aplicações web, mobile e desktop a partir de um único código.',
    category: 'Plataformas',
    tags: ['PHP 8', 'JavaScript', 'MySQL', 'PWA', 'WebRTC'],
    cover: nownCover,
    illustrativeCover: true,
    role: 'Engenheiro de software',
    about:
      'A plataforma em que trabalho todos os dias. Tem roteamento SPA próprio, banco de dados gerado a partir de esquemas declarativos e recursos prontos como pagamentos, notificações, assinaturas, chat e chamadas, para criar produtos que rodam na web, no iPhone, no Android e no computador.',
    highlights: [
      'Um único código para web, iOS, Android e desktop (PWA)',
      'Roteador SPA com View Transitions, cache de páginas e Service Worker',
      'Tabelas e telas de administração geradas a partir de esquemas JSON',
      'Notificações em tempo real, por push e por e-mail',
      'Pagamentos com webhooks e planos com cotas de uso',
      'Chamadas de voz e vídeo com WebRTC',
    ],
    contributions: [
      'Desenvolvimento de módulos de produto, do banco de dados às telas',
      'Uso dos recursos da plataforma, como pagamentos, notificações, assinaturas e chamadas, dentro dos módulos',
    ],
    link: 'https://nown.com.br/',
    privateCode: true,
  },
  {
    slug: 'eg-apostas',
    title: 'EG Apostas',
    summary: 'Sistema interno de gestão para uma operação de apostas esportivas, com controle financeiro e indicadores de risco.',
    category: 'Dados e IA',
    tags: ['PHP', 'JavaScript', 'MySQL', 'ECharts', 'Dashboards'],
    cover: egApostasCover,
    illustrativeCover: true,
    role: 'Desenvolvedor full stack',
    about:
      'Back office usado apenas pela equipe da operação. Centraliza o registro das apostas por casa, esporte e liga, o controle de contas, receitas, despesas e comissões, e transforma esses dados em indicadores de desempenho e de risco.',
    highlights: [
      'Central de controle com desempenho e rendimento por operador e por casa',
      'Indicadores de risco (exposição, drawdown e concentração) com alertas',
      'Planejamento com metas, cenários e acompanhamento de progresso',
      'Despesas recorrentes, comissões e saldos por conta',
      'Fluxos de aprovação e registro dos dispositivos de acesso',
    ],
    contributions: ['Desenvolvimento do sistema de controle de apostas', 'Dashboards com indicadores de desempenho e de risco'],
    internal: true,
    privateCode: true,
  },
  {
    slug: 'ecommerce-wevo',
    title: 'E-Commerce Wevo',
    summary: 'Backend de integração com gateways de pagamento para uma plataforma de e-commerce.',
    category: 'E-commerce',
    tags: ['Java', 'Spring', 'APIs REST', 'Mensageria', 'MySQL'],
    cover: wevoCover,
    illustrativeCover: true,
    role: 'Desenvolvedor backend',
    about:
      'Plataforma de e-commerce em que atuei no backend, cuidando de toda a parte de integração entre a loja e os gateways de pagamento.',
    highlights: [
      'Integração com gateways de pagamento',
      'Pedidos vinculados às transações, do checkout à confirmação',
      'Processamento de eventos de pagamento com mensageria',
    ],
    contributions: [
      'Integração do backend com os gateways de pagamento',
      'Vínculo entre pedidos e transações, do checkout à confirmação',
      'APIs REST para a comunicação entre a loja e os serviços de pagamento',
      'Processamento de eventos de pagamento com mensageria',
    ],
    privateCode: true,
  },
]

export const projectCategories: ProjectCategory[] = ['Plataformas', 'E-commerce', 'Social', 'Dados e IA']

export const featuredProjects = projects.filter((p) => p.featured)

export function linkHost(url: string) {
  return new URL(url).host.replace(/^www\./, '')
}
