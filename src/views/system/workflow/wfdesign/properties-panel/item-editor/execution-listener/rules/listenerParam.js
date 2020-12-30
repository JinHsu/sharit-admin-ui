export default {
    type: {
        rules: [
            {required: true, message: '请选择参数类型'}
        ],
        validateTrigger: ['change', 'blur']
    },
    name: {
        rules: [
            {required: true, message: '请输入参数名称'}
        ],
        validateTrigger: ['change', 'blur']
    },
    value: {
        rules: [
            {required: true, message: '请输入参数值'}
        ],
        validateTrigger: ['change', 'blur']
    },
}