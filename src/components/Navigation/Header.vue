<template>
    <div style="height:44px">
        <div :class="{header1:header}">
            <van-tabs @click="onClick" v-model="active">
                <van-tab title="正在热映"></van-tab>
                <van-tab title="即将上映"></van-tab>
            </van-tabs>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import { Tab, Tabs, Toast} from 'vant';

Vue.use(Tab);
Vue.use(Tabs);

import uri from '@/config/uri'
export default Vue.extend({
    data(){
        return {
            header:false,
            active:0,
            url:['/films/nowplaying','/films/comingsoon'],
            list: [],
        }
    },
    created(){
        this.active = this.url.indexOf(this.$route.path)
    },
    methods: {
        onClick(name, title) {
            Toast(title);
            this.$router.push(this.url[name])
        },
    },
    mounted(){
        window.addEventListener('scroll',()=>{
            let topNum = document.documentElement.scrollTop;
            // console.log(topNum)
            if(topNum > 200){
                this.header = true;
            }else{
                this.header = false
            }
        })
    }
})
</script>
<style scoped>
.header1{
    position: fixed;
    top: 0;
    z-index: 1111;
    width: 100%;
}
</style>