# 原型对象， 就是prototype对象。

> prototype对象，是可以调用构造函数所创建的实例对象的对象。prototype对象的所有属性和方法被所有的实例对象所共享。<br/>`javascript高级程序设计`对于这一块讲的特别好

- 好处就是节省内存
- prototype 是一个对象。 `typeof Object.prototype == 'object'`
- new Function 真正做了哪些事情, 实际上会经历以下 4 个步骤:
  - 创建一个新对象;
  - 将构造函数的作用域赋给新对象(因此 this 就指向了这个新对象);
  - 执行构造函数中的代码(为这个新对象添加属性);
  - 返回新对象。

  ```javascript
  // new function 实际做的就是如下事情
  function newFunc(func) {
    const args = Array.prototype.slice.call(arguments, 1)
    // 这是一个新对象
    let res = {}
    const trueRes = func.apply(res, args)
    if(trueRes) {
      res = trueRes
    }
    res.__proto__ = func.prototype || null
    return res
  }

  function Func (name) {
    this.name = name
  }
  Func.prototype.say = function() {
    console.log(`my name is: ${this.name}`)
  }
  const a = newFunc(Func, 'name')
  a.say() // my name is: name
  ```

- 对象的继承

  ```javascript
  // javascript 继承实际上构造函数的调用和原型链的重新赋值
  function Man (name) {
    this.name = name
  }
  Man.prototype.sayName = function() {
    console.log('my name is:', this.name)
  }

  // 所以， 一个对象去继承另外一个对象的属性和方法
  function Kaka(name) {
    Man.apply(this, arguments)
  }
  // 需要对prototype和constructor都赋值
  Kaka.prototype = Man.prototype
  Kaka.prototype.constructor = Kaka

  const kaka = new Kaka('kaka')
  kaka.sayName() // kaka
  ```

- hasOwnProperty， 是检测对象的实例属性中是否存在

  ```javascript
  function Man(name) {
    // 实例属性
    this.name = name
  }
  // 原型属性
  Man.prototype.say = function() {console.log(this.name)}
  const kaka = new Man('kaka')

  console.log(
    kaka.hasOwnProperty('name'), // true
    kaka.hasOwnProperty('say')  // false
  )
  ```

- 原型链
    * 就是一个对象A有原型对象B，B也是一个对象，也有自己的原型C，一直向上追溯，直到原型对象为 null。
    * 简言之 A.cProto = A.__proto__.__proto__.cProto
    * JavaScript 中所有的对象都继承自 Object 对象。 Object.prototype.prototype = undefined
      ```javascript
      // js 中null也是对象
      console.log(typeof null) // object

      const obj = {}
      console.log(obj.__proto__.constructor) // ƒ Object() { [native code] }
      console.log(obj.__proto__.__proto__) // null
      ```



