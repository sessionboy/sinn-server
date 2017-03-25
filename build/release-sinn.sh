# @ author sessionboy 
# @ github https://github.com/sessionboy
# @ website http://sinn.boyagirl.com
# @ use  生产项目docker镜像启动脚本 (仅供参考)
# --参数详解--
# @ docker kill server   强制关闭容器server (你也可以用docker stop server更为优雅)
# @ docker rm server   删除容器server
# @ --name server  指定docker容器名为server
# @ -p 8090:8090 指定端口号映射，容器内暴露8090端口映射到服务器8090端口  
# @ -d 以守护进程方式运行
# @ -e 'NODE_ENV=production' 指定NODE_ENV环境变量为production
# @ --restart=always 程序奔溃时重新启动 
# @ registry.cn-hangzhou.aliyuncs.com/sessionboy/sinn:v1  // 冒号前为镜像名称，后是标签，也可以理解为版本号

docker kill server 
docker rm server
docker run --name server -p 8090:8090 -d -e 'NODE_ENV=production' --restart=always registry.cn-hangzhou.aliyuncs.com/sessionboy/sinn:v1