<template>
  <div class="wrapper">
    <div class="header">
        <span @click="goBack" class="iconfont">&#xe600;</span>
      <span>反馈与建议</span>
    </div>
    <div class="bg">
    <div class="classify">
      <div class="classifyTitle">分类</div>
      <div class="classifyBtn">
        <cube-tab-bar
          v-model="selectedLabelDefault"
          :data="tabs">
        </cube-tab-bar>
      </div>
    </div>
    <div class="feedback">
      <div class="feedbackTitle">反馈</div>
      <div class="feedbackContent">
        <textarea placeholder="请输入反馈内容" v-model="content" required="required"></textarea>
      </div>
    </div>
    <div class="contact">
      <div class="contactTitle">
        联系方式
      </div>
      <input v-model="phone" class="contact_input" placeholder="请输入联系方式"/>
      <button @click="submit" class="submitBtn">提交</button>
    </div>
    </div>

    <cube-popup type="my-popup" ref="myPopup" v-model="visible" >
      <span class="Msg">
         {{Msg}}
      </span>
    </cube-popup>
  </div>
</template>

<script>
  export default {
    name: "suggestion",
    data () {
      return {
        content: '',
        token : localStorage.jwtToken,
        phone : '',
        visible: false,
        Msg: '',
        selectedLabelDefault: '问题反馈' ,
        tabs:[{
          label: '问题反馈'
        },{
          label: '改善建议'
        }]
      }
    },
    methods:{
      changeBgc (index) {
        this.inx = index
      },
      submit () {
        if (this.content===''){
          this.Msg = "(ง •_•)ง您的反馈不能为空哦!"
          this.Popup()
        } else {
          let data = {"content" : this.content, "type": "text", "phone" : this.phone}
          this.axios({
            method: 'post',
            data: data,
            url: '/api/feedback/submit',
            headers: {
              Authorization: this.token
            }
          }).then(this.showMsg).catch(()=>{
            this.Msg = "反馈失败"
            this.Popup()
          })
        }
      },
      showMsg (res) {
        this.Msg = res.data.data
        this.Popup()
        if(res.data.code) {
          setTimeout(function () {
            this.$router.push({path: '/'})
          },500)
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
  a{
    text-decoration: none;
  }
  .header{
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    position: relative;
    height: 1rem;
    line-height: 1rem;
  }
  .header .iconfont{
    position: absolute;
    left: 0;
    font-size: 24px;
    padding-left: 15px;
  }
  .classify{
    font-size: 18px;
    background: #FAFAFA;
  }
  .classifyTitle{
    padding-left: 20px;
    height: 40px;
    line-height: 40px;
  }
  .classifyBtn{
    height: 50px;
    line-height: 35px;
    font-size: 16px;
    background: white;
    padding-left: 20px;
  }
  .feedback{
    font-size: 18px;
    background:#FAFAFA ;
  }
  .feedbackTitle{
    padding-left: 20px;
    height: 40px;
    line-height: 40px;
  }
  textarea{
    font-size: 16px;
    padding-left: 20px;
    width: 100%;
    height: 173px;
    border: 0;
  }
  .contact{
    font-size: 18px;
    background: #FAFAFA ;
  }
  .contactTitle{
    padding-left: 20px;
    height: 40px;
    line-height: 40px;
  }
  .contact_input{
    font-size: 16px;
    border: 0;
    width: 100%;
    padding-left: 20px;
    height: 40px;
    line-height: 40px;
    color:#C0C0C0;
  }
  .submitBtn{
    border: 0;
    background: #ffffff;
    width: 100%;
    height: 50px;
    line-height: 50px;
    color: #0082FF ;
    position: absolute;
    bottom: -47px;
  }
  .bg{
    position: absolute;
    top: 1rem;
    bottom: 50px;
    right: 0;
    left: 0;
    background: #FAFAFA ;
    max-width: 405px;
    margin: 0 auto;
  }

</style>
