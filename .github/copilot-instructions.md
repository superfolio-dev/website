# SuperFolio - AI Agent Instructions

## Project Overview

SuperFolio is a SaaS platform that allows developers to create personalized portfolios through predefined templates. Users fill in basic information and the system generates a customized static website.

## 🎯 Task Categorization System

Before starting any task, identify the category and refer to the appropriate documentation:

### 1. **Component Development**

**Primary**: `docs/component-guidelines.md`
**Also consult**: `docs/coding-standards.md`, `docs/design-system.md`, `docs/testing-guidelines.md`

- Creating new components
- Updating existing components
- Component refactoring
- UI implementation

### 2. **Page Development**

**Primary**: `docs/architecture.md`
**Also consult**: `docs/component-guidelines.md`, `docs/design-system.md`, `docs/testing-guidelines.md`

- New page creation
- Multi-step flows
- Page-level state management
- Routing implementation

### 3. **Feature Implementation**

**Primary**: `docs/ai-task-templates.md`
**Also consult**: `docs/architecture.md`, `docs/coding-standards.md`, `docs/component-guidelines.md`

- New feature development
- API integrations
- Complex user flows
- Business logic implementation

### 4. **Bug Fixes & Performance**

**Primary**: `docs/ai-task-templates.md`
**Also consult**: `docs/coding-standards.md`, `docs/testing-guidelines.md`

- Bug investigation and fixes
- Performance optimization
- Error handling improvements
- Memory leak fixes

### 5. **Testing**

**Primary**: `docs/testing-guidelines.md`
**Also consult**: `docs/coding-standards.md`, `docs/component-guidelines.md`

- Unit test creation
- Integration test implementation
- E2E test development
- Test refactoring

### 6. **Code Quality & Refactoring**

**Primary**: `docs/coding-standards.md`
**Also consult**: `docs/architecture.md`, `docs/component-guidelines.md`

- Code refactoring
- TypeScript improvements
- Linting fixes
- Standards compliance

### 7. **Styling & Design**

**Primary**: `docs/design-system.md`
**Also consult**: `docs/component-guidelines.md`, `docs/coding-standards.md`

- CSS implementation
- Design system usage
- Responsive design
- Theme implementation

## 📚 Documentation Quick Reference

- **`docs/coding-standards.md`** - TypeScript, React, and code quality standards
- **`docs/component-guidelines.md`** - Component patterns and implementation guides
- **`docs/architecture.md`** - Project structure, state management, and data flow
- **`docs/design-system.md`** - CSS variables, components, and design patterns
- **`docs/testing-guidelines.md`** - Testing strategies, patterns, and configuration
- **`docs/ai-task-templates.md`** - Standardized prompts for common tasks

## Technology Stack

- **Frontend**: React 19.1.0 + TypeScript
- **Build Tool**: Vite 6.3.5
- **Minification**: Terser
- **Styling**: CSS Modules + Design System Variables
- **State Management**: Zustand + React Context
- **Testing**: Vitest + React Testing Library + Playwright
- **Linting**: ESLint with React/TypeScript configurations
- **Deployment**: GitHub Pages with GitHub Actions
- **Domain**: superfolio.dev.br

## System Architecture

### Current Structure

```
superfolio/
├── src/
│   ├── components/          # Reusable components
│   ├── pages/               # Application pages
│   ├── templates/           # Portfolio templates
│   ├── hooks/               # Custom hooks
│   ├── stores/              # Zustand stores
│   ├── contexts/            # React contexts
│   ├── utils/               # Utility functions
│   ├── types/               # TypeScript definitions
│   ├── services/            # API services
│   ├── assets/              # Static resources
│   └── styles/              # Global styles
├── docs/                    # Documentation
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
- Categories: Developer, Designer, Freelancer, Business
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

## Development Guidelines

### Localization Standards

- **Target Audience**: Brazilian customers
- **User-facing content**: ALL text, labels, buttons, messages, alt texts, etc. MUST be in Brazilian Portuguese (pt-BR)
- **Code**: Variable names, function names, comments, and documentation MUST remain in English
- **Date/Time formats**: Use Brazilian format (DD/MM/YYYY, 24h)
- **Number formats**: Use Brazilian decimal separator (comma) and thousands separator (dot)

### TypeScript Standards

- Strict mode enabled
- Interfaces for all props
- Explicit types where necessary
- Avoid `any`, use `unknown` when appropriate
- No semicolons (enforced by ESLint)
- Type-only imports: `import type { Type } from 'module'`

### React Patterns

- Functional components with hooks
- Arrow function components (no React.FC)
- Custom hooks for reusable logic
- Proper memoization (React.memo, useMemo, useCallback)
- Error boundaries for error handling

### CSS Standards

- CSS Modules for component styling
- Design system CSS variables
- Mobile-first responsive design
- Dark theme as default
- No external CSS frameworks

### State Management

- **Zustand**: Global application state
- **React Context**: Component tree state
- **Local State**: Component-specific state
- Persist important state with localStorage

## AI Agent Instructions

### Core Principles

- **Be concise**: Keep responses focused and minimal
- **Minimal changes**: Make only necessary changes to avoid context bloat
- **Prevent hallucinations**: Limit scope to avoid infinite iterations
- **Suggest slicing**: For complex requests, suggest breaking into smaller prompts

### Before Starting Any Task

1. **Categorize the task** using the system above
2. **Refer to PRIMARY documentation** for patterns and standards
3. **Consult SECONDARY documentation** for additional context
4. **Check existing code** for similar implementations
5. **Follow established patterns** consistently

### When Creating Components

**Must consult**:

- `docs/component-guidelines.md` (component patterns)
- `docs/coding-standards.md` (TypeScript/React standards)
- `docs/design-system.md` (styling and CSS variables)
- `docs/testing-guidelines.md` (test patterns)

### When Creating Pages

**Must consult**:

- `docs/architecture.md` (page structure and state management)
- `docs/component-guidelines.md` (component composition)
- `docs/design-system.md` (responsive design)
- `docs/testing-guidelines.md` (E2E test patterns)

### When Implementing Features

**Must consult**:

- `docs/ai-task-templates.md` (feature development templates)
- `docs/architecture.md` (data flow and API patterns)
- `docs/coding-standards.md` (code quality standards)
- `docs/component-guidelines.md` (if UI components needed)

### When Fixing Bugs

**Must consult**:

- `docs/ai-task-templates.md` (bug fix templates)
- `docs/coding-standards.md` (quality standards)
- `docs/testing-guidelines.md` (regression test patterns)

### When Writing Tests

**Must consult**:

- `docs/testing-guidelines.md` (test patterns and setup)
- `docs/coding-standards.md` (code organization)
- `docs/component-guidelines.md` (component test patterns)

### When Refactoring

**Must consult**:

- `docs/coding-standards.md` (code quality standards)
- `docs/architecture.md` (structural patterns)
- `docs/component-guidelines.md` (component patterns)

### When Styling

**Must consult**:

- `docs/design-system.md` (CSS variables and patterns)
- `docs/component-guidelines.md` (styling patterns)
- `docs/coding-standards.md` (CSS organization)

## Quality Checklist

Before completing any task, ensure:

- [ ] **Standards**: Follows coding standards from `docs/coding-standards.md`
- [ ] **Patterns**: Uses established patterns from relevant documentation
- [ ] **Localization**: All user-facing text is in Brazilian Portuguese (pt-BR)
- [ ] **Accessibility**: Meets WCAG AA standards
- [ ] **Responsiveness**: Works on mobile, tablet, and desktop
- [ ] **Testing**: Includes appropriate tests
- [ ] **TypeScript**: Strict typing with no `any` types
- [ ] **Performance**: Optimized for Core Web Vitals
- [ ] **Documentation**: JSDoc comments for complex logic

### Response Guidelines

- **Concise answers**: Keep responses focused and minimal
- **One change at a time**: Avoid making multiple unrelated changes
- **Suggest prompt slicing**: If request is complex, suggest breaking it down:
  ```
  "This is a large task. I suggest breaking it into smaller prompts:
  1. [Specific subtask 1]
  2. [Specific subtask 2]
  3. [Specific subtask 3]
  Would you like to start with #1?"
  ```

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

---

_Updated: Complete documentation system with concise AI response guidelines_
