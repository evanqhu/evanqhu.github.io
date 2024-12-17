import { defineConfig } from "vitepress";

/** 顶部导航栏 */
const nav = [
  { text: "首页", link: "/" },
  {
    text: "JavaScript",
    activeMatch: "/(javascript|typescript)/",
    items: [{ text: "JavaScript", link: "/javascript/01-javascript-base" }],
  },
  {
    text: "Vue",
    activeMatch: "/(vue|nuxt)/",
    items: [
      { text: "Vue", link: "/vue" },
      { text: "Nuxt", link: "/nuxt" },
    ],
  },
  {
    text: "React",
    activeMatch: "/(react|next)/",
    items: [{ text: "React", link: "/react/01-react-start" }],
  },
  {
    text: "Node",
    activeMatch: "/(node)/",
    link: "/node/01-node-start",
  },
  {
    text: "CSS",
    activeMatch: "/(css)/",
    link: "/css/01-animation",
  },
  { text: "工程化", link: "/engineering", activeMatch: "/engineering/" },
  { text: "组件/算法", link: "/examples", activeMatch: "/examples/" },
  { text: "其它", link: "/others", activeMatch: "/others/" },
];

/** 侧边栏目录 */
const sidebar = {
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
  vue: {
    base: "/vue",
    items: [
      { text: "导航", link: "/" },
      { text: "关键知识", link: "/key-notes" },
      {
        text: "系统笔记",
        collapsed: false,
        items: [
          { text: "Vue 基础", link: "/base" },
          { text: "Vue 2", link: "/vue2" },
          { text: "Vue 3", link: "/vue3" },
          { text: "Vuex 状态管理器", link: "/vuex" },
          { text: "Pinia 状态管理器", link: "/pinia" },
          { text: "Vue Router 路由", link: "/vue-router" },
        ],
      },
    ],
  },
  nuxt: {
    base: "/nuxt",
    items: [
      {
        text: "Nuxt",
        items: [{ text: "自定义路由", link: "/custom-route" }],
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
        items: [
          { text: "Chrome 调试", link: "/chrome-inspect" },
          { text: "项目部署", link: "/deployment" },
          { text: "模块化", link: "/modularity" },
          { text: "跨域", link: "/cross-origin" },
        ],
      },
    ],
  },
  // 组件/算法
  examples: {
    base: "/examples",
    items: [
      {
        text: "算法",
        collapsed: false,
        items: [
          { text: "深拷贝", link: "/deepclone/" },
          { text: "贪吃蛇", link: "/snake-game/" },
        ],
      },
      {
        text: "组件",
        collapsed: false,
        items: [
          { text: "组件库推荐", link: "/components" },
          { text: "无限瀑布流", link: "/masonary/" },
          { text: "3D 轮播图", link: "/carousel-3d/" },
          { text: "评分", link: "/stars-rate/" },
          { text: "迷你图", link: "/sparkline/" },
        ],
      },
    ],
  },
  // 其它
  others: {
    base: "/others",
    items: [
      {
        text: "其他",
        collapsed: false,
        items: [
          { text: "笔记", link: "/notes" },
          { text: "Git", link: "/git" },
          { text: "微信小程序", link: "/wxapp" },
          { text: "浏览器缓存", link: "/browser-cache" },
          { text: "绝对和相对路径", link: "/ap-rp" },
          { text: "时间分片", link: "/time-slicing" },
          { text: "React 渲染顺序", link: "/react-render-order" },
          { text: "交叉观察器", link: "/intersection-observer" },
          { text: "区分设备类型", link: "/device-detect" },
          { text: "深度作用选择器", link: "/deep-selector" },
          { text: "自定义 VSCode 快捷键", link: "/vscode-shortcuts" },
          { text: "异步包装组件", link: "/async-wrapper" },
          { text: "自动检测更新", link: "/auto-update" },
        ],
      },
      {
        text: "SSR",
        collapsed: false,
        items: [{ text: "SSR", link: "/ssr" }],
      },
    ],
  },
};

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
    nav: [...nav],
    // 侧边栏目录
    sidebar: { ...sidebar },
    // 大纲级别
    outline: {
      label: "页面导航",
    },
    // 最后更新于
    lastUpdated: {
      text: "最后更新于",
      formatOptions: {
        dateStyle: "full",
        timeStyle: "medium",
      },
    },
    // 搜索
    search: {
      provider: "local",
    },
    socialLinks: [{ icon: "github", link: "https://github.com/evanqhu/evanqhu.github.io" }],
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
  markdown: {
    container: {
      tipLabel: "提示",
      warningLabel: "警告",
      dangerLabel: "危险",
      infoLabel: "信息",
      detailsLabel: "详细信息",
    },
  },
});
