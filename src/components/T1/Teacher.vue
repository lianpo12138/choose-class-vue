<template>
  <div>

    <Select class="i" v-model="acedemicTitle" clearable @on-change="getTeachersByAcade" style="width:200px"
            placeholder="根据职称筛选">
      <Option v-for="item in acadeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>
    <Input class="i" search placeholder="根据工号查询" @on-search="getTeachers" v-model="loginName"/>
    <Input class="i" search placeholder="根据姓名查询" @on-search="getTeachers" v-model="name"/>
    <Table class="t" border :columns="columns" :data="data">
      <template slot-scope="{ row, index }" slot="action">
        <Poptip title="确认是否重置密码！"
                @on-ok="resetPassword(row)"
                confirm transfer>
          <Button type="primary" size="small" @click="">重置密码</Button>
        </Poptip>
        <Poptip title="确认删除该老师!"
                @on-ok="remove(index)"
                confirm transfer>
          <Button type="error" size="small">删除老师</Button>
        </Poptip>

      </template>
    </Table>
    <Page show-total show-elevator show-sizer
          @on-change="pNumChange"
          @on-page-size-change="pSizeChange"
          :current="pageNum"
          :page-size="pageSize"
          :total="total"/>
  </div>

</template>

<script>
  export default {
    name: "Teacher",
    data() {
      return {
        columns: [
          {
            title: '编号',
            key: 'id'
          },
          {
            title: '工号',
            key: 'loginname'
          },
          {
            title: '姓名',
            key: 'realname'
          }, {
            title: '职称',
            key: 'academicTitle'
          }, {
            title: '电话',
            key: 'phone'
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
        acadeList: [],
        loginName: '',
        name: '',
        acedemicTitle: '',
        total: 0,
        pageSize: 10,
        pageNum: 1
      };
    },
    methods: {
      pNumChange(i) {
        this.pageNum = i;
        this.getTeachers();
      },
      pSizeChange(i) {
        this.pageSize = i;
        this.getTeachers();
      },
      getAcade() {
        this.$axios.get("/teacher/listacade").then(rep => {
          rep.data.forEach(i => {
            this.acadeList.push({
                label: i,
                value: i
              }
            )
          })

        })
      },
      getTeachers() {
        this.$axios.get("/teacher/list", {
          params: {
            loginName: this.loginName,
            name: this.name,
            acedemicTitle: this.acedemicTitle,
            pageNum: this.pageNum,
            pageSize: this.pageSize
          }
        }).then(rep => {
          this.data = rep.data.content.list
          this.total = rep.data.content.total
        });
      },
      getTeachersByAcade(i) {
        this.acedemicTitle = i == undefined ? "" : i;
        this.getTeachers();
      },
      resetPassword(row) {
        this.$axios.post("/user/changePassword", {
          id: row.id,
          role: "teacher",
          newPassword: row.loginname
        }).then(rep=>{
          console.log(rep)
          if (rep.data.success == true) {
            this.$Message.success(row.realname+"老师的密码已经重置！")
          }
        });
        console.log(row)

      },
      remove(index) {
        this.data.splice(index, 1);
      }

    },
    mounted() {

      this.getAcade();
      this.getTeachers();
    }
  }

</script>

<style scoped>
  .i {
    display: inline-block;
    margin-right: 15px;
    width: auto
  }

  .t {
    margin-top: 15px;
  }
</style>
