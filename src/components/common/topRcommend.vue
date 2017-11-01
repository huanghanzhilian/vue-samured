<template>
    <!-- 组件盒子 -->
    <div class="topRcommend_container">
        <div class="channel_top_ul" v-if="hot.length&&status" >
            <div class="channel_top_li" v-for="item in hot">
                <div class="li" >
                    <div class="li_wrap">
                        <div class="rec_li_bg">
                            <img v-if="item.datu" :src="imgBaseUrl+item.datu" alt="">
                            <img v-else src="../../assets/datu.jpg" alt="">
                        </div>
                        <div class="info_box">
                            <div class="rec_header_box">
                                <div class="rec_li_header">
                                    <img v-if="item.head" :src="imgBaseUrl+item.head" alt="">
                                    <img v-else src="../../assets/head.jpg" alt="">
                                </div>
                                <div class="b_r_order_box">
                                    <span class="order_title">订阅</span>
                                    12
                                </div>
                            </div>
                            <div class="rec_li_name">
                                {{item.zgName||'N/A'}}
                            </div>
                            <div class="rec_li_username">
                                {{item.yingNamec||item.fzName||item.riName||'N/A'}}
                            </div>
                            <div class="rec_update_time">
                                <!-- {{item.ctime}} -->
                                {{timeCycle(item.ctime)}}更新
                            </div>
                            <div class="rec_type_box">
                                <span>
                                    {{item.pingtai}}
                                </span>
                                &nbsp;|&nbsp;
                                <span>
                                    {{item.type}}
                                </span>
                                &nbsp;|&nbsp;
                                <span>
                                    {{item.changshang}}
                                </span>
                            </div>
                            <div class="rec_imgs">
                                <div class="rec_in_img">
                                    <img src="http://static.samured.com/assets/images/game/head/bd8c064a8169487bb86066e5dbc3cad8.png" alt="">
                                </div>
                                <div class="rec_in_img">
                                    <img src="http://static.samured.com/assets/images/game/head/bd8c064a8169487bb86066e5dbc3cad8.png" alt="">
                                </div>
                                <div class="rec_in_img">
                                    <img src="http://static.samured.com/assets/images/game/head/bd8c064a8169487bb86066e5dbc3cad8.png" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                        
                        
                </div>
            </div>
        </div>
        <div class="channel_top_ul" v-if="hot.length&&!status" >
            <div class="channel_top_li" v-for="item in hot">
                <div class="li" >
                    <div class="li_wrap">
                        <div class="rec_li_bg">
                            <img v-if="item.datu" :src="imgBaseUrl+item.datu" alt="">
                            <img v-else src="../../assets/datu.jpg" alt="">
                        </div>
                        <div class="info_box">
                            <div class="rec_header_box">
                                <div class="rec_li_header">
                                    
                                    <img v-if="item.head" :src="imgBaseUrl+item.head" alt="">
                                    <img v-else src="../../assets/head.jpg" alt="">
                                    <div class="rec_li_headerss">
                                        <div class="rec_li_name">
                                            {{item.zgName||'N/A'}}
                                        </div>
                                        <div class="rec_li_username">
                                            {{item.yingNamec||item.fzName||item.riName||'N/A'}}
                                        </div>
                                    </div>
                                </div>
                                <div class="b_r_order_box">
                                    <span class="order_title">订阅</span>
                                    12
                                </div>
                            </div>
                            <div class="rec_type_box rec_type_box2">
                                <span>
                                    {{item.pingtai}}
                                </span>
                                &nbsp;|&nbsp;
                                <span>
                                    {{item.type}}
                                </span>
                                &nbsp;|&nbsp;
                                <span>
                                    {{item.changshang}}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--  -->


        </div>
    </div>
</template>
<script>

//import { setStore, getStore } from '@/config/mUtils'
import { imgBaseUrl } from '@/config/env';
import {timeCycle} from '@/config/mUtils';

export default {
    //数据
    data() {
        return {
            imgBaseUrl,
            timeCycle,
        }
    },
    //开始创建  vue后自动执行
    mounted() {
        this.initData();
    },
    //需要使用的模块
    components: {

    },

    //父组件的参数书
    props: [
        'hot',
        'status'
    ],

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
            //获取数据
        },
    },

    //监听
    watch: {

    }
}
</script>
<style lang="scss" scoped>
.channel_top_ul{
    overflow: hidden;
}
.channel_top_li{
    width:33.3%;
    height: auto;
    overflow: hidden;
    float: left;
    font-size: 14px;
    margin-bottom: 20px;
    .li{
        padding: 10px;

        .info_box{
            padding: 0 10px 17px 10px;
        }
        .li_wrap{
            background-color: #2b2b2b;
            &:hover{
                /*background: #424242;
                color: #eee;*/
                box-shadow: 0 0 24px #212121
            }
        }
        .rec_li_name{
            color: #eee;
            margin-top: 18px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .rec_li_username{
            color: #acecef;
            margin-top: 8px;
            font-size: 12px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .rec_update_time{
            font-size: 12px;
            color:#5d5d5d;
            margin-top: 24px;
            margin-bottom: 12px;
        }
        .rec_type_box{
            margin-bottom: 20px;
            height: 24px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .rec_type_box2{
            margin-bottom: 0px;
            margin-top: 10px;
        }
        .rec_imgs{
            display: flex;
            .rec_in_img{
                height: 46px;
                width: 100%;
                margin-right: 10px;
                &:last-child {
                    margin-right:0px;
                }
                background-color: #828282;
                img{
                    width:100%;
                    height: 100%;
                    display: block;
                }
            }
        }
        .rec_li_bg{
            height: 70px;
            img{
                width: 100%;
            }
        }
        .rec_header_box{
            display: flex;
            align-items: center;
            justify-content: space-between;
            .rec_li_header{
                display: flex;
                img{
                    width: 40px;
                    height: 40px;
                }
            }
            .rec_li_headerss{
                width: 110px;
                margin-left: 10px;
                .rec_li_name{
                    margin: 0px;
                }
                .rec_li_username{
                    margin: 0px;
                }
            }
            .b_r_order_box{
                /*position: absolute;
                left: 0;
                bottom: 0;*/
                height: 20px;
                line-height: 20px;
                border: 1px solid #e34849;
                text-align: center;
                font-size: 12px;
                color: #c1c1c1;
                border-radius: 1px;
                box-sizing: border-box;
                padding: 0 10px 0 0px;
                .order_title{
                    width: 40px;
                    height: 100%;
                    line-height: 20px;
                    display: inline-block;
                    color: #353535;
                    background: #e34849;
                    margin-right: 10px;
                }
            }
        }
    }
        
}
</style>