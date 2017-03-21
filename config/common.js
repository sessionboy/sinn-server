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
* @ 可根据你自己的需要选择其一即可
*/ 
module.exports={

  // 开发环境配置
	development: {  
     mongo: {
        uri: 'mongodb://localhost:27017/sinn'
      },
     port: '8080',
     qiniu: { // 七牛云sdk配置 (仅供参考)
       ACCESS_KEY: 'mByE5QDSVDBDBFABFDNFSADVFDBVxIxVpjOyj',
       SECRET_KEY: '2BsmtqR_DBGFNGNGDFDDSESFGRGHGFHGRoDkS',
       bucket: 'sinn',
       baseUrl: "http://oma6qcctt.bkt.clouddn.com/",
     },
     alioss: { // 阿里云oss sdk配置  (仅供参考)
       region: 'oss-cn-shenzhen',
       accessKeyId: 'ALALsdfSLdfgSD',
       accessKeySecret: '5jWRVV8DVFDV8D67F6D6G76G7F6GD764XS',
       bucket: 'sinn',
       folder: 'images/'  // 上传到sinn空间的images文件夹下
     }
	},

  // 生产环境配置
	production: {  
	  mongo: {
        uri: 'mongodb://localhost:27017/sinn'
      },
     port: '8080',
     qiniu: { // 七牛云sdk配置 (仅供参考)
       ACCESS_KEY: 'mByE5QDSVDBDBFABFDNFSADVFDBVxIxVpjOyj',
       SECRET_KEY: '2BsmtqR_DBGFNGNGDFDDSESFGRGHGFHGRoDkS',
       bucket: 'sinn',
       baseUrl: "http://oma6qcctt.bkt.clouddn.com/",
     },
     alioss: { // 阿里云oss sdk配置  (仅供参考)
       region: 'oss-cn-shenzhen',
       accessKeyId: 'ALALsdfSLdfgSD',
       accessKeySecret: '5jWRVV8DVFDV8D67F6D6G76G7F6GD764XS',
       bucket: 'sinn',
       folder: 'images/'  // 上传到sinn空间的images文件夹下
     }
	}
}







