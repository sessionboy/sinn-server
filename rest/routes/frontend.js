/*
* @ author sessionboy 
* @ github https://github.com/sessionboy
* @ website http://sinn.boyagirl.com
* @ use 前端的接口配置
* @ 逻辑层实现 /controllers/frontend/*
*/ 

import { 
  IndexController,
  ArticleController,
  UserController,
} from '../controllers/frontend.export';
import upload from '../middlewares/upload';
const router = require('koa-router')();

// cors 处理跨域
// router.all('/api/*', async (ctx,next)=>{  
//   ctx.set("Access-Control-Allow-Origin", "*");  
//   await next();  
// });    

  // 前端sinn Api 
router 
  .get('/api/query',IndexController.query)                                             // 获取首页数据 

  // 文章相关api
  .get('/api/article/get_detail',ArticleController.get_detail)                         // 获取文章详情
  .get('/api/article/get_category',ArticleController.get_category)                     // 获取文章类别
  .get('/api/article/getmenu_category',ArticleController.getmenu_category)             // 获取菜单列表
  .post('/api/article/create_upload', upload.alioss, ArticleController.create_upload)  // 上传文章封面图
  .post('/api/article/create',ArticleController.create)                                // 发表文章
  .post('/api/article/create_comment',ArticleController.create_comment)                // 发表评论
  .put('/api/article/article_put',ArticleController.article_put)                       // 编辑文章
  .put('/api/article/article_praise',ArticleController.article_praise)                 // 点赞文章
  .delete('/api/article/del_article',ArticleController.del_article)                    // 删除文章
  .delete('/api/article/del_comment',ArticleController.del_comment)                    // 删除评论
  
  // 用户相关api
  .get('/api/user/logout',UserController.logout)                                       // 用户退出
  .post('/api/user/login',UserController.login)                                        // 用户登录
  .post('/api/user/register',UserController.register)                                  // 用户注册
  .get('/api/user/personal',UserController.personal)                                   // 用户个人中心信息
  .post('/api/user/put_avatar', upload.alioss, UserController.put_avatar)              // 上传用户头像
  .put('/api/user/put_userinfo',UserController.put_userinfo);                          // 更新用户个人信息

  
module.exports = router;





