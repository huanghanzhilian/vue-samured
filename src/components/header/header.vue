<template>
    <header id='head_top' class="search_1" :style="{paddingRight:scroll+'px'}">
        <!-- 页面进度条 -->
        <div id="loading_box">
            <div class="loadding_x" :class="{loadingAnimationStart:loadingAnimation == 1,loadingAnimationEnd:loadingAnimation == 2||loadingAnimation ==3}">
            </div>
        </div>
        <!-- 页面进度条 -->
        <div class="head_wrop">
            <div class="header_logo_wrap">
                <div class="header_list_logo">
                    <span></span>
                </div>
                <router-link to="/" class="index_logo"></router-link>
            </div>
            <div class="search_box">
                <div class="searchbox_wrap">
                    <div class="searchbox">
                        <div class="search-input">
                            <input type="text" class="header_search ">
                        </div>
                    </div>
                    <button class="search_1">
                        <i class="search_submit iconfont icon-sousuo"></i>
                    </button>
                </div>
            </div>
            <div class="right-box">
                <div class="masthead" v-if="!userInfo">
                    <button class="do_login search_2">登入</button>
                </div>
                <div v-else class="already_login">
                    <div class="top_user_name unselect" v-on:click.stop="userBox = !userBox">
                        {{userInfo.phone}}
                        <div class="login_out_box" v-if="userBox == true">
                            <div class="change_user_btn" @click="changeUser()">
                                更换账号
                            </div>
                            <div class="logout_btn" @click="logoutBtn()">
                                退出登录
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </header>
</template>

<script>
    import { mapMutations, mapState } from 'vuex'
    import { logout } from '@/api/index';
    export default {
        data(){
            return{
                userBox: false,
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
        },
        methods: {
            logoutBtn(){
                logout().then(res=>{
                    if(res.code==200){
                        window.location.reload();
                    }
                });
            }
        },

    }

</script>

<style lang="scss" scoped>
    @import "../../assets/style/mixin";
    .already_login{
        cursor: pointer;
        height: 26px;
        font-size: 12px;
        float: right;
        line-height: 26px;
        text-align: center;
        cursor: pointer;
    }
    #head_top{
        position: fixed;
        width: 100%;
        left: 0;
        top: 0;
        z-index: 51;
        background-color: $blue;
        .head_wrop{
            display: flex;
            box-align: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            height: 45px;
            padding: 0 40px 0 14px;
            background-color: $blue;
            border-bottom: 1px solid rgb(43, 43, 43);
            .header_logo_wrap{
                display: flex;
                align-items: center;
                min-width: 182px;
                .header_list_logo{
                    padding: 8px;
                    margin: 0 16px 0 0;
                    cursor: pointer;
                    span{
                        width:18px;
                        height: 18px;
                        display: block;
                        background: url(http://or4e899x1.bkt.clouddn.com/ytb_list_icon.png) center center no-repeat;
                        background-size: 100% 100%;
                    }
                }
                .index_logo{
                    width: 88px;
                    height: 26px;
                    background: url(http://or4e899x1.bkt.clouddn.com/ytb_logo.png) center center no-repeat;
                    background-size: 100% 100%;
                }
            }
            .search_box{
                flex:1;
                .searchbox_wrap{
                    display: flex;
                    align-items: center;
                    max-width: 338px;
                    border: 1px solid #212121;
                    height: 100%;
                    border-radius: 2px;
                    .searchbox{
                        flex:1;
                        .header_search{
                            -webkit-appearance: none;
                            -webkit-font-smoothing: antialiased;
                            background-color: transparent;
                            border: none;
                            box-shadow: none;
                            font-size: 16px;
                            font-weight: 400;
                            line-height: 26px;
                            margin-left: 4px;
                            max-width: 288px;
                            outline: none;
                            text-align: inherit;
                            width: 100%;
                        }

                    }
                    button{
                        width: 50px;
                        height: 26px;
                        background-color: #2b2b2b;
                        display: inline-block;
                        cursor: pointer;
                        .search_submit{
                            color:#d74647;
                        }
                        /* &:hover{
                            background: #212121;
                        }; */
                    }
                }
            }
            .right-box{
                min-width: 195px;
                .masthead{
                    .do_login{
                        width: 40px;
                        height: 26px;
                        font-size: 12px;
                        color: #e34849;
                        border: 1px solid #545454;
                        float: right;
                        line-height: 26px;
                        text-align: center;
                        cursor: pointer;
                        background: #383838;
                    }
                }

            }
        }
    }

    #loading_box {
        width: 100%;
        height: 2px;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9999;
        .loadding_x {
            height: 4px;
            width: 0;
            background: #e34849;
            position: absolute;
            left: 0;
            top: 0;
        }
        .loadingAnimationStart {
            -webkit-animation: loadingStart 1.6s forwards;
            -o-animation: loadingStart 1.6s forwards;
            animation: loadingStart 1.6s forwards;
        }
        .loadingAnimationEnd {
            -webkit-animation: loadingEnd 0.6s;
            -o-animation: loadingEnd 0.6s;
            animation: loadingEnd 0.6s;
        }
    }
    @keyframes loadingStart {
        0% {
            width: 0;
        }
        100% {
            width: 70%;
        }
    }
    @keyframes loadingEnd {
        0% {
            width: 70%;
        }
        100% {
            width: 100%;
        }
    }
</style>
