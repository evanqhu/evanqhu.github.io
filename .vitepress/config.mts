import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "蛋炒饭的前端笔记",
  description: "A VitePress Site",
  srcDir: "./src",
  head: [
    ["link", { rel: "icon", type: "image/svg+xml", href: "/vitepress-logo-mini.svg" }],
    ["link", { rel: "icon", type: "image/png", href: "/vitepress-logo-mini.png" }],
  ],
  cleanUrls: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/vitepress-logo-mini.svg",
    // 顶部导航栏
    nav: [
      { text: "首页", link: "/" },
      {
        text: "系统笔记",
        items: [
          {
            text: "JavaScript",
            items: [{ text: "JavaScript", link: "/javascript/01-javascript-base" }],
          },
          {
            text: "Vue",
            items: [
              { text: "Vue 基础", link: "/vue-base/01-vue-base" },
              { text: "Vue 2", link: "/vue2/01-vue2-base" },
              { text: "Vue 3", link: "/vue3/01-vue3-base" },
            ],
          },
          {
            text: "React",
            items: [{ text: "React", link: "/react/01-react-start" }],
          },
          {
            text: "Node",
            items: [{ text: "Node", link: "/node/01-node-start" }],
          },
          {
            text: "CSS",
            items: [{ text: "CSS", link: "/css/01-animation" }],
          },
        ],
      },
      { text: "Nuxt", link: "/nuxt/introduce" },
      { text: "其它", link: "/others/notes" },
      { text: "组件/算法", link: "/examples" },
      { text: "工程化", link: "/engineering" },
    ],
    // 侧边栏目录
    sidebar: {
      css: {
        base: "/css",
        items: [
          {
            text: "CSS",
            items: [
              { text: "动画", link: "/01-animation" },
              { text: "scss", link: "/02-scss" },
            ],
          },
        ],
      },
      javascript: {
        base: "/javascript",
        items: [
          {
            text: "JavaScript",
            items: [
              { text: "JavaScript 基础", link: "/01-javascript-base" },
              { text: "流程控制", link: "/02-flow-control" },
              { text: "数组 Array", link: "/03-array" },
              { text: "字符串 String", link: "/04-string" },
              { text: "数字 Number", link: "/05-number" },
              { text: "函数 Function", link: "/06-function" },
              { text: "类和对象 Object", link: "/07-object" },
              { text: "日期对象 Date", link: "/08-date" },
              { text: "数学对象 Math", link: "/09-math" },
              { text: "正则 RegExp", link: "/10-regexp" },
              { text: "事件 Event", link: "/11-event" },
              { text: "ES6 新特性", link: "/12-es6" },
              { text: "期约 Promise", link: "/13-promise" },
              { text: "构造函数和原型", link: "/14-prototype" },
              { text: "代理和反射", link: "/15-proxy" },
              { text: "其它", link: "/16-others" },
              { text: "DOM", link: "/17-DOM" },
              { text: "BOM", link: "/18-BOM" },
            ],
          },
        ],
      },
      "vue-base": {
        base: "/vue-base",
        items: [
          {
            text: "Vue 基础",
            items: [
              { text: "初识 Vue", link: "/01-vue-base" },
              { text: "模板语法", link: "/02-template" },
              { text: "数据绑定", link: "/03-data-binding" },
              { text: "el 和 data的两种写法", link: "/04-el-data" },
              { text: "数据代理和数据劫持", link: "/05-data-proxy" },
              { text: "事件处理", link: "/06-event" },
              { text: "计算属性 computed", link: "/07-computed" },
              { text: "监视属性 watch", link: "/08-watch" },
              { text: "绑定样式", link: "/09-style" },
              { text: "条件渲染", link: "/10-conditional-rendering" },
              { text: "列表渲染", link: "/11-list-rendering" },
              { text: "过滤器 filters", link: "/12-filters" },
              { text: "其它指令", link: "/13-others" },
              { text: "自定义指令 directives", link: "/14-directives" },
              { text: "生命周期", link: "/15-life-cycle" },
              { text: "组件", link: "/16-components" },
            ],
          },
        ],
      },
      vue2: {
        base: "/vue2",
        items: [
          {
            text: "Vue 2",
            items: [
              { text: "Vue2 脚手架", link: "/01-vue2-base" },
              { text: "ref 属性", link: "/02-ref-property" },
              { text: "props 配置项", link: "/03-props" },
              { text: "mixins 配置项", link: "/04-mixin" },
              { text: "插件 Plugin", link: "/05-plugin" },
              { text: "scoped 样式", link: "/06-scoped" },
              { text: "TodoList 案例", link: "/07-todo-list" },
              { text: "浏览器存储 WebStorage", link: "/08-web-storage" },
              { text: "自定义事件", link: "/09-custom-event" },
              { text: "全局事件总线", link: "/10-global-event-bus" },
              { text: "消息订阅与发布", link: "/11-pubsub" },
              { text: "nextTick", link: "/12-next-tick" },
              { text: "Vue 动画", link: "/13-animation" },
              { text: "代理服务器", link: "/14-proxy-server" },
              { text: "插槽 Slot", link: "/15-slot" },
              { text: "Vuex 状态管理器", link: "/16-vuex" },
              { text: "路由", link: "/17-router" },
              { text: "权限管理", link: "/18-permission" },
            ],
          },
        ],
      },
      vue3: {
        base: "/vue3",
        items: [
          {
            text: "Vue 3",
            items: [
              { text: "Vue2 简介", link: "/01-vue3-base" },
              { text: "创建 Vue3 工程", link: "/02-vue3-project" },
              { text: "Vue3 核心语法", link: "/03-vue3-grammer" },
              { text: "路由", link: "/04-router" },
              { text: "Pinia", link: "/05-pinia" },
              { text: "组件通信", link: "/06-communication" },
              { text: "其它 API", link: "/07-other-apis" },
              { text: "Vue3 新组件", link: "/08-new-components" },
            ],
          },
        ],
      },
      react: {
        base: "/react",
        items: [
          {
            text: "React",
            items: [
              { text: "React 基础", link: "/01-react-start" },
              { text: "协程", link: "/02-fiber" },
            ],
          },
        ],
      },
      node: {
        base: "/node",
        items: [
          {
            text: "Node",
            items: [
              { text: "Node 基础", link: "/01-node-start" },
              { text: "事件循环", link: "/02-event-loop" },
              { text: "包与包管理器", link: "/03-package" },
              { text: "缓冲器", link: "/04-buffer" },
              { text: "文件系统", link: "/05-file-system" },
              { text: "原生 Node 创建服务器", link: "/06-node-server" },
              { text: "Express 创建服务器", link: "/07-express-server" },
              { text: "HTTP 相关知识", link: "/08-http" },
            ],
          },
        ],
      },
      others: {
        base: "/others",
        items: [
          {
            text: "其他",
            items: [
              { text: "笔记", link: "/notes" },
              { text: "Git", link: "/git" },
              { text: "微信小程序", link: "/wxapp" },
              { text: "浏览器缓存", link: "/browser-cache" },
              { text: "绝对和相对路径", link: "/ap-rp" },
            ],
          },
        ],
      },
      // 代码示例
      examples: {
        base: "/examples",
        items: [
          {
            text: "算法",
            collapsed: false,
            items: [{ text: "深拷贝", link: "/deepclone/" }],
          },
          {
            text: "组件",
            collapsed: false,
            items: [
              { text: "无限瀑布流", link: "/masonary/" },
              { text: "3D 轮播图", link: "/carousel-3d/" },
            ],
          },
        ],
      },
      // 工程化
      engineering: {
        base: "/engineering",
        items: [
          {
            text: "代码规范",
            collapsed: false,
            items: [
              { text: "ESLint", link: "/eslint" },
              { text: "CommitLint", link: "/commitlint" },
              { text: "Vue 风格指南", link: "/vue-style-guide" },
            ],
          },
          {
            text: "其它",
            collapsed: false,
            items: [{ text: "Chrome 调试", link: "/chrome-inspect" }],
          },
        ],
      },
      nuxt: {
        base: "/nuxt",
        items: [
          {
            text: "Nuxt",
            items: [
              { text: "介绍", link: "/introduce" },
              { text: "自定义路由", link: "/custom-route" },
            ],
          },
        ],
      },
    },

    socialLinks: [{ icon: "github", link: "https://github.com/vuejs/vitepress" }],

    outline: {
      label: "页面导航",
    },

    lastUpdated: {
      text: "最后更新于",
      formatOptions: {
        dateStyle: "full",
        timeStyle: "medium",
      },
    },

    search: {
      provider: "local",
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
        },
      },
    },
  },
});
