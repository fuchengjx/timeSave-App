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
      }
    }
  }
</script>

<style scoped>
  .wrapper{
    max-width: 405px;
    margin: 0 auto;
  }
  .bg{
    position: absolute;
    top: 10rem;
    bottom:0;
    right: 0;
    left: 0;
    background:#FAFAFA ;
  }
  .header{
    position: relative;
    background: white;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    height: 1rem;
    line-height: 1rem;
    padding-bottom: 4px;
  }
  .header .iconfont{
    position: absolute;
    left: 0;
    font-size: 24px;
    padding-left: 15px;
  }
  .safe{
    border-top: 1px solid rgb(176,176,176);
    width: 100%;
    height: 188px;
    text-align: center;
    background: url("../../assets/images/safe.png") no-repeat center;
  }
  .safe span{
    display: block;
    font-size: 18px;
    margin-top: 123px;
  }
  .content{
    position: relative;  /*提升index层级，防止被覆盖*/
    background: white;
  }
  .content div{
    height: 50px;
    line-height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
  .content div input{
    height: 50px;
    line-height: 50px;
    color:#C0C0C0;
    font-size: 16px;
    border: 0;
    flex: 7.34;
    padding-left: 10px;
  }
  .content div span{
    padding-left: 15px;
    font-size: 18px;
    flex: 2.66;
  }
  .verify{
    position: relative;
  }
  .verifyBtn{
    position: absolute;
    right: 0;
    font-size: 16px;
    color: #C0C0C0;
    padding-right: 23px;
  }
  .btn_verify{
    display: block;
    position: relative;
    margin: 38px auto 11px auto;
    width: 6rem;
    height: 1rem;
    background: #292421;
    border: 0;
    border-radius: 10px;
    color:white ;
    box-shadow: 0px 3px 6px rgb(220,220,220);
    font-size: 16px;
  }
</style>
