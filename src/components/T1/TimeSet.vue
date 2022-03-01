<template>
  <div>
    <span>注意事项：设置日期的格式为  <b style="font-size: medium">2020-1-1</b>
    <p>教学周历，默认展示最新学期周历</p></span>
    <Table :columns="columns" :data="data" border>
      <template slot-scope="{ row, index }" slot="id">
        {{ row.id}}
      </template>

      <template slot-scope="{ row, index }" slot="term">
        {{ row.term }}
      </template>

      <template slot-scope="{ row, index }" slot="termStartDate">
        <Input type="text" v-model="editTermStartDate" v-if="editIndex === index"/>
        <span v-else>{{row.termStartDate }}</span>
      </template>

      <template slot-scope="{ row, index }" slot="termEndDate">
        <Input type="text" v-model="editTermEndDate" v-if="editIndex === index"/>
        <span v-else>{{ row.termEndDate }}</span>
      </template>
      <template slot-scope="{ row, index }" slot="chooseStartDate">
        <Input type="text" v-model="editChooseStartDate" v-if="editIndex === index"/>
        <span v-else>{{ row.chooseStartDate }}</span>
      </template>
      <template slot-scope="{ row, index }" slot="chooseEndDate">
        <Input type="text" v-model="editChooseEndDate" v-if="editIndex === index"/>
        <span v-else>{{ row.chooseEndDate }}</span>
      </template>
      <template slot-scope="{ row, index }" slot="remark">

        <Input v-model="editRemark" type="textarea" maxlength="100" show-word-limit :rows="4" v-if="editIndex === index" />
        <span v-else>{{ row.remark }}</span>
      </template>

      <template slot-scope="{ row, index }" slot="action">
        <div v-if="editIndex === index">
          <Poptip title="确认修改数据吗?"
                  @on-ok="handleSave(index)"
                  @on-cancel="editIndex = -1"
                  confirm transfer>
            <Button>确认</Button>
          </poptip>

        </div>
        <div v-else>
          <Button @click="handleEdit(row, index)">修改</Button>
          <Poptip title="确认删除数据吗?"
                  @on-ok="deleteTerm(row,index)"
                  @on-cancel="editIndex = -1"
                  confirm transfer>
            <Button>删除</Button>
          </poptip>

        </div>
      </template>
    </Table>
    <Button style="margin-top: 10px" type="success" @click="updateTerm">添加新学期</Button>
  </div>

</template>

<script>
  export default {
    name: "TimeSet",
    data() {
      return {
        columns: [
          {
            title: '学期编号',
            slot: 'id'
          },
          {
            title: '学期',
            slot: 'term'
          },
          {
            title: '学期开始日期',
            slot: 'termStartDate'
          },
          {
            title: '学期结束日期',
            slot: 'termEndDate'
          },
          {
            title: '选课开始日期',
            slot: 'chooseStartDate'
          },
          {
            title: '选课结束日期',
            slot: 'chooseEndDate'
          },
          {
            title: '备注',
            slot: 'remark',
            width:300

          },
          {
            title: '操作',
            slot: 'action'
          }
        ],
        data: [],
        id: 1,
        editIndex: -1,  // 当前聚焦的输入框的行数
        editTerm: '',
        editTermStartDate: '',
        editTermEndDate: '',
        editChooseStartDate: '',
        editChooseEndDate: '',
        editRemark: ''
      }
    },
    methods: {
      handleEdit(row, index) {
        this.editTermStartDate = row.termStartDate
        this.editTermEndDate = row.termEndDate
        this.editChooseStartDate = row.chooseStartDate
        this.editChooseEndDate = row.chooseEndDate
        this.editRemark = row.remark;
        this.editIndex = index
      },
      handleSave(index) {

        this.data[index].termStartDate = this.editTermStartDate;
        this.data[index].termEndDate = this.editTermEndDate;
        this.data[index].chooseStartDate = this.editChooseStartDate;
        this.data[index].chooseEndDate = this.editChooseEndDate;
        this.data[index].remark = this.editRemark;

        this.$axios.post("/user/update", {
          id: this.data[index].id,
          termStartDate: new Date(this.editTermStartDate),
          termEndDate: new Date(this.editTermEndDate),
          chooseStartDate: new Date(this.editChooseStartDate),
          chooseEndDate: new Date(this.editChooseEndDate),
          remark: this.editRemark
        }).then(resp => {
          this.$Message.success("修改成功！")
        })
        this.editIndex = -1;
      },
      updateTerm() {
        let a = this.data[this.data.length - 1].term.split("-")
        let term = ""
        if (a[2] == 1) {
          term = a[0] + "-" + a[1] + "-2";
        } else {
          term = ++a[0] + "-" + (++a[1]) + "-1";
        }

        this.$axios.post("/user/update", {
          term: term
        }).then(resp => {
          this.data.push(resp.data)
        })
      },
      getTermData() {
        this.$axios.get("/user/term").then(rep => {
            this.data = rep.data.content
            this.data.forEach(it => {
              it.termStartDate = it.termStartDate == null ? null : this.getFormalDate(it.termStartDate)
              it.termEndDate = it.termEndDate == null ? null : this.getFormalDate(it.termEndDate)
              it.chooseStartDate = it.chooseStartDate == null ? null : this.getFormalDate(it.chooseStartDate)
              it.chooseEndDate = it.chooseEndDate == null ? null : this.getFormalDate(it.chooseEndDate)
            })
          console.log(this.data)
          }
        )
      },
      getFormalDate(i) {
        let date = new Date(i);
        let formalDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        return formalDate;
      },
      deleteTerm(row, index) {

        this.$axios.delete("/user/" + row.id).then(resp => {
          this.$Message.success("删除成功！")
        })
        this.data.splice(index, 1)
        this.editIndex = -1;

      }

    },
    mounted() {
      this.getTermData();


    }
  }
</script>

<style scoped>
  /*>>> .ivu-table .demo-table-info-column{*/
  /*background-color: #187;*/
  /*color: blue;*/
  /*}*/
</style>
