export default [
    // {dataIndex: 'owner', title: 'owner', ellipsis: true, width: 200,},
    {dataIndex: 'taskDefinitionKey', title: '任务定义标识', ellipsis: true, width: 200,},
    {dataIndex: 'assignee', title: '任务负责人', ellipsis: true, width: 200,},
    {dataIndex: 'name', title: '任务名称', ellipsis: true, width: 200,},
    {dataIndex: 'priority', title: '优先级', ellipsis: true, width: 200,},
    // {dataIndex: 'description', title: '描述', ellipsis: true, width: 200,},
    {dataIndex: 'claimTime', title: '任务认领时间', ellipsis: true, width: 200,},
    {
        dataIndex: 'createTime', title: '创建时间', ellipsis: true, width: 200,
        scopedSlots: {customRender: 'createTime'},
    },
    // {dataIndex: 'businessKey', title: '业务单据id', ellipsis: true, width: 200,},
    {dataIndex: 'dueDate', title: '有效期', ellipsis: true, width: 200,},
    {dataIndex: 'suspensionState', title: '挂起状态', ellipsis: true, width: 200,},
    {dataIndex: 'category', title: '分类', ellipsis: true, width: 200,},
    {
        dataIndex: 'operation', title: '操作', width: 200, fixed: 'right',
        scopedSlots: {customRender: 'operation'},
    }
]