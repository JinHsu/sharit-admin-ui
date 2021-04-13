export default [
    {
        dataIndex: 'code', title: '菜单编码', width: 200, ellipsis: true,
        scopedSlots: {customRender: 'code'},
    },
    {
        dataIndex: 'title', title: '菜单名称', ellipsis: true,
    },
    {
        dataIndex: 'icon', title: '图标', ellipsis: true,
        scopedSlots: {customRender: 'icon'},
    },
    {dataIndex: 'path', title: '路由path', ellipsis: true},
    {dataIndex: 'name', title: '路由name', ellipsis: true},
    {dataIndex: 'redirect', title: '重定向路径', ellipsis: true},
    /*{
        dataIndex: 'fake', title: '虚菜单', ellipsis: true,
        scopedSlots: {customRender: 'fake'},
    },
    {
        dataIndex: 'pageId', title: '关联页面', ellipsis: true,
        scopedSlots: {customRender: 'page'},
    },*/
    // {dataIndex: 'parentId', title: '上级菜单', width: 200, ellipsis: true},
    {dataIndex: 'remark', title: '备注', width: 100, ellipsis: true},
    {
        dataIndex: 'operation',
        title: '操作',
        width: 200,
        scopedSlots: {customRender: 'operation'},
        fixed: 'right',
    }
]