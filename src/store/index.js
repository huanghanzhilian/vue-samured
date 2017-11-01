import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
Vue.use(Vuex)
const state = {
  login: false,   // 是否登录
  scroll:0,//滚动条
  loadingAnimation:0,
  pageInfoObj:null,
  userInfo:null,//用户信息
}

export default new Vuex.Store({
  state,
  actions,
  mutations
})
