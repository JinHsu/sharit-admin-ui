import translations from './lang/zh_CN'

export default function customTranslate(template, replacements) {
    replacements = replacements || {}

    // Translate
    template = translations[template] || template

    // Replace
    return template.replace(/{([^}]+)}/g, function (_, key) {
        let str = replacements[key];
        if (translations[str]) {
            str = translations[str]
        }
        return str || '{' + key + '}'
    })
}
