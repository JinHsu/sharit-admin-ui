<template>
    <div class="setting-drawer-index">
        <div class="setting-drawer-index-title">系统语言</div>
        <div class="setting-drawer-index-blockChecbox">
            <a-tooltip placement="top" :open-delay="200" title="简体中文">
                <div class="setting-drawer-index-item" @click="setLocale('zh_CN')">
                    <a-badge :offset="[-24, 40]" :dot="(locale || '') === 'zh_CN'">
                        <img src="@/assets/locales/zh_CN.svg" alt="简体中文" @click="setLocales('zh_CN')">
                    </a-badge>
                </div>
            </a-tooltip>
            <a-tooltip placement="top" :open-delay="200" title="English">
                <div class="setting-drawer-index-item" @click="setLocale('en_US')">
                    <a-badge :offset="[-24, 40]" :dot="(locale || '') === 'en_US'">
                        <img src="@/assets/locales/en_US.svg" alt="English" @click="setLocales('en_US')">
                    </a-badge>
                </div>
            </a-tooltip>
        </div>

    </div>
</template>

<script>
    import {framework} from '@/mixins'

    export default {
        name: "Language",

        mixins: [framework],

        methods: {
            async setLocales(locale) {
                this.$message.loading({content: '正在切换系统语言...', key: 'changeLanguage'})
                await this.setLocale(locale)
                setTimeout(() => this.$message.success({content: '切换系统语言成功！', key: 'changeLanguage'}), 500)
            }
        }
    }
</script>

<style lang="less" scoped>

</style>