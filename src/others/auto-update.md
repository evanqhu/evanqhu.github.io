# 自动检测更新

在生产环境下，实现项目更新后提示用户刷新页面

## 思路分析

### 方法一：通过打包文件 hash 值判断

1. 项目打包的结果包含 `index.html` 和 很多 js 文件，这些 js 文件在打包时都会被加上 hash 值，例如 `chunk-ae17d.js`
2. 在 `index.html` 中，通过 `<script>` 标签引入这些 js 文件
   ```html
   <script src="chunk-ae17d.js"></script>
   ```
3. 每次重新打包时，这些 js 文件的 hash 值都会改变
4. 通过**轮询**检测 `index.html` 中的 `<script>` 标签的 `src` 属性，可以判断 js 文件是否发生变化
5. 如果 js 文件发生变化，则提示用户刷新页面

### 方法二：WebSocket

## 代码实现

`auto-update.js`

```js
// 保存上次提取的 <script> 标签的 src 属性值数组，用于后续对比
let lastSrcs;
// 保存当前定时器的 ID
let timeoutId = null;
// 检查更新的时间间隔，单位为毫秒
const DURATION = 2000;
// 匹配 HTML 文件中所有 <script> 标签，并提取其 src 属性值
const scriptReg = /\<script.*src=["'](?<src>[^"']+)/gm;

/**
 * 获取最新页面中的所有 <script> 标签的 src 链接
 * 从服务器请求最新页面的 HTML 内容并解析 script 的 src 属性
 */
async function extractScripts() {
  // 发送一个带有时间戳的请求，确保每次获取的都是最新的页面内容
  const html = await fetch("/?_timestamp=" + Date.now()).then((res) => res.text());
  // 重置正则表达式的 lastIndex，确保从头开始匹配
  scriptReg.lastIndex = 0;
  // 用于存储匹配到的 script src 链接的数组
  const result = [];
  // 保存每次正则匹配结果
  let match;

  while ((match = scriptReg.exec(html))) {
    result.push(match.groups.src);
  }

  // 返回提取到的所有 src 链接
  return result;
}

/**
 * 检测页面是否需要更新
 * 比较新提取的 script src 链接数组和之前保存的 lastSrcs 数组
 */
async function needUpdate() {
  // 获取最新的 script src 链接数组
  const newScripts = await extractScripts();
  // 默认设置更新标志为 false
  let result = false;

  // 如果 lastSrcs 为空（第一次运行），保存新数组并返回 false
  if (!lastSrcs) {
    lastSrcs = newScripts;
    return result;
  }

  // 如果新旧数组的长度不同，说明有更新
  if (newScripts.length !== lastSrcs.length) {
    lastSrcs = newScripts;
    result = true;
    return result;
  }

  // 遍历旧数组，逐项比较新旧数组的 src 值
  for (let i = 0; i < lastSrcs.length; i++) {
    if (lastSrcs[i] !== newScripts[i]) {
      result = true;
      break;
    }
  }

  // 更新 lastSrcs 为新数组，保存最新的状态
  lastSrcs = newScripts;

  // 返回是否需要更新的结果
  return result;
}

/**
 * 自动刷新页面的函数
 * 周期性地检查是否需要刷新页面，如果需要则提示用户刷新
 */
async function autoRefresh() {
  // 如果已有定时器运行，先清理旧的
  if (timeoutId) {
    clearTimeout(timeoutId);
    timeoutId = null;
  }

  const willUpdate = await needUpdate();
  if (willUpdate) {
    const result = confirm("页面有更新，是否刷新？");
    if (result) {
      location.reload();
    }
  }

  // 创建新的定时器
  timeoutId = setTimeout(autoRefresh, DURATION);
}

// 启动自动刷新功能
autoRefresh();
```
