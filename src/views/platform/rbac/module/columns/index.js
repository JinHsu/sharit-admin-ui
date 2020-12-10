export default [
    {
        dataIndex: 'code',
        title: '模块编码',
        ellipsis: true
    },
    {
        dataIndex: 'title',
        title: '模块名称',
        ellipsis: true
    },
    {
        dataIndex: 'remark',
        title: '备注',
        ellipsis: true
    },
    {
        dataIndex: 'operation',
        title: '操作',
        width: 200,
        fixed: 'right',
        scopedSlots: {customRender: 'operation'},
    }
]