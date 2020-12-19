import Film from '@/views/films/Film.vue'
import Now from '@/views/films/nowPlaying.vue'
import Coming from '@/views/films/comingSoon.vue'
var filmRouter = {
  path:'/film',
  component: Film ,
  // redirect:'/film/nowplaying',
  children:[
    {path:'nowplaying',component:Now},
    {path:'comingsoon',component:Coming}
  ]}
export default filmRouter