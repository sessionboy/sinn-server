/*
* @ author sessionboy 
* @ github https://github.com/sessionboy
* @ website http://sinn.boyagirl.com
* @ use 一级分类schema
*/ 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TopCategorySchema = new Schema({
  tcate_name: { type: String, default: "" },   // 顶层类别，也就是一级类别
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('TopCategory', TopCategorySchema);