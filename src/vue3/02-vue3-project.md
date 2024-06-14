# 创建 Vue 3 工程

## 基于 create-vue 创建
官网：[create-vue](https://github.com/vuejs/create-vue) 默认打包工具为 Vite

```powershell
## 执行创建命令
pnpm create vue@latest
```

## 基于 Vite 创建
`Vite` 是新一代前端构建工具，官网地址：[https://cn.vitejs.dev/guide/](https://cn.vitejs.dev/guide/)，`Vite`的优势如下：

- 轻量快速的热重载（`HMR`），能实现极速的服务启动。
- 对 `TypeScript`、`JSX`、`CSS` 等支持开箱即用。
- 真正的按需编译，不再等待整个应用编译完成。
- `webpack` 构建与 `Vite `构建对比图如下：

<img src="https://s2.loli.net/2024/06/14/eL3q9ouaZmOgWC2.png" alt="bundle-based-dev-server.png" style="zoom:25%;" /> 

<img src="https://s2.loli.net/2024/06/14/lXF2cS6dLskuDEz.png" alt="esm-based-dev-server.png" style="zoom:25%;" /> 

* 具体操作如下（点击查看[官方文档](https://cn.vuejs.org/guide/quick-start.html)）

```powershell
## 执行创建命令
pnpm create vite
```
自己动手编写一个App组件

```vue
<template>
  <div class="app">
    <h1>你好啊！</h1>
  </div>
</template>

<script lang="ts">
  export default {
    name:'App' // 组件名
  }
</script>

<style></style>
```

安装官方推荐的 `VSCode` 插件：Vue-Official

## 一个简单的效果

`Vue3` 向下兼容 `Vue2` 语法，且 `Vue3` 中的模板中可以没有根标签

```vue
<template>
  <div class="person">
    <h2>姓名：{{ name }}</h2>
    <h2>年龄：{{ age }}</h2>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">年龄+1</button>
    <button @click="showTel">点我查看联系方式</button>
  </div>
</template>

<script lang="ts">
  export default {
    name:'App',
    data() {
      return {
        name: '张三',
        age: 18,
        tel: '13888888888'
      }
    },
    methods: {
      changeName() {
        this.name = 'zhang-san'
      },
      changeAge() {
        this.age += 1
      },
      showTel() {
        alert(this.tel)
      }
    },
  }
</script>
```
