# 函数 Function

## 函数基础

#### 声明函数

```javascript
// 1. 自定义函数 (命名函数)
function fn() {};
// 2. 函数表达式 (匿名函数)
var fun = function() {};
var fun = () => {};
// 3. 利用 new Function('参数1', '参数2', '函数体')
var f = new Function('a', 'b', 'console.log(a + b)');
```

#### 调用函数

```javascript
// 1.调用普通函数 fn(); fn.call()
// 2.对象的方法，Object.key，value 是函数，则被调用了
// 3.构造函数 new
// 4.绑定事件函数，执行事件即可 (回调函数)
// 5.定时器函数 (回调函数)
// 6.立即执行函数，自动调用 ()()，前一个()里面写一个函数；后一个()表示立即执行这个函数，可传参
(function() {
  console.log('人生的巅峰');
})();
```

- 如果实参个数大于形参个数，会取形参的个数；如果实参个数小于形参个数，缺少的实参会被当作 `undefined`
- `return` **只能返回一个值**，返回最后一个值；没有 `return` 时返回 `undefined`
- 访问没有括号 `()` 的函数将返回函数定义
- **arguments对象**的使用
  - 不确定有多少参数传递时，用 `arguments` 对象获取，存取了传递的所有实参
  - 以伪数组形式展示：具有 `length` 属性；按照索引的方式存储；没有真正数组的一些方法;
  - `arguments` 无需指出参数名就可访问

```javascript
function fn(...args) {
  for (let i = 0; i < arguments.length; i++) {
    console.log(arguments[i]); // 也可用 args
  }
}

// 剩余参数
function sum(first, ...args) {
  console.log(first); // 10
  console.log(args); // [20, 30]
}
sum(10, 20, 30);
```

**this 指向**：函数的不同调用方式决定了 this 的指向不同

* 对象的方法 this 指向的是对象；
* 构造函数和原型对象的 this 都指向创建的实例对象；
* 绑定事件函数 this 指向的是函数的调用者 btn 这个按钮对象；
* 定时器函数 this 指向的也是 window；
* 立即执行函数 this 还是指向 window；
* 普通函数 this 指向 window。

#### 改变 this 指向

```javascript
const p = {}; // 一个对象
function fn(a, b) {}; // 一个函数

// 1.call()
fn.call(p, a, b); // 把 this 指向对象 p；实参依次传入

// 2.apply()
fn.apply(p, [a, b]); // 把 this 指向对象 p；实参以数组或伪数组形式传入

const max = Math.max.apply(Math, arr); // 利用 apply 借助于数学内置对象的方法求数组最大值

// 3.bind()
const fn2 = fn.bind(p, 1, 2);  // 不会调用原来的函数，返回的是原函数改变 this 之后产生的新函数
// 可用在 setTimeout 里面，绑定回调函数，改变其 this 指向
```

## 箭头函数

箭头函数是用来简化函数定义语法；对于箭头函数，`this` 关键字始终表示定义箭头函数的对象

```js
// 普通函数
const fun = function() {};

// 箭头函数
const fn = () => {};
// 如果函数体中只有一句代码，并且代码的执行结果就是函数的返回值，函数体大括号可以省略
const sum = (n1, n2) => n1 + n2;
// 如果形参只有一个，形参外侧的小括号也是可以省略
const fn = v => alert(v);

const age = 100;
const obj = {
  age: 20,
  say: () => { alert(this.age) }
}
obj.say(); // 输出 100（对象不产生作用域，箭头函数 say 实际上被定义在 window 中）
```

## 闭包

**高阶函数定义：**对其他函数进行操作的函数，它接收**函数作为参数**或者将**函数作为返回值**输出；如回调函数，它就是将 callback 作为参数，在高阶函数的函数体内最后一行执行。

#### 闭包

有权访问另一个函数作用域中变量的函数

```javascript
function fn() {
  const num = 10;
  function fun() {
    console.log(num); // fun 函数访问了外部函数 fn 作用域内的变量
  }
  fun();
}
fn();  // fn() 为闭包函数；被访问的变量所在的函数是闭包函数
```

闭包延伸了变量的作用范围，可以用以下方法从外部作用域访问内部的局部变量

```javascript
function fn() {
  const num = 10;
  function fun() { console.log(num); };
  return fun; // 返回一个函数 ！！！
}
const f = fn();  // 调用 f 就可以拿到 num 的值，相当于从函数外部获取到函数内部的局部变量

// 可简写
function fn() {
  var num = 10;
  return () => console.log(num); // 直接返回一个匿名函数或箭头函数
}
// 使用 fn()() 即可打印出 num 的值，从外部访问函数作用域的变量
```

闭包应用案例：循环注册点击事件（点击事件是异步任务）

以下代码点击任意 `li` 只会输出 4 。原因如下：
点击事件是异步任务，只有点击了才会执行函数；但 for 循环是同步任务，它会立即执行，然后就给 4 个 `li` 注册了点击事件函数，这时 `i` 的值已经变为 4，所以点击任意 `li`，执行其点击事件函数，输出的都是 4。

```javascript
// 点击 li 输出其索引号（错误写法）
const lis = document.querySelector('.nav').querySelectorAll('li'); // 4 个 li
for (let i = 0; i < lis.length; i++) { 
  // 循环注册点击事件
  lis[i].onclick = function() {
    console.log(i); // 输出索引号
  }
}

// 正确写法1：动态添加属性
for (let i = 0; i < lis.length; i++) {
  lis[i].index = i;  // 保存 li 的索引号
  lis[i].onclick = function() {
    console.log(this.index); // 输出索引号
  }
}

// 正确写法2：闭包
for (let i = 0; i < lis.length; i++) {
  // 利用 for 循环创建了 4 个立即执行函数
  // 立即执行函数也称为小闭包，因为立即执行函数里面的任何一个函数都可以使用它的 i 这个变量
  (function(i) { // i 表示接收的参数
    lis[i].onclick = function() {
      console.log(i); // 使用了立即执行函数的 i 这个变量（闭包）
    }
  })(i); // i 表示传入的参数
}  
```

闭包应用案例：定时器中的闭包（定时器是异步任务）

```javascript
// 写法1：闭包
for (let i = 0; i < lis.length; i++) {
  (function(i) {
    setTimeout(function() {
      console.log(lis[i].innerHTML);
    }, 3000)： // 3 秒之后一次全部打印
  })(i);
}

// 写法2：非闭包（一次输出 0，1，2，3，4）
var output = function(i) {
  setTimeout(function() {
    console.log(i);
  }, 1000);
};
for (let i = 0; i < 5; i++) {
  output(i);
}

// Promise 写法（隔 1 秒依次输出 0，1，2，3，4）
const tasks = []; // 存放异步操作的 Promise
const output = (i) => new Promise((resolve) => {
  setTimeout(() => {
    console.log(i);
  }, 1000 * i);
});

for (let i = 0; i < 5; i++) {
  tasks.push(output(i)); // 生成全部的异步操作
}
Promise.all(tasks); // 执行所有的Promise，间隔 1 秒输出 0，1，2，3，4

// async await（ES7 新增）
const sleep = (timeoutMS) => new Promise((resolve) => { // 设置一个异步操作
  setTimeout(resolve, timeoutMS); // 指定时间之后调用 resolve
});
(async () => { // 声明即执行的 async 异步函数
  for (let i = 0; i < 5; i++) {
    await sleep(1000);
    console.log(i);
  }
})();
```

#### 闭包的优缺点

优点：**跨作用域访问变量**；让这些变量的值始终保存在内存中；
缺点：内存消耗大，容易产生内存泄漏（要将不使用的局部变量删除）

#### 闭包使用场景

* 闭包的使用场景包含两点：创建私有变量和延长变量的生命周期
* 只要将函数作为返回值，就有闭包；只要使用了回调函数，都有闭包的应用
* 定时器，事件监听，ajax 请求，防抖节流等

## 递归函数

一个函数内部自己调用自己，这个函数就是递归函数

```javascript
let num = 1;

function fn() {
  console.log('我要打印 6 句话');
  if (num == 6) {
    return; // 递归里面必须加退出条件
  }
  num++;
  fn(); // 调用自身
}
fn();

// 递归求阶乘
function fn(n) {
  if (n == 1) {
    return 1;
  }
  return n * fn(n-1)
}

// 递归求 fb 数列
function fb(n) {
  if (n == 1 || n == 2) {
    return 1;
  }
  return fb(n-1) + fb(n-2);
}
```

#### 赋值和深浅拷贝

深拷贝和浅拷贝是只针对 Object 和 Array 这样的引用数据类型的。

赋值和浅拷贝的区别：赋值是赋的对象在**栈中的地址**，不是**堆中的数据**，不会创建新的对象，也就是说两个变量指向同一个存储空间；而浅拷贝会创建一个新的对象，新对象有着原始对象属性的一份精确拷贝，如果属性是基本类型，就拷贝值，如果是引用类型，就拷贝内存地址。

```javascript
const obj = {
  id: 1,
  name: 'Andy',
  msg: { age: 18 }
}

const shallow = {};

// 浅拷贝 1.for 循环拷贝
for (const k in obj) {
  shallow[k] = obj[k]; // 对于 obj 中的 msg（复杂数据类型）只会拷贝其地址
}
// 浅拷贝 2.Object.assign()
Object.assign(shallow, obj) // 把 obj 浅拷贝给 shallow，实际上是合并对象

// 浅拷贝 3.arr.concat()
const arr2 = arr.concat(); // 里面啥都不写，就是浅拷贝

// 浅拷贝 4.arr.slice()
const arr2 = arr.slice(); // 里面啥都不写，就是浅拷贝

// 浅拷贝 5.对象解构
const arr2 = { ...arr };


// 深拷贝 JSON.parse(JSON.stringify())
const arr2 = JSON.parse(JSON.stringify(arr)); // 无法处理函数

// 深拷贝 函数库 lodash 里面的 cloneDeep() 方法
```

**递归实现深拷贝**

```js
// 方法1
const deepClone = (obj) => {
  // 1. 判断是否是对象或者数组 (递归出口)
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // 2. 创建一个新的对象或数组
  const clone = Array.isArray(obj) ? [] : {};

  // 3. 遍历对象或数组的每一个属性 (注意是 const key of Object.keys(obj) !!!)
  for (const key of Object.keys(obj)) {
    clone[key] = deepClone(obj[key]); // 递归拷贝属性
  }

  // 4. 返回新的对象或数组
  return clone;
}

// 方法2 (防止循环引用)
const deepCloneHash = (obj, hash = new WeakMap()) => {
  // 1. 判断是否是对象或者数组 (递归出口)
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // 2. 检查该对象是否已经存在于哈希表中，如果存在，直接从哈希表中取出结果
  if (hash.has(obj)) {
    return hash.get(obj);
  }

  // 3. 创建一个新的对象或数组
  const clone = Array.isArray(obj) ? [] : {};

  // 4. 遍历对象或数组的每一个属性
  for (const key of Object.keys(obj)) {
    clone[key] = deepCloneHash(obj[key], hash); // 递归拷贝属性
  }

  // 5. 将新创建的对象添加到哈希表中
  hash.set(obj, clone);

  // 6. 返回新的对象或数组
  return clone;
}
```
