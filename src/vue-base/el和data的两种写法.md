# el 与 data 的两种写法

## el 的写法

```javascript
// 方法1
new Vue({
  el: '#root',  // new Vue 时配置 el 属性
  ...
})

// 方法2
const vm = new Vue({ ... })
vm.$mount('#root')  // 创建 Vue 实例 vm，使用 vm.$mount('#root')，这是 Vue 原型身上的方法
```

## data 的写法

组件中的 data 必须写成函数式，定义组件时会通过 `Vue.extend()` 生成组件实例，每次都返回一个全新的 VueComponent ；**如果采用对象的方式，一个组件在复用的时候，data 都指向同一个对象地址，改变一处会影响其他处**；而采用函数返回的对象地址是不同的，不会产生污染。

```javascript
new Vue ({
  // 对象式，vue3 中已被废弃
  data: {
  	name: '尚硅谷'
	},

  // 函数式（推荐使用）
  data: function() { return { name: '尚硅谷' } },
  // 简写
  data() { }
})

```

由 Vue 管理的函数，一定不要写箭头函数，一旦写了箭头函数，this 就不再是 Vue 实例了
