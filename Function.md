## 函数

> 所谓编程，就是将一组需求分解成一组函数与数据结构的技能

### `this`

> 是一个对象。 是一个指向函数执行时调用他的那个对象

> 函数有四种调用方式，`方法调用模式`、 `函数调用模式`、 `构造器调用模式`、 `apply调用模式`，this 就来自于这四种调用方式

1. 方法调用模式
    - 当一个函数被当做一个对象的属性时，函数就称作方法。
    - 当函数执行时， this 就指向这个对象。在函数内部可以访问、操作这个对象的属性
    ```javascript
    const obj = {
      name: 'kaka',
      say() {
        console.log(this.name)
      }
    }
    obj.say() // 'kaka'
    ```
    - 但是，这个方法的执行必须要通过 obj.[method] 这种方式调用
2. 函数调用模式
    - 就是最常规的方式，定义一个函数，然后执行这个函数。这个时候 this 是指向全局对象。
      ```javascript
      function hi() {
        console.log(this) // window
      }
      hi()
      ```
    - *注：* this指向全局。据`Javascript语言精粹`说，是一个语言上的错误。倘若语言设计正确，那么当内部函数被调用的时候this应该指向外部函数的this，而非全局。
    - <strong>But</strong> 为什么设计者让他一定指向全局呢 ？不知大家怎么看这个问题
      ```javascript
      const obj = {
        name: 'kaka',
        say() {
          function hi () {
            // hi window
            console.log('hi', this.name, this)
          }
          // my name is kaka
          console.log('my name is: ', this.name)
          hi()
        }
      }
      obj.say()
      ```

3. 构造器调用模式
    - 用`new function()`的方式调用。这种方式会创建一个对象，并将函数的 this 指向这个对象，同时创建一个 constructor 指向构造函数，一个 prototype 对象。
      ```javascript
      function Man(name){
        this.name = name
      }
      Man.prototype.say = function (){
        console.log(this.name)
      }
      const kaka = new Man('kaka')
      console.log(kaka.say()) // kaka
      ```

4. apply，call，bind 调用模式。 此处以 apply 举例
    - 通过 functionName.apply 的方式调用，允许我们定义函数 this 的值。
      ```javascript
      const obj = {
        name: 'kaka'
      }
      function say(msg) {
        console.log(this.name, msg)
      }
      say.apply(obj, [', welcome'])
      ```

### 闭包

> 指的是有权访问另一个函数作用域中的变量的函数。 <br/> 通俗点： 就是A函数内嵌套了一个B函数，并且B函数访问了A函数内的变量。

- 涉及到的知识点： 作用域链。如果对这个理解的比较透彻就没问题了
- 缺点： 多度使用闭包会导致内存占用过多， 所以只在必要[非用不可]的时候才选择用闭包。

### 高阶函数

> 函数可以作为参数被传递；函数可以作为返回值输出。

#### 柯里化 —— 还没理解这个东西的含义的作用

> 在计算机科学中，柯里化（英语：Currying），又译为卡瑞化或加里化，是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术。 <br/>
说人话就是： `fn(a,b,c) -> fn(a)(b)(c)`

```javascript
function curry(fn, ...args) {
  return fn.length <= args.length ?
    fn(...args)
    :curry.bind(null, fn, ...args)
}
function sum(a,b,c){
  return a + b + c
}

const sumCurry = curry(sum)
console.log(sumCurry(1)(2)(3))
```

> 反柯里化 `fn(a)(b)(c) -> fn(a,b,c)`

```javascript
function unCurry(fn){}

function sum(a,b) {
  return a + b
}

const sumUnCurry = unCurry(sum)
sumUncurry(1,2,3,4,5)

```

#### 函数节流

> 就是避免在上一个函数条用还没结束的时候又重新调用一遍。微信的扫码登录就用了这个功能。

```javascript
var getData = (function () {
  var lock = false
  return function(cb) {
    if(lock) return;
    lock = true
    $.get('https://xxx', function(err, data) {
      lock = false
      cb(err, data)
    })
  }
})()
getData()
```

#### 分时函数

> 就是在固定的时间间隔内只允许调用一次函数。

> 如当页面滚动结束时触发 http 请求，页面在滚动期间会频繁触发滚动事件，如果把http请求绑定到页面滚动事件上，这样就会频繁发送http请求。这样就浪费了很多的http请求。

```javascript
var getData = (function() {
  var schedule
  return function() {
    if(schedule) clearTimeout(schedule);
    schedule = setTimeout(() => {
      $.get('xxx', function() {
        // todo
      })
    }, 300);
  }
})()

el.addEventListener('scroll', getData)
```

#### 惰性函数

> 能计算一次的就不要计算两次； 函数是可以重新定义的。

> 浏览器特征检测是前端开发中必不可少的，比如返回顶部，我们需要区分火狐和其他浏览器来决定 scrollTop 应当设置给谁。

```javascript
// 新手
var scrollTop = function(){
  if(/firefox/i.test(navigator.userAgent)) {
      document.documentElement.scrollTop = 0;
  } else {
      document.body.scrollTop = 0;
  }
}
// 老司机
var scrollTop = (function(){
  var isFF = /firefox/i.test(navigator.userAgent);
  var docEl = document[ isFF ? 'documentElement' : 'body' ];
  return function(){
      docEl.scrollTop = 0;
  }
})();
```
