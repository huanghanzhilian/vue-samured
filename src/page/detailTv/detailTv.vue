<template>
    <!-- 组件盒子 -->
    <div class="detailTv_container">
        <div class="detail_top_box">
            <img v-if="publicInfo.game.datu" :src="imgBaseUrl+publicInfo.game.datu" alt="">
            <img v-else src="../../assets/datu.jpg" alt="">
        </div>
        <div class="detail_tab_box">
            <div class="item_box">
                <div class="detail_tab_name">{{publicInfo.game.zgName||'N/A'}}</div>
                <div class="order_box">
                    <div class="order_title">订阅</div>
                    <div class="order_num">10</div>
                </div>
            </div>
        </div>
        <div class="detail_tab_btn">
            <div @click="tab(0)" :class="{detail_active_btn: pageStatus == 0}">首页</div>
            <div @click="tab(1)" :class="{detail_active_btn: pageStatus == 1}">视频</div>
            <div @click="tab(2)" :class="{detail_active_btn: pageStatus == 2,openArt:openArt == true}">专辑</div>
            <div @click="tab(3)" :class="{detail_active_btn: pageStatus == 3}">简介</div>
        </div>
        <div class="linsh"></div>
        <div class="detail_bottom_box clearfix">
            <div class="d_t_left_box">
                <div class="d_t_main_box" v-if="indexInfo">
                    <div class="d_t_a_top" >
                        <div class="d_t_a_top_title">热门推荐</div>
                        <div class="title_box">
                            <a href="#" class="img_wrap">
                                <img v-if="indexInfo.hot[0].cover" :src="imgBaseUrl+indexInfo.hot[0].cover" alt="">
                                <img v-else src="../../assets/datu.jpg" alt="">
                            </a>
                            <div class="title_box_info">
                                <a href="#" class="d_t_a_top_name">{{indexInfo.hot[0].name}}</a>
                                <div class="d_t_a_top_username">{{indexInfo.hot[0].contTags}}</div>
                                <div class="d_t_a_top_time">{{timeCycle(indexInfo.hot[0].ctime)}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="list_detboc" v-for="(item,index) in indexInfo.cate">
                        <div class="d_t_a_top_title">{{item.name}}</div>
                        <detail-index :gameChildLis="item.items"></detail-index>
                    </div>
                </div>
            </div>
            <div class="d_t_right_box">
                <div class="d_t_a">
                    <div class="d_t_a_title">所属</div>
                    <div class="d_t_a_text">sadas</div>
                    <div class="d_t_a_text">sadas</div>
                </div>
                <div class="d_t_a">
                    <div class="d_t_a_title">相关</div>
                    <div class="d_t_a_text">sadas</div>
                    <div class="d_t_a_text">sadas</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
//引入存储
import { setStore, getStore } from '@/config/mUtils';
import { channelDetails } from '@/api/index';
import { imgBaseUrl } from '@/config/env';
import {timeCycle} from '@/config/mUtils';
import detailIndex from '@/components/common/detailIndex.vue'



export default {
    //数据
    data() {
        return {
            pageStatus:0,//tab状态
            openArt: false,
            test_img:false,

            imgBaseUrl,//图片前缀
            timeCycle,//处理时间函数
            publicInfo:{'game':{}},//公共数据
            indexInfo:null,//首页数据
            indexParams: {
                gameId: this.gameId,
                type: 1,
                page: 1
            },//首页初始化参数
            videoParams:{
                gameId: this.gameId,
                type: 2,
                page: 1
            },//视频页初始化参数
            albumParams:{
                gameId: this.gameId,
                type: 3,
                page: 1
            },//专辑页初始化参数

        }
    },
    created(){
        this.gameId = this.$route.query.gameId;

        //首页初始化参数
        this.indexParams = {
            gameId: this.gameId,
            type: 1,
            page: 1
        }

        //视频页初始化参数
        this.videoParams = {
            gameId: this.gameId,
            type: 2,
            page: 1
        }
        //专辑页初始化参数
        this.albumParams = {
            gameId: this.gameId,
            type: 3,
            page: 1
        }
    },
    //开始创建  vue后自动执行
    mounted() {
        this.initData();
    },
    //需要使用的模块
    components: {
        detailIndex
    },

    //父组件的参数书
    props: [],

    //需要引用的外部js方法
    mixins: [],

    //计算值 这里可以实时监听某个数据的变化
    computed: {

    },
    updated() {
        // console.log(this.supportIds, this.sortByType)
    },
    //方法
    methods: {
        async initData() {
            //获取公共数据
            let publicrec= await channelDetails(this.indexParams);
            this.publicInfo=publicrec.rows;
            //获取首页数据
            let indexres = await channelDetails(this.indexParams);
            this.indexInfo=indexres.rows;
            //获取视频页数据
            let videores = await channelDetails(this.videoParams);
            console.log(videores)
            //获取专辑页数据
            let albumres = await channelDetails(this.albumParams);
            console.log(albumres)
        },
    },

    //监听
    watch: {

    }
}
</script>
<style lang="scss" scoped>

@import '../../assets/style/index';
.detailTv_container{
    width: 1340px;
    margin-top: 10px;
    //background-color: #383838;
    .detail_top_box{
        height: 335px;
        width: 100%;
        background-color: #383838;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .detail_tab_box{
        background-color: #383838;
        .item_box{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 18px 20px 30px;
            .detail_tab_name{
                color: #c1c1c1;
                font-size: 20px;
            }
            .order_box{
                display: flex;
                align-items: center;
                padding: 0 10px 0 0;
                height: 20px;
                line-height: 20px;
                border: 1px solid #e34849;
                font-size: 12px;
                text-align: center;
                color: #c1c1c1;
                cursor: pointer;
                border-radius: 1px;
                .order_title{
                    width: 40px;
                    height: 100%;
                    margin-right: 10px;
                    line-height: 20px;
                    color: #353535;
                    background: #e34849;
                }
                .order_num{

                }
            }
        }
    }
    .detail_tab_btn{
        background-color: #383838;
        display: flex;
        height: 34px;
        line-height: 34px;
        border-bottom: 1px solid #434343;
        div{
            padding: 0 20px;
            line-height: 34px;
            height: 34px;
            color: #c1c1c1;
            position: relative;
            top: 1px;
            cursor: pointer;
            &.detail_active_btn,&:hover{
                color: #eee;
                border-bottom: 2px solid #e34849;
            }
        }
    }
    .linsh{
        height: 10px;
        background-color: #2b2b2b;
    }
    .detail_bottom_box{

        .d_t_left_box{
            width: 1120px;
            float: left;
            background-color: #383838;
            //margin-right: 10px;
            .d_t_main_box{
                .d_t_a_top{
                    width: 100%;
                    height: 285px;
                    position: relative;
                    padding: 0 20px;
                    box-sizing: border-box;
                }
                .d_t_a_top_title{
                    width: 100%;
                    height: 50px;
                    line-height: 56px;
                    color: #c1c1c1;
                    font-size: 16px;
                }
                .title_box{
                    display: flex;
                    .img_wrap{
                        flex: 1;
                        width: 396px;
                        height: 220px;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .title_box_info{
                        width: 668px;
                        margin-left: 10px;
                        .d_t_a_top_username,.d_t_a_top_time,.d_t_a_top_name{
                            height: 14px;
                            line-height: 14px;
                            font-size: 14px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                        .d_t_a_top_name{
                            color: #78d2dc;
                            display: block;
                            margin-bottom: 10px;
                        }
                        .d_t_a_top_username{
                            margin-bottom: 20px;
                        }
                        .d_t_a_top_time{
                            color: #828282;
                            font-size: 12px;
                        }
                    }
                }
            }
        }
        .d_t_right_box{
            float: right;
            width: 210px;
            //background-color: #383838;
            .d_t_a{
                width: 100%;
                overflow: hidden;
                margin-bottom: 10px;
                text-align: center;
                .d_t_a_text, .d_t_a_title {
                    background: #383838;
                    width: 100%;
                }
                .d_t_a_title{
                    height: 36px;
                    line-height: 36px;
                    color: #c1c1c1;
                    margin-bottom: 2px;
                    font-size: 16px;
                }
                .d_t_a_text{
                    height: 28px;
                    color: #828282;
                    line-height: 28px;
                    margin-bottom: 1px;
                    font-size: 14px;
                    padding: 0 10px;
                    box-sizing: border-box;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    cursor: pointer;
                }
            }
        }
    }

}
.d_t_a_top_title{
    padding-left: 20px;
}


</style>