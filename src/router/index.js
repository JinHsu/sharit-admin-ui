import VueRouter from 'vue-router'
// 引入静态路由
import routes from './routes'

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: routes
})

export default router