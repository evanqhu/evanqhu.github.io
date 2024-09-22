# 数据代理和数据劫持

## MVVM 模型

<img src="https://s2.loli.net/2024/06/14/ja3g9LhxTk24CA5.png" alt="mvvm.png" style="zoom:33%;" /> 

M：模型 (Model) ：data 中的数据；
V：视图 (View) ：模板代码，即 template 标签中的内容；
VM：视图模型 (ViewModel)：Vue 实例对象

* data 中所有的属性，最后都出现在了 vm 身上
* vm 身上所有的属性及 Vue 原型上所有属性，在 Vue 模板中都可以直接使用

## Object.defineProperty

* 给对象添加属性，直接用 “=” 添加的时候，添加的属性是不可以枚举的
* 使用 JS 实现**给对象添加或修改属性**：`Object.defineProperty(obj, prop, 属性描述符 descriptor)`
*  可以添加 getter 和 setter 以实现响应式

```javascript
// Vue 响应式原理
let number = 18;

// 1. 数据属性 (4 项)
Object.defineProperty(person, 'age', {
  value: 18,
  writable: true,  // 控制属性是否可以被修改，默认值是 false
  enumerable: true,  // 控制属性是否可以枚举，默认值是 false
  configurable: true  // 控制属性是否可以被删除，默认值是 false
})

// 2. 访问器属性 (4 项)
Object.defineProperty(person, 'age', {
  enumerable: true,  // 控制属性是否可以枚举，默认值是 false
  configurable: true,  // 控制属性是否可以被删除，默认值是 false
  // 当有人读取 person 的 age 属性时，get 函数(getter)就会被调用，且返回值就是 age 的值
  get() {
    // 收集依赖
    console.log('有人读取age属性了');
    return number;
  },
  // 当有人修改 person 的 age 属性时，set 函数(setter)就会被调用，且会收到修改的具体值
  set(newVal) {
    // 如果新的值和旧的值相等就不用修改
    if (newVal === number) return;
    // 触发依赖更新
    console.log('有人修改了age属性，且值是', newVal);
    number = newVal;
  }
})

// 定义属性时两种属性只能二选一
```

## 数据代理

* 数据代理：通过一个对象 B 代理对另一个对象 A 中属性的操作，给对象 B 添加对象 A 的属性即可
* **Vue 中的数据代理**：通过 `vm` 对象来代理 `vm._data` 对象中属性的操作，添加了getter 和 setter
*  ~~`vm._data` 中的数据来自于 data 配置项，也运用到了数据代理，添加了getter 和 setter，相当于 `vm._data` 和 vm 中都有 data 中数据的 getter 和 setter。~~
*  `vm._data` 中的数据来自于 data 配置项，使用的是**数据劫持**，为了实现响应式

<img src="https://s2.loli.net/2024/06/14/sXQ1nYPga9HMcI7.png" alt="data-proxy.png" style="zoom:20%;" />   

## 数据劫持 (监听)

> **Vue 2 响应式原理**

### 1️⃣ Vue 监测对象中数据的改变

1. 通过一个 `Observer` 加工劫持 data 对象中的数据，添加 getter 和 setter，**在 setter 中加入重新解析模板操作**
2. 将加工后的数据给 `vm._data`
3. 使用数据代理，把 `vm._data` 下的数据给到 vm

> 通过一个 Observer 劫持 data 中的数据并发送给 `vm._data`
>
> Obeserver 的目的是将普通的数据转换成带有 getter 和 setter 的数据，实现响应式

```javascript
// Vue 数据劫持的基本原理 (实现响应式)

// 1. 数据
const data = { name:'Vue', version:'2.0' };

// 2. 创建一个监视的实例对象，用于监视 data 中属性的变化
const obs = new Observer(data); // 订阅者

// 3. 观察者 obs 上具有 data 的所有属性和对应的 getter 和 setter；将 obs 赋给 data 和 vm._data
const vm = {};
vm._data = data = obs; // 使用 obs 包装 data

// 创建一个 Observer 构造函数，Observer 复制了 data 对象的所有数据，并添加了 getter 和 setter
// 没有考虑递归
function Observer(obj){
  // 汇总对象中所有的属性形成一个数组
  const keys = Object.keys(obj);
  // 遍历属性，添加 getter 和 setter
  keys.forEach((key)=>{
    // this 是 Observer 的实例对象 obs，用于监视的实例对象！！！
    Object.defineProperty(this, key, {
      get() { 
        return obj[key];
      },
      set(newVal) {
        // 1. 如果新的值和旧的值相等就不用修改
        if (newVal === obj[key]) return;
        // 2. 新的值和旧的值不相等
        obj[key] = newVal;
        // 在 setter 中触发重新解析模板操作
        console.log('数据发生变化了，我要去解析模板，生成虚拟 DOM，接着忙了');
        // 一般是调用原生的 DOM 方法，修改页面
      }
    })
  })
  // 每个 Observer 实例中都有一个 Dep
}
```

> 如果想直接为 data 添加 getter 和 setter 可以使用下面方法

```javascript
// 这种方法使用中转变量 value 存储了 obj[key] 的值，避免了无限循环
const data = { name: 'Vue', version: '2.0' };

function Observer(obj) {
  Object.keys(obj).forEach((key) => {
    // 需要用中转变量存储 obj[key] 值，防止死循环
    let value = obj[key];
    
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        console.log(`Getting ${key}!`);
        return value;
      },
      set(newVal) {
        if (newVal === obj[key]) return;
        console.log(`Setting ${key}! 触发解析模板操作`);
        value = newVal;
      }
    })
  })
};

new Observer(data);
```

> 总结：Vue 先劫持 data 对象，添加 getter 和 setter，并在 setter 中调用重新解析模板的操作（每个 setter 中有一个 watcher）；之后将劫持的数据赋给 `vm._data` 对象；然后使用数据代理，将数据赋给 vm 对象做代理，这样就可以直接在 vm 身上拿到 data 中的数据了。

**`Vue.set()`**

* 如果初始化时 vm 的 data 里面没有的属性，需要增加时，要调用 `Vue.set()`，不能直接使用 `vm._data` 添加，不然会没有 getter 和 setter
* 但是注意：**不能使用此方法往 vm 和 vm.data 中添加属性**，只能往其下一层添加

```javascript
// Vue.set(target, key, val) or vm$set(target, key, val)
Vue.set(vm._data.student, 'sex', '男')
Vue.set(vm.student, 'sex', '男')
vm$set(vm.student, 'sex', '男')
```

### 2️⃣ Vue 监测数组中数据的改变

* Vue 没有为 data 中**数组**里面的元素匹配 getter 和 setter，所以通过索引修改数组中的元素时，无法触发响应式；
* 只有调用这 7 个数组身上的方法，才能触发响应式 `[push, pop, shift, unshift, splice, sort, reverse]`，Vue 对这 7 个方法进行了包装。或者直接使用 `Vue.set()` 方法。

### 3️⃣ Vue 2 响应式原理

采用数据劫持结合观察者模式的方式实现响应式，也借鉴了发布订阅模式的思想

> obs 身上具有 data 的所有属性，读取或修改这些属性时就会触发 getter 或 setter

```javascript
const data = { name: 'Vue', version: '2.0' };

/** Vue 2 这里用了递归 */
function Observer(obj) {
  Object.keys(obj).forEach((key) => {
    // 如果写 Object.defineProperty(obj, key, {}) 就会出现超出最大回调栈错误
    // 因为下方 getter 中的 return obj[key] 会再次触发 getter 操作
    // 所以不能把 getter 加在 data 自身，而是放在实例 obs 上
    Object.defineProperty(this, key, {
      enumerable: true,
      configurable: true,
      get() {
        console.log(`Getting ${key}!`);
        return obj[key];
      },
      set(newVal) {
        if (newVal === obj[key]) return;
        console.log(`Setting ${key}! 触发解析模板操作`);
        obj[key] = newVal;
      }
    })
  })
}

const obs = new Observer(data);
obs.name; // Getting name!
obs.name = 'React'; // Setting name=React! 触发解析模板操作
```

### 4️⃣ Vue 3 响应式原理

```javascript
// 使用代理和反射 API 替代 Object.defineProperty
const data = { name: 'Vue', version: '2.0' };

const proxy = new Proxy(data, {
  get(target, property, receiver) {
    console.log(`Getting ${property}!`);
    return Reflect.get(...arguments);
  },
  set(target, property, value, receiver) {
    console.log(`Setting ${property}=${value}! 触发解析模板操作`);
    return Reflect.set(...arguments);
  }
});

proxy.name; // Getting name!
proxy.name = 'React'; // Setting name=React! 触发解析模板操作
```

## 双向绑定原理

### 1️⃣ 发布订阅模式

> 以全局事件总线为例

```javascript
class Vue {
  constructor() {
    // 用来存储 事件-事件回调函数 { 'myclick': [fn1, fn2, fn3] } 
    this.subs = {};
  }
  // 【订阅者】实现 $on 方法
  $on(type, fn) {
    this.subs[type] = this.subs[type] ? [...this.subs[type], fn] : [fn];
  }
  // 【发布者】实现 $emit 方法
  $emit(type) {
    // 首先得判断该方法是否存在
    if (this.subs[type]) {
      // 获取到参数数组 (从第二位开始截取参数，因为第一个参数是 type)
      // arguments 不是真正的数组，不能直接使用 slice 方法
      // const args = Array.from(arguments).slice(1);
      const args = Array.prototype.slice.call(arguments, 1);
      // 循环队列调用 fn
      this.subs[type].forEach((fn) => fn(...args));
    } else {
      console.log('该事件不存在');
    }
  }
}

// 使用
const eventHub = new Vue()
// 使用 $on 添加一个 sum 类型的 方法到 subs['sum']中
eventHub.$on('sum', function () {
  let count = [...arguments].reduce((x, y) => x + y)
  console.log(count)
})
// 触发 sum 方法
eventHub.$emit('sum', 1, 2, 4, 5, 6, 7, 8, 9, 10)
```

### 2️⃣ 观察者模式

```javascript
/** 发布者 (被观察者-主题-老师) */
class Subject {
  constructor() {
    // 1. 被观察者拥有所有观察者的完整数组
    this.observerList = []; // 观察者列表
  }

  // 添加观察者
  addObs(obs) {
    // 判断观察者是否有和存在更新订阅的方法
    if (obs && obs.update) {
      // 添加到观察者列表中
      this.observerList.push(obs);
    }
  }

  // 通知观察者，发送消息
  notify(msg) {
    // 2. 事件发布时遍历观察者列表，通知每一个观察者 (调用观察者的更新事件函数)
    this.observerList.forEach(obs => obs.update(msg));
  }
}

/** 观察者 (学生) */
class Observer {
  constructor(name) {
    this.name_ = name;
  }
  
  // 定义更新事件函数
  update(msg) {
    console.log(`目标更新了，我${this.name_}收到了这条消息：${msg}`);
  }
}

// 创建发布者
const sub = new Subject();

// 创建观察者
const obs1 = new Observer('张三');
const obs2 = new Observer('李四');

// 把观察者添加到列表中
sub.addObs(obs1);
sub.addObs(obs2);

// 发布者开启了通知 (发送了消息)，每个观察者者都会自己触发 update 更新事件
sub.notify('这是一条消息');
```

1. `new Vue()` 首先执行初始化，对 `data` 执行响应化处理，这个过程发生 `Observer` 中；
2. 同时对模板执行编译，找到其中动态绑定的数据，从 `data` 中获取并初始化视图，这个过程发生在 `Compile` 中；
3. 同时定义⼀个更新函数和 `Watcher` ，将来对应数据变化时 `Watcher` 会调用更新函数；
4. 由于 `data` 的某个 `key` 在⼀个视图中可能出现多次，所以每个 `key` 都需要⼀个管家 `Dep` 来管理多个 `Watcher`；
5. 将来 data 中数据⼀旦发生变化，会首先找到对应的 `Dep`，通知所有 `Watcher` 执行更新函数；
