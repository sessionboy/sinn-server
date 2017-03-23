/*
* @ author sessionboy 
* @ github https://github.com/sessionboy
* @ website http://sinn.boyagirl.com
* @ use 首页及主要模块接口逻辑层
*/ 

import { UserModel } from '../../models/index';
import mongoose from 'mongoose';
import moment from 'moment';
const ArticleModel = mongoose.model('Article');

class IndexController {
  
  // 首页数据加载
  static async query(ctx){

   const newdate = moment().format('YYYY-MM-DD HH:mm'); // 当前时间
   const weekdate = moment().subtract(7,'days').format('YYYY-MM-DD HH:mm'); // 7天前
  // const monthsdate = moment().subtract('months',1).format('YYYY-MM-DD HH:mm'); // 一个月前
  
   let catehot;
   let hot;
   let params = {};
   let { pageSize,categoryId,current } = ctx.query;

   if(categoryId) params.categoryId = categoryId;
   if(!current) current = 1;
   if(!pageSize) pageSize = 20;
   
   const skip = (Number(current)-1)*Number(pageSize);
   const totals = await ArticleModel.find(params).count();
   const lists = await ArticleModel.find(params).sort({createdAt:'-1',review:'-1'}).skip(Number(skip)).limit(Number(pageSize))
                                   .populate('author',{ name:1,avatar:1,nickname:1 }).populate('comments');
   if(!lists) return ctx.error({ msg: '暂无数据!' });
   const weekhot = await ArticleModel.find({cover:{ $exists: true,$ne:"" },createdAt:{$in:[newdate,weekdate]}}).count();

   if(weekhot&&weekhot.length>3){
     // 一周时间内发布的前4条有封面图的、阅读量最多的热门文章
      hot = await ArticleModel.find({cover:{ $exists: true,$ne:"" },createdAt:{$in:[newdate,weekdate]}}).sort({review:'-1'})
                              .limit(4).populate('author',{ name:1,avatar:1,nickname:1 });
   } else {
     // 如果一周时间内发布的热门文章不足4，则寻找所有的文章中前4条有封面图的、阅读量最多热门文章
      hot = await ArticleModel  
               .find({cover:{ $exists: true,$ne:"" }})
               .sort({review:'-1'})
               .limit(4)
               .populate('author',{ name:1,avatar:1,nickname:1 });
   } 
   
   if(categoryId) {
     catehot = await ArticleModel.find({ categoryId },{title:1,review:1}).sort({review:'-1'}).limit(10);
   }
   return ctx.success({ data:{ lists,hot,catehot,totals,current } });
  }
  
}

export default IndexController;
