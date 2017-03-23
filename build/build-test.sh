# @ author sessionboy 
# @ github https://github.com/sessionboy
# @ website http://sinn.boyagirl.com
# @ use  构建项目镜像 (仅供参考)
# docker build 镜像名  //构建镜像命令, 执行该命令时docker会自动寻找Dockerfile文件，并根据Dockerfile指令执行镜像构建
# -t 指定tag(标签/版本) 
# .  当前目录下
# 解读：在当前目录下执行docker build命令，构建名为registry.cn-hangzhou.aliyuncs.com/sessionboy/sinn，版本为v2的镜像

docker build -t registry.cn-hangzhou.aliyuncs.com/sessionboy/sinn:v2 .