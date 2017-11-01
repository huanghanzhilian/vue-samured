<template>
    <!-- 组件盒子 -->
    <div class="index_container">
        <div class="content">
            <head-top></head-top>
            <div class="index_main">
                <div class="main-box">
                    <router-view></router-view>
                </div>
            </div>
        </div>
            
        <index-left></index-left>
    </div>
</template>
<script>
//import { setStore, getStore } from '@/config/mUtils'
import headTop from '@/components/header/header';
import indexLeft from '@/components/indexLeft/indexLeft';


export default {
    //数据
    data() {
        return {
            volist:{}
        }
    },
    //开始创建  vue后自动执行
    mounted() {
        //this.initData();
        
    },
    //需要使用的模块
    components: {
        headTop,
        indexLeft
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
    .index_main{
        padding-left: 240px;
        padding-top: 45px;
        background-color: #2b2b2b;
        
    }

    .main-box{
        display: flex;
        flex-direction:column;
        align-items: center;
        //margin-top: 10px;
    }
</style>