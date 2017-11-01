<template>
    <!-- 组件盒子 -->
    <div class="videoList_container">
        <div class="contents">
            <div class="item-section" v-if="isObjectNull">
                <div class="item-section-title">推荐视频{{isObjectNull}}</div>
                <ul class="list-wrap">
                    <li class="item-list" v-for="item in volist.hot">
                        <a :href="'/watch?videoId='+item.objectId" @click.prevent="goWatch(item.objectId)">
                            <div class="index-list-bg">
                                <img v-if="item.cover" :src="imgBaseUrl+item.cover" alt="">
                                <img v-else="item.cover" src="../../assets/img-video-default.jpg" alt="">
                                <div class="duration_box">{{item.duration}}</div>
                            </div>
                            <div class="index_list_text_a">{{item.vriTitle}}</div>
                            <div class="index_list_text_c">{{item.zgName}}</div>
                            <div class="index_watch_box">
                                <div class="index_watch_num">
                                    {{item.objectId}}次观看
                                </div>
                                <div class="index_watch_y"></div>
                                <div class="index_watch_time">{{timeCycle(item.mtime)}}</div>
                            </div>
                        </a>

                    </li>
                </ul>
                <div class="item-section-title">最新视频</div>
                <ul class="list-wrap">
                    <li class="item-list" v-for="item in volist.new">
                        <div class="index-list-bg">
                            <img v-if="item.cover" :src="imgBaseUrl+item.cover" alt="">
                            <img v-else="item.cover" src="../../assets/img-video-default.jpg" alt="">
                            <div class="duration_box">{{item.duration}}</div>
                        </div>
                        <div class="index_list_text_a">{{item.vriTitle}}</div>
                        <div class="index_list_text_c">{{item.zgName}}</div>
                        <div class="index_watch_box">
                            <div class="index_watch_num">
                                {{item.objectId}}次观看
                            </div>
                            <div class="index_watch_y"></div>
                            <div class="index_watch_time">{{timeCycle(item.mtime)}}</div>
                        </div>
                    </li>
                </ul>
                <div class="item-section-title">随机视频</div>
                <ul class="list-wrap">
                    <li class="item-list" v-for="item in volist.pull">
                        <div class="index-list-bg">
                            <img v-if="item.cover" :src="imgBaseUrl+item.cover" alt="">
                            <img v-else="item.cover" src="../../assets/img-video-default.jpg" alt="">
                            <div class="duration_box">{{item.duration}}</div>
                        </div>
                        <div class="index_list_text_a">{{item.vriTitle}}</div>
                        <div class="index_list_text_c">{{item.zgName}}</div>
                        <div class="index_watch_box">
                            <div class="index_watch_num">
                                {{item.objectId}}次观看
                            </div>
                            <div class="index_watch_y"></div>
                            <div class="index_watch_time">{{timeCycle(item.mtime)}}</div>
                        </div>
                    </li>
                </ul>
                <div class="item-section-title">值得一看</div>
                <ul class="list-wrap">
                    <li class="item-list" v-for="item in volist.rand">
                        <div class="index-list-bg">
                            <img v-if="item.cover" :src="imgBaseUrl+item.cover" alt="">
                            <img v-else="item.cover" src="../../assets/img-video-default.jpg" alt="">
                            <div class="duration_box">{{item.duration}}</div>
                        </div>
                        <div class="index_list_text_a">{{item.vriTitle}}</div>
                        <div class="index_list_text_c">{{item.zgName}}</div>
                        <div class="index_watch_box">
                            <div class="index_watch_num">
                                {{item.objectId}}次观看
                            </div>
                            <div class="index_watch_y"></div>
                            <div class="index_watch_time">{{timeCycle(item.mtime)}}</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
//引入存储
import { mapMutations, mapState,mapActions} from 'vuex'
import { recomMend } from '../../api/goods';
import { imgBaseUrl } from '../../config/env';
import {timeCycle} from '@/config/mUtils';

export default {
    //数据
    data() {
        return {
            volist:{},
            imgBaseUrl,
            timeCycle
        }
    },
    //开始创建  vue后自动执行
    mounted() {
        //console.log(this.pageInfoObj)
        if(this.pageInfoObj){
            this.volist=this.pageInfoObj.rows;
        }else{
            recomMend().then(res => {
                let data = res.rows
                this.volist=data;
            })
        }
        //this.initData();
    },
    //需要使用的模块
    components: {
        
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
        isObjectNull(){
            if(JSON.stringify(this.volist) == "{}"){
                 return 0;
            }else{
                 return 1;
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
        goWatch(obj){
            window.open('/watch?videoId='+obj);
            //console.log(obj)
            //this.$router.push({path:'/LookChannel'})
        }

    },

    //监听
    watch: {

    }
}
</script>
<style lang="scss" scoped>
@import "../../assets/style/mixin";
.videoList_container{
    font-size: 14px;
    display: flex;
    flex-basis:auto;
    flex-direction:row;
    margin-bottom: 16px;
    width: 1340px;
    background-color: #383838;
    .contents{
        width: 100%;
        .item-section{
            .item-section-title{
                color: #eee;
                padding: 20px 0 5px 20px;
                font-size: 16px;
            }
            .list-wrap{
                display: flex;
                flex-wrap:wrap;
                flex-direction:row;
                padding: 10px;
                li{
                    flex-direction:column;
                    display: block;
                    width: 220px;
                    height: 220px;
                    padding: 10px;
                    box-sizing: border-box;
                    cursor: pointer;
                    &:hover{
                        background: #424242;
                        color: #eee;
                        box-shadow: 0 0 24px #212121
                    }
                    .index-list-bg{
                        width: 100%;
                        height: 110px;
                        position: relative;
                        img{
                            width: 100%;
                            height: 100%;
                            cursor: pointer;
                        }
                        .duration_box{
                            min-width: 48px;
                            padding: 0 8px;
                            height: 14px;
                            font-size: 12px;
                            background: #212121;
                            color: #c1c1c1;
                            box-sizing: border-box;
                            text-align: center;
                            line-height: 14px;
                            position: absolute;
                            right: 0;
                            bottom: 4px;
                            z-index: 9;
                        }
                    }
                    .index_list_text_a{
                        height: 40px;
                        line-height: 20px;
                        /* word-wrap: break-word;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        display: -webkit-box; */
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: normal;
                        width: 100%;
                        box-sizing: content-box;
                    }
                    .index_list_text_c{
                        overflow: hidden;
                        text-overflow: ellipsis;
                        height: 14px;
                        line-height: 14px;
                        margin-top: 10px;
                        color: #c1c1c1;
                        &:hover{
                            color: #78d2dc;
                        };
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
                }
            }
        }
    }
}
</style>