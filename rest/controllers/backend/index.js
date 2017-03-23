/*
* @ author sessionboy 
* @ github https://github.com/sessionboy
* @ website http://sinn.boyagirl.com
* @ use 管理后台文章相关接口逻辑层
*/ 

import { UserModel } from '../../models/index';
import mongoose from 'mongoose';
import menu from '../config/menu';
import moment from 'moment';
const CategoryModel = mongoose.model('Category');
const TopCategoryModel = mongoose.model('TopCategory');

class BackendMain {

  // 登录页渲染
  static async Index(ctx) {
    return ctx.render('login', { title: 'SInn管理平台'});
  }
  
  // 首页渲染
  static async home(ctx) {
    console.log(ctx.flash);
    const user = ctx.session.user;
    return ctx.render('home', { title: 'SInn管理平台',message:'这里是首页',user });
  }
  
  // 分类管理
  static async category(ctx){

    let Index = 1;
    let current = 1;
    const user = ctx.session.user;
    const { type,model,item,page } = ctx.query;

    if(item) Index =item;
    if(page) current = page;   
    const limit = 6;
    const skip = (Number(current)-1)*limit;  

    const count = await mongoose.model(model).count();
    const data = await mongoose.model(model).find().skip(skip).limit(limit).populate('cate_parent');
    const tcate = await TopCategoryModel.find();

    return ctx.render(type, { title: 'SInn管理平台',
      data,
      model,
      user,
      count,
      type,
      tcate,
      current,
      index: Index,
      moment: require('moment'),
      path: 'categorys/'+model,
      menu:menu[type] 
    });
  }

  // 文章管理
  static async article(ctx){
    let Index = 1;
    const { type,item } = ctx.query;
    if(item) Index =item;
    const user = ctx.session.user;
    return ctx.render('article', { 
      title: 'SInn管理平台',
      message:'文章管理',
      user,
      index: Index,
      menu:menu[type]  
    });
  }

  // 用户管理
  static async user(ctx){
    let Index = 1;
    const { type,item } = ctx.query;
    if(item) Index =item;
    const user = ctx.session.user;
    return ctx.render('user', { 
      title: 'SInn管理平台',
      message:'用户管理',
      user,
      index: Index,
      menu:menu[type]
    });
  }

}

export default BackendMain;
