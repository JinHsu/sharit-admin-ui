/**
 * 给数组元素数据复制属性
 * @param array
 * @param sourceFieldName
 * @param targetFieldName
 */
function arrayCopyProperty(array = [], {sourceFieldName = '', targetFieldName = ''}) {
    array.forEach(item => item[targetFieldName] = item[sourceFieldName])
}

export default arrayCopyProperty