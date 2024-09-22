# 插槽 slot

* 作用：让父组件可以向子组件指定位置插入 HTML 结构，也是一种组件间通信的方式，适用于**父组件 => 子组件** ；父组件中书写子组件标签，在**子组件标签体**中书写 HTML 结构，要把这个结构插入到子组件中，需要在子组件中用 slot 占位；通过插槽可以让用户可以拓展组件，去更好地复用组件和对其做定制化处理；
* 通过 `slot` 插槽向组件内部指定位置传递内容，完成这个复用组件在不同场景的应用，比如布局组件、表格列、下拉选、弹框显示内容等；
* slot 传递数据会出现在子组件的 `vc.$slots` 身上，`虚拟节点`；

```vue
<!-- 父组件 App 中 -->
<template>
  <div class="container">
    <Category title="美食">
      <img src="..." alt="" />  <!-- 子组件标签体内容会被插入到子组件 slot 位置 -->
    </Category>
    <Category title="游戏">
      <ul>
        <li v-for="(g, index) in games" :key="index">{{ g }}</li>
      </ul>
    </Category>
    <Category title="电影">
      <video controls src="..."></video>
    </Category>
  </div>
</template>

<script>
  import Category from "./components/Category";
  export default {
    name: "App",
    components: { Category },
    data() {
      return { games: ["红色警戒", "穿越火线", "劲舞团", "超级玛丽"] };
    },
  };
</script>
```

```vue
<!-- 子组件 Category 中 -->
<template>
  <div>
    <h3>{{ title }}分类</h3>
    <!-- 定义一个插槽（挖个坑，等着组件的使用者进行填充） -->
    <slot>我是一些默认值，当使用者没有传递具体结构时，我会出现</slot>  <!-- 父组件传来的结构在这里 -->
  </div>
</template>
```

## 默认插槽

```html
<!-- 默认插槽 -->
<!-- 父组件 App 中 -->
<Category>
  <div>html结构</div>  <!-- 整个 div 会被插入到子组件的 slot 标签处 -->
</Category>

<!-- 子组件 Category 中 -->
<div>
  <slot>插槽默认内容...</slot>  <!-- 定义插槽 -->
</div>
```

## 具名插槽

* Vue 2.6 以前，通过 `slot="header"` 属性标记往哪个具名插槽中插入子组件内容
* Vue 2.6 之后，使用 `v-slot:header` 来标记，同时还可以与作用域插槽结合，用于接收数据 `v-slot:header="slotProps"`
* `v-slot` 可简写为 `#`

```html
<!-- 具名插槽 -->
<!-- 父组件 App 中 -->
<Category>
  <template slot="center">  <!-- 整个 template 会被插入到子组件的 center slot 标签处 -->
    <div>html结构 1</div>
  </template>

  <template v-slot:footer>  <!-- 只有使用 template 标签之后，才可以写 v-slot:footer -->
    <div>html结构 2</div>
  </template>
</Category>

<!-- 子组件 Category 中 -->
<div>
  <slot name="center">插槽默认内容 1 ...</slot>  <!-- 给插槽取名 -->
  <slot name="footer">插槽默认内容 2 ...</slot>
</div>
```

## 作用域插槽

* 功能：**数据在子组件的自身，但根据数据生成的结构需要组件的使用者（父组件）来决定。**（games 数据在 Category 组件中，但使用数据所遍历出来的结构由App组件决定）。**子给父传数据**；
* 子组件中：写数据，写 `slot` 标签 ，定义插槽，同时配置 `games` 属性传递数据；
* 父组件中：使用 `template` 标签，使用插槽，同时接收数据（接收数据的方式）
  * Vue 2.6 以前，可通过 `scope="slotProps"` 或 `slot-scope="slotProps"` 来接收数据
  * Vue 2.6 及以后，通过 `v-slot="slotProps"` 或 `#slotName="slotProps"` 来接收数据

* 可以用解构赋值：`v-slot="{ games }"`
* 如果 `v-slot` 不声明插槽名，则默认为 `default`

```html
<!-- 作用域插槽 -->
<!-- 父组件 App 中 -->
<Category>
  <template v-slot="slotProps">
    <ul>  <!-- 这里的 scopeData 来自子组件，是一个对象，存放子组件中 slot 标签传过来的数据 -->
      <li v-for="g in slotProps.games" :key="g">{{ g }}</li>
    </ul>
  </template>
</Category>

<!-- 子组件 Category 中 -->
<template>
  <div>
    <slot :games="games"></slot>  <!-- 把 games 数据传给插槽使用者 -->
  </div>
</template>

<script>
  export default {
    name: 'Category',
    props: ['title'],
    data() {    // 数据在子组件自身
      return { games: ['红色警戒', '穿越火线', '劲舞团', '超级玛丽'] }
    }
  }
</script>

<!-- Element UI -->
<el-table-column prop="logoUrl" label="品牌 LOGO" width="width">
  <template v-slot="{ row, $index }">
    <img :src="row.logoUrl" alt="" style="width: 100px; height: 100px" />
  </template>
</el-table-column>
```
