import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    user: 'student',
    username: 'user'
  },
  mutations: {
    set (state, payload) {
      state.user = payload.role
      state.username = payload.realname
    }
  },
  plugins: [persistedState({storage: window.sessionStorage})]
})
