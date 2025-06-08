# SuperFolio - Component Guidelines

## Component Philosophy

SuperFolio components are designed to be reusable, accessible, and maintainable. Each component should follow a consistent pattern that promotes composition over configuration and maintains clear separation of concerns.

## Component Categories

### 1. **Primitive Components**

Basic building blocks (Button, Input, Text, etc.)

### 2. **Composite Components**

Combinations of primitives (Card, Modal, Form, etc.)

### 3. **Layout Components**

Structure and positioning (Container, Grid, Stack, etc.)

### 4. **Feature Components**

Business logic components (TemplateCard, UserProfile, etc.)

### 5. **Page Components**

Top-level page containers

## Component Structure

### File Organization

Every component follows this mandatory structure:

```
ComponentName/
├── ComponentName.tsx        # Main component implementation
├── ComponentName.module.css # Component-specific styles
├── ComponentName.test.tsx   # Unit tests (REQUIRED)
└── index.ts                 # Barrel export
```

**Requirements:**
- **Unit tests are mandatory**: Every component must have a `.test.tsx` file
- **No redundant comments**: CSS files should not start with obvious headers like "/* Component Styles */"
- **Type definitions**: Store in `types/` directory using PascalCase naming
- **Clean file headers**: No file header comments, start directly with imports

### Component Template

```typescript
import type { ReactNode, ComponentPropsWithoutRef } from 'react'
import type { ComponentVariant } from '../types/Component'
import styles from './ComponentName.module.css'

interface ComponentNameProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode
  variant?: ComponentVariant
  size?: 'small' | 'medium' | 'large'
  isDisabled?: boolean
}

/**
 * ComponentName provides [brief description of component purpose]
 *
 * @example
 * <ComponentName variant="primary" size="medium">
 *   Content goes here
 * </ComponentName>
 */
export const ComponentName = ({
  children,
  variant = 'primary',
  size = 'medium',
  isDisabled = false,
  className,
  ...rest
}: ComponentNameProps) => {
  const combinedClassName = [
    styles.component,
    styles[variant],
    styles[size],
    isDisabled && styles.disabled,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={combinedClassName} aria-disabled={isDisabled} {...rest}>
      {children}
    </div>
  )
}
```

### Index Export Pattern

```typescript
export { ComponentName } from './ComponentName'
export type { ComponentNameProps } from './ComponentName'
```

**Note**: Import types directly from the `types/` directory. Only export component-specific prop types from the component index.

## Component Patterns

### 1. Composition Pattern

**Prefer composition over complex props:**

```typescript
// ❌ Avoid complex render props
interface CardProps {
  renderHeader: () => ReactNode
  renderContent: () => ReactNode
  renderFooter: () => ReactNode
}

// ✅ Use composition with children
interface CardProps {
  children: ReactNode
  header?: ReactNode
  footer?: ReactNode
}

export const Card = ({ children, header, footer }: CardProps) => (
  <div className={styles.card}>
    {header && <div className={styles.header}>{header}</div>}
    <div className={styles.content}>{children}</div>
    {footer && <div className={styles.footer}>{footer}</div>}
  </div>
)

// Usage
<Card
  header={<h2>Title</h2>}
  footer={<Button>Action</Button>}
>
  <p>Card content</p>
</Card>
```

### 2. Compound Components Pattern

**For components with multiple related parts:**

```typescript
// Form.tsx
interface FormProps {
  children: ReactNode
  onSubmit: (data: FormData) => void
}

const FormRoot = ({ children, onSubmit }: FormProps) => {
  return (
    <FormProvider>
      <form onSubmit={handleSubmit}>
        {children}
      </form>
    </FormProvider>
  )
}

const FormField = ({ children, label, error }: FormFieldProps) => {
  return (
    <div className={styles.field}>
      <label className={styles.label}>{label}</label>
      {children}
      {error && <span className={styles.error}>{error}</span>}
    </div>
  )
}

const FormInput = ({ name, ...props }: FormInputProps) => {
  const { register } = useFormContext()
  return <input {...register(name)} {...props} />
}

const FormButton = ({ children, ...props }: FormButtonProps) => {
  return <Button {...props}>{children}</Button>
}

// Compound component assembly
export const Form = Object.assign(FormRoot, {
  Field: FormField,
  Input: FormInput,
  Button: FormButton
})

// Usage
<Form onSubmit={handleSubmit}>
  <Form.Field label="Name" error={errors.name}>
    <Form.Input name="name" required />
  </Form.Field>
  <Form.Button type="submit">Save</Form.Button>
</Form>
```

### 3. Polymorphic Components Pattern

**For components that can render as different elements:**

```typescript
type AsProp<C extends React.ElementType> = {
  as?: C
}

type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P)

type PolymorphicComponentProp<
  C extends React.ElementType,
  Props = {}
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>

interface TextOwnProps {
  size?: 'small' | 'medium' | 'large'
  weight?: 'normal' | 'medium' | 'bold'
}

type TextProps<C extends React.ElementType> = PolymorphicComponentProp<
  C,
  TextOwnProps
>

export const Text = <C extends React.ElementType = 'span'>({
  as,
  children,
  size = 'medium',
  weight = 'normal',
  className,
  ...rest
}: TextProps<C>) => {
  const Component = as || 'span'

  const combinedClassName = [
    styles.text,
    styles[size],
    styles[weight],
    className
  ].filter(Boolean).join(' ')

  return (
    <Component className={combinedClassName} {...rest}>
      {children}
    </Component>
  )
}

// Usage
<Text>Default span</Text>
<Text as="p">Paragraph text</Text>
<Text as="h1" size="large" weight="bold">Heading</Text>
<Text as={Link} to="/home">Link text</Text>
```

### 4. Render Props Pattern (Limited Use)

**Only for complex shared logic:**

```typescript
interface RenderPropsExampleProps {
  children: (state: SomeState) => ReactNode
}

export const DataProvider = ({ children }: RenderPropsExampleProps) => {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)

  // Complex logic here

  return children({ data, loading, refetch })
}

// Usage
;<DataProvider>
  {({ data, loading }) => (loading ? <Spinner /> : <DataDisplay data={data} />)}
</DataProvider>
```

## TypeScript Patterns

### Props Interface Design

```typescript
// Base component props
interface BaseComponentProps {
  className?: string
  children?: ReactNode
  testId?: string
}

// Extend HTML element props
interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant: 'primary' | 'secondary' | 'outline'
  size: 'small' | 'medium' | 'large'
  isLoading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

// Union types for variants
type ButtonVariant = 'primary' | 'secondary' | 'outline'
type ButtonSize = 'small' | 'medium' | 'large'

// Generic component props
interface ListProps<T> {
  items: T[]
  renderItem: (item: T, index: number) => ReactNode
  keyExtractor: (item: T) => string | number
  emptyState?: ReactNode
}

export const List = <T>({
  items,
  renderItem,
  keyExtractor,
  emptyState,
}: ListProps<T>) => {
  if (items.length === 0) {
    return emptyState || <div>No items</div>
  }

  return (
    <ul>
      {items.map((item, index) => (
        <li key={keyExtractor(item)}>{renderItem(item, index)}</li>
      ))}
    </ul>
  )
}
```

### Discriminated Unions

```typescript
// State variants
type LoadingState = {
  status: 'loading'
}

type SuccessState = {
  status: 'success'
  data: any[]
}

type ErrorState = {
  status: 'error'
  error: string
}

type AsyncState = LoadingState | SuccessState | ErrorState

// Component props with discriminated unions
interface BaseAlertProps {
  title: string
  onClose?: () => void
}

interface SuccessAlertProps extends BaseAlertProps {
  variant: 'success'
  icon?: never
}

interface ErrorAlertProps extends BaseAlertProps {
  variant: 'error'
  icon?: ReactNode
}

interface InfoAlertProps extends BaseAlertProps {
  variant: 'info'
  icon: ReactNode // Required for info
}

type AlertProps = SuccessAlertProps | ErrorAlertProps | InfoAlertProps
```

## Styling Patterns

### CSS Modules Structure with Fluid Layout

```css
/* ComponentName.module.css */

/* Base component styles - always start with full width approach */
.component {
  /* Layout - fluid by default */
  width: 100%;
  box-sizing: border-box;

  /* CSS custom properties for theming */
  --component-bg: var(--color-bg-surface);
  --component-text: var(--color-text-primary);
  --component-border: var(--color-border-primary);

  /* Base styles */
  background-color: var(--component-bg);
  color: var(--component-text);
  border: 1px solid var(--component-border);
  border-radius: var(--radius-md);
  font-family: var(--font-primary);
  transition: all var(--transition-normal);

  /* Responsive padding */
  padding: var(--space-md);
}

@media (min-width: 768px) {
  .component {
    padding: var(--space-lg);
  }
}

@media (min-width: 1024px) {
  .component {
    padding: var(--space-xl);
  }
}

/* Variant styles */
.primary {
  --component-bg: var(--color-primary);
  --component-text: var(--color-text-inverse);
  --component-border: var(--color-primary);
}

.secondary {
  --component-bg: var(--color-secondary);
  --component-text: var(--color-text-inverse);
  --component-border: var(--color-secondary);
}

.outline {
  --component-bg: transparent;
  --component-text: var(--color-primary);
  --component-border: var(--color-primary);
}

/* Size variants - maintain fluid approach */
.small {
  padding: var(--space-xs) var(--space-sm);
  font-size: var(--font-size-sm);
}

.medium {
  padding: var(--space-sm) var(--space-md);
  font-size: var(--font-size-base);
}

.large {
  padding: var(--space-md) var(--space-lg);
  font-size: var(--font-size-lg);
}

/* State styles */
.disabled {
  opacity: 0.6;
  cursor: not-allowed;
  pointer-events: none;
}

.loading {
  position: relative;
  color: transparent;
}

.loading::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 16px;
  height: 16px;
  border: 2px solid var(--component-border);
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
```

### Layout-First CSS Principles

1. **Start with 100% width**: Components should be fluid by default
2. **Use responsive spacing**: Implement spacing that adapts to screen size
3. **Avoid fixed dimensions**: Use `min-height`, `max-width` instead of fixed values
4. **Fluid typography**: Use relative units and responsive font sizes

```css
/* ❌ Avoid fixed widths that create side margins */
.container {
  max-width: 1200px;
  margin: 0 auto;
}

/* ✅ Use fluid containers with responsive padding */
.container {
  width: 100%;
  padding: 0 var(--space-md);
}

@media (min-width: 768px) {
  .container {
    padding: 0 var(--space-xl);
  }
}

@media (min-width: 1024px) {
  .container {
    padding: 0 var(--space-2xl);
  }
}
```

.medium {
padding: var(--space-sm) var(--space-md);
font-size: var(--font-size-base);
}

.large {
padding: var(--space-md) var(--space-lg);
font-size: var(--font-size-lg);
}

/_ State styles _/
.disabled {
--component-bg: var(--color-surface-disabled);
--component-text: var(--color-text-disabled);
--component-border: var(--color-border-disabled);

cursor: not-allowed;
pointer-events: none;
}

.loading {
cursor: wait;
position: relative;
}

/_ Interactive states _/
.component:hover:not(.disabled) {
filter: brightness(1.1);
}

.component:focus-visible {
outline: 2px solid var(--color-focus-ring);
outline-offset: 2px;
}

.component:active:not(.disabled) {
transform: translateY(1px);
}

/_ Responsive styles _/
@media (max-width: 768px) {
.component {
font-size: var(--font-size-sm);
padding: var(--space-xs) var(--space-sm);
}
}

```

### CSS Custom Properties Usage

```css
/* Use semantic custom properties */
.card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  color: var(--color-text-primary);
  padding: var(--space-lg);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}

/* Responsive custom properties */
.grid {
  display: grid;
  gap: var(--space-md);
  grid-template-columns: repeat(var(--grid-cols, 1), 1fr);
}

@media (min-width: 640px) {
  .grid {
    --grid-cols: 2;
  }
}

@media (min-width: 1024px) {
  .grid {
    --grid-cols: 3;
  }
}
```

## Accessibility Patterns

### ARIA Implementation

```typescript
interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  children: ReactNode
  isLoading?: boolean
  loadingText?: string
}

export const Button = ({
  children,
  isLoading = false,
  loadingText = 'Loading...',
  disabled,
  ...rest
}: ButtonProps) => {
  return (
    <button
      {...rest}
      disabled={disabled || isLoading}
      aria-disabled={disabled || isLoading}
      aria-describedby={isLoading ? 'loading-text' : undefined}
    >
      {isLoading ? (
        <>
          <span aria-hidden="true">
            <LoadingSpinner />
          </span>
          <span id="loading-text" className="sr-only">
            {loadingText}
          </span>
        </>
      ) : (
        children
      )}
    </button>
  )
}
```

### Focus Management

```typescript
interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  title: string
}

export const Modal = ({ isOpen, onClose, children, title }: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement
      dialog.showModal()

      // Focus first focusable element
      const firstFocusable = dialog.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as HTMLElement
      firstFocusable?.focus()
    } else {
      dialog.close()
      previousFocusRef.current?.focus()
    }
  }, [isOpen])

  const handleKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === 'Escape') {
      onClose()
    }
  }

  return (
    <dialog
      ref={dialogRef}
      onKeyDown={handleKeyDown}
      aria-labelledby="modal-title"
      className={styles.modal}
    >
      <div className={styles.content}>
        <header className={styles.header}>
          <h2 id="modal-title">{title}</h2>
          <button onClick={onClose} aria-label="Close modal">
            ×
          </button>
        </header>
        <div className={styles.body}>{children}</div>
      </div>
    </dialog>
  )
}
```

### Screen Reader Support

```typescript
interface ProgressProps {
  value: number
  max: number
  label: string
}

export const Progress = ({ value, max, label }: ProgressProps) => {
  const percentage = Math.round((value / max) * 100)

  return (
    <div className={styles.progress}>
      <label className={styles.label}>{label}</label>
      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={`${label}: ${percentage}% complete`}
        className={styles.bar}
      >
        <div
          className={styles.fill}
          style={{ width: `${percentage}%` }}
          aria-hidden="true"
        />
      </div>
      <span className={styles.percentage} aria-hidden="true">
        {percentage}%
      </span>
    </div>
  )
}
```

## Performance Patterns

### Memoization Strategies

```typescript
// Memoize expensive components
export const ExpensiveComponent = React.memo(
  ({ data, onAction }: ExpensiveComponentProps) => {
    // Expensive computations
    const processedData = useMemo(() => {
      return data.map((item) => heavyProcessing(item))
    }, [data])

    // Memoized callbacks
    const handleClick = useCallback(
      (id: string) => {
        onAction(id)
      },
      [onAction]
    )

    return (
      <div>
        {processedData.map((item) => (
          <Item key={item.id} data={item} onClick={handleClick} />
        ))}
      </div>
    )
  }
)

// Custom comparison for memo
export const CustomMemoComponent = React.memo(
  Component,
  (prevProps, nextProps) => {
    return (
      prevProps.id === nextProps.id && prevProps.isActive === nextProps.isActive
    )
  }
)
```

### Lazy Loading

```typescript
// Component-level lazy loading
const LazyComponent = lazy(() => import('./LazyComponent'))

export const ComponentWithLazy = () => (
  <Suspense fallback={<LoadingSpinner />}>
    <LazyComponent />
  </Suspense>
)

// Conditional lazy loading
const ConditionalLazy = lazy(() =>
  import('./ConditionalComponent').then((module) => ({
    default: module.ConditionalComponent,
  }))
)
```

## Testing Patterns

### Component Test Template

```typescript
// ComponentName.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ComponentName from './ComponentName'

describe('ComponentName', () => {
  it('renders with default props', () => {
    render(<ComponentName>Test content</ComponentName>)
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('applies variant classes correctly', () => {
    render(<ComponentName variant="secondary">Content</ComponentName>)
    const element = screen.getByText('Content').parentElement
    expect(element).toHaveClass('secondary')
  })

  it('handles user interactions', () => {
    const handleClick = vi.fn()
    render(<ComponentName onClick={handleClick}>Click me</ComponentName>)
    fireEvent.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalled()
  })

  it('meets accessibility requirements', () => {
    render(<ComponentName aria-label="Test component">Content</ComponentName>)
    expect(screen.getByLabelText('Test component')).toBeInTheDocument()
  })

  it('forwards refs correctly', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<ComponentName ref={ref}>Content</ComponentName>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
```

## Component Documentation

### JSDoc Standards

```typescript
/**
 * Button component that supports multiple variants and sizes.
 *
 * @example
 * // Basic usage
 * <Button variant="primary" size="medium">
 *   Click me
 * </Button>
 *
 * @example
 * // With loading state
 * <Button isLoading loadingText="Saving...">
 *   Save
 * </Button>
 *
 * @param variant - The visual variant of the button
 * @param size - The size of the button
 * @param isLoading - Whether the button is in loading state
 * @param children - The button content
 */
export const Button = ({
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  children,
  ...rest
}: ButtonProps) => {
  // Implementation
}
```

### README Template

````markdown
# ComponentName

Brief description of what the component does and when to use it.

## Usage

```tsx
import { ComponentName } from '@/components/ComponentName'

;<ComponentName variant="primary" size="medium">
  Content
</ComponentName>
```
````

## Props

| Prop     | Type                           | Default   | Description       |
| -------- | ------------------------------ | --------- | ----------------- |
| variant  | 'primary' \| 'secondary'       | 'primary' | Visual variant    |
| size     | 'small' \| 'medium' \| 'large' | 'medium'  | Component size    |
| children | ReactNode                      | -         | Component content |

## Examples

### Basic Usage

```tsx
<ComponentName>Basic content</ComponentName>
```

### With Variants

```tsx
<ComponentName variant="secondary" size="large">
  Secondary large component
</ComponentName>
```

## Accessibility

- Supports keyboard navigation
- Proper ARIA labels
- Screen reader compatible
- Focus management

## Styling

The component uses CSS modules and supports design system tokens:

- `--component-bg`: Background color
- `--component-text`: Text color
- `--component-border`: Border color

```

---

**Component Checklist:**

Before considering a component complete:

- [ ] TypeScript interfaces defined
- [ ] CSS modules with design system tokens
- [ ] Accessibility features implemented
- [ ] Unit tests written
- [ ] JSDoc documentation added
- [ ] Examples in Storybook (if applicable)
- [ ] Responsive design verified
- [ ] Cross-browser testing completed

---

**Last Updated**: June 8, 2025
**Version**: 1.0
```
