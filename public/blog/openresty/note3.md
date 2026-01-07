## OpenResty 开发技巧

### 热加载

开发环境修改业务代码，避免频繁的重启服务。

```conf

# 设置为 off 时，Nginx 会在前台运行，实时输出信息，便于开发调试
# 开发环境推荐设置为 off，生产环境应设置为 on（默认）
daemon off;

# 开发环境配置 off，生产环境应设置为 on（默认）
# 关闭代码缓存，实时加载
http {
    lua_code_cache off;
    ...
}

```

### 日志实时查看

#### tail -f 命令（最常用）

```bash

# 基本实时查看
tail -f d:/my-openresty/logs/error.log

# 查看最后100行并实时更新
tail -100f d:/my-openresty/logs/error.log

# 高亮显示错误
tail -f d:/my-openresty/logs/error.log | grep --color -E "error|404|500|$"

# 同时查看两个日志（分屏）
tail -f d:/my-openresty/logs/error.log -f d:/my-openresty/logs/access.log

```

#### 其他

```bash

# tail -f 简洁写法
tailf d:/my-openresty/logs/error.log
# 进入 less 后按 Shift+F 进入实时模式
# 进入 less 后，按 Shift+F 开始实时跟踪
# 按 Ctrl+C 停止跟踪，再按 q 退出
less ../logs/error.log

```
