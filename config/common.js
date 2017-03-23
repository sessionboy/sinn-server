/*
* @ author sessionboy 
* @ github https://github.com/sessionboy
* @ website http://sinn.boyagirl.com
* @ use 项目配置文件
* @ development 开发环境配置
* @ production  生产环境配置
* @ mongo && port  数据库连接配置
* @ qiniu  七牛云文件上传配置
* @ alioss 阿里云oss文件上传配置
* @ 七牛和阿里oss都提供了非常好且优惠的对象存储云服务,
* @ 可作为cdn空间存放你的图片，视频等等静态资源
* @ 阿里云和七牛云，可根据你自己的需要选择其中之一即可，
* @ 如果你使用亚马逊云，新浪云等等其他云服务，则需要另外自行开发上传中间件
*/ 
module.exports={

  // 开发环境配置
  development: {
     mongo: {
        uri: 'mongodb://localhost:27017/test'
      },
     port: '8080',
     qiniu: {  // 七牛云sdk配置 (仅供参考)
       ACCESS_KEY: '授权key',   // 示例：'SVDBGFNHBFSBFDNGSBRSVFDV'
       SECRET_KEY: '秘钥key',   // 示例：'XVDFNBDNTWGECdterfnfdvac345edfv'
       bucket: '空间',          // 示例: 'sinn'
       baseUrl: "http://oma6qcctt.bkt.clouddn.com/",
     },
     alioss: {  // 阿里云oss sdk配置  (仅供参考)
       region: '区域',              // 示例：'oss-cn-shenzhen'
       accessKeyId: '授权key',      // 示例：'SVDFBGBFBFDNGSBRSVFDV'
       accessKeySecret: '秘钥key',  // 示例：'WFEWVBGBFBFDNGSBRSVFFDBDV'
       bucket: '空间',              // 示例：'sinn'
       folder: 'images/'  // 上传到空间的images文件夹下，可自定义，文件夹需提前创建
     }
  },

  // 生产环境配置
  production: {
    mongo: {
        uri: 'mongodb://localhost:27017/sinn'
      },
     port: '8080',
     qiniu: { // 七牛云sdk配置 (仅供参考)
       ACCESS_KEY: '授权key',
       SECRET_KEY: '秘钥key',
       bucket: '空间',
       baseUrl: "http://oma6qcctt.bkt.clouddn.com/",
     },
     alioss: { // 阿里云oss sdk配置  (仅供参考)
       region: '区域',           
       accessKeyId: '授权key',
       accessKeySecret: '秘钥key',
       bucket: '空间',
       folder: 'images/'  // 上传到空间的images文件夹下，可自定义，文件夹需提前创建
     }
  }
}
