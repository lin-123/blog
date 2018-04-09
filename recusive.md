# 递归

> 递归函数是在一个函数通过名字调用自身的情况下构成的

- 阶乘的例子

  ```javascript
  function factorial(num) {
    if(num <= 1) return 1;
    else return num * factorial(num - 1)
  }
  ```

- 但是这个例子有个问题， 就是当factorial被重新赋值的时候，在函数内部调用此函数就会有问题， 如

  ```javascript
  function factorial(num) {
    if(num <= 1) return 1;
    else return num * factorial(num - 1)
  }
  const anotherF = factorial
  factorial = null
  anotherF(3) // will throw error
  ```

- 用arguments.callee， 就会确保每次都是调用的当前函数。 但是在严格模式下是不允许用arguments.callee的

  ```javascript
  function factorial(num) {
    if(num <= 1) return 1;
    else return num * arguments.callee(num - 1)
  }
  const anotherF = factorial
  factorial = null
  anotherF(3) // will throw error
  ```

- 终极解法，用命名函数

  ```javascript
  const factorial = (function f(num) {
    if(num <= 1) return 1;
    else return num * f(num - 1)
  })
  // 这样子无论外部的factorial怎么变，都不会影响到递归函数的执行
  ```
