<template>
    <div class="game_channel_box">
        <div class="game_channel_in_box">
            <div class="d_i_main_ul">
                <ul class="main_in_ul" v-bind:style="{left: -(liIndex*liWidth) +'px'}">
                    <li v-if="gameChildLis" class="index_main_li" v-for="(item,index) in gameChildLis">
                        <div class="index_list_bg" @click="goWatch(item.objectId)">
                            <img  v-bind:src="imgBaseUrl+item.cover">
                            <div class="duration_box">{{item.duration}}</div>
                        </div>
                        <div class="index_list_text_a" @click="goWatch(item.objectId)">{{item.name}}</div>
                        <div class="index_list_text_c" @click="goDetail(item.game_id)"></div>
                        <div class="index_watch_box">
                            <div class="index_watch_num">{{item.watch_num}}次观看</div>
                            <div class="index_watch_y"></div>
                            <div class="index_watch_time">{{timeCycle(item.mtime)}}</div>
                        </div>
                    </li>
                </ul>
            </div>
            <div v-if="liIndex!=0" class="d_i_left" @click="leftBtn()">
                <i class="iconfont icon-fanyejiantou1"></i>
            </div>
            <div v-if="liIndex!=liMaxLength" class="d_i_right" @click="rightBtn()">
                <i class="iconfont icon-fanyejiantou"></i>
            </div>
        </div>
    </div>
</template>

<script>
import { imgBaseUrl } from '@/config/env';
import {timeCycle} from '@/config/mUtils';
    //import qs from 'qs'
    //import bus from  '../../eventbus'
    export default{
    data(){
        return {
        imgBaseUrl,
        timeCycle,
        lis:[

        ],
        liWidth:880,
        liIndex:0,
        liMaxLength:0,
        }
    },
    components: {},
    mounted: function () {
        var that = this;

        function getWindowWidth() {
            var window_wid = document.documentElement.offsetWidth || document.body.offsetWidth;
            if (window_wid >= 1600) {
                that.liWidth = 1110;
            } else if (window_wid > 1375 && window_wid < 1600) {
                that.liWidth = 880;
            } else if (window_wid > 1250 && window_wid < 1375) {
                that.liWidth = 660;
            } else if (window_wid > 1140 && window_wid < 1250) {
                that.liWidth = 660;
            } else if (window_wid > 910 && window_wid < 1140) {
                that.liWidth = 660;
            } else {
                that.liWidth = 660;
            }
        }
        getWindowWidth();


        function getData() {
            setTimeout(function() {
                if (that.gameChildLis != undefined) {
                    //长度  
                    var length = that.gameChildLis.length;
                    //box/list=一页个数
                    var num = (that.liWidth / 220);
                    if((length % num)==0){

                        that.liMaxLength = (length / num)-1;
                    }else{
                        var index = Math.floor(length / num);
                        that.liMaxLength = index;
                    }
                    

                } else {
                    //getData()
                }
            }, 1000)
        }
        getData()
    },
    //方法
    methods: {
        orderBtn: function(option, num) {
            /*var that = this;
            if (that.user.nickname != '') {

                this.$http.post(this.reqUrl + '/subscribe/add_subscribe', qs.stringify({
                    game_id: option
                })).then(res => {
                    if (res.data.object) {
                        that.gameChildLis.subscribed_status = true;
                        bus.$emit('newOrder', {
                            index: 1,
                            id: option
                        });
                    }
                });


            } else {
                bus.$emit('alertStatus', 1);
            }*/

        },
        cancelOrder: function(option) {
            /*var that = this;
            if (that.user.nickname != '') {

                this.$http.post(this.reqUrl + '/subscribe/remove_subscribe', qs.stringify({
                    game_id: option
                })).then(res => {
                    if (res.data.object) {
                        that.gameChildLis.subscribed_status = false;
                        bus.$emit('newOrder', {
                            index: 2,
                            id: option
                        });
                    }
                });
            } else {
                bus.$emit('alertStatus', 1);
            }*/
        },
        goDetail: function(option) {
            window.location.href = this.localUrl + 'detailTv?gameId=' + option
        },
        //左按钮
        leftBtn: function() {
            this.liIndex -= 1
        },
        //右按钮
        rightBtn: function() {
            this.liIndex += 1
        }
    },

    props: [
        'gameChildLis',
        'user',
    ],
    }
</script>


<style lang="scss" scoped>
.game_channel_box {
    width: 100%;
    position: relative;
    padding-left: 10px;
    margin: 0 auto;
    box-sizing: border-box;
    background: rgb(56, 56, 56);
}

.game_channel_in_box {
    width: 100%;
    overflow: hidden;
}

.game_channel_in_box .main_title {
    width: 100%;
    font-size: 16px;
    line-height: 16px;
    height: 16px;
    position: relative;
    color: #eee;
    padding: 16px 0 6px 10px;
}

.game_channel_in_box .main_title .title_text {
    width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 16px;
    cursor: pointer;
    color: #c1c1c1;
    position: relative;
    z-index: 99;
}

.game_channel_in_box .main_title .title_text:hover {
    color: #eee;
}

.game_channel_in_box .order_box {
    height: 20px;
    line-height: 20px;
    font-size: 12px;
    text-align: center;
    position: absolute;
    right: 30px;
    bottom: 3px;
}

.d_i_main_ul {
    width: 100%;
    height: 225px;
    margin-right: -10px;
    overflow: hidden;
    position: relative;
}

.main_in_ul {
    width: 1000000px;
    max-height: 100%;
    margin-right: -10px;
    overflow: hidden;
    position: absolute;
    left: 0;
    top: 0;
    transition: left 0.5s;
    padding-bottom: 5px;
}

.index_main_li {
    width: 220px;
    height: 220px;
    padding: 10px;
    box-sizing: border-box;
    float: left;
}

.index_list_bg {
    width: 100%;
    height: 110px;
    position: relative;
}

.index_list_bg {
    width: 100%;
    height: 110px;
    background: #ccc;
}

.index_list_bg img {
    width: 100%;
    height: 100%;
    cursor: pointer;
}

.index_list_text_a {
    width: 100%;
    height: 40px;
    line-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;

    

    font-size: 14px;

    cursor: pointer;
}

.index_list_text_c {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 14px;
    line-height: 14px;
    font-size: 14px;
    -webkit-box-sizing: content-box;
    -moz-box-sizing: content-box;
    box-sizing: content-box;
    cursor: pointer;
}

.index_list_text_a {
    margin-top: 7px;
    color: #c1c1c1;
}

.index_list_text_b {
    padding-top: 5px;
    color: #c1c1c1;
}

.index_list_text_c {
    margin-top: 10px;
    color: #c1c1c1;
}

.index_main_li:hover {
    background: #424242;
}

.index_main_li:hover .index_list_text_a {
    color: #eee;
}

.index_main_li:hover .index_list_text_b {
    color: #eee;
}

.index_main_li:hover .index_list_text_c {
    color: #78d2dc;
}

.index_main_li .index_list_text_c:hover {
    color: #acecef;
}

.index_watch_box {
    width: 100%;
    height: 12px;
    line-height: 12px;
    padding-top: 10px;
    color: #636363;
    font-size: 12px;
}

.index_main_li:hover .index_watch_box {
    color: #828282;
}

.index_watch_y {
    width: 1px;
    height: 100%;
    background: #636363;
    float: left;
}

.index_watch_num, .index_watch_time {
    float: left;
}

.index_watch_num {
    padding-right: 5px;
}

.index_watch_time {
    padding-left: 5px;
}

.d_i_left, .d_i_right {
    width: 20px;
    height: 60px;
    line-height: 60px;
    position: absolute;
    top: 50%;
    margin-top: -30px;
    color: #c1c1c1;
    font-size: 16px;
    text-align: center;
    transition: all 0.3s;
    cursor: pointer;
}

.game_channel_box:hover .d_i_left {
    width: 40px;
    background: #383838;
    -webkit-box-shadow: 0 0 8px rgba(0, 0, 0, 0.8);
    -moz-box-shadow: 0 0 8px rgba(0, 0, 0, 0.8);
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.8);
    left: -20px;
}

.game_channel_box:hover .d_i_right {
    width: 40px;
    background: #383838;
    -webkit-box-shadow: 0 0 8px rgba(0, 0, 0, 0.8);
    -moz-box-shadow: 0 0 8px rgba(0, 0, 0, 0.8);
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.8);
    right: -20px;
}

.d_i_left {
    left: 0;
}

.d_i_right {
    right: 0;
}

.detail_tv_page {
    padding: 0 20px;
}
.duration_box {
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

</style>
