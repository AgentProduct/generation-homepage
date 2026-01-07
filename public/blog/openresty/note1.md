## 认识 openresty

openresty 是一个基于 nginx 的开源 Web 平台，它使用 Lua 作为脚本语言，提供了 Lua 脚本的运行环境，以及一些常用的 Web 开发组件。

openresty 最大的优势是它的高并发能力。它不仅仅是 Nginx 的一个扩展，而是一个完整的开发生态系统，允许开发人员使用 Lua 脚本语言在 Nginx 的各个处理阶段实现业务逻辑。

openresty 的优势：

- 继承 Nginx 的高并发处理能力，单机可轻松支撑数十万并发连接
- LuaJIT 编译器将 Lua 脚本编译为本地机器码，执行效率接近 C 语言
- 非阻塞 I/O 模型与事件驱动架构，资源消耗极低
- 丰富的第三方模块生态，覆盖大多数 Web 开发需求
- 将 Web 服务器、应用服务器和网关功能融合于单个平台

openresty 的核心：

- 提供 Web 服务
- 提供 API 服务
- 负载均衡服务
- 反向代理服务
- 提供日志服务
- 数据库服务
- 提供 ORM 组件库

## openresty 环境安装

直接从 openresty 官网下载安装包即可。
[openresty 官网下载](https://openresty.org/cn/download.html)

!['download'](/blog/openresty/images/img1.png)

### 安装 openresty

1. Windows 安装

Windows 提供 win32 和 win64 两个版本的安装包，根据自己的系统选择下载。
下载安装包后，解压到自己选择的目录。

例如，我解压到 `D:\openresty` 目录。

2. Linux 安装

Linux 提供了 RPM 和 DEB 安装包，根据自己的系统选择下载。
下载安装包后，使用 `yum` 或 `apt` 安装即可。

Linux 各发行版本的安装步骤官方参考：https://openresty.org/cn/linux-packages.html

3. Mac 安装

```bash
brew install openresty/brew/openresty

# 遇到 GeoIP 模块错误：error: the GeoIP module requires the GeoIP library.
# GeoIP 模块是 MaxMind 的旧版 GeoIP Legacy 库，已经多年不再更新，openresty 默认安装时会依赖该库。

# ====
# GeoIP 库主要用于:
# 根据 IP 地址定位用户的物理位置，实现地区访问限制（如不允许某些国家用户访问某些内容）。
# 做国际化网站，需要多语言/多地区（自动切换语言、货币）。
# ====

# 先绕开安装 GeoIP 库，如果需要使用 GeoIP 定位功能，后续再手动安装新的 GeoIP 库。
# 临时绕开 GeoIP 库安装，只需要在安装命令中添加 `--without-geoip` 参数即可。

$ brew install openresty --without-geoip
```

### 启动 openresty

在 `D:\openresty` 目录下，双击 `nginx.exe` 文件即可启动 openresty。
启动后，在浏览器中访问 `http://localhost:80`，即可看到 openresty 的欢迎页面。

linux 下启动 openresty 命令如下：

```bash
$ cd /usr/local/openresty/bin/
$ ./openresty -v
```

mac 下启动 openresty 命令如下：

```bash
$ openresty -v
```

### 命令行操作

操作前，需要先把 openresty 加入到环境变量中。（可选，省去每次都要切换到 openresty 目录下的繁琐步骤）

例如，把 openresty 加入到 **Linux** 环境变量中，如下：

```bash
$ export PATH=$PATH:/usr/local/openresty/bin/
```

把 openresty 加入到 **Windows** 环境变量中，如下：

```bash
$ set PATH=%PATH%;D:\openresty
```

直接在 Windows 中，也可以在环境变量中添加 `D:\openresty`。

![setPath](/blog/openresty/images/img2.png)

#### 命令行

现在开始使用 openresty 提供的命令行工具来管理 openresty 进程。

> Windows 最新版本下，openresty 提供的主程序叫 `nginx.exe`，配置完环境遍历使用 `nginx` 访问命令行工具。如果要使用 `openresty` 命令访问命令行，需要手动改文件成 `openresty.exe`。

```bash
# 查看 openresty 版本信息
$ openresty -v             # 查看 openresty 版本信息
$ openresty -V             # 查看 openresty 详细版本信息
# 查看 openresty 帮助信息
$ openresty -h
# 测试 openresty 配置文件是否正确
$ openresty -t
# 发送信号给 openresty 进程
$ openresty -s stop        # 快速停止
$ openresty -s quit        # 优雅停止
$ openresty -s reload      # 重新加载配置
$ openresty -s reopen      # 重新打开日志文件
# 指定 openresty 配置文件路径
$ openresty -c /usr/local/my-service/conf/my.conf
# 指定 openresty 工作目录
$ openresty -p /usr/local/my-service/
# 设置错误日志文件
$ openresty -e /usr/local/my-service/logs/error.log
```

Linux 例子：

```bash
# 注意：使用 -c 的同时 -p 也要指定，防止其他的配置（日志）错乱。
# 测试 openresty 配置文件是否正确
$ openresty -t -p ~/my-service/ -c ~/my-service/conf/my.conf
# 启动 openresty
$ openresty -p ~/my-service/ -c ~/my-service/conf/my.conf
# 查看 openresty 进程
$ ps -ef | grep openresty
# 发送信号给 openresty 进程
$ openresty -s stop -p ~/my-service/ -c ~/my-service/conf/my.conf     # 快速停止
$ openresty -s quit -p ~/my-service/ -c ~/my-service/conf/my.conf     # 优雅停止
$ openresty -s reload -p ~/my-service/ -c ~/my-service/conf/my.conf   # 重新加载配置
```

