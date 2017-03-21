/*
* @ author sessionboy 
* @ github https://github.com/sessionboy
* @ website http://sinn.boyagirl.com
* @ use  七牛云对象存储实现，用于文件上传
* @ 具体调用可见/controllers/frontend/shared
* @ 返回promise以支持async/await
*/ 
const qiniu = require("qiniu");
const config = require('../../config/common');
const globalConfig = config[process.env.NODE_ENV||'development'];

module.exports=(key,path)=>{

 const qnconfig = globalConfig.qiniu;
 const baseurl = qnconfig.baseUrl;
 qiniu.conf.ACCESS_KEY = qnconfig.ACCESS_KEY;
 qiniu.conf.SECRET_KEY = qnconfig.SECRET_KEY;

 const uptoken=(bucket, key)=>{
	 const putPolicy = new qiniu.rs.PutPolicy(bucket+":"+key);
	 return putPolicy.token();
 }
 
  const token = uptoken(qnconfig.bucket, key);
  const extra = new qiniu.io.PutExtra();
  return new Promise((resolve, reject) => {
   qiniu.io.putFile(token, key, path, extra, function(err, ret) {
      if(!err) {
        resolve({ hash:ret.hash, key:ret.key, url: baseurl+ret.key });
      } else {
        reject(err);
      }
  })
 })
}