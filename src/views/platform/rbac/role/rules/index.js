export default {
    code: {
        rules: [
            {required: true, message: '请输入角色编码'}
        ],
        validateTrigger: ['change', 'blur']
    },
    title: {
        rules: [
            {required: true, message: '请输入角色名称'}
        ],
        validateTrigger: ['change', 'blur']
    },
}