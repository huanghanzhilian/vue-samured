import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import { userInfo,recomMend } from './api/index'

import '@/assets/style/fontsr.css'

Vue.config.productionTip = false


router.beforeEach(function(to, from, next) {
    userInfo().then(res => {
        if(res.code==200){
            store.commit('SET_USERINFO',res.rows)
        }else{
            store.commit('SET_USERINFO',null)
        }
        next()
    });
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
