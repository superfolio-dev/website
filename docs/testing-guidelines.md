# SuperFolio - Testing Guidelines

## 🇧🇷 Portuguese Content Testing

All user-facing content tests MUST validate Portuguese text:

```typescript
// ✅ Good - Testing Portuguese content
describe('Button', () => {
  it('displays loading text in Portuguese', () => {
    render(<Button isLoading>Enviar</Button>)
    expect(screen.getByText('Carregando...')).toBeInTheDocument()
  })

  it('displays validation error in Portuguese', () => {
    render(<FormField error="Campo obrigatório" />)
    expect(screen.getByText('Campo obrigatório')).toBeInTheDocument()
  })
})
```

## Unit Testing (Vitest + React Testing Library)

### Component Test Structure

```typescript
// Component.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Component } from './Component'

describe('Component', () => {
  it('renders correctly', () => {
    render(<Component title="Teste" />)
    expect(screen.getByText('Teste')).toBeInTheDocument()
  })

  it('handles user interactions', () => {
    const onAction = vi.fn()
    render(<Component onAction={onAction} />)

    fireEvent.click(screen.getByRole('button'))
    expect(onAction).toHaveBeenCalledOnce()
  })

  it('meets accessibility requirements', () => {
    render(<Component />)
    expect(screen.getByRole('button')).toHaveAccessibleName()
  })
})
```

### Custom Hook Testing

```typescript
// useCustomHook.test.ts
import { renderHook, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { useCustomHook } from './useCustomHook'

describe('useCustomHook', () => {
  it('returns initial state', () => {
    const { result } = renderHook(() => useCustomHook())
    expect(result.current.value).toBe(initialValue)
  })

  it('updates state correctly', () => {
    const { result } = renderHook(() => useCustomHook())

    act(() => {
      result.current.setValue('new value')
    })

    expect(result.current.value).toBe('new value')
  })
})
```

## E2E Testing (Playwright)

### Page Test Structure

```typescript
// tests/e2e/template-selection.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Template Selection', () => {
  test('displays page content in Portuguese', async ({ page }) => {
    await page.goto('/templates')

    await expect(page).toHaveTitle('Selecionar Template - SuperFolio')
    await expect(page.getByHeading('Escolha seu template')).toBeVisible()
  })

  test('filters templates by category', async ({ page }) => {
    await page.goto('/templates')

    await page.getByRole('button', { name: 'Desenvolvedor' }).click()
    await expect(page.getByTestId('template-card')).toHaveCount(3)
  })

  test('opens template preview modal', async ({ page }) => {
    await page.goto('/templates')

    await page.getByTestId('template-card').first().click()
    await expect(page.getByRole('dialog')).toBeVisible()
    await expect(
      page.getByRole('button', { name: 'Usar Template' })
    ).toBeVisible()
  })
})
```

### Mobile Testing

```typescript
test.describe('Mobile viewport', () => {
  test.use({ viewport: { width: 375, height: 667 } })

  test('template grid works on mobile', async ({ page }) => {
    await page.goto('/templates')

    // Verify mobile layout
    const grid = page.getByTestId('template-grid')
    await expect(grid).toHaveCSS('grid-template-columns', '1fr')
  })
})
```

## Test Configuration

### Vitest Setup

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
  },
})
```

### Test Setup File

```typescript
// src/test/setup.ts
import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

afterEach(() => {
  cleanup()
})
```

### Playwright Config

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  use: {
    baseURL: 'http://localhost:3000',
    locale: 'pt-BR',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'Mobile Chrome', use: { ...devices['Pixel 5'] } },
  ],
})
```

## Testing Patterns

### Mock Data

```typescript
// __mocks__/data.ts
export const mockUser = {
  name: 'João Silva',
  email: 'joao@exemplo.com',
  title: 'Desenvolvedor Front-end',
}

export const mockTemplate = {
  id: 'modern-dev',
  name: 'Desenvolvedor Moderno',
  category: 'Developer',
}
```

### Context Testing

```typescript
// Test components that use context
const renderWithContext = (component: ReactElement) => {
  return render(<FormProvider>{component}</FormProvider>)
}

describe('FormField with context', () => {
  it('updates form data through context', () => {
    renderWithContext(<FormField name="email" />)
    // Test context integration
  })
})
```

### Store Testing

```typescript
// Test Zustand stores
import { useAppStore } from '../stores/useAppStore'

describe('useAppStore', () => {
  beforeEach(() => {
    useAppStore.setState({ user: null, theme: 'dark' })
  })

  it('updates user state', () => {
    useAppStore.getState().setUser(mockUser)
    expect(useAppStore.getState().user).toEqual(mockUser)
  })
})
```

## Coverage Requirements

- **Minimum coverage**: 80% for new code
- **Components**: 100% test coverage required
- **Utils/Hooks**: 90% minimum coverage
- **Pages**: E2E tests covering main flows

## Test Commands

```bash
npm run test              # Run unit tests
npm run test:watch        # Watch mode
npm run test:coverage     # Generate coverage report
npm run e2e               # Run E2E tests
npm run e2e:ui            # E2E tests with UI
```
