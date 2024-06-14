# 数据绑定

`v-bind` `v-model` `sync`

## 单向绑定 v-bind

* 数据只能从 data 流向页面，`v-bind:attr="xxx"` 可以简写成 `:attr="xxx"`
* 可以绑定其他属性，通常在属性前面加上冒号，这样属性等号后面的值就当作 **JS 表达式**来解析

## 双向绑定 v-model

* 数据不仅可以从 data 流向页面，也可以从页面流向 data，只能应用于**表单元素**；
* `v-model:value="xxx"` 可以简写为 `v-model="xxx"`，**默认收集的是 value 值**；
* label 标签为 input 元素定义标注（标记）；**它不会向用户呈现任何特殊效果**。不过，它为鼠标用户改进了可用性。如果您在 label 元素内点击文本，就会触发此控件。就是说，当用户选择该标签时，浏览器就会自动将焦点转到和标签相关的表单控件上；使用 for 属性指定表单控件的 id；
* 若 `<input type="text"/>`，则收集 value 值，用户的输入就是 value 值；
* 三个修饰符
  * `v-model.lazy` 失去焦点再收集数据；
  * `v-model.number` 输入字符串转为有效数字（整数，有加减号）；
  * `v-model.trim` 去除首尾空格。

```html
<!-- 收集表单数据 -->
<form>
  <label for="demo">账号</label>  <!-- 用lable之后，点击“账号”也可以使输入框获取焦点 -->
  <input type="text" id="demo" v-model.trim="userInfo.account">  <!-- trim去掉前后的空格 -->
  密码：<input type="password" v-model="userInfo.password">
  年龄：<input type="number" v-model.number="userInfo.age">  <!-- 字符串转数字 -->
  
  性别：  <!-- 单选，需配置相同的name属性，收集value值 -->
  男<input type="radio" name="sex" v-model="userInfo.sex" value="male">
  女<input type="radio" name="sex" v-model="userInfo.sex" value="female">
  
  <!-- 多选，如果没有value属性，或有value属性，但是v-model初始值不是数组，则收集是否选择的布尔值；如果配置了value属性，且v-model初始值为数组，则收集value组成的数组-->
  爱好：
  学习<input type="checkbox" v-model="userInfo.hobby" value="study">
  打游戏<input type="checkbox" v-model="userInfo.hobby" value="game">
  吃饭<input type="checkbox" v-model="userInfo.hobby" value="eat">
  
  所属校区
  <select v-model="userInfo.city">
    <option value="">请选择校区</option>
    <option value="beijing">北京</option>
    <option value="shanghai">上海</option>
    <option value="shenzhen">深圳</option>
    <option value="wuhan">武汉</option>
  </select>
  其他信息：
  <textarea v-model.lazy="userInfo.other"></textarea>
</form>
<script>
  userInfo: {
    account: '',
    password: '',
    age: 18,
    sex: 'female',
    hobby: [],
    city: 'beijing',
    other: '',
}</script>
```

## sync 修饰符

* sync 修饰符可以实现类似 v-model 的双向绑定，因为一个组件只能有一个 v-model，而且 props 的数据是不可以修改的，所以需要双向绑定 props 的数据或其他数据的时候，可以用 sync 修饰符。它也是组件通信方式的一种；
* `:money.sync` 表示父组件通过 props 给子组件传递一个数据 `money`，同时给当前子组件绑定一个自定义事件`update:money`

```html
<child :show="show" @update:show="show=$event"></child>
<!-- 等价于 -->
<child :show.sync="show"></child>

<!-- 注意：子组件中触发自定义事件的形式必须类似如下 -->
<script>
	this.$emit("update:show", !this.show)
</script>
```

#### element 中 sync 的使用

因为 el-dialog 也是一个组件，需要将 visible 这个属性值传递给 el-dialog，在 el-dialog 组件中也有改变 visible 属性值的方法，为了父组件能接收到，所以用了 sync 修饰符

```vue
<template>
	<el-button @click="dialogTableVisible=true">点击显示对话框</el-button>
	<el-dialog :visible.sync="dialogTableVisible"></el-dialog>
</template>
<script>
	export default {
    data() { return { dialogTableVisible: false; }}
  }
</script>
```
