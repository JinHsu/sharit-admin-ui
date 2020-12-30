export default {
    scope: {
        rules: [
            {required: true, message: '请选择scope'}
        ],
        validateTrigger: ['change', 'blur']
    },
    id: {
        rules: [
            {required: true, message: '请输入ID'}
        ],
        validateTrigger: ['change', 'blur']
    },
    name: {
        rules: [
            {required: true, message: '请输入名称'}
        ],
        validateTrigger: ['change', 'blur']
    },
}