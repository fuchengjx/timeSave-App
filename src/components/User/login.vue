<template>
  <div class="login">
    <cube-popup type="my-popup" ref="myPopup" v-model="visible">
      <span class="Msg">{{Msg}}</span>
    </cube-popup>
    <form class="login_form">
      <img class="login_image" src="../../assets/images/login.png" />
      <div class="content">
        <label class="account_number">
          <i class="iconfont">&#xe62a;</i>
          <input
            type="email"
            name="user_login"
            placeholder=" 请输入邮箱地址"
            required="true"
            title="请输入邮箱地址"
            v-model="email"
            autocomplete="off"
          />
        </label>
        <label class="account_password">
          <i class="iconfont">&#xe638;</i>
          <input
            type="password"
            name="user_pass"
            placeholder=" 请输入密码"
            required="true"
            title="请输入密码"
            v-model="password"
            autocomplete="off"
          />
        </label>
        <div class="user_nav">
          <button type="button" class="btn_login" @click="login">登录</button>
          <router-link to="/User/register" class="register">注册</router-link>
          <router-link to="/User/modifyPassword" class="forget">忘记密码</router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
      visible: false,
      Msg: ""
    };
  },
  methods: {
    login() {
      if (this.isEmail(this.email)) {
        let postData = { email: this.email, password: this.password };
        this.axios
          .post("/api/user/login", postData)
          .then(this.todoSomething)
          .catch(err => {
            console.log("denglushibai", err);
            this.Msg = "登录失败";
            this.Popup();
          });
      } else {
        this.Msg = "邮箱错误";
        this.Popup();
      }
    },
    todoSomething(res) {
      this.Msg = res.data.message;
      this.visible = true;
      if (res.data.status) {
        setTimeout(() => {
          localStorage.setItem("shixianEmail", this.email);
          localStorage.setItem("jwtToken", res.data.data.token);
          this.$router.push({ path: "/" });
        }, 500);
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.login_form {
  position: relative;
  width: 8.2rem;
  margin: 54px auto 0 auto;
}

.login_image {
  width: 8rem;
  display: block;
  margin: 0 auto;
}

.content {
  position: relative;
  margin-top: 51px;
}

.content label i {
  position: absolute;
  font-size: 25px;
}

input {
  width: 7rem;
  height: 60px;
  padding-left: 1rem;
  border-bottom: 1px solid rgb(176, 176, 176);
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  font-size: 18px;
  line-height: 60px;
  outline: none;
}

.account_number {
  position: relative;
  display: flex;
  flex-direction: row;
  height: 60px;
  line-height: 60px;
}

.account_password {
  display: flex;
  flex-direction: row;
  line-height: 60px;
  height: 60px;
}

.btn_login {
  width: 8.2rem;
  height: 1.2rem;
  margin-top: 48px;
  margin-bottom: 18px;
  border: 0;
  border-radius: 10px;
  box-shadow: 0px 3px 6px rgb(220, 220, 220);
  font-size: 16px;
  background: #595959;
  color: white;
}

.register {
  float: left;
  font-size: 18px;
  color: #000000;
  text-decoration: none;
}

.forget {
  float: right;
  font-size: 18px;
  color: #000000;
  text-decoration: none;
}
</style>
