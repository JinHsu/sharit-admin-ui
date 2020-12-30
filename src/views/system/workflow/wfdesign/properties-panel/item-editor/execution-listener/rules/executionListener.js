export default {
    event: {
        rules: [
            {required: true, message: '请选择事件'}
        ],
        validateTrigger: ['change', 'blur']
    },
    type: {
        rules: [
            {required: true, message: '请选择类型'}
        ],
        validateTrigger: ['change', 'blur']
    },
    className: {
        rules: [
            {required: true, message: '请输入类名'}
        ],
        validateTrigger: ['change', 'blur']
    },
}