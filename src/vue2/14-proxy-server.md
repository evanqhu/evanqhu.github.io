# 代理服务器

## 一个最简单的 node 服务器

```javascript
const express = require('express')
const app = express()

// 使用中间件处理静态资源，前端打包好的静态资源就放在 static 文件夹下，服务器根目录
app.use(express.static(__dirname+'/static'))

app.use((request, response, next) => {
	console.log('有人请求服务器1了');
	next()
})

app.get('/students', (request, response) => {
	const students = [
		{ id: '001', name: 'tom', age: 18 },
		{ id: '002', name: 'jerry', age: 19 },
		{ id: '003', name: 'tony', age: 120 },
	]
	response.send(students)
})

app.listen(5000, (err) => {
	if (!err) console.log('服务器1启动成功了,请求学生信息地址为：http://localhost:5000/students');
})
```

## 配置代理服务器

### 方法一：可通过 nginx 配置

### 方法二：在 vue.config.js 中添加如下配置

```js
/******************** vue.config.js ********************/
module.exports = {
  devServer: {
  	proxy: "http://localhost:5000";  // 这里写上需要请求数据的服务器
	}
}

/******************** 组件中 ********************/
axios.get("http://localhost:8080/students")  // 数据是在 5000 端口号的服务器上
```

- 优点：配置简单，请求资源时直接发给前端（8080）即可 ；
- 缺点：不能配置多个代理，不能灵活的控制请求是否走代理；
- 工作方式：若按照上述配置代理，当请求的资源在 public 文件夹下存在的时候，请求不会被代理转发；
- public 文件夹相当于 8080 端口服务器的根路径；

### 方法三：编写 vue.config.js 配置具体代理规则

```js
/******************** vue.config.js ********************/
module.exports = {
	devServer: {
    proxy: {
      '/api1': {  // 请求前缀，匹配所有以 '/api1' 开头的请求路径(紧跟端口号)
        target: 'http://localhost:5000',  // 代理目标的基础路径
        pathRewrite: {'^/api1': ''},  // 转发给服务器的时候去掉请求前缀
        changeOrigin: true,  // 用于控制请求头的 host 值
      },
      '/api2': {  // 匹配所有以 '/api2' 开头的请求路径
        target: 'http://localhost:5001',  // 代理目标的基础路径
        pathRewrite: {'^/api2': ''}
      }
    }
  }
}

/******************** 组件中 ********************/
axios.get("http://localhost:8080/api1/students") // 请求前缀紧跟端口号

// changeOrigin 设置为 true 时，服务器收到的请求头中的 host 为：localhost:5000，与服务器端口号相同
// changeOrigin 设置为 false 时，服务器收到的请求头中的 host 为：localhost:8080，是请求真实的端口号
// changeOrigin 默认值为 true
```

- 优点：可以配置多个代理，且可以灵活的控制请求是否走代理；
- 缺点：配置略微繁琐，请求资源时必须加前缀；

**引入 css 静态资源**

- 方法1：在 src/assets/css 文件夹中放 css 文件，在 App.vue 中通过 import 引入，这样会进行严格的检查，包括字体文件；
- 方法2：在 public/css 文件夹中放 css 文件，在 index.html 中通过 link 引入，就不会报字体错误了；

```html
<link rel="stylesheet" href="<%= BASE_URL %>css/bootstrap.css">
```

