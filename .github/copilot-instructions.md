# SuperFolio - AI Agent Instructions

## Project Overview

SuperFolio is a SaaS platform that allows developers to create personalized portfolios through predefined templates. Users fill in basic information and the system generates a customized static website.

## Technology Stack

- **Frontend**: React 19.1.0 + TypeScript
- **Build Tool**: Vite 6.3.5
- **Minification**: Terser
- **Styling**: CSS (planned: Tailwind CSS or Styled Components)
- **Linting**: ESLint with React/TypeScript configurations
- **Deployment**: GitHub Pages with GitHub Actions
- **Domain**: superfolio.dev.br

## System Architecture

### Current Structure

```
superfolio/
├── src/
│   ├── components/          # Reusable components
│   ├── templates/           # Portfolio templates
│   ├── pages/               # Application pages
│   ├── hooks/               # Custom hooks
│   ├── utils/               # Utility functions
│   ├── types/               # TypeScript definitions
│   ├── services/            # API services
│   └── assets/              # Static resources
├── public/                  # Public files
└── dist/                    # Production build
```

### Main Flow

1. **Template Selection**: User chooses a template
2. **Data Form**: Fill in personal/professional information
3. **Preview**: Real-time visualization
4. **Generation**: Static site creation
5. **Deploy**: Automatic hosting

## Core Features

### 1. Template System

- Responsive and modern templates
- Categories: Developer, Designer, Freelancer, etc.
- Customization of colors, typography and layout
- Support for different sections (about, projects, contact, etc.)

### 2. Data Editor

- Structured form for information collection
- Image upload (profile photo, projects)
- Social media integration
- Real-time data validation

### 3. Real-time Preview

- Instant visualization of changes
- Responsiveness on different devices
- Dark/light mode

### 4. Static Site Generation

- Export to optimized HTML/CSS/JS
- SEO optimized
- Performance optimized
- PWA ready

## Data Structure

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

## Development Conventions

### Naming

- **Components**: PascalCase (e.g., `TemplateCard`)
- **Hooks**: camelCase with `use` prefix (e.g., `useTemplateData`)
- **Utilities**: camelCase (e.g., `formatDate`)
- **Constants**: SCREAMING_SNAKE_CASE (e.g., `API_ENDPOINTS`)

### Component Structure

```typescript
// Standard structure example
interface ComponentNameProps {
  // Props interface
}

export const ComponentName: React.FC<ComponentNameProps> = ({
  // Destructuring props
}) => {
  // Hooks and state

  // Handlers and functions

  // Render
  return (
    // JSX
  );
};
```

### File Organization

- One component per file
- Index.ts for centralized exports
- Co-location of tests and styles
- Clear separation between logic and presentation

## UI/UX Guidelines

### Design System

- **Colors**: Modern and accessible palette
- **Typography**: Clear and readable hierarchy
- **Spacing**: Consistent system (8px grid)
- **Components**: Reusable library

### Responsiveness

- Mobile-first approach
- Breakpoints: 640px, 768px, 1024px, 1280px
- Touch-friendly (minimum 44px for clickable elements)

### Accessibility

- WCAG AA minimum contrast
- Keyboard navigation
- Appropriate ARIA labels
- Correct HTML semantics

## Code Patterns

### TypeScript

- Strict mode enabled
- Interfaces for all props
- Explicit types where necessary
- Avoid `any`, use `unknown` when appropriate

### React

- Functional components with hooks
- Custom hooks for reusable logic
- Proper memoization (React.memo, useMemo, useCallback)
- Error boundaries for error handling

### Performance

- Code splitting by routes
- Lazy loading of heavy components
- Image optimization
- Regular bundle analysis

## API Integration

### Service Structure

```typescript
// services/api.ts
class ApiService {
  private baseURL: string

  async createPortfolio(data: UserProfile): Promise<Portfolio> {
    // Implementation
  }

  async uploadImage(file: File): Promise<string> {
    // Implementation
  }
}
```

### Error Handling

- Consistent try-catch
- Error boundaries for UI
- Clear user feedback
- Structured logging

## Testing Strategy

### Test Structure

- **Unit Tests**: Utility functions and hooks
- **Component Tests**: Rendering and interactions
- **Integration Tests**: Complete flows
- **E2E Tests**: Critical scenarios

### Tools

- Jest for unit tests
- React Testing Library for components
- Cypress for E2E
- MSW for API mocking

## Deployment

✅ **Deployment is already configured and working**

### Automatic Build & Deploy

- **Trigger**: Every push to `main` branch
- **Platform**: GitHub Pages with GitHub Actions
- **Custom Domain**: superfolio.dev.br (DNS configured)
- **HTTPS**: Enabled automatically

### Build Process

```bash
npm run dev       # Local development
npm run build     # Production build
npm run preview   # Preview local build
npm run lint      # Linting
npm run test      # Tests
```

### GitHub Actions Workflow

- **Location**: `.github/workflows/deploy.yml`
- **Process**: Checkout → Setup Node.js → Install → Lint → Build → Deploy
- **Status**: Monitor in GitHub Actions tab

### Environment Variables

```
VITE_API_URL=         # API URL
VITE_UPLOAD_URL=      # File upload URL
VITE_APP_ENV=         # development | staging | production
```

## Development Roadmap

### Phase 1: Foundation

- [ ] Design system setup
- [ ] Base components creation
- [ ] Routing structure
- [ ] TypeScript types system

### Phase 2: Templates

- [ ] Development of 3-5 initial templates
- [ ] Template selection system
- [ ] Template preview

### Phase 3: Editor

- [ ] Structured data form
- [ ] Image upload
- [ ] Real-time preview
- [ ] Data validation

### Phase 4: Generation

- [ ] Static site generation engine
- [ ] Performance optimization
- [ ] Automatic SEO

### Phase 5: Deploy

- [ ] Hosting services integration
- [ ] Custom domains system
- [ ] Basic analytics

## AI Agent Specific Instructions

### When Implementing New Features

1. Always create/update TypeScript types first
2. Implement tests before code (TDD when appropriate)
3. Follow established naming conventions
4. Consider accessibility and responsiveness
5. Document complex APIs and components

### When Making Changes

1. Check impact on dependent components
2. Update related tests
3. Maintain consistency with design system
4. Optimize performance when relevant

### Quality Priorities

1. **Functionality**: Code must work correctly
2. **Maintainability**: Clean and well-structured code
3. **Performance**: Sensible optimizations
4. **Accessibility**: Inclusive by design
5. **UX**: Smooth user experience

### Debugging and Troubleshooting

- Use React DevTools for component analysis
- Strategic console.log during development
- Error boundaries for error capture
- Network tab for API debugging

## External Resources

### Documentation

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)

### Design Inspiration

- [Dribbble - Portfolio Designs](https://dribbble.com/tags/portfolio)
- [Awwwards](https://www.awwwards.com/)
- [Behance](https://www.behance.net/)

---

_This documentation should be updated as the project evolves. Current version: 1.2_
_Last update: Documentation translated to English and deployment status updated_
