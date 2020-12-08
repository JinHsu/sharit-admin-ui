export default [
    {dataIndex: 'code', title: '节点编码', width: 100, ellipsis: true},
    {dataIndex: 'title', title: '节点名称', width: 100, ellipsis: true},
    {dataIndex: 'remark', title: '备注', width: 100, ellipsis: true},
    {
        dataIndex: 'operation',
        title: '操作',
        width: 200,
        fixed: 'right',
        scopedSlots: {customRender: 'operation'},
    }
]