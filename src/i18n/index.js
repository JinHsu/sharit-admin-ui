import VueI18n from 'vue-i18n'

import ElementLocale from 'element-ui/lib/locale'
import en from 'element-ui/lib/locale/lang/en'
import zhCN from 'element-ui/lib/locale/lang/zh-CN'

const i18n = new VueI18n({
    locale: "zhCN", // set locale
    messages: {
        en, zhCN
    } // set locale messages
})

ElementLocale.i18n((key, value) => i18n.t(key, value))

export default i18n