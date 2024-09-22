// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
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
      appName: process.env.APP_NAME,
      apiBaseURL: process.env.API_BASE_URL,
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
