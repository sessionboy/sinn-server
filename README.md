## sinn-server
 [sinn-server](https://github.com/sessionboy/sinn)是[sinn](https://github.com/sessionboy/sinn)的后端实现，支持async/await，docker一键部署，Resful风格API，支持阿里云oss和七牛云存储，自带管理后台。

 * 线上测试demo: http://servertest.boyagirl.com

 * 测试账户: sinn  密码：admin
 
 如果觉得可以，右上角点颗星星噢~
 
## 主要技术栈 
```
nodejs, koa2, mongoose, docker, es6, async/await,  Resful API
```
     
## HOW TO USE?
   
#### 一，node版本要求      
     
* node版本7.x，推荐使用最新版本     
     
* 使用koa2，默认支持async/await，7.x以上node版本      
   
#### 二，项目配置    
   
* 前提:   确定本地已安装和启动mongodb，并可正常访问 (配置远程数据库可忽略)  
   
* 数据库配置： 在/config/common.js中配置你的数据库信息，分development/production，默认mongodb://localhost:27017/sinn    
   
```
# 默认配置 
mongo: {
    uri: 'mongodb://localhost:27017/sinn'
 }    
   

# 连接远程数据库示例
   
mongo: {
    uri: 'mongodb://10.0.10.10:27017/sinn'
 }      
    
# 带验证数据库连接示例
   
mongo: {
    uri: 'mongodb://用户名:密码@10.0.10.10:27017/sinn'
 }      
```     
   
* 端口号port： 在/config/common.js中配置你的port，默认8080端口     
   
* 管理后台默认账户配置:   在/config/admin.js中配置你的管理员账户，用于管理后台登录      
    
  ```
  # 默认账户   
  {
     name: 'sinn',
     password: md5('admin')  // md5用于加密，登录时输入admin即可
  }
  ```     
   

#### 三，启动       
    
* 首先拉代码     
     

```
git clone git@github.com:sessionboy/sinn-server.git
```    
     
* 安装依赖    
     
```
npm install
```      
    
或者使用淘宝镜像(推荐)     
    
```
npm install --registry=https://registry.npm.taobao.org
```    
    
* 开发环境启动     
   
```
npm run dev
```
      
* 生产环境启动    
   
```
npm start
```      
   
* 浏览器打开    
   
```
http://localhost:8080
```
* 管理后台可用你在/config/admin.js配置的账号登录，登录后可在用户管理中添加新管理账户   
* 前端上传功能需要先配置好sdk，在/config/common.js中配置，默认采用阿里云oss
* 如果你使用七牛云，请先配置好七牛云的sdk，并在/rest/routes/frontend.js修改上传接口的中间件为七牛中间件,如下:
```
 ……
 post('/api/article/create_upload', upload.qiniu, ArticleController.create_upload)
 ……
 post('/api/user/put_avatar', upload.qiniu, UserController.put_avatar)
 ……
```

#### 三，项目结构      
   
* 入口文件：  app.js    
     
* 项目配置文件:    /config/*    
   
* 静态资源目录:   /public/*    
   
* 管理后台视图 :   /views/*     
    
* rest api :    /rest/*     
  
* 工具库 :  /rest/utils/*     
  
* 接口router配置 :  /rest/routes/*     
      
* schema/数据库 :  /rest/models/*      
  
* 接口逻辑层 :  /rest/controllers/*     
  
* 公共中间件 :  /rest/middlewares/*     
  
提示：在rest中，frontend是为前端[sinn](https://github.com/sessionboy/sinn)准备的API, 而backend则是为sinn-server管理后台准备的API   
           
##   统一处理响应请求 (成功/失败)  
   
  为了方便统一处理，封装了统一响应中间件response.js   
  响应中间件规定了数据响应格式，是与前台约定的规则    
  具体请看/rest/middlewares/response.js  的注释详解    

  ```
# 返回错误
  调用 ctx.error({
         msg: '响应的错误提示',
         status: '自定义错误码，默认为400',
         data: '响应错误时可返回的数据',
         error: '响应的具体错误信息'
       })      
     
# 返回成功    
  调用 ctx.success({
      msg: '响应的成功提示',
      data: '响应的数据',
    })
  ```

##   统一错误处理

错误分两种，一种是api的错误，另一种则是内部错误 ，api错误需要手动处理， 内部错误则使用try/catch捕获   
   
#### 一，api错误   
      
api错误很常见，可分场景，类型也很多种，对于api错误，可在代码逻辑中使用ctx.error()方法作响应处理 , 示例：
   
```
  async login(){
   
    const { username, password } = ctx.request.body; 

    if( !username || !password ) return ctx.error({ msg: '信息填写错误!', status: 403 })     
    
    ……

  }
```
   
#### 二， 内部错误     
    
* 所谓内部错误，即由node内部throw机制抛出的异常错误，比如500错误。    
   
* 对于这类错误，则需要使用try/catch来捕获，但如果每个接口逻辑中都try/catch一遍，那是极其繁琐的，也不雅观。为此可以封装一个try/catch中间件，用于捕获这类异常，并对客户端作出响应    
   
* try/catch中间件:  /rest/middlewares/filter.js     
  

   
该中间件使用了[tracer](https://github.com/baryon/tracer)处理错误日志，你并不需要做什么    
   
如果你需要自定义拓展，比如改用[log4js](https://github.com/nomiddlename/log4js-node)处理错误日志，可自行修改   

 
## 文件上传 ( 支持阿里云oss / 七牛云  ) 
   
 本人使用阿里云服务器，于是使用阿里云oss作为cdn存储空间    
   
 鉴于很多人习惯使用七牛云，于是多封装了个七牛云上传中间件（个人推荐强大的阿里云）    
   
#### 一，阿里云oss上传    
     
* 信息配置：/config/common.js    示例:      
    
```
// 图片上传到阿里云oss
alioss: { 
       region: 'oss-cn-shenzhen',     // 仅做参考
  
       accessKeyId: 'ALALsdfSLdfgSD',     // 仅做参考

       accessKeySecret: '5jWRVV8DVFDV8D67F6D6G76G7F6GD764',     // 仅做参考

       bucket: 'sinn',    // 空间名, 仅做参考

       folder: 'images/'  // 上传到空间下指定文件夹，需要提前创建。不填则会上传到空间根目录下。

 }
```
    
* sdk封装:  /rest/utils/alioss.js  (已封装好，你不需要做修改)  
   
* ali-oss上传中间件:  /rest/middlewares/upload.js ——  alioss

* 中间件使用：只需要在定义接口时加入alioss中间件即可。该上传中间件会返回两个字段    
    
  url: 文件上传成功后返回的可访问该文件的url   
     
  id: 登录用户的id   （ 前端调用上传接口时需要提供用户id字段 ）

中间件会把这两个字段用upload对象 { url, id } 挂载在ctx传递给下个中间件，具体实现:  
   
```
 ……
   ctx.upload = { url , id }  // 上传结果挂载在ctx,传递给下个中间件  
 ……

```
因此，你可以在API逻辑层中直接获取到上传结果 ，上传的逻辑已经由中间件处理完成    
   

示例：  
   
```
 import upload from '../middlewares/upload'; // 引入上传中间件

 const router = require('koa-router')();

 router.post('/api/upload',upload.alioss, async (ctx)=>{
    
   const { url, id } = ctx.upload;   // 可直接在ctx获取到上传结果upload对象
   
   ……
})    
   
```
    
#### 二，七牛云上传中间件    
    
* 信息配置:    /config/common.js  (和阿里云oss不同的是七牛不支持在空间下自定义文件夹，因此不需要配置folder)
    
* sdk封装:    /rest/utils/qiniu.js  (已封装好，你不需要做修改)   
   
* qiniu上传中间件:  /rest/middlewares/upload.js ——  qiniu    
   
   qiniu中间件的用法和alioss中间件用法相同，不同在于它们调用的sdk不同   
   

 ## 项目部署    
   
 * server端使用[docker](https://docs.docker.com)进行部署，如果你不了解[docker](https://docs.docker.com)，可先自行学习一番，相信用过之后你会着迷        
   
* 当然你也可以不使用[docker](https://docs.docker.com)部署，完全可以手工搭建各种环境来实现部署，具体看个人情况    
   
* 个人推荐使用docker  
   
####  一， docker 脚本    
   
本开源项目提供四个docker脚本（仅供参考）, 分别是build.sh, push.sh , release.sh, Dockerfile    
```
# node基础镜像可根据自身需要来调整,你可以采用你自己的
# 默认采用我仓库的node镜像(docker官方node镜像,node版本7.5)，你可以直接使用   

* Dockerfile  镜像构建配置脚本 
    
* build.sh   构建项目镜像   
   
* push.sh  推送项目镜像     
   
* release.sh   启动项目镜像 （跑项目）
```
     
请根据你自己的服务器配置，对以上脚本做相应的配置更改
  
####  二， 一键部署——update-release.sh （仅供参考）    
   
* 这个脚本使用rsync实现代码同步，并执行上面四个脚本，最终实现一键部署    
   
* 需要根据自己的使用环境作相应的更改   
  
