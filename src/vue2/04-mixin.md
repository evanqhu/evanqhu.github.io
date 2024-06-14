# mixin 配置项（混入）

* 功能：把多个组件共用的配置 options 提取成一个混入对象；`mixin`（混入），提供了一种非常灵活的方式，来分发 `Vue` 组件中的可复用功能；
* 当组件自身的数据方法和混入中的数据方法冲突时，以组件自身为主；生命周期函数发生冲突时，先执行混入中的函数，再执行组件自身的生命周期函数。

```javascript
// 1.定义混入：在一个新的 mixin.js 文件中写
// 混入对象文件里面所写的配置和 Vue 组件身上的配置项相同，包括 data、methods、mounted 等
export const hunhe = {  // 分别暴露，可以有多个 hunhe，都需要挨个暴露
  data() { ... },
  methods: { ... },
  ...
}

// 2.使用混入
// 2.1 全局混入（所有的组件都拥有混入文件里面所写的配置项）【在 main.js 中引入和注册】
import { hunhe, hunhe2 } from './mixin'  // 全局引入
Vue.mixin(hunhe)  // 全局注册（只有main.js中有Vue这个构造函数，组件中没有）

// 2.2 局部混入【在School.vue组件中引入并注册混入】
import { hunhe, hunhe2 } from '../mixin'  // 局部引入
export default {
  mixins: [ hunhe, hunhe2 ],  // 局部注册
  ...
}
```
