# 面试题

## JavaScript

- 如何数字每三位添加一个逗号，如12000000转化为『12,000,000』?
  ```javascript
  // 方法一
  function formatNum(num) {
    return num.toString()
    .split('')
    .reverse()
    .reduce((str, cur, idx) => cur + (idx%3 ? '':',') + str, '')
    .slice(0, -1)
  }

  // 方法二，
  '12341234'.replace(/(?=(\d{3})+$)/g, ',') // 12,341,234

  // 方法三
  123123123.toLocaleString() // 123,123,123
  ```
