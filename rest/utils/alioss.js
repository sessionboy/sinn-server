
/*
* @ author sessionboy 
* @ github https://github.com/sessionboy
* @ website http://sinn.boyagirl.com
* @ use  阿里云oss对象存储实现，用于文件上传
* @ 具体调用可见/controllers/frontend/shared
* @ 由于ali-oss的node sdk目前只支持generator,因此需要用co和promise做一层封装以支持async/await
*/ 
const co = require('co');
const OSS = require('ali-oss');
const config = require('../../config/common');
const globalConfig = config[process.env.NODE_ENV||'development'];

module.exports=(key,path)=>{
 const client = new OSS(globalConfig.alioss);
  return new Promise((resolve, reject) => {
   co(function* () {
    const result = yield client.put(key,path);
    resolve(result)
   }).catch(function (err) {
    reject(err);
   });
 })
}