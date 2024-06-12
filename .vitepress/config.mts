import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "蛋炒饭的前端笔记",
  description: "A VitePress Site",
  srcDir: "./src",
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/vitepress-logo-mini.svg' }],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/vitepress-logo-mini.svg',
    nav: [
      { text: '首页', link: '/' },
      { text: 'JavaScript', link: '/javascript/JavaScript基础' },
      { 
        text: 'Vue',
        items: [
          { text: 'Vue 基础', link: '/vue-base/初识Vue' },
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
              { text: 'JavaScript 基础', link: 'JavaScript基础' },
              { text: '流程控制', link: '流程控制' },
              { text: '数组 Array', link: '数组Array' },
              { text: '字符串 String', link: '字符串String' },
              { text: '数字 Number', link: '数字Number' },
              { text: '函数 Function', link: '函数Function' },
              { text: '类和对象 Object', link: '类和对象Object' },
              { text: '日期对象 Date', link: '日期对象Date' },
              { text: '数学对象 Math', link: '数学对象Math' },
              { text: '正则 RegExp', link: '正则RegExp' },
              { text: '事件 Event', link: '事件Event' },
              { text: 'ES6 新特性', link: 'ES6新特性' },
              { text: '期约 Promise', link: '期约Promise' },
              { text: '构造函数和原型', link: '构造函数和原型' },
              { text: '代理和反射', link: '代理和反射' },
              { text: '其它', link: '其它' },
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
              { text: '初识 Vue', link: '初识Vue' },
              { text: '模板语法', link: '模板语法' },
              { text: '数据绑定', link: '数据绑定' },
              { text: 'el 和 data的两种写法', link: 'el和data的两种写法' },
              { text: '数据代理和数据劫持', link: '数据代理和数据劫持' },
              { text: '事件处理', link: '事件处理' },
              { text: '计算属性 computed', link: '计算属性computed' },
              { text: '监视属性 watch', link: '监视属性watch' },
              { text: '绑定样式', link: '绑定样式' },
              { text: '条件渲染', link: '条件渲染' },
              { text: '列表渲染', link: '列表渲染' },
              { text: '过滤器 filters', link: '过滤器filters' },
              { text: '其它指令', link: '其它指令' },
              { text: '自定义指令 directives', link: '自定义指令directives' },
              { text: '生命周期', link: '生命周期' },
              { text: '组件', link: '组件' },
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
