---
date: 2025-06-29
title: bun
category: Angel Beats!
tags:
- ts
- js
description: Bun is a fast JavaScript runtime.
---
# **Bun**

::: details 目录

[[TOC]]

:::

## **Installation**

- [安装](https://bun.sh/docs/installation)

  ```sh
  powershell -c "irm bun.sh/install.ps1|iex"
  ```

- 命令：`bun --help`

  ```sh
  Commands:
    run       ./my-script.ts       Execute a file with Bun
              lint                 Run a package.json script
    test                           Run unit tests with Bun
    x         next                 Execute a package binary (CLI), installing if needed (bunx)
    repl                           Start a REPL session with Bun
    exec                           Run a shell script directly with Bun
  
    install                        Install dependencies for a package.json (bun i)
    add       @evan/duckdb         Add a dependency to package.json (bun a)
    remove    underscore           Remove a dependency from package.json (bun rm)
    update    @zarfjs/zarf         Update outdated dependencies
    audit                          Check installed packages for vulnerabilities
    outdated                       Display latest versions of outdated dependencies
    link      [<package>]          Register or link a local npm package
    unlink                         Unregister a local npm package
    publish                        Publish a package to the npm registry
    patch <pkg>                    Prepare a package for patching
    pm <subcommand>                Additional package management utilities
    info      zod                  Display package metadata from the registry
  
    build     ./a.ts ./b.jsx       Bundle TypeScript & JavaScript into a single file
  
    init                           Start an empty Bun project from a built-in template
    create    next-app             Create a new project from a template (bun c)
    upgrade                        Upgrade to latest version of Bun.
    <command> --help               Print help text for command.
  ```
  

## **QuickStart**

`bun` 原生支持运行 `ts`，而 Node.js 需要进行一些配置

```sh
bun init
```

::: code-group

```sh[Bun]
bun run --watch index.ts
```

```sh[Node.js]
# "dev": "nodemon --watch src -e ts --exec ts-node src/index.ts"
npm run dev
```

:::

## **Creating a Web Server in Bun**

使用 `Bun.serve` 创建一个简单的 HTTP 服务器

::: code-group

```ts[Bun]
const server = Bun.serve({
  port: 3000,
  fetch(req) {
    return new Response("Bun!");
  },
});

console.log(`Listening on http://localhost:${server.port} ...`);
```

```js[Node.js]
import { createServer } from 'node:http';

const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World!\n');
});

// starts a simple http server locally on port 3000
server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000');
});
```

```js[Express]
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```

:::

**进阶**：使用 `figlet` 包及其声明类型，实现一个 ASCII 艺术横幅

```sh
bun add figlet
bun add -d @types/figlet
```

```ts
import { textSync } from 'figlet' // [!code ++]

const server = Bun.serve({
  port: 3000,
  fetch(req) {
    const body = textSync("Bun!"); // [!code ++]
    return new Response(body); // [!code ++]
    return new Response("Bun!"); // [!code --]
  },
});

console.log(`Listening on http://localhost:${server.port} ...`);
```

### **Routing**

在 `Bun.serve` 中创建路由

::: code-group

```ts[Bun]
const server = Bun.serve({
  port: 3000,
  fetch(req) {
    const url = new URL(req.url);
    
    if (url.pathname === '/') {
      return new Response('Bun!');
    }
    
    if(url.pathname ==='/about'){
      return new Response('About Us');
    }
    
    if(url.pathname === '/contact'){
      return new Response('Contact Us');
    }
    
    return new Response('Not Found', { status: 404 });
  },
});

console.log(`Listening on http://localhost:${server.port} ...`);
```

```js[Express]
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/about', (req, res) => {
  res.send('About Us!');
});

app.get('/contact', (req, res) => {
  res.send('Contact Us!');
});

app.use((req, res, next) => {
  res.status(404).send('404 Not Found');
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port} ...`)
})
```

:::

### **Error Handling**

```ts
if(url.pathname === '/feed') {
  throw new Error('Could not fetch feed');
}
```

当我想要将捕获的错误以可读的形式呈现，而不破坏整个应用程序

```ts
error(error) {
  return new Response(`<pre>${error} \n ${error.stack}</pre>`, {
    headers: {
      'Content-Type': 'text/html'
    }
  });
```

**完整代码**

```ts
const server = Bun.serve({
  port: 3000,
  fetch(req) {
    const url = new URL(req.url);
    
    if (url.pathname === '/') {
      return new Response('Bun!');
    }
    
    if (url.pathname === '/about') {
      return new Response('About Us');
    }
    
    if (url.pathname === '/contact') {
      return new Response('Contact Us');
    }
    
    if (url.pathname === '/feed') { // [!code focus] [!code ++]
      throw new Error('Could not fetch feed'); // [!code focus] [!code ++]
    } // [!code focus] [!code ++]
    
    return new Response('Not Found', { status: 404 });
  },
  
  error(error) { // [!code focus] [!code ++]
    return new Response(`<pre>${error} \n ${error.stack}</pre>`, { // [!code focus] [!code ++]
      headers: { // [!code focus] [!code ++]
        'Content-Type': 'text/html' // [!code focus] [!code ++]
      } // [!code focus] [!code ++]
    }); // [!code focus] [!code ++]
  } // [!code focus] [!code ++]
  
});

console.log(`Listening on http://localhost:${server.port} ...`);
```

### **Streaming Text File**

`Bun.file(path)`：创建一个 `BunFile` 实例，表示延时加载文件，而不是真正的从磁盘读取文件

```ts
if (url.pathname === '/greet') {
  return new Response(Bun.file('./greet.txt'));
}
```

## **Setup a Web Server in Elysia**

因为 Bun 原生支持 TypeScript ，所以可以结合 TypeScript 框架实现 RestAPI

```sh
bun create elysia bun-rest-api

bun run --watch src/index.ts
```

### **Route and Handler**

::: code-group

```ts[Elysia]
import { Elysia } from "elysia";

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .get('/post/:id', ({ params: { id } }) => { return { id: id, title: 'Learn Bun' } })
  .get('/track/*', () => { return 'Track Route' })
  .post('/post', (context) => { return context })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
```

```js[Express]
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello Express');
});

app.get('/post/:id', (req, res) => {
  const { id } = req.params;
  res.json({ id, title: 'Learn Bun' });
});

app.get('/track/:any', (req, res) => {
  res.send('Track Route');
});

app.post('/post', (req, res) => {
  res.send(req.body);
});

const server = app.listen(3001, () => {
  console.log(`🦊 Express is running at ${server.address().address}:${server.address().port}`);
});
```

:::

如果使用的是 Express，则需要显式地使用 `express.json()` 中间件，而在 Elysia 中可以直接通过参数解构访问请求体数据

::: code-group

```ts[Elysia]
.post('/post', (body) => { return body; }) // [!code --]
.post('/post', ({ body }) => { return body; }) // [!code ++]
```

```js[Express]
app.use(express.json());
app.post('/post', (req, res) => {
  const { body } = req;
  res.json(body);
});
```

:::

设置状态

::: code-group

```ts[Elysia]
.post('/post', ({ body, set }) => {
  set.status = 403
  return body;
})
```

```js[Express]
app.use(express.json());
app.post('/post', (req, res) => {
  const { body } = req;
  res.status(403);
  res.json(body);
});
```

:::

返回 JSON 数据

::: code-group

```ts[Elysia]
.get('/tracks', () => {
  return new Response(JSON.stringify({
    "tracks": ['Dancing Feat', 'Sam I', 'Animals']
  }))
})
```

```js[Express]
app.use(express.json());
app.get('/tracks', (req, res) => {
  res.json({
    tracks: ['Dancing Feat', 'Sam I', 'Animals']
  });
});
```

:::

### **State and Decorate**

- State 是一种用于在请求处理过程中**存储临时数据**的方式，可以在中间件或路由之间传递
- Decorate 用于扩展请求对象 (Context) ，添加自定义属性和方法，使其在路由处理函数中可用

```ts
import { Elysia } from "elysia";

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .state({ // [!code ++]
    id: 1, // [!code ++]
    email: 'jane@gmail.com' // [!code ++]
  }) // [!code ++]
  .decorate('getDate', () => Date.now()) // [!code ++]
  .post('/post', ({ body, set, store }) => { // [!code ++]
    console.log(store); // [!code ++]
    set.status = 201
    return body
  })
  .get('/tracks', ({store, getDate}) => {
    console.log(store); // [!code ++]
    console.log(getDate()); // [!code ++]
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
```

### **Plugin**

Plugin 是一种将功能分解成更小的部分，在服务器上创建可重用的组件

- 在当前路由注册了插件，当前实例的状态和方法都将和插件合并在同一个作用域内
- 也可以将插件作为一个单独的文件导入，彼此之间的 `State` 是共享的

**定义插件**

```ts
import { Elysia } from "elysia";

// Define Plugin
const plugin = new Elysia() // [!code ++]
  .state('version', 1) // [!code ++]
  .get('/form-plugin', () => 'Hi!') // [!code ++]
  .get('/greet', () => 'Hello Dev!') // [!code ++]

// Application
const app = new Elysia()
  // Register
  .use(plugin)
  .get("/", () => "Hello Elysia")
  .state({
    id: 1,
    email: 'jane@gmail.com'
  })
  .decorate('getDate', () => Date.now())
  .get('/tracks', ({ store, getDate}) => {
    console.log(store['version']); // [!code ++] 1
    console.log(store); // [!code ++] 返回一个State对象, 将插件和主应用的State合并为同一个对象
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
```

### **Group**

分组：将多个前缀相同的路由合并

```ts
import { Elysia } from 'elysia'
const app = new Elysia()
app.group('/user', (app) => app
  .post('/sign-in', 'Sign in')
  .post('/sign-up', 'Sign up')
  .post('/profile', 'Profile')
)

app.group('/v1', (app) => app
  .get('/', () => 'Version 1')
  .group('/products', app => app
    .post('/', 'Create Product')
    .get('/:id', 'Get Product By Id')
    .put('/:id', () => 'Update Product By Id')
    .delete('/:id', () => 'Delete Product By Id')
  )
)

app.listen(3000)
```

### **Schema**

如果要为路由添加验证，Elysia 提供了一个开箱即用的数据验证工具

::: code-group

```ts[index.ts]
import { Elysia } from 'elysia'
import { signinDTO } from './models'


const app = new Elysia()
app.group('/user', (app) => app
  .post('/sign-in', ({ body }) => body, {
    body: signinDTO, // [!code ++] 传入到服务器的HTTP消息数据校验
    response: signinDTO // [!code ++] 响应是从处理程序返回的数据
  })
  .post('/sign-up', 'Sign up')
  .post('/profile', 'Profile')
)
app.listen(3000)
```

```ts[models.ts]
import { t } from 'elysia'
export const signinDTO = t.Object({
  username: t.String(),
  password: t.String()
})
```

:::

### **Path Params Validations**

`params` ：通过 URL 路径发送的数据，在不指定 `params` 参数类型时，Elysia 会自动将类型推断为字符串

```ts
import { Elysia, t } from 'elysia'

app.group('/v1', (app) => app
  .get('/', () => 'Version 1')
  .group('/products', app => app
    .post('/', 'Create Product')
    .get('/:id', ({ params: { id } }) => {
      return id
    }, {
      params: t.Object({
        id: t.Numeric() // [!code ++] 表示参数的类型只能是数字
      })
    })
  )
)

app.listen(3000)
```

## **Create a Web Apps with Vite**

```sh
bun create vite react-app
│
◇  Select a framework:
│  React
│
◇  Select a variant:
│  TypeScript + SWC
│
◇  Scaffolding project in xxx
│
└  Done. Now run:

bun install

bun run dev
```

直接使用 `bunx` 而不是 Node.js，速度更快

```json
"scripts": {
  "dev": "bunx --bun vite", // [!code ++]
},
```

## 配置读取

- Node 项目需要读取配置文件 `.env` 时，需要引入 `dotenv`

  ::: code-group

  ```js[server.js]
  import express from 'express';
  import dotenv from 'dotenv'; // [!code ++]
  
  dotenv.config({ path: './.env' }); // [!code ++]
  
  const { SERVER_PORT: port } = process.env;
  
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  app.get('/', (_req, res) => {
    res.send('Hello From Express!');
  });
  
  app.listen(port, () => {
    console.log(`Listening on port ${port}`)
  });
  ```
  
  ```ini[.env]
  SERVER_PORT=3000
  ```
  
  :::
  
  如果未引入 `dotenv` 模块，想要实现监听的效果，需要 Node 版本在 v20.6 以上，使用以下命令行参数
  
  ```sh
  node --env-file=./.env server.js
  ```
  
- **bun 读取配置**：使用 bun 的全局变量 `Bun` 进行读取

  ::: code-group

  ```ts[server.ts]
  import type { Express, Request, Response } from 'express';
  import express from 'express';
  const cors = require('cors');
  
  const { SERVER_PORT: port } = Bun.env;
  
  const app: Express = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  
  app.get('/', (_req: Request, res: Response) => {
    res.send('Hello From Express!');
  });
  
  app.listen(port, () => {
    console.log(`Listening on port ${port}`)
  });
  ```
  
  ```ini[.env]
  SERVER_PORT=3000
  ```
  
  :::

## bun test

- 当运行 `bun test` 时，将自动递归查找文件目录中的 `*.test.{js|jsx|ts|tsx}`、`*._test.{js|jsx|ts|tsx}`、`*.spec.{js|jsx|ts|tsx}`、`*._spec.{js|jsx|ts|tsx}` 测试文件

  ::: code-group

  ```ts[main.test.ts]
  import { expect, test } from "bun:test";
  
  beforeEach(() => {
    console.log('Before Each')
  });
  test("2 + 2", () => {
    expect(2 + 2).toBe(4);
  });
  
  test('PI Test', () => {
    expect(Math.PI.toString()).toContain('3.14');
  });
  ```

  ```sh
  bun test
  
  main.test.ts:
  Before Each
  ✓ 2 + 2
  Before Each
  ✓ PI Test
  
   2 pass
   0 fail
   2 expect() calls
  Ran 2 tests across 1 files. [90.00ms]
  ```

  :::

- 在 Node 中的测试文件需以 `*.test.js` 和 `*.spec.js` 的后缀形式命名

  ::: code-group

  ```js[main.test.js]
  import { test, beforeEach } from 'node:test';
  import assert from 'node:assert';
  
  beforeEach(() => {
    console.log("beforeEach");
  });
  
  test("demo", () => {
    assert.equal(2 + 2, 4)
  });
  
  test("demo1", () => {
    assert.equal(2 + 3, 5)
  });
  ```

  ```sh
  node --test
  
  beforeEach
  beforeEach
  ✔ demo (2.804ms)
  ✔ demo1 (0.5863ms)
  ℹ tests 2
  ℹ suites 0
  ℹ pass 2
  ℹ fail 0
  ℹ cancelled 0
  ℹ skipped 0
  ℹ todo 0
  ℹ duration_ms 138.5318
  ```

  :::

  > Node 中的 `beforeEach` 会在所有用例执行前执行完毕，而 bun 的 `beforeEach` 会在用例之间穿插执行

## SQLite

Bun 原生实现了 SQLite3 驱动程序，使用需要从内置 `bun:sqlite` 模块导入

::: code-group

```ts[Bun]
import { Database, Statement } from "bun:sqlite";

const db: Database = new Database("school.sqlite");

db.exec(
  "CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY, name TEXT,age INTEGER)"
);

db.exec("INSERT INTO students (name, age) VALUES ('Alex', 23)");

const query: Statement<any, any> = db.query(
  "SELECT COUNT(*) AS count, name FROM students GROUP BY name"
);

query.all().forEach((student) => {
  console.log(student.name, student.count); // Alex 4
});
```

```js[Node.js]
// pnpm add sqlite3
import sqlite3 from "sqlite3";
const db = new sqlite3.Database("school.sqlite");

db.exec(
    "CREATE TABLE IF NOT EXISTS student (id INTEGER PRIMARY KEY, name TEXT, age INTEGER)"
);

let age = 10;
for (let i = 0; i < 10; i++) {
    db.exec(`INSERT INTO student (name, age) VALUES ('JOHN', ${age})`);
}

db.each(
    "SELECT COUNT(*) as count FROM student WHERE age >= 10",
    (_err, row) => {
        console.log(row);
    }
);
```

:::

## 模块化

- bun 支持 ESM 和 commonjs 互操作性
  - [CommonJS is not going away](https://bun.sh/blog/commonjs-is-not-going-away)

- Node.js v22 新特性：[Loading ECMAScript modules using `require()`](https://nodejs.org/api/modules.html#loading-ecmascript-modules-using-require)

  `require()` 支持满足以下要求的 ESM

  - 该模块是完全同步的 (即不包含顶层的 `await`)
  - 加载的模块是 ESM

  ::: code-group

  ```js[pointer.mjs]
  export default class Point {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  } 
  ```

  ```js[index.js]
  const point = require('./point.mjs');
  console.log(point); // Module {__esModule: <accessor>, default: <accessor>, Symbol(Symbol.toStringTag): 'Module'}
  ```

  :::
