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

    isForCompensation: {
        valuePropName: 'checked'
    },

    triggerable: {
        valuePropName: 'checked'
    },

    autoStoreVariables: {
        valuePropName: 'checked'
    },

    exclude: {
        valuePropName: 'checked'
    },

    color: {
        initialValue: ''
    }
}