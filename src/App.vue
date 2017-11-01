<template>
	<div id="app" :style="{marginRight:scroll+'px'}">
		<router-view class="main"></router-view>
		<Alert></Alert>
	</div>
</template>
<script>
import { mapMutations, mapState } from 'vuex';
import Alert from '@/components/common/alert'
import { bus } from '@/components/common/bus.js';
export default {
	name: 'app',
	computed: {
		...mapState([
			'scroll'
		]),
	},
	created() {
		bus.$on('tip', (text) => {
			alert(text)
		})
	},
	//注入的组件
	components: {
		Alert
	},
}
</script>
<style lang="scss">
@import "assets/style/index.scss";
#app {
	position: absolute;
	left: 0px;
	right: 0px;
	top: 0px;
	bottom: 0px;
}

.main {
	//background: #ededed;
}
</style>
