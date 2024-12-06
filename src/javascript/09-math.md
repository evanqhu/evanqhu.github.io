# 数学对象 Math

**与其他全局对象不同，Math对象没有构造函数。方法和属性是静态的。可以在不首先创建 Math 对象的情况下使用所有方法和属性（常量）**

* `Math.PI; // 返回 3.141592653589793`
* `Math.max(a,b,c);`
* `Math.round(x)` 的返回值是 x 四舍五入为最接近的整数
* `Math.pow(x, y)` 的返回值是 x 的 y 次幂
* `Math.sqrt(x)` 返回 x 的平方根
* `Math.abs(x)` 返回 x 的绝对（正）值
* `Math.ceil(x)` 的返回值是 x **上舍入**最接近的整数
* `Math.floor(x)` 的返回值是 x **下舍入**最接近的整数
* `Math.min()` 和 `Math.max()` 可用于查找参数列表中的最低或最高值
* `Math.random()` 返回介于 0（包括） 与 1（不包括） 之间的随机数 `[0, 1)`

## 随机值的妙用

### 获取随机颜色

```js
const getRandomColor = () => {
  return '#' + Math.random().toString(16).substring(2, 8).padEnd(0);
};
```

### 获取随机值

```js
const selectFrom = (lowerValue, upperValue) => {
  const choices = upperValue - lowerValue + 1;
  return Math.floor(Math.random() * choices + lowerValue);
};

const num = selectFrom(2, 10);
console.log(num); // 2~10 范围内的值，其中包含 2 和 10
```

