<template>
    <div>
        <Header></Header>
        <router-view></router-view>
    </div>
</template>
<script>
import Vue from 'vue'
import Header from '@/components/Navigation/Header.vue'

export default Vue.extend({
    components:{
        Header
    },
    methods:{
       
    }
    //
})
</script>
<style scoped>

</style>
