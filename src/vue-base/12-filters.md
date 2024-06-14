# 过滤器 filters

对要显示的数据进行特定格式化后再显示（适用于一些简单逻辑的处理），本质上是一个函数

- 注册过滤器（局部或全局）
  - 局部过滤器：在创建 vm 时传入 `filters` 配置项；
  - 全局过滤器：`Vue.filter(filterName, callback)`

- 使用过滤器：`{{ xxx | 过滤器名 }}` 或 `v-bind: 属性 = "xxx | 过滤器名"`
- **callback 函数默认传入第一个参数是需要过滤的数据的 `value`**，上面的 xxx 是需要过滤的数据

```html
<script type="text/javascript">
  // 全局过滤器（写在 Vue 实例之前）
  Vue.filter('mySlice', function (value) {
    return value.slice(0, 4); // 截取前四位
  })

  new Vue({
    // 局部过滤器（本质是一个函数）
    filters: {
      timeFormater(value, str = 'YYYY年MM月DD日 HH:mm:ss') { // str 传一个形参默认值
        return dayjs(value).format(str);
      }
    }
  })
</script>
```
