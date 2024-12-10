# 流程控制

## 条件语句

```js
// if 条件语句
if (表达式) {  
  // do something 
} else { };

// switch 条件语句
switch (表达式) {
  case value1:
    yuju1;
    break; // 如果 case 里面没有 break，则不会退出，而是继续执行下一个 case
  case value2:
    yuju2;
    break;
  default:
    yuju3;
```

## 三元表达式

`条件表达式 ? 表达式1 : 表达式2`

如果条件表达式结果为真，则返回表达式 1 的值，如果条件表达式结果为假，则返回表达式 2 的值

## 循环语句

```js
// for 循环
for (let i = 1; i <= 100; i++) {
  // 语句;
}

// while 循环
while (表达式) {
  // 循环体;
  // 更新表达式;
}

do {
  // 循环体;
  // 更新表达式;
} while (条件表达式)

// for ... in 遍历对象的可枚举属性（包括原型链上的可枚举属性）
// 可以用来遍历对象、数组、字符串，获取属性的键名（一般用于遍历对象，遍历数组时，获取的是字符串类型的下标"0"）

// for ... of 遍历可迭代对象 (实现了迭代器的对象)
// 可以用来遍历数组和字符串，获取属性值（不可遍历普通对象）因为对象内部没有迭代器 iterator
```

`continue` 立即跳出本次循环，继续下一次循环

`break` 跳出整个循环

## 错误处理

- `try` 语句允许我们定义在执行时进行错误测试的代码块

- `catch` 语句允许我们定义当 try 代码块发生错误时，所执行的代码块

- `throw` 语句允许您创建自定义错误，new 一个内置的 Error 对象实例

- `finally` 使您能够执行代码，在 try 和 catch 之后，无论结果如何


```js
try {
  tryCode; // 尝试执行代码块
} catch (error) {
  catchCode; // 捕获错误的代码块
} finally {
  finallyCode; // 无论 try|catch 结果如何都会执行的代码块
}

function demo() {
  const date = Date.now();
  if (date % 2 === 0) {
		console.log("OK");
  } else {
    throw new Error("错误"); // 抛出一个错误对象
  }
}

// try catch 通常和 axios 一起使用，配合 async await 处理异步请求
// 不过可以使用请求拦截器批量处理所有错误 
async function getDog() {
  try {
    const result = await axios.get('url');
    dogList.push(result.data.message);
  } catch (error) {
    alert (error);
  }
}
```
