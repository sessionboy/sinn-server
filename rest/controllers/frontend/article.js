/*
* @ author sessionboy 
* @ github https://github.com/sessionboy
* @ website http://sinn.boyagirl.com
* @ use 文章及其相关接口逻辑层
*/ 

import mongoose from 'mongoose';
const UserModel = mongoose.model('User');
const ArticleModel = mongoose.model('Article');
const CategoryModel = mongoose.model('Category');
const TopCategoryModel = mongoose.model('TopCategory');
const CommentModel = mongoose.model('Comment');

class ArticleController {
 
  // 发表文章 
  static async create(ctx) {
    const user = ctx.session.user;
    if(!user) return ctx.error({ msg: '你还没有登录哦!' });
    
    const { name, _id } = user;
    const data = ctx.request.body;
    
    if(!data) return ctx.error({ msg: '发送数据失败!' });
    const isexit = await ArticleModel.findOne({ title:data.title });
    if(isexit) return ctx.error({ msg: '该标题已存在!' });

    data.author = _id;
    data.praise = { user:[],num:0};
    const resuft = await ArticleModel.create(data);
    if(!resuft) return ctx.error({ msg: '文章创建失败!' });

    return ctx.success({ msg:'发表成功!',data:resuft });
  }

  // 上传文章封面图
  static async create_upload(ctx) {
   const { url,id } = ctx.upload; 
   if(!url) return ctx.error({ msg:'上传失败!' });
   return ctx.success({ msg:'上传成功!',data: { url,id } });
  }

  // 发布评论
  static async create_comment(ctx) {

    const user = ctx.session.user;
    if(!user) return ctx.error({ msg: '你还没有登录哦!' });

    const { name,nickname, _id,avatar } = user;
    const data = ctx.request.body;
    if(!data) return ctx.error({ msg: '获取评论失败!' });

    data.author = { name, nickname, _id,avatar };
    const resuft = await CommentModel.create(data);  
    if(!resuft) return ctx.error({ msg: '发表评论失败!' });

    const queryId = data.article_id;
    const fields = {$push: {comments:resuft._id}};
    const update_commentId = await ArticleModel.findByIdAndUpdate(queryId,fields);
    if(!update_commentId) ctx.error({ msg: '发表评论失败!' });

    const comments = await CommentModel
              .find({ article_id: queryId })
              .sort({createdAt:'-1'})
              .limit(10);
    return ctx.success({ msg:'评论发表成功!',data:{ comments } });
  }

  // 查询二级文章分类
  static async get_category(ctx) {
   const data = await CategoryModel.find();
   if(!data) return ctx.error({msg: '暂无数据'});
   return ctx.success({ data });
  }

  // 查询分类菜单
  static async getmenu_category(ctx) {
    const acate = await CategoryModel.find().populate('cate_parent');
   const tcate = await TopCategoryModel.find();
   const data = { acate, tcate };
   return ctx.success({ data });
  }

  // 获取文章详情、评论
  static async get_detail(ctx) {
   let { id,pageSize,current } = ctx.query;
   const data = await ArticleModel
              .findById(id)
              .populate('author',{ password:0 })
              .populate('comments');
   if(!data) return ctx.error({msg: '获取详情数据失败!'});

   const review = data.review+1;
   const updateview = await ArticleModel.findByIdAndUpdate(data.id,{$set:{review}});

   if(!current) current = 1;
   if(!pageSize) pageSize = 10;
   const skip = (Number(current)-1)*Number(pageSize);
   const totals = await CommentModel.find({ article_id: id }).count();

   const comments = await CommentModel
              .find({ article_id: id })
              .sort({createdAt:'-1'})
              .skip(Number(skip))
              .limit(Number(pageSize));
   return ctx.success({ data:{ data,comments,totals,current } });

  }
 
   // 点赞文章
  static async article_praise(ctx) { 
   let num;  
   let user;
   let praise;
   const { id } = ctx.request.body;
   if(!id) return ctx.error({ msg: '文章id不存在!' });

   const result = await ArticleModel.findById(id,{ praise:1 });
   if(!result||!result.praise) return ctx.error({ msg: '查找文章时发生错误!' });
   if(result.praise.user.indexOf(id)!=-1){
    return ctx.error({ msg: '您已点赞过,不可再点赞哦!' });
   }

   if(!result.praise.num){
     num = 1;
   }else{
     num = Number(result.praise.num)+1;
   }
   user = result.praise.user;
   user.push(id);
   praise = {user,num};

   const data = await ArticleModel
              .findByIdAndUpdate(id,{$set:{praise}},{ new:true })
              .populate('author',{ password:0 })
              .populate('comments');
   if(!data) return ctx.error({ msg: '点赞失败!' });

   return ctx.success({ msg:'恭喜你哦，点赞成功!',data: { data }});
  }
  
   // 编辑文章
  static async article_put(ctx) {   
   const { id } = ctx.request.body;
   return ctx.success({ msg:'待开发' });
  }

   // 删除文章
  static async del_article(ctx) {   
   const { id } = ctx.query;
   return ctx.success({ msg:'待开发' });
  }

   // 删除评论
  static async del_comment(ctx) {   
   const { id } = ctx.query;
   return ctx.success({ msg:'待开发' });
  }

}

export default ArticleController;
