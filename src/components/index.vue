<template>
  <div>
    <!--<component :is="tab[index]"></component>-->

    <!--<router-view name="task"></router-view>-->
    <router-view />
    <div class="footer">
      <div class="task">
        <button class="btn_task"><router-link to="/Task"><span ref="taskFont" class="iconfont">&#xe83d;</span></router-link></button>
      </div>
      <div class="note">
        <button class="btn_note"><router-link to="/Calendar"><span ref="noteFont" class="iconfont">&#xe807;</span></router-link></button>
      </div>
      <div class="mine">
          <button class="btn_mine"><router-link to="/Mine"><span ref="mineFont" class="iconfont">&#xe608;</span></router-link></button>
      </div>
    </div>
  </div>
</template>

<script>
  // import task from '../components/Task/task'
  // import mine from '../components/User/mine'
  // import SchoolCalendar from "./Calendar/schoolCalendar"
  export default {
    name: 'index',
    // components: {
    //   SchoolCalendar,
    //   login,
    //   task,
    //   mine
    // },
    data () {
      return{
        // tab:["task", "SchoolCalendar", "mine"],
        index: 0,
        token : localStorage.jwtToken,
      }
    },
    methods: {
      todoSomething () {
        if (this.token) {
          this.axios({
            method: 'get',
            url: '/api/task/list',
            headers: {
              Authorization: this.token
            }
          })
        } else {
          this.$router.push({path: '/User/login'})
        }
      },
      // changetaskFont () {
      //   this.index = 0
      //   // this.$refs.taskFont.innerHTML = '&#xe630'
      //   // this.$refs.noteFont.innerHTML = '&#xe807'
      //   // this.$refs.mineFont.innerHTML = '&#xe608'
      // },
      // changenoteFont () {
      //   this.index =1
      //   // this.$refs.taskFont.innerHTML = '&#xe83d'
      //   // this.$refs.noteFont.innerHTML = '&#xe808'
      //   // this.$refs.mineFont.innerHTML = '&#xe608'
      // },
      // changemineFont () {
      //   this.index = 2
      //   // this.$refs.taskFont.innerHTML = '&#xe83d'
      //   // this.$refs.noteFont.innerHTML = '&#xe807'
      //   // this.$refs.mineFont.innerHTML = '&#xe62a'
      // }
    },
    mounted () {
      this.todoSomething()
    }
  }
</script>
<style scoped>
  .router-link-active .iconfont{
    color: #353434;
  }
  .iconfont{
    font-size: 25px;
    color: #c1d8ea;
  }
  .footer{
    border-top: 1px solid #f3f3f3;
    box-shadow: 0px -1px 1px #f7f7f714;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 10rem;
    height: 1.3rem;
    line-height: 1.3rem;
    z-index: 10;
    background: white;
    max-width: 540px;
    margin: 0 auto;
  }
  .footer div{
    float: left;
    width: 3.33rem;
  }
  .footer div button{
    height: 1.3rem;
    line-height: 1.3rem;
    display: block;
    width: 1rem;
    margin: 0 auto;
    border: 0;
    background: #FFFFFF;
  }

</style>
