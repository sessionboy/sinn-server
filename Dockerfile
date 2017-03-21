From registry.cn-hangzhou.aliyuncs.com/sessionboy/node:7.5

MAINTAINER sessionboy <postmaster@boyagirl.com>

COPY ./ /sinn-server
WORKDIR /sinn-server
RUN npm install

EXPOSE 8080

ENTRYPOINT ["node","bin/run"]