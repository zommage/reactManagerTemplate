# reactManagerTemplate
* 借鉴了很多开源项目的代码，在此感谢github各开源贡献者的付出，谢谢
* 保持简洁画面
* 增加很多在实际项目开发中用到的功能(鉴权，签名，列表查询，表单提交等等)

#### 依赖模块
* react@15.5.0
* react-router@3.0.2(react路由,4.x的差异还是比较大，暂时还是3.x的版本)
* antd@2.9.3(蚂蚁金服开源的react ui组件框架)
* axios@0.16.1(http请求模块，可用于前端任何场景，很强大👍)
* nprogress@0.2.0(顶部加载条，蛮好用👍)
* 其他小细节省略
####

#### 功能模块
* 首页
  * 完整布局
  * 换肤(全局功能，暂时只实现了
* 导航菜单  
  * 顶部导航(菜单伸缩，全屏功能)
  * 左边菜单(增加滚动条以及适配路由的active操作)
  * 换肤(全局功能，暂时只实现了
* 表格, 表单 的查询以及提交
* rsa鉴权, hmac签名, 等实际项目中很有用的功能
####

#### 功能截图
![look](https://github.com/zommage/reactManagerTemplate/blob/master/src/style/imgs/snip1.png)
####

#### 安装运行
1. 下载或克隆项目源码

2. npm安装相关包文件(国内建议增加淘宝镜像源，不然很慢，你懂的😁)
```
npm install
```

3. 启动项目
```
npm start
```

4. build 项目
```
npm run build
```
####
