<template>
  <div>
  <Form class="f" ref="formInline" :model="formInline" :rules="ruleInline" inline>
    <FormItem prop="origin">
      <Input type="password" v-model="formInline.origin" placeholder="旧密码">
        <Icon type="ios-lock-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem prop="newPassword">
      <Input type="password" v-model="formInline.newPassword" placeholder="新密码">
        <Icon type="ios-lock-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem prop="repeatPassword">
      <Input type="password" v-model="formInline.repeatPassword" placeholder="请重复输入新密码">
        <Icon type="ios-lock-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="handleSubmit()">确认修改</Button>
      <Button @click="cancel()">取消</Button>
    </FormItem>
  </Form><img src="../../assets/b3.jpeg">
    <img src="../../assets/b2.jpeg">

  </div>
</template>

<script>
  export default {
    name: 'Password',
    data() {
      return {
        formInline: {
          origin: '',
          newPassword: '',
          repeatPassword: ''
        },
        ruleInline: {
          origin: [
            {required: true, message: '请输入密码.', trigger: 'blur'},
          ],
          newPassword: [
            {required: true, message: '新密码不能为空.', trigger: 'blur'},
            {type: 'string', min: 6, message: '密码长度最少为6位', trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      handleSubmit() {
        if (this.formInline.origin==""||this.formInline.newPassword=="") {
          this.$Message.error("请输入旧密码和新密码！");
        } else if(this.formInline.newPassword!=this.formInline.repeatPassword){
          this.$Message.error("两次输入的密码不一致！");
        }else {
          // 检查旧密码是否正确
          this.$axios.get('/user/checkPassword', {
            params:{
              origin: this.formInline.origin,
              token: this.$store.state.token
            }}).then(rep=>{
              if (rep.data.success) {
                // 修改密码
                this.$axios.post('/user/changePassword', {
                  id: this.$store.state.id,
                  role: this.$store.state.user,
                  origin: this.formInline.origin,
                  newPassword: this.formInline.newPassword
                }).then(rep => {
                  if (rep.data.success) {
                    this.$Message.success("修改成功，请重新登录");
                    // 删除存在redis的token，跳转至首页
                    this.$axios.get('/user/logout/' + this.$store.state.token);
                    this.$router.replace({name: 'Login'})
                  }
                });
              } else {
                this.$Message.error(rep.data.message);
              }
            }
          );
        }



      },
      cancel(){return}
    }
  }
</script>

<style scoped>
  .f{
  }

</style>
