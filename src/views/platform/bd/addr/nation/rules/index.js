export default {
    code: {
        rules: [
            {required: true, message: '请输入国家（地区）编码'}
        ],
        validateTrigger: ['change', 'blur']
    },
    title: {
        rules: [
            {required: true, message: '请输入国家（地区）名称'}
        ],
        validateTrigger: ['change', 'blur']
    }
}