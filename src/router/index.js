import Vue from 'vue'
import Router from 'vue-router'
const index = r => require.ensure([], () => r(require('../page/index')), 'index');
const home = r => require.ensure([], () => r(require('../page/home/home')), 'home');
const LookChannel = r => require.ensure([], () => r(require('../page/LookChannel/LookChannel')), 'LookChannel');
const gameClass = r => require.ensure([], () => r(require('../page/gameClass/gameClass')), 'gameClass');
const login = r => require.ensure([], () => r(require('../page/login/login')), 'login');
//播放页
const watch = r => require.ensure([], () => r(require('../page/Watch/Watch')), 'Watch');
//频道详情
const detailTv = r => require.ensure([], () => r(require('../page/detailTv/detailTv')), 'detailTv');

Vue.use(Router)
export default new Router({
    mode: 'history',
    routes: [{
        path: '/',
        component: index,
        redirect: '/',
        children: [{
            path: '/',
            component: home
        }, {
            path: 'LookChannel',
            component: LookChannel
        }, {
            path: 'gameClass',
            component: gameClass
        },{
            path: 'watch',
            component: watch
        },{
            path: 'detailTv',
            component: detailTv
        }]
    }, {
        path: '/login',
        component: login
    }],
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            if (from.meta.keepAlive) {
                from.meta.savedPosition = document.body.scrollTop;
            }
            return { x: 0, y: to.meta.savedPosition ||0}
        }
    }
})