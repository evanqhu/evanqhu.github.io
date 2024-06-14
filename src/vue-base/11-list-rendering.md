# 列表渲染

## 列表渲染

遍历数组 `v-for="(item, index) in items" :key="item.id"`（推荐用 `item.id` 作为 `key` ）
遍历对象 `v-for="(val, key) in items` 拿到的分别是对象的 **value 和 key**

* 可省略数组的 index 或者对象的 key，这样拿到的就是 item 或者 val；
* 使用 v-for 时一定要加 `:key`；
* v-for 可应用在数组、对象、字符串。

**`key` 的重要性**

<img src="https://s2.loli.net/2024/06/14/JgR6iGxI9K2ZFMz.png" alt="key.png" style="zoom: 25%;" /> 


* key 是 Vue 内部在用，不会出现在 DOM 结构上；
* key 是虚拟 DOM 对象的标识，当数据发生变化时，Vue 会根据【新数据】生成【新的虚拟 DOM】，随后 Vue 进行【新虚拟 DOM】与【旧虚拟 DOM】的差异比较；
* **对比规则：**
  * 旧虚拟 DOM 中找到了与新虚拟 DOM 相同的 key
    * **若虚拟 DOM 中节点内容没变, 直接复用之前的真实 DOM**
    * 若虚拟 DOM 中节点内容变了, 则生成新的真实 DOM，随后替换掉页面中之前的真实 DOM
  * 旧虚拟 DOM 中未找到与新虚拟 DOM 相同的 key
    * 创建新的真实 DOM，随后渲染到到页面

### 列表过滤 filter

```javascript
new Vue ({
  data: {
    // 1.data 中配置 keyWord 和 filPersons 数组
    keyWord: '',  // 关键词
    filPersons: [ ],  // 用一个新数组接收过滤后的数组（监视属性用）
    persons: [ ]  // 原数组
  },
  // 1. watch 监视属性写法
  watch: {
    keyWord: {
      immediate: true,  // 对起始的空字符串进行一次过滤，展示整个数组
      handler(val){  // 只传一个参数表示变化后的 newValue
        this.filPerons = this.persons.filter((p)=>{
          return p.name.indexOf(val) !== -1  // 字符串中 indexOf 空字符串，结果是 0
        })
      }
  	}        
  },
  // 2. computed 计算属性写法（推荐）
  computed: {
    filPerons() {
      return this.persons.filter(p => p.name.indexOf(this.keyWord) !== -1 )
    }
  }
})
```
