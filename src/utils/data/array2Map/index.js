/**
 * 数组转为HashMap
 * @param array
 * @param keyName
 */
export default (array = [], keyName = '') => {
    const dataMap = new Map()
    array.forEach((item) => {
        dataMap.set(item[keyName], item)
    })
    return dataMap
}