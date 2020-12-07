export default {
    username: {
        rules: [
            {required: true, message: '请输入用户名'}
        ],
        validateTrigger: ['change', 'blur']
    },
    email: {
        rules: [
            {required: false, message: '请输入电子邮箱'}
        ],
        validateTrigger: ['change', 'blur']
    },
    mobile: {
        rules: [
            {required: false, message: '请输入手机号'}
        ],
        validateTrigger: ['change', 'blur']
    },
    enabled: {
        rules: [
            {required: true, message: '请输入启用状态'}
        ],
        validateTrigger: ['change', 'blur']
    },
    locked: {
        rules: [
            {required: true, message: '请输入锁定状态'}
        ],
        validateTrigger: ['change', 'blur']
    },
    expiryDate: {
        rules: [
            {required: true, message: '请输入失效日期'}
        ],
        validateTrigger: ['change', 'blur']
    }

}