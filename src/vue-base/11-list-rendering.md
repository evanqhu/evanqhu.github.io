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

## diff 算法 (待优化)

Vue 的 diff 算法（主要在 Vue 的 Virtual DOM 实现中）的核心是高效地对比两棵虚拟 DOM 树，找出最小的更新操作。Vue 的 diff 算法使用的是双端比较（双指针）的方法。下面是其详细的流程说明：

### Diff 算法流程

1. **初始化双指针**：
   - `oldStartIdx` 指向旧节点列表的开始位置。
   - `oldEndIdx` 指向旧节点列表的结束位置。
   - `newStartIdx` 指向新节点列表的开始位置。
   - `newEndIdx` 指向新节点列表的结束位置。
2. **双端比较**： 在双端比较的过程中，Vue 会同时从旧节点列表和新节点列表的两端进行对比：
   - **旧头与新头比较** (`oldStartVnode` 和 `newStartVnode`)： 如果匹配，则直接更新该节点，然后指针分别向右移动。
   - **旧尾与新尾比较** (`oldEndVnode` 和 `newEndVnode`)： 如果匹配，则直接更新该节点，然后指针分别向左移动。
   - **旧头与新尾比较** (`oldStartVnode` 和 `newEndVnode`)： 如果匹配，说明节点需要移动到新的位置。将旧头节点移动到旧尾之后，然后旧头指针右移，新尾指针左移。
   - **旧尾与新头比较** (`oldEndVnode` 和 `newStartVnode`)： 如果匹配，说明节点需要移动到新的位置。将旧尾节点移动到旧头之前，然后旧尾指针左移，新头指针右移。
3. **四种情况均不匹配**：
   - 如果以上四种情况都不匹配，则通过 key 来查找旧节点列表中是否存在与当前新节点 key 相同的节点。
   - 如果找到匹配的节点，则移动该节点到正确位置，并更新该节点。
   - 如果没有找到匹配的节点，则创建新的节点并插入到正确位置。
4. **处理剩余节点**：
   - 当某一方的指针先走完时（例如 `oldStartIdx > oldEndIdx` 或 `newStartIdx > newEndIdx`），说明另一方还有剩余节点需要处理。
   - 如果新节点列表还有剩余节点，则这些节点是新增的，需要创建并插入。
   - 如果旧节点列表还有剩余节点，则这些节点是多余的，需要移除。
