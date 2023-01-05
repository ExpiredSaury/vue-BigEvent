import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { getUserInfoAPI } from '@/api'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '', // 保存token字符串
    userInfo: {} // 用来保存用户信息（id，username,nickname,email,user_pic)
  },
  getters: {
    nickname: state => state.userInfo.nickname, // 昵称
    username: state => state.userInfo.username, // 用户名
    user_pic: state => state.userInfo.user_pic // 用户头像
  },
  mutations: {
    // 保存token
    updateToken (state, val) {
      state.token = val
    },
    updateUserInfo (state, val) {
      state.userInfo = val
    }
  },
  actions: {
    // 请求用户信息
    async getUserInfoActions (store) {
      const res = await getUserInfoAPI()
      console.log(res)
      store.commit('updateUserInfo', res.data.data)
    }
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
