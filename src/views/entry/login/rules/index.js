export default {
    loginName: {
        rules: [
            {required: true, message: '请输入登录名'},
        ],
        validateTrigger: ['change', 'blur']
    },
    userPwd: {
        rules: [
            {required: true, message: '请输入密码'}
        ],
        validateTrigger: ['change', 'blur']
    }
}