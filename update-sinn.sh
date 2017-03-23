# @ author sessionboy 
# @ github https://github.com/sessionboy
# @ website http://sinn.boyagirl.com
# @ docker sinn生产环境一键自动化部署
# @ use  使用rsync同步本地代码到远程服务器，并执行docker构建、启动发布以及清除旧镜像等命令
# @ tip 如果你使用的是window系统, 可使用cwrsync
# -- 命令详解 --
# 一，将'./'（当前目录）下的所有文件同步到ip为10.10.10.10的远程服务器的/home/sinn/server目录下(目录可改，可自行创建)
# 二，使用ssh命令登录到ip为10.10.10.10的远程服务器
# 三，cd(进入)远程服务器的/home/sinn/server目录
# 四，串行执行 build.sh, push.sh, release.sh三个脚本（分别是构建，推送，和启动项目镜像）
# 五, 批量清除名为'none'的旧镜像，避免占用服务器空间 ，如果出现错误，可忽视
# 一键部署就此结束

rsync -cavzP --delete-after ./ --exclude-from='.rsync-exclude' root@10.10.10.10:/home/sinn/server
ssh root@10.10.10.10 "\
cd /home/sinn/server; \
sh ./build/build-sinn.sh && sh ./build/push-sinn.sh && sh ./build/release-sinn.sh; \
docker images | grep none | awk '{print $3}' | xargs docker rmi \
"