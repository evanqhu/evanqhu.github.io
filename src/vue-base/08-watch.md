# 监视属性 watch

- **当被监视的属性变化时， 回调函数自动调用， 进行相关操作**；
- 监视的属性必须存在，才能进行监视；
- 两种写法：new Vue 时传入 watch 配置项；或者用 `vm.$watch`；
- `immediate: true` 表示初始化时调用一下；
- 配置 `deep: true` 表示深度监视，检测对象内部多层的变化；Vue 中的 watch 默认不监测对象内部值的改变（一层）；
- 当只需要 handler 时，可简写为 handler 函数形式，传入形参 newValue 和 oldValue；**只传一个形参时，就是 newValue**；
- computed 能完成的功能，watch 都可以完成；
- watch 能完成的功能，computed 不一定能完成，例如：watch 可以进行**异步操作**。计算属性 computed 靠的是 return 的返回值来实现功能，无法做到异步生成返回值；而 watch 不依赖返回值，用的是 handler 函数；
- watch 不缓存；

```vue
<script>
  new Vue({
    watch: {
      isHot: {
        immediate: true,  // 初始化时让 handler 调用一下
        deep: true,  // 深度监视
        handler(newValue, oldValue) {
          console.log('isHot被修改了', newValue, oldValue)
        },
      }
    },
    // 简写
    watch: {
      isHot(newValue, oldValue) {
        console.log('isHot被修改了', newValue, oldValue, this)
      }
    },
  })
  
  vm.$watch("firstName", {
    function(val) {
      // 这里必须用箭头函数，因为定时器是 JS 引擎控制的，这个函数不是 Vue 管理的
      setTimeout(() => { this.fullName = val + '-' + this,lastName })
    }
  })
</script>
```
