export default [
    {
        dataIndex: 'code',
        title: '流程用户组编码',
        ellipsis: true,
        scopedSlots: {customRender: 'code'},
    },
    {
        dataIndex: 'title',
        title: '流程用户组名称',
        ellipsis: true
    },
    {
        dataIndex: 'memo',
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