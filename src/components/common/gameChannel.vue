<template>
    <!-- 组件盒子 -->
    <div class="gameChannel_container">
        <div class="item-section">
            <div class="item-section-title">
                <div class="item_title">{{gameList.game.zgName}}</div>
                <div class="b_r_order_box">
                    <span class="order_title">订阅</span>
                    12
                </div>
            </div>
            <ul class="list-wrap">
                <li class="item-list" v-for="item in gameList.videos">
                    <a href="https://www.youtube.com/">
                        <div class="index-list-bg">
                            <img v-if="item.cover" :src="imgBaseUrl+item.cover" alt="">
                                <img v-else="item.cover" src="../../assets/img-video-default.jpg" alt="">
                            <div class="duration_box">{{item.duration||'0:00'}}</div>
                        </div>
                        <div class="index_list_text_a">{{item.vriTitle}}</div>
                        <div class="index_list_text_b">{{item.name}}</div>
                        <div class="index_list_text_c">{{item.game_name}}</div>
                        <div class="index_watch_box">
                            <div class="index_watch_num">
                                {{item.watch_num}}次观看
                            </div>
                            <div class="index_watch_y"></div>
                            <div class="index_watch_time">{{timeCycle(item.mtime)}}</div>
                        </div>
                    </a>
                        
                </li>
            </ul>
        </div>
    </div>
</template>
<script>

import { imgBaseUrl } from '../../config/env';
import {timeCycle} from '@/config/mUtils';

export default {
    //数据
    data() {
        return {
            imgBaseUrl,
            timeCycle
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
    props: ['gameList'],

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
.list-wrap{
    display: flex;
    flex-direction:row;
    flex-wrap: wrap;
    .item-list{
        width: 220px;
        padding: 10px;
        margin-bottom: 10px;
        &:hover{
            box-shadow: 0 0 24px #212121
        }
        .index-list-bg{
            width: 100%;
            height: 110px;
            position: relative;
            img{
                display: block;
                width: 100%;
            }
            .duration_box{
                min-width: 48px;
                padding: 0 8px;
                height: 14px;
                font-size: 12px;
                background: #212121;
                color: #c1c1c1;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                text-align: center;
                line-height: 14px;
                position: absolute;
                right: 0;
                bottom: 4px;
                z-index: 9;
            }
        }
        .index_watch_box{
            width: 100%;
            height: 12px;
            line-height: 12px;
            //padding-top: 10px;
            margin-top: 10px;
            color: #636363;
            font-size: 12px;
            display: flex;
            .index_watch_num{
                padding-right: 5px;
            }
            .index_watch_y{
                width: 1px;
                height: 100%;
                background: #636363;
                float: left;
            }
            .index_watch_time{
                padding-left: 5px;
            }
        }
        .index_list_text_a{
            height: 24px;
            line-height: 24px;
            color: #e6e6e6;
            font-size: 14px;
            margin-top: 10px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .index_list_text_b{
            height: 24px;
            line-height: 24px;
            color: #e6e6e6;
            font-size: 14px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .index_list_text_c{
            overflow: hidden;
            text-overflow: ellipsis;
            height: 14px;
            line-height: 14px;
            margin-top: 10px;
            font-size: 14px;
            color: #c1c1c1;
            &:hover{
                color: #78d2dc;
            };
        }
    }
    
}
    
.gameChannel_container{
    width: 100%;
}
.item-section-title{
    width: 100%;
    padding: 16px 10px 6px 10px;
    display: flex;
    justify-content: space-between;
    border-top: solid 1px #424242;
    .item_title{
        font-size: 16px;
        color: #78d2dc;
        cursor: pointer;
        &:hover{
            color:#acecef;
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
</style>