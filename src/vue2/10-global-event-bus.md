# 全局事件总线 GlobalEventBus

`Vue.prototype.$bus = this`

- 功能：一种组件间通信的方式，**适用于任意组件间通信**；
- 是组件自定义事件的一种高级实现方式，没有把事件绑定给某个具体的组件，而是绑定在 vm 上，实现共享；
- 安装全局事件总线：在 `main.js` 里面，创建 vm 实例的时候 `Vue.prototype.$bus = this`
- 使用事件总线：

  * 接收数据（绑定事件）：A组件接收数据，在A组件中给 `$bus` 绑定自定义事件，事件的回调留在A组件自身
  * 发送数据（触发事件）：B组件触发事件 ```this.$bus.$emit('eventName', params)```
  
- 最好在 `beforeDestroy` 钩子中，用 `$off` 解绑当前组件所用到的事件。

```javascript
/******************** 安装全局事件总线（main.js） ********************/
new Vue({
  beforeCreate() {  // 必须写在这个生命周期中
		Vue.prototype.$bus = this // 安装全局事件总线，这里的 this 就是 vm
  },
}) 

/******************** 组件中使用事件总线 ********************/
// A组件，接收数据
mounted() {
  this.$bus.$on('eventName', (形参) => { })  // 绑定事件
},
beforeDestroy() {
  this.$bus.$off('eventName')  // 解绑事件
}
// B组件，发送数据
methods: {
  function() { this.$bus.$emit('eventName', 实参) }  // 触发事件
}
```
