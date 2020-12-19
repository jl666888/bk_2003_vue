<template>
  <div id="app">
    <div id="nav">

    </div>
    <router-view/>
    <Footer></Footer>
  </div>
</template>
<script>
import Vue from 'vue'
import uri from './config/uri'
import Footer from './components/Navigation/Footer'
export default Vue.extend({
  created(){
    // console.log(this)
    // this.$http.get(uri.getNowPlaying).then(ret =>{
    //   // console.log(ret.data)
    // })
  },
  methods:{

  },
  components:{
    Footer,
  }
})
</script>

<style lang="scss">

</style>
