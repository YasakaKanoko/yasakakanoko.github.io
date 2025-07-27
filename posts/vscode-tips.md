---
date: 2025-07-27
title: "VSCode 小贴士"
category: Violet Evergarden
tags:
- VSCode
description: "VSCode 实用功能和插件。"
---

# VSCode 小贴士

::: details 目录

[[TOC]]

:::

## 端口占用

端口占用这种情况，通常出现在，如：服务器想在 3000 端口运行，但是启动时却在 3001 或 3002 端口上启动

- Mac/Linux

  ```sh
  # 查看 3000 端口所有进程
  lsof -i tcp:3000
  
  # kill -9 <PID> 强制结束当前进程
  kull -9 18223
  ```

- Windows

  ```sh
  # 查看 3000 端口所有进程
  netstat -ano | findstr :3000
  
  # taskkill /PID <PID> /F 强制结束当前进程
  taskkill /PID 18223 /F
  ```

## 快捷键

- `Ctrl`+`B`：打开/关闭侧边栏
- `Ctrl`+`Shift`+`B`：打开/关闭辅助侧边栏
- `Ctrl`+`P`：打开文件列表
- `Ctrl`+`Shift`+`P`：打开命令列表
- `Ctrl`+<code>`</code>：打开/关闭终端
- `Ctrl`+`,`：打开设置
- `Ctrl`+`F`：搜索文件

自定义快捷键，按 `Ctrl`+`Shift`+`P` 唤出命令列表，输入 `open keyboard shortcuts` 打开首选项

## Visual

- 字体
  - [FiraCode](https://github.com/tonsky/FiraCode)
  - [InputMono](https://input.djr.com/)
  - [Hasklig](https://github.com/i-tu/Hasklig)
  - [Monoid](https://larsenwork.com/monoid/)
  - [Operator](https://www.typography.com/fonts/operator/styles)
  - [PragmataPro](https://fsd.it/shop/fonts/pragmatapro/)
- 文件图标主题
  - [Catppuccin Icons for VSCode](https://marketplace.visualstudio.com/items?itemName=Catppuccin.catppuccin-vsc-icons)
  - [Chalice Icon Theme](https://marketplace.visualstudio.com/items?itemName=artlaman.chalice-icon-theme)
  - [vscode-icons](https://marketplace.visualstudio.com/items?itemName=vscode-icons-team.vscode-icons)
  - [file-icons](https://marketplace.visualstudio.com/items?itemName=file-icons.file-icons)
- 产品图标主题
  - [Carbon Product Icons](https://marketplace.visualstudio.com/items?itemName=antfu.icons-carbon)
- 颜色主题
  - [Vitesse Theme](https://marketplace.visualstudio.com/items?itemName=antfu.theme-vitesse)
  - [1984](https://marketplace.visualstudio.com/items?itemName=juanmnl.vscode-theme-1984)
  - [Catppuccin for VSCode](https://marketplace.visualstudio.com/items?itemName=Catppuccin.catppuccin-vsc)

::: code-group

```json[settings.json]
{
  // ========== Visuals ==========
  // "breadcrumbs.enabled": false, // 禁用顶部路径导航
  // "editor.minimap.enabled": false, // 禁用右侧的小地图
  "editor.renderLineHighlight": "all", // 光标所在行高亮显示
  "editor.cursorSmoothCaretAnimation": "on", // 拖动时启用平滑动画效果
  "editor.smoothScrolling": true, // 滚动时启用平滑动画效果
  // "workbench.editor.showIcons": false, // 禁用选项卡图标
  "workbench.editor.tabSizing": "shrink", // 允许选项卡自动缩小
  "editor.fontFamily": "Hasklig Medium, Hasklig Regular, Input Mono, Consolas, Monospace", // 自定义字体
  "editor.fontLigatures": true, // 启用字体连字
  "editor.guides.bracketPairs": "active", // 括号显示参考线
  // "editor.lineNumbers": "interval", // 每 10 行显示一次行号
  "editor.renderWhitespace": "boundary", // 空格字符用点表示
  "window.autoDetectColorScheme": true, // 自动切换主题
  "workbench.colorTheme": "Vitesse Dark", // 默认主题
  "workbench.editor.tabActionLocation": "left", // 控制选项卡操作按钮(关闭)的位置
  "workbench.iconTheme": "catppuccin-latte", // 图标主题
  "workbench.list.smoothScrolling": true, // 列表和树启动平滑滚动动画
  "workbench.preferredDarkColorTheme": "One Dark Pro Night Flat", // 深色模式时的主题
  "workbench.preferredLightColorTheme": "1984 - Light", // 浅色模式时的主题
  "workbench.productIconTheme": "icons-carbon", // 产品图标主题
  "workbench.sideBar.location": "right", // 侧边栏位置
  "workbench.startupEditor": "newUntitledFile", // 直接启动时创建新文件
  "workbench.tree.expandMode": "singleClick", // 单击展开树状结构
  "workbench.tree.indent": 10, // 树缩进
  "editor.occurrencesHighlight": "singleFile", // 高亮显示所有相同符号的地方
  "editor.suggestOnTriggerCharacters": true, // 禁用自动完成提示
  "editor.quickSuggestions": { // 快速提示
    "other": true, // 一般提示
    "comments": false, // 注释提示
    "strings": false // 字符串提示 
  },
  "explorer.openEditors.visible": 8, // 打开的编辑器数目上限
}
```

:::

## 生产力

- `Alt`+`Shift`+`Up`/`Down`：向上/向下复制
- `Alt`+`Up`/`Down`：向上/向下移动
- `Ctrl`+`Shift`+`K`：删除行
- `Shift`+`Alt`+`F`：格式化
- `Ctrl`+`Alt`+`Up`/`Down`：向上/向下添加光标
- `Ctrl`+`D`：将下一个匹配的添加光标
- `Ctrl`+`K`+`D`：跳过一个，选择下一个添加光标

- 折叠

  ```js
  // #region
  	/* code here... */
  // #endregion
  ```

## 参考

- [Anthony Fu - Things I am using](https://antfu.me/use)
- [antfu/vscode-settings](https://github.com/antfu/vscode-settings)
- [VSCode Can Do That](https://burkeholland.gitbook.io/vs-code-can-do-that)
