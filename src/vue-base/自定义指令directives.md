# 自定义指令 directives

`bind` `inserted` `update`

自定义指令可以**简写成函数形式**，完整形式要写成对象（可用于权限控制）

* 第一个形参是真实的 **DOM 元素** `<span></span>`
* 第二个形参是绑定的元素对象，我们需要用到其 value 值 `binding.value = n`

* 定义一个 v-big 指令，和 v-text 功能类似，但会把绑定的数值放大 10 倍
* 定义一个 v-fbind 指令，和 v-bind 功能类似，但可以让其所绑定的 input 元素默认获取焦点
* 如果想在不同的时机调用不同的函数，就要写成对象式

```vue
<h2> 放大10倍后的 n 值是：<span v-big="n"></span> </h2>
<input type="text" v-fbind:value="n">

<script>
  // 定义全局指令(对象式)
  Vue.directive('fbind', {
    bind(element, binding){  // 指令与元素成功绑定时（一上来）被调用
      element.value = binding.value
    },
    inserted(element, binding){  // 指令所在元素被插入页面时被调用
      element.focus()
    },
    update(element, binding){  // 指令所在的模板被重新解析时被调用
      element.value = binding.value
    }
  })
  new Vue({
    // 定义局部指令(函数式简写)
    directives: {
    	big(element, binding) { // 第一个形参：真实 DOM 元素；第二个形参：绑定元素对象
      	element.innerText = binding.value * 10  // 原生 DOM 操作
    	},
  	}
  })
</script>
```
