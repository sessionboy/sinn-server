# @ author sessionboy 
# @ github https://github.com/sessionboy
# @ website http://sinn.boyagirl.com
# @ use  项目docker镜像启动脚本 (仅供参考)
# --参数详解--
# @ --name sinn-server  指定docker容器名为sinn-server
# @ -p 8080:8080 指定端口号映射，容器内暴露8080端口映射到服务器8080端口  
# @ -e 'NODE_ENV=production' 指定NODE_ENV环境变量为production 
# @ --restart=always 程序奔溃时总是重启 

docker kill sinn-server 
docker rm sinn-server
docker run --name sinn-server -p 8080:8080 -d -e 'NODE_ENV=production' --restart=always registry.cn-hangzhou.aliyuncs.com/sessionboy/sinn:v1