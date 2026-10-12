import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'

/**
 * Flat config. `eslint-config-next` v16 ships flat configs directly, so no
 * FlatCompat shim is needed.
 *
 * Run with: pnpm lint
 */
const config = [
  {
    ignores: ['.next/**', 'node_modules/**', '.vercel/**', 'next-env.d.ts'],
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    rules: {
      // Raw <img> bypasses the optimiser that cut the carousel from 9.1 MB to
      // 532 KB. Treat a regression here as a build-breaking mistake.
      '@next/next/no-img-element': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      // No stray debug logging in shipped code; error/warn are still allowed.
      'no-console': ['warn', { allow: ['error', 'warn'] }],
    },
  },
]

export default config