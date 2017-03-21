/*
* @ author sessionboy 
* @ github https://github.com/sessionboy
* @ website http://sinn.boyagirl.com
* @ use 用户评论schema
*/ 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  author: { type: Object },
  article_id: { type: Schema.Types.ObjectId, require: true },
  comment_title: { type: String },
  praise: { type: Number, default: 0 }, 
  contents: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Comment', CommentSchema);