// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  plugins: ['~/plugins/gsap.ts'],
  modules: ['@nuxt/scripts', '@nuxt/image'],
  css: [
    '~/assets/styles/normalize.css',
    '~/assets/styles/common.css'
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @use "~/assets/styles/theme/_theme.scss" as *;
          @use "~/assets/styles/_variables.scss" as *;
          `
        }
      }
    }
  }
})