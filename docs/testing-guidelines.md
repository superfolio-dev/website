# SuperFolio - Testing Guidelines

## Testing Philosophy

SuperFolio follows a comprehensive testing strategy that ensures code quality, reliability, and maintainability. We prioritize user-focused testing with a balance between unit, integration, and end-to-end tests.

## Testing Requirements

### Mandatory Testing Standards

- **All components require unit tests**: Every `.tsx` component must have a corresponding `.test.tsx` file
- **All pages require E2E tests**: Every page must have Playwright end-to-end tests
- **Minimum coverage**: 80% code coverage for new code
- **Test before merge**: All tests must pass before code can be merged
- **No test-less code**: Code without tests will be rejected in reviews

### When to Write Tests

- **Before implementation**: Test-driven development when possible
- **During implementation**: Write tests alongside code
- **Never after**: Don't leave testing as an afterthought

## Testing Stack

### Unit & Integration Testing
- **Framework**: Vitest (faster Jest alternative for Vite projects)
- **Component Testing**: React Testing Library
- **Mocking**: Vitest's built-in mocking + MSW for API mocking
- **Coverage**: Vitest coverage with c8

### End-to-End Testing
- **Framework**: Playwright
- **Target**: Critical user flows and cross-browser compatibility
- **Visual Testing**: Playwright's screenshot comparison

## Test Organization

### File Structure
```
src/
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx           # Unit tests
│   │   ├── Button.module.css
│   │   └── __mocks__/
│   │       └── Button.mocks.ts       # Test data/mocks
├── pages/
│   ├── TemplateSelection/
│   │   ├── TemplateSelection.tsx
│   │   ├── TemplateSelection.test.tsx # Integration tests
│   │   └── TemplateSelection.e2e.test.ts # E2E tests
└── tests/
    ├── setup.ts                      # Test setup
    ├── mocks/                        # Global mocks
    │   ├── handlers.ts               # MSW handlers
    │   └── server.ts                 # MSW server
    └── fixtures/                     # Test data
        ├── users.ts
        └── templates.ts
```

### Naming Conventions
- **Unit Tests**: `ComponentName.test.tsx`
- **Integration Tests**: `PageName.test.tsx`
- **E2E Tests**: `PageName.e2e.test.ts`
- **Mock Files**: `ComponentName.mocks.ts`
- **Test Utilities**: `test-utils.tsx`

## Unit Testing Patterns

### Component Testing Template
```typescript
// components/Button/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Button } from './Button'

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>)
    
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })
  
  it('calls onClick when clicked', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    fireEvent.click(screen.getByRole('button'))
    
    expect(handleClick).toHaveBeenCalledOnce()
  })
  
  it('applies variant styles correctly', () => {
    render(<Button variant="primary">Primary Button</Button>)
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass('primary')
  })
  
  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled Button</Button>)
    
    const button = screen.getRole('button')
    expect(button).toBeDisabled()
  })
})
```

### Hook Testing
```typescript
// hooks/useToggle.test.ts
import { renderHook, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { useToggle } from './useToggle'

describe('useToggle', () => {
  it('initializes with default value', () => {
    const { result } = renderHook(() => useToggle())
    
    expect(result.current[0]).toBe(false)
  })
  
  it('initializes with custom value', () => {
    const { result } = renderHook(() => useToggle(true))
    
    expect(result.current[0]).toBe(true)
  })
  
  it('toggles value when toggle function is called', () => {
    const { result } = renderHook(() => useToggle(false))
    
    act(() => {
      result.current[1]() // toggle function
    })
    
    expect(result.current[0]).toBe(true)
  })
  
  it('sets specific value when setter is called', () => {
    const { result } = renderHook(() => useToggle(false))
    
    act(() => {
      result.current[2](true) // setter function
    })
    
    expect(result.current[0]).toBe(true)
  })
})
```

### Context Testing
```typescript
// contexts/FormContext.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { FormProvider, useFormContext } from './FormContext'

// Test component that uses the context
const TestComponent = () => {
  const { formData, updateField } = useFormContext()
  
  return (
    <div>
      <span data-testid="name">{formData.personal.name}</span>
      <button 
        onClick={() => updateField('personal', { name: 'John Doe' })}
      >
        Update Name
      </button>
    </div>
  )
}

describe('FormContext', () => {
  it('provides form data and update functions', () => {
    render(
      <FormProvider>
        <TestComponent />
      </FormProvider>
    )
    
    expect(screen.getByTestId('name')).toHaveTextContent('')
    
    fireEvent.click(screen.getByRole('button', { name: /update name/i }))
    
    expect(screen.getByTestId('name')).toHaveTextContent('John Doe')
  })
  
  it('throws error when used outside provider', () => {
    // Suppress console.error for this test
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    
    expect(() => render(<TestComponent />)).toThrow(
      'useFormContext must be used within FormProvider'
    )
    
    consoleSpy.mockRestore()
  })
})
```

## Integration Testing Patterns

### Page Testing with Context
```typescript
// pages/TemplateSelection/TemplateSelection.test.tsx
import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { server } from '../../tests/mocks/server'
import { TemplateSelection } from './TemplateSelection'

// Test wrapper with all providers
const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false }
    }
  })
  
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </QueryClientProvider>
  )
}

describe('TemplateSelection Page', () => {
  beforeEach(() => {
    server.resetHandlers()
  })
  
  it('displays templates after loading', async () => {
    render(
      <TestWrapper>
        <TemplateSelection />
      </TestWrapper>
    )
    
    // Should show loading initially
    expect(screen.getByText(/loading/i)).toBeInTheDocument()
    
    // Wait for templates to load
    await waitFor(() => {
      expect(screen.getByText('Modern Developer')).toBeInTheDocument()
    })
    
    // Should show template cards
    expect(screen.getAllByTestId('template-card')).toHaveLength(4)
  })
  
  it('filters templates by category', async () => {
    render(
      <TestWrapper>
        <TemplateSelection />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Modern Developer')).toBeInTheDocument()
    })
    
    // Click Developer filter
    fireEvent.click(screen.getByRole('button', { name: /developer/i }))
    
    // Should only show developer templates
    await waitFor(() => {
      expect(screen.getAllByTestId('template-card')).toHaveLength(2)
    })
  })
  
  it('handles template selection', async () => {
    const mockNavigate = vi.fn()
    vi.mock('react-router-dom', async () => ({
      ...await vi.importActual('react-router-dom'),
      useNavigate: () => mockNavigate
    }))
    
    render(
      <TestWrapper>
        <TemplateSelection />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Modern Developer')).toBeInTheDocument()
    })
    
    // Click on template
    fireEvent.click(screen.getByTestId('template-modern-developer'))
    
    expect(mockNavigate).toHaveBeenCalledWith('/editor/modern-developer')
  })
})
```

## API Mocking with MSW

### Mock Server Setup
```typescript
// tests/mocks/server.ts
import { setupServer } from 'msw/node'
import { handlers } from './handlers'

export const server = setupServer(...handlers)

// Enable API mocking before tests run
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

// Reset handlers after each test
afterEach(() => server.resetHandlers())

// Disable API mocking after tests complete
afterAll(() => server.close())
```

### API Handlers
```typescript
// tests/mocks/handlers.ts
import { http, HttpResponse } from 'msw'
import { templates, users } from '../fixtures'

export const handlers = [
  // Get templates
  http.get('/api/templates', () => {
    return HttpResponse.json(templates)
  }),
  
  // Get user profile
  http.get('/api/users/:id', ({ params }) => {
    const user = users.find(u => u.id === params.id)
    if (!user) {
      return new HttpResponse(null, { status: 404 })
    }
    return HttpResponse.json(user)
  }),
  
  // Create portfolio
  http.post('/api/portfolios', async ({ request }) => {
    const data = await request.json()
    return HttpResponse.json({
      id: 'generated-id',
      ...data,
      createdAt: new Date().toISOString()
    }, { status: 201 })
  }),
  
  // Error scenario
  http.get('/api/templates/error', () => {
    return new HttpResponse(null, { status: 500 })
  })
]
```

### Test Fixtures
```typescript
// tests/fixtures/templates.ts
import type { Template } from '../../src/types'

export const templates: Template[] = [
  {
    id: 'modern-developer',
    name: 'Modern Developer',
    category: 'Developer',
    thumbnail: 'https://via.placeholder.com/400x300',
    features: ['Responsive', 'Dark Mode', 'Projects Showcase'],
    customizable: {
      colors: true,
      typography: true,
      layout: false
    }
  },
  {
    id: 'creative-designer',
    name: 'Creative Designer',
    category: 'Designer',
    thumbnail: 'https://via.placeholder.com/400x300',
    features: ['Portfolio Gallery', 'Animation', 'Custom Colors'],
    customizable: {
      colors: true,
      typography: true,
      layout: true
    }
  }
]
```

## End-to-End Testing

### E2E Test Structure
```typescript
// pages/TemplateSelection/TemplateSelection.e2e.test.ts
import { test, expect } from '@playwright/test'

test.describe('Template Selection Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/templates')
  })
  
  test('user can browse and select templates', async ({ page }) => {
    // Wait for page to load
    await expect(page.getByText('Choose Your Template')).toBeVisible()
    
    // Should display template cards
    await expect(page.getByTestId('template-card')).toHaveCount(4)
    
    // Filter by Developer category
    await page.getByRole('button', { name: 'Developer' }).click()
    await expect(page.getByTestId('template-card')).toHaveCount(2)
    
    // Select a template
    await page.getByTestId('template-modern-developer').click()
    
    // Should navigate to editor
    await expect(page).toHaveURL(/\/editor\/modern-developer/)
  })
  
  test('responsive design works correctly', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    
    // Should show mobile layout
    await expect(page.getByTestId('mobile-filter-menu')).toBeVisible()
    
    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 })
    
    // Should show tablet layout
    await expect(page.getByTestId('template-grid')).toHaveCSS('grid-template-columns', /repeat\(2/)
  })
  
  test('handles errors gracefully', async ({ page }) => {
    // Mock API error
    await page.route('/api/templates', route => {
      route.fulfill({ status: 500 })
    })
    
    await page.reload()
    
    // Should show error message
    await expect(page.getByText(/failed to load templates/i)).toBeVisible()
    
    // Should have retry button
    await expect(page.getByRole('button', { name: /try again/i })).toBeVisible()
  })
})
```

### Visual Testing
```typescript
// tests/visual/components.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Visual Regression Tests', () => {
  test('template cards render correctly', async ({ page }) => {
    await page.goto('/templates')
    
    // Wait for templates to load
    await page.waitForSelector('[data-testid="template-card"]')
    
    // Take screenshot of template grid
    await expect(page.getByTestId('template-grid')).toHaveScreenshot('template-grid.png')
  })
  
  test('dark theme renders correctly', async ({ page }) => {
    await page.goto('/templates')
    
    // Switch to dark theme
    await page.getByRole('button', { name: /toggle theme/i }).click()
    
    // Take full page screenshot
    await expect(page).toHaveScreenshot('template-selection-dark.png', {
      fullPage: true
    })
  })
})
```

## Test Configuration

### Vitest Configuration
```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.ts'],
    css: true,
    coverage: {
      provider: 'c8',
      reporter: ['text', 'html', 'json'],
      exclude: [
        'node_modules/',
        'src/tests/',
        '**/*.test.{ts,tsx}',
        '**/*.spec.{ts,tsx}',
        '**/*.d.ts'
      ]
    }
  }
})
```

### Test Setup
```typescript
// tests/setup.ts
import '@testing-library/jest-dom'
import { server } from './mocks/server'

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
}

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
}

// Setup MSW
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
```

### Playwright Configuration
```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './src',
  testMatch: '**/*.e2e.test.ts',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5174',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] }
    }
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5174',
    reuseExistingServer: !process.env.CI
  }
})
```

## Testing Best Practices

### Do's
- ✅ Test user behavior, not implementation details
- ✅ Use descriptive test names that explain the scenario
- ✅ Keep tests focused and isolated
- ✅ Use data-testid for elements that don't have semantic roles
- ✅ Mock external dependencies and APIs
- ✅ Test error scenarios and edge cases
- ✅ Maintain test data in separate fixture files

### Don'ts
- ❌ Don't test internal component state directly
- ❌ Don't use random data in tests (use fixed fixtures)
- ❌ Don't test third-party library functionality
- ❌ Don't write overly complex test setups
- ❌ Don't ignore test failures or skip tests without reason
- ❌ Don't test implementation details (CSS classes, internal functions)

### Test Coverage Goals
- **Unit Tests**: 80%+ coverage for utilities and hooks
- **Component Tests**: 70%+ coverage for UI components
- **Integration Tests**: Cover all critical user flows
- **E2E Tests**: Cover main user journeys and cross-browser compatibility

---

**Last Updated**: June 8, 2025  
**Version**: 1.0
