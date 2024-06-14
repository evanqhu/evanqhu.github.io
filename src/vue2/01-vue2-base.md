# Vue 脚手架

CLI Command Line Interface 命令行接口工具

## Vue 脚手架基础

```c
│─ node_modules                  // 项目依赖包
│─ public                        // 静态资源
│  │─ favicon.ico
│  └─ index.html
│─ src
│  │─ api                       // 关于 ajax 请求
│  │  │─ index.js
│  │  └─ request.js
│  │─ assets                    // 多个组件共用的静态资源（主题、字体）
│  │  └─ logo.png
│  │─ components                // 非路由组件(全局组件)
│  │  └─ Header
│  │     │─ index.vue
│  │     └─ images
│  │─ directive                 // 全局指令
│  │─ filters                   // 全局 filter
│  │─ icons                     // 项目所有 svg icons
│  │─ lang                      // 国际化 language
│  │─ mock                      // 项目 mock 模拟数据
│  │─ pages                     // 路由组件
│  │─ router                    // 路由配置文件（重写 axios）
│  │─ store                     // Vuex 插件，状态管理库
│  │─ styles                    // 全局样式
│  │─ App.vue                   // 入口页面，唯一的根组件
│  │─ main.js                   // 程序入口文件
│  │─ permission.js             // 权限管理
│─ .gitignore                    // git 版本管制忽略的配置
│─ babel.config.js               // babel 的配置文件(语法翻译官)
│─ package.json                  // 应用包配置文件(项目身份证，记录项目信息)
│─ package-lock.json             // 包版本控制文件
│─ vue.config.js                 // Vue 脚手架的配置文件
└─ jsconfig.json                 // src 文件夹配置别名
```

## 关于不同版本的 Vue

- vue.js 与 vue.runtime.xxx.js 的区别：
    - vue.js 是完整版的 Vue，包含：核心功能 + 模板解析器；
    - vue.runtime.xxx.js 是运行版的 Vue，只包含：核心功能；没有模板解析器。
- 因为 vue.runtime.xxx.js 没有模板解析器，所以不能使用 template 这个配置项，需要使用 render 函数接收到的 createElement 函数去指定具体内容
- 模板解析器仅在开发时使用，webpack 打包后就不需要了

## vue.config.js 配置文件

- 使用 `vue inspect > output.js` 可以查看到 Vue 脚手架的**默认配置**，比如 webpack 的那些配置。关于 webpack 的配置默认是隐藏的，如果要修改，使用 `vue.config.js`，修改后的配置会覆盖默认的配置；
- 使用 `vue.config.js` 可以对脚手架进行个性化定制，详情见：https://cli.vuejs.org/zh

```javascript
// vue.config.js 文件
const { defineConfig } = require('@vue/cli-service')  // CommonJS 模块化语法
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, // 关闭语法检查
  pages: {
  	index: { entry: './src/main.js' }, // 入口文件
	}
})

// 也可直接写成
module.exports = {
  lintOnSave: false
}
```

## 操作流程

`-g` 是全局安装，会安装在 C 盘的某个位置；不加 -g 就是本地安装，安装在 node_modules 文件夹中

* 安装 Node.js
* 安装 Vue `npm install vue -g` 查看 Vue 版本 `npm list vue -g`
* 安装 Vue 脚手架 `npm install @vue/cli -g` 查看 Vue 脚手架版本 `vue -V`
* 安装 webpack `npm install webpack -g` 查看 webpack 版本 `webpack -v`
* 初始化脚手架 `vue create app` 创建工程
* 运行项目 `npm run serve`
* 浏览器不识别 less 样式，需要处理 `npm install less less-loader` `lang="less"`
* 安装 vue-router `npm install vue-router`
* 安装 axios `npm install axios`

## 其他

* 配置镜像 `npm config set registry http...`
* `index.html` 中 `<%= BASE_URL %>` 表示 public 文件夹；
* `<noscript>` 当浏览器不支持 JS 时 noscript 中的元素就会被渲染；
* `render` 配置项是用来代替 `template` 的，使用运行时 Vue 的时候无法使用 template
* render 是 Vue 帮忙调用的函数，接受的参数为一个函数 createElement

```javascript
render(createElement) {
  return createElement('h1', '你好')
}

// 精简
render: h => h(App)  // h 函数的第一个参数是 HTML 元素或组件，第二个参数是内容，组件不需要内容
```
