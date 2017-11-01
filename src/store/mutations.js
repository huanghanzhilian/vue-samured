import {
    SET_SCROLLBAR,
    SET_PROGRESS,
    SET_SCROLLBARW,
    SET_USERINFO
} from './mutation-types'

export default {
    // 网页初始化时从本地缓存获取购物车数据
    [SET_SCROLLBAR](state,width) {
        state.scroll=width;
    },
    //记录进度条状态以及逻辑
    [SET_PROGRESS](state,pageinfo) {
        state.pageInfoObj=null;
        if(pageinfo.code==200){
            state.loadingAnimation=2;
            state.pageInfoObj=pageinfo;
        }
    },
    //业务请求进度条改变1
    [SET_SCROLLBARW](state,obj) {
        if(obj==1){
            state.loadingAnimation=0;
            state.loadingAnimation=1;
        }else{
            state.loadingAnimation=3;
        }
    },
    //存储用户信息
    [SET_USERINFO](state,obj) {
        state.userInfo=obj;
    },

}