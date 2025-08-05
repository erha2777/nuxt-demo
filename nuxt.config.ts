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
  },
  postcss: {
    plugins:{
       "postcss-px-to-viewport-8-plugin": {
        unitToConvert: "px",   // 需转换的单位（默认px）
        viewportWidth: 1920,   // 设计稿视口宽度（PC端常用1920，移动端375）
        unitPrecision: 5,      // 转换后精度（小数位数）
        propList: ["*"],       // 需转换的属性列表（*表示全部）
        viewportUnit: "vw",    // 目标单位
        fontViewportUnit: "vw",// 字体单位
        selectorBlackList: [".ignore"], // 忽略的选择器（保留px）
        minPixelValue: 1,      // 最小转换值（≥1px才转换）
        mediaQuery: false,     // 是否转换媒体查询中的px
        replace: false,         // 直接替换属性值, false 可以看到转换之前的px大小，方便调试
        exclude: [/node_modules/], // 排除文件/文件夹
        include: [/\/layouts\//,/\/components\//,/\/pages\//],  // 仅匹配文件转换
        landscape: false,      // 是否处理横屏模式
      },
    }
  }
})