# SuperFolio - Coding Standards

## File Naming Conventions

### Components

- **Component Files**: `PascalCase.tsx` (e.g., `UserProfile.tsx`)
- **Component Styles**: `PascalCase.module.css` (e.g., `UserProfile.module.css`)
- **Component Tests**: `PascalCase.test.tsx` (e.g., `UserProfile.test.tsx`)
- **Component Index**: `index.ts` (barrel exports)

### Other Files

- **Hooks**: `camelCase.ts` (e.g., `useUserData.ts`)
- **Utils**: `camelCase.ts` (e.g., `formatDate.ts`)
- **Types**: `PascalCase.ts` (e.g., `Template.ts`, `User.ts`)
- **Pages**: `PascalCase.tsx` (e.g., `TemplateSelection.tsx`)

## TypeScript Standards

### Type Organization

- **Individual files for main types**: Each major type gets its own file (e.g., `Template.ts`, `User.ts`)
- **Group related types**: Only group closely related types together (e.g., `TemplateCategory` with `Template`)
- **Capitalize type files**: Type files should use PascalCase naming
- **No index.ts for types**: Import types directly from their files

```typescript
// types/Template.ts
export interface Template {
  id: string
  name: string
  category: TemplateCategory
}

export type TemplateCategory = 'Developer' | 'Designer' | 'Freelancer'

// Usage
import type { Template, TemplateCategory } from '../types/Template'
```

### File Headers

- **No file header comments**: Start files directly with imports or code
- **No redundant comments**: Avoid obvious comments like "/* Component Styles */" at the top of CSS files
- **Clean file beginnings**: Keep files concise and focused
- **Meaningful comments only**: Comments should explain "why", not "what"

```css
/* ❌ Bad - redundant file header */
/* UserProfile Component Styles */
.profile {
  background: var(--surface-primary);
}

/* ✅ Good - no unnecessary header */
.profile {
  background: var(--surface-primary);
}
```

## Testing Requirements

### Mandatory Testing

- **All new components require unit tests**: Every component must have corresponding `.test.tsx` file
- **All new pages require E2E tests**: Every page must have Playwright tests
- **Test coverage minimum**: Aim for 80%+ coverage on new code
- **Test-driven development**: Write tests before or alongside implementation

### Component Testing Structure

```typescript
// ComponentName.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ComponentName from './ComponentName'

describe('ComponentName', () => {
  it('renders correctly', () => {
    render(<ComponentName />)
    // assertions
  })

  it('handles user interactions', () => {
    // interaction tests
  })

  it('meets accessibility requirements', () => {
    // a11y tests
  })
})
```

### Page Testing Structure

```typescript
// tests/e2e/page-name.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Page Name', () => {
  test('loads and displays content', async ({ page }) => {
    await page.goto('/page-route')
    // E2E tests
  })

  test('handles user flows', async ({ page }) => {
    // user journey tests
  })
})
```

## Component Standards

### Component Structure

Always use arrow functions with destructured props:

```typescript
interface UserProfileProps {
  user: UserProfile
  isEditable?: boolean
  onSave: (user: UserProfile) => void
}

/**
 * User profile display component with editing capabilities
 * @param user - The user profile data to display
 * @param isEditable - Whether the profile can be edited
 * @param onSave - Callback when profile is saved
 */
export const UserProfile = ({
  user,
  isEditable = false,
  onSave,
}: UserProfileProps) => {
  // Hooks first
  const [isEditing, setIsEditing] = useState(false)

  // Event handlers
  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    onSave(user)
    setIsEditing(false)
  }

  // Render
  return <div className={styles.userProfile}>{/* Component JSX */}</div>
}
```

### Component Organization Rules

1. **Import statements** (external libraries first, then internal)
2. **Type/Interface definitions**
3. **Component function**
4. **Hooks** (in order of dependency)
5. **Event handlers**
6. **Render logic**
7. **Default export**

### JSDoc Requirements

Use JSDoc for:

- All exported functions
- Complex components
- Custom hooks
- Utility functions

```typescript
/**
 * Formats a date string for display in user profiles
 * @param dateString - ISO date string to format
 * @param options - Formatting options
 * @returns Formatted date string
 */
export const formatProfileDate = (
  dateString: string,
  options: DateFormatOptions = {}
): string => {
  // Implementation
}
```

## Import/Export Standards

### Import Order

1. React and React-related imports
2. External library imports
3. Internal imports (components, hooks, utils)
4. Type-only imports
5. Relative imports

```typescript
import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'

import { Button } from '../components'
import { formatDate } from '../utils'
import type { UserProfile } from '../types'

import styles from './UserProfile.module.css'
```

### Barrel Exports

Use index.ts files for components and utilities, but NOT for types:

```typescript
// src/components/index.ts - ✅ Good
export { UserProfile } from './UserProfile/UserProfile'
export { TemplateCard } from './TemplateCard/TemplateCard'
export { Button } from './Button/Button'

// src/types/index.ts - ❌ Avoid this
// Instead import types directly from their files

// Usage - ✅ Good
import { UserProfile, TemplateCard } from '../components'
import type { Template } from '../types/Template'
import type { User } from '../types/User'
```

## Folder Structure Standards

### Component Structure

```
src/components/UserProfile/
├── UserProfile.tsx           # Main component
├── UserProfile.module.css    # Styles
├── UserProfile.test.tsx      # Unit tests
├── index.ts                  # Barrel export
└── __mocks__/               # Test mocks
    └── UserProfile.mocks.ts
```

### Page Structure

```
src/pages/TemplateSelection/
├── TemplateSelection.tsx           # Main page
├── TemplateSelection.module.css    # Page styles
├── TemplateSelection.e2e.test.ts   # E2E tests
├── index.ts                        # Barrel export
├── components/                     # Page-specific components
│   ├── TemplateFilter/
│   └── TemplateGrid/
└── __mocks__/
    └── TemplateSelection.mocks.ts
```

## State Management Standards

### useState for Simple State

Use for component-local state that doesn't need to be shared. Let TypeScript infer types when possible:

```typescript
// ✅ Good - TypeScript infers the types
const [isLoading, setIsLoading] = useState(false)
const [formData, setFormData] = useState({})
const [items, setItems] = useState([])

// ✅ Good - explicit typing when null/undefined involved
const [user, setUser] = useState<User | null>(null)
const [error, setError] = useState<string | undefined>(undefined)
```

### Zustand for Global State

Use for app-wide state that needs to persist across components:

```typescript
// stores/useAppStore.ts
import { create } from 'zustand'

interface AppState {
  theme: 'light' | 'dark'
  user: UserProfile | null
  toggleTheme: () => void
  setUser: (user: UserProfile) => void
}

export const useAppStore = create<AppState>((set) => ({
  theme: 'dark',
  user: null,
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === 'light' ? 'dark' : 'light',
    })),
  setUser: (user) => set({ user }),
}))
```

### React Context for Component Tree State

Use for state that needs to be shared within a specific component tree:

```typescript
// contexts/FormContext.tsx
interface FormContextData {
  formData: FormData
  updateField: (field: string, value: unknown) => void
}

const FormContext = createContext<FormContextData | null>(null)

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<FormData>({})

  const updateField = (field: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <FormContext.Provider value={{ formData, updateField }}>
      {children}
    </FormContext.Provider>
  )
}
```

## Error Handling Standards

### Component Error Boundaries

```typescript
interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

export const ErrorBoundary = ({ children, fallback }: ErrorBoundaryProps) => {
  // Implementation with proper error logging
}
```

### API Error Handling

```typescript
// In components, handle errors locally
const { data, error, isLoading } = useQuery({
  queryKey: ['user', userId],
  queryFn: () => fetchUser(userId),
  onError: (error) => {
    console.error('Failed to fetch user:', error)
    // Show user-friendly error message
  },
})
```

## Performance Standards

### Memoization Guidelines

- Use `React.memo` for components that receive stable props
- Use `useMemo` for expensive calculations
- Use `useCallback` for event handlers passed to children

```typescript
export const UserProfile = React.memo(({ user, onSave }: UserProfileProps) => {
  const handleSave = useCallback(() => {
    onSave(user)
  }, [user, onSave])

  const processedData = useMemo(() => {
    return expensiveDataProcessing(user)
  }, [user])
  return <div>{/* Component JSX */}</div>
})
```
