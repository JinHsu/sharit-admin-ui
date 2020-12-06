<template>
    <a-config-provider :locale="getLocale">
        <div id="app">
            <router-view/>
        </div>
    </a-config-provider>
</template>

<script>
    import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
    import enUS from 'ant-design-vue/lib/locale-provider/en_US'
    import {deviceEnquire, framework} from '@/mixins'

    export default {
        name: 'App',

        data() {
            return {
                locales: {
                    "zh_CN": zhCN,
                    "en_US": enUS
                }
            }
        },

        mixins: [deviceEnquire, framework],

        computed: {
            getLocale() {
                return this.locales[this.locale]
            }
        },

        created() {
            // ...

        }

    }
</script>

<style lang="less" scoped>

</style>
