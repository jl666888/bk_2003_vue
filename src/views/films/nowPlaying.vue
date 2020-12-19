<template>
    <div>
        正在热映
        <!-- <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        >
          <van-cell v-for="item in list" :key="item" :title="item" />
        </van-list> -->
        <!-- <ul>
            <li v-for="(item,index) in list" :key="index" >
                <img :src="item.poster" width="100" height="120" />
                {{item.name}}
                {{item.category}}
                主演：{{item.actors[0].name}} 
            </li>
        </ul> -->
    </div>
</template>
<script>
import Vue from 'vue'
import uri from '@/config/uri'
import { List } from 'vant';

Vue.use(List);
export default Vue.extend({
    data() {
        return {
            uri,
            list: [],
            loading: false,
            finished: false,
        };
    },
    created(){
        // this.$http.get(uri.getNowPlaying).then(ret => this.list = ret.data.films)
    }
})
</script>