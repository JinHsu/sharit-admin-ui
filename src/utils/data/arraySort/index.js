import compare from "../compare";

/**
 * 数组排序
 *
 * @param array
 * @param sortFieldName
 */
export default function arraySort(array = [], sortFieldName = '') {
    if (!array || array.length <= 1) {
        return array
    }
    array.sort(compare(sortFieldName))
    return array
}
