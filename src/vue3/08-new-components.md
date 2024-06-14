# Vue3 新组件

## 传送门 Teleport

Teleport 是一种能够将我们的**组件 html 结构**移动到指定位置的技术

to 后面可以写选择器

```vue
<teleport to='body' >
  <div class="modal" v-show="isShow">
    <h2>我是一个弹窗</h2>
    <p>我是弹窗中的一些内容</p>
    <button @click="isShow = false">关闭弹窗</button>
  </div>
</teleport>
```

## 异步组件 Suspense

等待异步组件时渲染一些额外内容，让应用有更好的用户体验 

父组件

```vue
<!-- 父组件 -->
<template>
	<div>我是 App 组件</div>

	<!-- 使用 Suspence 包裹异步组件 -->
  <Suspence>
    <!-- 1. 默认槽位 -->
  	<template v-slot:default> <!-- <template> 默认槽位 -->
			<Child />
		</template>
		<!-- 2. 加载中槽位 -->
		<template v-slot:fallback> <!-- <template #fallback> 加载中槽位 -->
      <h3>加载中.......</h3>
    </template>
  </Suspence>
</template>

<script>
  import { Suspense } from "vue";
  import Child from "./Child.vue";
</script>
```

子组件

```vue
<!-- 子组件 -->
<template>
  <div>我是 Child 组件</div>
</template>

<script setup>
  import axios from "axios";
  
  // 由于这里使用了 await，外层的 setup 函数就变成了 async 异步的
  // 使用这个子组件的时候就要使用 Suspence 包裹
  const { data: { content } } = await axios.get("url");
</script>
```

## 全局 API 转移到应用对象

- `app.component` 注册全局组件
- `app.config` 全局配置对象
- `app.directive` 注册全局指令
- `app.mount` 挂载
- `app.unmount` 卸载
- `app.use` 使用插件

## 其他

- 过渡类名 `v-enter` 修改为 `v-enter-from`、过渡类名 `v-leave` 修改为 `v-leave-from`。


- `keyCode` 作为 `v-on` 修饰符的支持。

- `v-model` 指令在组件上的使用已经被重新设计，替换掉了 `v-bind.sync。`

- `v-if` 和 `v-for` 在同一个元素身上使用时的优先级发生了变化。

- 移除了`$on`、`$off` 和 `$once` 实例方法。

- 移除了过滤器 `filter`。

- 移除了`$children` 实例 `propert`。

  ......
