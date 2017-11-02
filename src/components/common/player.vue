<template>
    <!-- 组件盒子 -->
    <div class="player_container" v-if="playerData">
        <div class="player_in_box" @mousemove="moveIbv($event)" @mouseover="clearInv($event)" @mouseout="runInv" ref="playerInBox">
            <video ref="payleSize" v-payle-event="{loaderMore,isPlay,fullScreen,setvideoLoadWidth,setItem,getWinWids,setSelectBtnStatus,playInit,isMouseDown,isMouseDownFn,winMoverFn}" preload="load" class="player_video" autoplay="true" :src="playMiveoUrl"></video>
            <div class="player_control" :class="{hoverShow:isHoverShow,hoverHide:!isHoverShow}">
                <div class="v_progress_box" @mousedown="playLinemoveSet($event)">
                    <div class="v_progress_active_x" :style="{width: player.videoLoadWidth+ '%' }"></div>
                    <div class="v_progress_x_box"></div>
                    <div class="v_progress_x" :style="{width:player.playTimeLine+'%'}">
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
                        <div class="v_muted_btn" @mouseover="mutedHover" @mouseout="muteddeer" @click="muted">
                            <i v-if="player.muted == 1" class="iconfont icon-dayinliang"></i>
                            <i v-else class="iconfont icon-jingyin"></i>
                            <transition name="mutedLineShow">
                                <div v-show="mutedLineStatus" class="v_muted_box" ref="abc_1" v-on:click.stop="changeMuted($event)" >
                                    <div class="line_out">
                                        <div class="line_in v_muted_x" :style="{width: (player.volume*100)+ '%' }">
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
                                {{playMiveotext}}
                            </span>
                            <transition name="selectBtnShow">
                                <div v-show="selectBtnStatus == true" class="v_select_p_box unselect">
                                    <div class="select_items">
                                        <div v-if="value"  @click="selectP(key,value)" v-for="(value,key) in comImoveTyoe" class="v_p_item">{{key}}</div>
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
import { setStore, getStore } from '@/config/mUtils'
import {payleEvent} from '@/components/common/mixin';
import { getvideo } from '@/api/index';
import { mapMutations, mapState } from 'vuex';
import { bus } from '@/components/common/bus.js';

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

                muted: 1,//声音状态
                volume: 0.8,//声音初始值
                volumeser:0.8,//声音记录值


                getTime: '00:00',
                allTime: '00:00',
                fullStatus: 0,
                selectShow: false,
                videoLoadWidth: 5,
            },
            selectText: '720P',//清晰度影片
            mutedLineStatus:false,//是否显示声音操作条
            isHoverShow:true,//是否显示播放器控制器
            isQuanpin:false,//是否全屏状态
            playerData:null,//视频信息
            selectBtnStatus:false,//选择切换视频box是否展开

            playMiveotext:'',//播放视频类型中文
            playMiveoUrl:'',//播放视频类型url

            isMouseDown:false,//是否正在执行拖动事件 对document的监听
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
        ...mapState([
            'userInfo'
        ]),
        //计算影片清晰度类型
        comImoveTyoe(){
            return {
                '2160P':this.playerData.url_4k,
                '1440P':this.playerData.url_2k,
                '1080P':this.playerData.url_1080,
                '720P':this.playerData.url_720
            }
        },

        //播放时间线计算
        /*playTimeLine(){
            var sekd=this.player.playTime/this.player.duraTion*100;//this.player.playWidth;
            return sekd;
        }*/
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
            //获取数据后查看本地是否有选择默认影片类型
            this.forMoiveType(getStore('setMovieType'))
        },
        //按下进度条
        playLinemoveSet(event){
            event = event || window.event;
            this.setSelectable(document.body, false);
            this.isMouseDown=true;
        },
        //窗口滑动事件
        winMoverFn(e,el){
            if(this.isMouseDown){
                el.pause();
                var onjd=e.pageX-this.offset(el).left;
                onjd = Math.max(0, onjd);
                onjd = Math.min(onjd, el.offsetWidth);
                var fuso=onjd/el.offsetWidth*100;
                var videoSize=(fuso/100*this.player.duraTion);
                this.player.playTimeLine=fuso;

                el.currentTime=videoSize;
            }
        },
        //窗口抬起取消事件
        isMouseDownFn(e,el){
            if(this.isMouseDown){
                el.pause();
                var onjd=e.pageX-this.offset(el).left;
                onjd = Math.max(0, onjd);
                onjd = Math.min(onjd, el.offsetWidth);
                var fuso=onjd/el.offsetWidth*100;
                var videoSize=(fuso/100*this.player.duraTion);
                this.player.playTimeLine=fuso;

                el.currentTime=videoSize;
            }
            this.isMouseDown=false;
            el.play();
            
        },

        //点击音量调整区域事件
        changeMuted(event){
            event = event || window.event;
            let el=this.$refs.abc_1;
            let elss=this.$refs.payleSize;
            var onjd=event.pageX-this.offset(el).left;
            onjd = Math.max(0, onjd);
            onjd = Math.min(onjd, el.offsetWidth);
            if(onjd==0){
                this.player.muted=0;
                this.player.volume=0;
                this.player.volumeser=0.8;
                elss.volume=this.player.volume;
            }else{
                this.player.muted=1;
                this.player.volume=onjd/100;
                this.player.volumeser=onjd/100;
                elss.volume=this.player.volume;
            }

            //设置存储本地当前音量
            setStore('videoVolumeObj', {
                'muted':this.player.muted,
                'volume':this.player.volume,
                'volumeser':this.player.volumeser,
            });
        },

        //按下音量调整区域事件
        mutedDown(event){
            //event = event || window.event;
            //this.setSelectable(document.body, false);
        },


        //操作body
        setSelectable(obj, enabled) {
            if (enabled) {
                obj.removeAttribute("unselectable");
                obj.removeAttribute("onselectstart");
                obj.style.webkitUserSelect = "";
            } else {
                obj.setAttribute("unselectable", "on");
                obj.setAttribute("onselectstart", "return false;");
                obj.style.webkitUserSelect = "none";
            }
        },


        //抛出播放器初始化设置
        playInit(el){
            //设置初始化声音
            var volumeObj=JSON.parse(getStore('videoVolumeObj'));
            if(volumeObj.muted){
                this.player.muted=1;
                this.player.volume=volumeObj.volumeser;
                el.volume=this.player.volume;
            }else{
                this.player.muted=0;
                this.player.volume=0;
                el.volume=this.player.volume;
            }
            //el.volume=this.player.volume;
            //console.log(el.volume)
        },
        //点击声音按钮事件
        muted() {
            let el=this.$refs.payleSize;
            var volumeObj=JSON.parse(getStore('videoVolumeObj'));
            if (this.player.muted == 1) {
                this.player.muted=0;
                this.player.volume=0;
                el.volume=this.player.volume;
            } else {
                this.player.muted=1;
                this.player.volume=volumeObj.volumeser||this.player.volumeser;
                el.volume=this.player.volume;
            }
            //设置存储本地当前音量
            setStore('videoVolumeObj', {
                'muted':this.player.muted,
                'volume':this.player.volume,
                'volumeser':this.player.volumeser,
            });
        },
        //循环查询匹配类型
        forMoiveType(sta){
            var isDevc=0;
            var isDev=0;
            var key;
            for(key in this.comImoveTyoe){
                if(sta==key){
                    if(this.comImoveTyoe[key]){
                        this.playMiveotext=key;
                        this.playMiveoUrl=this.comImoveTyoe[key];
                    }else{
                        this.playMiveotext='720P';
                        this.playMiveoUrl=this.comImoveTyoe['720P'];
                    }
                }else{
                    isDev++;
                }
                isDevc++;
            }
            if(isDev==isDevc){
                this.playMiveotext='720P';
                this.playMiveoUrl=this.comImoveTyoe['720P'];
            }
        },
        //切换视频清晰度
        selectP(option, url) {
            var that = this;
            if (option != this.playMiveotext) {
                if(!this.userInfo){
                    this.stopPaly();
                    bus.$emit('alertStatus', 2, that.player.playStatus);
                    //设置存储本地当前视频播放时间
                    setStore('videoTime',this.player.playTime);
                }else{
                    //设置影片类型储存本地
                    setStore('setMovieType',option);
                    let itwmVlenght=this.player.playTime;
                    this.playMiveotext=option;
                    this.stopPaly();
                    this.playMiveoUrl=url;
                    console.log(itwmVlenght)
                    this.$refs.payleSize.currentTime=1000;
                    setTimeout(()=>{
                        this.startPaly();
                        console.log(this.$refs.payleSize.currentTime)
                    }, 66)
                    
                }

                /*if (this.user.nickname == '') {
                    bus.$emit('alertStatus', 2, that.player.playStatus);
                    var video = document.getElementsByClassName('player_video')[0];;
                    video.pause();
                    localStorage.setItem('videoTime', video.currentTime);
                    console.log(video.currentTime);
                    console.log('设置时间');
                    this.player.playStatus = 0;
                } else {
                    var that = this;
                    this.player.selectText = option;
                    var video = document.getElementsByClassName('player_video')[0];
                    var canvas_video = document.getElementById('canvas_video');
                    video.pause();
                    var now_time = video.currentTime;
                    video.src = url;
                    canvas_video.src = url;

                    video.currentTime = now_time;
                    canvas_video.currentTime = 0;
                    setTimeout(function() {
                        video.play()
                    }, 66)

                }*/
            }
            //选择框消失
            //this.selectBtnStatus = false;
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
        //暂停视频
        stopPaly(){
            let el=this.$refs.payleSize;
            this.player.playStatus=0;
            el.pause();
        },
        //播放视频
        startPaly(){
            let el=this.$refs.payleSize;
            this.player.playStatus=1;
            el.play();
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

            var sekd=this.player.playTime/this.player.duraTion*100;//this.player.playWidth;
            this.player.playTimeLine=sekd;
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
        },
        offset(curEle) {
            var totalLeft = null,
                totalTop = null,
                par = curEle.offsetParent;
            //首先把自己本身的进行累加
            totalLeft += curEle.offsetLeft;
            totalTop += curEle.offsetTop;

            //只要没有找到body，我们就把父级参照物的边框和偏移量累加
            while (par) {
                if (navigator.userAgent.indexOf("MSIE 8.0") === -1) {
                    //不是标准的ie8浏览器，才进行边框累加
                    //累加父级参照物边框
                    totalLeft += par.clientLeft;
                    totalTop += par.clientTop;
                }
                //累加父级参照物本身的偏移
                totalLeft += par.offsetLeft;
                totalTop += par.offsetTop;
                par = par.offsetParent;
            }
            return {
                left: totalLeft,
                top: totalTop
            };
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
        //overflow: hidden;
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
            height: 40px;
            display: flex;
            align-items: center;
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