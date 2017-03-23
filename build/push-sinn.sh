# @ author sessionboy 
# @ github https://github.com/sessionboy
# @ website http://sinn.boyagirl.com
# @ use  用于推送docker镜像到自己的阿里云镜像仓库 (仅供参考)
# --- 命令详解 ---
# @ docker push 镜像名  // 推送镜像
# 推送前需要先执行 "docker login --username=用户名 镜像仓库地址" 来登录
# 以我的为例，我的仓库地址为: registry.cn-hangzhou.aliyuncs.com ,那么需要先执行以下命令登录仓库:
# 示例： docker login --username=myusername registry.cn-hangzhou.aliyuncs.com
# 如果你使用官方Docker Hub的仓库，登录只需要执行: docker login -u 用户名 -p 密码

docker push registry.cn-hangzhou.aliyuncs.com/sessionboy/sinn:v1