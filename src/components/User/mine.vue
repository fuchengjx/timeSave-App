<template>
  <div class="wrapper">
    <div class="header">
      我的
    </div>
    <div class="content">
     <div class="personage">
       <img class="picture" src="../../assets/images/孙璟.jpg">
       <div class="user">
         <span class="userName">孙璟</span>
         <span class="userEmail">{{this.userEmail}}</span>
       </div>
     </div>
     <div class="nav">
       <div class="about">
         <router-link to="/User/about">
           <span>关于</span>
           <span class="iconfont">&#xe600;</span>
         </router-link>
       </div>
       <div class="back">
         <router-link to="/User/suggestion">
           <span>反馈与建议</span>
           <span class="iconfont">&#xe600;</span>
         </router-link>
       </div>
       <div class="modifyPassword">
         <router-link to="/User/modifyPassword">
           <span>修改密码</span>
           <span class="iconfont">&#xe600;</span>
         </router-link>
       </div>
       </div>
      <div class="exit" @click="exitLogin">
        <span>退出登录</span>
      </div>
  </div>
  </div>
</template>

<script>
  export default {
    name: "mine",
    data () {
      return {
        token : localStorage.jwtToken,
        userEmail: localStorage.shixianEmail,
      }
    },
    methods:{
      exitLogin () {
        localStorage.setItem("jwtToken", null)
        this.$router.push({path : '/User/login'})
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .wrapper
    max-width 420px
    margin 0 auto
  a{
    text-decoration: none;
    color: #333;
  }
    .header
      height 1rem
      padding-bottom 4px
      border-bottom 1px solid #f3f3f3
      box-shadow 0px 1px 1px #f7f7f714
      font-size 24px
      font-family PingFangSC-Semibold, sans-serif
      line-height 1rem
      text-align center
    .content
      position: absolute
      top: 1.2rem
      bottom: 1.2rem
      right: 0
      left: 0
      max-width: 420px
      margin: 0 auto
      background: #FAFAFA
    .personage
      display flex
      flex-direction row
      padding-top 11px
      padding-bottom 13px
      border-bottom 10px solid #FAFAFA
      background #ffffff
      .picture
        width 90px
        height 90px
        border-radius 50%
        margin-left 16px
        margin-right 24px
      .user
        display flex
        flex-direction column
        font-family PingFangSC-Semibold, sans-serif
        width 215px
        .userName
          padding-top 10px
          font-size 30px
        .userEmail
          padding-top 10px
          font-size 18px
    .nav
      border-bottom 35px solid #FAFAFA
      div
        background #ffffff
        height 36px
        line-height 36px
        padding-left 16px
        font-size 15px
      .iconfont
        display inline-block
        float right
        padding-left 17px
        transform rotateY(180deg)
     .exit
       text-align center
       height 50px
       line-height 50px
       color red
       font-size 20px
       background #ffffff
</style>
