const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReplySchema = new Schema({
  author: { type: Schema.Types.ObjectId,ref:'User' },
  coment_title: { type: String },
  praise: { type: Number, default: 0 }, 
  reply: [{ type: Schema.Types.ObjectId,ref:'User' }], 
  contents: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Reply', ReplySchema);