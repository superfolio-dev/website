# SuperFolio - Design System

## Layout Philosophy

SuperFolio uses a **fluid layout system** that adapts to all screen sizes without fixed width constraints. The design emphasizes:

- **Full-width layouts**: Content spans the entire viewport width
- **Responsive containers**: Content areas adjust fluidly based on screen size
- **Consistent spacing**: Using CSS variables for predictable spacing
- **No fixed widths**: Avoid `max-width` constraints that create side margins

## Layout System

### Container Pattern

```css
/* Fluid container that spans full width */
.container {
  width: 100%;
  padding-left: var(--space-md);
  padding-right: var(--space-md);
}

/* Responsive padding adjustments */
@media (min-width: 768px) {
  .container {
    padding-left: var(--space-xl);
    padding-right: var(--space-xl);
  }
}

@media (min-width: 1024px) {
  .container {
    padding-left: var(--space-2xl);
    padding-right: var(--space-2xl);
  }
}
```

### Background System

```css
/* Full-width background sections */
.section {
  width: 100%;
  background: var(--color-bg-primary);
}

.section--alternate {
  background: var(--color-bg-secondary);
}

/* Content within sections */
.section__content {
  width: 100%;
  padding: var(--space-2xl) var(--space-md);
}
```

## CSS Variables Setup

### Root Variables

Define all design tokens as CSS custom properties for easy theming:

```css
/* src/styles/design-system.css */
:root {
  /* Colors - Dark Theme (Default) */
  --color-primary: #667eea;
  --color-primary-hover: #5a67d8;
  --color-primary-light: #7c8aed;

  --color-secondary: #10b981;
  --color-secondary-hover: #047857;
  --color-secondary-light: #34d399;

  --color-accent: #f59e0b;
  --color-accent-hover: #d97706;
  --color-accent-light: #fbbf24;

  /* Background Colors */
  --color-bg-primary: #0f0f23;
  --color-bg-secondary: #1a1a2e;
  --color-bg-tertiary: #16213e;
  --color-bg-surface: #1e1e2f;

  /* Text Colors */
  --color-text-primary: #ffffff;
  --color-text-secondary: #cbd5e0;
  --color-text-muted: #a0aec0;
  --color-text-inverse: #1a202c;

  /* Border Colors */
  --color-border-primary: #2d3748;
  --color-border-secondary: #4a5568;
  --color-border-accent: var(--color-primary);

  /* Status Colors */
  --color-success: #38a169;
  --color-warning: #ed8936;
  --color-error: #e53e3e;
  --color-info: #3182ce;

  /* Spacing Scale (8px base) */
  --space-xs: 0.25rem; /* 4px */
  --space-sm: 0.5rem; /* 8px */
  --space-md: 1rem; /* 16px */
  --space-lg: 1.5rem; /* 24px */
  --space-xl: 2rem; /* 32px */
  --space-2xl: 3rem; /* 48px */
  --space-3xl: 4rem; /* 64px */
  --space-4xl: 6rem; /* 96px */

  /* Typography Scale */
  --font-size-xs: 0.75rem; /* 12px */
  --font-size-sm: 0.875rem; /* 14px */
  --font-size-base: 1rem; /* 16px */
  --font-size-lg: 1.125rem; /* 18px */
  --font-size-xl: 1.25rem; /* 20px */
  --font-size-2xl: 1.5rem; /* 24px */
  --font-size-3xl: 1.875rem; /* 30px */
  --font-size-4xl: 2.25rem; /* 36px */
  --font-size-5xl: 3rem; /* 48px */

  /* Font Weights */
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-weight-extrabold: 800;

  /* Line Heights */
  --line-height-tight: 1.2;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;

  /* Border Radius */
  --radius-sm: 0.25rem; /* 4px */
  --radius-md: 0.5rem; /* 8px */
  --radius-lg: 0.75rem; /* 12px */
  --radius-xl: 1rem; /* 16px */
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15);

  /* Transitions */
  --transition-fast: 150ms ease-in-out;
  --transition-normal: 300ms ease-in-out;
  --transition-slow: 500ms ease-in-out;

  /* Breakpoints (for reference in JS) */
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
}
```

### Light Theme Override

```css
/* Light theme variables */
[data-theme='light'] {
  /* Background Colors */
  --color-bg-primary: #ffffff;
  --color-bg-secondary: #f7fafc;
  --color-bg-tertiary: #edf2f7;
  --color-bg-surface: #ffffff;

  /* Text Colors */
  --color-text-primary: #1a202c;
  --color-text-secondary: #4a5568;
  --color-text-muted: #718096;
  --color-text-inverse: #ffffff;

  /* Border Colors */
  --color-border-primary: #e2e8f0;
  --color-border-secondary: #cbd5e0;
}
```

## Typography System

### Font Families

```css
:root {
  --font-primary: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
    'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
  --font-heading: 'Inter', var(--font-primary);
  --font-mono: 'Fira Code', 'Monaco', 'Consolas', monospace;
}
```

### Typography Classes

```css
/* Heading styles */
.text-h1 {
  font-size: var(--font-size-5xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  font-family: var(--font-heading);
}

.text-h2 {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-tight);
  font-family: var(--font-heading);
}

.text-h3 {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-normal);
  font-family: var(--font-heading);
}

/* Body text styles */
.text-body-lg {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-normal);
  line-height: var(--line-height-relaxed);
}

.text-body {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-normal);
  line-height: var(--line-height-normal);
}

.text-body-sm {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-normal);
  line-height: var(--line-height-normal);
}

/* Utility classes */
.text-muted {
  color: var(--color-text-muted);
}

.text-bold {
  font-weight: var(--font-weight-bold);
}
```

## Component Design Patterns

### Button System

```css
/* Base button styles */
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-sm) var(--space-md);
  border: none;
  border-radius: var(--radius-md);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-base);
  line-height: var(--line-height-normal);
  transition: all var(--transition-fast);
  cursor: pointer;
  text-decoration: none;
  min-height: 44px; /* Touch-friendly minimum */
}

/* Button variants */
.button--primary {
  background-color: var(--color-primary);
  color: var(--color-text-inverse);
}

.button--primary:hover {
  background-color: var(--color-primary-hover);
}

.button--secondary {
  background-color: transparent;
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
}

.button--ghost {
  background-color: transparent;
  color: var(--color-text-secondary);
}

/* Button sizes */
.button--sm {
  padding: var(--space-xs) var(--space-sm);
  font-size: var(--font-size-sm);
  min-height: 36px;
}

.button--lg {
  padding: var(--space-md) var(--space-lg);
  font-size: var(--font-size-lg);
  min-height: 52px;
}
```

### Card System

```css
.card {
  background-color: var(--color-bg-surface);
  border: 1px solid var(--color-border-primary);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-normal);
}

.card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.card--interactive {
  cursor: pointer;
}

.card--interactive:hover {
  border-color: var(--color-border-accent);
}
```

## Responsive Design Guidelines

### Mobile-First Approach

Always start with mobile styles and add larger breakpoint styles:

```css
/* Mobile first (default) */
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-md);
}

/* Tablet and up */
@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-lg);
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-xl);
  }
}
```

### Responsive Utilities

```css
/* Show/hide at different breakpoints */
.hidden-mobile {
  display: none;
}

@media (min-width: 768px) {
  .hidden-mobile {
    display: block;
  }

  .hidden-tablet {
    display: none;
  }
}

@media (min-width: 1024px) {
  .hidden-tablet {
    display: block;
  }

  .hidden-desktop {
    display: none;
  }
}
```

## Layout System

Note: Use the fluid container pattern from the Layout Philosophy section instead of max-width containers.

### Flexbox Utilities

```css
.flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}

.items-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}

.justify-between {
  justify-content: space-between;
}

.gap-sm {
  gap: var(--space-sm);
}

.gap-md {
  gap: var(--space-md);
}

.gap-lg {
  gap: var(--space-lg);
}
```

## Usage Guidelines

### How to Use This Design System

1. **Import the design system CSS** in your main CSS file:

```css
@import './design-system.css';
```

2. **Use CSS variables** instead of hardcoded values:

```css
/* ❌ Bad */
.myComponent {
  color: #ffffff;
  padding: 16px;
  background: #667eea;
}

/* ✅ Good */
.myComponent {
  color: var(--color-text-primary);
  padding: var(--space-md);
  background: var(--color-primary);
}
```

3. **Use utility classes** for common patterns:

```tsx
<div className="flex items-center gap-md">
  <Button variant="primary">Save</Button>
  <Button variant="secondary">Cancel</Button>
</div>
```

4. **Follow the spacing scale**:

```css
/* Use predefined spacing */
margin: var(--space-lg);
padding: var(--space-sm) var(--space-md);

/* Avoid arbitrary values */
margin: 23px; /* ❌ */
```

### Theme Implementation

Toggle between light and dark themes:

```typescript
// Theme hook
export const useTheme = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return { theme, toggleTheme }
}
```

## Responsive Layout Patterns

### Full-Width Sections

Create sections that span the entire viewport width without constraints:

```css
/* Full-width hero section */
.hero {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    var(--color-bg-primary),
    var(--color-bg-secondary)
  );
  display: flex;
  align-items: center;
}

.hero__content {
  width: 100%;
  padding: var(--space-2xl) var(--space-md);
  text-align: center;
}

/* Content sections */
.content-section {
  width: 100%;
  padding: var(--space-3xl) 0;
}

.content-section:nth-child(even) {
  background: var(--color-bg-secondary);
}

.content-section:nth-child(odd) {
  background: var(--color-bg-primary);
}
```

### Responsive Grid System

```css
/* Fluid grid that adapts to content */
.grid {
  display: grid;
  gap: var(--space-lg);
  width: 100%;
  padding: 0 var(--space-md);
}

/* Responsive columns */
.grid--auto-fit {
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

.grid--auto-fill {
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
}

/* Specific breakpoint grids */
@media (min-width: 640px) {
  .grid--sm-2 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 768px) {
  .grid--md-3 {
    grid-template-columns: repeat(3, 1fr);
  }

  .grid {
    padding: 0 var(--space-xl);
  }
}

@media (min-width: 1024px) {
  .grid--lg-4 {
    grid-template-columns: repeat(4, 1fr);
  }

  .grid {
    padding: 0 var(--space-2xl);
  }
}
```

### Card System with Fluid Layout

```css
.card {
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border-primary);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  transition: all var(--transition-normal);
  width: 100%;
  height: fit-content;
}

.card:hover {
  border-color: var(--color-border-accent);
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

.card__header {
  margin-bottom: var(--space-md);
}

.card__content {
  margin-bottom: var(--space-md);
}

.card__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

## Component Layout Principles

### 1. Full-Width First

- Design components to use available width
- Avoid fixed widths except for specific UI elements
- Use percentage or viewport units for main containers

### 2. Content-Based Sizing

- Let content determine component height
- Use `min-height` instead of fixed `height`
- Implement fluid typography that scales with viewport

### 3. Responsive Spacing

- Use CSS variables for consistent spacing
- Implement responsive spacing that scales with screen size
- Avoid magic numbers in spacing values

```css
/* Example of responsive component */
.template-card {
  width: 100%;
  background: var(--color-bg-surface);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: all var(--transition-normal);
}

.template-card__image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.template-card__content {
  padding: var(--space-md);
}

@media (min-width: 768px) {
  .template-card__image {
    height: 240px;
  }

  .template-card__content {
    padding: var(--space-lg);
  }
}

@media (min-width: 1024px) {
  .template-card__image {
    height: 280px;
  }

  .template-card__content {
    padding: var(--space-xl);
  }
}
```
