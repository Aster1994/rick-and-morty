# Rick & Morty

A server-rendered character explorer built with Nuxt 4, TypeScript, Tailwind CSS 4, and
the [Rick and Morty API](https://rickandmortyapi.com/documentation).

## Requirements

- Node.js `24.22.3`
- Corepack-enabled pnpm `12.21.0`

## Stack

- Nuxt 4.6.4 / Vue 3
- TypeScript (strict mode)
- Tailwind CSS 4 through `@tailwindcss/vite`
- `@nuxt/icon` (Lucide icon collection)
- `@nuxt/image`
- pnpm
- ESLint + Prettier
- Netlify (Nitro SSR) and Docker

## Getting started

Make sure to install dependencies:

```bash
corepack enable
corepack prepare pnpm@12.21.0 --activate
```

## Development

```bash
# pnpm
pnpm dev
```

## Production

Build the application for production:

```bash
# pnpm
pnpm build
```

Locally preview production build:

```bash
# pnpm
pnpm preview
```

Open `http://localhost:3000`.

## Environment variables

```env
NUXT_PUBLIC_APP_ENV=production
NUXT_PUBLIC_API_BASE_URL=https://rickandmortyapi.com/api

```

No API key is required.

PS:

```
Background and foreground colors do not have a sufficient contrast ratio.
```

This is a Lighthouse report; the issue is caused by the colors defined within the project(#989a9c text color on
#2b3538 ). A
more visible color needs
to be used against this background. Since I had to adhere to the UI design, I didn't change it.