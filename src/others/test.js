let lastSrcs;

// 匹配 HTML 文件中所有 <script> 标签，并提取其 src 属性值
const scriptReg = /\<script.*src=["'](?<src>[^"']+)/gm

/** 获取最新页面中的 script 链接 */
async function extractScripts() {
  const html = await fetch('/?_timestamp=' + Date.now()).then(res => res.text())
  // 指定下一次匹配开始的位置
  scriptReg.lastIndex = 0
  let result = []
  let match;
  while (match = scriptReg.exec(html)) {
    result.push(match.groups.src)
  }
  return result
}

/** 是否需要更新页面 */
async function needUpdate() {
  const newScripts = await extractScripts()
  if (!lastSrcs) {
    lastSrcs = newScripts
    return false
  }
  let result = false
  if (newScripts.length !== lastSrcs.length) {
    result = true
  }
  for (let i = 0; i < lastSrcs.length; i++) {
    if (lastSrcs[i] !== newScripts[i]) {
      result = true
      break
    }
  }
  lastSrcs = newScripts
  return result
}

const DURATION = 2000

function autoRefresh() {
  setTimeout(async () => {
    const willUpdate = await needUpdate()
    if (willUpdate) {
      const result = confirm('页面有更新，是否刷新？')
      if (result) {
        location.reload()
      }
    }
    autoRefresh()
  }, DURATION);
}

autoRefresh()