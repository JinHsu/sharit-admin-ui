// 静态路由表
export default [
    {
        path: '/',
        name: 'entry',
        component: () => import(/* webpackChunkName: "entry" */ '@/layouts/entry'),
        meta: {},
        children: [
            {
                path: 'login',
                name: 'login',
                component: () => import(/* webpackChunkName: "entry" */ '@/views/auth/login'),
                meta: {}
            }
        ]
    }
]