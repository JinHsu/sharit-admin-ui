export default {
    billType: {
        rules: [
            {required: true, message: '请输入单据类型'}
        ],
        validateTrigger: ['change', 'blur']
    },
    billCode: {
        rules: [
            {required: true, message: '请输入单据编码'}
        ],
        validateTrigger: ['change', 'blur']
    },
    billName: {
        rules: [
            {required: true, message: '请输入单据名称'}
        ],
        validateTrigger: ['change', 'blur']
    },
    billState: {
        rules: [
            {required: true, message: '请输入单据状态'}
        ],
        validateTrigger: ['change', 'blur']
    },
    leaveDays: {
        rules: [
            {required: true, message: '请输入请假天数'}
        ],
        validateTrigger: ['change', 'blur']
    },
    leaveReason: {
        rules: [
            {required: true, message: '请输入请假原因'}
        ],
        validateTrigger: ['change', 'blur']
    },
    startDate: {
        rules: [
            {required: true, message: '请输入开始日期'}
        ],
        validateTrigger: ['change', 'blur']
    },
}