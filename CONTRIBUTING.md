# Contributing to ZOE Solar Design System

This guide outlines the rules and best practices for contributing to the ZOE Solar website while maintaining design consistency and UI harmonization.

## Design System Principles

### 1. Component-First Approach
- **Always use existing components** from `src/components/ui/` instead of creating custom styles
- **Extend, don't replace** - if you need a variant, add it to the existing component
- **Consistent props** - follow established patterns (`variant`, `size`, `className`)

### 2. Token-Based Styling
```css
/* ✅ Good - Use design tokens */
color: var(--color-brand-navy);
font-size: var(--font-size-lg);
border-radius: var(--radius-md);

/* ❌ Bad - Avoid hardcoded values */
color: #0d2a33;
font-size: 18px;
border-radius: 8px;
```

### 3. Responsive Design
- **Mobile-first** - design for small screens, then enhance
- **Use existing breakpoints** - defined in Tailwind config
- **Test all viewports** - ensure components work on mobile, tablet, desktop

## Component Guidelines

### When to Create a New Component
Create a new component when:
- ✅ The pattern will be reused in 3+ places
- ✅ It encapsulates complex logic or state
- ✅ It improves accessibility or user experience
- ✅ It follows the established component API

### When to Add a Variant
Add a variant to existing component when:
- ✅ The visual difference is minor (color, size, spacing)
- ✅ The behavior is the same
- ✅ It maintains the same accessibility requirements

### Component Checklist
- [ ] Mobile responsive
- [ ] Keyboard navigation support
- [ ] Focus-visible styles
- [ ] Loading/disabled states
- [ ] Error states (if applicable)
- [ ] Consistent with design tokens
- [ ] Proper TypeScript types
- [ ] Accessibility attributes (ARIA)

## Forbidden Practices

### ❌ Inline Styles
```jsx
// Bad - avoid inline styles
<div style={{ color: '#ff0000', fontSize: '16px' }}>

// Good - use className with tokens
<div className="text-red-600 text-base">
```

**Exception:** Dynamic/calculated styles are allowed with explanation:
```jsx
<div style={{ transform: `translateX(${offset}px)` }}> // dynamic style - calculated offset
```

### ❌ Hardcoded Hex Colors
```css
/* Bad - hardcoded colors */
.custom-button {
  background: #0d2a33;
  border: 1px solid #e5e7eb;
}

/* Good - design tokens */
.custom-button {
  background: var(--color-brand-navy);
  border: 1px solid var(--color-neutral-200);
}
```

### ❌ Ad-hoc Font Sizes
```css
/* Bad - arbitrary font sizes */
.heading {
  font-size: 24px;
}

/* Good - typography scale */
.heading {
  font-size: var(--font-size-2xl);
}
```

### ❌ Non-Standard Shadows/Borders
```css
/* Bad - custom shadows */
.card {
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

/* Good - elevation tokens */
.card {
  box-shadow: var(--shadow-md);
}
```

## Code Standards

### JavaScript/React
- Use functional components with hooks
- Prefer `const` over `let` where possible
- Use destructuring for props and imports
- Add proper error boundaries for async components

### CSS/Styling
- Use Tailwind utilities for spacing, colors, typography
- Custom CSS only for complex animations or unique patterns
- Follow BEM methodology for custom CSS classes
- Use CSS custom properties for theming

### Accessibility Requirements
- All interactive elements must be keyboard accessible
- Focus indicators must be visible and consistent
- Use semantic HTML elements
- Provide alt text for images
- Use proper heading hierarchy
- Include ARIA attributes where needed

## File Organization

```
src/
├── components/
│   ├── ui/                    # Reusable UI components
│   │   ├── button.jsx         # Centralized button component
│   │   ├── card.jsx           # Card variations
│   │   └── index.js           # Component exports
│   ├── sections/              # Page-specific sections
│   └── layout/                # Layout components
├── pages/                     # Route components
├── styles/                    # Global styles and tokens
├── utils/                     # Utility functions
└── config/                    # Configuration files
```

## Testing Guidelines

### Visual Regression
- Run `npm run test:visual` before submitting changes
- Update snapshots only when intentional visual changes are made
- Test components in isolation when possible

### Smoke Tests
- Ensure all interactive elements are accessible
- Test keyboard navigation
- Verify form functionality
- Check responsive behavior

## Git Workflow

### Commit Messages
Use conventional commit format:
```
feat: add new testimonial component with star ratings
fix: resolve focus trap issue in modal component
docs: update component API documentation
style: apply consistent spacing to card components
```

### Pre-commit Hooks
The pre-commit hook will automatically check for:
- Disallowed hex colors
- Inline styles (without justification)
- Non-token font sizes
- ESLint design system violations

## Review Checklist

Before submitting a PR, ensure:

### Design Consistency
- [ ] Uses existing components or proper variants
- [ ] Follows design token system
- [ ] Consistent with overall visual design
- [ ] Mobile responsive

### Code Quality
- [ ] No inline styles without justification
- [ ] No hardcoded hex colors
- [ ] Uses semantic HTML
- [ ] Proper error handling

### Accessibility
- [ ] Keyboard navigation works
- [ ] Focus indicators are visible
- [ ] Screen reader friendly
- [ ] Proper ARIA attributes

### Performance
- [ ] No unnecessary re-renders
- [ ] Images are optimized
- [ ] CSS is minimal and efficient
- [ ] JavaScript is tree-shakeable

### Testing
- [ ] Visual regression tests pass
- [ ] Smoke tests pass
- [ ] Manual testing completed
- [ ] Edge cases considered

## Common Patterns

### Button Usage
```jsx
import { Button } from '@/components/ui/button';

// Primary CTA
<Button variant="primary" size="lg">Jetzt anfragen</Button>

// Secondary action
<Button variant="outline">Mehr erfahren</Button>

// With icon
<Button iconStart={<Phone />}>Anrufen</Button>
```

### Card Patterns
```jsx
import { Card } from '@/components/ui/card';

// Basic card
<Card variant="subtle" elevation="sm">
  <CardContent>...</CardContent>
</Card>

// Interactive card
<Card variant="outline" elevation="md" interactive>
  <CardContent>...</CardContent>
</Card>
```

### Form Fields
```jsx
import { Field } from '@/components/ui/field';

<Field
  label="Ihr Name"
  error={errors.name}
  required
>
  <input type="text" name="name" />
</Field>
```

## Resources

- [Design System Documentation](./docs/styleguide.md)
- [Component API Reference](./src/components/ui/)
- [Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Getting Help

- Check existing components in `src/components/ui/`
- Review the styleguide documentation
- Look at similar implementations in other pages
- Ask for guidance in PR comments

---

By following these guidelines, we maintain a consistent, accessible, and maintainable design system that enhances user experience and developer productivity.