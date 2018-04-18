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
- 用最简单的方式实现：从 'a65sd12ase12r1' 到 '1212156'

    ```javascript
    const result = 'a65sd12ase12r1'.match(/d/g).reverse().join('')
    ```

## DOM

### 事件捕获，冒泡，委托

1. 定义
    - 事件捕获：当用户在dom上点击某个地方，点击事件会从父元素一级一级向子元素传播。如果这个时候父元素绑定了事件捕获，就会触发这个绑定事件。
    - 事件冒泡： 跟上面的相反， 点击事件从子元素向外一级一级传播。 如果这个时候父元素绑定了事件冒泡，就会触发
    - 事件委托： 就是将多个子元素的事件用事件冒泡的方式委托到父元素。 每次触发点击事件的时候检测是哪个子元素[e.target]触发，并做相应处理。
2. e.target 和 e.currentTarget 的区别
    - e.target 是被点击的元素
    - e.currentTarget 是事件绑定到的元素

## CSS

### BFC(Block Formatting Context) 块级格式化上下文

1. 怎么形成一个BFC
    - 根元素或其它包含它的元素
    - 浮动 (元素的 float 不是 none)
    - 绝对定位的元素 (元素具有 position 为 absolute 或 fixed)
    - 非块级元素具有 display: inline-block，table-cell, table-caption, flex, inline-flex
    - 块级元素具有overflow ，且值不是 visible

1. BFC作用
    - 清除浮动
    - 布局：自适应两栏布局
    - 防止垂直margin合并

    ```html
    <!DOCTYPE html>
      <html lang="en">
      <head>
        <style>
          .wrap{
            border: 2px solid yellow;
            width: 100px;
            overflow: hidden;
          }
          .inner-box{
            background: pink;
            width: 50px;
            height: 50px;
          }
          .left{float: left;}
          main{
            background: orange;
          }
        </style>
      </head>

      <body>
        <h1>BFC</h1>
        <h3>清除浮动</h3>
        <div class="wrap">
          <div class="inner-box left"></div>
        </div>

        <h3>布局，自适应两栏布局</h3>
        <div class="wrap">
          <div class="inner-box left"></div>
          <main>这里会掉到left下面。并且包含整个wrap。。。。。。。。。。。。。。。。。。。</main>
        </div>

        <div class="wrap">
          <div class="inner-box left"></div>
          <main style="overflow: hidden;">这个块只会存在于右边，文字不会掉下去。。。。。。。。。。。。。。。。。。。。</main>
        </div>

        <h3>防止垂直margin合并</h3>
        <!-- 这个时候中间的margin会合并 -->
        <div class="wrap">
          <div class="inner-box top" style="margin-bottom: 50px;"></div>
          <div class="inner-box bottom" style="margin-top: 50px;"></div>
        </div>

        <!-- 解决方法就是给其中一个box加一个外层的BFC -->
        <div class="wrap">
          <div style="overflow: hidden;">
            <div class="inner-box top" style="margin-bottom: 50px;"></div>
          </div>

          <div class="inner-box bottom" style="margin-top: 50px;"></div>
        </div>
      </body>
      </html>
    ```
### IFC(Inline Formatting Context) 行内格式化上下文
> 只有在一个块级元素中<strong>仅</strong>包含内联级别元素时才会生成。

  1. IFC：布局规则
      - 内部的盒子会在水平方向，一个接一个地放置。
      - 这些盒子垂直方向的起点从包含块盒子的顶部开始。
      - 摆放这些盒子的时候，它们在水平方向上的 padding、border、margin 所占用的空间都会被考虑在内。
      - 在垂直方向上，这些框可能会以不同形式来对齐（vertical-align）：它们可能会使用底部或顶部对齐，也可能通过其内部的文本基线（baseline）对齐。
      - 能把在一行上的框都完全包含进去的一个矩形区域，被称为该行的行框（line box）。行框的宽度是由包含块（containing box）和存在的浮动来决定。
      - IFC中的 line box 一般左右边都贴紧其包含块，但是会因为float元素的存在发生变化。float 元素会位于IFC与与 line box 之间，使得 line box 宽度缩短。
      - IFC 中的 line box 高度由 CSS 行高计算规则来确定，同个 IFC 下的多个 line box 高度可能会不同（比如一行包含了较高的图片，而另一行只有文本）
      - 当 inline-level boxes 的总宽度少于包含它们的 line box 时，其水平渲染规则由 text-align 属性来确定，如果取值为 justify，那么浏览器会对 inline-boxes（注意不是inline-table 和 inline-block boxes）中的文字和空格做出拉伸。
      - 当一个 inline box 超过 line box 的宽度时，它会被分割成多个boxes，这些 boxes 被分布在多个 line box 里。如果一个 inline box 不能被分割（比如只包含单个字符，或 word-breaking 机制被禁用，或该行内框受 white-space 属性值为 nowrap 或 pre 的影响），那么这个 inline box 将溢出这个 line box。


  1. IFC作用
      - 水平居中：当一个块要在环境中水平居中时，设置其为 inline-block 则会在外层产生 IFC，通过设置父容器 text-align:center 则可以使其水平居中。值得注意的是，设置一个块为 inline-block ，以单个封闭块来参与外部的 IFC，而内部则生成了一个 BFC。
      - 垂直居中：创建一个IFC，用其中一个元素撑开父元素的高度，然后设置其 vertical-align:middle，其他行内元素则可以在此父元素下垂直居中。

      ```html
      <style>
        .wrap{
          border: 2px solid yellow;
          width: 100px;
          overflow: hidden;
          height: 100px;
          text-align: center;
        }
        .center{
          display: inline-block;
          vertical-align: middle;
        }
      </style>
      <div class="wrap">
        <div class="center">1111122</div>
      </div>
      ```


- [BFC与IFC概念理解+布局规则+形成方法+用处](https://segmentfault.com/a/119000000954574)

### css的盒子模型、 box-sizing、 消除IE浏览器下的怪异模式

> 这个刚开始没注意。看了概念之后才发现，原来这些是自己平时写css的时候就会注意的事项。只是没有查相关的理论依据。 现在整理一下。

> 当任意一个块级元素的宽度或高度被显式指定，它应当只确定这个可见元素自身的宽度或高度，而padding, border和margin随后被应用。
  <br/> Internet Explorer在“怪异模式”（怪异模式）则把内容，内边距（padding）和边框（border）全部包括在一个指定的宽度或高度之内；这导致它呈现出一个比遵从标准行为的结果更窄或者更短的盒子。


1. 所谓css盒子模型，就是每一个dom元素都可以看成是一个盒子。 这个盒子包括四个部分： 外边距[margin]， 边框[border]， 内边距[padding]， 内容[content]。
1. box-sizing呢，就是定义这个元素的宽度应该怎么计算。
    - 默认情况下 `box-sizing: content-box;` ，以内容的宽高为元素的宽高。 *ps: 因为是默认的，所以没有太在意，就以为浏览器就是这样设置的*
    - box-sizing 还有其他的几个属性：
      ```css
      box-sizing: content-box; /* width = content */
      box-sizing: border-box;  /* width = content + padding + border */
      /* 全局 值 */
      box-sizing: inherit;
      box-sizing: initial;
      box-sizing: unset;
      ```
    - IE的怪异模式： width = content + padding + border。IE默认情况下是使用的`border-box`这个属性。 
        * 如何消除：就是显示的将设置的值，box-sizing: border-box or content-box。
        * 一些“专家”认为就统一用 border-box 就好啦。 主观上也认为 border-box 比较合适。

### flex布局
> flex： 伸缩。所以 flex 布局即伸缩布局、弹性布局

1. 定义：
    - The flex CSS property specifies how a flex item will grow or shrink so as to fit the space available in its flex container.
    - flex 属性定义了一个 flex 项目，它可以通过延展、收缩来适应他的 flex 容器的可用区域

1. 基本概念
    - 任何一个元素都可以用 flex 布局
    - 采用 flex 布局的元素成为 flex 容器。 他的所有子元素都是容器成员， 成为 flex 项目(flex-item)
    - flex 容器有两个轴线。 x轴、y轴。 所有的子元素都是基于这两个轴线来布局。 可以居始( xx-start )、居末( xx-end )、居中( xx-center )、平均( xx-justify )。

1. 附录
    - [阮老师--语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)
    - [阮老师--实例篇](http://www.ruanyifeng.com/blog/2015/07/flex-examples.html)
    - [联系](./src/flex.html)

### 有三个长宽都是60px的圆圈使他们均匀的排列的一行

1. `text-align-last: justify` 让最后一行两端对齐
1. `text-align: justify` 让文本的正文(第一行——倒数第二行)两端对齐， 对于最后一行失效。 内部元素必须是`inline`或`inline-block`属性

    ```html
    <style>
    .box{
      overflow: hidden;
      border: 1px solid black;
      height: 60px;
      margin-top: 10px
    }
    .one-line{
      text-align-last: justify;
    }
    .two-line{
      text-align: justify;
    }

    .circle{
      width: 60px;
      height: 60px;
      background: black;
      display: inline-block;
      border-radius: 50%;
    }
    .blank{
      display: inline-block;
    }
    .last-line{
      width: 100%;
    }
    </style>
    <!-- one line -->
    <div class="box one-line">
      <span class="blank"></span>
      <i class="circle"></i>
      <i class="circle"></i>
      <i class="circle"></i>
      <span class="blank"></span>
    </div>
    <!-- two line  -->
    <div class="box two-line">
      <span class="blank"></span>
      <i class="circle"></i>
      <i class="circle"></i>
      <i class="circle"></i>
      <span class="blank"></span>
      <div class="blank last-line"></div>
    </div>
    ```

1. 用flex, `justify-content: space-evenly`

    ```html
    <style>
    .box{
      overflow: hidden;
      border: 1px solid black;
      height: 60px;
      margin-top: 10px;
      display: flex;
      justify-content: space-evenly;
    }

    .circle{
      width: 60px;
      height: 60px;
      background: black;
      display: flex;
      border-radius: 50%;
    }
    </style>
    <div class="box">
      <i class="circle"></i>
      <i class="circle"></i>
      <i class="circle"></i>
    </div>
    ```

## HTTP

### 浏览器同源的历史

### http头信息， 缓存头信息： etag, cache-controle, last-modified, expired
