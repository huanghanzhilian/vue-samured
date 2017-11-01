<template>
    <!-- 组件盒子 -->
    <div class="login_container">
        <div class="login_wrap">
            <router-link  :to="{path: '/'}" tag='a' class="login_logo"></router-link>
            <div class="login_box">
                <div class="login_top_tip" v-if="loginStatus == 2||loginStatus==3">
                    重置密码
                </div>
                <!-- userid -->
                <div class="login_user_box" :class="{error_input:userStatus == 'false' && userId != '' }">
                    <i v-if="userStatus == 'false' && userId !=''" class="iconfont icon-cuo" @click="clearUserId()"></i>
                    <i v-if="userStatus == 'true' && loginStatus != 2" class="iconfont icon-dui"></i>

                    <input v-if="loginStatus == 2||loginStatus==3" type="password" v-model="repwd" placeholder="输入密码" class="login_input">

                    <input v-else type="text" @focus="userFocus()" @blur="userBlur()" placeholder="手机号 | 邮箱 | 用户ID" class="login_input" v-model="userId">
                </div>

                <!-- password -->
                <div class="login_user_box" :class="{error_input:pwdStatus == 'false' && pwd != '' }">
                    <input v-if="loginStatus == 0" type="password" placeholder="密码" class="login_input" v-model="pwd">

                    <input v-else-if="loginStatus == 2||loginStatus==3" type="password" @focus="pwdFocus()"
                    v-model="pwd" placeholder="再次输入密码" class="login_input">

                    <input v-else-if="loginStatus == 1" maxlength="8" type="password" @blur="codeBlur()"
                    @focus="pwdFocus()" v-model="pwd" placeholder="验证码" class="login_input">
                    <div class="codeTime" v-if="loginStatus ==1&&codeTime>0">
                        {{codeTime}}s
                    </div>
                </div>


                <div class="login_btn_box" v-if="loginStatus == 0">
                    <div @click="loginBtn()" class="login_btn_list login_btn" v-if="userStatus == 'true' && pwd.length > 0 ">
                        登录
                    </div>
                    <div v-else class="login_btn_list">登录</div>
                    <div class="login_btn_list go_reg">注册</div>
                </div>
                <div class="login_btn_box" v-else-if="loginStatus == 1">
                    <div @click="loginBtn()" class="login_btn_list login_btn" v-if="userStatus == 'true' && pwd.length > 0 ">
                        重置密码
                    </div>
                    <div class="login_btn_list" v-else>
                        重置密码
                    </div>
                    <div class="login_btn_list go_reg" @click="goReg()">
                        注册
                    </div>
                </div>

                <div class="login_btn_box" v-else-if="loginStatus == 2||loginStatus==3">
                    <div @click="loginBtn()" style="color: #e34849;" class="login_btn_list login_btn"
                    v-if="repwd .length>0 && pwd.length > 0 ">
                        确定
                    </div>
                    <div v-else class="login_btn_list">
                        确定
                    </div>
                </div>

                <!-- 底部提示 -->

                <div class="login_tip" v-if="pwdStatus == 'false' && loginStatus==0">
                    <div class="tip_pwd_error">
                        密码错误,请重新输入
                    </div>
                    <i></i>
                    <div class="forget_pwd" @click="forgetBtn()">
                        忘记密码?
                    </div>
                </div>
                <div class="login_tip" v-else-if="loginStatus == 1">
                    <div class="tip_pwd_error">
                        验证码已经发送到您手机
                    </div>
                    <i>
                    </i>
                    <div class="forget_pwd" @click="forgetBtn()">
                        再次发送?
                    </div>
                </div>


            </div>
        </div>
    </div>
</template>
<script>
//引入存储
//import { setStore, getStore } from '@/config/mUtils'
import { goLogin } from '@/api/index';

export default {
    //数据
    data() {
        return {
            loginStatus: 0,//登入页状态
            userStatus: '',//用户信息状态
            pwdStatus: '',//密码状态
            codeTime: 60,//倒计时时间
            userId: '',//
            pwd: '',//密码
            repwd:'',
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
    props: [],

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
        //用户输入聚焦
        userFocus(){

        },
        //用户输入失焦
        async userBlur(){
            if(this.userId){
                var params = {phone:this.userId};
                let res = await goLogin(params);
                if(res['msg'] == '请输入密码'){
                    this.userStatus='true';
                }else{
                    this.userStatus='false';
                }
            }
        },
        //清除用户名
        clearUserId() {
            this.userId = ''
        },
        //手机号登入
        async loginBtn(){
            if(this.loginStatus == 0){
                var params = {phone:this.userId,password:this.pwd};
                let res = await goLogin(params);
                if(res.code==200){
                    this.$router.go(-1);
                }else{
                    this.pwdStatus='false';
                }
                console.log(res)
            }else if (this.loginStatus == 1) {
                //手机重置密码
                /*this.$http.post(this.reqUrl + '/account/forgot/phone/code_verify', qs.stringify({
                    phone: username,
                    code: pwd
                })).then(res => {
                    that.loginStatus = 2;
                    var url = window.location.href;
                    that.pwd = '';
                    window.location.href = this.localUrl + 'login?code=' + pwd + '&phone=' + username;
                })*/
                this.loginStatus = 2;
                this.$router.push({path: '/login',query: {code:this.pwd,phone:this.userId}});
            }
        },
        //忘记密码/邮箱
        forgetBtn(){
            var that = this;
            var username = this.userId;
            if (/[a-zA-Z]/i.test(username) == false) {
                if (this.codeTime == 0 || this.codeTime == 60) {
                    this.codeTime = 60;
                    console.log('忘记手机');
                    that.loginStatus = 1;
                    that.pwd = '';
                    function codeTime() {
                        setTimeout(function() {
                            that.codeTime -= 1
                            if (that.codeTime <= 0) {

                            } else {
                                codeTime()
                            }
                        }, 1000)
                    }
                    codeTime()
                    /*that.loginStatus = 1;
                    this.$http.post(this.reqUrl + '/account/forgot/phone/send', qs.stringify({
                        phone: this.userId,
                    })).then(res => {
                        console.log(res);
                        console.log('发送信息返回');
                        that.pwd = '';

                        function codeTime() {
                            setTimeout(function() {
                                that.codeTime -= 1
                                if (that.codeTime <= 0) {

                                } else {
                                    codeTime()
                                }
                            }, 1000)
                        }
                        codeTime()
                    });*/
                }
            } else {
                console.log('忘记邮箱');
                this.$http.post(this.reqUrl + '/account/forgot/email/send', qs.stringify({
                    email: this.userId,
                })).then(res => {
                    console.log(res);
                    that.pwd = '';
                    that.tipStatus = 'email';
                    console.log('邮箱');
                })
            }
        },
        //验证手机验证码
        codeBlur: function() {
            /*var code = this.pwd;
            this.$http.post(this.reqUrl + '/account/forgot/phone/code_verify', qs.stringify({
                phone: this.userId,
                code: code
            })).then(res => {
                console.log(res);
                console.log('验证手机验证码')
            });*/
        },
        pwdFocus: function() {
            this.pwdStatus = '';
        },


    },

    //监听
    watch: {

    }
}
</script>
<style lang="scss" scoped>
//@import 'src/style/mixin';
.login_container{
     //min-height: 800px;
    /*min-width: 630px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0; */
}
.login_wrap{
    width: 400px;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    margin-top: -50px;
    .login_logo{
        background: url(../../assets/ytb_logo.png) center center no-repeat;
        background-size: 120px 35px;
        height: 35px;
        margin: 0 auto;
        display: block;
    }
    .login_box{
        margin-top: 102px;
        overflow: hidden;
    }
    .login_user_box{
        width: 100%;
        height: 44px;
        overflow: hidden;
        position: relative;
        margin-top: 10px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        &.error_input{
            border: 1px solid #e34849;
        }
        .iconfont{
            width: 20px;
            height: 20px;
            font-size: 20px;
            color: #e34849;
            position: absolute;
            right: 20px;
            top: 50%;
            margin-top: -10px;
            z-index: 9;
            cursor: pointer;
        }
        .login_input{
            width: 100%;
            height: 44px;
            padding-left: 20px;
            padding-right: 20px;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            line-height: 44px;
            font-size: 14px;
            color: #eee;
            background: #424242;
            border: 0;
            outline: none;
        }
    }
    .login_btn_box{
        height: 44px;
        margin-top: 20px;
        display: flex;
        .login_btn_list{
            flex: 1;
            height: 44px;
            line-height: 44px;
            border: 1px solid #424242;
            color: #424242;
            text-align: center;
            cursor: pointer;
            &.login_btn{
                color: #e34849;
            }
            &.go_reg{
                margin-left: 15px;
                color: #e34849;
            }
        }
    }
    .login_tip{
        text-align: center;
        margin-top: 58px;
        .tip_pwd_error{
            color: #c1c1c1;
            width: 100%;
            height: 14px;
            line-height: 14px;
            font-size: 14px;
        }
        .forget_pwd{
            width: 100%;
            height: 14px;
            line-height: 14px;
            font-size: 14px;
            margin-top: 32px;
            color: #e34849;
            cursor: pointer;
        }
    }
}
.codeTime{
    width: 48px;
    height: 44px;
    line-height: 44px;
    color: #e34849;
    font-size: 14px;
    position: absolute;
    right: 0;
    top: 0;
    text-align: center;
}
.login_top_tip{
    text-align: center;
    margin-bottom:15px;
}
</style>