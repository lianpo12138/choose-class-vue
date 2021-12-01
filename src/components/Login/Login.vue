<template>
  <div class="login-vue" :style="bg">
    <div class="container">
      <p class="title">网上选课系统</p>
      <div class="input-c">
        <Input prefix="ios-contact" v-model="loginuser.account" placeholder="用户名" clearable/>
        <p class="error"></p>
      </div>
      <div class="input-c">
        <Input type="password" v-model="loginuser.pwd" prefix="md-lock" placeholder="密码" clearable/>
        <p class="error">{{pwdError}}</p>
      </div>
      <div>
        <Radio-group v-model="loginuser.role">
          <Radio label="student"  class="radio-a" aria-checked="true">学生</Radio>
          <Radio label="teacher" class="radio-a" >老师</Radio>
          <Radio label="admin" class="radio-a">管理员</Radio>
        </Radio-group>
      </div>
<br>
      <Button :loading="isShowLoading" class="submit" type="primary" @click="signin">登陆</Button>
      <p class="account"> <span @click="forgetPwd">忘记密码</span></p>
    </div>
  </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: 'Login',
        data() {
            return {
                loginuser:{
                    account: '',
                    pwd: '',
                    role: 'student'
                }
                ,
                accountError: '',
                pwdError: '',
                isShowLoading: false,
                bg: {},
                info:''
            }
        },
        created() {
            this.bg.backgroundImage = 'url(' + require('../../assets/bg0'+new Date().getDay()+'.jpg');
        },
        mounted() {
            document.onkeydown = e => {
                // 监听回车事件
                if (e.keyCode == 13) {
                    this.signin()
                }
            }
        },
        methods: {
            signin() {
                axios.post('/user/login', {
                    loginname: this.loginuser.account,
                    password: this.loginuser.pwd,
                    role: this.loginuser.role
                }).then(rep => {
                    if (rep.data.success) {
                        console.log(rep.data)
                        this.$store.commit('set', rep.data.content);
                        this.$router.replace('/index');
                    } else {
                        this.$Message.error(rep.data.message);
                    }
                })

            }
            ,
            register() {
                console.log('注册账号')
            },
            forgetPwd() {
                alert('忘记密码')
            }

        }
    }
</script>

<style>
  .login-vue {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
  }

  .login-vue .container {
    background: rgba(255, 255, 255, .5);
    width: 300px;
    text-align: center;
    border-radius: 10px;
    padding: 30px;
  }

  .login-vue .ivu-input {
    background-color: transparent;
    color: #fff;
    outline: #fff;
    border-color: #fff;
  }

  .login-vue ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
    color: rgba(255, 255, 255, .8);
  }

  .login-vue :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: rgba(255, 255, 255, .8);
  }

  .login-vue ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: rgba(255, 255, 255, .8);
  }

  .login-vue :-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: rgba(255, 255, 255, .8);
  }

  .login-vue .title {
    font-size: 16px;
    margin-bottom: 20px;
  }

  .login-vue .input-c {
    margin: auto;
    background-color: rgba(255, 0, 0, 0);
    width: 200px;
  }

  .login-vue .error {
    color: red;
    text-align: left;
    margin: 5px auto;
    font-size: 12px;
    padding-left: 30px;
    height: 20px;
  }

  .login-vue .submit {
    width: 200px;
  }

  .login-vue .account {
    margin-top: 10px;
  }

  .login-vue .account span {
    cursor: pointer;
  }

  .login-vue .ivu-icon {
    color: #eee;
  }

  .login-vue .ivu-icon-ios-close-circle {
    color: #777;
  }
  .login-vue .radio-a {
    background: transparent;
    color: #fff;

  }

</style>


