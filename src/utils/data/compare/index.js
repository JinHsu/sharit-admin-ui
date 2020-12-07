/**
 * 排序比较器
 * @param a
 * @param b
 * @param compareField 排序的字段
 * @returns {number}
 */
let field = ''
export default function compare(compareField = '') {
    field = compareField
    return f
}

function f(a, b) {
    return (a[field] || '').localeCompare(b[field] || '')
}