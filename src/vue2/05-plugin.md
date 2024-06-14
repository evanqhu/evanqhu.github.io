# 插件

- 功能：插件是用于增强 Vue 功能的，本质是包含 `install` 方法的一个对象，**该方法的第一个参数是 Vue 构造函数，第二个以后的参数是插件使用者传递的数据**。插件通常用来为 Vue 添加**全局功能**；
- 插件比混入功能更加强大，因为插件传入了 Vue 构造函数作为参数，插件中可以包含混入。

```javascript
// 1.定义插件：在一个新的 plugin.js 文件中写
Object.install = function (Vue, 形参) {
  // 添加全局过滤器
  Vue.filter('filterName', function() { } )
  // 添加全局指令
  Vue.directive(....)
  // 添加全局混入
  Vue.mixin(....)
  // 添加方法或属性（加在 Vue 原型对象上了，vm 和 vc 都可使用）
  Vue.prototype.$myMethod = function () { ... }
  Vue.prototype.$myProperty = xxxx
}
  
// 简写，更常用的写法 plugin.js
export default {
  install(Vue, 形参) { }
}
    
// 2.引入插件【main.js】
import plugins from './plugins'
  
// 3.应用插件（全局可用）
Vue.use(plugins, 实参)
```
