// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: {
    enabled: true,
  },
  modules: ['@nuxt/eslint'],
  css: ['~/assets/css/main.css'],
  typescript: {
    strict: true,
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
