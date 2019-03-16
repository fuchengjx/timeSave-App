<template>
  <div>
    <div class="header">
      校历表
    </div>
    <img src="../../assets/images/schoolCalendar.png"/>
  </div>
</template>

<script>
  export default {
    name: "schoolCalendar"
  }
</script>

<style scoped>
  .header{
    font-size: 24px;
    text-align: center;
    font-family: PingFangSC-Semibold, sans-serif;
    height: 1rem;
    line-height: 1rem;
    padding-bottom: 4px;
    border-bottom: 1px solid #f3f3f3;
    box-shadow: 0px 1px 1px #f7f7f714;
  }
  .header span{
    padding-left: 17px;
    float: left;
  }
   img{
     padding-top: 0.7rem;
    display: block;
    margin: 0 auto;
  }
</style>
