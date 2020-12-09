export default {
    nickname: {
        rules: [
            {required: true, message: '请输入昵称'}
        ],
        validateTrigger: ['change', 'blur']
    },
    sex: {
        rules: [
            {required: true, message: '请输入性别'}
        ],
        validateTrigger: ['change', 'blur']
    },
    birthday: {},
    area: {}
}