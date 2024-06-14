# 代理和反射

## 代理 Proxy

可以给目标对象定义一个关联的代理对象，而这个代理对象可以作为抽象的目标对象来使用。在对目标对象的各种操作影响目标对象之前，可以在代理对象中对这些操作加以控制。

> **代理是目标对象的抽象**

## 创建代理

> **代理是使用 `Proxy` 构造函数创建的。这个构造函数接收两个参数：目标对象和处理程序对象**

```javascript
// 1. 目标对象
const target = {
  id: 'target'
};
// 2. 处理程序对象
const handler = {};

// 3. 创建代理对象
const proxy = new Proxy(target, handler);

// id 属性会访问同一个值 
console.log(target);  // target 
console.log(proxy);   // target 

// 给目标属性赋值会反映在两个对象上 
// 因为两个对象访问的是同一个值 
target.id = 'foo';
console.log(target.id); // foo 
console.log(proxy.id);  // foo 

// 给代理属性赋值会反映在两个对象上 
// 因为这个赋值会转移到目标对象 
proxy.id = 'bar';
console.log(target.id); // bar 
console.log(proxy.id);  // bar 

// hasOwnProperty() 方法在两个地方 
// 都会应用到目标对象 
console.log(target.hasOwnProperty('id')); // true 
console.log(proxy.hasOwnProperty('id'));  // true 

// 严格相等可以用来区分代理和目标 
console.log(target === proxy); // false 
```

## 捕获器 trap

> **捕获器就是在处理程序对象 (handler) 中定义的“基本操作的拦截器”**

```javascript
// 目标对象
const target = {
  foo: 'bar'
};

// 处理程序对象
const handler = {
  // 定义一个 get() 捕获器，捕获器在处理程序对象中以方法名为键
  get() {
    return 'handler override';
  }
};

// 创建代理对象
const proxy = new Proxy(target, handler); 

console.log(target.foo);  // bar 
console.log(proxy.foo);   // handler override

// get() 捕获器会接收到目标对象、要查询的属性和代理对象三个参数
get(trapTarget, property, receiver) {};
```

> **有了三个参数，重建被捕获方法的原始行为**

```javascript
// 重建被捕获方法的原始行为
const target = {
  foo: 'bar'
};
const handler = {
  get(trapTarget, property, receiver) {
    return trapTarget[property];
  }
};
const proxy = new Proxy(target, handler);
console.log(proxy.foo);  // bar 
console.log(target.foo); // bar 
```

## 反射 Reflect

> 处理程序对象中所有可以捕获的方法都有对应的反射（Reflect）API 方法。这些方法与捕获器拦截的方法具有相同的名称和函数签名，而且也具有与被拦截方法相同的行为。
>
> 反射可以更方便程序员重建被捕获方法的原始行为 (修改捕获方法)

```javascript
// 目标对象
const target = {
  foo: 'bar'
};

// 处理程序对象
const handler = {
  get() {
    console.log(...arguments); // { foo: 'bar' } foo { foo: 'bar' }
    // 目标对象，查询的属性，代理对象
    return Reflect.get(...arguments);
  }
};

// 创建代理对象
const proxy = new Proxy(target, handler);

console.log(proxy.foo);   // bar 
console.log(target.foo);  // bar 

// 简写
const proxy = new Proxy(target, Reflect); 
```

```javascript
// 使用反射重建被捕获方法的原始行为
const target = {
  foo: 'bar',
  baz: 'qux'
};

const handler = {
  get(trapTarget, property, receiver) {
    let decoration = '';
    if (property === 'foo') {
      decoration = '!!!';
    }
    return Reflect.get(...arguments) + decoration;
  }
};

const proxy = new Proxy(target, handler);

console.log(proxy.foo);   // bar!!! 
console.log(target.foo);  // bar 
console.log(proxy.baz);   // qux 
console.log(target.baz);  // qux 
```

## 代理捕获器与反射方法

> 代理可以捕获 13 种不同的基本操作

* `get(target, property, receiver)`
* `set(target, property, value, receiver)`
* `has(target, property)`
* `defineProperty(target, property, descriptor)`
* `getOwnPropertyDescriptor()`
* `deleteProperty()`
* `ownKeys()`
* `getPrototypeOf()`
* `setPrototypeOf()`
* `isExtensible()`
* `preventExtensions()`
* `apply()`
* `construct()`

## 代理模式

1️⃣ 跟踪属性访问

> **通过捕获 get、set 和 has 等操作，可以知道对象属性什么时候被访问、被查询**

```javascript
const user = {
  name: 'Jake'
};

const proxy = new Proxy(user, {
  get(target, property, receiver) {
    console.log(`Getting ${property}`);
    return Reflect.get(...arguments);
  },
  set(target, property, value, receiver) {
    console.log(`Setting ${property}=${value}`);
    return Reflect.set(...arguments);
  }
});

proxy.name;     // Getting name
proxy.age = 27; // Setting age=27
```

2️⃣ 隐藏属性

> **代理的内部实现对外部代码是不可见的，因此要隐藏目标对象上的属性也轻而易举**

```javascript
const hiddenProperties = ['foo', 'bar'];
const targetObject = {
  foo: 1,
  bar: 2,
  baz: 3
};
const proxy = new Proxy(targetObject, {
  get(target, property) {
    if (hiddenProperties.includes(property)) {
      return undefined;
    } else {
      return Reflect.get(...arguments);
    }
  },
  has(target, property) {
    if (hiddenProperties.includes(property)) {
      return false;
    } else {
      return Reflect.has(...arguments);
    }
  }
});
// get()
console.log(proxy.foo);  // undefined
console.log(proxy.bar);  // undefined
console.log(proxy.baz);  // 3 
// has()
console.log('foo' in proxy);  // false
console.log('bar' in proxy);  // false
console.log('baz' in proxy);  // true 
```

3️⃣ 属性验证

4️⃣ 函数与构造函数参数验证

5️⃣ 数据绑定与可观察对象

> **通过代理可以把运行时中原本不相关的部分联系到一起。这样就可以实现各种模式，从而让不同的代码互操作**

```javascript
// 把 userList 和 User关联起来，每次创建 User 实例的时候，都会把这个实例添加到 userList 数组中
const userList = [];

class User {
  constructor(name) {
    this.name_ = name;
  }
}

const proxy = new Proxy(User, {
  construct() {
    const newUser = Reflect.construct(...arguments);
    userList.push(newUser);
    return newUser;
  }
});

new proxy('John');
new proxy('Jacob');
new proxy('Mike');
console.log(userList);
// [User { name_: 'John' }, User { name_: 'Jacob' }, User { name_: 'Mike' }]
```

> **把集合绑定到一个事件分派程序，每次插入新实例时都会发送消息**

```javascript
const userList = [];

function emit(newValue) {
  console.log(newValue);
}

const proxy = new Proxy(userList, {
  set(target, property, value, receiver) {
    const result = Reflect.set(...arguments);
    // Vue 3 就是在这里执行解析模板的操作吧
    if (result) {
      emit(Reflect.get(target, property, receiver));
    }
    return result;
  }
});

proxy.push('John'); // 会有两行输出，解释如下：
// John   第一次 set 数组对象的 0 属性，value 为 "John"
// 1      第二次 set 数组对象的 length 属性，value 为 "1"
proxy.push('Jacob');
// Jacob  第一次 set 数组对象的 1 属性，value 为 "Jacob"
// 2      第二次 set 数组对象的 length 属性，value 为 "2"
```

