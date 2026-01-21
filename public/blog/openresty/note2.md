## 第一个 openresty 程序

### 目录结构

```bash
my-openresty
  ├── conf/
    │   └── my.conf        # Nginx 配置文件
    ├── logs/
    │   ├── access.log     # 访问日志文件
    │   └── error.log      # 错误日志文件
    └── services/
      └── my.lua           # Lua 服务处理模块
```

### my.conf

```conf

# 工作进程数：设置为 1，表示只启动一个工作进程
worker_processes 1;

# 运行用户：设置 Nginx 工作进程的用户和用户组为 root
user root root;

# 事件模块配置
events {
    # 每个工作进程的最大连接数
    worker_connections 555;
}

# HTTP 模块配置
http {
    # 服务器配置块
    server {
        # 监听端口：设置服务器监听在 6954 端口
        listen 6954;

        # 服务器名称：设置为通配符 *.*，匹配所有域名
        server_name *.*;

        # 访问日志：指定访问日志文件路径
        access_log logs/access.log;

        # 错误日志：指定错误日志文件路径，并设置日志级别为 debug
        error_log logs/error.log debug;

        # 位置匹配：匹配根路径 /
        location / {
            # 默认内容类型：设置为 text/html
            default_type text/html;

            # Lua 处理文件：指定使用 services/my.lua 文件处理请求
            content_by_lua_file services/my.lua;
            # 官方例子
            # content_by_lua_block {
            #    ngx.say("<p>hello, world</p>")
            # }

            # 响应头过滤：使用 Lua 代码块修改响应头
            header_filter_by_lua_block {
                # 设置 Content-Type 为 application/json
                ngx.header["Content-Type"] = "application/json"
                # 设置字符集为 utf-8
                ngx.header["charset"] = "utf-8"
            }
        }
    }

}

```

### my.lua

```lua

# 使用 ngx.say() 函数向客户端输出响应内容，会自动添加换行符
# 和 ngx.print() 函数向客户端输出响应内容，没有换行符
ngx.say("hello OpenResty!!!")

```

### 启动项目

```bash

# 测试工作目录和配置文件
openresty -t -p d:/my-openresty/ -c d:/my-openresty/conf/my.conf
# 启动服务
openresty -p d:/my-openresty/ -c d:/my-openresty/conf/my.conf
# 请求测试
curl -v "http://localhost:6954/"

# 响应输出
Hello, OpenResty!

```
