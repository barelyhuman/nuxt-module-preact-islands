# nuxt-module-preact-islands

Simple nuxt module wrapper around preact-island-plugins

- [✨ &nbsp;Release Notes](/CHANGELOG.md)

<!-- TODO: REMOVE THIS -->
# NOT YET RELEASED!

## Quick Setup

1. Add `nuxt-module-preact-islands` dependency to your project

```bash
# Using pnpm
pnpm add -D nuxt-module-preact-islands
pnpm add preact preact-render-to-string

# Using yarn
yarn add --dev nuxt-module-preact-islands
yarn add preact preact-render-to-string

# Using npm
npm install --save-dev nuxt-module-preact-islands
npm add preact preact-render-to-string
```

2. Add `nuxt-module-preact-islands` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: [
    'nuxt-module-preact-islands'
  ]
})
```

That's it! You can now use nuxt-module-preact-islands in your Nuxt app ✨

## Development

```bash
# Install dependencies
npm install

# Generate type stubs
npm run dev:prepare

# Develop with the playground
npm run dev

# Build the playground
npm run dev:build

# Run ESLint
npm run lint

# Run Vitest
npm run test
npm run test:watch

# Release new version
npm run release
```

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-module-preact-islands/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/nuxt-module-preact-islands

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-module-preact-islands.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/nuxt-module-preact-islands

[license-src]: https://img.shields.io/npm/l/nuxt-module-preact-islands.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/nuxt-module-preact-islands

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
