<template>

  <Form class="f" ref="formItem" :model="formItem" :rules="ruleForm">

    <h3 style="text-align: center">添加教师</h3>
    <br/>
    <FormItem label="姓名" prop="realname">
      <Input type="text" v-model="formItem.realname"></Input>
    </FormItem>
    <FormItem label="职称" prop="academicTitle">
      <Input v-model="formItem.academicTitle"></Input>
    </FormItem>
    <FormItem label="邮箱" prop="email">
      <Input v-model="formItem.email"></Input>
    </FormItem>
    <FormItem label="电话" prop="phone">
      <Input v-model="formItem.phone"></Input>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="handleSubmit('formItem')">添加</Button>
      <Button @click="handleReset('formItem')" style="margin-left: 8px">重置</Button>
    </FormItem>
    <Modal
      v-model="modal"
      title="新增教师信息"
    >
      <p>姓名：{{teacher.realname}}</p>
      <p>工号：{{teacher.loginname}}</p>
      <p>密码：{{teacher.password}}</p>
      <p>电话：{{teacher.phone}}</p>
      <p>邮箱：{{teacher.email}}</p>
    </Modal>

  </Form>
</template>

<script>
  export default {
    name: "AddTeacher",
    data() {
      return {
        formItem: {
          realname: "",
          academicTitle: "",
          email: "",
          phone: ""
        },
        ruleForm: {
          realname: [
            {required: true, message: "姓名不能为空", trigger: 'blur'}
          ],
          academicTitle: [
            {required: true, message: "职称不能为空", trigger: 'blur'}
          ],
          email: [
            {required: true, message: '邮箱不能为空', trigger: 'blur'},
            {type: 'email', message: '无效的邮箱', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '电话不能为空', trigger: 'blur'},
            {pattern: /^1[3456789]\d{9}$/, message: "手机号码格式不正确", trigger: "blur"}
          ],
        },
        modal: false,
        teacher: {}
      };
    },
    methods: {
      addTeacher() {
        this.$axios.post("/teacher/add", this.formItem).then(rep => {
          this.teacher = rep.data.content
        })
      },
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.addTeacher()
            this.modal = true
          } else {
            this.$Message.error('请按要求输入信息！');

          }
        })

      },
      handleReset(name) {
        this.$refs[name].resetFields();
      }
    },
    mounted() {
    }


  }
</script>

<style scoped>

  .f {
    width: 30%;
    padding: 50px;
    background-color: #8be0eb
  }
</style>
