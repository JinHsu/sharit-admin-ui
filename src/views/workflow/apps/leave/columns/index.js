export default [
    {dataIndex: 'billType', title: '单据类型', ellipsis: true, width: 200},
    {dataIndex: 'billCode', title: '单据编码', ellipsis: true, width: 200},
    {dataIndex: 'billName', title: '单据名称', ellipsis: true, width: 200},
    {dataIndex: 'billState', title: '单据状态', ellipsis: true, width: 200},
    // {dataIndex: 'leaveDays', title: '请假天数', ellipsis: true, width: 100},
    // {dataIndex: 'leaveReason', title: '请假原因', ellipsis: true, width: 200},
    // {dataIndex: 'startDate', title: '开始日期', ellipsis: true, width: 100},
    // {dataIndex: 'endDate', title: '结束日期', ellipsis: true, width: 100},
    {dataIndex: 'submittedBy', title: '提交人', ellipsis: true, width: 200},
    {dataIndex: 'submittedTime', title: '提交时间', ellipsis: true, width: 200},
    {dataIndex: 'approvedBy', title: '审批人', ellipsis: true, width: 200},
    {dataIndex: 'approvedTime', title: '审批时间', ellipsis: true, width: 200},
    // {dataIndex: 'createdBy', title: '创建人', ellipsis: true, width: 100},
    // {dataIndex: 'createdTime', title: '创建时间', ellipsis: true, width: 200},
    // {dataIndex: 'lastModifiedBy', title: '最后修改人', ellipsis: true, width: 100},
    // {dataIndex: 'lastModifiedTime', title: '最后修改时间', ellipsis: true, width: 200},
    {
        dataIndex: 'operation', title: '操作', width: 300, fixed: 'right', align: 'center',
        scopedSlots: {customRender: 'operation'},
    }
]