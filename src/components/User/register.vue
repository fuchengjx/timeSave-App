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
  import axios from 'axios'
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
      isEmail(str) {
        let myReg = /^[-_A-Za-z0-9]+@([_A-Za-z0-9]+\.)+[A-Za-z0-9]{2,3}$/
        if(myReg.test(str)) return true
        return false
      },
      Popup() {
        this.visible = true
        setTimeout(() => {
          this.visible = false
        }, 1000)
      },
      register () {
        if (this.isEmail(this.email) || this.verifyCode=== ''){
          this.Msg = "邮箱或验证码有误"
          this.Popup()
        }else if(this.password === ''){
          this.Msg = '密码不能为空'
          this.Popup()
        } else {
          let postData = { email: this.email, password: this.password, verifyCode: this.verifyCode }
          axios.post('/api/user/register', postData).then(this.todoSomething).catch( (res)=> {
            console.log(res)
            this.Msg = "注册失败"
            this.Popup()
          })
        }
      },
      todoSomething (res) {
        this.Msg = res.data.message  //ajax请求发送后返回的信息，看是否注册成功
        this.visible = true
        setTimeout( () => {
          if (res.data.status){
            localStorage.setItem("jwtToken",res.data.token)
            this.$router.push({path: '/User/login'})
          }
        },2500)
      },
      verify () {
        if(this.email === ''){
          this.Msg = "输入邮箱后才能发送哦"
          this.Popup()
        } else {
          let postVerifyCode = {email: this.email}
          axios.post('/api/user/sendVcode', postVerifyCode).then( (res) => {
            this.Msg = res.data.message
            this.Popup()
          }).catch( ()=> {
            this.Msg = "验证码发送失败"
            this.Popup()
          })
        }
      },
      goBack () {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>
  .Msg{
    font-size: 25px;
    padding: 5px;
    background: rgba(176,176,176,0.5);
  }
  .register{
    max-width: 405px;
    margin: 0 auto;
  }
  a{
    text-decoration: none;
    color: #292421;
  }
  .register{
    font-family:PingFangSC-Semibold, sans-serif;
  }
  .header{
    padding-top: 1.1rem;
    width: 7.5rem;
    display: block;
    margin: 0 auto;
  }
  .header span{
    font-size: 20px;
  }
  .register_form{
    width: 7.5rem;
    margin: 60px auto 0 auto;
    position: relative;
  }
  .register_image{
    width: 7.5rem;
    display: block;
    margin: 0 auto;
  }
  .content{
    position: relative;
  }
  input{
    width: 6.5rem;
    height: 60px;
    line-height: 60px;
    outline: none;
    border-bottom: 1px solid rgb(176,176,176) ;
    border-top: 0px;
    border-left: 0px;
    border-right: 0px;
    padding-left: 1rem;
    font-size: 18px;
  }
  .iconfont{
    font-size: 25px;
  }
  .account_number{
    position: relative;
    display: flex;
    flex-direction: row;
    line-height: 60px;
    height: 60px;
  }
  .account_number i{
    position: absolute;
  }
  .account_verify{
    display: flex;
    flex-direction: row;
    line-height: 60px;
    height: 60px;
    padding-bottom: 3px;
  }
  .account_verify i{
    position: absolute;
  }
  .account_password{
    position: relative;
    display: flex;
    flex-direction: row;
    line-height: 60px;
    height: 60px;
  }
  .account_password i{
    position: absolute;
  }
  .btn_verify{
    position: absolute;
    right: 0;
    font-size: 18px;
  }
  .btn_register{
    margin-top: 38px;
    margin-bottom: 11px;
    width: 7.5rem;
    height:1.25rem;
    background:#292421;
    border: 0;
    border-radius: 10px;
    color:white ;
    box-shadow: 0 3px 6px rgb(220,220,220);
    font-size: 16px;
  }

</style>
