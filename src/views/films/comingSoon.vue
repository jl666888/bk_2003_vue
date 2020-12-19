<template>
    <div class="con">
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
        </van-card>
    </div>
</template>
<script>
import Vue from 'vue'
import uri from '@/config/uri'
import { List, Card, Loading} from 'vant';
Vue.use(Loading);
Vue.use(List);
Vue.use(Card);
export default Vue.extend({
    data() {
        return {
            isloading:true,
            list: [],
            loading: false,
            finished: false,
        };
    },
    created(){
        this.$http.get(uri.getComingSoon).then(ret => {
            this.list = ret.data.films;
            this.isloading = false;
        })
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
    }
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
</style>