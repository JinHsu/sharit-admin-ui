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
    /*  {
          dataIndex: 'description',
          title: '描述',
          ellipsis: true
      },
      {
          dataIndex: 'category',
          title: '分类',
          ellipsis: true
      },*/
    {
        dataIndex: 'resourceName',
        title: '资源名称',
        ellipsis: true,
    },
    {
        dataIndex: 'diagramResourceName',
        title: '图片资源名称',
        ellipsis: true,
    },
    {
        dataIndex: 'version',
        title: '版本',
        width: 100,
        ellipsis: true
    },
    {
        dataIndex: 'suspensionState',
        title: '挂起状态',
        width: 100,
        ellipsis: true,
        scopedSlots: {customRender: 'suspensionState'},
    },
    {
        dataIndex: 'operation', title: '操作', width: 200, ellipsis: true,
        fixed: 'right',
        scopedSlots: {customRender: 'operation'},
    },
]