# SuperFolio - Instruções para AI Agent

## Visão Geral do Projeto

SuperFolio é uma plataforma SaaS que permite desenvolvedores criarem portfólios personalizados através de templates predefinidos. O usuário preenche informações básicas e o sistema gera um site estático personalizado.

## Stack Tecnológica

- **Frontend**: React 19.1.0 + TypeScript
- **Build Tool**: Vite 6.3.5
- **Styling**: CSS (planejado: Tailwind CSS ou Styled Components)
- **Linting**: ESLint com configurações para React/TypeScript
- **Deployment**: Planejado para sites estáticos (Vercel, Netlify)

## Arquitetura do Sistema

### Estrutura Atual

```
superfolio/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   ├── templates/           # Templates de portfólio
│   ├── pages/               # Páginas da aplicação
│   ├── hooks/               # Custom hooks
│   ├── utils/               # Funções utilitárias
│   ├── types/               # Definições TypeScript
│   ├── services/            # Serviços de API
│   └── assets/              # Recursos estáticos
├── public/                  # Arquivos públicos
└── dist/                    # Build de produção
```

### Fluxo Principal

1. **Seleção de Template**: Usuário escolhe um template
2. **Formulário de Dados**: Preenchimento de informações pessoais/profissionais
3. **Preview**: Visualização em tempo real
4. **Geração**: Criação do site estático
5. **Deploy**: Hospedagem automática

## Funcionalidades Core

### 1. Sistema de Templates

- Templates responsivos e modernos
- Categorias: Desenvolvedor, Designer, Freelancer, etc.
- Customização de cores, tipografia e layout
- Suporte a diferentes seções (sobre, projetos, contato, etc.)

### 2. Editor de Dados

- Formulário estruturado para coleta de informações
- Upload de imagens (foto de perfil, projetos)
- Integração com redes sociais
- Validação de dados em tempo real

### 3. Preview em Tempo Real

- Visualização instantânea das mudanças
- Responsividade em diferentes dispositivos
- Modo escuro/claro

### 4. Geração de Site Estático

- Export para HTML/CSS/JS otimizado
- SEO otimizado
- Performance otimizada
- PWA ready

## Estrutura de Dados

### UserProfile

```typescript
interface UserProfile {
  personal: {
    name: string
    title: string
    bio: string
    avatar: string
    location?: string
  }
  contact: {
    email: string
    phone?: string
    website?: string
    linkedin?: string
    github?: string
    twitter?: string
  }
  skills: Skill[]
  experience: Experience[]
  education: Education[]
  projects: Project[]
}
```

### Template

```typescript
interface Template {
  id: string
  name: string
  category: TemplateCategory
  thumbnail: string
  features: string[]
  customizable: {
    colors: boolean
    typography: boolean
    layout: boolean
  }
}
```

## Convenções de Desenvolvimento

### Nomenclatura

- **Componentes**: PascalCase (ex: `TemplateCard`)
- **Hooks**: camelCase com prefixo `use` (ex: `useTemplateData`)
- **Utilitários**: camelCase (ex: `formatDate`)
- **Constantes**: SCREAMING_SNAKE_CASE (ex: `API_ENDPOINTS`)

### Estrutura de Componentes

```typescript
// Exemplo de estrutura padrão
interface ComponentNameProps {
  // Props interface
}

export const ComponentName: React.FC<ComponentNameProps> = ({
  // Destructuring props
}) => {
  // Hooks e state

  // Handlers e funções

  // Render
  return (
    // JSX
  );
};
```

### Organização de Arquivos

- Um componente por arquivo
- Index.ts para exports centralizados
- Co-location de testes e estilos
- Separação clara entre lógica e apresentação

## Guidelines de UI/UX

### Design System

- **Cores**: Paleta moderna e acessível
- **Tipografia**: Hierarquia clara e legível
- **Espaçamento**: Sistema consistente (8px grid)
- **Componentes**: Biblioteca reutilizável

### Responsividade

- Mobile-first approach
- Breakpoints: 640px, 768px, 1024px, 1280px
- Touch-friendly (mínimo 44px para elementos clicáveis)

### Acessibilidade

- Contraste mínimo WCAG AA
- Navegação por teclado
- ARIA labels apropriados
- Semântica HTML correta

## Padrões de Código

### TypeScript

- Strict mode habilitado
- Interfaces para todas as props
- Tipos explícitos onde necessário
- Evitar `any`, usar `unknown` quando apropriado

### React

- Functional components com hooks
- Custom hooks para lógica reutilizável
- Memoização adequada (React.memo, useMemo, useCallback)
- Error boundaries para captura de erros

### Performance

- Code splitting por rotas
- Lazy loading de componentes pesados
- Otimização de imagens
- Bundle analysis regular

## Integração com APIs

### Estrutura de Serviços

```typescript
// services/api.ts
class ApiService {
  private baseURL: string

  async createPortfolio(data: UserProfile): Promise<Portfolio> {
    // Implementação
  }

  async uploadImage(file: File): Promise<string> {
    // Implementação
  }
}
```

### Error Handling

- Try-catch consistente
- Error boundaries para UI
- Feedback claro para usuário
- Logging estruturado

## Testing Strategy

### Estrutura de Testes

- **Unit Tests**: Funções utilitárias e hooks
- **Component Tests**: Renderização e interações
- **Integration Tests**: Fluxos completos
- **E2E Tests**: Cenários críticos

### Tools

- Jest para testes unitários
- React Testing Library para componentes
- Cypress para E2E
- MSW para mock de APIs

## Deployment

### Build Process

```bash
npm run build     # Build de produção
npm run preview   # Preview local do build
npm run lint      # Linting
npm run test      # Testes
```

### Environment Variables

```
VITE_API_URL=         # URL da API
VITE_UPLOAD_URL=      # URL para upload de arquivos
VITE_APP_ENV=         # development | staging | production
```

## Próximos Passos de Desenvolvimento

### Fase 1: Fundação

- [ ] Setup do design system
- [ ] Criação de componentes base
- [ ] Estrutura de roteamento
- [ ] Sistema de tipos TypeScript

### Fase 2: Templates

- [ ] Desenvolvimento de 3-5 templates iniciais
- [ ] Sistema de seleção de templates
- [ ] Preview de templates

### Fase 3: Editor

- [ ] Formulário de dados estruturado
- [ ] Upload de imagens
- [ ] Preview em tempo real
- [ ] Validação de dados

### Fase 4: Geração

- [ ] Engine de geração de sites estáticos
- [ ] Otimização de performance
- [ ] SEO automático

### Fase 5: Deploy

- [ ] Integração com serviços de hosting
- [ ] Sistema de domínios personalizados
- [ ] Analytics básico

## Instruções Específicas para AI

### Ao Implementar Novos Recursos

1. Sempre criar/atualizar tipos TypeScript primeiro
2. Implementar testes antes do código (TDD quando apropriado)
3. Seguir os padrões de nomenclatura estabelecidos
4. Considerar acessibilidade e responsividade
5. Documentar APIs e componentes complexos

### Ao Fazer Mudanças

1. Verificar impacto em componentes dependentes
2. Atualizar testes relacionados
3. Manter consistência com design system
4. Otimizar performance quando relevante

### Prioridades de Qualidade

1. **Funcionalidade**: Código deve funcionar corretamente
2. **Manutenibilidade**: Código limpo e bem estruturado
3. **Performance**: Otimizações sensatas
4. **Acessibilidade**: Inclusivo por design
5. **UX**: Experiência do usuário fluida

### Debugging e Troubleshooting

- Usar React DevTools para análise de componentes
- Console.log estratégico durante desenvolvimento
- Error boundaries para captura de erros
- Network tab para debugging de APIs

## Recursos Externos

### Documentação

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)

### Design Inspiration

- [Dribbble - Portfolio Designs](https://dribbble.com/tags/portfolio)
- [Awwwards](https://www.awwwards.com/)
- [Behance](https://www.behance.net/)

---

_Esta documentação deve ser atualizada conforme o projeto evolui. Versão atual: 1.0_
