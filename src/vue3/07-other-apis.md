# 其它 API

## shallowRef 与 shallowReactive 

1️⃣ `shallowRef`

* 创建一个响应式数据，但只对顶层属性进行响应式处理

* 特点：只跟踪引用值的变化，不关心值内部的属性变化

```js
const myVar = shallowRef(initialValue);
```

2️⃣ `shallowReactive`

* 创建一个浅层响应式对象，只会使对象的最顶层属性变成响应式的，对象内部的嵌套属性则不会变成响应式的

* 特点：对象的顶层属性是响应式的，但嵌套对象的属性不是

```js
const myObj = shallowReactive({ ... });
```

总结

> 通过使用 [`shallowRef()`](https://cn.vuejs.org/api/reactivity-advanced.html#shallowref) 和 [`shallowReactive()`](https://cn.vuejs.org/api/reactivity-advanced.html#shallowreactive) 来绕开深度响应。浅层式 `API` 创建的状态只在其顶层是响应式的，对所有深层的对象不会做任何处理，避免了对每一个内部属性做响应式所带来的性能成本，这使得属性的访问变得更快，可提升性能

## readonly 与 shallowReadonly

1️⃣ `readonly`

* 用于创建一个对象的深只读副本
* 特点
  * 对象的所有嵌套属性都将变为只读
  * 任何尝试修改这个对象的操作都会被阻止 (在开发模式下，还会在控制台中发出警告)
* 应用场景
  * 创建不可变的状态快照
  * 保护全局状态或配置不被修改

```js
const original = reactive({ ... });
const readOnlyCopy = readonly(original);
```

2️⃣ `shallowReadonly`

* 与 `readonly` 类似，但只作用于对象的顶层属性
* 特点
  * 只将对象的顶层属性设置为只读，对象内部的嵌套属性仍然是可变的
  * 适用于只需保护对象顶层属性的场景

```js
const original = reactive({ ... });
const shallowReadOnlyCopy = shallowReadonly(original);
```

## toRaw 与 markRaw

1️⃣ `toRaw`

* 用于获取一个响应式对象的原始对象， `toRaw` 返回的对象不再是响应式的，不会触发视图更新

> 官网描述：这是一个可以用于临时读取而不引起代理访问/跟踪开销，或是写入而不触发更改的特殊方法。不建议保存对原始对象的持久引用，请谨慎使用。

> 何时使用？ —— 在需要将响应式对象传递给非 `Vue` 的库或外部系统时，使用 `toRaw` 可以确保它们收到的是普通对象

```js
import { reactive, toRaw } from "vue";

// 响应式对象
const person = reactive({ name: 'tony', age: 18 })
// 原始对象
const rawPerson = toRaw(person)
```

2️⃣ `markRaw`

* 标记一个对象，使其**永远不会**变成响应式的

> 例如使用 `mockjs` 时，为了防止误把 `mockjs` 变为响应式对象，可以使用 `markRaw` 去标记 `mockjs`

用法：

```js
import { reactive, markRaw, isReactive } from "vue";

const citys = markRaw([
  { id: 'asdda01', name: '北京' },
  { id: 'asdda02', name: '上海' },
  { id: 'asdda03', name: '天津' },
  { id: 'asdda04', name: '重庆' }
])

// 根据原始对象 citys 去创建响应式对象 citys2 ——> 创建失败，因为 citys 被 markRaw 标记了
const citys2 = reactive(citys)
```

## customRef

* 创建一个自定义的 `ref`，并对其依赖项跟踪和更新触发进行逻辑控制

实现防抖效果 `useDebouncedRef.ts`

```js
import { customRef } from "vue";

// value 初始值
export function useDebouncedRef(value, delay = 300) {
  return customRef((track, trigger) => {
    let timer;
    return {
      // msg 被读取时调用
      get() {
        track(); // 告诉 Vue 数据 msg 很重要，要对 msg 持续关注，一旦变化就更新
        return value;
      },
      // msg 被修改时调用
      set(newValue) {
        // 延迟派发更新
        clearTimeout(timer);
        timer = setTimeout(() => {
          value = newValue;
          trigger(); // 通知 Vue 数据 msg 变化了
        }, delay);
      }
    }
  }) 
}
```

组件中使用

```js
const msg = useDebouncedRef('你好', 2000);
```
