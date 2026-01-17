## 认识 Node.js

node 是一个基于 Chrome V8 引擎的 JavaScript 运行时环境。它允许开发者在服务器端运行 JavaScript 代码，而无需浏览器的支持。[如何安装 Node.js？](https://nodejs.org/zh-cn/download)

## Node.js 的优势

- 基于事件驱动的非阻塞 I/O 模型，使得 Node.js 可以处理高并发请求，而无需创建新的线程。
- 单线程模型，避免了多线程模型中的线程上下文切换和锁机制，减少了资源消耗。
- 丰富的 npm 生态系统，提供了大量的第三方模块，方便开发者快速构建应用。

### Node.js 应用场景

- 服务器端应用：如 Web 服务器、API 服务器等。
- 命令行工具：如 `npm`、`yarn`、`create-react-app`、`vue-cli`、自动化脚本等。
- 前端工具链和构建：如 Webpack、Babel 等。
- 实时应用：如聊天应用、实时分析等。

## 启动一个 Node.js 应用

### 目录结构

```bash
my-node-app
  └── app.js           # Node.js 应用入口文件
```

```js
// app.js
const http = require("node:http");

// Create a local server to receive data from
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      data: "Hello World!",
    }),
  );
});

server.listen(8000, "localhost", () => {
  console.log("服务已经启动，监听端口 8000");
});
```

启动一个 Node.js 应用非常简单，只需要在应用的根目录下，执行以下命令即可：

```bash
$ node ./app.js
```

其中，`app.js` 是应用的入口文件，启动成功后，会在控制台输出 `服务已经启动，监听端口 8000`。

### 测试应用

在浏览器中访问 `http://localhost:8000`，会返回 `{"data":"Hello World!"}`。
