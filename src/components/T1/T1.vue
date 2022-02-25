<template>
  <div>
    <div class="query-c">
      查询：
      <Input search placeholder="请输入查询内容" style="width: auto"/>
    </div>
    <br>
    <Table border stripe :columns="columns" :data="data"></Table>
    <br>
    <Page :total="req.total"
          :current="req.pageNum"
          :page-size="req.pageSize"
          @on-change="pNumChange"
          @on-page-size-change="pSizeChange"
          show-sizer show-elevator show-total=""/>
  </div>
</template>

<script>
  export default {
    name: 'T1',
    data() {
      return {
        columns: [
          {
            title: '课程编号',
            key: 'id'
          }, {
            title: '课程名称',
            key: 'classname'
          },
          {
            title: '教师名称',
            key: 'teachername'
          }, {
            title: '教师职称',
            key: 'academicTitle'
          },
          {
            title: '上课时间',
            key: 'simpleTime'
          }, {
            title: '人数限制',
            key: 'planNum'
          },
          {
            title: '已选人数',
            key: 'realityNum'
          }
        ],
        data: [],
        req:{
          classname: "",
          pageNum: 1,
          pageSize:10,
          total:0
        }



      }
    },
    mounted() {
      this.list();
    },
    methods: {
      list() {
        this.$axios.get("/class/list",{
          params:{
            classname: this.req.classname,
            pageNum: this.req.pageNum,
            pageSize: this.req.pageSize
          }
          }
        ).then(
        resp=>{


          this.data = resp.data.content.list;
          for (let i = 0; i < this.data.length; i++) {
            this.data[i].teachername = resp.data.content.list[i].teacher.realname;
            this.data[i].academicTitle = resp.data.content.list[i].teacher.academicTitle;

          }
          this.req.total = resp.data.content.total;
        }
      )
      },

      pNumChange(i) {
        this.req.pageNum = i;
        this.list()
      },

      pSizeChange(i) {
        this.req.pageSize = i;
        this.list()

      }
    }
  }
</script>

<style scoped>

</style>
