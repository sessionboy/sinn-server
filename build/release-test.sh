# @ author sessionboy 
# @ github https://github.com/sessionboy
# @ website http://sinn.boyagirl.com
# @ use  测试项目docker镜像启动脚本 (仅供参考)
# --参数详解--
# @ docker kill server-test   强制关闭容器server-test  你也可以用docker stop server-test
# @ docker rm server-test   删除容器server-test
# @ --name server-test  指定docker容器名为server-test
# @ -p 8080:8080 指定端口号映射，容器内暴露8080端口映射到服务器8080端口  
# @ -e 'NODE_ENV=development' 指定NODE_ENV环境变量为development
# @ --restart=always 程序奔溃时重新启动 
# @ registry.cn-hangzhou.aliyuncs.com/sessionboy/sinn:v2  // 冒号前为镜像名称，后是标签，也可以理解为版本号
  
docker kill server-test 
docker rm server-test
docker run --name server-test -p 8080:8080 -d -e 'NODE_ENV=development' --restart=always registry.cn-hangzhou.aliyuncs.com/sessionboy/sinn:v2