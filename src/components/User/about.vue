<template>
  <div class="wrapper">
    <div class="header">
        <span @click="goBack" class="iconfont">&#xe600;</span>
      <span>关于</span>
    </div>
    <img class="haowai" src="../../assets/images/号外.jpg">
    <div class="aboutContent">
      <h2>团队介绍及开发需求</h2>
      <p>你好哇，我们终于见面啦~
  真让人激动，在一个效率至上的时间管理工具里，你愿意花点时间来了解我们的故事。
  那认真听，现在，故事要开始了：
  想不想知道，你正使用的这个叫“时现”的东西，是怎么来的？
  也许，就因为那个产品小姐姐初来乍到，列出来的十余个点子都不幸被Pass；
  也许，就因为这个项目组的人开了两次讨论会，也没提出另一个闪着灵光的想法；
  也许，就因为某位研发一拍脑袋突然想起自己曾经想做的一件产品：
  “做一个牛逼的to do list吧！”
  听到这个想法的时候，其他四个人，好像都没多大感觉。
  对，没多大感觉。
  又不是什么空前绝后的东西，市面上的to do list，没有几百也该有几十了，我们这又算什么呢？但至少和其他的点子相比，这个似乎是最好的选择了。
      决定就此开始，与此同时，也意味着项目组的五人没了退路。
  因为两个星期，它就必须诞生。
  自不必多言熬了几个夜，改了几次界面，毙掉几个文案，又或是已经做好了为你眼前这个产品“献祭”的准备。欣慰的是，在这两个星期的争分夺秒里，我们越发意识到我们这个产品的意义。
  即使在不赶工期的日常，所有人需要做的事情也足够多，足够庞杂到让人晕头转向的了。可尽管已经有这么多的时间管理工具，却仍没有真正意义上完全满足人们对把控时间的需求。所有人，还在隐隐期待着，更好的时间管理工具的诞生。
  那些开天辟地的创举固然伟大，也往往意味着稚嫩和不完善。而我们认为在不断推动着发展的，并不是开头和结尾，而是一次次，竭力向更深层面的探索与改进。哪怕只是找到了某个更合你心意的按钮位置，某个更舒服的呈现页面，更稳定的运行，对我们而言都是巨大的成功。我们希望，你正使用着的这个时间管理工具，可以带给你更好的用户体验，能满足绝大部分你对时间管理的需求，最重要的是，让你抓住对你而言，无比珍贵的分分秒秒。
  “时现”这个名字，灵感来源于林庚先生的“把一切时光变成现在。”这句话。如这句话所言，我们希望这个14天就出生的小家伙，能真正地将你的一切时光统统收入其中，让每时每刻都成为最值得珍惜的当下。
  它还会成长，故事仍在继续。所以，你决定好和我们一起见证这一切了吗？
      </p>
    </div>
    <img class="bg" src="../../assets/images/时现logoBg.png">
  </div>
</template>

<script>
  export default {
    name: "about",
    methods: {
      goBack() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .wrapper
    max-width 420px
    margin 0 auto
    .header
      position relative
      height 1rem
      line-height: 1rem
      text-align: center
      font-size: 24px
      font-weight: bold
      .iconfont
        position absolute
        left 0
        padding-left 10px
        font-size 24px
    .haowai
      width 100%
      height 153px
    .aboutContent
      max-width: 420px
      width 8.4rem
      margin 0 auto
      font-size 14px
      white-space pre-wrap  //使文本保持原来的格式，不被隐藏，又有换行等
      word-break break-all
      line-height 24px
      h2
       margin-bottom -10px
       margin-top 10px
       font-size 23px
       color #0082FF
    .bg
      position fixed
      left 0
      right 0
      top 7rem
      width 205px
      height 270px
      margin 0 auto
</style>
