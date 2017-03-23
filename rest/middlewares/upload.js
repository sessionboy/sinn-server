/*
* @ author sessionboy 
* @ github https://github.com/sessionboy
* @ website http://sinn.boyagirl.com
* @ use 阿里oss和七牛云图片上传中间件
* @ qiniu   上传到七牛云
* @ alioss  上传到阿里云oss
*/ 
import fs from 'fs';
const qiniu = require('../utils/qiniu');
const alioss = require('../utils/alioss');
const config = require('../../config/common');
const globalConfig = config[process.env.NODE_ENV||'development'];

class UploadController {

  // 图片上传到七牛云中间件
  static async qiniu (ctx,next){   
    const { fields,files } = ctx.request.body;
 
    if(!files||!files.file){
      return ctx.error({ msg: '上传失败!' });
    }
    const { id } = fields;
    const userid = ctx.cookies.get('userid');
    if(!id || !userid || id!=userid) return ctx.error({ msg:'您还没有登录哦!'});

    const isexit = await fs.existsSync(files.file.path);
    if(!isexit) return ctx.error({ msg: '上传文件时发生错误!' });
    
    const filekey = id+files.file.name;
    const result = await qiniu(filekey,files.file.path);
    if( !result || !result.url ) return ctx.error({ msg: '上传到云端时发生错误!' });

    const { url } = result;
    fs.unlinkSync(files.file.path);
    ctx.upload = { url,id }; // 挂载在ctx, 传递给下个中间件
    await next(); 
  }
  
   // 图片上传到阿里云oss中间件
  static async alioss (ctx,next){   
    const { fields,files } = ctx.request.body;
    if(!files||!files.file){
      return ctx.error({ msg: '上传失败!' });
    }
    const { id } = fields;
    const userid = ctx.cookies.get('userid');
    if(!id || !userid || id!=userid) return ctx.error({ msg:'您还没有登录哦!'});

    const isexit = await fs.existsSync(files.file.path);
    if(!isexit) return ctx.error({ msg: '上传文件时发生错误!' });
    
    let filekey = id+files.file.name;
    if(globalConfig.alioss.folder){
      filekey = globalConfig.alioss.folder+filekey;
    }

    const result = await alioss(filekey,files.file.path);
    if( !result || !result.url ) return ctx.error({ msg: '上传到云端时发生错误!' });
   
    const { url } = result;
    fs.unlinkSync(files.file.path);
    ctx.upload = { url,id };  // 挂载在ctx, 传递给下个中间件
    await next(); 
  }

}

export default UploadController;
