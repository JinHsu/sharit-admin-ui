export default [
    {
        path: '/hello',
        name: 'hello',
        component: () => import(/* webpackChunkName: "hello" */ '@/views/hello/Hello'),
        meta: {},
        children: []
    }
]