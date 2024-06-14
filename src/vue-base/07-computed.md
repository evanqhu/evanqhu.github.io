# 计算属性 computed

* `computed` 计算属性应写成对象的形式，**包含 get 和 set 两个方法**；当**读取**计算属性时，get 方法就会被调用，且返回值就作为计算属性的值；当**修改**计算属性时，set 方法就会被调用；
* 计算属性依赖 return 实现功能；
* 计算属性简写：当只读不改时，计算属性可简写为一个函数。

```javascript
new Vue({
  computed: {
    fullName: {
      // 读取计算属性
      // get 在初次读取 fullName 的值和所依赖的数据发生变化时被调用
      get() { return this.firstName + '-' + this.lastName },
      // 修改计算属性
      set(value) {
        const arr = value.split('-')
        this.firstName = arr[0]
        this.lastName = arr[1]
      }
    }
	},
  // 简写（只读不改）
  computed: {
    fullName() { return this.firstName + '-' + this.lastName }
  }
})
```

* 要用的属性不存在，要通过已有的属性计算得来，就使用计算属性；
* 与 methods 实现相比，计算属性内部有**缓存机制 (复用)**，效率更高，调试方便；
* **计算属性最终会出现在 vm 上**，在模板中直接读取使用即可；
* 把计算属性当作一个快照，不要修改计算属性的返回值；
* 被 Vue 管理的函数，最好写成普通函数，这样 this 的指向才是 vm 或 vc；
* 不被 Vue 所管理的函数 (定时器的回调函数、ajax 的回调函数、Promise 的回调函数等)，最好写成箭头函数。

