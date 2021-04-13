export default [
    {
        dataIndex: 'code', title: '按钮编码', ellipsis: true,
    },
    {
        dataIndex: 'title', title: '按钮名称', ellipsis: true,
    },
    {
        dataIndex: 'url', title: 'Url', ellipsis: true,
    },
    {
        dataIndex: 'method', title: 'Method', ellipsis: true,
        scopedSlots: {customRender: 'method'}
    },
    {
        dataIndex: 'operation', title: '操作', width: 120, fixed: 'right',
        scopedSlots: {customRender: 'operation'},
    }
]