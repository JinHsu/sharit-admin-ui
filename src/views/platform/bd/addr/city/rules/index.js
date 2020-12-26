export default {
    code: {
        rules: [
            {required: true, message: '请输入市（市辖区）编码'}
        ],
        validateTrigger: ['change', 'blur']
    },
    title: {
        rules: [
            {required: true, message: '请输入市（市辖区）名称'}
        ],
        validateTrigger: ['change', 'blur']
    },
    parentId: {
        rules: [
            {required: true, message: '请输入所属省（直辖市）'}
        ],
        validateTrigger: ['change', 'blur']
    },
}