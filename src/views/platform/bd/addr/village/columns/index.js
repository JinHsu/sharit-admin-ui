export default [
    {
        dataIndex: 'code', title: '村（社区）编码', ellipsis: true, width: '180px',
        scopedSlots: {customRender: 'code'},
    },
    {dataIndex: 'title', title: '村（社区）简称', ellipsis: true},
    {dataIndex: 'name', title: '全称', ellipsis: true, width: '600px'},
    {dataIndex: 'zip', title: '邮政编码', ellipsis: true},
    {
        dataIndex: 'operation', title: '操作', width: 200, ellipsis: true,
        fixed: 'right',
        scopedSlots: {customRender: 'operation'},
    },
]