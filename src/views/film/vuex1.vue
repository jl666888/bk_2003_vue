<template>
    <div>
        这是详情页
    </div>
</template>
<script>
export default {
    
    created(){
        this.$store.commit('changeShow',false)
    },
    methods:{
    },
    beforeDestroy(){
        this.$store.commit('changeShow',true)
    }
}
</script>