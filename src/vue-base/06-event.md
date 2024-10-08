# 事件处理

## 事件的基本使用

- 在 HTML 标签中，使用 `v-on:xxx` 或 `@xxx` 绑定事件，其中 xxx 是事件名
- 事件的回调函数需要写在 `methods` 对象中（不能用箭头函数，否则 this 指向就不是 vm 或 vc）
- 事件的回调函数的第一个参数默认会传入**事件对象**，比如点击事件对象
- 事件函数调用传参使用 `$event` 占位，这样就不会丢失默认传入的 event 参数
- 在组件标签中，默认绑定的是自定义事件，如果要使用原生 DOM 事件，需要加 `.native` 修饰符

```javascript
// 如果在调用事件回调时没有传递 $event 参数，事件回调函数则不会收到事件对象
@click = "sayName('Tom')"
sayName(name) { console.log(name) }

// 调用事件回调时使用 $event 占位，事件回调函数会收到事件对象
@click = "showInfo($event, 66)"
// 调用方法 func 括号可加可不加
showInfo(e, num) { console.log(e, num) }
```

## 事件修饰符

```javascript
@click.prevent="func"  // 阻止默认事件 如阻止链接自动跳转
@click.stop= "func"    // 阻止事件冒泡 当内外标签绑定相同事件时，触发内部标签不会同时触发外部标签
@click.once= "func"    // 事件只触发一次
@click.capture= "func" // 使用事件的捕获模式 先外层标签，再内层标签，与冒泡相反
@click.self= "func"    // 当event.target是当前操作元素时才出发操作  仅作用于绑定事件的标签，点击其内部标签无作用
@click.passive= "func" // 事件的默认行为立即执行 无需等待事件的回调函数执行完毕（有可能事件回调执行时间很长）
// 事件修饰符可以连续写
```

## 键盘事件

```javascript
@keydown
@keyup
@keyup.enter.native="login" // enter 键抬起时触发登录
```
