import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import axios from 'axios'
import store from "./store";
import 'iview/dist/styles/iview.css'

Vue.config.productionTip = false
Vue.use(iView)

// 设置基础URL
axios.defaults.baseURL = "http://localhost:9000"
// 设置请求超时时间
axios.defaults.timeout = 5000
// 使用axious调用后台接口
Vue.prototype.$axios = axios

new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
