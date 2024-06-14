---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "蛋炒饭的前端笔记"
  text: "基于 VitePress 搭建的前端知识笔记站点"
  tagline: 记录日常学习和工作中的各种笔记
  actions:
    - theme: brand
      text: JavaScript
      link: /javascript/01-javascript-base
    - theme: alt
      text: Vue
      link: /vue-base/01-vue-base
  image:
    src: /vitepress-logo-large.webp
    alt: VitePress

features:
  - icon: 📕
    title: 前端知识库
    details: 记录 HTML、CSS、JavaScript、Vue、React、Axios、Vite、Pinia、Redux、Next、Nuxt 等前端基础笔记
  - icon: 📗
    title: 服务端知识库
    details: 记录 Node、Express、Koa、MongoDB、MySQL、Redis 等服务端基础笔记
  - icon: 📘
    title: 其它笔记
    details: 记录其它技术、工具等内容
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff);

  --vp-home-hero-image-background-image: linear-gradient(-45deg, #bd34fe 50%, #47caff 50%);
  --vp-home-hero-image-filter: blur(44px);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}
</style>

