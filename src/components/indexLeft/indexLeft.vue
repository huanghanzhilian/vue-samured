<template>
    <div class="indexLeft_container">
        <div class="scrim">
            <div class="guide-wrapper" @mouseover="moveIbv($event)" @mouseout="mooutIbv($event)">
                <div class="guide-spacer"></div>
                <div class="guide-content" :class="{isShowScrollbar:isShowScrollbar}">
                    <div class="tablist">
                        <div class="tab-item" :class="[{go_btn :$route.path.indexOf('/') == 0&&$route.path=='/'}]" @click="goTab('/')">
                            <i class="iconfont icon-shouye left_icon"></i>
                            首页{{loadingAnimation}}
                        </div>
                        <div class="tab-item" :class="[{go_btn :$route.path.indexOf('LookChannel') !== -1}]" @click="goTab('/LookChannel')">
                            <i class="iconfont icon-liulanpindao1 left_icon"></i>
                            浏览频道
                        </div>
                        <div class="tab-item" :class="[{go_btn :$route.path.indexOf('gameClass') !== -1}]" @click="goTab('/gameClass')">
                            <i class="iconfont icon-liulanpindao1 left_icon"></i>
                            游戏分类
                        </div>
                        <div class="tab-item" v-if="userInfo">
                            <i class="iconfont icon-lishijilu left_icon"></i>
                            历史记录
                        </div>
                        <div v-else style="color: #636363;" class="tab-item" @click="alertLogin">
                            <i class="iconfont icon-lishijilu left_icon busk"></i>
                            历史记录
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        
    </div>
</template>

<script>
    import { mapMutations, mapState,mapActions} from 'vuex';
    import { bus } from '@/components/common/bus.js';
    export default {
        data(){
            return{
                isShowScrollbar:false,//是否显示元素滚动条
                setPage:'',
            }
        },
        mounted(){
            //获取用户信息
            //this.getUserInfo();
        },
        //props: ['signinUp', 'headTitle', 'goBack'],
        computed: {
            ...mapState([
                'scroll','loadingAnimation','userInfo'
            ]),
            //计算获取滚动条宽度
            getScrollWidth() {
                var noScroll, scroll, oDiv = document.createElement("DIV");
                oDiv.style.cssText = "position:absolute; top:-1000px; width:100px; height:100px; overflow:hidden;";
                noScroll = document.body.appendChild(oDiv).clientWidth;
                oDiv.style.overflowY = "scroll";
                scroll = oDiv.clientWidth;
                document.body.removeChild(oDiv);
                return noScroll - scroll;
            }
        },
        methods: {
            ...mapMutations([
                'SET_SCROLLBAR',
            ]),
            ...mapActions([
                'getPageinfo'
            ]),
            moveIbv(event) {
                this.isShowScrollbar = true;
                this.SET_SCROLLBAR(this.getScrollWidth);
            },
            mooutIbv(event) {
                this.isShowScrollbar = false;
                this.SET_SCROLLBAR(0);
            },
            goTab(obj){
                this.setPage='';
                this.setPage=obj;
                //初始化进度条
                this.getPageinfo(obj);
            },
            alertLogin(){
                bus.$emit('alertStatus', 1);
            }

        },
        //监听
        watch:{
            isShowScrollbar: function(novel,old){
                if(novel){
                    document.body.style.overflowY="hidden";
                }else{
                    document.body.style.overflowY="scroll";
                }
            },
            loadingAnimation:function(novel,old){
                if(novel==2){
                    // setTimeout(()=> {
                    //     this.$router.push({path:this.setPage})
                    // }, 600)
                    this.$router.push({path:this.setPage})
                }
            }
        }

    }

</script>

<style lang="scss" scoped>
    @import "../../assets/style/mixin";
    .indexLeft_container{
        position: fixed;
        top: -120px;
        right: 0;
        bottom: -120px;
        left: 0;
        /*visibility: hidden;*/
        width: 220px;
        padding-top: 45px;
        z-index: 50;
        background: #383838;
        /*transition-property: visibility;*/
    }
    .scrim{
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        padding: 120px 0 120px 0;
        overflow: hidden;
    }
    .guide-wrapper {
        overflow: hidden;
        height: 100%;
        display: flex;
        -ms-flex-direction: column;
        -webkit-flex-direction: column;
        flex-direction: column;
    }
    .guide-spacer {
        margin-top: 56px;
    }
    .guide-content {
        -ms-flex: 1 1 0.000000001px;
        -webkit-flex: 1;
        flex: 1;
        overflow-y: hidden;
        &.isShowScrollbar{
            overflow-y: auto;
        }
    }
    .guide-content::-webkit-scrollbar-thumb {
        height: 56px;
        background: hsla(0, 0%, 53.3%, .4);
    }

    .guide-content::-webkit-scrollbar {
        width: 8px;
    }
    
    .tab-item{
        width: 100%;
        height: 28px;
        line-height: 28px;
        font-size: 14px;
        color: #c1c1c1;
        padding-left: 38px;
        box-sizing: border-box;
        font-weight: 400;
        cursor: pointer;
        position: relative;
        &:hover {
            background: #424242;
            color: #eee
        }
        .busk{
            color: rgb(99, 99, 99);
        }
    }
    .go_btn{
        background: #e34849;
        color: #eee;
        &:hover {
            background: #e34849;
            color: #eee
        }
    }
</style>
