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

    },

    {
        path: '/',
        name: 'frame',
        component: () => import(/* webpackChunkName: "frame" */ '@/layouts/frame'),
        meta: {},
        children: [
            {
                path: 'home',
                name: 'home',
                component: () => import(/* webpackChunkName: "frame" */ '@/layouts/empty'),
                meta: {},
                children: [
                    {
                        path: 'workbench',
                        name: 'workbench',
                        component: () => import(/* webpackChunkName: "frame" */ '@/views/home/workbench'),
                        meta: {}
                    }
                ]
            }
        ]
    }
]