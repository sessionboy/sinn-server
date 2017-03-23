/*
* @ author sessionboy 
* @ github https://github.com/sessionboy
* @ website http://sinn.boyagirl.com
* @ use 管理后台文章相关接口逻辑层
*/ 

import { UserModel } from '../../models/index';
import mongoose from 'mongoose';
//const UserModel = mongoose.model('User');
const CategoryModel = mongoose.model('Category');
const TopCategoryModel = mongoose.model('TopCategory');

class BackendArticle {

  // 创建一级分类
  static async create_tcate(ctx) {
    const data = ctx.request.body;
    const tcate_name = data.tcate_name;
    if(!data||!tcate_name) return ctx.render('error',{
         message: '信息错误!',
         error: { status:404 }
    })
    const isexit = await TopCategoryModel.findOne({ tcate_name });
    if(isexit) return ctx.render('error',{
      message: '该分类已存在!',
      error: { status:500 }
    })
    const resuft = await TopCategoryModel.create(data);
    ctx.redirect('back');
  }

  // 创建二级分类
  static async create_acate(ctx) {
    const data = ctx.request.body;
    const cate_name = data.cate_name;
    if(!data||!cate_name) return ctx.render('error',{
         message: '信息错误!',
         error: { status:404 }
    })
    const isexit = await CategoryModel.findOne({ cate_name });
    if(isexit) return ctx.render('error',{
         message: '该分类已存在!',
         error: { status:500 }
    })
    const resuft = await CategoryModel.create(data);
    ctx.redirect('back');
  }

  // 编辑一级分类
  static async put_tcate(ctx){
    const { id,tcate_name } = ctx.request.body;
    if(!id || !tcate_name) ctx.render('error',{
       message: '不能为空!',
       error: { status:500 }
    })
    const result = await TopCategoryModel.findByIdAndUpdate(id,{tcate_name});
    ctx.redirect('back');
  } 

  // 编辑二级分类
  static async put_acate(ctx){
    const { cateid,cate_name,cate_info,cate_parent } = ctx.request.body;
    if(!cateid || !cate_name || !cate_info || !cate_parent) ctx.render('error',{
       message: '信息错误!',
       error: { status:404 }
    })
    const result = await CategoryModel.findByIdAndUpdate(cateid,{cate_name,cate_info,cate_parent});
    ctx.redirect('back');
  } 

  // 删除分类
  static async delete_cate(ctx){
    const { model,type } = ctx.query;
    const { id } = ctx.params;
    if(!id || !model) return ctx.render('error',{
      message: '参数错误!',
      error: { status:400 }
    })
    const result = await mongoose.model(model).findByIdAndRemove(id);
    ctx.redirect('back');
  }

}

export default BackendArticle;
