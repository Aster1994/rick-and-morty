import tailwindcss from '@tailwindcss/vite'
import env from './app/lib/env.ts'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: {
    enabled: import.meta.dev,
  },

  modules: ['@nuxt/eslint', '@nuxt/image', '@nuxt/icon', '@nuxt/fonts', '@nuxtjs/seo'],
  css: ['~/assets/css/main.css'],

  typescript: {
    strict: true,
  },

  runtimeConfig: {
    public: {
      apiBaseUrl: env.NUXT_PUBLIC_API_BASE_URL,
    },
  },

  robots: {
    disallow: env.NUXT_PUBLIC_APP_ENV === 'production' ? [] : ['/'],
  },

  image: {
    format: ['webp'],
  },

  icon: {
    customCollections: [
      {
        prefix: 'fig',
        dir: './app/assets/icons',
      },
    ],
    serverBundle: {
      collections: ['lucide'],
    },
  },

  fonts: {
    provider: 'local',
    families: [
      {
        name: 'Rubik',
        src: '/assets/fonts/Rubik/rubik-v31-latin-regular.woff2',
        weight: 400,
        style: 'normal',
        preload: true,
      },
    ],
  },

  site: {
    name: 'Rick & Morty Explorer',
  },

  seo: {
    meta: {
      title: 'Rick & Morty',
      description: 'Explore characters, episodes, and locations from the Rick and Morty universe.',
      robots: env.NUXT_PUBLIC_APP_ENV === 'production' ? 'index, follow' : 'noindex, nofollow',
      themeColor: [{ content: '#B2DF28', media: '(prefers-color-scheme: dark)' }],
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
})
