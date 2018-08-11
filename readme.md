# react-boilerplate project 
### record how to create a react project manually with redux webpack etc. tecnology

> npm初始化package.json

``` npm
➜ mkdir react-boilerplate       #新建项目文件夹
➜ cd react-boilerplate          #进入
➜ npm init  #初始化package.json

name: (react_boilerplate) 
version: (1.0.0) 
description: "react boilerplate project was created manually"
entry point: (index.js) 
test command: 
git repository: 
keywords: 
author: angus qing
license: (ISC)
```

> 安装React，基础框架

``` npm
➜ npm install --save react react-dom

├── react@15.4.2
├── react-dom@15.4.2

```
> 安装webpack和webpack-dev-server

``` npm
➜ npm install --save webpack webpack-dev-server

├── webpack@2.3.2 #用于将代码整体打包压缩输出的工具
├── webpack-dev-server@2.4.2 #用于开发模式代码调试与热更新

```

> 安装配置webpack用到的库

*babel相关的库，用来打包编译转换为目前主流浏览器支持的JS语法*

``` npm
➜ npm install --save-dev babel babel-core babel-loader babel-preset-es2015 babel-preset-react babel-preset-stage-3 
├── babel@6.23.0 
├── babel-loader@6.4.1 
├── babel-preset-es2015@6.24.0  #打包编译ES6转ES5的库
├── babel-preset-react@6.23.0   #打包编译jsx语法
├── babel-preset-stage-3@6.22.0 #打包编译async|await语法

```

> style相关库，用来打包css，编译less、sass

``` npm
➜ npm install --save-dev  style-loader css-loader less-loader sass-loader less node-sass 
├── style-loader@0.16.1 
├── css-loader@0.27.3 
├── less-loader@4.0.2 
├── sass-loader@6.0.3 
├── less@2.7.2
├── node-sass@4.5.1

```

> path 用于拼接路径

``` npm
➜ npm install --save-dev path 
├── path@0.12.7

```

> html-webpack-plugin 模板插件用于导出html时，可以使用模板

``` npm
➜ npm install --save-dev html-webpack-plugin 
├── html-webpack-plugin@2.28.0

```

> 创建并配置webpack.config.js

```


```
