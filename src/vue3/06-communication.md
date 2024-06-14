# 组件通信

**`Vue3` 组件通信和 `Vue2` 的区别**

* 移除事件总线，使用 `mitt` 代替

- `Vuex `换成了 `Pinia`
- 把 `.sync` 优化到了 `v-model` 里面了
- 把 `$listeners` 所有的东西，合并到 `$attrs` 中了
- `$children` 被砍掉了

## props

`props` 是使用频率最高的一种通信方式，常用与 ：**父 ↔ 子** `defineProps`

- 若 **父传子**：属性值是**非函数**
- 若 **子传父**：属性值是**函数**

```vue
<!-- 父组件 -->
<template>
  <div class="father">
    <h3>父组件</h3>
		<h4>我的车：{{ car }}</h4>
		<h4>儿子给的玩具：{{ toy }}</h4>
		<Child :car="car" :getToy="getToy"/>
  </div>
</template>

<script setup lang="ts" name="Father">
	import Child from './Child.vue'
	import { ref } from "vue";
	// 数据
	const car = ref('奔驰')
	const toy = ref()
	// 方法
	function getToy(value: string) {
		toy.value = value
	}
</script>
```



```vue
<!-- 子组件 -->
<template>
  <div class="child">
    <h3>子组件</h3>
		<h4>我的玩具：{{ toy }}</h4>
		<h4>父给我的车：{{ car }}</h4>
		<button @click="getToy(toy)">玩具给父亲</button>
  </div>
</template>

<script setup lang="ts" name="Child">
	import { ref } from "vue";
  
  defineProps(['car','getToy'])
  
	const toy = ref('奥特曼')
</script>
```

## 自定义事件

自定义事件常用于：**子 => 父** `defineEmits`

原生事件和自定义事件

- 原生事件：
  - 事件名是特定的（`click`、`mosueenter` 等等）	
  - 事件对象 `$event`: 是包含事件相关信息的对象（`pageX`、`pageY`、`target`、`keyCode`）
- 自定义事件：
  - 事件名是任意名称
  - <strong style="color:red">事件对象 `$event` 是调用 `emit` 时所提供的数据，可以是任意类型！！！</strong >

示例

```html
<!-- 在父组件中，给子组件绑定自定义事件 -->
<Child @send-toy="toy = $event"/>

<!-- 注意区分原生事件与自定义事件中的 $event -->
<button @click="toy = $event">测试</button>
```

```js
// 子组件中，声明并触发事件：
// 声明事件 (返回一个 emit 函数，用于触发声明接收的自定义事件)
const emit = defineEmits(['send-toy'])
// 触发事件
emit('send-toy', 具体数据)
```

## mitt

与消息订阅与发布 (`pubsub`) 功能类似，可以实现任意组件间通信

1️⃣ 安装 `mitt`

```bash
pnpm i mitt
```

2️⃣ 新建文件 `src\utils\emitter.ts` 进行配置，创建 `emitter`

```javascript
// 1. 引入 mitt 
import mitt from "mitt";

// 2. 创建 emitter，它可以绑定事件和触发事件
const emitter = mitt()

// 3. 创建并暴露 mitt
export default emitter
```

emitter 语法

```javascript
// ***************************** emitter 语法 **************************
// 1. 绑定事件
emitter.on('test', (value) => {
  console.log('abc事件被触发', value)
})

// 2. 解绑事件
emitter.off('test')

setInterval(() => {
  // 3. 触发事件
  emitter.emit('test', 666)
}, 1000);

setTimeout(() => {
  // 4. 拿到所有自定义事件，并清理事件
  emitter.all.clear()
}, 3000); 
```

3️⃣ 接收数据的组件中：绑定事件、同时在销毁前解绑事件

```typescript
// 接收数据的组件
import { onUnmounted } from "vue";
import emitter from "@/utils/emitter";

// 绑定事件
emitter.on('send-toy', (value) => {
  console.log('send-toy事件被触发', value)
})

onUnmounted(() => {
  // 解绑事件
  emitter.off('send-toy')
})
```

4️⃣ 提供数据的组件，在合适的时候触发事件

```javascript
// 提供数据的组件
import emitter from "@/utils/emitter";

function sendToy () {
  // 触发事件
  emitter.emit('send-toy', toy.value)
}
```

## v-model

实现 **父↔子** 之间相互通信。

1️⃣ 前序知识 —— `v-model`的本质

```vue
<!-- 使用 v-model 指令 -->
<input type="text" v-model="userName">

<!-- v-model 的本质是下面这行代码 -->
<input 
  type="text" 
  :value="userName" 
  @input="userName =(<HTMLInputElement>$event.target).value"
>
```

2️⃣ 组件标签上的 `v-model`的本质：`:moldeValue` ＋ `update:modelValue`事件

```vue
<!-- 组件标签上使用 v-model 指令 -->
<AtguiguInput v-model="userName"/>

<!-- 组件标签上v-model的本质 -->
<AtguiguInput :modelValue="userName" @update:model-value="userName = $event"/>
```

`AtguiguInput` 组件中：

```vue
<template>
  <div class="box">
    <!-- 将接收的 value 值赋给 input 元素的 value 属性，目的是：为了呈现数据 -->
		<!--给 input 元素绑定原生 input 事件，触发 input 事件时，进而触发 update:model-value 事件-->
    <input 
       type="text"
       :value="modelValue" 
       @input="emit('update:model-value', $event.target.value)"
    >
  </div>
</template>

<script setup lang="ts" name="AtguiguInput">
  // 接收 props
  defineProps(['modelValue'])
  // 声明事件
  const emit = defineEmits(['update:model-value'])
</script>
```

3️⃣ 也可以更换 `value`，例如改成 `abc`

```vue
<!-- 也可以更换value，例如改成abc -->
<AtguiguInput v-model:abc="userName"/>

<!-- 上面代码的本质如下 -->
<AtguiguInput :abc="userName" @update:abc="userName = $event"/>
```

`AtguiguInput `组件中：

```vue
<template>
  <div class="box">
    <input 
       type="text" 
       :value="abc" 
       @input="emit('update:abc', $event.target.value)"
    >
  </div>
</template>

<script setup lang="ts" name="AtguiguInput">
  // 接收 props
  defineProps(['abc'])
  // 声明事件
  const emit = defineEmits(['update:abc'])
</script>
```

4️⃣ 如果 `value` 可以更换，那么就可以在组件标签上多次使用 `v-model`

```vue
<AtguiguInput v-model:abc="userName" v-model:xyz="password"/>
```

### 6.5. $attrs 

`$attrs` 用于实现**当前组件的父组件**，向**当前组件的子组件**通信 (**祖→孙**)

具体说明：`$attrs` 是一个对象，包含所有父组件传入的标签属性

>  注意：`$attrs` 会自动排除 `props` 中声明的属性 (可以认为声明过的 `props` 被子组件自己“消费”了)

```vue
<!-- 父组件 -->
<template>
  <div class="father">
    <h3>父组件</h3>
		<Child :a="a" :b="b" :c="c" :d="d" v-bind="{ x:100, y:200 }" :updateA="updateA"/>
  </div>
</template>

<script setup lang="ts" name="Father">
	import Child from './Child.vue'
	import { ref } from "vue";
	const a = ref(1)
	const b = ref(2)
	const c = ref(3)
	const d = ref(4)

	function updateA(value) {
		a.value = value
	}
</script>
```

```js
v-bind="{ x:100, y:200 }"
// 相当于
:x="100" :y="200"
$attrs={ a: "1", b: "2", ... }
```

子组件

```vue
<!-- 子组件 -->
<template>
	<div class="child">
		<h3>子组件</h3>
		<GrandChild v-bind="$attrs"/>
	</div>
</template>

<script setup lang="ts" name="Child">
	import GrandChild from './GrandChild.vue'
  import { useAttrs } from 'vue';
  
  const attrs = useAttrs();
</script>
```

孙组件

```vue
<!-- 孙组件 -->
<template>
	<div class="grand-child">
		<h3>孙组件</h3>
		<h4>a：{{ a }}</h4>
		<h4>b：{{ b }}</h4>
		<h4>c：{{ c }}</h4>
		<h4>d：{{ d }}</h4>
		<h4>x：{{ x }}</h4>
		<h4>y：{{ y }}</h4>
		<button @click="updateA(666)">点我更新 A</button>
	</div>
</template>

<script setup lang="ts" name="GrandChild">
	defineProps(['a', 'b', 'c', 'd', 'x', 'y', 'updateA'])
</script>
```

## $refs $parent

* `$refs` 用于 ：**父→子**
* `$parent` 用于：**子→父**

```vue
<!-- 父组件 -->
<template>
  <Child ref="c1"/>
</template>

<script>
	import { ref } from "vue"
  const c1 = ref()
  // 访问子组件的数据 (前提是子组件使用 defineExpose 对外暴露数据了)
  console.log(c1.value)
</script>
```



```vue
<!-- 子组件 -->
<template>
</template>

<script>
	import { ref } from "vue"
  
  const toy = ref("奥特曼")
  const book = ref(3)
  
  // 向父组件暴露数据
  defineExpose({ toy, book })
</script>
```

| 属性      | 说明                                                         |
| --------- | ------------------------------------------------------------ |
| `$refs`   | 值为对象，包含所有被 `ref` 属性标识的 `DOM` 元素或组件实例。 |
| `$parent` | 值为对象，当前组件的父组件实例对象。                         |

## 依赖注入 provide inject

实现**祖孙组件**直接通信

* 在祖先组件中通过 `provide` 配置向后代组件提供数据
* 在后代组件中通过 `inject` 配置来声明接收数据

1️⃣ 父组件中，使用 `provide()` 提供数据

```vue
<!-- 父组件 -->
<template>
  <div class="father">
    <h3>父组件</h3>
    <h4>资产：{{ money }}</h4>
    <h4>汽车：{{ car }}</h4>
    <button @click="money += 1">资产+1</button>
    <button @click="car.price += 1">汽车价格+1</button>
    <Child/>
  </div>
</template>

<script setup lang="ts" name="Father">
  import Child from './Child.vue'
  import { ref, reactive, provide } from "vue";
  // 数据
  const money = ref(100)
  const car = reactive({
    brand: '奔驰',
    price: 100
  })
  // 用于更新 money 的方法
  function updateMoney(value) {
    money.value += value
  }
  /* 提供数据 */
  provide('moneyContext', { money, updateMoney })
  provide('car', car)
</script>
```

> 注意：后代组件中不用编写任何东西，是不受到任何打扰的

2️⃣ 后代组件中使用 `inject()` 接受数据

```vue
<!-- 后代组件 -->
<template>
  <div class="grand-child">
    <h3>我是孙组件</h3>
    <h4>资产：{{ money }}</h4>
    <h4>汽车：{{ car }}</h4>
    <button @click="updateMoney(6)">点我</button>
  </div>
</template>

<script setup lang="ts" name="GrandChild">
  import { inject } from 'vue';
  /* 注入数据 (可指定默认值) */
  const { money, updateMoney } = inject(
    'moneyContext',
    {
      money: 0,
      updateMoney: (x: number) => {}
    }
  )
  const car = inject('car');
</script>
```


## Pinia

参考之前 `Pinia` 部分的讲解

## 插槽 slot

插槽可以理解为**传递对象**和**调用函数**

>  😀 父组件中写在子组件标签体中的内容是一个对象，对象里面有插槽属性，属性值是一个函数

```vue
<!-- 父组件 -->
<template>
  <ChildComp>
    <p>default slot</p>

    <template v-slot:slot1>
      <p>slot1</p>
    </template>

    <template v-slot:slot2="{ msg }">
      <p>slot2: {{ msg }}</p>
    </template>
  </ChildComp>
</template>
```

```js
// 抽象
const obj = {
  // 默认插槽
  default: function() {
    return "<p>default slot</p>"
  },
  // 具名插槽
  slot1: function() {
    return "<p>slot1</p>"
  },
  // 作用域插槽
  slot2: function({ msg }) {
    return "<p>slot2: {{ msg }}</p>"
  }
}
```

> 😀 子组件中通过书写 `<slot>` 标签调用相应的函数，返回对应的虚拟节点

```vue
<!-- 子组件 -->
<template>
  <div>
    <slot></slot> <!-- 调用 default 函数 -->
    
    <slot name="slot1"></slot> <!-- 调用 slot1 函数 -->
    
    <slot name="slot2" msg="hello world"></slot> <!-- 调用 slot2 函数，参数为 "hello world" -->
  </div>
</template>
```

### 1️⃣ 默认插槽

```vue
<!-- 父组件 -->
<template>
  <Category title="今日热门游戏">
    <ul>
      <li v-for="g in games" :key="g.id">{{ g.name }}</li>
    </ul>
  </Category>
</template>

<!-- 子组件 -->
<template>
  <div class="item">
    <h3>{{ title }}</h3>
    <!-- 默认插槽 -->
    <slot></slot>
  </div>
</template>
```

### 2️⃣ 具名插槽

```vue
<!-- 父组件 -->
<template>
  <Category title="今日热门游戏">
    <template v-slot:s1>
      <ul>
        <li v-for="g in games" :key="g.id">{{ g.name }}</li>
      </ul>
    </template>
    <template #s2>
      <a href="">更多</a>
    </template>
  </Category>
</template>

<!-- 子组件 -->
<template>
  <div class="item">
    <h3>{{ title }}</h3>
    <slot name="s1"></slot>
    <slot name="s2"></slot>
  </div>
</template>
```

### 3️⃣ 作用域插槽 

数据在组件的自身，但根据数据生成的结构需要组件的使用者来决定 (新闻数据在 `News` 组件中，但使用数据所遍历出来的结构由 `App` 组件决定)

```vue
<!-- 父组件 -->
<template>
  <Game v-slot="params">
  <!-- <Game v-slot:default="params"> -->
  <!-- <Game #default="params"> -->
    <ul>
      <li v-for="g in params.games" :key="g.id">{{ g.name }}</li>
    </ul>
  </Game>
</template>

<!-- 子组件 -->
<template>
  <div class="category">
    <h2>今日游戏榜单</h2>
    <slot :games="games" a="哈哈"></slot>
  </div>
</template>

<script setup lang="ts" name="Category">
  import { reactive } from 'vue'
  const games = reactive([
    { id: 'asgdytsa01', name:'英雄联盟' },
    { id: 'asgdytsa02', name:'王者荣耀' },
    { id: 'asgdytsa03', name:'红色警戒' },
    { id: 'asgdytsa04', name:'斗罗大陆' }
  ])
</script>
```
