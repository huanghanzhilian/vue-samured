<template>
    <!-- 组件盒子 -->
    <div class="player_container" v-if="playerData">
        <div class="player_in_box" @mousemove="moveIbv($event)" @mouseover="clearInv($event)" @mouseout="runInv" ref="playerInBox">
            <video ref="payleSize" v-payle-event="{loaderMore,isPlay,fullScreen,setvideoLoadWidth,setItem,getWinWids,setSelectBtnStatus}" preload="load" class="player_video" autoplay="true" :src="playerData.url_720"></video>
            <div class="player_control" :class="{hoverShow:isHoverShow,hoverHide:!isHoverShow}">
                <div class="v_progress_box">
                    <div class="v_progress_active_x" :style="{width: player.videoLoadWidth+ '%' }"></div>
                    <div class="v_progress_x_box"></div>
                    <div class="v_progress_x" :style="{width:playTimeLine+'%'}">
                        <div class="v_progress_point"></div>
                    </div>
                </div>
                <div class="collseop_box">
                    <div class="collseop_l">
                        <div class="v_play_btn player_control_btn" @click="bntPlay()">
                            <i v-if="player.playStatus == 0" class="iconfont icon-bofang "></i>
                            <i v-else-if="player.playStatus == 1" class="iconfont icon-zanting "></i>
                            <!-- <i class="iconfont icon-huifang "></i> -->
                            <!-- <i class="iconfont icon-bofang icon_aniamtion">
                            </i> -->
                        </div>
                        <div class="v_muted_btn" @mouseover="mutedHover" @mouseout="muteddeer">
                            <i v-if="player.muted == 0" @click="muted()" class="iconfont icon-dayinliang"></i>
                            <i v-else @click="muted()" class="iconfont icon-jingyin"></i>
                            <transition name="mutedLineShow">
                                <div v-show="mutedLineStatus" class="v_muted_box" ref="abc_1" v-on:click.stop="changeMuted($event)">
                                    <div class="line_out">
                                        <div class="line_in v_muted_x">
                                            <div class="line_in_point"></div>
                                        </div>
                                    </div>
                                </div>
                            </transition>
                        </div>
                        <div class="v_time_box unselect">
                            dsd/sss
                        </div>
                    </div>
                    <div class="collseop_r">
                        <div class="v_select_box">
                            <span v-on:click.stop="selectBtnStatus = !selectBtnStatus" class="v_select_span">
                                720P
                            </span>
                            <transition name="selectBtnShow">
                                <div v-if="selectBtnStatus == true" class="v_select_p_box unselect">
                                    <div class="select_items">
                                        <div v-if="playerData.url_4k" @click="selectP('2160P',playerData.url_4k)"
                                        class="v_p_item">
                                            2160P
                                        </div>
                                        <div v-if="playerData.url_2k" @click="selectP('1440P',playerData.url_2k)"
                                        class="v_p_item">
                                            1440P
                                        </div>
                                        <div v-if="playerData.url_1080" @click="selectP('1080P',playerData.url_1080)"
                                        class="v_p_item">
                                            1080P
                                        </div>
                                        <div v-if="playerData.url_720" @click="selectP('720P',playerData.url_720)"
                                        class="v_p_item">
                                            720P
                                        </div>
                                    </div>
                                </div>
                            </transition>
                        </div>

                        <div class="v_full_btn player_control_btn" @click="fullScreen">
                            <i v-if="!isQuanpin" class="iconfont icon-quanping icon_aniamtion"></i>
                            <i v-else class="iconfont icon-tuichuquanping icon_aniamtion"></i>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    </div>
</template>
<script>
//引入存储
//import { setStore, getStore } from '@/config/mUtils'
import {payleEvent} from '@/components/common/mixin';
import { getvideo } from '@/api/index';

export default {
    //数据
    data() {
        return {
            player: {
                playStatus: 1,//播放状态
                playTime: 0,//播放时间
                duraTion:0,//视频总长
                playTimeLine:0,//播放时间线
                playWidth:1120,//实时监听vidle宽度
                muted: 0,//声音状态
                volume: 0.8,


                getTime: '00:00',
                allTime: '00:00',
                fullStatus: 0,
                selectText: '720P',
                selectShow: false,
                videoLoadWidth: 5,
            },
            mutedLineStatus:false,//是否显示声音操作条
            isHoverShow:true,//是否显示播放器控制器
            isQuanpin:false,//是否全屏状态
            playerData:null,//视频信息
            selectBtnStatus:false,//选择切换视频box是否展开
        }
    },
    created(){
        this.videoId = this.$route.query.videoId;
    },
    //开始创建  vue后自动执行
    mounted() {
        //this.player.playWidth=this.$refs.payleSize.offsetWidth;

        //监听win取消全屏事件
        var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
        window.addEventListener(resizeEvt, ()=> {
            if (!this.checkFull()) {
                this.isQuanpin = false;
                //that.fullStatusis = 0;
                //要执行的动作
                //that.player.fullStatus = 0;
            }
        }, false);

        this.initData();
    },
    //需要使用的模块
    components: {

    },

    //父组件的参数书
    props: [],

    //需要引用的外部js方法
    mixins: [payleEvent],

    //计算值 这里可以实时监听某个数据的变化
    computed: {
        //播放时间线计算
        playTimeLine(){
            var sekd=this.player.playTime/this.player.duraTion*100;//this.player.playWidth;
            return sekd;
        }
    },
    updated() {
        // console.log(this.supportIds, this.sortByType)
    },
    //方法
    methods: {
        async initData() {
            //获取数据
            var params = {videoId:this.videoId};
            let res = await getvideo(params);
            this.playerData=res.rows.video;
            console.log(res)
        },
        //判断是否处于全屏函数
        checkFull(){
            var isFull =  document.fullscreenEnabled || window.fullScreen || document.webkitIsFullScreen || document.msFullscreenEnabled;
            if(isFull === undefined) isFull = false;
            return isFull;
        },
        loaderMore(el){

        },
        //操作body关闭某些事件
        setSelectBtnStatus(){
            this.selectBtnStatus=false;
        },
        //按钮点击播放暂停
        bntPlay(){
            let el=this.$refs.payleSize;
            if(this.player.playStatus){
                this.player.playStatus=0;
                el.pause();
            }else{
                this.player.playStatus=1;
                el.play();
            }
        },
        //是否播放/暂停
        isPlay(el){
            if(this.player.playStatus){
                this.player.playStatus=0;
                el.pause();
            }else{
                this.player.playStatus=1;
                el.play();
            }
        },
        //鼠标经过播放器
        clearInv(event){
            event = event || window.event;
            this.isHoverShow=true;

            //console.log(this.$refs.playerInBox.offsetWidth)
            //console.log(this.$refs.payleSize.duration);

            //var win_wid = document.documentElement.offsetWidth || document.body.offsetWidth;
            //console.log(win_wid)
            //计算视频进度条长度
            //console.log(event.screenX)
            //var time_num = ((e.screenX - left) / video.offsetWidth) * video.duration;
        },
        //鼠标离开播放
        runInv(){
            //this.isHoverShow=false;
        },
        //鼠标在播放器滑动
        moveIbv(){
            this.isHoverShow=true;
        },
        //声音按钮经过
        mutedHover(){
            this.mutedLineStatus=true;
        },
        ////声音按钮离开
        muteddeer(){
            this.mutedLineStatus=false;
        },
        //实时获取播放时间
        setItem(el){
            this.player.playTime=el.currentTime;
            this.player.duraTion=el.duration;
        },
        //实时获取video宽度
        getWinWids(num){
            this.player.playWidth=num;
        },
        
        //获取缓存
        setvideoLoadWidth(el,num){
            this.player.videoLoadWidth=num;
            /*console.log(el.duration)
            console.log(num)*/
        },
        //控制全屏方法
        fullScreen(){
            if(this.isQuanpin){
                this.exitFullscreen();
            }else{
                this.launchFullscreen();
            }
        },
        //全屏
        launchFullscreen(){
            var el = document.getElementsByClassName('player_in_box')[0];
            if (el.requestFullscreen) {
                el.requestFullscreen();
                this.isQuanpin=true;
            } else if (el.mozRequestFullScreen) {
                el.mozRequestFullScreen();
                this.isQuanpin=true;
            } else if (el.webkitRequestFullscreen) {
                el.webkitRequestFullscreen();
                this.isQuanpin=true;
            } else if (el.msRequestFullscreen) {
                el.msRequestFullscreen();
                this.isQuanpin=true;
            }
        },
        //取消全屏
        exitFullscreen() {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                this.isQuanpin=false;
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
                this.isQuanpin=false;
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
                this.isQuanpin=false;
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
                this.isQuanpin=false;
            }
        }
    },

    //监听
    watch: {

    }
}
</script>
<style lang="scss" scoped>
//@import 'src/style/mixin';
.player_container{

    background-color: red;
    width: 100%;
    height: 100%;
    position: relative;
    .player_in_box{

        height: 100%;
        width: 100%;
        overflow: hidden;
        position: relative;
        .player_video{
            width: 100%;
            height: 100%;
            position: absolute;
            display: block;
            left: 0;
            top: 0;
            background: #000;
        }
        .player_control{
            width: 100%;
            height: 60px;
            position: absolute;
            left: 0;
            bottom: 0;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            background: rgba(0, 0, 0, 0.4);
            opacity: 1;
            -webkit-transition: all 0.2s;
            transition: all 0.2s;
            &.hoverShow{
                opacity: 1;
            }
            &.hoverHide{
                opacity: 0;
            }
            .v_progress_box{
                /*box-sizing: inherit;*/
                box-sizing:content-box;
                width: 100%;
                height: 4px;
                cursor: pointer;
                position: absolute;
                padding: 5px 0;
                left: 0;
                top: -5px;
                &:hover .v_progress_point{
                    display: block;
                };
                .v_progress_point {
                    width: 20px;
                    height: 20px;
                    position: absolute;
                    right: -10px;
                    top: -8px;
                    border-radius: 50%;
                    display: none;
                    background: #e34849;
                    -webkit-transition: all 0.2s;
                    transition: all 0.2s;
                }

                .v_progress_x_box{
                    width: 100%;
                    height: 4px;
                    background: rgba(255, 255, 255, 0.1);
                    position: absolute;
                    left: 0;
                    top: 5px;
                }
                .v_progress_active_x{
                    min-width: 5px;
                    height: 4px;
                    background: rgba(255, 255, 255, 0.3);
                    position: absolute;
                    left: 0;
                    top: 5px;
                }
                .v_progress_x{
                    min-width: 20px;
                    height: 4px;
                    background: #e34849;
                    position: relative;
                    z-index: 99;
                    border-radius: 2px;
                }
            }
        }
    }
}

.collseop_box{
    display: flex;
    justify-content: space-between;
    padding-top: 7px;
    height: 100%;
    align-items: center;
    padding-left: 15px;
    padding-right: 15px;
    .collseop_l{
        display: flex;
        align-items: center;
        .iconfont {
            font-size: 26px;
        }
        .v_play_btn,.v_muted_btn{
            cursor: pointer;
            padding: 10px;
        }
        .v_muted_btn{
            display: flex;
            align-items: center;
        }
        .v_muted_box{
            width: 100px;
            margin-left: 14px;
            height: 4px;
            cursor: pointer;
            /* display: none; */
            .line_out{
                width: 100%;
                height: 4px;
                background: #eee;
                .line_in{
                    background: #e34849;
                    width: 80%;
                    max-width: 100%;
                    height: 100%;
                    position: relative;
                    .line_in_point{
                        width: 16px;
                        height: 16px;
                        position: absolute;
                        right: -8px;
                        top: 50%;
                        margin-top: -8px;
                        background: #e34849;
                        border-radius: 50%;
                    }
                }
            }
        }
        .v_time_box{
            color: #eee;
            margin-left: 14px;
        }
    }
    .collseop_r{
        display: flex;
        align-items: center;
        height: 100%;
        .iconfont {
            font-size: 26px;
        }
        .v_select_box{
            height: 100%;
            line-height: 52px;
            position: relative;
            cursor: pointer;
            padding: 0 28px;
            .v_select_p_box{
                position: absolute;
                bottom: 60px;
                left: 0;
                width: 100%;
                text-align: center;
                //height: 206px;
                color: #828282;
                .select_items{
                    .v_p_item{
                        background: #2b2b2b;
                        &:hover{
                            color:eee;
                            background-color: #383838;
                        };
                    }
                }
            }
        }
        .v_full_btn{
            margin-left: 24px;
            cursor: pointer;
        }
    }
}

.mutedLineShow-enter-active, .mutedLineShow-leave-active {
    transition: all .3s;
}
.mutedLineShow-enter, .mutedLineShow-leave-active {
    width: 0px !important;
    opacity: 0;
}
.selectBtnShow-enter-active, .selectBtnShow-leave-active {
    transition: all .3s;
}
.selectBtnShow-enter, .selectBtnShow-leave-active {
    opacity: 0;
}
</style>