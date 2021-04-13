export default {
    code: {
        rules: [
            {required: true, message: '请输入村（社区）编码'}
        ],
        validateTrigger: ['change', 'blur']
    },
    title: {
        rules: [
            {required: true, message: '请输入村（社区）名称'}
        ],
        validateTrigger: ['change', 'blur']
    },
    parentId: {
        rules: [
            {required: true, message: '请输入所属镇（街道）'}
        ],
        validateTrigger: ['change', 'blur']
    },
}