# 权限管理

ACL：访问控制列表
用户管理 user；角色管理 role；菜单管理 permission

## 菜单权限(动态路由)

* 起始不同的用户，登录的时候会向服务器发请求，服务器把用户相应的菜单的权限的信息返回回来，根据服务器返回的数据，动态地设置路由，根据不同的用户展示不同的菜单。
* 当用户获取用户信息的时候，服务器会把相应的用户拥有菜单的权限信息返回，需要根据用户身份对比出，当前这个用户需要展示哪些菜单
* 当用户登录的时候，服务器端会返回相应角色的菜单权限的信息，是一个数组 routes

## 按钮权限

也是在 Vuex 配置的按钮权限，由服务器返回，可以用 v-show 配合 state 中的数据实现

## 任意组件权限

使用全局自定义指令

```javascript
// array.js 与权限相关的全局函数
export function checkArray (key) {
  let arr = ['1', '2', '3', '4', 'demo']
  let index = arr.indexOf(key)
  if (index > -1) {
    return true // 有权限
  } else {
    return false // 无权限
  }
}
```

```javascript
// main.js 将 array 文件挂载到全局中 自定义指令
import { checkArray } from "./common/array";
Vue.directive("permission", {
  inserted (el, binding) {
    let permission = binding.value; // 获取到 v-permission的值
    if (permission) {
      let hasPermission = checkArray(permission);
      if (!hasPermission) { // 没有权限 移除Dom元素
        el.parentNode && el.parentNode.removeChild(el);
      }
    }
  }
});
```

```html
<div class="btns">
    <button v-permission="'1'">权限按钮1</button>
    <button v-permission="'10'">权限按钮2</button>
    <button v-permission="'demo'">权限按钮3</button>
</div>
```
