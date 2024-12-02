# SSR 服务端渲染

::: info
Vue3：https://cn.vuejs.org/guide/scaling-up/ssr

Vue2：https://v2.ssr.vuejs.org/zh/

Vite：https://cn.vite.dev/guide/ssr.html

Nuxt：https://nuxt.com/docs/guide/concepts/rendering

其他：https://www.builder.io/m/explainers/server-side-rendering
:::

## 概念

### CSR

使用 Vue 开发的 SPA 项目一般都是 CSR（Client Side Rendering）模式，即客户端渲染。客户端接收到的是 HTML 模板和 JavaScript 脚本，在浏览器中运行 JavaScript 脚本，将 HTML 模板渲染成页面内容。

### 传统的 SSR

传统的 SSR 是指在服务器端将 Vue 组件渲染为 HTML 字符串，然后将这些字符串发送到客户端。客户端接收到 HTML 字符串后，将其插入到页面中，并使用 JavaScript 进行交互。

### 同构的 SSR

同构的 SSR 是指在服务器端和客户端都渲染 Vue 组件。服务器端渲染出初始的 HTML 字符串，然后将这些字符串发送到客户端。客户端接收到 HTML 字符串后，浏览器会将其插入到页面中，同时 Vue.js 会接管该文档，曾经在服务端上运行的 JavaScript 代码再次在客户端上运行，然后通过水合（Hydration）过程将 DOM 状态同步到客户端上。当水合完成后，客户端的 Vue.js 应用程序就完全接管了页面的控制权，包括响应用户的交互和更新页面内容。

- 同构：前后端同一套代码
- 首屏内容具备服务端渲染能力，剩余内容走 SPA，更好的用户体验

## 底层实现

### 虚拟 DOM

```html
<ul id="list">
  <li class="item">1</li>
  <li class="item">2</li>
  <li class="item">3</li>
</ul>
```

```jsx
const tree = {
  tag: "ul", // 节点标签名
  props: {
    // DOM 的属性，用一个对象存储键值对
    id: "list",
  },
  children: [
    // 该节点的子节点
    { tag: "li", props: { class: "item" }, children: ["1"] },
    { tag: "li", props: { class: "item" }, children: ["2"] },
    { tag: "li", props: { class: "item" }, children: ["3"] },
  ],
};
```

虚拟 DOM 为组件的跨平台渲染提供了可能，在 Vue 中内置了 `vue-server-renderer` (Vue2) 和 `vue/server-renderer` (Vue3) 库，用于跨平台渲染

该库的功能简单来说就是将 Vue 组件变为字符串，并且通过模板引擎将数据注入到字符串中，最后返回一个完整的 HTML 页面

### 入口文件

- 客户端入口文件 `entry.client.js`
- 服务端入口文件 `entry.server.js`

这两个文件利用 Vue 内置的能力，在服务端初始化一次 Vue 实例

### 保证全局状态双端同步

在服务端初始化之后，拿到全局状态数据，直接塞到客户端即可

### 保证路由双端同步

路由的同步，就需要麻烦一点了，因为理论情况下，当我们请求页面的时候，大家都知道，有前端路由也有后端路由

而我们在初始化的过程中，前端路由是不生效的，因为我们需要页面在后端直出，于是我们就需要，在后端获取路由

根据当前的 path 来查找具体的路由，然后根据路由得到具体的组件，然后将组件直出。

### 客户端将页面激活实现交互

在客户端之所以能实现交互，原理很简单，我们在服务端跑的代码在客户端跑一遍就行了，只是将 dom 挂载这一块不执行即可
