<template>
    <div class="setting-drawer-index">
        <div class="setting-drawer-index-title">侧边栏外观</div>
        <div class="setting-drawer-index-blockChecbox">
            <a-tooltip placement="top" :open-delay="200" title="深色">
                <div class="setting-drawer-index-item" @click="changeThemeSider('dark')">
                    <a-badge :offset="[-24, 50]" :dot="(themeSider || '') === 'dark'">
                        <img src="@/assets/icon-dark.svg" alt="dark">
                    </a-badge>
                </div>
            </a-tooltip>
            <a-tooltip placement="top" :open-delay="200" title="浅色">
                <div class="setting-drawer-index-item" @click="changeThemeSider('light')">
                    <a-badge :offset="[-24, 50]" :dot="(themeSider || '') === 'light'">
                        <img src="@/assets/icon-light.svg" alt="浅色">
                    </a-badge>
                </div>
            </a-tooltip>
        </div>
    </div>
</template>

<script>
    import {framework} from '@/mixins'

    export default {
        name: "ThemeSider",

        mixins: [framework],

        methods: {
            async changeThemeSider(theme) {
                this.$message.loading({content: '正在切换侧边栏外观...', key: 'changeThemeSider'})
                await this.setThemeSider(theme)
                setTimeout(() => this.$message.success({content: '切换侧边栏外观成功！', key: 'changeThemeSider'}), 500)
            }
        }
    }
</script>

<style lang="less" scoped>

</style>