<template>
    <a-config-provider :locale="locale">
        <div id="app">
            <router-view/>
        </div>
    </a-config-provider>
</template>

<script>
    import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
    import {deviceEnquire} from '@/mixins'

    export default {
        name: 'App',

        data() {
            return {
                locale: zhCN
            }
        },

        mixins: [deviceEnquire]

    }
</script>

<style lang="less" scoped>

</style>
