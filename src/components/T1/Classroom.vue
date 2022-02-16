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
    <Table border :columns="columns" :data="listdata"></Table>
    <br>
    <Page :total="page.total"
          :current="page.pageNum"
          :page-size="page.pageSize"
          @on-change="pNumChange"
          @on-page-size-change="pSizeChange"
          show-sizer
          show-elevator
          show-total/>
  </div>
</template>

<script>
  export default {
    name: "Classroom",
    data() {
      /* 为了可以在filter中调用this的属性*/
      let that = this;
      return {
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
                return ;
              }
            }
          }, {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.show(params.index)
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
        query: '',
        page: {
          total: 0,
          pageSize: 10,
          pageNum: 1
        },
        select3: 'tian'
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
      show(index) {
        this.$Modal.info({
          title: 'User Info',
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
