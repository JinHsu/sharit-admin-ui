export default [
    {
        dataIndex: 'scope', title: 'scope', ellipsis: true,
        scopedSlots: {customRender: 'scope'},
    },
    {
        dataIndex: 'id', title: 'ID', ellipsis: true,
    },
    {
        dataIndex: 'name', title: '名称', ellipsis: true,
    },
    {
        dataIndex: 'operation', title: '操作', width: 120, ellipsis: true,
        scopedSlots: {customRender: 'operation'},
    },
]