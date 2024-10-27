// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  ssr: false,
  modules: ['@nuxtjs/google-fonts', '@pinia/nuxt', 'pinia-plugin-persistedstate/nuxt', 'nuxt-viewport', '@vee-validate/nuxt',],
  devServer: {
    host: '0.0.0.0',
  },
  googleFonts: {
    families: {
      Poppins: true,
      Roboto: true,
      Montserrat: true,
    }
  },
  viewport: {
    /* Viewport options */
  },
  runtimeConfig: {
    public: {
      apiBaseURL: process.env.API_BASE_URL, // process.env.APP_NAME,
      appName: process.env.APP_NAME,
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