import type { Template, UserProfile } from '../types/Template'

export const mockUserProfile: UserProfile = {
  personal: {
    name: 'João Silva',
    title: 'Desenvolvedor Front-end',
    bio: 'Desenvolvedor apaixonado por criar experiências digitais incríveis. Com mais de 5 anos de experiência em React, TypeScript e desenvolvimento web moderno, busco sempre entregar soluções de alta qualidade que fazem a diferença na vida das pessoas.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
    location: 'São Paulo, SP'
  },
  contact: {
    email: 'joao.silva@email.com',
    linkedin: 'https://linkedin.com/in/joaosilva',
    github: 'https://github.com/joaosilva',
    website: 'https://joaosilva.dev'
  },
  skills: [
    'React',
    'TypeScript',
    'JavaScript',
    'Node.js',
    'Next.js',
    'CSS',
    'HTML',
    'Git',
    'REST APIs',
    'GraphQL'
  ],
  experience: [
    {
      company: 'TechCorp',
      position: 'Desenvolvedor Front-end Sênior',
      period: '2022 - Presente',
      description: 'Liderança técnica em projetos de grande escala, desenvolvimento de componentes reutilizáveis e mentoria de desenvolvedores juniores.'
    },
    {
      company: 'StartupXYZ',
      position: 'Desenvolvedor Full-stack',
      period: '2020 - 2022',
      description: 'Desenvolvimento completo de aplicações web usando React, Node.js e PostgreSQL. Implementação de features críticas e otimização de performance.'
    },
    {
      company: 'AgencyABC',
      position: 'Desenvolvedor Front-end',
      period: '2019 - 2020',
      description: 'Criação de sites responsivos e aplicações web para diversos clientes, focando em experiência do usuário e performance.'
    }
  ],
  education: [
    {
      institution: 'Universidade de São Paulo',
      degree: 'Bacharelado em Ciência da Computação',
      period: '2015 - 2019'
    }
  ],
  projects: [
    {
      name: 'E-commerce Platform',
      description: 'Plataforma completa de e-commerce com React, Node.js e PostgreSQL. Incluindo sistema de pagamentos, gestão de estoque e dashboard administrativo.',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      link: 'https://github.com/joaosilva/ecommerce',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=300&fit=crop'
    },
    {
      name: 'Task Management App',
      description: 'Aplicativo de gerenciamento de tarefas com interface moderna e funcionalidades colaborativas em tempo real.',
      technologies: ['React', 'TypeScript', 'Socket.io', 'MongoDB'],
      link: 'https://github.com/joaosilva/taskapp',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=300&fit=crop'
    },
    {
      name: 'Weather Dashboard',
      description: 'Dashboard meteorológico com visualizações interativas e previsões detalhadas usando APIs externas.',
      technologies: ['Vue.js', 'Chart.js', 'Weather API'],
      link: 'https://github.com/joaosilva/weather',
      image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=300&fit=crop'
    }
  ]
}

export const mockTemplate: Template = {
  id: 'modern-developer',
  name: 'Desenvolvedor Moderno',
  category: 'Developer',
  thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
  features: [
    'Design moderno e profissional',
    'Seção de projetos destacada',
    'Responsivo para todos os dispositivos',
    'Otimizado para SEO'
  ],
  customizable: {
    colors: true,
    typography: true,
    layout: false
  }
}
