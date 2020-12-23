export default {
    username: {
        rules: [
            {required: true, message: '请输入用户名'}
        ],
        validateTrigger: ['change', 'blur']
    },
    email: {
        rules: [
            {required: false, message: '请输入电子邮箱'},
            {pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/, message: '电子邮箱格式错误！'}
        ],
        validateTrigger: ['change', 'blur']
    },
    mobile: {
        rules: [
            {required: false, message: '请输入手机号'},
            {pattern: /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(17[013678])|(18[0,5-9]))\d{8}$/, message: "手机号码格式错误！"}
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