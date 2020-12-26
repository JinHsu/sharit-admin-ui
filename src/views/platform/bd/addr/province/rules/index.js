export default {
    code: {
        rules: [
            {required: true, message: '请输入省（直辖市）编码'}
        ],
        validateTrigger: ['change', 'blur']
    },
    title: {
        rules: [
            {required: true, message: '请输入省（直辖市）名称'}
        ],
        validateTrigger: ['change', 'blur']
    },
    parentId: {
        rules: [
            {required: true, message: '请输入所属国家（地区）'}
        ],
        validateTrigger: ['change', 'blur']
    },
}