# 浏览器存储 webStorage

* 分为 localStorage 和 sessionStorage；

* 存储内容大小一般支持 5-10MB 左右（不同浏览器可能还不一样）；

* 浏览器端通过 `Window.sessionStorage` 和 `Window.localStorage` 属性来实现本地存储机制，其中 `Window` 可以省略；

* webStorage 存储的数据不会自动发送到服务器上 。


```javascript
// 1.该方法接收一个键和值作为参数，会把键值对添加到存储中，如果键名存在，则更新其对应的值
localStorage.setItem('key', 'value')
// 2.该方法接收一个键名作为参数，返回键名对应的值
localStorage.getItem('key')
// 3.该方法接收一个键名作为参数，并把该键名从存储中删除
localStorage.removeItem('key')
// 4.该方法会清空存储中的所有数据
localStorage.clear()
```

* `sessionStorage` 存储的内容会随着浏览器窗口关闭而消失；
* `localStorage` 存储的内容，需要手动清除才会消失（同域共享）；
* ```xxxStorage.getItem(xxx)``` 如果 xxx 对应的 value 获取不到，则返回值是 null；
* ```JSON.stringify(对象)``` 可以把 JS 对象转换成字符串；
* `JSON.parse(字符串对象)` 可以把字符串表示的 JS 对象恢复成 JS 对象；
* ```JSON.parse(null)``` 的结果依然是 null；

### cookie（cookie也是本地存储方式）

* cookie 是某些网站**为了辨别用户身份而储存在用户本地终端上的文本数据**。是为了解决 `HTTP` **无状态**导致的问题，它由服务器生成，发送给客户端保存；
* 它由一个名称（name）、一个值（value）和其它几个用于控制 `cookie` 有效期、安全性、使用范围的可选属性组成；
* 它大小 4k 左右，每次请求都会发送给服务器，容易被窃取。服务器数据库中存有一份 cookie，每次客户端发过去 cookie 后比对一下。
* cookie 的安全性问题：
  * 通过监听未加密的网络窃取 cookie，可以通过 HTTPS 协议设置 Secure 属性；
  * XSS 跨站脚本攻击

### token

* token 是不同的身份验证方式，服务器返回一个签名的 token 给客户端，客户端存起来，每次请求带上这个 token，服务器对 token 解码，判断是否有效；
* token 可以放在 cookie 中，让它每次自动发送，但是不能跨域；也可以存在 webStorage 中

> 相同浏览器下，并且是同源窗口，不同页面可以共享 localStorage，cookies 值；通过跳转的同源页面可以共享 sessionStorage 值。
