export default [
    {
        dataIndex: 'key',
        title: '标识',
        ellipsis: true
    },
    {
        dataIndex: 'name',
        title: '名称',
        ellipsis: true
    },
    {
        dataIndex: 'category',
        title: '分类',
        ellipsis: true
    },
    {
        dataIndex: 'createTime',
        title: '创建时间',
        scopedSlots: {customRender: 'createTime'},
        ellipsis: true,
    },
    {
        dataIndex: 'lastUpdateTime',
        title: '最后修改时间',
        scopedSlots: {customRender: 'lastUpdateTime'},
        ellipsis: true,
    },
    {
        dataIndex: 'version',
        title: '版本',
        width: 100,
        ellipsis: true
    },
    {
        dataIndex: 'DeploymentId',
        title: '部署状态',
        ellipsis: true
    },
    {
        dataIndex: 'operation', title: '操作', width: 300, ellipsis: true,
        fixed: 'right',
        scopedSlots: {customRender: 'operation'},
    },
]