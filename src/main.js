import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'view-design'
import axios from 'axios'
import store from "./store";
import 'view-design/dist/styles/iview.css';

Vue.config.productionTip = false;
Vue.use(iView);

// 设置基础URL
// axios.defaults.baseURL = "http://28379025lu.qicp.vip:59617";
axios.defaults.baseURL = "http://localhost:9000";
// 设置请求超时时间
axios.defaults.timeout = 5000;
// 使用axious调用后台接口
Vue.prototype.$axios = axios;

// 路由判断登录 根据路由配置文件的参数
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) { // 判断该路由是否需要登录权限
    console.log("sessionStorage.vuex="+sessionStorage.vuex);
    if (sessionStorage.vuex) { // 判断当前的token是否存在 ； 登录存入的token
      next();
    } else {
      alert('需要登录');
      next({
        path: '/',
        query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next();
  }
});
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
