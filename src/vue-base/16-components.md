# 组件

组件：实现应用中局部功能代码和资源的集合，在 Vue 中组件的本质是一个 VueComponent 构造函数，在书写组件标签时，Vue 会帮我们调用该构造函数，生成一个组件实例对象 vc，每个 vc 就是一个组件。

## 非单文件组件

<img src="https://s2.loli.net/2024/06/14/mxi7fZKS5RuwUVe.png" alt="components.png" style="zoom:50%;" /> 


* 什么是组件：**实现应用中局部功能代码和资源的集合**；组件就是把图形、非图形的各种逻辑均抽象为一个统一的概念（组件）来实现开发的模式，在 Vue 中每一个 `.vue` 文件都可以视为一个组件；
* 组件化的优点：复用代码，简化项目编码，提高效率；
* **Vue 中的组件本质是一个构造函数；**

**01 定义（创建）组件**

- `Vue.extend({ options })` 创建一个**构造函数**（options 对象表示配置项，如 data、methods、template 等，和 new Vue 时传入的配置项几乎相同）；
- 不写 el ，最后由一个 vm 统一管理并挂载；data 写成函数，避免组件复用时数据间引用关系；
- 利用 template 配置项创建内容，里面用模板字符串插入 HTML 结构；
- 可以简写为 `const school = { options }` ；**Vue.extend 可省略**；
- name 属性用于定义在开发者工具中的名称，给程序员看的。

**02 注册组件**

- 全局注册 `Vue.component('组件名', 定义的组件对象)`
- 局部注册 `new Vue({ components: { 组件名: 定义的组件对象 } })`
- 注意：注册组件时的组件名是应用在**使用组件**时，不是显示在开发者工具中的，是给代码看的；但如果定义组件时没有传入 name 配置项，那么开发者工具中展示的就是现在这个组件名

**03 使用组件**

- 编写组件标签（注册组件时的组件名）即可，如 `<student></student>`；在脚手架环境中使用自闭和标签即可。

```html
<!-- 第三步：使用组件 -->
<hello></hello>

<!-- 第一步：创建hello组件 -->
<script>
  const hello = Vue.extend({
    name: 'hello',
    template: `<div><h2>你好啊！{{ name }}</h2></div>`,
    data() {
      return { name: 'Tom' }
    }
  })
  
  // 第二步：全局注册组件
  Vue.component('hello', hello)  // 前面一个hello是注册时的组件名，用它来写组件标签
  new Vue({
    ...,
    components:{ helle: hello },  // 局部注册
  })
</script>
```

**组件名写法建议**

* 一个单词：建议首字母大写，与开发者工具呼应；
* 多个单词：建议 CamelCase 写法，每个单词首字母大写 MySchool（仅限脚手架中使用）；
* 可以使用 name 配置项指定组件在开发者工具中呈现的名字；如果不用 name 配置项，则开发者工具中展示的是组件注册时的名字；
* 单文件组件中组件文件名建议与组件名一致。

## VueComponent

`const hello = Vue.extend({ })`

* hello 组件本质上是一个名为 VueComponent 的 `构造函数`，且不是程序员定义的，是 Vue.extend 生成的；
* 我们只需要写 `<hello/>`，Vue 解析时会帮我们创建 hello 组件的实例对象，即 Vue 帮我们执行的：`new VueComponent(options)`;
* 每次调用 Vue.extend，返回的都是一个全新的 VueComponent；
* Vue 的实例对象，简称 vm；VueComponent 的实例对象，简称 vc（组件实例对象）；
* **组件配置中**，data 函数、methods 中的函数、watch 中的函数、computed 中的函数 它们的 this 均是【VueComponent实例对象 vc】；
* **new Vue(options) 配置中**，data 函数、methods 中的函数、watch 中的函数、computed 中的函数 它们的 this 均是【Vue 实例对象 vm】

<img src="https://s2.loli.net/2024/06/14/h9qCBil8LDUxSZ6.png" alt="Vue-VueComponent.png" style="zoom: 67%;" /> 


> `Vue.prototype === VueComponent.prototype.__proto__`
>
> 让组件实例对象（vc）可以访问到 Vue原型上的属性、方法（$mount 等）

* `const d = new Demo()`
* 构造函数 `Demo` 具有 `prototype` 属性，指向自己的原型对象；（显式原型属性）
* `Demo` 的实例对象 `d` 具有 `__proto__` 属性，指向自己的原型对象；（隐式原型属性）
* `Demo.prototype == d.__proto__`

## 单文件组件

**在 index.html 里面只写了一个 id 为 app 的容器**

```javascript
// main.js 程序入口文件
import Vue from 'vue'  // 引入 Vue（使用 ES6 的模块化语法替代了在 HTML 的 src 属性中引入 vue）
import App from './App.vue'  // 引入根组件

new Vue({  // 创建 vm
  // template: `<App></App>`,  // 相当于在容器里面写 <App></App>
  // components: { App },  // 注册根组件
  render: h => h(App),  // 使用 render 代替以上两行，即将 App 组件渲染到 HTML 结构中
}).$mount('#app')  // 挂载到容器中（指明挂载的容器）
```

```vue
<!-- 根组件 App.vue -->
<template>
  <div>
    <School></School>  <!-- 使用组件 -->
    <Student></Student>
  </div>
</template>

<script>
  import School from "./School.vue";  // 引入组件
  import Student from "./Student.vue";

  export default {  // 这里实际上调用了 Vue.extend，生成了根组件实例 vc
    name: "App",  // 根组件
    components: { School, Student },  // 注册组件
  };
</script>
```
