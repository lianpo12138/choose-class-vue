import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Login = () => import('../components/Login/Login');
const Index = () => import('../components/Index/Index');

const Home = () => import('../components/Home/Home');
const T1 = () => import('../components/T1/T1');
const Class1 = () => import('../components/T1/Class1');
const Class = () => import('../components/T1/Class');
const Password = () => import('../components/Password/Password');
const Msg = () => import('../components/Msg/Msg');
const AddClass = () => import('../components/Msg/AddClass');
const UserInfo = () => import('../components/UserInfo/UserInfo');
const Classroom = () => import('../components/T1/Classroom');



// 首页下的子组件
const children = [
    {
        path: '',
        name: 'Home',
        component: Home
    },
    {
        path: 't1',
        name: 'T1',
        component: T1
    },{
        path: 'addclass',
        name: 'AddClass',
        component: AddClass
    },
    {
        path: 'class1',
        name: 'Class1',
        component: Class1
    },
    {
        path: 'class',
        name: 'Class',
        component: Class
    },
    {
        path: 'password',
        name: 'Password',
        component: Password
    },
    {
        path: 'msg',
        name: 'Msg',
        component: Msg
    },
    {
        path: 'userinfo',
        name: 'UserInfo',
        component: UserInfo
    },
    {
        path: 'classroom',
        name: 'Classroom',
        component: Classroom
    }
]

export default new Router({
  routes: [
    {path: '/', redirect: '/login'},
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/index',
      component: Index,
      meta: {
        requireAuth: true, // 判断是否需要登录
      },
      children,
    }
  ]

})
