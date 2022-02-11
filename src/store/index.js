import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    id: '',
    user: 'student',
    username: 'user',
    token:''
  },
  mutations: {
    // 登录后将角色和用户名存入vuex，然后存入sessionstorage
    set (state, payload) {
      state.id = payload.id;
      state.user = payload.role;
      state.username = payload.realname;
      state.token = payload.token;
    }
  },
  plugins: [persistedState({storage: window.sessionStorage})]
})
