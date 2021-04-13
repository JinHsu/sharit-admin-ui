export default {
    key: {
        rules: [
            {required: true, message: '请输入Key'}
        ],
        validateTrigger: ['change', 'blur']
    },

    name: {
        rules: [
            {required: true, message: '请输入Name'}
        ],
        validateTrigger: ['change', 'blur']
    }

}