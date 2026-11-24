// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'
import env from './app/lib/env.ts'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: {
    enabled: import.meta.dev,
  },
  modules: ['@nuxt/eslint', '@nuxt/image', '@nuxt/icon', '@nuxt/fonts'],
  css: ['~/assets/css/main.css'],
  typescript: {
    strict: true,
  },

  runtimeConfig: {
    public: {
      apiBaseUrl: env.NUXT_PUBLIC_API_BASE_URL,
      siteUrl: env.NUXT_PUBLIC_SITE_URL,
    },
  },

  image: {
    format: ['webp'],
  },

  icon: {
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

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Rick & Morty',
      titleTemplate: '%s · Rick & Morty',
      meta: [
        {
          name: 'description',
          content: 'Explore characters, episodes, and locations from the Rick and Morty universe.',
        },
      ],
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
})
