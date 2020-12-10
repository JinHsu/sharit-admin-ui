export default [
    {dataIndex: 'code', title: '页面编码', width: 180, ellipsis: true},
    {dataIndex: 'title', title: '页面名称', width: 180, ellipsis: true},
    {
        dataIndex: 'usePerm', title: '按钮权限', width: 100, ellipsis: true,
        scopedSlots: {customRender: 'usePerm'},
    },
    {dataIndex: 'component', title: '组件路径', ellipsis: true},
    {
        dataIndex: 'operation', title: '操作', width: 200, fixed: 'right',
        scopedSlots: {customRender: 'operation'},
    }
]