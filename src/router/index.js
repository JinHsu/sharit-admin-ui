import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入静态路由
import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: routes
})

export default router