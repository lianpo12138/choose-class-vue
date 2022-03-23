import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Login = () => import('../components/Login/Login');
const Index = () => import('../components/Index/Index');
const Test = () => import('../components/test');

const Home = () => import('../components/Home/Home');
const T1 = () => import('../components/T1/T1');
const ClassTimetable = () => import('../components/T1/ClassTimetable');
const Class = () => import('../components/T1/Class');
const Password = () => import('../components/Password/Password');
const Msg = () => import('../components/Msg/Msg');
const AddClass = () => import('../components/Msg/AddClass');
const UserInfo = () => import('../components/UserInfo/UserInfo');
const Classroom = () => import('../components/T1/Classroom');
const Uniform = () => import('../components/T1/Uniform')
const TimeSet = () => import('../components/T1/TimeSet')
const Teacher = () => import('../components/T1/Teacher')
const AddTeacher = () => import('../components/UserInfo/AddTeacher')
const Student = () => import('../components/T1/Student')
const Degree = () => import('../components/UserInfo/Degree')



// 首页下的子组件
const children = [
    {
        path: 'test',
        name: 'Test',
        component: Test
    },{
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
        path: 'classtimetable',
        name: 'ClassTimetable',
        component: ClassTimetable
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
    },{
        path: 'uniform',
        name: 'Uniform',
        component: Uniform
    },{
        path: 'timeset',
        name: 'TimeSet',
        component: TimeSet
    },{
        path: 'teacher',
        name: 'Teacher',
        component: Teacher
    },{
        path: 'addteacher',
        name: 'AddTeacher',
        component: AddTeacher
    },{
        path: 'student',
        name: 'Student',
        component: Student
    },{
        path: 'degree',
        name: 'Degree',
        component: Degree
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
