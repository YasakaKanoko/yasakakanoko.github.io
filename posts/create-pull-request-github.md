---
date: 2025-07-03
title: How to create a pull request in GitHub
category: Guilty Crown
tags:
- git
description: Learn how to fork a repo, make changes, and ask the maintainers to review and merge it.
---

# How to create a pull request in GitHub

在根目录通常存在一个 `CONTRIBUTING.md` 或 `Code of Conduct` 文档，提及如何参与贡献以及项目参与者行为规范的守则

  1. **Fork the Repository**

  2. **Clone Your Fork**

     ```sh
     git clone https://github.com/<YourUserName>/demo.git
     ```

  3. **Create a Branch**

     ```sh
     git checkout -b new_branch
     git remote add upstream https://github.com/kedark3/demo
     ```

  4. **Make your changes**

  5. **Push it back to your repo**

     ```sh
     git commit -m "docs: Update 2.installation.md" -m "Fix the content attribute in the tailwind.config.js config file."
     git push -u origin new_branch
     ```

  6. **Create Pull Request**

     - 点击 `Create pull request`  创建请求

     - 简单描述修改的问题，给出相应链接，可以在对应图片中指出错误，等待项目管理员通过审核

       > 此 PR 来自 [Inspira UI](https://github.com/unovue/inspira-ui)

       ```txt
       docs: fix content attribute in tailwind.config.js config file.
       	
       Fix the content attribute in the tailwind.config.js config file.
       
       Problem: The content attribute in the [doc](https://inspira-ui.com/getting-started/installation) is empty, it will cause error during installation
       ![image](https://github.com/user-attachments/assets/60206e0a-585d-49b2-b3a0-9c48aa4f6b31)
       ```
