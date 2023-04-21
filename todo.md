### 实现双向事件发布订阅

- 全局维护事件列表
- 自动将事件列表 on 到 mainWindow
- 自动将事件列表到 bridge expose 到 window

> 寄了，electron 的运行所需脚本是编译时阶段，不能在运行时动态变化，只能放开 client 端 node 了

### plan B

- 写死一个 on 事件，但是 cb 是在 events 列表获取
- 当想要执行某个事件的时候，可以先 addEvents，再 emit
