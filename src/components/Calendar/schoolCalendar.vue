<template>
  <div class="wCalendar">
    <div class="header">
      校历表
    </div>
    <div class="calendar">
      <div class="calendarHeader">
        <div class="headerPre" @click="handlePre">

        </div>
        <div class="headerTitle">
          {{selectYear}}年{{selectMonth}}月{{selectDate}}日
        </div>
        <div class="headerNext" @click="handleNext">

        </div>
      </div>
      <div class="calendarMain">
        <div class="mainHead" v-for="(item, index) in calendarHeader" :key="index">
          {{item}}
        </div>

        <div class="mainBlock"
             v-for="(item, index) in displayDaysPreMonth(selectYear, selectMonth-1)"
             @click="handleDayClick(item)"
             :key="item.type + item.content + `${index}` ">
          <br>
          {{item.content}}
        </div>
        <!--<div :class="`main__block ${item.content === selectedDate && 'main__block-today'}`"-->
             <!--@click="handleDayClick(item)" v-for="(item, index) in displayDaysPerMonth(selectedYear, selectedMonth)" :key="item.type + item.content + `${index}`">-->
          <!--{{item.content}}-->
        <!--</div>-->
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "schoolCalendar",
    data() {
      return {
        calendarHeader: ["日", "一", "二", "三", "四", "五", "六"],
        selectYear: new Date().getFullYear(),
        selectMonth: new Date().getMonth() + 1,
        selectDate: new Date().getDate()
      }
    },
    methods: {
        handleDayClick(event) {
            console.log(event)
        },
        displayDaysPreMonth(year, month) {
          //定义每个月的天数，如果是闰年第二月改为29天
          let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
          if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
            daysInMonth[1] = 29;
          }
          let targetDay = new Date(year, month, 1).getDay();
          let total_calendar_list = [];
          let preNum = targetDay;
          let nextNum = 0;
          if (targetDay > 0) {
            for (let i = 0; i < preNum; i++) {
              let obj = {
                type: "pre",
                content: ""
              };
              total_calendar_list.push(obj);
            }
          }
          for (let i = 0; i < daysInMonth[month]; i++) {
            let obj = {
              type: "normal",
              content: i + 1
            };
            total_calendar_list.push(obj);
          }
          nextNum = 6 - new Date(year, month+1, 0).getDay()

          for (let i = 0; i < nextNum; i++) {
            let obj = {
              type: "next",
              content: ""
            };
            total_calendar_list.push(obj);
          }
          return total_calendar_list;
        },
      handlePre() {
        if (this.selectMonth === 1) {
          this.selectYear = this.selectYear - 1
          this.selectMonth = 12
          this.selectDate = 1
        } else {
          this.selectMonth = this.selectMonth - 1
          this.selectDate = 1
        }
      },
      handleNext() {
        if (this.selectMonth === 12) {
          this.selectYear = this.selectYear + 1
          this.selectMonth = 1
          this.selectDate = 1
        } else {
          this.selectMonth = this.selectMonth + 1
          this.selectDate = 1
        }
      }
    },
    mounted() {

    }
  }
</script>

<style lang="stylus" scoped>
  .wCalendar
    width 100%
    max-width 420px
    margin 0 auto
   .header
     height 1rem
     padding-bottom 4px
     border-bottom: 1px solid #f3f3f3
     box-shadow 0px 1px 1px #f7f7f714
     font-size 24px
     text-align center
     font-family PingFangSC-Semibold, sans-serif
     line-height 1rem
   .calendar
     flex-shrink 0
     width 90%
     max-width 90%
     display flex
     flex-direction column
     align-items center
     margin 15px auto 20px auto
     border-radius 4px
     background white
     box-shadow 0 0 10px rgba(208,208,208,0.5)
     .calendarHeader
       width 80%
       color #2c3135
       font-size 16px
       display flex
       align-items center
       justify-content space-between
       padding-top 20px
       .headerTitle
        font-size 18px
        letter-spacing 1px
       .headerPre
         height 12px
         width 12px
         position relative
         &:after {
           content: " "
           display inline-block
           height 9px
           width 9px
           border-width 2px 2px 0 0
           border-color #c8c8cd
           border-style solid
           transform matrix(0.71, 0.71, -0.71, 0.71, 0, 0) rotate(180deg)
           position absolute
           top 50%
           margin-top -4px
           right 2px
         }
       .headerNext
         height 12px
         width 12px
         position relative
         &:after {
           content " "
           display inline-block
           height 9px
           width 9px
           border-width 2px 2px 0 0
           border-color #c8c8cd
           border-style solid
           transform matrix(0.71, 0.71, -0.71, 0.71, 0, 0)
           position absolute
           top 50%
           margin-top -4px
           right 2px
         }
      .calendarMain
         width 80%
         max-width 80%
         display flex
         justify-content space-around
         flex-wrap wrap
         padding-top 19px
         padding-bottom 25px
      .mainHead
        display flex
        justify-content center
        align-items center
        margin-top 20px
        margin-bottom 5px
        border-radius 2px
        font-size 12px
        color #7f8fa4
        background-color #fff
        flex-shrink 0
        width 14%
        max-width 14%
        height 14%
        max-height 14%
      .mainBlock
        display flex
        align-items center
        justify-content center
        width 14%
        max-width 14%
        height 14%
        max-height 14%
        padding-bottom 10px
        flex-shrink 0
        box-shadow 0
        position relative
        font-size 18px
     .mainBlock:hover
       transition 0.5s all
       background-color #f93d3a
       color #fff
       box-shadow 0 2px 6px rgba(171, 171, 171, 0.5)
     .blockToday
        transition 0.5s all
        background-color #f93d3a
        color #fff
        box-shadow 0 2px 6px rgba(171, 171, 171, 0.5)
</style>
