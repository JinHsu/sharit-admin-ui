export default [
    {
        dataIndex: 'code', title: '市（市辖区）编码', ellipsis: true,
        scopedSlots: {customRender: 'code'},
    },
    {dataIndex: 'title', title: '市（市辖区）简称', ellipsis: true},
    {dataIndex: 'name', title: '全称', ellipsis: true},
    {dataIndex: 'zip', title: '邮政编码', ellipsis: true},
    {
        dataIndex: 'operation', title: '操作', width: 200, ellipsis: true,
        fixed: 'right',
        scopedSlots: {customRender: 'operation'},
    },
]