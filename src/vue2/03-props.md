# props 配置项

- 功能：让组件接收外部传过来的数据，父组件给子组件传数据（数据或方法）；

- 传递数据 (父组件)：**数据**或**方法**写在**子组件标签**中；

- 接收数据 (子组件)：在子组件中使用 `props` 配置项接收数据，有三种接收方式；

- props 是只读的，Vue 底层会监测你对 props 的修改，如果进行了修改，就会发出警告，若业务需求确实需要修改，请复制 props 的内容到 data 中一份，然后去修改 data 中的数据；

- **先读取 props 里面的数据，再处理 data 里面的数据**，props 中的数据会被代理到 vc 身上，可直接用插值语法访问，和 data 中的数据一样；

- props 传递数据时如果子组件不声明接收，数据会出现在 `vc.$attrs` 身上；如果声明接收了，`vc.$attrs` 身上就没有了，直接出现在 vc 身上了；

- `$listeners` 可以获取到父组件给子组件传递的自定义事件

```javascript
/******************** 父组件（传递数据） ********************/
<Student name="李四" sex="女" :age="18" :checkTodo="checkTodo"/>
// 数据或方法写在子组件标签中，可以直接写值，或加上冒号后写表达式或方法名

/******************** 子组件（接收数据） ********************/
// 方法1：直接收数据
props: ['name', 'sex', 'age', 'checkTodo']

// 方法2：限制类型（不会进行类型转换，只会在控制台报错）
props: { name: String, sex: String, age: Number }

// 方法3：完整写法
props: {
  name: {
    type: String, // 限制类型
    required: true, // 限制必要性
    default: '老王' // 指定默认值（不传的时候）
  }
}
```

```html
<a :title="title">
	<el-button v-bind="$attrs" v-on="$listeners"></el-button>
</a>
```

`$children`  `$parent`

## 依赖注入

但是 props 只能逐层传递，当需要跨越多层传递的时候比较麻烦，可以用**依赖注入**；写在组件配置对象中

```javascript
// 祖先，发送数据
export default {
  provide: {
    message: 'hello!'
  }
}

// 后代，接收数据
export default {
  inject: ['message'],  // 注入会在组件自身的状态之前被解析，因此你可以在 data() 中访问到注入的属性
	data() {  
    return { fullMessage: this.message }
  }
}
```
