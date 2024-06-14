# 消息订阅与发布 pubsub

- 功能：一种组件间通信的方式，**适用于任意组件间通信**，和全局事件总线类似；

- 使用步骤：

   - 安装 pubsub：```npm i pubsub-js```

   - 引入：```import pubsub from 'pubsub-js'``` 哪个组件需要订阅或发布消息，就在哪个组件引入，实质上是一个对象，身上有一些方法。

- 接收数据：A组件想接收数据，则在A组件中订阅消息，订阅的回调留在A组件自身；
- 发送数据：```pubsub.publish('xxx', 数据)``` ；
- 最好在 `beforeDestroy` 钩子中，用 ```pubSub.unsubscribe(pid)``` 去取消订阅。

```js
import pubsub from 'pubsub-js'

/******************** 订阅消息（接收数据） ********************/
methods(){ callback(形参) { } },
mounted() {
  this.pid = pubsub.subscribe('msgName', (msgName, 形参) => { })  // 订阅消息，生成一个ID
},
beforeDestroy() {
  pubsub.unsubscribe(this.pid) // 取消订阅
}

/******************** 发布消息（发送数据） ********************/
methods: {
  sendStudentName() {
    pubsub.publish('msgName', 实参)
  }
}
```
