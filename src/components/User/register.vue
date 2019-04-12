<template>
  <div class="register">
    <div class="header">
        <span @click="goBack" class="iconfont">&#xe61b;</span>
    </div>
    <!--显示信息-->
    <cube-popup type="my-popup" ref="myPopup" v-model="visible" >
      <span class="Msg">
         {{Msg}}
      </span>
    </cube-popup>

    <div class="register_form">
      <form>
        <img class="register_image" src="../../assets/images/register.png">
        <div class="content">
          <label class="account_number">
            <i class="iconfont">&#xe62a;</i>
            <input type="email" name="user_register" placeholder=" 请输入邮箱地址" required="true" title="请输入帐号" v-model="email" autocomplete="on">
          </label>
          <label class="account_verify">
            <i class="iconfont">&#xe629;</i>
            <input type="number" name="user_verify" placeholder=" 请输入验证码" title="请输入验证码" v-model="verifyCode">
            <span class="btn_verify" @click="verify">获取验证码</span>
          </label>
          <label class="account_password">
            <i class="iconfont">&#xe638;</i>
            <input type="password" name="user_pass" placeholder=" 请输入密码"  required="true" title="请输入密码" v-model="password" autocomplete="on">
          </label>
          <cube-button class="btn_register" @click="register">
            注册
          </cube-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    name: "register",
    data () {
      return{
        email: '',
        password: '',
        verifyCode: '',
        Msg: '',
        visible: false
      }
    },
    methods: {
      register () {
        if(this.isEmail(this.email)) {
          if(this.verifyCode !== '') {
            if (this.password !== '') {
              let postData = { email: this.email, password: this.password, verifyCode: this.verifyCode }
              this.axios.post('/api/user/register', postData).then(this.todoSomething).catch( (err)=> {
                console.log("error",err.response)
                this.Msg = err.response.data.message
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
      todoSomething (res) {
        this.Msg = res.data.message  //ajax请求发送后返回的信息，看是否注册成功
        this.visible = true
        if(res.data.status) {
          setTimeout( () => {
            if (res.data.status){
              localStorage.setItem("jwtToken",res.data.data.token) //本地存储Token注册后直接进入首页
              localStorage.setItem("shixianEmail", this.email)
              this.$router.push({path: '/'})
            }
          },2500)
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
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .register
    max-width 420px
    margin 0 auto

  a{
    text-decoration: none;
    color: #292421;
  }
    .header
      display block
      width 8rem
      padding-top 1.1rem
      margin 0 auto
      span
       font-size 25px
       color #242921
    .register_form
      position relative
      width 8rem
      margin 20px auto 0 auto
      .register_image
        display block
        width 8rem
        margin 0 auto 20px auto
      .content
        position relative
        input
          width 7rem
          height 60px
          padding-left 1rem
          border-bottom 1px solid rgb(176,176,176)
          border-top 0px
          border-left 0px
          border-right 0px
          font-size 18px
          line-height 60px
          outline none
        .iconfont
          font-size 25px
          color #595959
       .account_number
         position relative
         display flex
         flex-direction row
         line-height 60px
         height 60px
         i
           position absolute
       .account_verify
         display flex
         flex-direction row
         line-height 60px
         height 60px
         padding-bottom 3px
         i
           position absolute
       .account_password
         position relative
         display flex
         flex-direction row
         height 60px
         line-height 60px
         i
          position absolute
      .btn_verify
        position absolute
        right 0
        font-size 18px
      .btn_register
        width 8rem
        height 1.25rem
        margin-top 38px
        margin-bottom 11px
        borde: 0
        border-radius 10px
        box-shadow 0 3px 6px rgb(220,220,220)
        font-size 16px
        background #595959
        color white
</style>
