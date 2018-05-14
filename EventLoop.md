# EventLoop

> javascript 时间循环机制

## JavaScript是单线程
JavaScript是单线程，这个大家都知道。但是为什么是这样呢？是因为JavaScript最初的设计是浏览器端语言。

## 几个准则

1. setTimeout setInterval 是一个事件循环
2. io 操作的callback是一个事件循环
3. 1的事件在2的事件执行之后

## 浏览器事件循环

## nodejs 事件循环

- 参考文件 https://zhuanlan.zhihu.com/p/33058983