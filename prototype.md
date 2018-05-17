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

### 再议 JavaScript 对象继承

- JavaScript 对象的继承是通过 prototype 来实现的。用子对象的 prototype 指向父级对象的一个实例，然后然子对象的构造函数里面调用父对象的构造函数。 这也是原型链的来源。 实现如下：
  ```javascript
  // javascript 继承实际上构造函数的调用和原型链的重新赋值
  function SuperType(name) {
    this.name = name
  }
  SuperType.prototype.sayName = function() {
    console.log(this.name)
  }

  function SubType(name, age) {
    // 这一步将导致 SubType 的实例中 name 属性直接从 SuperType 中赋值过来。
    SuperType.call(this, name)
    this.age = age
  }

  SubType.prototype = new SupertType() // SubType.prototyp 指向了 SuperType 的实例
  // SubType.prototype = SuperType.prototype // 和上一行二者有什么区别
  SubType.prototype.constructor = SubType
  SubType.prototype.sayAge = function() { console.log(this.age) }

  var sub = new SubType('haha', 18)
  ```
  - 但是这种情况存在一个问题，就是 sub.name = 'haha'， sub.__proto__.name = undefined。 sub.name 是调用 SuperType.call 的结果。 sub.__proto__.name 是 SubType.prototype = new SupertType() 的结果， 这就导致了 name 这个属性占据了两块内存。

- 还有一种写法
  ```javascript
  function SuperType(name) {
    this.name = name
  }
  SuperType.prototype.sayName = function() { console.log(this.name) }

  function SubType(name, age) {
    SuperType.call(this, name)
    this.age = age
  }

  SubType.prototype = SuperType.prototype
  SubType.prototype.constructor = SubType
  SubType.prototype.sayAge = function() { console.log(this.age) }

  var sub = new SubType('haha', 18)
  ```
    - 这种写法就是将 SuperType 的属性和原型都直接赋值到 SubType 上。 这样做的好处有两点
      - 是避免了上一种写法里的 sub.__proto__.name 这个属性
      - sub 获取 sayName 方法减少了一步原型链的查找，变得更快
    - 不好的一点， 就是和通常意义上的原型链的概念有些不一致
    - babel 将 es6 class 编译成 es5 用的也是这种方式
      - es6

      ```javascript
      "use strict";
      class Super {
        constructor(name) {
          this.name = name
        }
        say() {
          console.log(this.name)
        }
      }

      class Sub extends Super {
        constructor() {
          super()
        }
        ping() {
          console.log('pong')
        }
      }
      ```
      - babel编译成es5

      ```javascript
      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return call && (typeof call === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ =
          superClass;
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      var Super = function () {
        function Super(name) {
          _classCallCheck(this, Super);
          this.name = name;
        }

        _createClass(Super, [{
          key: "say",
          value: function say() {
            console.log(this.name);
          }
        }]);

        return Super;
      }();

      var Sub = function (_Super) {
        _inherits(Sub, _Super);
        function Sub() {
          _classCallCheck(this, Sub);
          return _possibleConstructorReturn(this, (Sub.__proto__ || Object.getPrototypeOf(Sub)).apply(this, arguments));
        }
        return Sub;
      }(Super);
      ```




