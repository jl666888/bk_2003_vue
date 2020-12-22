<template>
    <div>
        <div class="de_header">
            <div class="goBack" @click="goBack">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAMAAADWZboaAAAAt1BMVEVHcEz///////////////////////////////////////////////////////////////////////////////////97e3saGxyIiYnW1tYdHh9UVVUpKiulpaXLy8s6OzyysrIiIyPx8fEeHyC/v7/5+fklJihCQ0Ntb28bHB1hYWKXl5c0NTZLS0xAQUI4ODk3ODjh4eHr6+s2Nzfq6uptbm5gYGIbHB39/f2VlZdLS0wzNDUZGhs8UYRWAAAAPHRSTlMAGHpLE3cKgEdgVnJfNBZ+cBx9A28js/6sjPvK7p+Q3pn1g/iUgfLYuvzCpeTR2eHiiIXihrvD/YCl0uTUXbEtAAABd0lEQVRIx91W13KDQAw0xnCHARuDe+/dKY7T9f/flTzghCLdMaMXj/eRnZ0T0qqUSveBim96gRWGVuCZfqW4zpCuSMGVRiFhwxEInIY+0qogUFXHHcm6IFGXEa20HaGEY1PKWlNo0KzhylZZaFFuoW8WUP5qkXdtMtrnx4dkzLn/jcgMXY7wlMpVNs+SUs4nMOylvsiME6h6rjawHmfqm/YG6aETzJY5X6V8SykHsJjmvyb9TOVoD/0R5qpElxHKLewOKGHo0tuGThdn/pPsony3A20iHPevMih92MGW9OO1Pj5Gjvqwp63sx1IT4aYLGCi6wIylXp5azuCkaiAvlgY5ZryGzUolDWKplSV6Q5jMlW1rxdIwS7zA8azu+JCWfl+KSRkBM9KEF+fro0BxGJagjPimNyJp/1et/RlNx2l1esC8f2oGDGOscYYpY4RzFgdjXSmW5Fm3JBmrmXMQcM4QzvHDObk4hx7nvGQdtaxTmnXA3zR+AH8JUdNL967cAAAAAElFTkSuQmCC" alt="">
            </div>
            <div class="title">
                {{film.name}}
            </div>
        </div>
        <div class="banner">
            <img v-lazy="film.poster" />
        </div>
        <div style="margin-top:15px;padding:0 10px">
            <div ><span class="name1">{{film.name}}</span> <span class="con_type">{{film_item}}</span> <span class="con_grade" v-show="film.grade">{{film.grade}}分</span></div>
            <div class="con_cate">{{film.category}}</div>
            <div class="con_cate">{{film.premiereAt | setTime}}上映</div>
            <div class="con_cate">{{film.nation}} | {{film.runtime}}分钟</div>
            <div class="con_cate jianjie">
                {{film.synopsis}}
            </div>
            <div class="pullDown" @click="supper">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAICAMAAADHqI+lAAAAOVBMVEVHcEy9xcW9wMW9wcW////Bwca9wcW9wMW9wMW+wMW+wcW9wcXMzMy+wMa+wce9wMe9wca9wMW9wMWKU/2FAAAAEnRSTlMAH+jGBDa6/vaatcIPdlNSdckJHB8JAAAASUlEQVQIHQXBhwGDMAADMCVksQr4/2MrObYCQNkOZ2oH6DWna2Q9wG9lXLQ984V3Zm/gntlb2zNvgN/KGFkPAL0mtQNA+b4C/AGl4gJfgEWzrAAAAABJRU5ErkJggg==" />
            </div>
        </div>
        <div style="margin:15px 10px">
            <span style="display:inline-block;padding-bottom:10px">演职人员</span>
            <Swiper :key="'act' + film.actors.length">
                <div class="swiper-slide" v-for="item in film.actors" :key="item.filmId">
                   <img :src="item.avatarAddress" width="85" height="95" alt=""> 
                    {{item.name}} <br>
                    {{item.role}}
                </div>
            </Swiper>    
        </div>
        <div class="juzhao">
            <span style="display:inline-block;padding-bottom:10px">剧照</span>
            <Swiper :key="'swiper' + film.photos.length">
                <div class="swiper-slide" v-for="(item,index) in film.photos" :key="index">
                <img :src="item" width="150" height="100">
                </div>
            </Swiper>
        </div>
        <span class="foot">选座购票</span>
    </div>
</template>
<script>
import Vue from 'vue'
import uri from '@/config/uri'
import moment from 'moment'
import Swiper from '@/components/swiper.vue'
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
    loading: "https://2url.cc/1OwrB",
});
export default {
    data(){
        return {
            film:{ actors:[],photos:[] },
            film_item:'',
            height:0,
        }
    },
    created(){
        this.$store.commit('changeShow',false);
        this.$http.get(uri.getDetail + `?filmId=${this.$route.params.id}`).then(ret => {
            this.film = ret.data.film;
            this.film_item = ret.data.film.item.name
        })
    },
    methods:{
        goBack:function(){
            this.$router.go(-1);
        },
        supper:function(){
            this.height = 90;
        }
    },
    beforeDestroy(){
        this.$store.commit('changeShow',true)
    },
    filters:{
        setTime(val){
            return moment(val*1000).format("YYYY-MM-DD");
        }
    },
    components:{
        Swiper,
    }
}
</script>
<style lang="scss" scoped>
.de_header{
    position: fixed;
    background-color: hsla(0,0%,100%,0);
    // color: transparent;
    -webkit-transition: all .3s ease;
    -o-transition: all .3s ease;
    transition: all .3s ease;
    width: 100vw;
    height: 44px;
    z-index: 1;
}
.name1{
    color: #191a1b;
    font-size: 18px;
    height: 24px;
    line-height: 24px;
    margin-right: 7px;
}
.con_type{
    font-size: 9px;
    color: #fff;
    background-color: #d2d6dc;
    height: 14px;
    line-height: 14px;
    padding: 0 2px;
    border-radius: 2px;
    display: inline-block;
}
.con_grade{
    display: inline-block;
    width: 55%;
    font-size: 18px;
    font-style: italic;
    text-align: right;
    color: #ffb232;
}
.con_cate{
    font-size: 13px;
    color: #797d82;
    margin-top: 4px;
}
.pullDown{
    width: 100%;
    height: 15px;
    text-align: center;
}
.jianjie{
    height: 35px;
    overflow: hidden;
}
.banner{
    display: block;
    width: 100%;
    vertical-align: middle;
    height: 250px;
    overflow: hidden;
}
.banner img{
    width: 100%;
    // top: -50px;
}
.goBack {
    height: 30px;
    position: absolute;
    top: 5px;
    left: 5px;
}
.goBack img{
    width: 30px;
}
.title{

    font-size: 17px;
    line-height: 44px;
    width: 100vw;
    text-align: center;
}
.juzhao{
    margin:10px 10px 45px 10px;
}
.swiper-slide{
    text-align: center;
    font-size: 10px;
}
.foot{
    position: fixed;
    bottom: 0px;
    z-index: 11;
    width: 100%;
    line-height: 45px;
    text-align: center;
    background: orange;
}
</style>