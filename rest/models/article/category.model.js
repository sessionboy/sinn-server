/*
* @ author sessionboy 
* @ github https://github.com/sessionboy
* @ website http://sinn.boyagirl.com
* @ TopCategory 一级分类schema
* @ Category    二级分类schema
*/ 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  cate_name: { type: String, default: "" },                         // 文章类别
  cate_info: { type: String, default: "" },                         // 类别简述
  cate_parent: { type: Schema.Types.ObjectId, ref: 'TopCategory' }, // 所属顶层分类
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Category', CategorySchema);