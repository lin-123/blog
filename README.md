# Javascript

> 没什么说的，无论你做了多少年前端，还是基础最重要

## [面试题](./interview.md)

## [原型对象， 就是prototype对象](./prototype.md)
> prototype对象，是可以调用构造函数所创建的实例对象的对象。prototype对象的所有属性和方法被所有的实例对象所共享。<br/>`javascript高级程序设计`对于这一块讲的特别好

## [递归](./recusive.md)

## [函数](./Function.md)

## [leetcode](./leetcode/README.md)

> 所谓编程，就是将一组需求分解成一组函数与数据结构的技能 —— 《JavaScript 语言精粹》

## XMLHttpRequest
  ```javascript
  function reqListener () {
    console.log(this.responseText);
  }
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", reqListener);
  oReq.open("POST", "https://api.github.com/_private/browser/stats");
  oReq.send(JSON.stringify({}));
  ```

### 附录
1. 图书推荐
    - JavaScript 高级程序设计
    - JavaScript 语言精粹
1. [javascript高阶函数介绍](https://www.imys.net/20160530/javascript-advanced-functions.html)
1. [ECMAScript5.1-ch](http://yanhaijing.com/es5/#about)
1. [ECMAScript6](http://www.ecma-international.org/ecma-262/6.0/)
