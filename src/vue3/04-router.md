# 路由

## 对路由的理解

前端路由：路径与页面组件的对应关系

路由器 (插件)

## 基本切换效果

`Vue3` 中要使用 `vue-router` 的最新版本，目前是 `4` 版本

路由配置文件代码如下：

```js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import News from '@/pages/News.vue'
import About from '@/pages/About.vue'

/** 创建路由器 */
const router = createRouter({
  // 1. 路由模式
	history: createWebHistory(),
  // 2. 路由规则
	routes: [
		{ path: '/home', component: Home },
		{ path: '/about', component: About },
	],
})

export default router
```

注册路由器

```js
// main.ts
import router from './router/index'

app.use(router)
app.mount('#app')

// 建议写成异步
app.use(router)

router.isReady().then(() => {
  app.mount("#app")
})
```

使用路由器

```vue
<!-- App.vue -->
<template>
  <div class="app">
    <h2 class="title">Vue 路由测试</h2>
    <!-- 导航区 -->
    <div class="navigate">
      <RouterLink to="/home" active-class="active">首页</RouterLink>
      <RouterLink to="/news" active-class="active">新闻</RouterLink>
      <RouterLink to="/about" active-class="active">关于</RouterLink>
    </div>
    <!-- 展示区 -->
    <div class="main-content">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script lang="ts" setup name="App">
  import { RouterLink, RouterView } from 'vue-router'  
</script>
```

## 两个注意点

路由组件通常存放在 `pages`  或  `views` 文件夹，一般组件通常存放在 `components` 文件夹

通过点击导航，视觉效果上“消失”了的路由组件，默认是被**卸载**掉的，需要的时候再去**挂载**

## 路由器工作模式

1️⃣ `history` 模式

优点：路径更加美观，不带有 `#`，更接近传统的网站路径

缺点：后期项目上线，需要服务端配合处理路径问题，否则刷新会有 `404` 错误

```js
import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
	history: createWebHistory(), // history模式
	routes
})
```

2️⃣ `hash` 模式

优点：兼容性更好，因为不需要服务器端处理路径

缺点：路径带有 `#` 不太美观，且在 SEO 优化方面相对较差

```js
import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
	history: createWebHashHistory(), // hash模式
	routes
})
```

## 的两种写法

```vue
<!-- 第一种：to 的字符串写法 (直接写完整的路径) -->
<router-link active-class="active" to="/home">主页</router-link>

<!-- 第二种：to 的对象写法 -->
<router-link active-class="active" :to="{ path: '/home' }">Home</router-link>
```

## 命名路由

给路由规则命名，添加 `name` 属性，可以简化路由跳转及传参

```js
const routes: [
  { name: 'zhuye', path: '/home', component: Home },
  { name: 'xinwen', path: '/news', component: News },
  { name: 'guanyu', path: '/about', component: About }
]
```

跳转路由

```vue
<!--简化前：需要写完整的路径（to 的字符串写法） -->
<router-link to="/news/detail">跳转</router-link>

<!--简化后：直接通过名字跳转（to 的对象写法配合 name 属性） -->
<router-link :to="{ name: 'guanyu' }">跳转</router-link>
```

## 嵌套路由

编写 `News` 的子路由：`Detail.vue`

配置路由规则，使用 `children` 配置项

```ts
const router = createRouter({
  history:createWebHistory(),
	routes:[
		{ name: 'zhuye', path: '/home', component: Home },
		{
			name: 'xinwen',
			path: '/news',
			component: News,
			children: [
				{
					name: 'xiang',
					path: 'detail',
					component: Detail
				}
			]
		},
		{ name: 'guanyu', path: '/about', component: About }
	]
})

export default router
```

跳转路由（记得要加完整路径）

```vue
<router-link to="/news/detail">xxxx</router-link>
<!-- 或 -->
<router-link :to="{ path: '/news/detail' }">xxxx</router-link>
```



```vue
<!-- News.vue -->
<template>
  <div class="news">
    <!-- 导航区 -->
    <nav class="news-list">
      <RouterLink v-for="news in newsList" :key="news.id" :to="{ path: '/news/detail' }">
        {{ news.name }}
      </RouterLink>
    </nav>
    <!-- 展示区 -->
    <div class="news-detail">
      <RouterView/>
    </div>
  </div>
</template>
```


## 路由传参

### 1️⃣ query 参数

**传递参数**

```vue
<!-- 跳转并携带 query 参数（to 的字符串写法） -->
<router-link to="/news/detail?a=1&b=2&content=欢迎你">
	跳转
</router-link>
				
<!-- 跳转并携带 query 参数（to 的对象写法） -->
<RouterLink 
  :to="{
    name:'xiang', // 用 name 也可以跳转
    path:'/news/detail',
    query: {
      id: news.id,
      title: news.title,
      content: news.content
    }
  }"
>
  {{ news.title }}
</RouterLink>
```

**接收参数**

```js
import { useRoute } from 'vue-router'
const route = useRoute() // 拿到当前路径的路由信息对象，包含路由的路径、参数等
// 打印 query 参数
console.log(route.query)
```


### 2️⃣ params 参数

**传递参数**

```vue
<!-- 跳转并携带 params 参数（to 的字符串写法，可以用模板字符串使用变量） -->
<RouterLink :to="`/news/detail/${news.id}/${news.title}/${news.content}`">
  {{ news.title }}
</RouterLink>
				
<!-- 跳转并携带 params 参数（to 的对象写法） -->
<RouterLink 
  :to="{
    name: 'xiang',
    params: {
      id: news.id,
      title: news.title,
      content: news.title
    }
  }"
>
  {{ news.title }}
</RouterLink>
```

**接收参数**

```js
import { useRoute } from 'vue-router'
const route = useRoute()
// 打印 params 参数
console.log(route.params)
```

> 传递 `params` 参数时，若使用 `to` 的对象写法，必须使用 `name` 配置项，不能用 `path`。
>
> 传递 `params` 参数时，需要提前在规则中占位

```js
const routes: [

  {
    name: 'xinwen',
    path: '/news',
    component: News,
    children: [
      {
        name: 'xiang',
        path: 'detail/:id/:title/:content'
      }
    ]
  },
]
```

## 路由的 props 配置

让路由组件更方便的收到参数（可以将路由参数作为 `props` 传给组件）

1️⃣ 布尔值写法

把收到的每一组 params 参数，作为 props 传给 Detail 组件

当 props 设置为 true 时，route.params 将被设置为组件的 props

```javascript
{
	name:'xiang',
	path:'detail/:id/:title/:content',
	component:Detail,
  props: true
}
```

2️⃣ 对象写法

把对象中的每一组 key-value 作为 props 传给 Detail 组件

当 props 是一个对象时，它将原样设置为组件 props。当 props 是静态的时候很有用

```javascript
{
	name:'xiang',
	path:'detail/:id/:title/:content',
	component:Detail,
  props: { a: 1, b: 2, c: 3 }, 
}
```

3️⃣ 函数写法

把函数返回的对象中每一组 key-value 作为 props 传给 Detail 组件

你可以创建一个返回 props 的函数。这允许你将参数转换为其他类型，将静态值与基于路由的值相结合等等

```javascript
{
	name:'xiang',
	path:'detail/:id/:title/:content',
	component:Detail,
  props (route) {
    return route.query
  }
}
```

## replace 属性

控制路由跳转时操作浏览器历史记录的模式

浏览器的历史记录有两种写入方式：分别为 ```push``` 和 ```replace```

- ```push``` 是追加历史记录 (默认值)
- `replace `是替换当前记录

开启 `replace` 模式

```vue
<RouterLink replace ...>News</RouterLink>
```

## 编程式导航

路由组件的两个重要的属性：`$route` 和 `$router` 变成了两个 `hooks`

```js
import { useRoute, useRouter } from 'vue-router'

const route = useRoute() // 当前路由信息对象
const router = useRouter() // 路由器实例

console.log(route.query)
console.log(route.parmas)

// push 和 replace函数参数中的语法和 router-link 的 to 相同，可以写字符串和对象
console.log(router.push)
console.log(router.replace)
```

## 重定向

将特定的路径，重新定向到已有路由

```js
const route = {
    path: '/',
    redirect: '/home'
}
```
