## 生命周期

<img src="https://s2.loli.net/2024/06/14/aW5xOtHmPKofSNB.png" alt="life-cycle.png" style="zoom: 50%;" /> 

- 生命周期回调函数、生命周期函数、生命周期钩子，是 Vue 在关键时刻帮我们调用的一些特殊名称的函数；生命周期函数中的 this 指向是 vm 或组件实例对象 vc；
- `mounted` Vue 完成模板的解析并把初始的真实 DOM 元素放入页面后（挂载完毕）调用；发送 ajax 请求、启动定时器、绑定自定义事件、订阅消息等**初始化操作**；
- `beforeUpdated` 页面和数据未同步；
- `beforeDestroy` 清除定时器、解绑自定义事件、取消订阅消息等**收尾工作**，对数据的修改不会再更新了；
- 另外还有三个生命周期 `activated`  `deactivated` `nextTick`；
- `vm.$el` 存储着 Vue 解析后的真实 DOM；
- 放在 `mounted` 中的请求有可能导致页面闪动（因为此时页面 DOM 结构已经生成），但如果在页面加载前完成请求，则不会出现此情况。建议对页面内容的改动放在 `created` 生命周期当中。
