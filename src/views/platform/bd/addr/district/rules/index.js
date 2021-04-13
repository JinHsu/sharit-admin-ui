export default {
    code: {
        rules: [
            {required: true, message: '请输入县（区）编码'}
        ],
        validateTrigger: ['change', 'blur']
    },
    title: {
        rules: [
            {required: true, message: '请输入县（区）名称'}
        ],
        validateTrigger: ['change', 'blur']
    },
    name: {
        rules: [
            {required: false, message: '请输入县（区）全称'}
        ],
        validateTrigger: ['change', 'blur']
    },
    zip: {
        rules: [
            {required: false, message: '请输入县（区）邮政编码'}
        ],
        validateTrigger: ['change', 'blur']
    },
    parentId: {
        rules: [
            {required: true, message: '请输入所属市（直辖区）'}
        ],
        validateTrigger: ['change', 'blur']
    },
}