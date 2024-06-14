# 绑定样式

使用 `v-bind` 单向绑定

## 绑定 class 样式

```javascript
:class="mood"     // 字符串写法，适用于样式的类名不确定，需要动态指定
:class="classArr" // 数组写法，适用于样式的个数不确定，类名也不确定
:class="classObj" // 对象写法，适用于样式的个数确定，类名确定，但需要动态决定用不用

data: {
  mood: 'normal',
  classArr: ['style1', 'style2', 'style3'],
  classObj: {
    style1: false,
    style2: false,
  }
}
```

## 绑定 style 样式

```javascript
:style="styleObj"  // 对象写法
:style="styleArr"  // 数组写法

data: {
  styleObj: { fontSize: '40px', color: 'red', },
  styleArr: [
    { fontSize: '40px', color: 'blue', },
    { backgroundColor: 'gray' }
  ]
}
```
