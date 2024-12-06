# 日期对象 Date

```js
// Date() 是一个构造函数
const t = new Date(); // Wed Aug 31 2022 21:31:53 GMT+0800 (中国标准时间) 当前时间
new Date(year, month, day, hours, minutes, seconds, milliseconds);
new Date(milliseconds);
new Date(date string);
```

| 类型     | 实例                             |
| :------- | :------------------------------- |
| ISO 日期 | "2018-02-19" （国际标准）        |
| 短日期   | "02/19/2018" 或者 "2018/02/19"   |
| 长日期   | "Feb 19 2018" 或者 "19 Feb 2019" |
| 完整日期 | "Monday Februarr 25 2015"        |

## 日期获取方法

* Date对象才有的方法
* `getFullYear()` 方法以四位数字形式返回日期年份
* `getMonth()` 以数字（0-11）返回日期的月份
* `getDate()` 方法以数字（1-31）返回日期的日
* `getHours()` 方法以数字（0-23）返回日期的小时数
* `getMinutes()` 方法以数字（0-59）返回日期的分钟数
* `getSeconds()` 方法以数字（0-59）返回日期的秒数
* `getMilliseconds()` 方法以数字（0-999）返回日期的毫秒数
* `getDay()` 方法以数字（0-6）返回日期的星期名（weekday）
* `valueof()` `getTime()`  `Date.now()` 获取1970.1.1到现在的毫秒数
* 相对应的，设置这些日期的方法就是 `set...`
