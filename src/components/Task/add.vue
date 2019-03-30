<template>
  <div>
    <div class="event_input">

      <button class="btn_cancel" @click="cancelAdd()" >
        <span class="iconfont">&#xe600;</span>
      </button>
      <button class="btn_confirm" @click="confirmAdd()">
        <span class="iconfont">&#xe843;</span>
      </button>
      <div class="input_text">
        <input placeholder=" 请添加注意事项" v-model="title"/>
      </div>

      <div class="taskNav">
        <div class="label">
          <button @click="labelDisplay()">
            <span class="iconfont">&#xe737;</span>
          </button>
        </div>
        <cube-select
          v-if="labelVisable"
          v-model="labelValue"
          :auto-Pop="true"
          :options="options">
        </cube-select>

        <div class="priority">
          <button @click="priority()">
            <span class="iconfont">&#xe8a5;</span>
          </button>
        </div>
        <div class="time">
          <button @click="timeDisplay()">
            <span class="iconfont">&#xe83d;

            </span>
            <cube-button
              class="cBtn"
              :auto-Pop="true"
              @click="showDateSegmentPicker">
            </cube-button>
          </button>
        </div>
      </div>
      <cube-popup type="my-popup" ref="myPopup" v-model="visible">
      <span class="Msg">
         {{Msg}}
      </span>
      </cube-popup>
    </div>
  </div>
</template>

<script>
  export default {
    name: "add",
    data () {
      return {
        timeData: [
          {
            is: 'cube-date-picker',
            title: '日期',
            min: new Date(),
            max: new Date(2030, 11, 31)
          },  {
            is: 'cube-date-picker',
            title: '时间',
            min: [1, 0],
            max: [23, 59],
            value: new Date(),
            startColumn: 'hour',
            selectedIndex: [0, 0],
            columnCount: 2,
          }
        ],
        Msg: '',
        visible: false,
        title: '',
        labelValue: '',
        options: ['健身', '旅游', '学习', '工作', '娱乐'],
        labelVisable: false,
        priorityValue: 0,

        startDate: '',
        startTime: '',

        timeVisable: false,
      }
    },
    methods : {
      showDateSegmentPicker() {
        this.dateSegmentPicker.show()
      },
      cancelAdd () {
        this.$router.push({ path: '/'})  //暂时先看看直接跳转到根路由是否会把该组件的数据清空
      },
      confirmAdd () {
        let postData = {title: this.title, startDate: this.startDate, startTime: this.startTime, label: this.labelValue, priority: this.priorityValue}
        console.log(postData)
        this.axios({
          methods: 'post',
          url: '/api/task/create',
          data: postData,
          header: {
            Authorization: this.token
          }
        }).then( (res)=> {
          this.Msg = res.data.msg
          this.Popup ()
          if(res.data.code) {
            this.$router.push({ path: '/'})
          }
        }).catch( (err)=> {
          this.Msg = err + "\n\n" + "       创建任务失败"
          this.Popup()
        })
      },
      labelDisplay () {
        this.labelVisable = true
        document.querySelector(" .label span").style.color = '#0082ff'
        document.querySelector(".priority span").style.color = '#333333'
        document.querySelector(".time span").style.color = '#333333'
      },
      priority () {
        this.priorityValue = 1
        document.querySelector(".priority span").style.color = '#0082ff'
        document.querySelector(".label span").style.color = '#999999'
        document.querySelector(".time span").style.color = '#333333'
        this.Msg = '✔任务标记为紧急!'
        this.Popup()
      },
      timeDisplay (){
        this.timeVisable = true
      }
    },
    mounted() {
      this.dateSegmentPicker = this.$createSegmentPicker({
        data: this.timeData,
        onSelect: (selectedTime, selectedText, formatedTime) => {
          this.startDate = formatedTime[0][0] + "-" + formatedTime[0][1] + "-" + formatedTime[0][2]
          console.log("startDate" + this.startDate)
          this.startTime = formatedTime[1][0] + ":" + formatedTime[1][1]
          console.log("startTime" + this.startTime)
          this.$createDialog({
            type: 'warn',
            title: `标题: ${selectedTime}`,
            content: `Selected Items: <br/>日期: ${formatedTime[0]} <br/>选择时间: ${formatedTime[1]}`,
            icon: 'cubeic-alert'
          }).show()
        },
      })
    }
  }
</script>

<style scoped>
  .event_input{
    position: absolute;
    width: 9.4rem;
    padding: 0.2rem 0.3rem 2rem 0.3rem;
    z-index: 999;
    font-size: 20px;
    background: white;
  }
  button .iconfont{
    font-size: 25px;
  }
  .btn_confirm{
    float: right;
  }
  .btn_confirm .iconfont{
    font-size: 25px;
  }
  .event_input button{
    border: 0;
    font-size: 14px;
    background: white;
    /*background-image: url("../../assets/images/clock.jpg");*/
  }
  .startTime button{
    color: #c0c4cc;
    padding-left: 30px;
    background: white url("../../assets/images/clock.jpg") no-repeat 10px 13px;
  }
  .input_text input{
    height: 1rem;
    width: 9.4rem;
    font-size: 24px;
    border: 0;
    padding-top: 5px;
    padding-bottom: 12px;
  }
  .taskNav{
    position: relative;
  }
  .taskNav div{
    display: inline-block;
  }
  .label span{
    color: gray;
  }
  .priority{
    position: absolute;
    left: 6.53rem;
    color: blue;
  }
  .priority .iconfont{
    font-size: 21.5px;
  }
  .time{
    position:absolute;
    right: 0.07rem;
    width: 30px;
    height: 30px;
  }
  .time button {
    position: relative;
    overflow: hidden;
  }
  .time span{
    position: absolute;
    right: 17px;
    bottom: 5px;
    z-index: 100;
  }
  .cBtn{
    padding-top: 10px;
    /*position: absolute;*/
    /*bottom: 10px;*/
    /*right:  5px;*/
    /*z-index: 0;*/
  }
  .time .iconfont{
    z-index: 100;
    font-size: 18px;
  }

</style>
