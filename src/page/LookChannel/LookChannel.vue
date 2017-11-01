<template>
    <!-- 组件盒子 -->
    <div class="LookChannel_container" v-if="slides">
        <div class="LookChannel_containerx">
            <div class="recommend_title">精彩推荐</div>
            <div class="v_channel_recommend_box">
                <ban-ner :slides="slides.recommend"></ban-ner>
            </div>
        </div>
        <div class="recommend_box">
            <div class="recommend_wrap">
                <div class="recommend_title">特别推荐</div>
                <div class="v_channel_recommend_box">
                    <top-rcommend :hot="slides.hot" :status="true"></top-rcommend>
                </div>
            </div>
        </div>
        <div class="recommend_box">
            <div class="recommend_wrap" v-for="item in slides.cate" v-if="item.items.length>0">
                <div class="recommend_title">{{item.name}}</div>
                <div class="v_channel_recommend_box">
                    <top-rcommend :hot="item.items"></top-rcommend>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
//import { setStore, getStore } from '@/config/mUtils'
import banNer from '@/components/common/banner';
import topRcommend from '@/components/common/topRcommend';
import { channelWatch } from '@/api/index';
import { mapMutations, mapState,mapActions} from 'vuex'
export default {
    //数据
    data() {
        return {
            volist:{},
            slides:null,
        }
    },
    //开始创建  vue后自动执行
    mounted() {
        if(this.pageInfoObj){
            this.slides=this.pageInfoObj.rows;
        }else{
            this.initData();
        }
        

    },
    //需要使用的模块
    components: {
        banNer,
        topRcommend
    },

    //父组件的参数书
    props: [],

    //需要引用的外部js方法
    mixins: [],

    //计算值 这里可以实时监听某个数据的变化
    computed: {
        ...mapState([
            'pageInfoObj'
        ]),
    },
    updated() {
        // console.log(this.supportIds, this.sortByType)
    },
    //方法
    methods: {
        async initData() {
            //获取数据
            let res = await channelWatch();
            this.slides=res.rows;
        },

    },

    //监听
    watch: {

    }
}
</script>
<style lang="scss" scoped>
    .LookChannel_container{
        width: 1020px;
        //padding:30px 70px;
        overflow: hidden;
        background-color: rgb(56, 56, 56);
        box-sizing: border-box;
    }
    .LookChannel_containerx{
        width: 1020px;
        padding:30px 70px;
        overflow: hidden;
        background-color: rgb(56, 56, 56);
        box-sizing: border-box;
        .recommend_title{
            color: #c1c1c1;
            font-size: 18px;
            width: 100%;
            line-height: 18px;
            height: 18px;
            font-size: 15px;
        }
        .v_channel_recommend_box{
            margin-top: 12px;
            width: 100%;
            /*height: 370px;*/
            position: relative;
        }
    }
    .recommend_box{
        padding: 20px;
        overflow: hidden;
        .recommend_wrap{
            border-top: solid 1px #424242;
            padding: 20px 40px;
            .recommend_title{
                margin-left: 10px;
                font-size:15px;
            }
        }
    }


</style>