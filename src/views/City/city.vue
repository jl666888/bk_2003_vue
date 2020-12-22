<template>
    <div>
        <p>城市列表</p>
            <div>
                <van-index-bar :index-list="indexList">
                    <template v-for="(item,index) in cities">
                    <van-index-anchor :key="index">{{item.index}}</van-index-anchor>
                    <van-cell :title="val.name" @click="getcity(val.cityId,val.name)" v-for="val in item.data" :key="val.cityId"/>
                    </template>
                </van-index-bar>
            </div>
        </div>
</template>
<script>
import uri from '@/config/uri'
import Vue from 'vue';
import { IndexBar, IndexAnchor, Cell } from 'vant';

Vue.use(IndexBar);
Vue.use(IndexAnchor);
Vue.use(Cell);
export default {
    data() {
        return {
            index1:[],
            indexList: [],
            cities:[],
        };
    },
    created(){
        this.$store.commit('changeShow',false);
        this.$http.get(uri.getCity).then(ret => {
            if(ret.status == 0){
                for(var i = 65; i <= 90 ; i++){
                    this.index1.push(String.fromCharCode(i));
                }
                this.index1.forEach(el => {
                    let tmp = ret.data.cities.filter((item) => {
                        return el.toLowerCase() == item.pinyin.substr(0,1)
                    })
                    // console.log()
                    if(tmp.length > 0){
                        this.indexList.push(el)
                        this.cities.push({
                            index:el,
                            data:tmp
                        })
                    }
                })
            }
            
        })
        
        
    },
    beforeDestroy(){
        this.$store.commit('changeShow',true)
    },
    methods:{
        getcity:function(cityId,name){
            console.log(cityId,name)
        }
    }
}
</script>