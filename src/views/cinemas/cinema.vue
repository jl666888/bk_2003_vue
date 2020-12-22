<template>
    <div> <span>这里是影院页面</span> <br>

        <button @click="city">城市列表</button>
    </div>
    
</template>
<script>
export default {
    methods:{
        city:function(){
            this.$router.push('/city');
        }
    }
}
</script>