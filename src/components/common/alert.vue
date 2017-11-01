<template>
    <div class="alert_box" @DOMMouseScroll="slaoak($event)" @mousewheel="slaoak($event)" v-if="alertShowStatus >= 1">
        <div class="alert_in_box">
          <div class="alert_close" @click="closeAlert()"><i class="iconfont icon-cuo"></i></div>
          <div class="alert_title">{{str[alertShowStatus]}}</div>
          <div class="alert_login unselect" @click="goLogin()">登录</div>
        </div>
    </div>
</template>

<script>
import { bus } from '@/components/common/bus.js';
export default {
	data() {
		return {
			alertShowStatus: 0, //组件显示状态
			playStatus: 1,
			str: [
				'',
				'立即登录订阅喜欢的频道',
				'立即登录享受更高清晰度服务',
				'立即登录收藏喜爱的视频',
				'立即登录享受翻译字幕服务',
				'立即登录给你喜欢的视频点赞',
				'立即登录保存专辑',
			]
		}
	},
	components: {},
	mounted: function() {
		var that = this;
		bus.$on('alertStatus', function(msg, playStatus) {
			if (playStatus != undefined) {
				that.playStatus = playStatus
			};
			that.alertShowStatus = msg;
		})
	},
	methods: {
		goLogin: function() {
			this.alertShowStatus = 0;
			this.$router.push({path: '/login'});
			//window.location.href = this.localUrl + 'login'
		},
		//关闭弹窗
		closeAlert: function() {
			var status = this.playStatus;
			this.alertShowStatus = 0;
			bus.$emit('alertClose', status);
		},
		//去除滚动事件
		slaoak(event) {
			event.preventDefault()
		}
	}
}
</script>


<style>
.alert_box {
	width: 100%;
	height: 100%;
	position: fixed;
	left: 0;
	top: 0;
	background: rgba(0, 0, 0, 0.5);
	z-index: 999999999999999;
}

.alert_in_box {
	width: 320px;
	height: 160px;
	position: absolute;
	left: 50%;
	top: 50%;
	margin: -80px 0 0 -160px;
	background: #2b2b2b;
	z-index: 999999;
}

.alert_close {
	width: 20px;
	height: 20px;
	position: absolute;
	right: 10px;
	top: 10px;
	cursor: pointer;
}

.alert_close .iconfont {
	width: 20px;
	height: 20px;
	font-size: 20px;
	color: #eee;
}

.alert_title {
	width: 100%;
	height: 14px;
	line-height: 14px;
	font-size: 14px;
	color: #eee;
	text-align: center;
	position: absolute;
	top: 48px;
	left: 0;
}

.alert_login {
	width: 40px;
	height: 24px;
	line-height: 22px;
	color: #e34849;
	border-radius: 1px;
	border: 1px solid #545454;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
	text-align: center;
	font-size: 12px;
	position: absolute;
	left: 50%;
	bottom: 48px;
	margin-left: -20px;
	cursor: pointer;
}

.alert_login:hover {
	border: 1px solid #e34849;
}

.alert_login:active {
	background: #e34849;
	border: 1px solid #e34849;
	color: #212121;
}
</style>