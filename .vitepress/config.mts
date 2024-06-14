import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "蛋炒饭的前端笔记",
  description: "A VitePress Site",
  srcDir: "./src",
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/vitepress-logo-mini.svg' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/vitepress-logo-mini.png' }]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/vitepress-logo-mini.svg',
    nav: [
      { text: '首页', link: '/' },
      { text: 'JavaScript', link: '/javascript/01-javascript-base' },
      { 
        text: 'Vue',
        items: [
          { text: 'Vue 基础', link: '/vue-base/01-vue-base' },
          { text: 'Vue 2', link: '/vue2/Vue2' },
          { text: 'Vue 3', link: '/vue3/Vue3' },
        ]
      },
    ],

    sidebar: {
      '/javascript/': {
        base: '/javascript/',
        items: [
          {
            text: 'JavaScript',
            items: [
              { text: 'JavaScript 基础', link: '01-javascript-base' },
              { text: '流程控制', link: '02-flow-control' },
              { text: '数组 Array', link: '03-array' },
              { text: '字符串 String', link: '04-string' },
              { text: '数字 Number', link: '05-number' },
              { text: '函数 Function', link: '06-function' },
              { text: '类和对象 Object', link: '07-object' },
              { text: '日期对象 Date', link: '08-date' },
              { text: '数学对象 Math', link: '09-math' },
              { text: '正则 RegExp', link: '10-regexp' },
              { text: '事件 Event', link: '11-event' },
              { text: 'ES6 新特性', link: '12-es6' },
              { text: '期约 Promise', link: '13-promise' },
              { text: '构造函数和原型', link: '14-prototype' },
              { text: '代理和反射', link: '15-proxy' },
              { text: '其它', link: '16-others' },
            ]
          }
        ]
      },
      '/vue-base/': {
        base: '/vue-base/',
        items: [
          {
            text: 'Vue 基础',
            items: [
              { text: '初识 Vue', link: '01-vue-base' },
              { text: '模板语法', link: '02-template' },
              { text: '数据绑定', link: '03-data-binding' },
              { text: 'el 和 data的两种写法', link: '04-el-data' },
              { text: '数据代理和数据劫持', link: '05-data-proxy' },
              { text: '事件处理', link: '06-event' },
              { text: '计算属性 computed', link: '07-computed' },
              { text: '监视属性 watch', link: '08-watch' },
              { text: '绑定样式', link: '09-style' },
              { text: '条件渲染', link: '10-conditional-rendering' },
              { text: '列表渲染', link: '11-list-rendering' },
              { text: '过滤器 filters', link: '12-filters' },
              { text: '其它指令', link: '13-others' },
              { text: '自定义指令 directives', link: '14-directives' },
              { text: '生命周期', link: '15-life-cycle' },
              { text: '组件', link: '16-components' },
            ]
          }
        ]
      },
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],

    outline: {
      label: '页面导航'
    },
  }
})
