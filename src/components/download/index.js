export default function (data, type, filename, callback) {
    const blob = new Blob([data], type)
    const a = document.createElement('a')
    const url = window.URL.createObjectURL(blob)
    a.href = url
    a.download = filename
    a.click()
    window.URL.revokeObjectURL(url)

    callback && callback()
}