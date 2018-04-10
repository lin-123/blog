# 排序

> [八大经典排序](https://blog.csdn.net/youzhouliu/article/details/52311443)

## 冒泡排序 O(n^2)

- 挨个比较，小的在前大的在后。

```javascript
// 冒泡
function bubble(arr) {
  for(let i = 0; i < arr.length; i++) {
    for(let j = i+1; j < arr.length; j++) {
      if(arr[i] > arr[j]) {
        let tmp = arr[j]
        arr[j] = arr[i]
        arr[i] = tmp
      }
    }
  }
  return arr
}
```

## 选择排序 O(n^2)
- 每次都找到最小的一个数，放在最前面

```javascript
function choice(arr) {
  for(let i = 0; i < arr.length; i++) {
    let minIdx = i
    for(let j = i+1; j < arr.length; j++){
      if(arr[j] < arr[i]) minIdx = j
    }
    if(minIdx != i){
      arr[i] = arr[i] + arr[minIdx]
      arr[minIdx] = arr[i] - arr[minIdx]
      arr[i] = arr[i] - arr[minIdx]
    }
  }
  return arr
}
```

## 插入排序 O(n^2)
- 每次取一个数，跟前面已排序的列表数据比较，知道找到合适的位置插入。

```javascript
function sort(arr) {
  const len = arr.length
  for(let i = 1; i < len; i++) {
    const tmp = arr[i]
    let j = i
    while(j >= 0 && arr[j-1] > tmp) {
      arr[j] = arr[j-1]
      j--
    }
    arr[j] = tmp
  }
  return arr
}
```

## 快速排序 好的: O(nlogn) 最坏： O(n^2)
1. 选取一个锚点，通常是数组第一个数或者最后一个数。
1. 然后将小于这个锚点的数据放在左边，大于这个锚点的数据放在右边。
1. 重复1，2步骤
```javascript
function sort(arr) {
  const len = arr.length
  if(len <= 1) return arr;
  const left = [], right = []
  const proviteKey = arr.splice(Math.floor(len/2), 1)[0]
  for (let i = 0; i < len-1; i++) {
    const element = arr[i];
    proviteKey < element ? right.push(element):left.push(element)
  }
  return sort(left).concat([proviteKey], sort(right))
}
console.log(sort([2,1,3]))
```
