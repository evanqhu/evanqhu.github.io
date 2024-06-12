# 类和对象 Object

## 创建类

JavaScript 类是 JavaScript 对象的模板；类的本质是一个函数；构造函数的另一种写法

```javascript
class Car { // 使用关键字 class 创建类
  // 类的共有属性放到 constructor 里面
  constructor(name, year) { // 构造函数，在 new 的时候自动调用该函数
    this.uname = name;
    this.year = year;
  } // 不能加逗号
  sing(song) { console.log(this.uname + song) }
  methods...
}

// 创建一个对象，使用new关键字，对象的实例化
const myCar1 = new Car("Ford", 2014);
```

## 类的继承

* 子类通过 extends 继承父类的属性和方法；
* constructor 里面的 this 指向的是创建的实例对象；方法中的 this 指向的是方法的调用者（子类继承父类的方法，方法的调用者还是父类）；
* super 关键字是用于访问和调用对象父类上的函数。可以用于调用父类的构造函数，也可以调用普通函数。

```javascript
class Father { // 父类
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  sum() { console.log(this.x + this.y) } // 父类的属性和方法
}

// 继承
class Son extends Father {
  constructor(x, y) { 
    super(x, y) // 调用了父类中的构造函数，将这里的 x 和 y 传递给父类
  }
}
Son.sum(x, y) // sum 方法是父类中的方法，x 和 y 先传递给子类的构造函数，再通过 super 传递给父类的构造函数

class Son extends Father {
  constructor(x, y) {
    // 利用super 调用父类的构造函数；super 必须在子类this之前调用
    super(x, y); // 子类调用【父类】的方法时就用这里的xy
    this.x = x; this.y = y; // 子类调用【自己】的方法时就用这里的xy
  }
  subtract() { console.log(this.x - this.y) }
}
```

## 创建对象

对象由**属性**和**方法**组成，一个属性或方法就是一个键值 `key-value` 对；
对象分为：自定义对象；内置对象：如 Dtae、Math；浏览器对象：如 Window、Location

```jsx
// 1.字面量创建对象（大括号）
const obj = {
  uname: '张三',
  age: 18,
  sayHi : function() { console.log('hi') }
}
// 多个属性或方法中间用逗号隔开，方法冒号后面是一个匿名函数
obj.uname // 用该方法时，属性 uname 是字符串，不可以是变量
obj['uname'] // [] 中可以写变量 
obj.sayHi()

// 2.new Object创建对象
const obj = new Object();
obj.uname = '张三';
obj.age = 18;
obj.sayHi = function() {}

// 3.构造函数创建对象（可复用）它的高级版就是类 Class
function Star(uname, age, sex) {
  this.name = uname
  this.age = age
  this.sex = sex
}
const ldh = new Star('刘德华', 18, '男');
// 构造函数名首字母大写
// 构造函数不需要 return
// 调用构造函数必须使用 new
// 利用构造函数创建对象的过程称为对象的实例化
```

## 对象方法

```javascript
// obj.hasOwnProperty(key) 判断对象是否具有某个键，而且是在其自身，不是原型链上的
// for in 遍历对象时也会返回其原型链上的属性
// (key in obj) 也会返回一个布尔值

for (const key in obj) { // 遍历对象
  console.log(key); // 得到属性名
  console.log(obj[key]); // 得到属性值
}

// Object.keys(obj) 和 Object.values(obj) 分别返回对象 key 数组和 value 数组
// Object.entries(obj) 返回键值对数组
```

> 不可使用 for of 遍历对象
