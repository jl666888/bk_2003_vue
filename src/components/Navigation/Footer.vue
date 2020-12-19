<template>
    <div>
        <van-tabbar @change="dian" v-model="active">
        <van-tabbar-item class="iconfont icon-dianying" ><span>电影</span></van-tabbar-item>
        <van-tabbar-item class="iconfont icon-yingyuan" ><span>影院</span></van-tabbar-item>
        <van-tabbar-item class="iconfont icon-wode" ><span>我的</span></van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script>
import Vue from 'vue';
import { Tabbar, TabbarItem, Icon} from 'vant';
import "@/assets/Iconfont/iconfont.css"
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Icon);
export default Vue.extend({
    data(){
        return {
            active:0,
            uri:['/film/nowplaying','/cinema','/center']
        }
    },
    created(){
        
        this.active = this.uri.indexOf(this.$route.path) >= 0 ? this.uri.indexOf(this.$route.path) : 0;
    },
    methods:{
        dian:function(index){
            // console.log(this.uri[index])
            this.$router.push(this.uri[index])
        }
    }
})
</script>