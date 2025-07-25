---
date: 2025-07-03
title: "Git 小贴士"
category: Guilty Crown
tags:
- git
description: "浅谈 Git 中的实用功能"
---
# Git 小贴士

::: details 目录

[[TOC]]

:::

## commit 规范

Angular 约定式提交分为三部分：**Header**、**Body**、**Footer**

- **Header**：提交信息格式 `<type>[(<scope>)!]: <subject>`
  - `()`：范围字段
  - `!`：破坏性变更
- **Body**：提交正文

- **Footer**：页脚部分是可选的，宣布重大变化、提及贡献者等

```sh
git commit -m "fix(core): remove deprecated and defunct wtf* apis" -m "These apis have been deprecated in v8, so they should stick around till v10, but since they are defunct we are removing them early so that they don't take up payload size." -m "PR Close #33949"
```

### 提交类型

- `build`：开发阶段更改 (包括但不限于文档、代码等，也称为 `chore`)
- `ci`：持续集成和部署系统相关的开发变化
- `docs`：修改文档
- `feat`：新功能 (对应语义化版本的 MINOR)
- `fix`：修复错误 (对应语义化版本的 PATCH)
- `perf`：性能优化
- `refactor`：重构代码 (例如：删除冗余代码、简化代码、重命名变量等)
- `style`：修改样式 (例如：调整缩进、空格、换行等)
- `test`：重构或添加测试用例

### 浏览历史记录

- 显示所有以 `feat`、`fix`、`perf` 开头的消息

  ```sh
  git log --oneline --grep "^feat|^fix|^perf"
  ```

- 显示以 `feat` 开头的提交总数

  ```sh
  git log --oneline --grep "^feat" | wc -l
  ```

### Using Emoji

- [gitmoji](https://github.com/carloscuesta/gitmoji)
- [Commit Message Emoji](https://github.com/dannyfritz/commit-message-emoji)

## 交互式暂存

`git add -p` 允许在提交修改之前，逐块审查和选择性地暂存文件的修改部分，而不是一次性暂存整个文件

Git 将文件的修改分块成多个小块，可以选择哪些暂存，哪些不暂存

- `y`：yes，暂存该块
- `n`：no，不暂存该块
- `s`：split，将大块拆分成更小的块
- `e`：edit，手动编辑该块
- `d`：discard，丢弃该块的更改
- `q`：quit，退出交互模式

将一个文件的部分修改提交到暂存区，用于拆分 commit

## 修改作者

- 修改本次提交信息：`git commit --author="name <name@example>" -m "Commit message"`

- 修改上一次提交信息：`git commit --amend --author="name <name@example>" --no-edit`

## 修改提交时间

- 修改上一次提交时间：`git commit --amend --date="Jan 1 16:21:11 2020 +0800" --no-edit`
- 修改本次提交时间：`git commit --date="Jan 1 16:21:11 2020 +0800" -m "commit message"`

## git stash

临时保存，把当前工作目录未提交的修改保存

```sh
# 保存当前工作区和暂存区的更改(或 git stash push)
git stash

# 保存时添加注释
git stash save "Close #33949"

# 查看所有 stash 条目
git stash list

# 恢复最近的 stash 并从 stash 列表中移除
git stash pop

# 恢复最近的 stash 但不删除
git stash apply

# 恢复指定 id
git stash pop stash@{1}

# 清除指定 stash id
git stash drop stash@{1}

# 清除最近一次 stash
git stash drop

# 清空所有 stash
git stash clear
```

## git bisect

git bisect 基于二分查找算法，用于定位引入 Bug 的 commit

```sh
# 首先需要通过 git log 确定起点和终点
git bisect start bad_commit good_commit

# 记录此次 commit 是好的
git bisect good

# 记录此次 commit 是坏的
git bisect bad

# 退出
git bisect reset
```

## git blame

`git blame` 逐行查看文件内容的最后修改信息，按行定位 bug 的生产者

```sh
git blame README.md
```

## 清空 commit 历史

第一种方法是通过创建新分支

```sh
# 1.新建一个新分支
git checkout --orphan new_dev

# 2.暂存所有文件并提交
git add . && git commit -m "Initial commit"

# 3.删除本地 dev 分支
git branch -D dev

# 4.将当前 new_dev 分支重命名为 dev
git branch -m dev

# 5.强制推送到远程仓库
git push -f origin develop
```

第二种方法通过更新引用

```sh
# 1.通过 git log 找到第一条 commit_id
git log --oneline

# 2.将 main 分支的 HEAD 指针指向第一条 commit_id
git update-ref refs/heads/main 9c3a31e68aa63641c7377f549edc01095a44c079

# 3.暂存所有文件并提交
git add . && git commit -m "Initial commit"

# 4.强制推送到远程仓库
git push -f
```

## fork 始终与远程同步

远程

```sh
# 1.添加远程仓库
git remote add origin https://github.com/lawvs/zod-compare.git

# 2.拉取最新分支
git fetch --depth=1 origin main

# 3.将远程的最新内容合并到当前分支(允许合并不相关历史记录)
git merge dev/main --allow-unrelated-histories

# 4.推送
git push
```

本地：如果远端 PR 被合并之后，往往需要切回主分支重新拉取代码，这将毫无意义地重新触发一次旧版本的索引；[来自 @zty0826](https://x.com/zty0826/status/1461893471766126595)

```sh
git fetch origin main:main
```

## 语义化版本

语义化版本 (**Semantic Versioning**，简称 **SemVer**) 是一种命名规范，清晰地表达软件版本的变化及其兼容性，采用 **主版本号**.**次版本号**.**修订号** 的格式

- **主版本号 (Major)**：当软件进行不兼容的 API 变更 (breaking changes)，主版本号递增次版本号和修订号重置为 0
- **次版本号 (Minor)**：当软件添加了新功能，但保持向后兼容时，次版本号递增，修订号重置为 0
- **修订号 (Patch)**：当软件进行向后兼容的 bug 修复或小更新，修订号递增
- **先行版本号**及版本编译信息可以加到 `Major.Minor.Patch` 之后作延申
- **预发布版本 (可选)**：用 `-` 连接；如：`1.2.3-beta.1`
  - 表示测试版、开发版等 (不稳定版本)
  - 常用于 `alpha`、`beta`、`rc` (release candidate) 等阶段
- **构建元数据 (可选)**：用 `+`  连接，如：`1.2.3+build.123`，表示构建相关信息 (如：时间戳或构建 ID)，不影响版本优先级

### 举个例子

假设当前有一个版本号为 `1.0.0` 的软件包供给外部软件调用

- 软件包中的 `example` 函数存在 bug，此次仅进行 bug 修复，**未添加新功能，未发生不兼容的 API 修改**，版本号变更为 `1.0.1`
- 软件包中新增了 `example` 的函数重载，用户原有的调用依旧返回预期结果，当用户调用新的参数类型，返回值发生变化。**新增了一个函数重载的功能，未发生不兼容的 API 修改**，版本号变更为 `1.1.0`
- `example` 函数新增了一个参数，用户**原有的调用会报错提示缺少参数，这时就发生了不兼容的 API 修改**，版本号变更为 `2.0.0`

### package.json 中的语义化版本

- `^`：允许次版本和修订号更新
- `~`：只允许修订号更新
- **无符号**：精确锁定版本

### 如何决定版本优先级

- **正式版本**：数字越大优先级越高 (如：`2.0.0` > `1.0.0`)
  - 正式版本相同时，正式版本优先级高于先行版本 (如：`1.0.0` > `1.0.0-alpha`)
- **先行版本**
  - 数字：数值的高低顺序 (如：`1.0.0-alpha.5` > `1.0.0-alpha.1`)
  - 字母：ASCII 码顺序 (如：`1.0.0-alpha.rc` > `1.0.0-alpha.beta`)
  - 非数字标识符比数字标识符优先级更高 (如：`1.0.0-alpha` > `1.0.0-0`)
  - 先行版本相同时，栏位较多的优先级更高  (如：`1.0.0-alpha.1.0` > `1.0.0-alpha.1`)

## Git 黑话

- **PR**：Pull Request，拉取请求
- **LGTM/SGTM**：Looks/Sounds Good To Me，没问题，可以合并
- **ACK**：Acknowledgement 确认，同意/接受变更
- **NACK/NAK**：negative acknowledgement 否认
- **TL;DR**：Too Long; Didn't Read. 太长了，懒得看
- **PTAL**：Please Take A Look. 请你帮忙看一下
- **WIP**：Work In Progress. 开发中
- **TBR**：To Be Reviewed. 提示维护者进行 review
- **CC**：Carbon Copy. 抄送

## 参考

- [commitlint](https://github.com/conventional-changelog/commitlint)
- [Conventional Commits](https://www.conventionalcommits.org/zh-hans/v1.0.0/)
- [karma](https://karma-runner.github.io/4.0/dev/git-commit-msg.html)
- [Angular JS Git Commit Message Conventions](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit?pli=1&tab=t.0#heading=h.uyo6cb12dt6w)
- [Contributing to Angular](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit)
- [What do cryptic Github comments mean?](https://www.freecodecamp.org/news/what-do-cryptic-github-comments-mean-9c1912bcc0a4)

- [Semantic Versioning 2.0.0](https://semver.org/)
