<template>
  <div>
    <span>注意事项：设置日期的格式为  <b style="font-size: medium">2020-1-1</b></span>
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

      <template slot-scope="{ row, index }" slot="action">
        <div v-if="editIndex === index">
          <Poptip title="确认修改数据吗?"
                  @on-ok="handleSave(index)"
                  @on-cancel="editIndex = -1"
                  confirm transfer>
            <Button>确认</Button>
          </poptip>

          <Button @click="editIndex = -1">取消</Button>
        </div>
        <div v-else>
          <Button @click="handleEdit(row, index)">修改</Button>
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
        editChooseEndDate: ''
      }
    },
    methods: {
      handleEdit(row, index) {
        this.editTermStartDate = row.termStartDate
        this.editTermEndDate = row.termEndDate
        this.editChooseStartDate = row.chooseStartDate
        this.editChooseEndDate = row.chooseEndDate
        this.editIndex = index
      },
      handleSave(index) {

        this.data[index].termStartDate = this.editTermStartDate;
        this.data[index].termEndDate = this.editTermEndDate;
        this.data[index].chooseStartDate = this.editChooseStartDate;
        this.data[index].chooseEndDate = this.editChooseEndDate;

        console.log(this.data[index])
        this.editIndex = -1;


      },
      updateTerm() {
        this.data.push({
          id: 1,
          term: '2021-2022-1',
          termStartDate: 'dfs',
          termEndDate: 'adsf',
          chooseStartDate: 'asdf',
          chooseEndDate: 'asdf',
        })
      },
      getTermData() {
        this.$axios.get("/user/term").then(rep => {
            this.data = rep.data.content
            this.data.forEach(it => {
              it.termStartDate =it.termStartDate==null?null: this.getFormalDate(it.termStartDate)
              it.termEndDate = it.termEndDate=null?null:this.getFormalDate(it.termEndDate)
              it.chooseStartDate = it.chooseStartDate==null?null:this.getFormalDate(it.chooseStartDate)
              it.chooseEndDate = it.chooseEndDate==null?null:this.getFormalDate(it.chooseEndDate)
            })
          console.log(this.data)
          }
        )
      },
      getFormalDate(i) {
        let date = new Date(i);
        let formalDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        return formalDate;
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
