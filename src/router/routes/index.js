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
                component: () => import(/* webpackChunkName: "entry" */ '@/views/entry/login'),
                meta: {title: '登录'}
            },
            {
                path: 'recover',
                name: 'recover',
                component: () => import(/* webpackChunkName: "entry" */ '@/views/entry/recover'),
                meta: {title: '找回密码'}
            }
        ]

    }
]