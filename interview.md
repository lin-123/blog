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
