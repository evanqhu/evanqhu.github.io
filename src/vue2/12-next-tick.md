# nextTick

```this.$nextTick(callback)```

* 功能：在下一次 DOM 更新结束后执行 nextTick 指定的回调函数；
* 当改变数据后，要基于更新后的新 DOM 进行某些操作时，要在 nextTick 所指定的回调函数中执行；
* 原因：Vue 在遇到数据更改时，不会立马解析模板，而是等到所有数据更新完成之后，再统一更新；
* 应用场景：
  * 点击编辑按钮，div 变成 input 框，然后自动获取焦点；
  * 设置当页面渲染完成后再显示某些数据，比如查询多少个好友的时候；

```javascript
// 定义 message 原始值
this.message = '修改后的值'  // 修改 message 的值
// DOM 未更新
console.log(message) // 这里输出的是原始的值，因为 DOM 不会立马更新
this.$nextTick(function() {
  // DOM更新了
  console.log(message) // 这里输出的是修改后的值，这个回调函数在 DOM 更新之后再调用
})

this.$nextTick(function() {
  this.$refs.inputTitle.focus()
})
```
