export default [
    {
        dataIndex: 'event', title: '事件', ellipsis: true,
    },
    {
        dataIndex: 'type', ellipsis: true, slots: {title: 'typeTitle'},
        scopedSlots: {customRender: 'type'},
    },
    {
        dataIndex: 'className', title: '类名', ellipsis: true, width: 300,
    },
    {
        dataIndex: 'params', title: '参数', ellipsis: true,
        scopedSlots: {customRender: 'params'},
    },
    {
        dataIndex: 'operation', title: '操作', width: 120, ellipsis: true,
        scopedSlots: {customRender: 'operation'},
    },
]