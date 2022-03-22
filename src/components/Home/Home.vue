<template>
  <div class="bg">
    <h2 style="font-size: 24px">
      公告
    </h2>
    <div class="int">
      <ol>
        选课须知：<br>
        <li>1. 学生根据学分需求选课，确定以后不能更改；</li>
        <li>2. 一起登录的时候可能会有短暂的中断，稍等片刻就好。</li>
      </ol>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'Home'
  }
</script>

<style scoped>
  .int {
    font-size: 20px;
  }
  .bg {
    background-image: url("../../assets/b1.jpeg");
    position: fixed;
    /*top: 0;*/
    /*left: 0;*/
    width: 85%;
    height: 85%;
    min-width: 800px;
    background-size: cover;
    -webkit-background-size: cover;
    -o-background-size: cover;
    background-position: center 0;
    text-align: center;
    padding-top: 50px;
  }
  h2{
    position: center;
  }
</style>
