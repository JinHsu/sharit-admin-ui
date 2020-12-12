import Vue from 'vue'
import store from '@/store'

/**
 * action按钮权限指令
 */
const action = {
    install: function (Vue) {
        Vue.directive('action', {
            // 被绑定的元素插入父节点的时候调用(父节点存在即可调用，不必存在document中)
            inserted: function (el, binding, vnode) {
                const {menuId, usePerm} = vnode.context.$route.meta
                if (!usePerm) {
                    return
                }
                const buttonMap = store.state.app.buttons
                if (buttonMap && menuId) {
                    const buttons = buttonMap.get(menuId)
                    const actionName = binding.arg
                    if (buttons && !buttons.includes(actionName)) {
                        el.parentNode && el.parentNode.removeChild(el) || (el.style.display = 'none')
                    }
                }
            },
            // 只调用一次，指令第一次绑定到元素时候调用，用这个钩子可以定义一个绑定时执行一次的初始化动作。
            bind: function () {
            },
            // 被绑定与元素所在模板更新时调用，而且无论绑定值是否有变化，通过比较更新前后的绑定值，忽略不必要的模板更新
            update: function () {

            },
            // 被绑定的元素所在模板完成一次更新更新周期的时候调用
            componentUpdated: function () {

            },
            // 只调用一次，指令元素解绑的时候调用
            unbind: function () {

            }

        })
    }
}

Vue.use(action)