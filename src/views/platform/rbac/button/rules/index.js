export default {
    code: {
        rules: [
            {required: true, message: '请输入按钮编码'}
        ],
        validateTrigger: ['change', 'blur']
    },
    title: {
        rules: [
            {required: true, message: '请输入按钮名称'}
        ],
        validateTrigger: ['change', 'blur']
    },
    url: {
        rules: [
            {required: true, message: '请输入url'}
        ],
        validateTrigger: ['change', 'blur']
    },
    method: {
        rules: [
            {required: true, message: '请选择method'}
        ],
        validateTrigger: ['change', 'blur']
    },
    pageId: {
        rules: [
            {required: true, message: '请输入所属页面'}
        ],
        validateTrigger: ['change', 'blur']
    },
    remark: {}

}