# Vue 封装的动画与过渡 (跳过)

- 作用：在插入、更新或移除 DOM 元素时，在合适的时候给元素添加样式类名；
- 用法：
  - 动画
    - 用 ```<transition>``` 包裹要动画的元素，并配置 name 属性；
    - 定义动画；
    - 进入过程和离开过程分别调用动画 `.v-enter-active` 和 `.v-leave-active`
  - 过度
    - 用 ```<transition>``` 包裹要动画的元素，并配置name属性；
    - 写动画**进入的起点和离开的终点**；**运动的过程**；**进入的终点和离开的起点**
- 备注：`<transition>` 只能用在单个元素上，若有多个元素需要过度，则需要使用：```<transition-group>```，且每个元素都要指定 ```key``` 值。
- 第三方动画库：npm 中的 animate.css 动画库

```vue
<!-- 动画：先写好动画，然后在进入过程和离开过程调用动画 -->
...
<!-- 用 transition 包裹要添加动画的元素，添加 name 属性 -->
<transition name="hello" appear>  
  <h1 v-show="isShow">你好啊！</h1>
</transition>
...
<style>
  /* 进入过程调用动画 */
  .hello-enter-active {	animation: atguigu 0.5s linear; }
  /* 离开过程调用动画 */
  .hello-leave-active {	animation: atguigu 0.5s linear reverse; }
  /* 定义动画 */
  @keyframes atguigu {
    from { transform: translateX(-100%); }
    to { transform: translateX(0px); }
  }
</style>

```

```vue
<!-- 过渡：写进出的起点和终点以及运动的过程 -->
<style>
	/* 进入的起点、离开的终点 */
  .hello-enter, .hello-leave-to { transform: translateX(-100%); }
  /* 运动的过程 */
  .hello-enter-active, .hello-leave-active { transition: 0.5s linear; }
  /* 进入的终点、离开的起点 */
  .hello-enter-to, .hello-leave { transform: translateX(0); }
</style>
```
