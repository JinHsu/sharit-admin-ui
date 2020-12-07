export default {
    code: {
        rules: [
            {required: true, message: '请输入菜单编码'}
        ],
        validateTrigger: ['change', 'blur']
    },
    title: {
        rules: [
            {required: true, message: '请输入菜单名称'}
        ],
        validateTrigger: ['change', 'blur']
    },
    path: {
        rules: [
            {required: true, message: '请输入路由路径'}
        ],
        validateTrigger: ['change', 'blur']
    },
    name: {
        rules: [
            {required: true, message: '请输入路由名称'}
        ],
        validateTrigger: ['change', 'blur']
    },
    fake: {
        rules: [
            {required: true, message: '请输入是否虚菜单'}
        ],
        validateTrigger: ['change', 'blur']
    }
}