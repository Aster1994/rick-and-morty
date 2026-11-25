# Rick & Morty

A server-rendered character explorer built with Nuxt 4, TypeScript, Tailwind CSS 4, and
the [Rick and Morty API](https://rickandmortyapi.com/documentation).

## Requirements

- Node.js `24.22.1`
- Corepack-enabled pnpm `12.21.0`

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
