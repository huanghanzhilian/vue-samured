<template>
    <!-- 组件盒子 -->
    <div class="banner_container">
        <div class="banner_box" v-if="slides.length">
            <div class="banner_in_box">
                <ul class="banner_ul">
                    <transition name="slide-trans">
                        <li class="channel_banner_li" v-if="isShow">
                            <a :href="'/detailTv?gameId='+slides[nowIndex].objectId" @click.prevent="channelDetails(slides[nowIndex].objectId)">
                                <div class="banner_left_box">
                                    <img v-if="slides[nowIndex].img" :src="imgBaseUrl+slides[nowIndex].img" alt="">
                                    <img v-else src="../../assets/datu.jpg" alt="">
                                </div>
                                <div class="banner_right_box">
                                    <div class="b_r_top">
                                        <img v-if="slides[nowIndex].head" :src="imgBaseUrl+slides[nowIndex].head" alt="">
                                        <img v-else src="../../assets/head.jpg" alt="">
                                        <div class="item_info_box">
                                            <div class="b_r_title">{{slides[nowIndex].riName}}</div>
                                            <div class="b_r_username">{{slides[nowIndex].yingName}}</div>
                                            <div class="b_r_order_box" v-if="slides[nowIndex].state" @click="orderBtn(slides[nowIndex].objectId)">
                                                <span class="order_title">订阅</span>{{slides[nowIndex].subscribed_num}}
                                            </div>
                                            <div class="b_r_order_box order_box1" v-else>
                                                <span class="order_title">已订阅</span>{{slides[nowIndex].subscribed_num}}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="b_r_channel_info">
                                        {{slides[nowIndex].yingName}}
                                    </div>
                                    <div class="b_r_type_box">
                                        <span>{{slides[nowIndex].pingtai}}</span>
                                        &nbsp;|&nbsp;
                                        <span>{{slides[nowIndex].type!=undefined?slides[nowIndex].type:'N/A'}}</span>
                                        &nbsp;|&nbsp;
                                        <span>{{slides[nowIndex].changshang}}</span>
                                    </div>
                                    <div class="b_r_bottom">
                                        <div class="update_time">
                                            {{timeCycle(slides[nowIndex].ctime)}}更新
                                        </div>
                                        <div class="channel_img_box">
                                            <div class="image_list_box">
                                                <img src="http://static.samured.com/assets/images/video/cover/9DOZ2_xzd8I.jpg" alt="">
                                            </div>
                                            <div class="image_list_box">
                                                <img src="http://static.samured.com/assets/images/video/cover/9DOZ2_xzd8I.jpg" alt="">
                                            </div>
                                            <div class="image_list_box">
                                                <img src="http://static.samured.com/assets/images/video/cover/9DOZ2_xzd8I.jpg" alt="">
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </a>
                        </li>
                    </transition>
                    <transition name="slide-trans-old">
                        <li class="channel_banner_li" v-if="!isShow">
                            <a :href="'/detailTv?gameId='+slides[nowIndex].objectId" @click.prevent="channelDetails(slides[nowIndex].objectId)">
                                <div class="banner_left_box">
                                    <img v-if="slides[nowIndex].img" :src="imgBaseUrl+slides[nowIndex].img" alt="">
                                    <img v-else src="../../assets/datu.jpg" alt="">
                                </div>
                                <div class="banner_right_box">
                                    <div class="b_r_top">
                                        <img v-if="slides[nowIndex].head" :src="imgBaseUrl+slides[nowIndex].head" alt="">
                                        <img v-else src="../../assets/head.jpg" alt="">
                                        <div class="item_info_box">
                                            <div class="b_r_title">{{slides[nowIndex].riName}}</div>
                                            <div class="b_r_username">{{slides[nowIndex].yingName}}</div>
                                            <div class="b_r_order_box" v-if="slides[nowIndex].state" @click="orderBtn(slides[nowIndex].objectId)">
                                                <span class="order_title">订阅</span>{{slides[nowIndex].subscribed_num}}
                                            </div>
                                            <div class="b_r_order_box order_box1" v-else>
                                                <span class="order_title">已订阅</span>{{slides[nowIndex].subscribed_num}}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="b_r_channel_info">
                                        {{slides[nowIndex].yingName}}
                                    </div>
                                    <div class="b_r_type_box">
                                        <span>{{slides[nowIndex].pingtai}}</span>
                                        &nbsp;|&nbsp;
                                        <span>{{slides[nowIndex].type!=undefined?slides[nowIndex].type:'N/A'}}</span>
                                        &nbsp;|&nbsp;
                                        <span>{{slides[nowIndex].changshang}}</span>
                                    </div>
                                    <div class="b_r_bottom">
                                        <div class="update_time">
                                            {{timeCycle(slides[nowIndex].ctime)}}更新
                                        </div>
                                        <div class="channel_img_box">
                                            <div class="image_list_box">
                                                <img src="http://static.samured.com/assets/images/video/cover/9DOZ2_xzd8I.jpg" alt="">
                                            </div>
                                            <div class="image_list_box">
                                                <img src="http://static.samured.com/assets/images/video/cover/9DOZ2_xzd8I.jpg" alt="">
                                            </div>
                                            <div class="image_list_box">
                                                <img src="http://static.samured.com/assets/images/video/cover/9DOZ2_xzd8I.jpg" alt="">
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </a>
                        </li>
                    </transition>
                </ul>
            </div>
            <div @click="goto(prevIndex)" class="banner_left_btn"></div>
            <div @click="goto(nextIndex)" class="banner_right_btn"></div>
        </div>
    </div>
</template>
<script>
import { imgBaseUrl } from '@/config/env';
import {timeCycle} from '@/config/mUtils';
import { subsCribe } from '@/api/index';
export default {
    //数据
    data() {
        return {
            imgBaseUrl,
            nowIndex: 0,
            isShow: true,
            timeCycle,
            test:true
        }
    },
    //开始创建  vue后自动执行
    mounted() {
        //this.initData();
    },
    //需要使用的模块
    components: {
        
    },

    //父组件的参数书
    props: {
        slides: {
            type: Array,
            default: [
                {
                    img:''
                }
            ]
        },
    },

    //需要引用的外部js方法
    mixins: [],

    //计算值 这里可以实时监听某个数据的变化
    computed: {
        prevIndex() {
            if (this.nowIndex === 0) {
                return this.slides.length - 1
            } else {
                return this.nowIndex - 1
            }
        },
        nextIndex() {
            if (this.nowIndex === this.slides.length - 1) {
                return 0
            } else {
                return this.nowIndex + 1
            }
        }
    },
    updated() {
        // console.log(this.supportIds, this.sortByType)
    },
    //方法
    methods: {
        async initData() {
            //获取数据
        },
        goto(index) {
            this.isShow = false
            setTimeout(() => {
                this.isShow = true
                this.nowIndex = index
            }, 10)
        },
        //订阅
        async orderBtn(ids){
            console.log(ids)
            var params = {gameId:ids};
            let res = await subsCribe(params);
            console.log(res)
        },
        //进入频道详情页
        channelDetails(obj){
            this.$router.push({path:'/detailTv',query:{gameId:obj}});
        },
    },

    //监听
    watch: {

    }
}
</script>
<style lang="scss" scoped>
//@import 'src/style/mixin'; //初始化页面背景动画
.banner_ul{
        position: relative;
        height: 320px;
        overflow: hidden;
    }
    .channel_banner_li{
        position: absolute;
        top: 0;
        height: 320px;
        a{
            display: flex;
            height: 320px;
            overflow: hidden;
            .banner_left_box{
                flex-grow: 1;
                img{
                    width: 100%;
                    height: 100%;
                    display: block;
                }
            }
            .banner_right_box{
                width: 300px;
                padding: 10px 15px 0;
                background: #212121;
                .b_r_top{
                    display: flex;
                    img{
                        width: 76px;
                        height: 76px;
                        display: block;
                        margin-right: 8px;
                    }
                    .item_info_box{
                        flex-grow: 1;
                        position: relative;
                        .b_r_order_box{
                            position: absolute;
                            left: 0;
                            bottom: 0;
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
                                width: 50px;
                                height: 100%;
                                line-height: 20px;
                                display: inline-block;
                                color: #353535;
                                background: #e34849;
                                margin-right: 10px;
                                padding: 0 5px;
                            }
                            &.order_box1{
                                border: 1px solid #828282;
                                .order_title{
                                    background: #828282;
                                    color: #eee;
                                }
                            }
                        }
                        .b_r_title{
                            font-size:16px;
                            color:#eee;
                        }
                        .b_r_username{
                            line-height: 25px;
                            color:#7ad1db;
                            font-size:13px;
                        }
                    }
                }
                .b_r_channel_info{
                    word-wrap:break-word;
                    font-size: 12px;
                    color:#636363;
                    margin-top: 20px;
                    height: 64px;
                    line-height: 16px;
                }
                .b_r_type_box{
                    margin-top: 20px;
                    font-size: 12px;
                    color:#c1c1c1;

                }
                .update_time{
                    font-size: 12px;
                    margin-bottom: 28px;
                }
                .b_r_bottom{
                    margin-top: 10px;
                    .channel_img_box{
                        width: 100%;
                        //height: 86px;
                        display: flex;
                        flex-direction: row;
                        .image_list_box{
                            flex-grow: 1;
                            //display: inline-flex;
                            /*height: 100%;*/
                            width: 100px;
                            margin-right: 15px;
                            &:last-child {
                                margin-right:0px;
                            }
                            img{

                                display: block;
                                width: 100%;
                                //box-sizing: border-box;
                            }
                        }
                    }
                }
            }
        }
    }
    .banner_in_box{
        position: relative;
    }
    .banner_left_btn{
        background: #515151 url(../../assets/btn_left2.png) 50% no-repeat;
        background-size: 14px 14px;
        left: -40px;
        width: 40px;
        height: 60px;
        position: absolute;
        top: 50%;
        margin-top: -42.5px;
        color: #eee;
        cursor: pointer;
        line-height: 60px;
        font-size: 12px;
        text-align: center;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    .banner_right_btn{
        background: #515151 url(../../assets/btn_right2.png) 50% no-repeat;
        background-size: 14px 14px;
        right: -40px;
        width: 40px;
        height: 60px;
        position: absolute;
        top: 50%;
        margin-top: -42.5px;
        color: #eee;
        cursor: pointer;
        line-height: 60px;
        font-size: 12px;
        text-align: center;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    .slide-trans-enter-active {
        transition: all .5s;
    }

    .slide-trans-enter {
        transform: translateX(880px);
    }

    .slide-trans-old-leave-active {
        transition: all .5s;
        transform: translateX(-880px);
    }
</style>