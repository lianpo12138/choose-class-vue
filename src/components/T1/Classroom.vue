<template>
  <div>
    <Input class="i" search v-model="query" @on-search="search()" placeholder="请输入教室名"></Input>

    <span  v-if="this.$store.state.user=='admin'">
      <Upload class="i"  action="http://localhost:9000/user/import"
              headers="Content-Type: multipart/form-data"
              show-upload-list="false"
              name="file"
              accept="application/vnd.ms-excel">


      <Button icon="ios-cloud-upload-outline">批量教室导入</Button>
      </Upload>
      <a @click="downloadTemplete">下载导入模板</a>
    </span>
    <Table class="t" stripe border :columns="columns" :data="listdata"></Table>
    <br/>
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
    <Drawer
      placement="left"
      title="编辑"
      v-model="value3"
      width="600"
      :mask-closable="false"
      :styles="styles"
    >
      <Form :model="formData">
        <Row :gutter="32">
          <Col span="12">
            <FormItem label="编号" label-position="top">
              <Input v-model="formData.classroomId" disabled/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="教室名称" label-position="top">
              <Input v-model="formData.name">
              </Input>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="32">
          <Col span="12">
            <FormItem label="所在教学楼" label-position="top">
              <Select v-model="formData.building">
                <Option v-for="item in buildings " :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="教室功能" label-position="left">
              <Input v-model="formData.function"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="32">
          <Col span="12">
            <FormItem label="校区" label-position="left">
              <Select v-model="formData.origin">
                <Option value="东校区">东区</Option>
                <Option value="西校区">西区</Option>
              </Select>
            </FormItem>
          </Col>
          <Col>
            <FormItem label="容纳人数" label-position="top">
              <InputNumber v-model="formData.capacity" controls-outside></InputNumber>
            </FormItem>
          </Col>
        </Row>

      </Form>
      <div class="demo-drawer-footer">
        <Button style="margin-right: 8px" @click="value3 = false">取消</Button>
        <Button type="primary" @click="updateClassroom">确认修改</Button>
      </div>
    </Drawer>
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
                      console.log(params.row);
                      this.formData = params.row
                      this.value3 = true
                    }
                  }
                }, '编辑')
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
          }, {
            time: '第九节（19:00-19:45）'
          }, {
            time: '第十节（19:55-20:40）'
          }
        ],
        query: '',
        page: {
          total: 0,
          pageSize: 10,
          pageNum: 1
        },
        value3: false,
        styles: {
          height: 'calc(100% - 55px)',
          overflow: 'auto',
          paddingBottom: '53px',
          position: 'static'
        },
        formData: {
          building: "",
          capacity: 0,
          classroomId: "",
          function: "",
          name: "",
          origin: ""
        },
        buildings: [],
        isShow: false
      };
    },
    methods: {
      /* 下载模板*/
      downloadTemplete() {
        console.log(this.$axios.defaults.baseURL + "/disPic/template/classroomTemplate.xls");
        this.$axios.get("disPic/template/classroomTemplate.xls")
        window.location.href = this.$axios.defaults.baseURL + "/disPic/template/classroomTemplate.xls";
        // window.open("http://localhost:90/img/temp/classroomTemplate.xls");
      },
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
      },
      updateClassroom() {
        this.value3 = false;
        this.$Message.success("修改成功！")
      },
      //批量导入用户方法
      getFile(event) {
        console.log(event);

      //   this.file = event.target.files[0];
      //   var url = axios.defaults.baseURL;
      //   event.preventDefault();
      //   let formData = new FormData();
      //   formData.append('file', this.file);
      //   var vm = this;
      //   let config = {
      //     headers: {
      //       'Content-Type': 'multipart/form-data'
      //     }
      //   }
      //   axios.post(vm.apiUrl + '/upload',formData, config).then(function(res) {
      //     vm.$Notice.open({
      //       title: '导入成功',
      //       duration: 2
      //
      //     });
      //     vm.queryUsers();
      //     if (res.status === 2000) {
      //       /*这里做处理*/
      //     }
      //   })
      },

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
          this.buildings = this.columns[3].filters
        });
      /* 获取数据*/
      this.search();
    }
  };
</script>

<style scoped>
  .i {
    display: inline-block;
    width: auto;
    margin-right: 15px;
  }
  .t{
    margin-top: 10px;
  }

  .demo-drawer-footer {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    border-top: 1px solid #e8e8e8;
    padding: 10px 16px;
    text-align: right;
    background: #fff;
  }

</style>
