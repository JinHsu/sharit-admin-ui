import VueI18n from 'vue-i18n'

import en from 'view-design/dist/locale/en-US'
import zh from 'view-design/dist/locale/zh-CN'

const i18n = new VueI18n({
    locale: "zh", // set locale
    messages: {
        en: en, zh: zh
    } // set locale messages
})


export default i18n