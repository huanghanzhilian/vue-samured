import {
    recomMend,
    channelWatch,
    getGameList
} from '../api/index'
import {
    SET_PROGRESS
} from './mutation-types.js'

export default {

    async getPageinfo({commit,state},obj) {
        state.loadingAnimation=0;
        state.loadingAnimation=1;
        if(obj=='/'){
            let res = await recomMend();
            commit(SET_PROGRESS, res);
        }else if(obj=='/LookChannel'){
            let res = await channelWatch();
            commit(SET_PROGRESS, res);
        }else if(obj=='/gameClass'){
            var params = {contentType:'-1',gameType:'-1',page:1};
            let res = await getGameList(params);
            commit(SET_PROGRESS, res);
        }
        
    },

}

// export const getPageinfo = ({ commit }) => {
//     let res = recomMend();
//     commit(SET_PROGRESS, res)
// }