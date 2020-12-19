<template>
    <div>
        <van-tabs v-model="activeName">
        <van-tab title="标签 1" name="a">内容 1</van-tab>
        <van-tab title="标签 2" name="b">内容 2</van-tab>
        </van-tabs>
    </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { Tab, Tabs } from 'vant';

Vue.use(Tab);
Vue.use(Tabs);
export default Vue.extend({
    data() {
        return {
            activeName: 'a',
        };
    },
})
</script>