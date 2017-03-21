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