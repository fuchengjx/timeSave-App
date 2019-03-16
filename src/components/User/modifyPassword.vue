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
          <input placeholder="请输入新密码" type="password" required="required" title="请输入密码" v-model="pass"/>
      </div>
      </label>
    </div>
    <button type="button" class="btn_verify" @click="modify">修改</button>
    <mt-popup
      v-model="verifyVisible"
      position="top" class="verifyVisible">
      {{verifyMsg}}
    </mt-popup>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "modifyPassword",
    data () {
      return {
        token : localStorage.jwtToken,
        email: '',
        pass: '',
        verifyCode: '',
        verifyVisible: false,
        verifyMsg: ''
      }
    },
    methods: {
      modify () {
        if(this.email === ''){
          this.verifyVisible = true
          this.verifyMsg = "输入邮箱后才能发送哦"
        } else if (this.verifyCode === '') {
          this.verifyVisible = true
          this.verifyMsg = "请输入您获得的验证码"
        }else if (this.pass === ''){
          this.verifyVisible = true
          this.verifyMsg = "请输入您的新密碼"
        } else {
          let postData = { email: this.email, newPassword :this.pass, verifyCode: this.verifyCode}
          axios.post('/api/user/forget', postData).then(this.afterModify).catch(()=>{
            alert("密码修改失败")
          })
        }
      },
      afterModify (res) {
        this.verifyVisible = true
        this.verifyMsg = res.data.data
        if(res.data.code) {
          this.verifyMsg = res.data.data
          this.verifyVisible = true
          setTimeout(()=> {
            localStorage.removeItem("jwtToken")
            this.$router.push({path: '/User/login'})
          },2000)
        }
      },
      verify () {
        if(this.email === ''){
          this.verifyVisible = true
          this.verifyMsg = "输入邮箱后才能发送哦"
        } else {
          let postVerifyCode = {email: this.email}
          axios.post('/api/user/sendVcode', postVerifyCode).then(this.verifying).catch(()=>{
            alert("验证码发送失败")
          })
        }
      },
      verifying (res) {
        this.verifyVisible = true
        this.verifyMsg = res.data.data
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
  .verifyVisible{
    width: 100%;
    height: 1rem;
    font-size: 30px;
    text-align: center;
  }
</style>
