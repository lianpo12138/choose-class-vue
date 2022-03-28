<template>
  <div>

    <Input class="i" search placeholder="根据学号查询" @on-search="getStudents" v-model="query.loginname"/>
    <Input class="i" search placeholder="根据姓名查询" @on-search="getStudents" v-model="query.name"/>
    <Upload
      class="i"
      :on-success="importStudents"
      accept="application/vnd.ms-excel"
      action="/api/user/importStudents">
      <Button icon="ios-cloud-upload-outline">批量导入学生</Button>
    </Upload>
    <a @click="downloadExcel">下载导入模板</a>
    <Table class="t" border :columns="columns" :data="data">
      <template slot-scope="{ row, index }" slot="action">
        <Poptip title="确认是否重置密码！"
                @on-ok="resetPassword(row)"
                confirm transfer>
          <Button type="primary" size="small" @click="">重置密码</Button>
        </Poptip>
        <Poptip title="确认删除该学生!"
                @on-ok="remove(index)"
                confirm transfer>
          <Button type="error" size="small">删除学生</Button>
        </Poptip>
      </template>
    </Table>
    <Page show-total show-elevator show-sizer
          @on-change="pNumChange"
          @on-page-size-change="pSizeChange"
          :current="query.pageNum"
          :page-size="query.pageSize"
          :total="total"/>
  </div>

</template>

<script>
  export default {
    name: "Student",
    data() {
      return {
        columns: [
          {
            title: '编号',
            key: 'id',
            width: 200
          },
          {
            title: '学号',
            key: 'loginname'
          },
          {
            title: '姓名',
            key: 'realname'
          }, {
            title: '密码',
            key: 'password'
          }, {
            title: '邮箱',
            key: 'email'
          },
          {
            title: '操作',
            slot: 'action',
            width: 200,
            align: 'center'
          }
        ],
        data: [],
        total: 0,
        query: {
          pageSize: 10,
          pageNum: 1,
          loginname: "",
          name: ""
        }

      };
    },
    methods: {
      downloadExcel() {
        window.location.href = this.$axios.defaults.baseURL + "/disPic/template/studentTemplate.xls";
      },
      importStudents(response, file, fileList) {
        console.log(response);
        this.$Notice.success({
            title: '添加数据通知',
            desc: response.message
          }
        );
      },
      pNumChange(i) {
        this.query.pageNum = i;
        this.getStudents();
      },
      pSizeChange(i) {
        this.query.pageSize = i;
        this.getStudents();
      },
      getStudents() {
        this.$axios.post("/student/listStudents", this.query).then(rep => {
          this.data = rep.data.content.list
          console.log(rep.data.content)
          this.total = rep.data.content.total
        })
      },
      resetPassword(row) {
        this.$axios.post("/user/changePassword", {
          id: row.id,
          role: "student",
          newPassword: row.loginname
        }).then(rep => {
          console.log(rep)
          if (rep.data.success == true) {
            this.$Message.success(row.realname + "的密码已经重置！")
          }
        });

      },
      remove(index) {
        this.data.splice(index, 1);
      }
    },
    mounted() {
      this.getStudents();
    }
  }

</script>

<style scoped>
  .i {
    display: inline-block;
    margin-right: 10px;
    width: auto

  }

  .t {
    margin-top: 15px;
  }
</style>
