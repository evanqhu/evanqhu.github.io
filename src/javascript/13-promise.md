# Promise 期约

## 前置知识

* 函数对象：将函数作为对象使用
* 实例对象：通过 `new` 构造函数或类产生的对象
* 同步回调函数：立即在主线程执行，不会放入回调队列，如数组遍历相关的回调 `arr.forEach(() => {})`
* 异步回调函数：不会立即执行，会放入回调队列中等待主线程执行完毕再执行，如定时器，ajax，Promise 的回调

```javascript
// 函数对象
function Person() {};
Person.age = 18;
console.log(Person.age);

// 实例对象
const p = new Person();
```

## 异步编程

同步就是按照代码书写的顺序执行，异步不按照代码顺序执行，异步的执行效率更高；浏览器主线程作为一个线程，不能够同时接受多方面的请求。所以当一个事件没有结束时，界面将无法处理其他请求；我们常常用子线程来完成一些可能消耗时间足够长以至于被用户察觉的事情。

因为子线程独立于主线程，所以即使出现阻塞也不会影响主线程的运行。但是子线程有一个局限：一旦发射了以后就**会与主线程失去同步，我们无法确定它的结束**，如果结束之后需要处理一些事情，比如处理来自服务器的信息，我们是无法将它合并到主线程中去的。为了解决这个问题，JavaScript 中的异步操作函数往往通过**回调函数**来实现异步任务的结果处理。

**回调函数**就是一个函数，它是在我们启动一个异步任务的时候就告诉它：等你完成了这个任务之后要干什么。这样一来主线程几乎不用关心异步任务的状态了，他自己会善始善终。Promise 之前的 ajax 和定时器都是异步解决方案。

例如 `setTimeout(callback, t)` 就会启动一个子线程，执行回调函数

### Promise 类

Promise 是一个 ES6 提供的**类**，或者说是一个**构造函数**，目的是更加优雅地书写复杂的异步任务。将“函数瀑布”变成顺序格式的代码。

> **Promise 的实例对象可以用来封装一个异步操作，并可以获取其成功或失败的值**

1️⃣ 起始函数 `executor`

* Promise 构造函数只有一个参数，是一个**同步回调函数**，这个函数在构造之后会立即在主线程被**同步**运行，所以我们称之为**起始函数 executor** 函数
* **起始函数**包含两个函数参数， `resolve()` 和 `reject()` 函数
* 在 Promise 的 `executor` 函数体中书写**异步任务**，之后调用 `resolve()` 和 `reject()`
* 当调用 `resolve()`，表示异步任务成功，Promise 状态变为成功态；`resolve()` 中可以放置一个参数用于指定成功的 `value` 值
* 当调用 `reject()`，表示异步任务失败，Promise 状态变为失败态；`reject()` 参数中一般会传递一个错误对象用于指定失败的 `reason` 值
* `resolve()` 和 `reject()` 的作用域只有起始函数，不包括 `then` 以及其他序列；
* `resolve()` 和 `reject()`  并不能够使起始函数停止运行，如果希望起始函数在 `resolve` 之后停止，别忘了 `return`；

2️⃣ Promise 实例的方法

* Promise 类的原型上有 `then` `catch` `finally` 三个方法，这三个方法的参数都是回调函数
  * `then()` 用于指定 Promise 成功和失败的回调 (一般只指定成功的回调)
  * `catch()` 用于指定 Promise 失败时的回调
  * `finally()` 用于指定 Promise 最终执行的回调
* `then()` 中的回调函数是**异步回调函数**，**then 方法返回一个新 Promise 实例**，因此可以继续**链式调用** ，解决传统的回调地狱的问题
  * 如果 then 指定的回调执行后返回一个非 Promise 值，如 undefined，那么新 Promise 实例的状态为成功，值为 undefined
  * 如果 then 指定的回调执行后返回一个 Promise 实例 p，那么新 Promise 实例的状态和值与 p 一致
  * 如果 then 指定的回调执行后抛出异常，那么新 Promise 实例的状态为失败，值为抛出的异常

* `then()` 方法传入两个函数参数，第一个是成功的回调函数，第二个是失败的回调函数（我们一般只传成功的回调）
* 原始 Promise 实例的**状态只能改变一次**，从 pending 到 fulfiled 或从 pending 到 rejected；
* 指定多个失败或成功的回调函数，都会依次调用 **(回调队列)**，注意是多个 then 的回调几乎同时推入回调队列，同时执行

3️⃣ 其他

- Promise 的**错误穿透**
  - 当使用 Promise 的 then 方法链式调用时，可以在最后用 catch 指定一个失败的回调；前面任何操作出现错误，都会传到最后失败的回调中处理
- 什么时候适合用 Promise 而不是传统回调函数？
  - 当**需要多次顺序执行异步操作的时候**，例如，如果想通过异步方法先后检测用户名和密码，需要先异步检测用户名，然后再异步检测密码的情况下就很适合 Promise
- Promise 只不过是一种更良好的编程风格，没有把异步转换为同步
- 什么时候我们需要再写一个 then 而不是在当前的 then 接着编程？
  - 当你又需要调用一个异步任务的时候

```javascript
new Promise((resolve, reject) => {
  // 要做的事 (同步代码，里面开启一些异步任务)
  resolve(); // or reject()
}).then(
	value => {}, // 成功的回调 (异步回调)
  reason => {} // 失败的回调 (异步回调)
)

new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("First");
    resolve();  // 表示一切正常，继续执行
  }, 1000);
}).then(() => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Second");
      resolve();
    }, 1000);
  });
}).then(() => {
  setTimeout(() => {
    console.log("Third");
  }, 3000);
});

new Promise((resolve, reject) => {
  console.log(1111);
  resolve(2222);  // 表示一切正常，把 2222 传递给下一个 then 的 value，继续执行
}).then(value => {
  console.log(value);
  return 3333;  // 表示一切正常，把 3333 传递给下一个 then 的 value
}).then(value => {
  console.log(value);
  throw "An error"; // 抛出异常和调用 reject 类似
}).catch(err => {
  console.log(err);
});

// 1111 2222 3333 An error 几乎同时执行
```

```javascript
// 错误穿透
const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(-1);
  }, 1000);
});

p.then(
	value => { console.log('成功了 1'， value); return 'b'; },
  // reason => { console.log('失败了 1'， reason); return -2; },
  reason => throw reason // 系统底层补了这么一句代码，指定失败的回调，用于错误穿透
)
.then(
	value => { console.log('成功了 2'， value); return 'c'; },
  // reason => { console.log('失败了 2'， reason); return -3; },
  reason => throw reason // 系统底层补了这么一句代码，指定失败的回调，用于错误穿透
)
.catch(
	reason => { console.log('失败了'， reason); }
)
```

## Promise 函数

把 Promise 放在函数的返回值中，这样函数就成了一个异步函数，可以在调用函数之后使用 then 方法，也可以放在 await 之后，相当于用 Promise 封装了一个异步操作。

```javascript
// Promise 函数 (解决回调地狱)
function print(delay, message) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(message);
      resolve();
    }, delay);
  });
}
// 调用 Promise 函数
print(1000, "First").then(() => {
  return print(1000, "Second");
}).then(function () {
  print(1000, "Third");
});

// 改写异步函数
async function asyncFunc() {
  await print(1000, "First");  // await 后面一般跟一个 Promise 实例对象
  await print(1000, "Second");
  await print(1000, "Third");
}
asyncFunc();
```

## 异步函数 async await

异步函数 async function 中可以使用 await 指令，await 指令后一般跟着一个 Promise 实例，异步函数会在这个 Promise 运行中暂停，直到其运行结束再继续运行。

* **async 修饰的函数，函数的返回值一定为 Promise 实例**
* Promise 实例的结果由 async 函数执行的返回值决定
* await 指令后的表达式一般是一个 Promise 实例，也可以是其它值
  * 如果表达式是 Promise 对象，那么 await 后的返回值是 Promise 成功的值
  * 如果表达式是 Promise 对象，且失败了，就会抛出异常，需要通过 try catch 来捕获处理
  * 如果表达式是其它值，直接将此值作为 await 的返回值
* await 的底层原理还是将代码翻译成 then

```js
async function demo() {
  const result = await p;
  console.log('异步任务执行完成');
  console.log(result);
}

// 底层翻译成
function demo() {
  p.then(
  	result => {
      console.log('异步任务执行完成');
      console.log(result;)
    }
  )
}
```

```javascript
async function fn1() {
  console.log(1);
  await fn2();
  console.log(2); // 阻塞
}

async function fn2() {
  console.log('fn2');
}

fn1();
console.log(3);

// 1 fn2 3 2  await 阻塞后面代码的运行，它相当于一个 Promise，then 方法会阻塞

console.log(fn2()); // Promise { undefined }
```

Promise 解决了传统回调函数的回调地狱的问题，但是导致了纵向的回调链，遇到复杂的业务场景也不美观；async await 的代码更简洁，看起来像同步代码，是基于 Promise 实现的

## Promise API

1️⃣ `Promise.all(PromiseArr)`

**只有当所有 Promise 都成功时，它才会成功；如果有任何一个 Promise 失败，它就会失败**

传入包含 n 个 Promise 的数组，返回一个新的 Promise 实例，只有**所有的 Promise 都成功才成功**，且成功的 value 是所有 Promise 成功的 value 的数组，只要有一个失败了就直接失败。并且只要检测到失败的，就立即返回失败的 Promise。

2️⃣ `Promise.any(PromiseArr)`

**只要其中一个 Promise 成功，返回的 Promise 就会成功；如果所有的 Promise 都失败，则返回失败**

3️⃣ `Promise.allSettled(PromiseArr)`

**等待所有 Promise 都完成（无论成功还是失败），并返回一个包含每个 Promise 结果的数组**

4️⃣ `Promise.race(PromiseArr)`

**只要其中一个 Promise 解决或拒绝，返回的 Promise 实例就会解决或拒绝，也就是说第一个完成的 Promise 的结果状态就是最终的结果状态**

传入包含 n 个 Promise 的数组，返回一个新的 Promise，**第一个完成的 Promise 的结果状态**就是最终的结果状态，和 all 方法一样，获取到当第一个完成的 Promise 的结果状态，就立即返回。

5️⃣ `Promise.resolve()`

**用于快速返回一个状态为 fulfilled 的 Promise 实例对象**

```js
const p1 = Promise.resolve(200);
const p2 = Promise.reject(404);
```

6️⃣ `Promise.reject()`

**用于快速返回一个状态为 rejected 的 Promise 实例对象**

## 任务队列和事件循环

**任务队列**：JS 是单线程的语言，为了实现不阻塞，可以使用事件循环。在 JS 中，所有任务可以分成两种

* 同步任务 (synchronous)：在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务
* 异步任务 (asynchronous)：不进入主线程、而进入"任务队列" (task queue) 的任务，只有"任务队列"通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行 **(异步永远和队列挂钩)**

```javascript
for (let i = 0; i < 3; i++) {
  setTimeout(function() { console.log(i) }, 1000);
}
console.log(i);
// 先输出一个3，接着1秒之后，一次性输出三个3。三个定时器几乎同时设置的
```

**事件循环：**同步任务进入主线程，异步任务进入任务队列，主线程内的任务执行完毕为空，会去任务队列读取对应的任务，推入主线程执行。上述过程的不断重复就事件循环。

事件循环又叫做消息循环，是浏览器渲染主线程的工作方式。

在 Chrome 的源码中，它开启一个不会结束的 for 循环，每次循环从消息队列中取出第一个任务执行，而其他线程只需要在合适的时候将任务加入到队列末尾即可。

过去把消息队列简单分为宏队列和微队列，这种说法目前已无法满足复杂的浏览器环境，取而代之的是一种更加灵活多变的处理方式。

根据 W3C 官方的解释，每个任务有不同的类型，同类型的任务必须在同一个队列，不同的任务可以属于不同的队列。不同任务队列有不同的优先级，在一次事件循环中，由浏览器自行决定取哪一个队列的任务。但浏览器必须有一个微队列，微队列的任务一定具有最高的优先级，必须优先调度执行。

<img src="https://s2.loli.net/2024/06/13/GM2aciYh7UoKzCN.png" alt="event-loop.png" style="zoom: 50%;" /> 

**异步任务**也可以细分为两种，一种宏任务（MacroTask）也叫Task，一种叫微任务（MicroTask）。

* 宏任务：一般 script 代码，用户交互事件、setTimeout、setInterval、requestAnimationFrame (浏览器独有)、I/O、UI rendering (浏览器独有)等；（用户调用的）
* 微任务：Promise 相关任务，process.nextTick (JS 调用的)

**任务执行流程**

1. 先执行同步任务，全部执行完；
2. 执行微任务，如果在执行微任务的过程中，又产生了微任务，那么会加入到队列的末尾，也会在这个周期被调用执行，直到微任务队列为空停止；
3. 微任务队列为空时，取一个宏任务执行；
4. 宏任务执行过程中遇到微任务会添加到微任务队列中，待这个宏任务执行完毕后，再去取微任务；如果有微任务，则执行，如果没有，则再取宏任务执行。（每次要执行宏队列里面的一个任务之前，先看微队列里面是否有待执行的任务，如果有则先执行微任务）

```javascript
setTimeout(() => {
  console.log(0);
}, 0);

new Promise((resolve, reject) => {
  console.log(1);
  resolve()
}).then(() => {
  console.log(2);
  new Promise((resolve, reject) => {
    console.log(3);
    resolve()
  }).then(() => {
    console.log(4);
  }).then(() => {
    console.log(5);
  })
}).then(() => {
  console.log(6);
})

new Promise((resolve, reject) => {
  console.log(7);
  resolve()
}).then(() => {
  console.log(8);
})

// 输出结果： 172384650
```

事件循环又叫做消息循环，是浏览器渲染主线程的工作方式。

在 Chrome 的源码中，它开启一个不会结束的 for 循环，每次循环从消息队列中取出第一个任务执行，而其他线程只需要在合适的时候将任务加入到队列末尾即可。

过去把消息队列简单分为宏队列和微队列，这种说法目前已无法满足复杂的浏览器环境，取而代之的是一种更加灵活多变的处理方式。

根据 W3C 官方的解释，每个任务有不同的类型，同类型的任务必须在同一个队列，不同的任务可以属于不同的队列。不同任务队列有不同的优先级，在一次事件循环中，由浏览器自行决定取哪一个队列的任务。但浏览器必须有一个微队列，微队列的任务一定具有最高的优先级，必须优先调度执行。

* 异步回调函数要执行的时候才会推入到队列
* 指定 Promise 成功或失败的回调函数，如果状态还没改变，回调先挂载在自身，当状态改变后，回调被推入到微队列
