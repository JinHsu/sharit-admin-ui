export default [
    {
        dataIndex: 'code', title: '角色编码', ellipsis: true,
        scopedSlots: {customRender: 'code'},
    },
    {dataIndex: 'title', title: '角色名称', ellipsis: true},
    {dataIndex: 'remark', title: '备注', ellipsis: true},
    {
        dataIndex: 'operation', title: '操作', width: 200, ellipsis: true,
        fixed: 'right',
        scopedSlots: {customRender: 'operation'},
    },
]