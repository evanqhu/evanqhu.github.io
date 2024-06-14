# 构造函数和原型

在 ES6 之前，通过**构造函数**和**原型**模拟类的实现机制，也就是 ES6 中的类

## 构造函数

* 本质上是一个函数，把对象中公共的属性和方法封装到函数中，用来创建对象，和 `new` 一起使用才有意义
* 身上的 `constructor` 属性指向自身 (这句话可能有问题)
* **new 执行四步骤：**
  * 在内存中创建一个空对象；
  * 让构造函数的 `this` 指向这个空对象（将这个对象的原型设置为构造函数的 prototype 对象）；
  * 执行构造函数里面的代码，给这个空对象添加属性和方法；
  * 返回这个新对象（所以构造函数里面不需要 return ）

```javascript
// 构造函数
function Star(name, age) {
  this.name = name;
  this.age = age;
}

// 创建对象
const ldh = new Star('刘德华', 18);
```

## 静态成员和实例成员

* 构造函数中的属性和方法称为**成员**，可以添加；
* **实例成员**是构造函数内部通过 this 添加的成员，如上方的 name，age；实例成员只能通过实例化的对象来访问，如通过 ldh 来访问实例成员；
* **静态成员**是在构造函数本身上添加的成员，只能通过构造函数访问，不能通过实例化对象来访问。

```javascript
// 构造函数
function Star(name, age) {
  this.name = name; // 实例成员
  this.age = age;
}

Star.sex = '男'; // 静态成员只能通过以下方式添加，不能直接写在构造函数里面

// 给原型对象身上添加属性或者方法，所有的实例成员都可访问到，但 Star 本身直接访问不到
Star.prototype.sing = () => { console.log("singing" ); }                          
```

## 原型

1️⃣ **构造函数的原型对象** `prototype`

**构造函数存在内存浪费问题**，因为函数是复杂类型，会单独开辟一个空间存储函数，这样每次调用构造函数的时候，都会为方法单独开辟一个空间存储相同的函数，造成了浪费；

**为了解决内存浪费的问题，一般将公共属性 (普通类型) 定义在构造函数里面，将公共的方法 (复杂类型) 定义在构造函数的原型对象上**

> **构造函数通过原型分配的函数是所有实例对象共享的**；
>**每个构造函数都有一个 prototype 属性（也叫原型对象），指向另一个对象，这个对象的所有属性和方法都会被构造函数所拥有；**
> **可以把不变的方法定义在原型对象上，这样所有对象的实例就可以共享这些方法；**

```javascript
function Star(name, age) {
  this.name = name;
  this.age = age;
}
Star.prototype.sing = function() { console.log('唱歌ing') }; // 在构造函数的原型对象上添加方法

const ldh = new Star('刘德华', 18)；
ldh.sing; // 实例化的对象都可以使用构造函数原型对象上的方法
```

2️⃣ **对象的原型** `__proto__`

每个对象都有一个属性 `__proto__` 指向其构造函数的 prototype 原型对象，则每个对象可以使用其构造函数的 prototype 原型对象身上的属性和方法。`ldh.__proto__ === Star.prototype`

<img src="https://s2.loli.net/2024/06/13/LRfnilZ9aPw8U1m.png" alt="prototype.png" style="zoom: 33%;" /> 

## constructor 属性

**Star 原型对象**身上有一个 constructor 属性，指向 **Star 构造函数**；用于记录该对象引用于哪个构造函数。

```javascript
// 使用下面的方法只是在 Star 原型对象上添加属性，不会覆盖原来的原型对象
Star.prototype.sing = function() { console.log('我会唱歌') };

// 如果修改了原来的原型对象，给原型对象赋值的是一个对象，则必须利用 constructor 指回原来的构造函数
Star.prototype = {
  constructor: Star,
  sing: function() { console.log('我会唱歌') },
  movie: function() { console.log('我会演电影') }
}
```

## 原型链

只要是对象，就都有 `__proto__` 属性，该属性指向一个原型对象

![prototype-chain.png](https://s2.loli.net/2024/06/13/hrjLycFvb8m7J6I.png) 

## 原型对象的应用

扩展内置对象的方法；
数组和字符串内置对象不能给原型对象覆盖操作，只能是用追加属性和方法的方式；

```javascript
// 给数组添加（追加）自定义求和方法
Array.prototype.sum  = function() {
  let sum = 0;
  for (let i = 0; i < this.length; i++) {
    sum += this[i];
  };
  return sum;
}

const arr = [1, 2, 3]; // 定义数组
const sum = arr.sum(); // 调用原型对象方法
```

## 模拟继承 (构造函数+原型对象)

和上面的 Class 类进行对比

**call() 方法**调用这个函数，并**修改函数运行时 this 的指向** `fun.call(thisArg, arg1, arg2, ...)`
**thisArg 表示当前调用函数 this 的指向对象**
arg 表示传递的其他参数

```javascript
function fn(x) {
  console.log(this.name, '你好啊', x)；
};
const person = {
  name: 'Jack'
};

fn.call(person, 666);
// 输出：Jack 你好啊 666

// apply 方法亦可，不过参数要以为数组的形式传入；bind 方法返回一个新函数，不会调用该函数
```

如何实现继承：
**利用构造函数实现父类的属性，利用原型对象实现父类的方法；**
通过 `call()` 把父类的 this 指向子类的 this。

```javascript
// 1. 父构造函数
function Father(uname, age) {
  // this 指向父构造函数的实例对象
  this.uname = uname;
  this.age = age;
}
Father.prototype.money = function() {
  console.log(100000);
}

// 2. 子构造函数 
function Son(uname, age, score) {
  // 通过 call() 方法，调用父构造函数，并将其 this 指向子类（继承属性）
  Father.call(this, uname, age); // 这里的 this 相当于 Son
  this.score = score;
}

// 3. 原型链实现继承方法
Son.prototype = new Father(); // 子构造函数的原型对象指向父构造函数的实例对象
Son.prototype.constructor = Son; // 更改了原型对象，要利用constructor指回原来的构造函数

const son = new Son('刘德华', 18, 100);
son.money()
```

<img src="https://s2.loli.net/2024/06/13/1xgJns2i64PCNkI.png" alt="simulated-inheritance.png" style="zoom: 25%;" /> 
