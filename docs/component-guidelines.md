# SuperFolio - Component Guidelines

## í·§í·· Localization Requirements

All user-facing content MUST be in Brazilian Portuguese (pt-BR):
- Button text, labels, placeholders, validation messages
- Alt text, ARIA labels, error messages, tooltips

## Component Structure

```typescript
interface ComponentProps {
  title: string
  isLoading?: boolean
  onAction: () => void
}

export const Component = ({ title, isLoading = false, onAction }: ComponentProps) => {
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
