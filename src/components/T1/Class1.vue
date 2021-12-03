<template>
  <div>
    <div class="query-c">
      <div>
        <span>{{nowWeek}}</span>
        <span>{{nowDate}}</span>
        <span>{{nowTime}}</span>
      </div>
    </div>
    <br>
    <Table border stripe :columns="columns" :data="data">
    </Table>
    <tr><th style="font-size: large">备注：</th><td>专业实习</td></tr>
    <br>

  </div>
</template>

<script>
  export default {
    name: 'T1',
    data() {
      return {
        timer: null,
        nowWeek: "",
        nowDate: "",
        nowTime: "",
        columns: [
          {
            title: '时间',
            key: 'time'
          }, {
            title: '周日',
            key: 'sunday'
          },
          {
            title: '周一',
            key: 'monday'
          },
          {
            title: '周二',
            key: 'tuesday'
          },
          {
            title: '周三',
            key: 'wednesday'
          }, {
            title: '周四',
            key: 'thursday'
          },
          {
            title: '周五',
            key: 'friday'
          },
          {
            title: '周六',
            key: 'saturday'
          },

        ],
        data: [
          {
            time: '第一节（8:00-8:40）'
          }, {
            time: '第二节（8:50-9:30）'
          }, {
            time: '第三节（10:00-10:40）'
          }, {
            time: '第四节（11:00-11:40）'
          }, {
            time: '第五节（14:00-14:40）'
          }, {
            time: '第六节（14:50-15:30）'
          }, {
            time: '第七节（16:00-16:40）'
          }, {
            time: '第八节（16:50-17:30）'
          }
        ]
      }
    },
    mounted() {
      var _this = this;
      this.timer = setInterval(() => {
        this.setNowTimes();
      }, 1000);
    },
    methods: {
      setNowTimes() {
        let myDate = new Date();
        // console.log(myDate)
        let wk = myDate.getDay();
        let yy = String(myDate.getFullYear());
        let mm = myDate.getMonth() + 1;
        let dd = String(
          myDate.getDate() < 10 ? "0" + myDate.getDate() : myDate.getDate()
        );
        let hou = String(
          myDate.getHours() < 10 ? "0" + myDate.getHours() : myDate.getHours()
        );
        let min = String(
          myDate.getMinutes() < 10
            ? "0" + myDate.getMinutes()
            : myDate.getMinutes()
        );
        let sec = String(
          myDate.getSeconds() < 10
            ? "0" + myDate.getSeconds()
            : myDate.getSeconds()
        );
        let weeks = [
          "星期日",
          "星期一",
          "星期二",
          "星期三",
          "星期四",
          "星期五",
          "星期六",
        ];
        let week = weeks[wk];
        this.nowDate = yy + "年" + mm + "月" + dd + "日"
        this.nowTime = hou + ":" + min + ":" + sec;
        this.nowWeek = week;
      },
    },

  }
</script>

<style scoped>

</style>
