// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  ssr: false,
  modules: ['@nuxtjs/google-fonts', '@pinia/nuxt', 'pinia-plugin-persistedstate/nuxt'],
  devServer: {
    host: '0.0.0.0',
  },
  googleFonts: {
    families: {
      'Poppins': true,
    }
  },
  runtimeConfig: {
    public: {
      apiBaseURL: 'http://127.0.0.1:8000/api', // process.env.APP_NAME,
      appName: process.env.API_BASE_URL,
    },
  },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
