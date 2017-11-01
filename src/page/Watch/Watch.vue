<template>
    <!-- 组件盒子 -->
    <div class="watch_container">
        <div class="video_box">
            <div class="w_player_box">
                <div class="w_player">
                    <p-layer></p-layer>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
//引入存储
import { setStore, getStore } from '@/config/mUtils'
import pLayer from '@/components/common/player';

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
        pLayer
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
//@import 'src/style/mixin';
.watch_container{
    width: 100%;
}
.video_box{
    width: 100%;
    background: #000;
    .w_player_box{

        .w_player{
            height: 630px;
            width: 1120px;
            margin: auto;
        }
    }
}
</style>