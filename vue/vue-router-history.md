# vue-router history 模式中各种场景下的配置

## 背景
### 默认模式`<domain>#/<path>`
  - 优点是直接可以用，无需做额外配置
  - 缺点是跟常规的URL方式不一致，造型古怪，想要在URL上加参数的时候容易出错
### history模式`<domain>/<path>`
  - 优点是符合URL标准格式
  - 缺点是需要做额外的配置

## 解法 -- 以 `test.linkaka.cn` 为例

### 部署在根域名下 `test.linkaka.cn/<path>`

- `<project path>/src/router.js`
  ```javascript
  export default new Router({
    // 命名:组件名大驼峰、path/name小驼峰
    mode: 'history',
    base,
    routes: [
      // routes
    ]
  })
  ```

- `nginx.conf`配置
  ```
  server {
    listen 80;
    server_name test.linkaka.cn;
    root /home/static/test.linkaka.cn;
    index index.html index.htm;
    location ^~/ {
      access_log off;
      try_files $uri $uri / /index.html;
    }
  }
  ```
### 部署在子路由下 `test.linkaka.cn/demo/<path>`

- 以下路由亲测有效
  ```
  有子路由：
  test.linkaka.cn/demo  有效
  test.linkaka.cn/demo/news  有效
  test.linkaka.cn/demo/news/someid  有效
  ```

- `<project path>/src/router.js`
  ```javascript
  const getRoute = (name, path = `/${name}`) => ({
    name,
    path,
    component: resolve => require([`@/views/${name}.vue`], resolve)
  })
  const routes = [
    getRoute('home', '/'),
    getRoute('news', '/news/:id')
  ]

  // 通用做法，不需要关心到底是部署在那个子路由下面
  const base = routes.reduce((pre, {name}) => {
    const reg = RegExp(`/${name}.*`)
    return pre.replace(reg, '')
  }, location.pathname)

  export default new Router({
    // 命名:组件名大驼峰、path/name小驼峰
    mode: 'history',
    // 通用做法
    // base: base,

    // 更优的做法
    base: env.baseRoute,
    routes: routes.concat([
      { path: '*', redirect: '/' }
    ])
  })
  ```

- webpack config
  - `<project path>/config/dev.env.js`
    ```javascript
    'use strict'
    module.exports = {
      NODE_ENV: '"development"',
      baseRoute: '"/"',
    }
    ```
  - `<project path>/config/test.env.js`
    ```javascript
    'use strict'
    const merge = require('webpack-merge')
    const devEnv = require('./dev.env')

    module.exports = merge(devEnv, {
      NODE_ENV: '"testing"',
      baseRoute: '"/icity.jd.com"'
    })
    ```
  - `<project path>/config/prod.env.js`
    ```javascript
    'use strict'
    module.exports = {
      NODE_ENV: '"production"',
      baseRoute: '"/"',
      domain: {
        icity: '"http://101.124.15.81:9080/icity/front"'
      }
    }
    ```
  - `<project path>/build/webpack.prod.conf.js`
    ```javascript
    // ...

    const env = process.env.NODE_ENV === 'testing'
      ? require('../config/test.env')
      : require('../config/prod.env')
    const webpackConfig = merge(baseWebpackConfig, {
      //...

      output: {
        publicPath: JSON.parse(env.baseRoute),
        // ...

      },
    })
    ```

- `nginx.conf` 配置
  ```nginx
  server {
    listen 80;
    server_name test.linkaka.cn;
    root /home/static/test.linkaka.cn;
    index index.html index.htm;
    location /icity.jd.com {
      access_log off;
      # try_files $uri $uri/ /index.html;
      if ( !-e $request_filename) {
        rewrite ^/(.*) /icity.jd.com/index.html last;
        break;
      }
    }
  }
  ```

## 运行命令
- "start": "npm run dev",
- "build:test": "NODE_ENV=testing node build/build.js",
- "build": "NODE_ENV=production node build/build.js"

## 总结

> 不吹不黑，所有功能亲测有效。 在这个过程中也发现了`config/*.env.js`的作用。 以前都是自己新定义一个变量，感觉作者的这个环境配置的有些凌乱，通过这次的vue-router的实践，发现作者的这种做法还是很有优势的。


