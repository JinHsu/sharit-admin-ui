export default [
    {
        dataIndex: 'code',
        title: '模块编码',
        width: 200,
        ellipsis: true
    },
    {
        dataIndex: 'title',
        title: '模块名称',
        width: 200,
        ellipsis: true
    },
    {
        dataIndex: 'remark',
        title: '备注',
        width: 200,
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