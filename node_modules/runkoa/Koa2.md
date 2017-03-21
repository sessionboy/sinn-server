# Koa 2入门

koa2已发布了一段时间，可以考虑入手，参见[Node.js最新Web技术栈（2016年4月）](https://cnodejs.org/topic/56fdf66ec5f5b4a959e91771)


本文主要是[koa 2的文档](https://github.com/koajs/koa/blob/v2.x/Readme.md)解读和[runkoa](https://github.com/17koa/runkoa)介绍，让大家对koa 2有一个更简单直接的理解

## 依赖Node.js 4.0+

Koa requires node v4.0.0 or higher for (partial) ES2015 support.

部分特性需要ES2015,大家可以自己比对一下es6在node不同版本里的支持特性

http://kangax.github.io/compat-table/es6/

## hello world

```
const Koa = require('koa');
const app = new Koa();

// 此处开始堆叠各种中间件
//...

app.use(ctx => {
  ctx.body = 'Hello Koa';
});

app.listen(3000);
```

注意注释部分，此处开始堆叠各种中间件

## 中间件：Middleware

Koa 是一个 middleware framework, 它提供了 3 种不同类型的中间件写法

- common function
- async function（新增）
- generatorFunction

中间件和express的中间件类似，是有顺序的，注意，大部分人都坑死在顺序上

下面以写一个logger中间件为例，一一阐明

### 最常见的写法

node sdk就支持的，就是最常见的

app.js

```
const Koa = require('koa');
const app = new Koa();

app.use((ctx, next) => {
  const start = new Date();
  return next().then(() => {
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
  });
});


// response
app.use(ctx => {
  ctx.body = 'Hello Koa in app.js';
});

app.listen(3000);
```

### async/await 函数 (Babel required)

async/await是异步流程控制更好的解决方案，很多潮人都已经玩起来了，目前node sdk不支持，所以需要babel来转换一下

app-async.js

```
const Koa = require('koa');
const app = new Koa();

app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// response
app.use(ctx => {
  ctx.body = 'Hello Koa in app-async.js';
});

app.listen(3000);
```

### Generator函数

Generator是node 4（严格是0.12）开始支持的es6特性里的非常重要的一个，用generator和promise实现流程控制，让co充当执行器这一个角色，也是个不错的解决方案

千万别把generator叫成生成器，我们一般习惯把scaffold叫成生成器

app-generator.js

```
const Koa = require('koa');
const app = new Koa();
const co = require('co');

app.use(co.wrap(function *(ctx, next) {
  const start = new Date();
  yield next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
}));

// response
app.use(ctx => {
  ctx.body = 'Hello Koa  in app-generator.js';
});

app.listen(3000);
```

### 测试

启动执行

```
npm i -g runkoa

runkoa app.js
runkoa app-async.js     
runkoa app-generator.js 
```

测试发起 http 请求

```
$ curl http://127.0.0.1:3000
Hello Koa in app.js
```

## v3将移除单纯的以generator作为中间件的写法

    Old signature middleware (v1.x) support will be removed in v3

实际是koa核心包含了一个叫koa-convert的模块，它里面warning说，以generator作为中间件的写法将在koa@3里不支持

但是用co或koa-convert转过的还是可以的，本文的3种写法都是长期支持的

这样写不行。。。。

```
// Koa will convert
app.use(function *(next) {
  const start = new Date();
  yield next;
  const ms = new Date() - start;
  console.log(`${this.method} ${this.url} - ${ms}ms`);
});
```

这样写是可以的

```
const convert = require('koa-convert');

app.use(convert(function *(next) {
  const start = new Date();
  yield next;
  const ms = new Date() - start;
  console.log(`${this.method} ${this.url} - ${ms}ms`);
}));
```

## Babel支持

我本人比较讨厌写babel，对于node sdk不支持的特性持观望态度，比如async/await这样的神器是可以用的，其他的是不一定一定要上的，那就观望好了

如果在koa 2里用到async/await就需要babel支持了

- es2015-node5（nodejs 5.x里支持的es6特性）
- stage-3（包含async/await）

可是，我还是不想用，就几行代码能搞定的事儿，我不想看到babel出现在我的代码里，于是就有了前面用到的runkoa，它的原理也是这样的，不过看起来更clean一些

## 总结

Node.js 4.x和5.x支持的es特性还是有很大差异的，如果不用到，还好，万一用到就只能babel去转换，还有就是async支持，必须要stage-3，那么也还是需要babel。

    Node.js sdk迟迟不更新很讨厌,babel更新太快也很讨厌

但是，无论从性能，还是流程控制上，koa 2和它的后宫（中间件）都是非常好的解决方案
