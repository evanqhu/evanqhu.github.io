# 初识 Vue

Vue.js（简称 Vue）是一个用于构建用户界面的渐进式 JavaScript 框架。Vue 的设计核心是通过简洁的 API 和高效的响应式数据绑定，帮助开发者更容易地创建现代化的前端应用。

- 想让 Vue 工作，就必须创建一个 **Vue 实例（ViewModel，vm）**，且要传入一个配置对象；
- root 容器里的代码依然符合 HTML 规范，只不过混入了一些特殊的 Vue 语法；
- root 容器里的代码被称为 **Vue 模板**；
- Vue 实例和容器是一一对应的；
- 真实开发中只有一个 Vue 实例，并且会配合着组件 (Vue Components，vc) 一起使用；
- `{{ xxx }}` 中的 xxx 要写 **JS 表达式**，且 xxx 可以自动读取到 data 中的所有属性；
- 一旦 data 中的数据发生改变，那么页面中用到该数据的地方也会自动更新。

```javascript
// Vue 实例和 Vue 组件中常用的配置项（vm 和 vc 共有的）
// main.js 里面 new Vue 生成的叫做 vm；其他 .vue 文件中 export default 的都是 vc
new Vue ({
  // 1.数据
  data() { },  // 可简写为对象形式，但不推荐
  computed: { },  // 计算属性
  watch: { },  // 监视属性
  methods: { },  // 方法（函数）
  props: { },  // 接收父组件和路由传来的数据
  // 2.DOM
  el: '#app',  // 仅用于 new Vue 的 vm 中
  template: '<App/>',  // 一个字符串模板作为 Vue 实例的标识
  render: h => h(App),  // 字符串模板的替代方案
  renderError: { },  // 渲染失败时的输出
  // 3.生命周期钩子（回调函数，有省略）
  beforeCreate() { },
  created() { },  // 出现 $
  beforeMount() { },
  mounted() { },  // 出现 $el
  beforeUpdate() { },
  updated() { },
  activated() { },  // 当使用 keep-alive 缓存组件时会出现
  deactivated() { },  // 当使用 keep-alive 缓存组件时会出现
  beforeDestroy() { },
  destroyed() { },
  // 4.资源
  components: { },  // 组件
  directives: { },  // 指令
  filters: { },  // 过滤器
  mixins: { },   // 混合、混入
  // 5.其他
  name: '',  // 用在组件 vc 身上
  store: store,  // 当使用 Vue.use(Vuex) 后，就可以传入 store 配置项（vm 身上）
  router: router,  // 当使用 Vue.use(VueRouter) 后，就可以传入 router 配置项（vm 身上）
  beforeRouteEnter,  // 组件内守卫（进入守卫），vc 身上
  beforeRouteLeave,  // 组件内守卫（离开守卫），vc 身上
})
```
