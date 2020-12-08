export default {
    code: {
        rules: [
            {required: true, message: '请输入节点编码'}
        ],
        validateTrigger: ['change', 'blur']
    },
    title: {
        rules: [
            {required: true, message: '请输入页面名称'}
        ],
        validateTrigger: ['change', 'blur']
    },
    moduleId: {
        rules: [
            {required: true, message: '请选择所属模块'}
        ],
        validateTrigger: ['change', 'blur']
    },
    remark: {}

}