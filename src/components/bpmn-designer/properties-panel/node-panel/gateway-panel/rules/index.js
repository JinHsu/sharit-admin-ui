export default {
    id: {
        rules: [
            {required: true, message: '请输入程标识key'}
        ],
        validateTrigger: ['change', 'blur']
    },

    async: {
        valuePropName: 'checked'
    },

    color: {
        initialValue: ''
    }
}