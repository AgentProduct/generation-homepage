## Windows 命令速查表

收集开发中常用的命令。

### 服务通用命令

| 命令                                                         | 说明             | 命令                            | 说明                                                                         |
| ------------------------------------------------------------ | ---------------- | ------------------------------- | ---------------------------------------------------------------------------- |
| `net start 服务名`                                           | 启动服务         | `net stop 服务名`               | 停止服务                                                                     |
| `sc query 服务名`                                            | 查看服务状态     | `sc config 服务名 start=auto`   | `auto`设置服务为自动启动, `demand`设置服务为手动启动，`disabled`禁用开机启动 |
| `sc delete 服务名`                                           | 删除服务         | `services.msc`                  | 打开服务图形界面                                                             |
| `sc query type=service state=all`                            | 列出所有服务     | `sc query \| findstr /i 关键词` | 查询服务                                                                     |
| `netstat -ano \| findstr ":端口号/PID"`                      | 查询端口使用情况 | `taskkill /F /PID 进程号`       | 强制结束进程                                                                 |
| `cls`                                                        | 清屏             | `ipconfig`                      | 查看IP网络信息                                                               |
| `ping ip/域名`                                               | 测试网络连通性   | `telnet ip 端口`                | 测试端口是否打开                                                             |
| `tasklist                               \| findstr "进程名"` | 查询进程         |                `[cmd]-Service 服务名`                 |       PowerShell-Cmd：`Get`、`Stop`、`Restart`、`Start`                                                                       |
| `Expand-Archive 你的文件.zip 解压到的文件夹` | 解压zip包 | `Get-Content filePath -Wait` | 实时查看内容，`-Tail num` 限制最多展示多少行数 |

