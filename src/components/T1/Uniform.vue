<template>
  <div>
    <div class="d1">
      <b>{{term.split("-")[0]}}- {{term.split("-")[1]}}学年 第 {{term.split("-")[2]}} 学期 教学周历</b>
      <Select v-model="term" class="s1" @on-change="chooseTerm">
        <Option v-for="item in termList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
    </div>
    <div class="d2">

    </div>
    <Table border :columns="columns" :data="data" :span-method="handSpan">
    </Table>
  </div>
</template>
<script>
  export default {
    name: "Uniform",
    data() {
      return {
        term: '',
        termList: [],
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
        begin: new Date(),
        end: new Date(),
        monthmerge: [0],
        periodList: []
      }
    },
    methods: {
      /* http://tool.bitefu.net/jiari/?d=2022-02&apikey=123465&info=2 免费查询节假日的接口
      *  文档地址  https://www.kancloud.cn/xiaoggvip/holiday_free/1606802*/
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
      },
      /* 生成日历数据，包括样式*/
      generateData(){
        /* 生成月份数据，以及改变样式*/
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
          })
        }
        let n = 1;
        /* 将合并单元格的数据重置*/
        this.monthmerge = [0];
        for (let i = 1; i < this.data.length - 1; i++) {
          if (this.data[i].monday.split("月")[0] == this.data[i + 1].monday.split("月")[0]) {
            n++;
          } else {
            this.monthmerge.push(++n);
          }
        }
        this.monthmerge.push(this.data.length)

        this.data[0].instrotion = '1.2022年2月17日开学，2月18日正式上课。2.2月19-20日期初补(缓)考。3.第11周举行期中考试。4.2022年6月24日-7月3日举行期末考试，7月4日开始放假。';

        for (let i = 0; i < this.data.length; i++) {
          this.data[i].cellClassName={
            monday:this.data[i].monday.split("月")[0]%2?'color1':'color2',
            tuesday: this.data[i].tuesday.split("月")[0]%2?'color1':'color2',
            wednesday: this.data[i].wednesday.split("月")[0]%2?'color1':'color2',
            thursday: this.data[i].thursday.split("月")[0]%2?'color1':'color2',
            friday: this.data[i].friday.split("月")[0]%2?'color1':'color2',
            saturday: this.data[i].saturday.split("月")[0]%2?'color1':'color2',
            sunday: this.data[i].sunday.split("月")[0]%2?'color1':'color2',
            date:this.data[i].monday.split("月")[0]%2?'color1':'color2',
            month:this.data[i].sunday.split("月")[0]%2?'color1':'color2'
          }
        }
      },
      /* 获取所有的学期信息集合*/
      getPeriod() {
        this.$axios.get("user/term").then(resp=>{


          this.periodList=resp.data.content
          this.periodList.forEach(item => {
              this.termList.push({
                value:item.term,
                label:item.term,
              });
          });

          this.term=this.periodList[this.periodList.length-1].term


        });
      },
      /* 选择其他学期调用的方法*/
      chooseTerm() {
        let remark = "";
        console.log(this.term)
        console.log(this.periodList)
        this.periodList.forEach(it=>{
          if (it.term == this.term) {

            this.begin = new Date(it.termStartDate);
            remark = it.remark;
          }
        })

        this.data = [];
        this.generateData();


      }


    },
    watch: {
      'this.term': function () {
        console.log("term变了")

      }

    },
    mounted() {
      this.getPeriod();
      this.generateData();

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

  /*>>> .ivu-table .color1 {*/
    /*background-color: #187;*/
    /*color: #fff;*/
  /*}*/

  >>> .ivu-table .color2 {
    background-color: lightpink;
  }

  >>> .ivu-table .color1 {
    background-color: lightblue;
  }


</style>
