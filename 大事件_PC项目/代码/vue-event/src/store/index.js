import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
// 导入axios
import { getUserInfoAPI } from '@/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '', // 用户token
    userInfo: {} // 定义用户信息对象
  },
  mutations: {
    // 更新 token 的 mutation 函数
    updateToken (state, newToken) {
      state.token = newToken
    },
    // 更新用户的信息
    updateUserInfo (state, info) {
      state.userInfo = info
    }
  },
  actions: {
    // 定义初始化用户基本信息的 action 函数
    async initUserInfo (store) {
      const { data: res } = await getUserInfoAPI()
      if (res.code === 0) {
        store.commit('updateUserInfo', res.data)
      }
    }
  },
  getters: {
    nickname: state => state.userInfo.nickname, // 昵称
    username: state => state.userInfo.username, // 用户名
    user_pic: state => state.userInfo.user_pic // 用户头像
  },
  // 配置为 vuex 的插件
  plugins: [createPersistedState()]
})
