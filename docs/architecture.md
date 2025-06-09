# SuperFolio - Architecture Guidelines

## Project Structure

```
src/
├── components/          # Shared components
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.module.css
│   │   ├── Button.test.tsx
│   │   └── index.ts
│   └── index.ts        # Barrel export
├── pages/              # Application pages
│   ├── TemplateSelection/
│   │   ├── TemplateSelection.tsx
│   │   ├── TemplateSelection.module.css
│   │   ├── components/  # Page-specific components
│   │   └── index.ts
│   └── index.ts
├── hooks/              # Custom hooks
├── stores/             # Zustand stores
├── contexts/           # React contexts
├── utils/              # Utility functions
├── types/              # TypeScript definitions
├── templates/          # Portfolio templates
└── styles/            # Global styles
```

## State Management

### Local State (useState)

Use for component-specific state that doesn't need sharing:

```typescript
const [isLoading, setIsLoading] = useState(false)
const [formData, setFormData] = useState({})
const [user, setUser] = useState<User | null>(null)
```

### Global State (Zustand)

Use for app-wide state:

```typescript
// stores/useAppStore.ts
interface AppState {
  theme: 'light' | 'dark'
  user: User | null
  setTheme: (theme: 'light' | 'dark') => void
  setUser: (user: User) => void
}

export const useAppStore = create<AppState>((set) => ({
  theme: 'dark',
  user: null,
  setTheme: (theme) => set({ theme }),
  setUser: (user) => set({ user }),
}))
```

### Component Tree State (Context)

Use for state shared within component subtrees:

```typescript
// contexts/FormContext.tsx
interface FormContextData {
  formData: FormData
  updateField: (field: string, value: unknown) => void
}

const FormContext = createContext<FormContextData | null>(null)

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<FormData>({})

  const updateField = useCallback((field: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }, [])

  return (
    <FormContext.Provider value={{ formData, updateField }}>
      {children}
    </FormContext.Provider>
  )
}
```

## Page Structure

Each page should follow this pattern:

```typescript
// pages/PageName/PageName.tsx
export const PageName = () => {
  // 1. Hooks (state, context, stores)
  const { data, isLoading } = useQuery(...)
  const navigate = useNavigate()

  // 2. Event handlers
  const handleSubmit = useCallback(() => {
    // Handler logic
  }, [])

  // 3. Effects
  useEffect(() => {
    // Side effects
  }, [])

  // 4. Early returns
  if (isLoading) return <div>Carregando...</div>

  // 5. Render
  return (
    <div className={styles.page}>
      <PageHeader title="Título da Página" />
      <PageContent>
        {/* Page content */}
      </PageContent>
    </div>
  )
}
```

## Error Boundaries

✅ **Error boundaries are implemented** in `src/components/ErrorBoundary/`

Error boundaries provide graceful error handling throughout the application:

- Catches JavaScript errors anywhere in the child component tree
- Displays user-friendly error messages in Portuguese
- Provides recovery options (retry/reload)
- Shows detailed error information in development mode
- Automatically wraps the entire app in `main.tsx`

## Performance Considerations

- Lazy load pages with `React.lazy()`
- Memoize expensive computations
- Optimize bundle size with code splitting
- Use React DevTools Profiler for optimization
