export default {
    email: {
        rules: [
            {required: true, message: '请输入电子邮箱'},
        ],
        validateTrigger: ['change', 'blur']
    },
    captcha: {
        rules: [
            {required: true, message: '请输入验证码'},
        ],
        validateTrigger: ['change', 'blur']
    },
    password: {
        rules: [
            {required: true, message: '请输入新密码'},
        ],
        validateTrigger: ['change', 'blur']
    },
    password2: {
        rules: [
            {required: true, message: '请输入确认密码'},
        ],
        validateTrigger: ['change', 'blur']
    }

}