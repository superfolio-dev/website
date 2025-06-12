# SuperFolio - Component Guidelines

## Brazilian Portuguese Localization Requirements

All user-facing content MUST be in Brazilian Portuguese (pt-BR):

- Button text, labels, placeholders, validation messages
- Alt text, ARIA labels, error messages, tooltips

## Component Organization

All components are organized in `src/components/` with their own folder structure:

```
src/components/
├── ComponentName/
│   ├── ComponentName.tsx        # Main component file
│   ├── ComponentName.module.css # Component styles
│   ├── ComponentName.test.tsx   # Component tests
│   └── index.ts                 # Export file
├── pages/                       # Page components
│   ├── PageName/
│   │   ├── PageName.tsx
│   │   ├── PageName.module.css
│   │   ├── PageName.test.tsx
│   │   └── index.ts
└── templates/                   # Portfolio templates
    ├── TemplateName/
    │   ├── TemplateName.tsx
    │   ├── TemplateName.module.css
    │   ├── TemplateName.test.tsx
    │   └── index.ts
```

### Component Export Pattern

Each component folder must have an `index.ts` file for clean imports:

```typescript
// src/components/Button/index.ts
export { Button } from './Button'
export type { ButtonProps } from './Button'
```

Usage:

```typescript
import { Button } from 'components/Button'
```

## Component Structure

```typescript
interface ComponentProps {
  title: string
  isLoading?: boolean
  onAction: () => void
}

export const Component = ({
  title,
  isLoading = false,
  onAction,
}: ComponentProps) => {
  const [state, setState] = useState()

  const handleClick = () => {
    onAction()
  }

  return (
    <button
      className={styles.button}
      disabled={isLoading}
      onClick={handleClick}
      aria-label={isLoading ? 'Carregando...' : title}
    >
      {isLoading ? 'Carregando...' : title}
    </button>
  )
}
```

## Performance Patterns

- Use `React.memo` for stable props
- `useCallback` for event handlers
- `useMemo` for expensive calculations

## Testing

Every component requires unit tests with Portuguese validation.
