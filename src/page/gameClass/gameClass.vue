<template>
    <!-- 组件盒子 -->
    <div class="gameClass_container" v-if="gameList.length">
        <div class="gameClass_wrap" ref="gameClass">
            <div class="game_page_top">
                <div class="game_filter_btn">过滤条件<i class="iconfont icon-zhixiangjiantou1"></i></div>
                <div class="game_filter_box">
                    <div class="game_filter game_filter_a">
                        <div class="filter_left">平台</div>
                        <div class="filter_right">
                            <div class="filter texth unselect" v-for="(item,index) in filterPT" :class="{filter_in:item.status==1}" @click="filterBtn(1,index)">{{item.name}}</div>
                        </div>
                    </div>
                    <div class="game_filter game_filter_b">
                        <div class="filter_left">游戏类型</div>
                        <div class="filter_right">
                            <div class="filter texth unselect" v-for="(item,index) in filterGame" :class="{filter_in:item.status==1}" @click="filterBtn(2,index)">{{item.name}}</div>
                        </div>
                    </div>
                    <div class="game_filter game_filter_c">
                        <div class="filter_left">内容类型</div>
                        <div class="filter_right">
                            <div class="filter texth unselect" v-for="(item,index) in filterContent" :class="{filter_in:item.status==1}" @click="filterBtn(3,index)">{{item.name}}</div>
                        </div>
                    </div>
                    <div class="filter_btn_box">
                        <span class="filter_btn cubtn" @click="goGameTypes()">筛选</span>
                        <span class="filter_btn cubtn" @click="clearSelect()">清除</span>
                    </div>
                </div>
            </div>
            <div class="gameClass_box" v-for="item in gameList" v-if="item.videos.length">
                <game-channel :gameList="item" :status="true"></game-channel>
            </div>
            <div v-show="showLoading" class="game_channel_box bottom_loading">加载中...</div>
            <div v-if="touchend" class="game_channel_box bottom_loading">没有更多了</div>
        </div>
    </div>
</template>
<script>
import gameChannel from '@/components/common/gameChannel';
import { getGameList } from '@/api/index';
import {loadMore} from '@/components/common/mixin';
import { mapMutations, mapState,mapActions} from 'vuex'

export default {
    //数据
    data() {
        return {
            contentType:'-1',
            gameType:'-1',
            pingtai:'-1',
            page:1,//页数
            gameList:[],

            touchend: false, //没有更多数据不再加载
            preventRepeatReuqest: false, //到达底部加载数据，防止重复加载
            showLoading: true, //显示加载动画

            filterPT: [{
                index: 0,
                name: 'PlayStation',
                status: 0,
                key: 'PS3;PS4;'
            }, {
                index: 1,
                name: 'XBOX',
                status: 0,
                key: 'Xbox360;XboxOne;'
            }, {
                index: 2,
                name: 'Nintendo',
                status: 0,
                key: 'NS;',
            }, {
                index: 3,
                name: 'PC',
                status: 0,
                key: 'PC;'
            }],
            filterGame: [{
                index: 0,
                name: '桌面',
                status: 0,
            }, {
                index: 1,
                name: '音乐',
                status: 0,
            }, {
                index: 2,
                name: '益智',
                status: 0,
            }, {
                index: 3,
                name: '文字冒险',
                status: 0,
            }, {
                index: 4,
                name: '体育',
                status: 0,
            }, {
                index: 5,
                name: '射击',
                status: 0,
            }, {
                index: 6,
                name: '其他',
                status: 0,
            }, {
                index: 7,
                name: '竞速',
                status: 0,
            }, {
                index: 8,
                name: '角色扮演',
                status: 0,
            }, {
                index: 9,
                name: '即时策略',
                status: 0,
            }, {
                index: 10,
                name: '格斗',
                status: 0,
            }, {
                index: 11,
                name: '动作冒险',
                status: 0,
            }, {
                index: 12,
                name: '动作角色扮演',
                status: 0,
            }, {
                index: 13,
                name: '第一人称射击',
                status: 0,
            }, {
                index: 14,
                name: '第三人称射击',
                status: 0,
            }, {
                index: 15,
                name: '策略角色扮演',
                status: 0,
            }, {
                index: 16,
                name: '策略',
                status: 0,
            }, {
                index: 17,
                name: '多人在线竞技',
                status: 0,
            }, {
                index: 18,
                name: 'MMORPG',
                status: 0,
            }, ],
            filterContent: [{
                index: 0,
                name: '宣传片',
                status: 0,
            }, {
                index: 1,
                name: '大型活动',
                status: 0,
            }, {
                index: 2,
                name: '试玩演示',
                status: 0,
            }, {
                index: 3,
                name: '评测',
                status: 0,
            }, {
                index: 4,
                name: '对比',
                status: 0,
            }, {
                index: 5,
                name: '成就奖杯',
                status: 0,
            }, {
                index: 6,
                name: '指南',
                status: 0,
            }, {
                index: 7,
                name: '通关流程',
                status: 0,
            }, {
                index: 8,
                name: '精彩集锦',
                status: 0,
            }, {
                index: 9,
                name: '搞笑',
                status: 0,
            }, {
                index: 10,
                name: '赛事精选',
                status: 0,
            }, {
                index: 11,
                name: '娱乐解说',
                status: 0,
            }, {
                index: 12,
                name: '高玩',
                status: 0,
            }, {
                index: 13,
                name: '游戏文化',
                status: 0,
            }, {
                index: 14,
                name: '流言',
                status: 0,
            }, {
                index: 15,
                name: '真人综艺',
                status: 0,
            }, {
                index: 16,
                name: '硬件周边',
                status: 0,
            }, ],
            selectData:[],//多选数组
            isShowsoll:false
        }
    },
    //开始创建  vue后自动执行
    mounted() {
        if(this.pageInfoObj){
            this.slides=this.pageInfoObj.rows;
            this.gameList=this.pageInfoObj.rows;
            //是否请求成功，
            if (this.pageInfoObj.currentPage == this.pageInfoObj.lastPage) {
                this.touchend = true;
                return
            }
            this.showLoading=false;
            this.isShowsoll=true;
            document.addEventListener("scroll", this.loaderbuttom);
        }else{
            this.getpres();
            this.initData();
            document.addEventListener("scroll", this.loaderbuttom);
        }
    },
    //需要使用的模块
    components: {
        gameChannel
    },

    //父组件的参数书
    props: [],

    //需要引用的外部js方法
    mixins: [loadMore],

    //计算值 这里可以实时监听某个数据的变化
    computed: {
        ...mapState([
            'pageInfoObj'
        ]),
        goGameType(){
            var contentType = '';
            var gameType = '';
            var pingtai = '';
            for (var i = 0; i < this.filterPT.length; i++) {
                if (this.filterPT[i].status == 1) {
                    pingtai += (i + '-');
                }
            }
            for (var i = 0; i < this.filterContent.length; i++) {
                if (this.filterContent[i].status == 1) {
                    contentType += (i + '-');
                }
            }
            for (var i = 0; i < this.filterGame.length; i++) {
                if (this.filterGame[i].status == 1) {
                    gameType += (i + '-');
                }
            }
            return {pingtai,contentType,gameType}
        },
        
    },
    updated() {
        // console.log(this.supportIds, this.sortByType)
    },
    //方法
    methods: {
        ...mapMutations([
            'SET_SCROLLBARW'
        ]),
        //执行赛选
        goGameTypes(){
            this.$router.push({path: '/gameClass', query: this.goGameType});
        },
        //计算参数
        getpres(){
            var contentType=this.$route.query.contentType;
            var gameType=this.$route.query.gameType;
            var pingtai=this.$route.query.pingtai;
            if(contentType){
                var contentArr = contentType.split("-");
                this.contentType='';
                for (var i = 0; i < contentArr.length; i++) {
                    if (contentArr[i] != '') {
                        this.filterContent[contentArr[i]].status = 1;
                        this.contentType += ((this.filterContent[contentArr[i]].index + 1) + '-');
                    }
                }
                this.contentType = this.contentType.substr(0, this.contentType.length - 1);
            }else{
                this.contentType =-1;
            }
            if(gameType){
                var gameArr = gameType.split("-");
                this.gameType='';
                for (var i = 0; i < gameArr.length; i++) {
                    if (gameArr[i] != '') {
                        this.filterGame[gameArr[i]].status = 1;
                        this.gameType += (this.filterGame[gameArr[i]].name + '-');
                    }
                }
                this.gameType = this.gameType.substr(0, this.gameType.length - 1);
            }else{
                this.gameType =-1;
            }
            if(pingtai){
                var pingtaiArr = pingtai.split("-");
                this.pingtai='';
                for (var i = 0; i < pingtaiArr.length; i++) {
                    if (pingtaiArr[i] != '') {
                        this.filterPT[pingtaiArr[i]].status = 1;
                        this.pingtai += this.filterPT[pingtaiArr[i]].key;
                    }
                }
                this.pingtai = this.pingtai.substr(0, this.pingtai.length - 1);
            }else{
                this.pingtai =-1;
            }

        },
        //清除筛选
        clearSelect: function() {
            for (var i = 0; i < this.filterPT.length; i++) {
                this.filterPT[i].status = 0;
            }
            for (var i = 0; i < this.filterGame.length; i++) {
                this.filterGame[i].status = 0;
            }
            for (var i = 0; i < this.filterContent.length; i++) {
                this.filterContent[i].status = 0;
            }
            this.goGameTypes();
        },
        //多选
        filterBtn(o,i){
            var arr = this.selectData;
            var selectItem = o + '' + i;

            if (o == 1) {
                if (this.filterPT[i].status == 0) {
                    this.filterPT[i].status = 1;
                } else {
                    this.filterPT[i].status = 0;
                }
            } else if (o == 2) {
                if (this.filterGame[i].status == 0) {
                    this.filterGame[i].status = 1;
                } else {
                    this.filterGame[i].status = 0;
                }
            } else {
                if (this.filterContent[i].status == 0) {
                    this.filterContent[i].status = 1;
                } else {
                    this.filterContent[i].status = 0;
                }
            }
            var index = arr.indexOf(selectItem);
            if (index >= 0) {
                arr.splice(index, 1);
            } else {
                arr.push(selectItem);
            }
            this.selectData = arr;
        },

        async initData() {
            if(this.isShowsoll){
                this.SET_SCROLLBARW(1);
            }
            //获取数据
            var params = {contentType:this.contentType,gameType:this.gameType,page:this.page};
            let res = await getGameList(params);
            this.gameList=res.rows;
            //是否请求成功，
            if (res.currentPage == res.lastPage) {
                this.touchend = true;
                return
            }
            this.showLoading=false;
            if(this.isShowsoll){
                this.SET_SCROLLBARW(2);
            }
            this.isShowsoll=true;
        },
        
        //到达底部加载更多数据
        async loaderMore(){
            
            if (this.touchend) {
                return;
            }
            //防止重复请求
            if (this.preventRepeatReuqest) {
                return;
            }
            this.showLoading = true;
            this.preventRepeatReuqest = true;

            //数据页码+1
            this.page+=1;

            //添加数据
            var params = {contentType:this.contentType,gameType:this.gameType,page:this.page};
            let res = await getGameList(params);
            this.showLoading=false;
            this.gameList=[...this.gameList,...res.rows];
            //this.lis = [...this.lis, ...res.data.games];
            //当获取数据小于20，说明没有更多数据，不需要再次请求数据

            if (res.currentPage == res.lastPage) {
                this.touchend = true;
                return
            }
            this.preventRepeatReuqest = false;
        },
        //到底部加载
        loaderbuttom(){
            /*console.log(1)
            var dqy = document.documentElement.clientHeight;
            var sTop = document.documentElement.scrollTop || document.body.scrollTop;
            var h = document.documentElement.scrollHeight || document.body.scrollHeight;
            if(h==(dqy+sTop)){
                console.log(1)
                //this.loaderMore();
            }*/
            if (document.body.scrollTop + window.innerHeight >= this.$refs.gameClass.clientHeight) {
                this.loaderMore();
            }
            //console.log(this.$refs.a.clientHeight)
        },
    },
    beforeDestroy(){
        if (window.removeEventListener) {
            document.removeEventListener('scroll', this.loaderbuttom, false);
        } else {
            document.detachEvent('onscroll',this.loaderbuttom );
        }
    },

    //监听
    watch: {
        // 如果路由有变化，会再次执行该方法
        $route(to,fors) {
            console.log(1)
            if(to.query!=fors.query){

                this.getpres();
                this.initData();
            }
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../../assets/style/common';
.gameClass_wrap{
    font-size: 14px;
    //display: flex;
    //flex-basis:auto;
    //flex-direction:row;
    //margin-bottom: 16px;
    width: 1340px;
    background: rgb(56,56,56);
}
.gameClass_box{
    width: 100%;
    padding: 0 10px;

}
.bottom_loading{
    text-align: center;
    padding: 20px;
    font-size: 14px;
    color: #c1c1c1;
    cursor: pointer;
}
.bottom_loading:hover{
    color: #eee;
}

.game_page_top{
    padding: 20px 20px 8px;
    .game_filter_btn {
        width: 80px;
        height: 24px;
        line-height: 22px;
        border: 1px solid #545454;
        color: #c1c1c1;
        cursor: pointer;
        font-size: 12px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        padding-left: 6px;
        .iconfont {
            font-size: 12px;
        }
    }
    .game_filter_box{
        .game_filter{
            margin-top: 6px;
            display: flex;
            //align-items: center;
            &.game_filter_a{
                margin-top: 14px;
            }
            .filter_left{
                width: 60px;
                margin-right: 20px;
                line-height: 24px;
                text-align-last: justify;
            }
            .filter_right{
                flex: 1;
                display: flex;
                flex-wrap: wrap;
                .filter{
                    cursor: pointer;
                    //margin-bottom: 10px;
                    margin-right: 20px;
                    //height: 14px;
                    line-height: 24px;
                    color: #828282;
                    &.filter_in{
                        color: #e34849;
                        &:hover{
                            color: #e34849 !important;
                        };
                    }
                }
            }
        }
    }
    .filter_btn_box{
        text-align: right;
        .filter_btn{
            padding: 0 10px;
            margin-left: 10px;
        }
    }
}
</style>