export default [
    {dataIndex: 'code', title: '页面编码', width: 100, ellipsis: true},
    {dataIndex: 'title', title: '页面名称', width: 100, ellipsis: true},
    {dataIndex: 'component', title: '组件路径', width: 200, ellipsis: true},
    {
        dataIndex: 'moduleTitle',
        title: '所属模块',
        width: 100,
        ellipsis: true,
        scopedSlots: {customRender: 'module'},
    },
    {dataIndex: 'remark', title: '备注', width: 100, ellipsis: true},
    {
        dataIndex: 'operation',
        title: '操作',
        width: 200,
        fixed: 'right',
        scopedSlots: {customRender: 'operation'},
    }
]