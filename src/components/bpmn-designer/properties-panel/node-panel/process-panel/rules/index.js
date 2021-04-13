export default {
    id: {
        rules: [
            {required: true, message: '请输入程标识key'}
        ],
        validateTrigger: ['change', 'blur']
    },

    category: {
        rules: [
            {required: true, message: '请输入分类'}
        ],
        validateTrigger: ['change', 'blur']
    },

    color: {
        initialValue: ''
    }
}