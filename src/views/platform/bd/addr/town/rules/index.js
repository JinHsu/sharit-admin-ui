export default {
    code: {
        rules: [
            {required: true, message: '请输入镇（街道）编码'}
        ],
        validateTrigger: ['change', 'blur']
    },
    title: {
        rules: [
            {required: true, message: '请输入镇（街道）名称'}
        ],
        validateTrigger: ['change', 'blur']
    },
    parentId: {
        rules: [
            {required: true, message: '请输入所属县（区）'}
        ],
        validateTrigger: ['change', 'blur']
    },
}