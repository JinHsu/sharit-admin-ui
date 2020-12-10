export default {
    code: {
        rules: [
            {required: true, message: '请输入模块编码'}
        ],
        validateTrigger: ['change', 'blur']
    },
    title: {
        rules: [
            {required: true, message: '请输入模块名称'}
        ],
        validateTrigger: ['change', 'blur']
    }
}