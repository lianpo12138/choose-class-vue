<template>
  <div>
    <div class="d1">
      <b>2021-2022 学年 第 2 学期 教学周历</b>
      <Select v-model="model1" class="s1">
        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <DatePicker v-if="this.$store.state.user=='admin'" type="daterange" placement="bottom-end" split-panels
                  placeholder="设置该学期的开学日期和结束日期" class="d3"></DatePicker>
      <Button type="info" @click="test" v-if="this.$store.state.user=='admin'">确定设置</Button>
    </div>
    <div class="d2">

    </div>
    <Table :row-class-name="rowClassname" border :columns="columns" :data="data" :span-method="handSpan">
    </Table>

  </div>
</template>
<script>
  export default {
    name: "Uniform",
    data() {
      return {
        cityList: [
          {
            value: '2021-2022-1',
            label: '2021-2022-1'
          },
          {
            value: '2020-2021-2',
            label: '2020-2021-2'
          },
          {
            value: '2020-2021-1',
            label: '2020-2021-1'
          },
          {
            value: '2019-2020-1',
            label: '2019-2020-1'
          },
          {
            value: '2018-2019-2',
            label: '2018-2019-2'
          }
        ],
        columns: [
          {
            title: '月份',
            width: 100,
            align: 'center',
            key: 'month',

          }, {
            title: '周次 ',
            width: 100,
            align: 'center',
            key: 'date',

          },
          {
            title: '星期',
            align: "center",
            children: [
              {
                title: '一',
                key: 'monday'
              }, {
                title: '二',
                key: 'tuesday'
              }, {
                title: '三',
                key: 'wednesday'
              }, {
                title: '四',
                key: 'thursday'
              }, {
                title: '五',
                key: 'friday'
              }, {
                title: '六',
                key: 'saturday',
                className: 'demo-table-info-column'
              },
              {
                title: '日',
                key: 'sunday',
                className: 'demo-table-info-column'
              }
            ]
          },
          {
            title: '说明',
            align: "center",
            className: 'ins',
            key: 'instrotion'


          }

        ],
        data: [],
        model1: '2021-2022-1',
        begin: new Date(2022, 1, 17),
        end: new Date(),
        monthmerge: [0]
      }
    },
    methods: {
      test() {
        console.log(this.monthmerge)
      },
      /* http://tool.bitefu.net/jiari/?d=2022-02&apikey=123465&info=2 免费查询节假日的接口
      *  文档地址  https://www.kancloud.cn/xiaoggvip/holiday_free/1606802*/
      rowClassname(row, index) {
        // console.log(index)
        // if (index == 1) {
        //   return 'demo-table-info-row';
        //   console.log("进入了rowclassname方法")
        // } else if (index == 3) {
        //   return 'demo-table-error-row';
        // }
        // return '';
      },

      /* 合并单元格的方法*/
      handSpan({row, column, rowIndex, columnIndex}) {
        for (let i = 0; i < this.monthmerge.length; i++) {
          if (rowIndex == this.monthmerge[i] && columnIndex == 0) {
            return [this.monthmerge[i + 1] - this.monthmerge[i], 1]
          } else if (rowIndex > this.monthmerge[i] && rowIndex < this.monthmerge[i + 1] && columnIndex == 0) {
            return [0, 0]
          }
        }
        if (columnIndex == 9 && rowIndex == 0) {
          return [this.data.length, 1]
        }
      }
    },
    computed: {},
    mounted() {
      let d = this.begin.getDay();
      let s = this.begin;
      let month = "";
      let monday = "";
      let tuesday = "";
      let wednesday = "";
      let thursday = "";
      let friday = "";
      let saturday = "";
      let sunday = "";
      let cellClassName = {
        month: "",
        monday: "",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: "",
        saturday: "",
        sunday: "",
      }
      for (let i = 0; i < 22; i++) {
        if (i != 0) {
          d = 1;
        }
        switch (d) {
          case 1:
            monday = s.getMonth() + 1 + "月" + s.getDate() + "日";
            s.setDate(s.getDate() + 1);
          case 2:
            tuesday = s.getMonth() + 1 + "月" + s.getDate() + "日";
            s.setDate(s.getDate() + 1);
          case 3:
            wednesday = s.getMonth() + 1 + "月" + s.getDate() + "日";
            s.setDate(s.getDate() + 1);
          case 4:
            thursday = s.getMonth() + 1 + "月" + s.getDate() + "日";
            s.setDate(s.getDate() + 1);
          case 5:
            friday = s.getMonth() + 1 + "月" + s.getDate() + "日";
            s.setDate(s.getDate() + 1);
          case 6:
            saturday = s.getMonth() + 1 + "月" + s.getDate() + "日";
            s.setDate(s.getDate() + 1);
          case 7:
            sunday = s.getMonth() + 1 + "月" + s.getDate() + "日";
            s.setDate(s.getDate() + 1);
            month = s.getMonth() + 1;
        }

        this.data.push({
          date: i + 1,
          month: month,
          monday: monday,
          tuesday: tuesday,
          wednesday: wednesday,
          thursday: thursday,
          friday: friday,
          saturday: saturday,
          sunday: sunday,
          cellClassName: cellClassName
        })
      }
      let n = 1;
      for (let i = 1; i < this.data.length - 1; i++) {
        if (this.data[i].monday.substr(0, 1) == this.data[i + 1].monday.substr(0, 1)) {
          n++;
        } else {
          this.monthmerge.push(++n);
        }
      }
      this.monthmerge.push(this.data.length)
      this.data[0].instrotion = '1.2022年2月17日开学，2月18日正式上课。2.2月19-20日期初补(缓)考。3.第11周举行期中考试。4.2022年6月24日-7月3日举行期末考试，7月4日开始放假。';


      console.log(this.data)

    }
  }
</script>
<style scoped>
  .d1 {
    text-align: center;
    font-size: 21px;
    margin-bottom: 10px;
  }

  .d2 {
    text-align: center;
    margin-bottom: 20px
  }

  .s1 {
    margin-left: 10px;
    width: 200px;
  }

  .d3 {
    width: 300px;
    margin-left: 20px;
    font-size: medium;
  }

  >>> .ivu-table td.demo-table-info-column {
    color: red;
  }

  >>> .ivu-table th {
    font-size: 15px;
  }

  >>> .ivu-table td.ins {
    font-size: large
  }

  >>> .ivu-table .color1 {
    background-color: #187;
    color: #fff;
  }

  >>> .ivu-table .color1 {
    background-color: #ff6600;
    color: #fff;
  }

  >>> .ivu-table .color1 {
    background-color: #2db7f5;
    color: #fff;
  }


</style>
