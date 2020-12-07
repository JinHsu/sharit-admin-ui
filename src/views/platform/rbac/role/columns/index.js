export default [
    {dataIndex: 'code', title: '角色编码', ellipsis: true},
    {dataIndex: 'title', title: '角色名称', ellipsis: true},
    {dataIndex: 'remark', title: '备注', width: 100, ellipsis: true},
    {
        dataIndex: 'operation', title: '操作', width: 300, ellipsis: true,
        fixed: 'right',
        scopedSlots: {customRender: 'operation'},
    },
]