# SuperFolio - AI Task Templates

## 🇧🇷 Localization Requirement (CRITICAL)

**All user-facing content MUST be in Brazilian Portuguese (pt-BR)**

- Button labels, form fields, error messages, tooltips
- Page titles, headings, navigation items
- Alt texts, ARIA labels, placeholder text

**Code structure remains in English** (variables, functions, comments)

## Quick Reference Templates

### 1. Component Creation

```
Create a {ComponentName} component following SuperFolio standards:

Requirements:
- TypeScript with strict typing
- CSS modules with design system variables
- Brazilian Portuguese for all UI text
- Accessibility compliant (WCAG AA)
- Unit tests included
- Props interface with JSDoc

Component should:
{specific functionality requirements}

Use existing patterns from similar components.
```

### 2. Page Development

```
Create a {PageName} page following SuperFolio architecture:

Requirements:
- React Router integration
- Portuguese page title and content
- Error boundary implementation
- Loading states with "Carregando..." text
- Responsive design (mobile-first)
- E2E tests with Playwright

Page should include:
{specific page requirements}

Follow existing page structure patterns.
```

### 3. Feature Implementation

```
Implement {FeatureName} feature for SuperFolio:

Requirements:
- Follow existing code patterns
- Portuguese user messages
- Error handling with user-friendly messages
- Type-safe implementation
- Unit and integration tests
- Performance optimized

Feature includes:
{specific feature requirements}

Integrate with existing state management (Zustand/Context).
```

### 4. Bug Fix

```
Fix the following issue in SuperFolio:

Problem: {describe the bug}
Expected: {expected behavior}
Actual: {actual behavior}

Requirements:
- Minimal code changes
- Preserve existing functionality
- Add regression test
- Update documentation if needed

Please investigate and provide a targeted fix.
```

### 5. Component Refactoring

```
Refactor {ComponentName} to improve {performance/maintainability/accessibility}:

Current issues:
{list specific issues}

Requirements:
- Maintain existing API
- Improve {specific aspect}
- Update tests accordingly
- Follow SuperFolio coding standards

Ensure all Portuguese content remains intact.
```

### 6. Testing Implementation

```
Add comprehensive tests for {ComponentName/FeatureName}:

Test requirements:
- Unit tests for all functionality
- Portuguese content validation
- Accessibility testing
- Error state handling
- Edge cases coverage

Use existing test patterns and ensure 80%+ coverage.
```

### 7. Style Implementation

```
Implement styling for {ComponentName} following SuperFolio design system:

Requirements:
- CSS modules with design variables
- Responsive design (mobile-first)
- Dark theme compatibility
- Hover/focus states
- Accessibility considerations

Follow existing component styling patterns.
```

## Common Patterns

### Error Messages (Portuguese)

- "Campo obrigatório"
- "E-mail inválido"
- "Senha deve ter pelo menos 8 caracteres"
- "Algo deu errado. Tente novamente."
- "Carregando..."
- "Salvo com sucesso"

### Button Labels (Portuguese)

- "Salvar"
- "Cancelar"
- "Enviar"
- "Voltar"
- "Continuar"
- "Escolher"
- "Visualizar"
- "Editar"
- "Excluir"

### Form Labels (Portuguese)

- "Nome completo"
- "E-mail"
- "Telefone"
- "Cargo/Profissão"
- "Sobre mim"
- "Habilidades"
- "Experiência"
- "Projetos"

### Navigation (Portuguese)

- "Início"
- "Templates"
- "Meus Dados"
- "Visualizar"
- "Configurações"
- "Ajuda"

## Code Quality Checklist

Before completing any task:

- [ ] All UI text in Portuguese
- [ ] TypeScript strict typing
- [ ] CSS modules with design variables
- [ ] Accessibility compliance
- [ ] Unit tests with Portuguese validation
- [ ] Error handling
- [ ] Performance optimizations
- [ ] Mobile responsiveness
- [ ] Follows existing patterns
