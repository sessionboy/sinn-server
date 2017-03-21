# runkoa


[![npm version](https://badge.fury.io/js/runkoa.svg)](http://badge.fury.io/js/runkoa)
[![Build](https://travis-ci.org/17koa/runkoa.svg?branch=master)](https://travis-ci.org/17koa/runkoa)

执行[koa](https://github.com/koajs/koa)用到async的时候需要babel环境，这里稍微简单的封装了一下，以便于更简单的使用koa的时候，不用在意babel的细节

它是[koa-generator](https://github.com/17koa/koa-generator)的核心组件

- 暂时不支持Windows

## 依赖

- "babel-core": "^6.7.5",
- "babel-polyfill": "^6.1.4",
- "babel-preset-es2015-node": "^6.1.4",
- "babel-preset-stage-3": "^6.5.0",
- "babel-plugin-add-module-exports": "^0.1.2",

## Features

- if use node v7.x，runkoa is an alias with `node --harmony-async-await`
- 不需要了解babel即可使用koa2+async组合
- 对koa项目代码无入侵，启动时入口处理而已
- 支持koa@2.x里的3种异步调用方式，无需其他，完美支持
- 支持cli命令，即runkoa执行
- 默认读取bin/www文件，启动koa服务
- 遵循小而美

## Install

```
npm i -g runkoa
```

## Usages


```
runkoa app.js
```

## Code Example


```
require('runkoa')(__dirname + '/app.js' )
```

## Test

koa2支持3种写法，分别测试如下

Koa is an middleware framework, it can take 3 different kind function as middleware:

- common function
- async function
- generatorFunction

Here we write an logger middleware with different function.


```
runkoa app.js
runkoa app-async.js     
runkoa app-generator.js 
```

## 集成supervisor或nodemon

代码变动，使用supervisor或nodemon自动重启服务是开发里比较好的实践，runkoa可以非常好的和它们进行集成，让开发更简单

首先通过runkoa来加载`bin/www`里,代码如下


```
require('runkoa')(__dirname + '/app.js')
```

然后执行

```
nodemon bin/www
```

此时，你可以放心的去修改你的代码了

## 集成pm2

touch bin/run

```
var current_path = process.cwd();

require('runkoa')(current_path + '/bin/www' )
```

然后执行pm2即可

```
 #npm run pm2
 pm2 start bin/run 
```

## FAQ

### 重复引用require("babel-polyfill")可能出现的问题

```
➜  koa-demo runkoa index.js 
index.js
/Users/sang/workspace/17koa/koa-demo/node_modules/babel-polyfill/lib/index.js:14
  throw new Error("only one instance of babel-polyfill is allowed");
  ^

Error: only one instance of babel-polyfill is allowed
    at Object.<anonymous> (/Users/sang/workspace/17koa/koa-demo/node_modules/babel-polyfill/lib/index.js:14:9)
    at Module._compile (module.js:434:26)
    at Module._extensions..js (module.js:452:10)
    at Object.require.extensions.(anonymous function) [as .js] (/Users/sang/workspace/github/runkoa/node_modules/babel-register/lib/node.js:134:7)
    at Module.load (module.js:355:32)
    at Function.Module._load (module.js:310:12)
    at Module.require (module.js:365:17)
    at require (module.js:384:17)
    at Object.<anonymous> (index.js:3:1)
    at Module._compile (module.js:434:26)
➜  koa-demo cat index.js 
'use strict';
   
require("babel-polyfill");

// set babel in entry file
require('babel-core/register')({
  presets: ['es2015-node5', 'stage-3']
});

require('./app'); // this is es7 - gets transpiled
```

这时正确的操作是

```
runkoa  app.js
```

### 如果本地已安装runkoa的依赖，会报错

依赖

- "babel-core": "^6.7.5",
- "babel-polyfill": "^6.1.4",
- "babel-preset-es2015-node": "^6.1.4",
- "babel-preset-stage-3": "^6.5.0"

请保持你的package.json或node_modules目录下无这些依赖即可

这是因为runkoa需要指定babel需要的preset地址


## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## 版本历史

- 1.5.4 fix #6 #12 #13
- 1.5.3 测试办法，请不要用
- v1.5.1 add module-export-default && npm3 + npm2 && ci support
- v1.3.1 更新pm2部署和faq出错的2个问题，另外在cli和模块上都已经测试过了，在koa-generator上已作为核心模块使用，欢迎使用和反馈
- v1.1.0 实现可编程调用
- v1.0.0 初始化版本cli,实现kp导出

## 欢迎fork和反馈

- write by `i5ting` i5ting@126.com

如有建议或意见，请在issue提问或邮件

## License

this repo is released under the [MIT
License](http://www.opensource.org/licenses/MIT).
