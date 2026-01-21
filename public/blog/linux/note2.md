## Git 常用命令

### 初始化仓库

| 命令                               | 说明                                        | 命令                                            | 说明                                          |
| ---------------------------------- | ---------------------------------- | ---------------------------------- | ---------------------------------- |
| `git init`                         | 初始化一个新的 Git 仓库                     | `git clone <url>`                               | 克隆一个远程仓库到本地                        |
| `git remote add <name> <url>`      | 添加远程仓库                                | `git remote -v`                                 | 查看所有远程仓库                              |
| `git remote remove <name>`         | 删除指定远程仓库                            | `git remote set-url <name> <url>`               | 设置远程仓库 URL                              |
| `git config user.name "Your Name"` | 设置当前仓库用户名，`--global` 全局配置可选 | `git config user.email "youremail@example.com"` | 设置当前仓库用户邮箱，`--global` 全局配置可选 |
| `git config --list`                | 查看当前仓库的所有配置项                    | `git push origin --delete <branch>`             | 删除远程分支                                  |
| `git fetch <remote>`               | 从远程仓库获取最新更改，但不合并到当前分支  | `git submodule add <url> <path>`                | 添加子模块到仓库                              |
| `git submodule update --init`      | 初始化并更新子模块到最新版本                | `git submodule update --remote`                 | 更新子模块到远程仓库的最新版本                |

### 基本操作

| 命令                                           | 说明                              | 命令                      | 说明                       |
| ---------------------------------- | ---------------------------------- | ---------------------------------- | ---------------------------------- |
| `git add [<file>/-p]`                          | 添加文件到暂存区，`-p` 交互式选择 | `git commit -m "message"` | 提交暂存区的文件到本地仓库 |
| `git status`                                   | 查看当前仓库状态                  | `git stash`               | 暂存当前工作目录的更改     |
| `git stash pop`                                | 恢复最近一次暂存的更改            | `git stash list`          | 查看所有暂存的更改         |
| `git log [--oneline --graph --decorate --all]` | 查看提交历史，以简洁格式显示      | `git restore <file>`      | 恢复指定文件到最近一次提交 |
| `git restore --staged <file>`                  | 从暂存区恢复指定文件到工作目录    | `git rm <file>`           | 删除文件并加入暂存区       |
| `git mv old new`                               | 重命名文件或目录                  |                           |                            |

### 分支操作

| 命令                           | 说明                       | 命令                         | 说明                                     |
| ---------------------------------- | ---------------------------------- | ---------------------------------- | ---------------------------------- |
| `git branch -a`                | 查看所有分支（本地+远程）  | `git branch -r`              | 查看远程分支                             |
| `git branch <branch>`          | 创建新分支                 | `git branch -d <branch>`     | 删除指定分支                             |
| `git merge <branch>`           | 合并指定分支到当前分支     | `git checkout <branch>`      | `-b`创建新分支，切换到指定分支           |
| `git pull [<remote> <branch>]` | 拉取远程分支的更新         | `git push <remote> <branch>` | 推送本地分支到指定远程仓库               |
| `git switch <branch>`          | `-c`创建分支，切换到新分支 | `git fetch --prune`          | 从远程仓库获取最新更改并删除已删除的分支 |

### 标签操作

| 命令                       | 说明                   | 命令                                | 说明                 |
| ---------------------------------- | ---------------------------------- | ---------------------------------- | ---------------------------------- |
| `git tag`                  | 查看所有标签           | `git tag -a <tagname> -m "message"` | 创建新标签, 带注释   |
| `git tag -d <tagname>`     | 删除指定标签           | `git push <remote> <tagname>`       | 推送标签到远程仓库   |
| `git push <remote> --tags` | 推送所有标签到远程仓库 | `git checkout <tagname>`            | 切换到指定标签的提交 |
| `git show <tagname>`       | 查看标签的注释信息     |                                     |                      |

### 回滚操作

| 命令                  | 说明                                                          | 命令                                | 说明                 |
| ---------------------------------- | ---------------------------------- | ---------------------------------- | ---------------------------------- |
| `git reset HEAD~<n>`  | 回滚到前 n 个提交，`--soft` 不删除更改，`--hard` 强制删除更改 | `git revert -n <commit-hash>` | 创建一个新的提交来撤销指定提交的更改 |
| `git revert --quit`   | 退出交互式回滚操作                                            | `git reflog`                  | 查看所有提交历史，包括回滚操作       |
| `git checkout <hash>` | 切换到指定提交                                                |                               |                                      |

## SVN 常用操作

| 命令                                     | 说明                          |
| ---------------------------------- | ---------------------------------- |
| `svn checkout <url>`                     | 检出 SVN 仓库到本地目录       |
| `svn update`                             | 更新本地目录到最新版本        |
| `svn commit -m "message"`                | 提交本地更改到 SVN 仓库       |
| `svn diff`                               | 查看本地更改与 SVN 仓库的差异 |
| `svn log`                                | 查看 SVN 仓库的提交日志       |
| `svn revert <file>`                      | 恢复指定文件到上一个版本      |
| `svn resolve <file>`                     | 解决合并冲突中的文件          |
| `svn copy <source> <target>`             | 复制文件或目录到 SVN 仓库     |
| `svn switch <url>`                       | 切换到不同的 SVN 仓库         |
| `svn delete <file>`                      | 删除文件或目录从 SVN 仓库     |
| `svn import <source> <url> -m "message"` | 导入本地文件或目录到 SVN 仓库 |
| `svn merge <source> <target>`            | 合并 SVN 仓库中的文件或目录   |
| `svn status`                             | 查看本地目录的状态            |
