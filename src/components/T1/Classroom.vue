<template>
  <div>
    <Input search
           enter-button="搜索"
           v-model="query"
           size="large"
           @on-search="search()"
           placeholder="教室名/教室功能/所在教学楼/校区">
      <span slot="prepend">输入</span>
    </Input>
    <br>
    <Table stripe border :columns="columns" :data="listdata"></Table>
    <br>
    <Page :total="page.total"
          :current="page.pageNum"
          :page-size="page.pageSize"
          @on-change="pNumChange"
          @on-page-size-change="pSizeChange"
          show-sizer
          show-elevator
          show-total/>
    <Modal v-model="modal" width="1200" :title="rowname">
      <div>
        <DatePicker type="date" @on-change="changedate" placeholder="选择日期" style="width: 200px"></DatePicker>
        <a>{{date}}传到后台计算，返回某学期第几周</a>
        <Table border stripe :columns="section" :data="classdata"></Table>
      </div>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: "Classroom",
    data() {
      /* 为了可以在filter中调用this的属性*/
      let that = this;
      return {
        date: new Date(),
        modal: false,
        rowname: '',
        columns: [
          {
            title: '教室编号',
            key: 'classroomId'
          },
          {
            title: '教室名称',
            key: 'name'
          },
          {
            title: '教室功能',
            key: 'function'
          },
          {
            title: '所在教学楼',
            key: 'building',
            filters: [],
            filterMultiple: false,
            filterRemote(value, row) {
              this.query = value.toString();
              this.page.pageNum = 1;
              this.page.pageSize = 40;
              this.search();

            }
          },
          {
            title: '校区',
            key: 'origin',
            filters: [
              {
                label: '东校区',
                value: 1
              },
              {
                label: '西校区',
                value: 2
              }
            ],
            filterMultiple: false,
            filterMethod(value, row) {
              if (value === 1) {
                return row;
              } else if (value === 2) {
                that.page.total = 0;
                return;
              }
            }
          },
          {
            title: '容纳人数',
            key: 'capacity'
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {

              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.modal = true;
                      this.rowname = params.row.name
                      console.log(this.rowname)
                    }
                  }
                }, '查看'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                }, '编辑  ')
              ]);
            }
          }
        ],
        listdata: [],
        section: [
          {
            title: '节次 \/ 星期',
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
        classdata: [
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
        ],
        query: '',
        page: {
          total: 0,
          pageSize: 10,
          pageNum: 1
        },
      };
    },
    methods: {

      /* 修改当前页事件*/
      pNumChange(i) {
        this.page.pageNum = i;
        this.search();
      },
      /* 修改当前条数*/
      pSizeChange(i) {
        this.page.pageSize = i;
        this.search();
      },
      /* 查询教室*/
      search() {
        /* 获取数据*/
        this.$axios.get("/classroom/list", {
          params: {
            query: this.query,
            pageNum: this.page.pageNum,
            pageSize: this.page.pageSize
          }
        }).then(rep => {
          if (!rep.data.success) {
            return this.$Message.error(rep.data.message)
          }
          this.page.total = rep.data.content.total;
          this.listdata = rep.data.content.list;
        });
      },
      /* 选择日期方法*/
      changedate(date) {
        this.date = date;
        console.log(date)
      },
      show(index) {
        this.$Modal.confirm({
          render: function (createElement) {
            return createElement('div');
          }
        })
      },
      remove(index) {
        this.data.splice(index, 1);
      }
    },
    mounted: function () {
      /* 获取教学楼集合*/
      this.$axios.get("/classroom/buildings")
        .then(rep => {
          for (let i = 0; i < rep.data.length; i++) {
            this.columns[3].filters.push(
              {
                label: rep.data[i],
                value: rep.data[i]
              })
          }
        });
      /* 获取数据*/
      this.search();
    }
  };
</script>

<style scoped>


</style>
