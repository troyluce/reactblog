# reactblog
- 前后台分离式开发（项目中也包含博客的后台管理系统），为了方便记录后端开发过程，笔者将后端也一起放在同个项目文件夹中。
- 博客样式几乎借助于 antd 这个优秀的 UI 框架，主打简约风格，是笔者借鉴了 antd 官方的风格所设计。
- blog--------前台展示页面
- admin-------后台管理页面
- service-----中台后端部分，包含数据库
## 实现功能
- 前台：主页 + 列表页 + 搜索页 + 分类页 + 标签页
- 后台：文章管理
- 响应式、文章锚点导航、markdown 代码高亮
## 技术栈
- 前端
  - nextjs,react
  - marked highlight.js
  - axios 封装
- 后端
  - egg.js
  - mysql
## 博客预览

### PC端


## 项目结构
```


```


## 使用这个项目
```
git clone https://github.com/troyluce/reactblog.git

## 安装依赖以及开启开发模式
cd react-blog
cd blog
npm install
cd service
npm install
cd admin
npm install
## 安装依赖以及开启开发模式 注意必须先配置好数据库
## 笔者采用的数据库字符集为 utf8mb4 排序规则 utf8mb4_general_ci
cd blog
yarn dev
cd service
yarn dev
cd admin
yarn start

## 打包前端
cd react-blog  cd blog  cd admin
yarn build

## 后端笔者则是采用pm2
cd server
pm2 start app.js
```

