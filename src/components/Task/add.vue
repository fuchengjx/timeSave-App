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
        token: localStorage.jwtToken,
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

        startTime: '',

        timeVisable: false,
      }
    },
    methods : {
      showDateSegmentPicker() {
        this.dateSegmentPicker.show()
      },
      cancelAdd () {
        this.$router.push({ path: '/'})
      },
      confirmAdd () {
        let postData = {title: this.title, startTime: this.startTime, label: this.labelValue, priority: this.priorityValue}
        console.log(postData)
        this.axios({
          method: 'post',
          url: '/api/task/create',
          data: postData,
          headers: {
            Authorization: this.token
          }
        }).then( (res)=> {
          this.Msg = res.data.message
          this.Popup ()
          if(res.data.status) {
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
          this.startTime = formatedTime[0][0] + "-" + formatedTime[0][1] + "-" + formatedTime[0][2] + " " + formatedTime[1][0] + ":" + formatedTime[1][1] + ":00"
          console.log("startTime  " + this.startTime)
        },
      })
    }
  }
</script>

<style lang="stylus" scoped>
  .event_input
    position absolute
    width 9.4rem
    padding 0.4rem 0.3rem 2rem 0.3rem
    font-size 20px
    background white
    z-index 999
    button
     border 0
     font-size 14px
     background white
    button .iconfont
      font-size: 25px;
    .btn_confirm
      float: right;
    .input_text input
      height 1rem
      width 9.4rem
      padding-top 5px
      margin-bottom 12px
      border 0
      font-size 24px
    .taskNav
      position relative
      div
        display inline-block
    .label span
      color gray
    .priority
      position absolute
      left 6.53rem
      .iconfont
        font-size 25px
    .time
      position absolute
      right 0.2rem
      width 30px
      height 30px
      .time button
        position relative
        overflow hidden
    .time span.iconfont
      z-index 100
      font-size 22px
      .cBtn
        padding-top 10px

</style>
