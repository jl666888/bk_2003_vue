<template>
    <div class="con warpper" :style="{height: height + 'px'}">
        <div>
        <van-loading size="24px" type="spinner" vertical v-show="isloading">加载中...</van-loading>
        <van-card
        v-for="item in list"
        :key="item.filmId"
        >
        <template #title>
            <div style="fontSize:16px">{{item.name}}<span class="dd">{{item.filmType.name}}</span></div>
        </template>
        <template #thumb>
            <img :src="item.poster" />
        </template>
        <template #desc>
            <br>
            
            <div style="fontSize:13px">主演：<span>{{item.actors | filer}}</span></div>
            <div style="fontSize:13px">{{item.nation}} | {{item.runtime}}分钟</div>
        </template>
        <template #footer>
            <van-button class="abc" plain hairline type="primary" @click="buy(item.filmId)" size="mini">预约</van-button>
        </template>
        </van-card>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import uri from '@/config/uri'
import { List, Card, Loading } from 'vant';
import BScroll from 'better-scroll';
Vue.use(Loading);
Vue.use(List);
Vue.use(Card);
export default Vue.extend({
    data() {
        return {
            height:0,
            isloading:true,
            list: [],
            num:1,
            loading: false,
            bs:null,
            y:0,
            axios11:true,
        };
    },
    created(){
        this.getData();
    },
    mounted(){
        this.height = document.documentElement.clientHeight - 94;
    },
    filters:{
        filer(value){
            if(value){
                let str = ''
                value.forEach(v =>{
                    str += v.name + " "
                })
                return str.substr(0,13) + '...';
            }else{
                return '暂无主演';
            }
        }
    },
    methods:{
        getData:function(cd = null){
            
            this.$http.get(uri.getComingSoon + `?pageNum=${this.num}`).then(ret => {
                if(Math.ceil(ret.data.total/10) > this.num){
                    this.num++;  
                }else{
                    this.axios11 = false
                    this.num = Math.ceil(ret.data.total/10);
                }
                // console.log(ret.data.total)
                // this.num++;
                // //数组拼接
                // this.list = this.list.concat(ret.data.films);
                // // 合并展开运算符
                this.list = [...this.list,...ret.data.films];
                if(cd){
                    cd();
                }else{
                    this.isloading = false;
                }   
            })
        },
        buy:function(id){
            this.$router.push('/film/' + id)
        }
    },
    updated(){
        this.bs = new BScroll('.warpper',{
            click:true,
            startY:this.y,
            pullUpLoad: true,
        }) 
        this.bs.on('pullingUp', () => {
            if(!this.axios11) return;
            if(this.bs.y !== this.y){
                this.getData();
                this.y = this.bs.y;
                this.bs.finishPullUp();
            }
        })
    },
})
</script>
<style scoped>
.con{
    margin-bottom: 50px;
}
.dd{
    margin-left: 3px;
    font-size: 12px;
    color: #fff;
    background-color: #d2d6dc;
    height: 16px;
    line-height: 12px;
    padding: 0 2px;
    border-radius: 2px;
}
img{
    width: 64px;
    height: 90px;
    border-radius: 0;
}
.abc{
    position: relative;
    top: -45px;
}
</style>