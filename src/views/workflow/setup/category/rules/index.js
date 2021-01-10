export default {
    code: {
        rules: [
            {required: true, message: '请输入流程分类编码'}
        ],
        validateTrigger: ['change', 'blur']
    },
    title: {
        rules: [
            {required: true, message: '请输入流程分类名称'}
        ],
        validateTrigger: ['change', 'blur']
    }
}