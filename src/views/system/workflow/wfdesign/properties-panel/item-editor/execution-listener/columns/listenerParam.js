export default [
    {
        dataIndex: 'type', title: '参数类型', ellipsis: true,
        scopedSlots: {customRender: 'type'},
    },
    {
        dataIndex: 'name', title: '参数名称', ellipsis: true,
        scopedSlots: {customRender: 'name'},
    },
    {
        dataIndex: 'value', title: '参数值', ellipsis: true,
        scopedSlots: {customRender: 'value'},
    },
    {
        dataIndex: 'operation', title: '操作', width: 120, ellipsis: true,
        scopedSlots: {customRender: 'operation'},
    },
]