import {message, Modal, notification} from 'ant-design-vue/es'
import router from '@/router'
import {postLogout} from '@/auth/authc'
import {LOGIN_URL} from '@/config/auth'

const errorHandler = (error) => {
    const {status, data} = (error.response || {})

    switch (status) {
        case 401:
            error401(data)
            break

        case 403:
            error403(data)
            break

        case 500:
            error500(data)
            break

        default:
            break
    }

    return Promise.reject(error)
}

function error401(data) {
    if (data.path === LOGIN_URL) { // 登录请求时
        message.error({
            content: data.message
        })
    } else {
        Modal.error({
            title: '错误',
            content: data.message,
            destroyOnClose: true,
            okText: '确定',
            onOk: async () => {
                await postLogout()
                // 跳转到登录页面
                await router.push({path: LOGIN_URL})
                window.location.reload()
            }
        })
    }
}

function error403() {
    notification.error({
        message: '403',
        description: '您没有权限访问该资源'
    })
}

function error500(data) {
    if (typeof data === 'string') {
        notification.error({
            message: '错误',
            description: '服务器拒绝连接，请检查服务是否正常！',
            duration: 3
        })
        return
    }

    notification.error({
        message: '错误',
        description: (h) => {
            return h(
                // 标签
                'error-desc',
                // 标签属性数据对象
                {
                    props: {
                        data: data
                    }
                },
                // 子元素
                []
            )
        },
        duration: 3
    })
}

function errorDesc(h, data) {
    console.log(h)
    return (
        `<a-empty />`
    )
}

export default errorHandler