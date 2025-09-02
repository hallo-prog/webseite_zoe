/**
 * ESLint Custom Rules Configuration for ZOE Solar Design System
 * 
 * Prevents usage of disallowed hex values and inline styles to maintain design consistency.
 */

module.exports = {
  extends: [
    "eslint:recommended",
    "@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended"
  ],
  plugins: [
    "react",
    "react-hooks",
    "@typescript-eslint"
  ],
  rules: {
    // Prevent inline styles (except for calculated/dynamic values)
    "react/forbid-dom-props": [
      "error",
      {
        "forbid": [
          {
            "propName": "style",
            "message": "Avoid inline styles. Use className with design system tokens instead. For dynamic styles, add a comment explaining why inline style is necessary."
          }
        ]
      }
    ],

    // Custom rule to check for disallowed hex colors
    "no-restricted-syntax": [
      "error",
      {
        "selector": "Literal[value=/#[0-9a-fA-F]{3,6}/]:not([value='#fff']):not([value='#000']):not([value='#ffffff']):not([value='#000000'])",
        "message": "Avoid hardcoded hex colors. Use CSS custom properties from the design system (e.g., var(--color-brand-navy))."
      },
      {
        "selector": "TemplateLiteral > Literal[value*='background:']\n",
        "message": "Avoid inline background styles. Use className with design system utilities."
      },
      {
        "selector": "TemplateLiteral > Literal[value*='color:']\n",
        "message": "Avoid inline color styles. Use className with design system utilities."
      },
      {
        "selector": "TemplateLiteral > Literal[value*='font-size:']\n", 
        "message": "Avoid inline font-size. Use typography scale from design system (--font-size-*)."
      }
    ],

    // Enforce specific className patterns
    "prefer-const": "error",
    "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],

    // React specific rules
    "react/prop-types": "off", // We use TypeScript for prop validation
    "react/react-in-jsx-scope": "off", // Not needed in React 17+
    "react/jsx-uses-react": "off", // Not needed in React 17+
    
    // Accessibility rules
    "jsx-a11y/alt-text": "error",
    "jsx-a11y/aria-props": "error",
    "jsx-a11y/aria-proptypes": "error",
    "jsx-a11y/aria-unsupported-elements": "error",
    "jsx-a11y/role-has-required-aria-props": "error",
    "jsx-a11y/role-supports-aria-props": "error"
  },

  // Custom rule for checking className usage
  overrides: [
    {
      files: ["*.jsx", "*.tsx"],
      rules: {
        // Custom rule to encourage design system usage
        "no-restricted-patterns": "off" // We'll implement this as a custom plugin if needed
      }
    }
  ],

  // Environment and parser settings
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: "latest",
    sourceType: "module"
  },
  settings: {
    react: {
      version: "detect"
    }
  }
};