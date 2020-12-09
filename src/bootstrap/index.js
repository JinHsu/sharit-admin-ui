import Vue from 'vue'
import store from '@/store'
import changeColor from '@/utils/theme'
import config from '@/config/bootstrap'

/**
 * 启动创建页面前需要做的一些事
 */
export default async function bootstrap() {
    process.env.NODE_ENV !== 'production' && console.log("[antd] bootstrap.")

    //
    let themeColor = Vue.ls.get('themeColor', config.themeColor)
    await store.dispatch('framework/setThemeColor', themeColor)
    changeColor(themeColor)

    //
    let themeSider = Vue.ls.get('themeSider', config.themeSider)
    await store.dispatch('framework/setThemeSider', themeSider)

    //
    let collapsed = Vue.ls.get('collapsed', config.collapsed)
    await store.dispatch('framework/setCollapsed', collapsed)

    //
    let locale = Vue.ls.get('locale', config.locale)
    await store.dispatch('framework/setLocale', locale)

}
