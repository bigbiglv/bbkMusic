#### 安装
```
npm install 
```

#### 启动
```
npm run dev
```


#### 第三方库

* `scss`
* `tailwinds`
* `pinai` 状态管理
* `vue-router` 路由管理
* `unplugin-vue-components` 组件自动引入
* `unplugin-icons` [图标库](https://icones.js.org/)，按需自动引入 
* `vant4` ui组件库，按需自动引入
* `axios` 

#### 接口
`vite.config.ts`中设置接口代理
* 前缀`api/`的是自己的接口
* 前缀`api/wy`的是网易云音乐的接口

#### 自定义指令
存放在`src/directive`中，新建文件自动导入
* `v-title`:长按显示传入的value，多用于图标按钮

#### git commit 规范

- `feat` 增加新功能
- `fix` 修复问题/BUG
- `style` 代码风格相关无影响运行结果的
- `perf` 优化/性能提升
- `refactor` 重构
- `revert` 撤销修改
- `test` 测试相关
- `docs` 文档/注释
- `chore` 依赖更新/脚手架配置修改等
- `workflow` 工作流改进
- `ci` 持续集成
- `types` 类型定义文件更改
- `wip` 开发中
- `mod` 不确定分类的修改
- `release` 发布
