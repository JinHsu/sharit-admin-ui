import client from 'webpack-theme-color-replacer/client'
import forElementUI from 'webpack-theme-color-replacer/forElementUI'

// change theme colors at runtime.
export function changeThemeColor(newColor, callback) {
    const options = {
        newColors: [
            ...forElementUI.getElementUISeries(newColor)
        ], // new colors array, one-to-one corresponde with `matchColors`
        // appendToEl: 'head', //optional. The element selector for appending child with `<style>`, default is 'body'. Using `appendToEl: 'body'` can make the css priority higher than any css in <head>
        changeUrl(cssUrl) {
            return `/${cssUrl}`; // while router is not `hash` mode, it needs absolute path
        },
    }

    client.changer.changeColor(options, Promise).then(() => {
        callback && callback()
    })
}