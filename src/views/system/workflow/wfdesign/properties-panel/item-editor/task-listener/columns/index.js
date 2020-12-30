export default [
    {
        dataIndex: 'event',
        slots: {title: 'eventTitle'}, ellipsis: true,
    },
    {
        dataIndex: 'type', title: '类型', ellipsis: true,
        scopedSlots: {customRender: 'type'},
    },
    {
        dataIndex: 'className', title: '类名', ellipsis: true, width: 300,
    },
    {
        dataIndex: 'operation', title: '操作', width: 120, ellipsis: true,
        scopedSlots: {customRender: 'operation'},
    },
]