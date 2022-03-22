<template>
  <div>
    <i-circle
      style="position:relative ;left: 40%;"
      :size="250"
      :trail-width="4"
      :stroke-width="5"
      :percent="60.5"
      stroke-linecap="square"
      stroke-color="#43a3fb">
      <div class="demo-Circle-custom">
        <h1>2482/4100</h1>
        <p>已选人数</p>
        <span>
                占总人数
                <i>60.5%</i>
            </span>
      </div>
    </i-circle>
    <br>
    <b>1801</b><Progress :percent="25" :stroke-width="20" text-inside />
    <b>1802</b><Progress :percent="45" :stroke-width="20" status="active" text-inside />
    <b>1803</b><Progress :percent="65" :stroke-width="20" status="wrong" text-inside />
    <b>1804</b><Progress :percent="100" :stroke-width="20" text-inside />
  </div>

</template>

<script>
    export default {
        name: "Degree"
    }
</script>

<style lang="less">
  .demo-Circle-custom{
    & h1{
      color: #3f414d;
      font-size: 28px;
      font-weight: normal;
    }
    & p{
      color: #657180;
      font-size: 14px;
      margin: 10px 0 15px;
    }
    & span{
      display: block;
      padding-top: 15px;
      color: #657180;
      font-size: 14px;
      &:before{
        content: '';
        display: block;
        width: 50px;
        height: 1px;
        margin: 0 auto;
        background: #e0e3e6;
        position: relative;
        top: -15px;
      };
    }
    & span i{
      font-style: normal;
      color: #3f414d;
    }
  }
</style>
