// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'
import env from './app/lib/env.ts'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: {
    enabled: import.meta.dev,
  },
  modules: ['@nuxt/eslint'],
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
