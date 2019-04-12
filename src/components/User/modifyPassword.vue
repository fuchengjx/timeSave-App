<template>
  <div class="wrapper">
    <div class="bg"></div>
    <div class="header">
        <span @click="goBack" class="iconfont">&#xe600;</span>
      <span>修改密码</span>
    </div>
    <div class="safe">
      <span class="safeText">为了您的账户安全,需要验证您的邮箱</span>
    </div>
    <div class="content">
      <label>
      <div class="email">
          <span>邮箱</span>
          <input placeholder="请输入登录邮箱地址" type="email" title="请输入登录邮箱地址" required="required" v-model="email" autocomplete="on">
      </div>
      </label>
      <div class="verify">
        <span class="verifyNum">验证码</span>
        <input class="verifyInput" placeholder="请输入验证码" v-model="verifyCode"/>
        <span class="verifyBtn" @click="verify">获取验证码</span>
      </div>
      <label>
      <div class="password">
          <span>新密码</span>
          <input placeholder="请输入新密码" type="password" required="required" title="请输入密码" v-model="password"/>
      </div>
      </label>
    </div>
    <button type="button" class="btn_verify" @click="modify">修改</button>
    <!--显示信息-->
    <cube-popup type="my-popup" ref="myPopup" v-model="visible" >
      <span class="Msg">
         {{Msg}}
      </span>
    </cube-popup>
  </div>
</template>

<script>
  export default {
    name: "modifyPassword",
    data () {
      return {
        token : localStorage.jwtToken,
        email: '',
        password: '',
        verifyCode: '',
        visible: false,
        Msg: ''
      }
    },
    methods: {
      modify () {
        if(this.isEmail(this.email)) {
          if(this.verifyCode !=='') {
            if(this.password !== '') {
              let postData = { email: this.email, newPassword :this.password, verifyCode: this.verifyCode}
              this.axios.post('/api/user/forget', postData).then(this.afterModify).catch( (res)=> {
                console.log(res) //打印错误信息方便调试
                this.Msg = '密码修改失败'
                this.Popup()
              })
            } else {
              this.Msg = '密码不能为空'
              this.Popup()
            }
          } else {
            this.Msg = '验证码有误'
            this.Popup()
          }
        } else {
          this.Msg = '邮箱有误'
          this.Popup()
        }
      },
      afterModify (res) {
        this.Msg = res.data.message
        this.visible = true
        if(res.data.status) {
          setTimeout( ()=> {
            localStorage.removeItem("jwtToken")
            localStorage.removeItem("shixianEmail")
            this.$router.push({path: '/User/login'})
          },2000)
        }
      },
      verify () {
        if (this.isEmail(this.email)) {
          let postVerifyCode = {email: this.email}
          this.axios.post('/api/user/sendVcode', postVerifyCode).then( (res) => {
            this.Msg = res.data.message
            this.Popup()
          }).catch( ()=> {
            this.Msg = "验证码发送失败"
            this.Popup()
          })
        } else {
          this.Msg = '邮箱有误'
          this.Popup()
        }
      },
      goBack () {
        this.$router.go(-1)
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .wrapper
    max-width 420px
    margin 0 auto
    .bg
      position absolute
      top 10rem
      bottom 0
      right 0
      left 0
      background #FAFAFA
    .header
      position relative
      height 1rem
      padding-bottom 4px
      font-size 24px
      font-weight bold
      line-height 1rem
      text-align center
      background white
     .iconfont
       position absolute
       left 0
       padding-left 15px
       font-size 24px
    .safe
      width 100%
      height 188px
      border-top 1px solid rgb(176,176,176)
      text-align center
      background url("../../assets/images/safe.png") no-repeat center
      span
       display block
       margin-top 123px
       font-size 18px
    .content
      position relative  /*提升index层级，防止被覆盖*/
      background white
      div
        flex-direction row
        justify-content flex-start
        display flex
        height 50px
        line-height 50px
        input
           flex 7.34
           height 50px
           padding-left 10px
           border 0
           line-height 50px
           font-size 16px
           color #C0C0C0
        span
           flex 2.66
           padding-left 15px
           font-size 18px
     .verify
       position relative
       .verifyBtn
         position absolute
         right 0
         padding-right 23px
         font-size 16px
         color #C0C0C0
     .btn_verify
       display: block;
       position: relative;
       width: 6rem;
       height: 1rem;
       margin: 60px auto 11px auto;
       border: 0;
       border-radius: 10px;
       box-shadow: 0px 3px 6px rgb(220,220,220);
       background: #292421;
       font-size: 16px;
       color:white ;
</style>
