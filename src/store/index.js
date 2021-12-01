import Vue from 'vue'
import Vuex from 'vuex'
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
  getters:{

  }
})
