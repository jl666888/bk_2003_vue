import Film from '@/views/films/Film.vue'
import Now from '@/views/films/nowPlaying.vue'
import Coming from '@/views/films/comingSoon.vue'
import Vuex from '@/views/film/vuex1'
var filmRouter = [{
  path:'/films',
  component: Film ,
  redirect:'/films/nowplaying',
  children:[
    {path:'nowplaying',component:Now},
    {path:'comingsoon',component:Coming}
  ]},
  {path:'/film/:id',component:Vuex}
]
export default filmRouter