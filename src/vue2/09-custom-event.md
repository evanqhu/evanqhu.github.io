# 组件自定义事件

* 功能：组件自定义事件是一种组件间通信的方式，给组件的实例对象绑定自定义事件，实现子组件到父组件的数据传递；
* 在父组件中定义事件，通过 `@ 或 v-on`  写在子组件标签上，或通过 `ref` 拿到子组件实例对象，然后通过 `$on 或 $once` 绑定事件；
* 在子组件中通过 `$emit` 触发事件；通过 `$off` 解绑事件；
* 组件上也可以绑定原生 DOM 事件，需要使用 ```native``` 修饰符；
* 注意：通过 ```this.$refs.xxx.$on('event1', this.callback)``` 绑定自定义事件时，**回调函数要么配置在 methods 中，要么用箭头函数**，否则 this 指向会出问题；
* **谁触发的自定义事件，回调函数中的 this 就指向谁**。

```vue
/******************** 父组件 School（定义并绑定自定义事件） ********************/
// 方法一：在子组件标签中用 @ 或 v-on 绑定事件
<Student @getStudentName="func" /> // 绑定自定义事件 getStudentName
<Student v-on:getStudentName.once="func" /> // 绑定自定义事件（触发一次）
  
// 方法二：通过 ref 获取子组件实例对象，通过 $on 绑定事件
<Student ref="student" @click.native="show" />,

<script>
  export default {
    methods: { demo() { }, func(){ params } },  // 回调函数 func
    mounted(){
      this.$refs.student.$on('getStudentName', this.func)  // 绑定自定义事件 getStudentName
    },
  }
</script>

/******************** 子组件 Student（触发自定义事件） ********************/
<script>
  export default {
    methods: {
      sendStudentlName() {
        this.$emit('getStudentName', params)  // 触发组件实例身上的自定义事件 
      },
      unbind() {
        this.$off('getStudentName')  // 解绑一个自定义事件
        this.$off(['demo1', 'demo2'])  // 解绑多个自定义事件
        this.$off()  // 解绑全部自定义事件
      }
    }
  }
</script>
```
