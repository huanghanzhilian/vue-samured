<template>
    <!-- 组件盒子 -->
    <div class="home_container">
        <video-list></video-list>
    </div>
</template>
<script>
//import { setStore, getStore } from '@/config/mUtils'
import videoList from '@/components/common/videoList';


export default {
    //数据
    data() {
        return {

        }
    },
    //开始创建  vue后自动执行
    mounted() {
        this.initData();
    },
    //需要使用的模块
    components: {
        videoList
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
    },

    //监听
    watch: {

    }
}
</script>
<style lang="scss" scoped>
//@import 'src/style/mixin'; //初始化页面背景动画
</style>