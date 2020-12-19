<template>
    <div>
    <van-tabs @click="onClick">
    <van-tab title="正在热映">
        <router-view></router-view>
    </van-tab>
    <van-tab title="即将上映">
        <router-view></router-view>
    </van-tab>
    </van-tabs>
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
            url:['/film/nowplaying','/film/comingsoon'],
            list: [],
        }
    },
    methods: {
        onClick(name, title) {
            Toast(title);
            this.$router.push(this.url[name])
        },
       
    },
    template:`
    `,
})
</script>