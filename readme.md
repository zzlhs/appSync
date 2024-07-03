
## app跨端同步客户端
```angular2html

npm install electron --save-dev
nvm use 18.17.0

```

### 1 项目结构
```
├── forge.config.js ----------------- 打包和发布 Electron 应用程序的工具
├── index.html ---------------------- react项目的页面
├── main.js ------------------------- Electron的主入口
├── package-lock.json
├── package.json
├── postcss.config.cjs -------------- 来配置 PostCSS 的配置文件。PostCSS 是一个用 JavaScript 编写的工具，用于转换 CSS 样式。
├── preload.js ---------------------- Electron的主入口的预脚本
├── public  ------------------------- 
│   └── index.html
├── readme.md
├── renderer.js --------------------- Electron 与主线程交换信息的文件
├── src ----------------------------- react项目的目录 
│   ├── Application.tsx
│   ├── apis
│   │   └── index.ts
│   ├── assets
│   │   ├── icon.ico
│   │   └── loginBack.svg
│   ├── index.less
│   ├── main.tsx
│   ├── pages
│   │   ├── Home
│   │   │   └── index.tsx
│   │   ├── Index
│   │   │   └── index.tsx
│   │   ├── Login
│   │   │   ├── index.less
│   │   │   └── index.tsx
│   │   ├── MainView
│   │   │   └── index.tsx
│   │   └── Paper
│   │       ├── MyView.tsx
│   │       └── Views.tsx
│   ├── routes
│   │   └── index.tsx
│   └── vite-env.d.ts
├── tailwind.config.js ------------- 可以全面定制 Tailwind CSS 的行为，以便更好地适应你的项目需求
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── webpack.config.js

```

### 2 electron语法