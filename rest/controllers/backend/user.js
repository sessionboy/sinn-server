/*
* @ author sessionboy 
* @ github https://github.com/sessionboy
* @ website http://sinn.boyagirl.com
* @ use 管理后台文章相关接口逻辑层
*/ 

import mongoose from 'mongoose';
import md5 from 'md5';
import Adminconfig from '../../../config/admin';
const AdminUserModel = mongoose.model('AdminUser');
const CategoryModel = mongoose.model('Category');
const TopCategoryModel = mongoose.model('TopCategory');

class BackendUser {
  
  // 添加管理员
  static async create_user(ctx){
   const { name, nickname, password } = ctx.request.body;
   console.log(ctx.request.body);
   if(!name||!password) return ctx.render('error',{
      message: '用户或密码不能为空!',
      error: { status:400 }
    })
   const isexit = await AdminUserModel.findOne({name,password: md5(password)});
   if(isexit) return ctx.render('error',{
      message: '该用户已存在!',
      error: { status:400 }
   })
   const result = await AdminUserModel.create({name,nickname,password: md5(password)});
   ctx.redirect('/');
  }

  // 后台用户登录
  static async signIn(ctx) {
    const { name, password } = ctx.request.body;
    console.log(ctx.request.body);
    if(!name||!password) return ctx.render('error',{
      message: '信息填写错误!',
      error: { status:404 }
    })
    if(name == Adminconfig.name && md5(password)==Adminconfig.password){
      ctx.session.user = { name, password };
      ctx.redirect('/server/home');
    }
    const result = await AdminUserModel.findOne({name,password: md5(password)});
    if(!result) return ctx.render('error',{
      message: '用户或密码错误!',
      error: { status:400 }
    })
    ctx.session.user = result;
    ctx.redirect('/server/home');
  }

  // 后台用户退出
  static async signOut(ctx) {
    ctx.session.user = null;
    return ctx.render('login', { title: 'SInn管理平台'});
  }

}

export default BackendUser;
