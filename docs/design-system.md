# SuperFolio - Design System

✅ **Design system implemented** in `src/styles/variables.css` and `src/styles/global.css`

## Layout Philosophy

- **Full-width layouts**: Content spans entire viewport
- **Fluid containers**: No fixed max-widths
- **Responsive spacing**: CSS variables for consistency
- **Mobile-first design**: Progressive enhancement

## CSS Variables

✅ **All design tokens are implemented and available for use**

### Colors

```css
:root {
  /* Primary colors */
  --color-primary: #6366f1;
  --color-primary-hover: #4f46e5;

  /* Background colors */
  --color-bg-primary: #0f0f23;
  --color-bg-secondary: #1a1a2e;
  --color-bg-tertiary: #16213e;

  /* Text colors */
  --color-text-primary: #ffffff;
  --color-text-secondary: #a1a1aa;
  --color-text-muted: #71717a;

  /* Border colors */
  --color-border: #27272a;
  --color-border-hover: #3f3f46;
}
```

### Spacing

```css
:root {
  --space-xs: 0.25rem; /* 4px */
  --space-sm: 0.5rem; /* 8px */
  --space-md: 1rem; /* 16px */
  --space-lg: 1.5rem; /* 24px */
  --space-xl: 2rem; /* 32px */
  --space-2xl: 3rem; /* 48px */
  --space-3xl: 4rem; /* 64px */
}
```

### Typography

```css
:root {
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 2rem;

  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  --line-height-tight: 1.25;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;
}
```

### Border Radius

```css
:root {
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 1rem;
  --radius-full: 9999px;
}
```

## Layout Patterns

### Container

```css
.container {
  width: 100%;
  padding-left: var(--space-md);
  padding-right: var(--space-md);
}

@media (min-width: 768px) {
  .container {
    padding-left: var(--space-xl);
    padding-right: var(--space-xl);
  }
}
```

### Grid System

```css
.grid {
  display: grid;
  gap: var(--space-md);
}

.grid--cols-2 {
  grid-template-columns: repeat(2, 1fr);
}

.grid--cols-3 {
  grid-template-columns: repeat(3, 1fr);
}

@media (max-width: 768px) {
  .grid--cols-2,
  .grid--cols-3 {
    grid-template-columns: 1fr;
  }
}
```

## Component Styles

### Button

```css
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-sm) var(--space-md);
  border: none;
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all 0.2s ease;
}

.button--primary {
  background: var(--color-primary);
  color: var(--color-text-primary);
}

.button--primary:hover {
  background: var(--color-primary-hover);
}

.button--secondary {
  background: var(--color-bg-secondary);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
}
```

### Card

```css
.card {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  transition: border-color 0.2s ease;
}

.card:hover {
  border-color: var(--color-border-hover);
}
```

### Form Field

```css
.field {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
}

.input {
  padding: var(--space-sm) var(--space-md);
  background: var(--color-bg-tertiary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text-primary);
  font-size: var(--font-size-base);
}

.input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-alpha);
}
```

## Responsive Breakpoints

```css
/* Mobile first approach */
@media (min-width: 640px) {
  /* sm */
}
@media (min-width: 768px) {
  /* md */
}
@media (min-width: 1024px) {
  /* lg */
}
@media (min-width: 1280px) {
  /* xl */
}
```

## Animation Standards

```css
/* Transitions */
.transition {
  transition: all 0.2s ease;
}

.transition--fast {
  transition: all 0.1s ease;
}

.transition--slow {
  transition: all 0.3s ease;
}

/* Common animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
```
