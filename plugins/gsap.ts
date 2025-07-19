import { defineNuxtPlugin } from '#app';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default defineNuxtPlugin((nuxtApp) => {
  // 注册 ScrollTrigger 插件
  gsap.registerPlugin(ScrollTrigger);

  if (typeof window !== 'undefined') {
    (window as any).addEventListener('resize', ScrollTrigger.refresh);
    nuxtApp.hook('page:start', () => ScrollTrigger.refresh());
    
    // 仅在浏览器端注入
    nuxtApp.provide('gsap', gsap);
    nuxtApp.provide('ScrollTrigger', ScrollTrigger);
  } else {
    // 服务端注入空对象避免报错
    nuxtApp.provide('ScrollTrigger', {});
  }
});