<template>
    <icon-fonts :type="type"/>
</template>

<script>
    import {Icon} from 'ant-design-vue'

    const IconFonts = Icon.createFromIconfontCN({
        scriptUrl: '//at.alicdn.com/t/font_2272665_ifvg1dt26rl.js',
    })
    export default {
        name: "IconFont",
        components: {IconFonts},
        props: {
            type: {type: String, required: true}
        }
    }
</script>

<style lang="less" scoped>

</style>