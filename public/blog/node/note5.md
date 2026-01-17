## 事件循环

[参考](https://nodejs.org/zh-cn/learn/asynchronous-work/event-loop-timers-and-nexttick)

Node.js 事件循环是一个基于 libuv 事件驱动的循环机制，用于处理异步操作。它是 node 平台的核心机制，负责管理和执行异步任务。

跟浏览器的事件循环不同，Node.js 的事件循环是单线程的，但是它可以处理大量的并发连接。而浏览器的事件循环是多线程的，每个标签页都有一个事件循环。

### 核心概念

事件循环是一个持续运行的循环，负责处理异步回调。它检查调用栈（Call Stack）是否为空，然后从任务队列（Task Queue）中取出回调执行。

事件循环有 6 个阶段：

![事件循环](/blog/node/images/img8.png)

- timers: 执行 setTimeout() 和 setInterval() 回调。
- pending callbacks: 执行延迟到下一个循环迭代的 I/O 回调。
- idle, prepare: 仅用于内部。
- poll: 轮询阶段，用于获取新的 I/O 事件并执行相关回调。当没有其他异步任务时，Node.js 会阻塞在这里。
- check: 执行 setImmediate() 回调。
- close callbacks: 执行关闭回调，如 socket.on('close', ...)。

执行步骤：
```bash
while (程序活着) {
  // 1. 执行完上一个阶段后，先清空这两个微任务队列
  执行所有 process.nextTick 回调
  执行所有 Promise.then / await 回调

  ↓

  timers 阶段 → 执行到期的 setTimeout / setInterval
  ↓ 清微任务

  pending callbacks（基本忽略）
  ↓ 清微任务

  idle, prepare（内部，忽略）
  ↓ 清微任务

  poll 阶段（最关键）：
    - 如果有 I/O 回调 → 执行它们
    - 如果没有 I/O 回调 且 有 setImmediate → 不阻塞，直接结束 poll → 去 check 阶段执行 setImmediate
    - 如果没有 I/O 回调 且 有已到期的 setTimeout/setInterval → 等待poll结束 → 下一轮循环回到 timers 阶段执行已到期 timer
    - 如果没有 I/O 回调 且 没有 setImmediate/setTimeout/setInterval → 阻塞等待新的 I/O 事件（这就是 Node 单线程高并发的核心：大部分时间在内核睡眠，几乎不耗 CPU）
  ↓ 清微任务

  check 阶段 → 执行所有 setImmediate
  ↓ 清微任务

  close callbacks → 执行 close 事件
  ↓ 清微任务

  回到循环开头...
}
```

示例：
```js
console.log("1");

setTimeout(() => console.log("setTimeout 0ms"), 0);
setImmediate(() => console.log("setImmediate"));

Promise.resolve().then(() => console.log("promise then"));

process.nextTick(() => console.log("nextTick"));

fs.readFile(__filename, () => {
  console.log("I/O callback (readFile)");
});

console.log("2");
```

输出结果：

```bash
1
2
nextTick
promise then
setTimeout 0ms    ←  和 setImmediate 顺序不确定！！
setImmediate      ←  这两个谁先取决于当时系统状态
I/O callback (readFile)
```

## 微任务队列

在事件循环机制中，存在一个微任务队列，用于存放 process.nextTick() 和 Promise.then() 回调。该队列会在每个阶段执行完之后立即执行，并且，process.nextTick() 回调会先于 Promise.then() 回调执行。

示例：
```js
const fs = require('fs');

// 1. 开始
console.log('Start');

// 2. Timer（最后执行，因为最小延迟为1ms）
setTimeout(() => console.log('Timeout'), 0);

// 3. setImmediate（在check阶段执行）
setImmediate(() => console.log('Immediate'));

// 4. 文件I/O（poll阶段执行）
fs.readFile(__filename, () => {
  console.log('I/O callback');
  
  // 在I/O回调中，setImmediate先于setTimeout
  setTimeout(() => console.log('Timeout in I/O'), 0);
  setImmediate(() => console.log('Immediate in I/O'));
  
  // 微任务
  Promise.resolve().then(() => console.log('Promise in I/O'));
  process.nextTick(() => console.log('nextTick in I/O'));
});

// 5. 微任务
Promise.resolve().then(() => console.log('Promise'));
process.nextTick(() => console.log('nextTick'));

console.log('End');
```

输出结果：
```bash
Start
End
nextTick
Promise
Timeout
Immediate
I/O callback
nextTick in I/O
Promise in I/O
Immediate in I/O
Timeout in I/O
```