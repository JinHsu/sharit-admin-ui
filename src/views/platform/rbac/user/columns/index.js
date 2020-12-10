export default [
    {dataIndex: 'username', title: '用户名', ellipsis: true},
    {dataIndex: 'email', title: '电子邮箱', ellipsis: true},
    {dataIndex: 'mobile', title: '手机号码', ellipsis: true},
    {
        dataIndex: 'enabled', title: '启用状态', ellipsis: true,
        scopedSlots: {customRender: 'enabled'},
    },
    {
        dataIndex: 'locked', title: '锁定状态', ellipsis: true,
        scopedSlots: {customRender: 'locked'},
    },
    {dataIndex: 'expiryDate', title: '失效日期', ellipsis: true},
    {dataIndex: 'remark', title: '备注', width: 100, ellipsis: true},
    {
        dataIndex: 'operation', title: '操作', width: 200, ellipsis: true,
        fixed: 'right',
        scopedSlots: {customRender: 'operation'},
    },
]