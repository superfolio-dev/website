# SuperFolio - Coding Standards

## 🇧🇷 Localization (CRITICAL)

**User-facing content**: Brazilian Portuguese (pt-BR)
**Code structure**: English

### Portuguese Content

- All UI text, labels, buttons, messages, alt texts, ARIA labels
- Placeholders, validation messages, error messages
- Page titles, tooltips, notifications

### English Content

- Variable/function names, CSS classes, component names
- File names, comments, console logs, API endpoints

### Format Standards

- **Date/Time**: DD/MM/YYYY, 24h format
- **Numbers**: Comma decimal, dot thousands (1.234,56)

## File Naming

- **Components**: `PascalCase.tsx`
- **Styles**: `PascalCase.module.css`
- **Tests**: `PascalCase.test.tsx`
- **Hooks**: `camelCase.ts`
- **Types**: `PascalCase.ts`
- **Utils**: `camelCase.ts`

## TypeScript Standards

- Strict mode enabled
- Explicit types where needed, avoid `any`
- Type-only imports: `import type { Type } from 'module'`
- No semicolons (ESLint enforced)
- Individual files for major types

```typescript
// ✅ Good
interface ComponentProps {
  title: string
  isLoading?: boolean
}

export const Component = ({ title, isLoading = false }: ComponentProps) => {
  return (
    <button disabled={isLoading}>{isLoading ? 'Carregando...' : title}</button>
  )
}
```

## Component Structure

1. **Imports** (external → internal → types → styles)
2. **Interface definitions**
3. **Component function** (arrow function)
4. **Hooks first**
5. **Event handlers**
6. **Render logic**

```typescript
import { useState } from 'react'
import type { User } from '../types/User'
import styles from './Component.module.css'

interface Props {
  user: User
  onSave: (user: User) => void
}

export const UserProfile = ({ user, onSave }: Props) => {
  const [isEditing, setIsEditing] = useState(false)

  const handleSave = () => {
    onSave(user)
    setIsEditing(false)
  }

  return <div className={styles.profile}>...</div>
}
```

## State Management

- **Local state**: `useState`
- **Global state**: Zustand
- **Component tree state**: React Context
- Let TypeScript infer simple types

## CSS Standards

- CSS Modules for components
- Design system variables
- Mobile-first responsive
- Dark theme default

## Testing Requirements

- **All components**: Unit tests required
- **All pages**: E2E tests required
- Minimum 80% coverage
- Test user-facing text in Portuguese

## Error Handling

- Error boundaries for components
- Proper error logging
