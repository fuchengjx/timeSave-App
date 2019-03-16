# Todolist

## 简介

> A task management tool
>
> 一个基于vue的移动端Todolist, 可以实现任务的添加。任务的删除。完成任务后可以勾选已完成等一系列操作。拥有完整的后端数据库。

## 页面

图片全为google浏览器开发者模式下iphone6/7/8视图下查看。

![登陆页面](http://github.com/fuchengjx/Todolist/raw/master/readme/login.png)
当你一开始访问这个页面时，路由将定位到这里。
这个时候如果有注册的话可以直接登陆，如果没有点击注册，注册一个账号。

![register](http://github.com/fuchengjx/Todolist/raw/master/readme/register.png)
填入你的邮箱，点击获取验证码，后端服务器将会发送验证码至你的注册邮箱中。
输入密码后将会提示成功(如果失败也会出现相应的提示)

![修改密码](http://github.com/fuchengjx/Todolist/raw/master/readme/modifyPassword.png)

如果忘记密码后，点击修改密码后。跳转到修改密码页面。 

![task](http://github.com/fuchengjx/Todolist/raw/master/readme/task.png)

登录成功后，路由会自动跳转到task界面，在这里是整个功能的核心部分，你可以实现任务的添加，删除，勾选是否完成等功能。  点击蓝色的添加按钮，出现添加视窗,在这里选择要添加的任务标题，选择任务的标签(这里可以选择默认的几个标签，也可以自己输入自定义的标签类型。)，可以对任务的优先级进行加急，点击那个加急图标后，图标的颜色将会变成蓝色，并且一直不会改变，以示你已经加急过该事件。 然后点击添加时间的图标，选择任务开始的时间点，选择开始的日期等。然后点击右上角添加图标， 添加成功后，会重新请求一下后端服务器，确保任务已经在后端数据库添加完成。  如果正在添加的任务有误，你可以点击返回图标，返回初始的任务界面。再次返回后，原来的错误输入会全部清除掉。

添加后的任务，可以勾选，勾选后将颜色将会变灰，然后出现中划线将其划掉，表示已经完成这个任务。已完成的任务可以再次取消勾选回去。  先前添加后的勾选框，如果有加急这件任务，它添加成功后会有勾选框的样式为蓝色，以表示这件事被加急过了。  任务向左滑动会出现删除按钮，点击删除后可以将任务删除。

![校历表](http://github.com/fuchengjx/Todolist/raw/master/readme/schoolCalendar.png)

底部导航栏，第二个为校历，本来打算做成轮播图的形式，向左向右滑动可以看到这一年的日历

![我的](http://github.com/fuchengjx/Todolist/raw/master/readme/mine.png)

底部导航栏，第三个位我的，这里有当前用户信息，显示用户的头像、用户名(目前修改头像和用户名的功能尚未开放)及邮箱账号。关于 界面可以看到一些关于这个产品的一系列信息。 反馈与建议 可以向我们提出你宝贵的建议。 修改密码 可以修改你这个邮箱账号的密码。  退出登录 点击后，将会清除localStorage存储下来的token，然后路由跳转到登录界面。


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
