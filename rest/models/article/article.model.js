/*
* @ author sessionboy 
* @ github https://github.com/sessionboy
* @ website http://sinn.boyagirl.com
* @ use 文章schema
*/ 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: { type: String, required: true },
  categoryId: { type: Schema.Types.ObjectId,required: true },  // 文章类别
  modality: { type: String,required: true },                   // 文章形式 连载、原创、转载三种
  In_situ: { type: String },                                   // 原文链接
  cover: { type: String,default:null },                        // 文章封面图
  author: {type: Schema.Types.ObjectId,ref:'User' },
  review: { type: Number, default: 0 },                        // 浏览数量
  praise: { num: Number, user: Array },                        // 点赞 num为点赞数量，user为点赞的用户id
  content: { type: String, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref:'Comment'}],   // 评论
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Article', ArticleSchema);