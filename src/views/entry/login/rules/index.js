export default {
    username: {
        rules: [
            {required: true, message: '请输入账号'},
        ],
        validateTrigger: ['change', 'blur']
    },
    password: {
        rules: [
            {required: true, message: '请输入密码'}
        ],
        validateTrigger: ['change', 'blur']
    },
    mobile: {
        rules: [
            {required: true, pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号'}
        ],
        validateTrigger: 'change'
    },
    captcha: {
        rules: [
            {required: true, message: '请输入验证码'}
        ],
        validateTrigger: ['change', 'blur']
    }
}