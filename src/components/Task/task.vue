<template>

  <div class="task" >

    <div class="header" v-if="headerShow">
      <div class="completeness">
        <button class="btn_complete">
          <span class="iconfont">&#xe83c;</span>
          <span v-model="checked">{{this.checked}}</span>/<span v-model="unchecked">{{this.unchecked}}</span>
        </button>
      </div>
      <span class="task_title">任务</span>
      <div class="more" @click="showSetting">
        <button  class="btn_more iconfont">&#xe842;</button>
      </div>
      <!--<div class="switch">-->
        <!--<button  class="btn_switch iconfont">&#xe844;</button>-->
      <!--</div>-->
    </div>

    <div class="moreSetting"  v-if="settingVisable">
      <div @click="settingCancel">
        <span class="iconfont">&#xe881;</span>
        <span>隐藏 (显示) 已完成</span>
      </div>
      <!--下个版本迭代-->
      <!--<div>-->
        <!--<span class="iconfont">&#xe841;</span>-->
        <!--<span>按标签分类</span>-->
      <!--</div>-->
    </div>
<!--任务渲染模块开始-->
    <div class="default">
      <!--默认的背景背景图，提醒用户添加任务-->
      <img src="../../assets/images/add.png" v-if="defaultBg">
    </div>

    <div class="list">
      <ul>
        <li v-for="(item,index) in unfinishDate"  class="unfinishList">
          <a href="#" :title="item.priority">
            <el-checkbox v-if="elDisply"  :title="item.priority" class="taskCheck" @change="removeList(index, item.taskId)"></el-checkbox>
            <span class="taskTitle">{{item.title}}</span>
            <span class="taskTime">{{item.startDate}}</span>
            <span class="taskLabel">{{item.label}}</span>
            <i @click="delUncheck(item.title, index, item.taskId)">删除</i>
          </a>
        </li>
      </ul>
      <ul>
        <li v-for="(item, index) in finishDate" class="complete" v-if="finishDisplay">
          <a href="#">
            <el-checkbox v-model="full" v-if="elDisply" class="taskCheck" @change="addList(index, item.taskId)"></el-checkbox>
            <span class="taskTitle">{{item.title}}</span>
            <!--<span class="taskTime">{{item.startDate}}</span>-->
            <!--<span class="taskLabel">{{item.label}}</span>-->
            <i @click="delCheck(item.title, index, item.taskId)">删除</i>
          </a>
        </li>
      </ul>
    </div>

    <div class="add">
      <button @click="addEvent()" class="btn_add iconfont">
        <span>&#xe64d;</span>
      </button>
    </div>

    <div class="barrier" v-if="display"></div>
    <div class="settingBarrier" v-if="settingVisable"></div>

  </div>

</template>

<script>
  export default {
    name: "task",
    data () {
      return {
        title: '',
        display: false,
        inputValue: '',
        labelValue: '',
        labelVisable: false,
        headerShow: true,
        defaultLabel: [{
          value: '工作'
        },{
          value:'学习'
        },{
          value:'生活'
        },{
          value:'购物'
        },{
          value:'娱乐'
      }],
        value2: '',
        value3: '开始时间点',
        visible3: false,
        timeVisable: false,
        elDisply: true, //控制那个勾选按钮显隐
        settingVisable: false,  //设置栏显隐
        priorityValue: 0,
        startTime: '',
        unfinishDate: [],
        finishDate: [],
        unchecked: 0,
        checked: 0,
        checkedList: [],
        full: true,
        finishDisplay: true,
        token: localStorage.jwtToken,
        expansion: null,
        defaultBg: true,  //默认的背景图，提醒用户添加任务
      }
    },
    methods: {
      showDatePicker() {
        if (!this.datePicker) {
          this.datePicker = this.$createDatePicker({
            title: 'Date Picker',
            min: new Date(2008, 7, 8),
            max: new Date(2020, 9, 20),
            value: new Date(),
            onSelect: this.selectHandle,
            onCancel: this.cancelHandle
          })
        }

        this.datePicker.show()
      },
      addEvent () {
        this.display = true
        this.headerShow = false
        this.elDisply = false
        this.$router.push({path: '/Task/add'})
      },
      render (res) {
        if (res.data.code) {
          // console.log("创建成功");
          axios({
            method:'get',
            url:'/api/task/list',
            headers: {
              Authorization: this.token
            }
          }).then(this.renderList).catch(function () {
            alert("创建失败")
          })
        } else {
          console.log("创建失败")
        }
      },
      renderList (res) {
        //这一部分是点击添加任务后恢复添加页面原来的模样，该隐藏的隐藏，值该清零的清零
        this.title =  ''
        this.labelValue =  ''
        this.value3 = '开始时间点'
        this.startTime = ''
        this.priorityValue = 0
        this.labelVisable = false
        this.timeVisable = false //选择时间那部分隐藏

          if(res.data.code){
            console.log("获取任务列表成功")
            this.unfinishDate = res.data.data.unfinish
            this.finishDate = res.data.data.finish
            this.unchecked = this.unfinishDate.length +  this.finishDate.length
            this.checked = this.finishDate.length
            setTimeout(()=>{
              if  (this.unchecked === 0){
                this.defaultBg = true
              } else {
                this.defaultBg = false
              }
            }, 500)
          }
          // this.elDisply = true //渲染完毕勾选立即显示
      },
      labelDisplay () {
        this.labelVisable = true
        document.querySelector(" .label span").style.color = '#0082ff'
        // document.querySelector(".priority span").style.color = '#333333'
        document.querySelector(".time span").style.color = '#333333'
      },
      confirmAdd (){
        this.display = false
        this.headerShow = true
        this.elDisply = true
        // console.log(this.startTime.toUTCString())
        // this.startTime = (this.startTime.toLocaleString())
        // console.log(this.startTime)
        let postData = {title: this.title, startDate: this.startTime, startTime:this.value3, priority:this.priorityValue ,label:this.labelValue}
        axios({
          method: 'post',
          url: '/api/task/create',
          data: postData,
          headers: {
            Authorization: this.token
          }
        }).then(this.render).catch(function () {
          alert("请选择开始时间点")
        })
        this.priorityValue = 0
      },
      cancelAdd () {
        //清空之前被选中的值
        this.headerShow = true
        this.display = false
        this.elDisply = true
        this.priorityValue = 0

        this.title = ''
        this.labelValue = ''
        this.value3 = '开始时间点'
        this.startTime = ''
        this.labelVisable = false
        this.timeVisable = false //选择时间那部分隐藏
        // location.reload()
      },
      priority () {
        this.priorityValue = 1
        document.querySelector(".priority span").style.color = '#0082ff'
        document.querySelector(".label span").style.color = '#999999'
        document.querySelector(".time span").style.color = '#333333'
      },
      timeDisply () {
        this.timeVisable = true
        // document.querySelector(".priority span").style.color = '#333333'
        document.querySelector(".label span").style.color = '#999999'
        document.querySelector(".time span").style.color = '#0082ff'
      },
      settingCancel () {
        this.settingVisable = false
        this.finishDisplay = !this.finishDisplay
      },
      open (picker) {
        this.$refs[picker].open();
      },

      removeList (index,taskId) {
      //把添加的任务勾选为已完成
      //   console.log("选项值已改变")
        this.finishDate.push(this.unfinishDate[index])
        this.unfinishDate.splice(index,1)
        this.checked = this.finishDate.length
        let data = {"taskId" : taskId}
        axios({
          method: 'post',
          data: data,
          url: '/api/task/finish',
          headers: {
            Authorization: this.token
          }
        })
      },
      addList (index,taskId) {
        this.unfinishDate.push(this.finishDate[index])
        this.finishDate.splice(index,1)
        this.checked = this.finishDate.length
        let data = {"taskId" : taskId}
        axios({
          method:'post',
          url:'/api/task/unfinish',
          data:data,
          headers: {
            Authorization: this.token
          }
        })
      },
      delUncheck: function(name, idx, taskId){
        if(confirm("确认删除"+ name)){
          this.unfinishDate.splice(idx,1);                                 //删除List这条数据 DOM随之更新渲染
          var container = document.querySelector('.swipeleft');           //将展开的DOM归位 除掉样式类
          container.className="";
          this.expansion=null;
          let data = {"taskId" : taskId}
          axios({
            method:'delete',
            url:'/api/task/delete',
            data: data,
            headers: {
              Authorization: this.token
            }
          }).then(this.count).catch(function () {
            alert("删除失败")
          })
        }
      },
      count (res) {
        if (res.data.code){
          console.log("count")
          this.unchecked = this.unfinishDate.length +  this.finishDate.length
          this.checked = this.finishDate.length
          console.log("checked:"+ this.checked, "unchecked"+ this.unchecked)
          setTimeout( ()=> {
            alert("删除成功")
          })
        }
      },
      showSetting () {
        this.settingVisable = !this.settingVisable
      },
      delCheck: function(name, idx, taskId){
        if(confirm("确认删除"+ name)){
          this.finishDate.splice(idx, 1);                                 //删除List这条数据 DOM随之更新渲染
          var container = document.querySelector('.swipeleft');           //将展开的DOM归位 除掉样式类
          container.className= "";
          this.expansion= null;
          let data = {"taskId" : taskId}
          axios({
            method: 'delete',
            url: '/api/task/delete',
            data: data,
            headers: {
              Authorization: this.token
            }
          }).then(this.count).catch(function () {
            alert("删除失败")
          })
        };
      },
      //验证token是否已过期
      loginFail () {
        alert("登录已过期，请重新登录")
        this.$router.push({path:'/User/login'})
      }
    },
    created () {
      // axios({
      //   method: 'get',
      //   url: '/api/task/list',
      //   headers: {
      //     Authorization: this.token
      //   }
      // }).then(this.renderList).catch(this.loginFail)
    },
    updated () {
      setTimeout( () => {
        var $this = this;														//将$this保存 区分以下触发事件的this
        var container = document.querySelectorAll('.list li a');
        for(var i = 0; i < container.length; i++){                          //为每个特定DOM元素绑定touchstart touchmove时间监听 判断滑动方向
          var x,  X;
          container[i].addEventListener('touchstart', function(event) {   //记录初始触控点横坐标
            x = event.changedTouches[0].pageX;
          });
          container[i].addEventListener('touchmove', function(event){
            X = event.changedTouches[0].pageX;                          //记录当前触控点横坐标
            if($this.expansion){                                       //判断是否展开，如果展开则收起
              $this.expansion.className = "";
            }
            if(X - x > 10){                                             //右滑
              this.className = "";                                    //右滑收起
            }
            if(x - X > 10){                                             //左滑
              this.className = "swipeleft";                           //左滑展开
              $this.expansion = this;
            }
          });
        }
      },1000)
      //给紧急的任务 选项框与蓝色，加以识别
      var lis = document.querySelectorAll(".unfinishList a label ")
      for (var i =0; i<lis.length; i++){
        if( lis[i].getAttribute("title") === "1"){
          lis[i].firstChild.firstChild.style.border = '1px solid #0082FF'
        }
      }
    }
  }
</script>
<style scoped>
  .iconfont{
    font-size: 25.5px;
  }
  body{
    font-size: .14rem;
  }
  li{
    list-style: none;
  }
  i{
    font-style: normal;
  }
  a{
    color: #393939;
    text-decoration: none;
  }
  .default img{
    padding-top: 30px;
    width: 10rem;
    height: 456px;
  }
  .list{
    overflow:hidden;
    margin-top:1rem;
    padding-bottom: 1rem;
    z-index: -1;
    /*padding-left:.3rem;*/
  }
  .list ul{
    float: left;
    margin-left: -1.1rem;
  }
  .list li{
    overflow: hidden;
    width: 120%;
    height: 66px;
    line-height: 66px;
  }
  .complete{
    text-decoration: line-through;
  }
  .complete .taskTitle{
    color: #C0C0C0;
    /*color: red;*/
  }
  .btn_complete .iconfont{
    font-size: 20px;
  }
  .list li a{
    display: block;
    -webkit-transition: all 0.3s;
    transition:all 0.3s;
    position: relative;
    width: 10rem;
  }
  .list li i{
    position: absolute;
    right: -16%;
    width: 15%;
    text-align: center;
    background: #E2421B;
    color: #fff;
  }
  .swipeleft{
    transform: translateX(-15%);
    -webkit-transform: translateX(-15%);
  }
  .task{
    position: absolute;
    top: 0;
    bottom: 1rem;
    left: 0;
    right: 0;
    font-family: PingFangSC-Semibold, sans-serif;
    max-width: 405px;
    margin: 0 auto;
  }
  .header{
    position: fixed;
    width: 9.4rem;
    height: 1rem;
    line-height: 1rem;
    padding-left: 0.3rem;
    padding-right: 0.3rem;
    padding-bottom: 4px;
    text-align: center;
    font-size: 18px;
    background: white;
    border-bottom: 1px solid #f3f3f3;
    box-shadow: 0px 1px 1px #f7f7f714;
  }
  .task_title{
    font-size: 24px;
  }
  .header div{
    display: inline-block;
  }
  .header button{
    border: 0;
    background: white;
  }
  .completeness{
    float: left;
  }
  .more{
    float: right;
  }
  .btn_more{
    font-size: 25px;
  }
  .taskCheck{
    padding-left: 21px;
    padding-right: 15px;
    /*height: 66px;*/
    /*line-height: 66px;*/
  }
  .taskTitle{
    font-size: 20px;
    color: #242921;
  }
  .taskTime{
    float: right;
    font-size: 14px;
    padding-right: 10px;
    color: #999999;
  }
  .taskLabel{
    position: absolute;
    font-size: 14px;
    top: 23px;
    left: 58px;
    height: 16px;
    color: #c0c0c0;
  }
  .add{
    position: fixed;
    right: 1.2rem;
    bottom: 2rem;
    font-size: 30px;
  }
  .add button{
    border: 0;
    background: #fff;
    color: #0082ff;
    font-size: 45px;
  }
  .add span{
    border: 0;
    padding: 0;
    border-radius: 50%;
    text-shadow: 0px 1px 1px #999999;
  }
  .barrier{
    background: #ffffff;
    position: absolute;
    top: 0;
    bottom: -1rem;
    left: 0;
    right: 0;
  }
  .settingBarrier{
    background: rgba(192,192,192,0.2);
    position: absolute;
    top: 0;
    bottom:0;
    left: 0;
    right: 0;
    z-index: 10;
  }
  .event_input{
    position: absolute;
    top: 20px;
    width: 9.4rem;
    padding: 0 0.3rem 0 0.3rem;
    z-index: 999;
    font-size: 20px;
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
  .label_input{
    position: absolute;
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
  }
  .time .iconfont{
    font-size: 18px;
  }
  .elDate{
    position: absolute;
    top: 71px;
    left: -300px;
  }
   .page-datetime .page-datetime-wrapper{
    position: absolute;
    top: 112px;
    left: -300px;
    display: flex;
    justify-content: flex-start;
  }
  .page-datetime span{
    font-size: 10px;
  }
  .timeLength{
    position: absolute;
    top: 420px;
    left: -300px;
    display: flex;
    justify-content: flex-start;
  }
  .moreSetting{
    position: absolute;
    width: 5rem;
    background: white;
    right: 0;
    top:1rem;
    font-size: 16px;
    z-index:999;
    overflow: auto;
  }
  .moreSetting :first-child{
    margin-top: 14px;
  }
  .moreSetting div{
    float: left;
    margin-left: 14px;
    margin-bottom: 14px;
  }
</style>
