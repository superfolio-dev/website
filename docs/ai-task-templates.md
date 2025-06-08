# SuperFolio - AI Task Templates

## Overview

This document provides standardized AI prompts and templates for common development tasks in SuperFolio. These templates ensure consistent code quality, adherence to project standards, and efficient development workflows.

## Task Categories

### 1. Component Creation
### 2. Page Development
### 3. Feature Implementation
### 4. Bug Fixes
### 5. Testing
### 6. Refactoring
### 7. Documentation

---

## 1. Component Creation

### Basic Component Template

**Prompt Template:**
```
Create a new {ComponentName} component for SuperFolio following these requirements:

**Component Specifications:**
- Type: {functional/compound/form/layout} component
- Purpose: {brief description}
- Props: {list required props with types}
- Styling: CSS modules with design system variables
- Accessibility: WCAG AA compliant

**Requirements:**
- Follow SuperFolio coding standards (no semicolons, arrow functions, type-only imports)
- Include TypeScript interfaces for all props
- Use CSS modules with descriptive class names
- Implement proper accessibility (ARIA labels, keyboard navigation)
- Include JSDoc comments for complex logic
- Follow component file structure: ComponentName.tsx, ComponentName.module.css, index.ts

**Design System Usage:**
- Use CSS custom properties from design-system.css
- Follow spacing scale (--space-*)
- Use typography scale (--font-size-*)
- Implement responsive design with mobile-first approach

**Output Structure:**
1. TypeScript interface file
2. Component implementation
3. CSS module styles
4. Barrel export (index.ts)
5. Basic test setup

Please ensure the component is accessible, performant, and follows React best practices.
```

**Example Usage:**
```
Create a new TemplateCard component for SuperFolio following these requirements:

**Component Specifications:**
- Type: functional component
- Purpose: Display portfolio template information with preview and selection
- Props: template (Template type), onSelect (function), isSelected (boolean)
- Styling: CSS modules with design system variables
- Accessibility: WCAG AA compliant

[... rest of template]
```

### Compound Component Template

**Prompt Template:**
```
Create a compound {ComponentName} component system for SuperFolio:

**Component System:**
- Main component: {ComponentName}
- Sub-components: {list sub-components}
- Pattern: Use compound component pattern with static properties
- Context: {if internal state sharing needed}

**Requirements:**
- Implement compound component pattern (Component.SubComponent)
- Share state between sub-components using context if needed
- Each sub-component should be usable independently
- Follow SuperFolio design system and coding standards
- Include comprehensive TypeScript types
- Implement proper forwarding of refs where applicable

**Example Usage Pattern:**
```jsx
<{ComponentName} {mainProps}>
  <{ComponentName}.{SubComponent1} {props1} />
  <{ComponentName}.{SubComponent2} {props2} />
</{ComponentName}>
```

Please provide the complete compound component implementation with proper TypeScript types and accessibility features.
```

---

## 2. Page Development

### Page Creation Template

**Prompt Template:**
```
Create a new {PageName} page for SuperFolio following these requirements:

**Page Specifications:**
- Route: {route path}
- Purpose: {page description}
- Data Requirements: {API calls, state management}
- Components: {list of components needed}
- User Flow: {describe user interactions}

**Architecture Requirements:**
- Use page-level data fetching (React Query)
- Implement proper error boundaries
- Include loading and error states
- Follow responsive design principles
- Use React Router for navigation

**Folder Structure:**
```
pages/{PageName}/
├── {PageName}.tsx
├── {PageName}.module.css
├── {PageName}.test.tsx
├── {PageName}.e2e.test.ts
├── components/          # Page-specific components
│   ├── {Component1}/
│   └── {Component2}/
└── index.ts
```

**Technical Requirements:**
- Implement SEO optimization (meta tags, structured data)
- Use proper semantic HTML structure
- Include breadcrumbs if part of multi-step flow
- Implement proper focus management
- Follow SuperFolio coding standards

**State Management:**
- Use {Zustand/Context/Local State} for {specify usage}
- Implement proper error handling
- Include form validation if applicable

Please create the complete page implementation with proper TypeScript types, responsive design, and accessibility features.
```

### Multi-Step Page Template

**Prompt Template:**
```
Create a multi-step {PageName} page for SuperFolio with {number} steps:

**Steps:**
1. {Step 1 description}
2. {Step 2 description}
3. {Step 3 description}

**Requirements:**
- Implement step navigation with progress indicator
- Maintain form state across steps
- Include validation for each step
- Allow back/forward navigation
- Save progress in localStorage
- Handle page refresh gracefully

**State Management:**
- Use FormContext for form data
- Implement step validation hooks
- Persist data with useLocalStorage hook

**User Experience:**
- Show progress indicator
- Enable keyboard navigation
- Include step summaries
- Implement proper focus management
- Add step transition animations

Please implement the complete multi-step page with proper state management and user experience features.
```

---

## 3. Feature Implementation

### Feature Development Template

**Prompt Template:**
```
Implement the {FeatureName} feature for SuperFolio:

**Feature Description:**
{Detailed description of the feature}

**User Stories:**
- As a {user type}, I want to {action} so that {benefit}
- As a {user type}, I want to {action} so that {benefit}

**Technical Requirements:**
- Components needed: {list components}
- API endpoints: {list if applicable}
- State management: {Zustand store/Context/Local}
- Data flow: {describe data flow}
- Validation rules: {list validation requirements}

**Acceptance Criteria:**
- [ ] {Criterion 1}
- [ ] {Criterion 2}
- [ ] {Criterion 3}

**Architecture Considerations:**
- Follow SuperFolio component patterns
- Implement proper error handling
- Include loading states and optimistic updates
- Use TypeScript strict mode
- Follow accessibility guidelines

**Testing Requirements:**
- Unit tests for utility functions
- Component tests for UI interactions
- Integration tests for complete flows
- E2E tests for critical paths

Please implement the complete feature with proper documentation, tests, and error handling.
```

### API Integration Template

**Prompt Template:**
```
Implement API integration for {Feature/Endpoint} in SuperFolio:

**API Specifications:**
- Endpoint: {URL and method}
- Request format: {describe request structure}
- Response format: {describe response structure}
- Error scenarios: {list possible errors}

**Implementation Requirements:**
- Use React Query for data fetching
- Implement proper error handling with ApiError class
- Include loading states and caching
- Add optimistic updates where appropriate
- Follow API service patterns

**Error Handling:**
- Network errors
- Validation errors (400)
- Authentication errors (401)
- Server errors (500)

**Type Safety:**
- Create TypeScript interfaces for request/response
- Use type guards for runtime validation
- Implement proper error typing

**Cache Strategy:**
- Stale time: {specify duration}
- Cache time: {specify duration}
- Invalidation rules: {specify when to invalidate}

Please implement the complete API integration with proper error handling, caching, and TypeScript types.
```

---

## 4. Bug Fixes

### Bug Fix Template

**Prompt Template:**
```
Fix the following bug in SuperFolio:

**Bug Description:**
{Detailed description of the bug}

**Steps to Reproduce:**
1. {Step 1}
2. {Step 2}
3. {Step 3}

**Expected Behavior:**
{What should happen}

**Actual Behavior:**
{What currently happens}

**Error Messages/Logs:**
```
{Include any error messages or console logs}
```

**Affected Components/Files:**
- {File 1}
- {File 2}

**Investigation Requirements:**
- Analyze the root cause
- Check for similar issues in the codebase
- Consider edge cases and side effects
- Verify the fix doesn't break existing functionality

**Solution Requirements:**
- Implement minimal, focused fix
- Add/update tests to prevent regression
- Follow SuperFolio coding standards
- Include proper error handling
- Update documentation if needed

**Testing:**
- Unit tests for the specific fix
- Integration tests for affected flows
- Manual testing of edge cases

Please analyze the bug, implement a proper fix, and include appropriate tests to prevent regression.
```

### Performance Issue Template

**Prompt Template:**
```
Optimize performance issue in SuperFolio:

**Performance Problem:**
{Description of the performance issue}

**Current Metrics:**
- Load time: {current time}
- Bundle size: {current size}
- Rendering time: {current time}

**Target Metrics:**
- Load time: {target time}
- Bundle size: {target size}
- Rendering time: {target time}

**Investigation Areas:**
- Component re-renders
- Bundle size analysis
- Network requests
- Memory leaks
- JavaScript execution time

**Optimization Strategies:**
- React.memo and useMemo optimization
- Code splitting and lazy loading
- Image optimization
- Bundle analysis and tree shaking
- Caching strategies

**Measurement:**
- Use React DevTools Profiler
- Lighthouse audit
- Bundle analyzer
- Performance monitoring

Please implement performance optimizations while maintaining code quality and functionality.
```

---

## 5. Testing

### Test Implementation Template

**Prompt Template:**
```
Create comprehensive tests for {Component/Feature/Page} in SuperFolio:

**Testing Scope:**
- Component: {ComponentName}
- File location: {file path}
- Testing type: {Unit/Integration/E2E}

**Test Cases to Cover:**
- Happy path scenarios
- Error scenarios
- Edge cases
- Accessibility
- Responsive behavior

**Testing Requirements:**
- Use Vitest + React Testing Library for components
- Use Playwright for E2E tests
- Mock external dependencies with MSW
- Follow SuperFolio testing patterns
- Achieve {coverage percentage}% test coverage

**Specific Test Scenarios:**
1. {Test scenario 1}
2. {Test scenario 2}
3. {Test scenario 3}

**Mock Requirements:**
- API calls: {specify endpoints to mock}
- External services: {list services}
- Browser APIs: {list APIs to mock}

**Accessibility Testing:**
- Screen reader compatibility
- Keyboard navigation
- Color contrast
- Focus management

Please implement comprehensive tests following SuperFolio testing guidelines and best practices.
```

### E2E Test Template

**Prompt Template:**
```
Create E2E tests for {UserFlow} in SuperFolio:

**User Flow:**
{Describe the complete user journey}

**Test Scenarios:**
1. Happy path: {successful flow}
2. Error handling: {error scenarios}
3. Edge cases: {unusual but valid scenarios}

**Cross-Browser Testing:**
- Chrome/Chromium
- Firefox
- Safari/WebKit
- Mobile browsers

**Responsive Testing:**
- Desktop (1920x1080)
- Tablet (768x1024)
- Mobile (375x667)

**Test Data:**
- Use test fixtures
- Clean up test data after tests
- Handle dynamic data appropriately

**Visual Testing:**
- Screenshot comparison for critical UI
- Responsive layout verification
- Theme switching validation

Please implement comprehensive E2E tests using Playwright following SuperFolio testing standards.
```

---

## 6. Refactoring

### Code Refactoring Template

**Prompt Template:**
```
Refactor {Component/Feature/Module} in SuperFolio to improve {code quality/performance/maintainability}:

**Current Issues:**
- {Issue 1}
- {Issue 2}
- {Issue 3}

**Refactoring Goals:**
- {Goal 1}
- {Goal 2}
- {Goal 3}

**Refactoring Strategy:**
- Maintain existing functionality
- Improve code organization
- Follow SuperFolio patterns
- Enhance TypeScript usage
- Improve performance where applicable

**Breaking Changes:**
- {List any breaking changes}
- Migration strategy: {if applicable}

**Testing Strategy:**
- Ensure all existing tests pass
- Add new tests for improved functionality
- Update integration tests if needed

**Code Quality Improvements:**
- Better TypeScript types
- Improved component composition
- Enhanced error handling
- Better separation of concerns

Please refactor the code while maintaining backward compatibility and improving overall code quality.
```

### Migration Template

**Prompt Template:**
```
Migrate {OldPattern/Library/Component} to {NewPattern/Library/Component} in SuperFolio:

**Migration Scope:**
- Files affected: {list files}
- Components to migrate: {list components}
- Dependencies to update: {list dependencies}

**Migration Strategy:**
1. {Step 1}
2. {Step 2}
3. {Step 3}

**Backward Compatibility:**
- {Strategy for maintaining compatibility}
- Deprecation warnings: {if applicable}
- Migration timeline: {specify timeline}

**Testing Requirements:**
- All existing tests must pass
- Add tests for new patterns
- Verify no functionality regression

**Documentation Updates:**
- Update coding standards if needed
- Update component guidelines
- Add migration guide for other developers

Please implement the migration following SuperFolio standards and ensuring no functionality regression.
```

---

## 7. Documentation

### Documentation Template

**Prompt Template:**
```
Create/update documentation for {Feature/Component/Process} in SuperFolio:

**Documentation Type:**
- {API documentation/User guide/Developer guide/Architecture documentation}

**Content Requirements:**
- Clear, concise explanations
- Code examples with proper syntax highlighting
- Screenshots/diagrams where helpful
- Links to related documentation

**Structure:**
1. Overview/Introduction
2. {Section 2}
3. {Section 3}
4. Examples
5. Troubleshooting (if applicable)

**Code Examples:**
- Include TypeScript examples
- Show both basic and advanced usage
- Include error handling examples
- Demonstrate best practices

**Maintenance:**
- Include last updated date
- Version information
- Review schedule

Please create comprehensive documentation following SuperFolio documentation standards and markdown formatting guidelines.
```

---

## Task-Specific Prompts

### Quick Component Fix
```
Quick fix for {ComponentName}: {brief description of issue}

Requirements:
- Minimal change approach
- Follow SuperFolio patterns
- Include test update if needed
- Maintain TypeScript strict mode
```

### Add TypeScript Types
```
Add proper TypeScript types for {Component/Function/Module}:

- Create interfaces for all props/parameters
- Use strict TypeScript patterns
- Follow SuperFolio naming conventions
- Include JSDoc comments for complex types
- Ensure no 'any' types
```

### Accessibility Improvement
```
Improve accessibility for {Component/Page}:

- WCAG AA compliance
- Screen reader optimization
- Keyboard navigation
- Focus management
- Color contrast verification
- Semantic HTML structure
```

### Performance Optimization
```
Optimize performance for {Component/Page}:

- React.memo implementation
- useMemo/useCallback optimization
- Code splitting opportunities
- Bundle size reduction
- Rendering optimization
- Memory leak prevention
```

---

## Prompt Modifiers

### Code Quality Focus
Add to any prompt:
```
**Code Quality Requirements:**
- Follow SuperFolio coding standards strictly
- Include comprehensive TypeScript types
- Implement proper error handling
- Add JSDoc comments for complex logic
- Ensure accessibility compliance
- Include appropriate tests
```

### Performance Focus
Add to any prompt:
```
**Performance Requirements:**
- Optimize for Core Web Vitals
- Implement proper memoization
- Consider code splitting
- Optimize bundle size
- Minimize re-renders
- Include performance measurements
```

### Accessibility Focus
Add to any prompt:
```
**Accessibility Requirements:**
- WCAG AA compliance minimum
- Screen reader compatibility
- Keyboard navigation support
- Proper focus management
- Semantic HTML structure
- Color contrast verification
- ARIA labels where needed
```

---

**Usage Instructions:**

1. **Choose the appropriate template** based on the task type
2. **Fill in the placeholders** with specific project details
3. **Add relevant modifiers** for additional focus areas
4. **Include specific requirements** from SuperFolio guidelines
5. **Reference existing patterns** in the codebase when applicable

**Template Maintenance:**

- Review and update templates quarterly
- Add new templates for emerging patterns
- Collect feedback on template effectiveness
- Maintain consistency with project evolution

---

**Last Updated**: June 8, 2025  
**Version**: 1.0
