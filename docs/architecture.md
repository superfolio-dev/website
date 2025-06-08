# SuperFolio - Architecture Guidelines

## Project Structure

### Type-Based Organization

SuperFolio follows a type-based folder structure for better maintainability:

```
src/
├── components/              # Shared/reusable components
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.module.css
│   │   ├── Button.test.tsx
│   │   ├── index.ts
│   │   └── __mocks__/
│   │       └── Button.mocks.ts
│   ├── TemplateCard/
│   └── index.ts            # Barrel export
├── pages/                  # Application pages
│   ├── TemplateSelection/
│   │   ├── TemplateSelection.tsx
│   │   ├── TemplateSelection.module.css
│   │   ├── TemplateSelection.e2e.test.ts
│   │   ├── components/     # Page-specific components
│   │   │   ├── TemplateFilter/
│   │   │   └── TemplateGrid/
│   │   ├── index.ts
│   │   └── __mocks__/
│   └── index.ts
├── templates/              # Portfolio templates
│   ├── ModernDeveloper/
│   └── index.ts
├── hooks/                  # Custom hooks
│   ├── useUserProfile.ts
│   ├── useTheme.ts
│   └── index.ts
├── stores/                 # Zustand stores
│   ├── useAppStore.ts
│   ├── useUserStore.ts
│   └── index.ts
├── contexts/               # React contexts
│   ├── FormContext.tsx
│   ├── ThemeContext.tsx
│   └── index.ts
├── utils/                  # Utility functions
│   ├── formatDate.ts
│   ├── validation.ts
│   └── index.ts
├── types/                  # TypeScript definitions
│   ├── User.ts             # User-related types
│   ├── Template.ts         # Template and TemplateCategory types
│   ├── Project.ts          # Project-related types
│   ├── Api.ts              # API response types
│   └── Component.ts        # Component variant types
├── services/               # API services (future)
│   ├── api.ts
│   └── index.ts
├── assets/                 # Static resources
│   ├── images/
│   ├── icons/
│   └── fonts/
└── styles/                 # Global styles
    ├── design-system.css
    ├── globals.css
    └── reset.css
```

## Type Organization & Import Patterns

### Type File Structure

Each major type gets its own file using PascalCase naming:

```typescript
// types/User.ts
export interface User {
  id: string
  name: string
  email: string
}

export interface UserProfile extends User {
  avatar?: string
  bio?: string
  social: SocialLinks
}

export interface SocialLinks {
  github?: string
  linkedin?: string
  twitter?: string
}

// types/Template.ts
export interface Template {
  id: string
  name: string
  category: TemplateCategory
  thumbnail: string
  features: string[]
}

export type TemplateCategory =
  | 'Developer'
  | 'Designer'
  | 'Freelancer'
  | 'Business'
```

### Import Patterns

Import types directly from their respective files:

```typescript
// ✅ Good - Direct imports
import type { User, UserProfile } from '../types/User'
import type { Template, TemplateCategory } from '../types/Template'
import type { ComponentVariant } from '../types/Component'

// ❌ Avoid - No barrel exports for types
import type { User, Template } from '../types'
```

### Type Grouping Rules

- **Individual files**: For main domain types (User, Template, Project)
- **Group related types**: Only when tightly coupled (Template + TemplateCategory)
- **Keep separate**: API types, component types, utility types

```typescript
// types/Api.ts - API-specific types
export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
  }
}

// types/Component.ts - Component-specific types
export type ComponentVariant = 'primary' | 'secondary' | 'outline'
export type ComponentSize = 'small' | 'medium' | 'large'
export type ComponentStatus = 'idle' | 'loading' | 'success' | 'error'
```

## State Management Architecture

### Zustand for Global State

Use Zustand for application-wide state that needs to persist across components:

```typescript
// stores/useAppStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AppState {
  // Theme
  theme: 'light' | 'dark'
  toggleTheme: () => void

  // User authentication
  isAuthenticated: boolean
  user: UserProfile | null
  setUser: (user: UserProfile | null) => void

  // App settings
  preferences: UserPreferences
  updatePreferences: (preferences: Partial<UserPreferences>) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      theme: 'dark',
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),

      isAuthenticated: false,
      user: null,
      setUser: (user) => set({ user, isAuthenticated: !!user }),

      preferences: {},
      updatePreferences: (newPreferences) =>
        set((state) => ({
          preferences: { ...state.preferences, ...newPreferences },
        })),
    }),
    {
      name: 'superfolio-app-store',
      partialize: (state) => ({
        theme: state.theme,
        preferences: state.preferences,
      }),
    }
  )
)
```

### React Context for Component Tree State

Use React Context for state that needs to be shared within a specific component tree:

```typescript
// contexts/FormContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react'

interface FormData {
  personal: PersonalInfo
  contact: ContactInfo
  skills: Skill[]
  // ... other form fields
}

interface FormContextValue {
  formData: FormData
  updateField: <K extends keyof FormData>(field: K, value: FormData[K]) => void
  resetForm: () => void
  isValid: boolean
}

const FormContext = createContext<FormContextValue | null>(null)

export const useFormContext = (): FormContextValue => {
  const context = useContext(FormContext)
  if (!context) {
    throw new Error('useFormContext must be used within FormProvider')
  }
  return context
}

interface FormProviderProps {
  children: ReactNode
  initialData?: Partial<FormData>
}

export const FormProvider = ({
  children,
  initialData = {},
}: FormProviderProps) => {
  const [formData, setFormData] = useState<FormData>({
    personal: {},
    contact: {},
    skills: [],
    ...initialData,
  })

  const updateField = <K extends keyof FormData>(
    field: K,
    value: FormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const resetForm = () => {
    setFormData({
      personal: {},
      contact: {},
      skills: [],
    })
  }

  const isValid = validateFormData(formData)

  return (
    <FormContext.Provider value={{ formData, updateField, resetForm, isValid }}>
      {children}
    </FormContext.Provider>
  )
}
```

## Data Flow Patterns

### Page-Level Data Fetching

Keep data fetching within pages, not abstracted to separate files:

```typescript
// pages/TemplateSelection/TemplateSelection.tsx
import { useQuery } from '@tanstack/react-query'

export const TemplateSelection = () => {
  // Data fetching directly in the page
  const {
    data: templates,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['templates'],
    queryFn: async () => {
      const response = await fetch('/api/templates')
      if (!response.ok) {
        throw new Error('Failed to fetch templates')
      }
      return response.json()
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  })

  if (isLoading) return <LoadingSpinner />
  if (error) return <ErrorMessage error={error} />

  return <div>{/* Page content */}</div>
}
```

### Component Composition Patterns

#### Children First Approach

Always prefer children prop for component composition:

```typescript
// ❌ Avoid render props unless necessary
interface CardProps {
  renderHeader: () => ReactNode
  renderContent: () => ReactNode
}

// ✅ Prefer children pattern
interface CardProps {
  children: ReactNode
  header?: ReactNode
  footer?: ReactNode
}

export const Card = ({ children, header, footer }: CardProps) => {
  return (
    <div className={styles.card}>
      {header && <div className={styles.header}>{header}</div>}
      <div className={styles.content}>{children}</div>
      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  )
}

// Usage
;<Card header={<h2>Title</h2>} footer={<Button>Action</Button>}>
  <p>Card content goes here</p>
</Card>
```

#### Compound Components Pattern

For complex components with multiple parts:

```typescript
// components/Form/Form.tsx
interface FormProps {
  children: ReactNode
  onSubmit: (data: FormData) => void
}

export const Form = ({ children, onSubmit }: FormProps) => {
  return (
    <FormProvider>
      <form onSubmit={handleSubmit}>
        {children}
      </form>
    </FormProvider>
  )
}

// Sub-components
Form.Field = FormField
Form.Input = FormInput
Form.Button = FormButton

// Usage
<Form onSubmit={handleSubmit}>
  <Form.Field label="Name">
    <Form.Input name="name" required />
  </Form.Field>
  <Form.Button type="submit">Save</Form.Button>
</Form>
```

## Custom Hooks Patterns

### Data Fetching Hooks

Wrap common data fetching patterns:

```typescript
// hooks/useUserProfile.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export const useUserProfile = (userId: string) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUserProfile(userId),
    enabled: !!userId,
  })
}

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateUserProfile,
    onSuccess: (data) => {
      queryClient.setQueryData(['user', data.id], data)
      queryClient.invalidateQueries(['user'])
    },
  })
}
```

### UI State Hooks

Abstract common UI patterns:

```typescript
// hooks/useToggle.ts
export const useToggle = (
  initialValue = false
): [boolean, () => void, (value: boolean) => void] => {
  const [value, setValue] = useState(initialValue)

  const toggle = useCallback(() => setValue((prev) => !prev), [])
  const setToggle = useCallback((newValue: boolean) => setValue(newValue), [])

  return [value, toggle, setToggle]
}

// hooks/useLocalStorage.ts
export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  const setStoredValue = (newValue: T) => {
    setValue(newValue)
    localStorage.setItem(key, JSON.stringify(newValue))
  }

  return [value, setStoredValue] as const
}
```

## Error Handling Architecture

### Error Boundaries

Implement error boundaries at strategic points:

```typescript
// components/ErrorBoundary/ErrorBoundary.tsx
interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: ReactNode; fallback?: ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
    // Send to error reporting service
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || <DefaultErrorFallback error={this.state.error} />
      )
    }

    return this.props.children
  }
}
```

### API Error Handling

Consistent error handling for API calls:

```typescript
// utils/apiError.ts
export class ApiError extends Error {
  constructor(message: string, public status: number, public code?: string) {
    super(message)
    this.name = 'ApiError'
  }
}

export const handleApiError = (error: unknown): ApiError => {
  if (error instanceof ApiError) {
    return error
  }

  if (error instanceof Error) {
    return new ApiError(error.message, 500)
  }

  return new ApiError('An unexpected error occurred', 500)
}
```

## Performance Optimization

### Code Splitting Strategy

```typescript
// Lazy load pages
const TemplateSelection = lazy(() => import('../pages/TemplateSelection'))
const UserProfile = lazy(() => import('../pages/UserProfile'))

// Route-based code splitting
const Router = () => (
  <Suspense fallback={<LoadingSpinner />}>
    <Routes>
      <Route path="/templates" element={<TemplateSelection />} />
      <Route path="/profile" element={<UserProfile />} />
    </Routes>
  </Suspense>
)
```

### Component Optimization

```typescript
// Memoize expensive components
export const TemplatePreview = React.memo(
  ({ template, user }: TemplatePreviewProps) => {
    const processedData = useMemo(() => {
      return processTemplateData(template, user)
    }, [template, user])

    return <div>{/* Render */}</div>
  }
)

// Memoize callbacks
export const TemplateCard = ({ template, onSelect }: TemplateCardProps) => {
  const handleClick = useCallback(() => {
    onSelect(template.id)
  }, [template.id, onSelect])

  return <div onClick={handleClick}>{/* Content */}</div>
}
```

---

**Last Updated**: June 8, 2025  
**Version**: 1.0
