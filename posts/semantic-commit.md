---
date: 2025-07-02
title: Semantic Commits
category: Guilty Crown
tags:
- git
description: Semantic Commits are commit messages with human and machine readable meaning, which follow particular conventions.
---

# **Semantic Commits**

  ::: details 目录

  [[TOC]]

  :::

## **Commit Message Format**

Angular 约定要求根据以下结构来塑造提交消息

```txt
<type>(<scope>): <subject>

<body>

<footer>
```

提交信息由三部分组成：`header`、`body`、`footer`

- `type`：变更的类型
- `scope`：(可选) 变更的上下文
- `subject`：变化的简明描述

### **The Header**

Header 在提交信息的第一行

```sh
git commit -m "fix(core): remove deprecated and defunct wtf* apis"
```

通过一个 `:` 作为分隔，左侧是变更的类型，右侧是消息的含义 - (*此更改通过删除已弃用和已停用的 `wtf*` api 来修复属于核心包的一个错误* )

### **The Body**

正文部分是**可选的**，用于介绍动机或仅描述稍微详细的信息

```sh
git commit -m "fix(core): remove deprecated and defunct wtf* apis" -m "These apis have been deprecated in v8, so they should stick around till v10, but since they are defunct we are removing them early so that they don't take up payload size."
```

> 此 commit 来自 [Angular](https://github.com/angular/angular/commit/cf420194ed91076afb66d9179245b9dbaabc4fd4)

> [!NOTE]
>
> - 我们使用多个 `-m` 连接段落
> - 标题和正文之间应该使用空行分隔

### **The Footer**

页脚是可选的，宣布**重大变化**，**链接已关闭**的问题，**提及贡献者**等等

```sh
git commit -m "fix(core): remove deprecated and defunct wtf* apis" -m "These apis have been deprecated in v8, so they should stick around till v10, but since they are defunct we are removing them early so that they don't take up payload size." -m "PR Close #33949"
```

## **Common Types**

- **Development**：一种增强类型，对开发的变更进行分类，不影响生产，而是影响内部的环境和流程
- **Production**：一种维护类型，仅对生产的变更，旨在提供给最终用户使用

### 👷 build

`build` 类型，(也叫 `chore`)，识别与构建系统 (涉及脚本、配置或工具) 和包依赖项相关的**开发**更改

> 用于修改项目构建系统，例如修改依赖库、外部接口或者升级 Node 版本等

```txt
build: update dependency undici to v7 (#61522)
build: migrate animations to use rules_js based toolchain (#61479)
build: replace platform-browser-dynamic with  platform-browser (#61497)
build: move private testing helpers outside platform-browser/testing (#61472)
build: use an unstamped version of compiler-cli for running the angular compiler in ng_project (#61479)
```

### 💚 **ci**

`ci` ：用于识别与持续集成和部署系统相关的**开发**变化——涉及脚本、配置或工具

```txt
ci: change action: review to action: merge in update docs (#61533)
ci: clean untracked files before running postUpgradeTasks (#61494)
ci: replace yarn ng-dev misc update-generated-files with separate update commands for specific targets (#61467)
ci: update step name in workflow (#61393)
ci: disable updates for @angular/build-tooling (#61294)
```

### 📝 **docs**

`docs` ：用于修改文档，例如修改 README 文件、API 文档等

```txt
docs: add llms.txt (#61285)
docs: release notes for the v20.0.0-rc.1 release
docs(docs-infra): preselect search text on re-open (#61129)
docs: change supported versions when v20 releases (#61238)
docs: rename @nodoc to @docs-private (#61194)
```

### ✨ **feat**

`feat`：表示向后兼容的或功能相关的生产变化 (这和语义化版本中的 [`MINOR`](https://semver.org/lang/zh-CN/#摘要) 相对应)

```txt
feat(devtools): defer blocks  support (#60629)
feat(common): Allow passing ScrollOptions to ViewportScroller (#61002)
feat(core): rename afterRender to afterEveryRender and stabilize (#60999)
feat(core): introduce TestBed.tick() (#60993)
feat(compiler-cli): detect missing structural directive imports #59443
```

### 🐛 **fix**

`fix`：表示识别与向后兼容的错误，修复相关的**生产**变化 (这和语义化版本中的 [`PATCH`](https://semver.org/lang/zh-CN/#摘要) 相对应)

```txt
fix(core): handle different DI token types in Chrome DevTools integration (#61333)
fix(compiler-cli): avoid ECMAScript private field metadata emit (#61227)
fix(core): enable stashing only when withEventReplay() is invoked (#61077)
fix(compiler): incorrectly handling let declarations inside i18n (#60512)
fix(devtools): fix profiler support with @defer blocks (#61080)
```

### ⚡️ **perf**

`perf`：识别与向后兼容性能改进相关的**生产**变化——用于优化性能，例如提升代码的性能、减少内存占用等

```txt
perf: refactor Array.includes checks to use Sets (#32133)
perf(nuxt): use Set for circular dep plugin (#32110)
perf(nuxt): use Intl.Collator instead of localeCompare (#32167)
perf(nuxt): remove unecessary type check for useFetch (#31910)
perf(nuxt): remove oxc-parser manual wasm fallback logic (#31484)
```

### ♻️ **refactor**

`refactor`：用于识别与修改代码库相关的**开发**更改，既不添加功能也不修复错误 - 例如删除冗余代码、简化代码、重命名变量等

```txt
refactor(core): Disallow autoDetectChanges(false) in zoneless (#61430)
refactor(migrations): remove unused code (#61260)
refactor(docs-infra): Clean up embedded editor code (#61242)
refactor(language-service): initial reference and rename implementation for selectorless (#61240)
refactor(compiler-cli): produce template symbols for selectorless nodes (#61240)
```

### 🎨 **style**

`style`：用于修改代码的样式，例如调整缩进、空格、空行等

```txt
style(aio): add space between `.home` and `.hamburger` (#23624)
style(bazel): fix 2 unformatted .bzl files
style(core): fix max line length to pass linting (#20441)
style(nodeTree): fix formatting
style(compiler): fix lint issues (#23480)
```

### ✅ **test**

`test`：用于识别与测试相关的**开发**变化 - 例如重构现有测试或添加新测试

```txt
test(router): Reduce timeout times (#61155)
test: disable platform-server tests that do not work with zoneless (#61040)
test: add integration test for platform-server with zoneless (#61040)
test: add integration test for defer with input on SSR with zones (#61040)
test(core): type tests for linkedSignal (#60857)
```

## **Browsing History**

Git 为我们提供了浏览存储库提交历史记录的功能 - 因此我们能够了解实际发生了什么、谁做出了贡献等等

- 显示所有以 `feat`、`fix`、`pref` 开头的消息

  ```sh
  git log --oneline --grep "^feat|^fix|^perf"
  ```

- 显示以 `feat` 开头的提交总数

  ```sh
  git log --oneline --grep "^feat" | wc -l
  ```

## **Automated Releases**

提交消息格式对于自动化发布过程的步骤很有用，如：[Standard Version](https://github.com/conventional-changelog/standard-version)和[Semantic Release](https://github.com/semantic-release/semantic-release) 这样的工具 之外，还应当严格遵循[语义版本控制](https://semver.org/)规范。它们之间的主要区别在于[方法](https://github.com/conventional-changelog/standard-version#how-is-standard-version-different-from-semantic-release)

基于提交信息，尤其是**类型**

- 升级下一个语义版本 (`fix` 导致 **patch**，`feat` 和 `perf` 导致 **minor**，breaking change 变更 **major**)

- 生成包含相关生产变更的 CHANGELOG 和 release notes
- 为新版本创建 Git Tag
- 将 release 发布到 npm 仓库中

 如：Ionic 的 [angular-toolkit](https://github.com/ionic-team/angular-toolkit) 项目集成了 Semantic Release 来自动化发布过程 (遵循 Angular 提交约定)

- 🤖 表示自动完成

## **Using Emojis**

表情符号附加到提交信息，提高可读性，以便在浏览历史记录时可以非常快速轻松地识别它们

- [gitmoji](https://github.com/carloscuesta/gitmoji)

- [Commit Message Emoji](https://github.com/dannyfritz/commit-message-emoji)

## **Tool**

- [cz-cli](https://github.com/commitizen/cz-cli)：强制执行提交消息格式的工具

- [commitlint](https://github.com/conventional-changelog/commitlint)：保证提交消息符合格式约定
- [Commit Message Editor](https://marketplace.visualstudio.com/items?itemName=adam-bender.commit-message-editor)：💬 Visual Studio Code 扩展，以方便的方式编辑提交消息
- [Git - Semantic Commit Go](https://marketplace.visualstudio.com/items?itemName=nitayneeman.git-semantic-commit)：💬 Visual Studio Code 扩展，可以通过语义消息约定轻松提交

## **Specification**

1. 每个提交都**必须**使用类型字段前缀

   - `feat` ：当一个提交为应用或类库实现了新功能时，使用该类型

   - `fix`：当一个提交为应用修复了 bug 时，使用该类型

   - **范围字段** (可选)：**可以**跟随在类型字段后面。范围**必须**是一个描述某部分代码的名词，并用圆括号包围，例如： `fix(parser):`

   - `!` (可选)：在类型/作用域之后，`:` 之前，加上 `!` 字段，进一步提醒注意破坏性的变更；当有 `!` 前缀时，正文或脚注内必须包含 `BREAKING CHANGE: description`

     ```txt
     chore!: drop Node 6 from testing matrix
     
     BREAKING CHANGE: dropping Node 6 which hits end of life in April
     ```

   - **描述**：对代码变更的简短总结；描述字段**必须**直接跟在 `<类型>(范围)` 前缀的冒号和空格之后。

     ```txt
     fix: array parsing issue when multiple spaces were contained in string
     ```

2. **正文**：为代码变更提供额外的上下文信息。正文**必须**起始于描述字段结束的一个空行后

   - 提交的正文内容自由编写，**可以**使用空行分隔不同段落

     ```txt
     fix: correct minor typos in code
     
     see the issue for details on the typos fixed
     
     closes issue #12
     ```

3. **脚注**：正文结束的一个空行之后，**可以**编写一行或多行脚注。脚注必须包含提交的元信息，如：关联的合并请求、Reviewer、破坏性的变更

   - 破坏性变更必须在正文区域最开始处，或脚注区域某一行开始，一个破坏性变更必须包含大写的 `BREAKING CHANGE`

     ```txt
     BREAKING CHANGE: environment variables now take precedence over config files.
     ```

   - 描述正文内有破坏性变更的提交说明

     ```txt
     feat: allow provided config object to extend other configs
     
     BREAKING CHANGE: `extends` key in config file is now used for extending other config files
     ```

### 如果我不小心使用了错误的提交类型

例如将 `feat` 写成了 `fix`，在合并或发布这个错误之前，我们建议使用 `git rebase -i` 来编辑提交历史

## **References**

- [Understanding Semantic Commit Messages Using Git and Angular](https://nitayneeman.com/blog/understanding-semantic-commit-messages-using-git-and-angular/)

- [AngularJS Git Commit Message Conventions](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit?pli=1&tab=t.0#heading=h.uyo6cb12dt6w)

- [Karma](https://karma-runner.github.io/4.0/dev/git-commit-msg.html)

- [📓 Lint commit messages](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional)
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)

- [standard-version](https://github.com/conventional-changelog/standard-version)
