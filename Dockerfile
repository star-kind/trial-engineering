# 指定基础镜像是node,latest表示版本是最新
FROM node:latest

# 执行命令,创建文件夹
RUN mkdir -p /home/webapp

# 将根目录下的文件都copy到container[运行此镜像的容器]文件系统的文件夹下
COPY . /home/webapp

WORKDIR /home/webapp

# 安装项目依赖包  
RUN npm config set registry https://registry.npm.taobao.org && \  
    npm install

# 容器对外暴露的端口号
EXPOSE 3100

# 容器启动时执行的命令
CMD ["npm", "start"]