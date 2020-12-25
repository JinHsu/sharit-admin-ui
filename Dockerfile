#指定基础镜像，在其上进行定制
FROM nginx:1.19

VOLUME /tmp

#######设置容器的上下文路径为./deploy

#复制上下文目录下的 dist/ 到容器里
COPY dist/ /usr/share/nginx/html/

COPY default.conf /etc/nginx/conf.d/default.conf

#设置docker容器环境时区
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone