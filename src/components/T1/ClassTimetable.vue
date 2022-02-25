<template>
  <div>
      <div style="color:skyblue;font-size: large">
        <span>{{nowWeek}}</span>
        <span>{{nowDate}}</span>
        <span>{{nowTime}}</span>
      </div>
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
            align: 'center',
            width: 150,
            render: (h, params) => {
              console.log(this.nowWeek)
              let Num = ["一", "二", "三", "四", "五", "六"];
              let time = ["08:00-09:40", "10:00-11:40", "14:20-16:00", "16:20-18:00", "19:30-21:10","21:20-23:00"];
              let s = (2 * params.index + 1);
              let p1 = "第" + Num[params.index] + "大节";
              let p2 = "（"+s+","+(s+1)+ "小节）";
              let p3 = time[params.index];

              return h('div',{},
                [h('br',{},),h('p',{},p1),h('p',{},p2),h('p',{},p3),h('br',{},),]
              );
            }
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
        data: [{},{},{},{},{},{}]
      }
    },
    created() {
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
