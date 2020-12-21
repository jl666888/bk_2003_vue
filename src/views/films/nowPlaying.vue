<template>
    <div class="con">
        <van-pull-refresh
        v-model="isLoading"
        success-text="刷新成功"
        @refresh="refresh1"
        >
        <van-loading size="24px" type="spinner" vertical v-show="isloading">加载中...</van-loading>
        <van-card
        v-for="item in list"
        :key="item.filmId"
        @click="buy(item.filmId)"
        >
        <template #title>
            <div style="fontSize:16px">{{item.name}}<span class="dd">{{item.filmType.name}}</span></div>
        </template>
        <template #thumb>
            <img :src="item.poster" />
        </template>
        <template #desc>
            <div>观众评分：<span style="color:#ffb232;fontSize:14px">{{item.grade}}</span></div>
            <div style="fontSize:13px">主演：<span>{{item.actors | filer}}</span></div>
            <div style="fontSize:13px">{{item.nation}} | {{item.runtime}}分钟</div>
        </template>
        <template #footer>
            <van-button class="abc" plain hairline type="primary" @click.stop="details(item.filmId)" size="mini">购票</van-button>
        </template>
        </van-card>
        </van-pull-refresh>
    </div>
</template>
<script>
import Vue from 'vue'
import uri from '@/config/uri'
import { List, Card, Loading, Button, PullRefresh, Toast } from 'vant';
Vue.use(Loading);
Vue.use(List);
Vue.use(Card);
Vue.use(Button);
Vue.use(PullRefresh);
export default Vue.extend({
    data() {
        return {
            num:1,
            isLoading:true,
            isloading:true,
            list: [],
            loading: false,
            finished: false,
            axios11:true,
        };
    },
    created(){
        this.getData();
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
            
            if(!this.axios11){
                this.isLoading = false
                return;
            }
            this.$http.get(uri.getNowPlaying + `?pageNum=${this.num}`).then(ret => {
                if(Math.ceil(ret.data.total/10) > this.num){
                    this.num++;
                }else{
                    this.axios11 = false;
                    this.num = Math.ceil(ret.data.total/10);
                }
                // console.log(ret.data.total)
                // this.num++;
                // //数组拼接
                // this.list = this.list.concat(ret.data.films);
                // // 合并展开运算符
                this.list = [...ret.data.films,...this.list];
                if(cd){
                    cd();
                }else{
                    this.isloading = false;
                }
                
                
            })
        },
        refresh1:function(){
            this.getData(()=>{
                this.isLoading = false
            });   
        },
        details:function(id){
            this.$router.push('/film/' + id + '/cinemas')
        },
        buy:function(id){
            // console.log(id);
            this.$router.push('/film/' + id);
            // console.log();
        },
        
    }
})
</script>
<style scoped>
.con{
    margin-bottom: 50px;
}
.abc{
    position: relative;
    top: -45px;
}
.dd{
    margin-left: 3px;
    font-size: 9px;
    color: #fff;
    background-color: #d2d6dc;
    height: 14px;
    line-height: 12px;
    padding: 0 2px;
    border-radius: 2px;
}
img{
    width: 64px;
    height: 90px;
    border-radius: 0;
}
</style>