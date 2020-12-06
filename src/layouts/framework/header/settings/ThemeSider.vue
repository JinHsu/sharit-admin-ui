<template>
    <div class="setting-drawer-index">
        <div class="setting-drawer-index-title">侧边栏外观</div>
        <div class="setting-drawer-index-blockChecbox">
            <a-tooltip placement="top" :open-delay="200">
                <template slot="content">
                    浅色
                </template>
                <div class="setting-drawer-index-item" @click="setThemeSider('light')">
                    <img src="@/assets/icon-light.svg" alt="light">
                    <div class="setting-drawer-index-selectIcon">
                        <a-icon type="check" v-if="(themeSider || '') === 'light'"/>
                    </div>
                </div>
            </a-tooltip>
            <a-tooltip placement="top" :open-delay="200">
                <template slot="content">
                    深色
                </template>
                <div class="setting-drawer-index-item" @click="setThemeSider('dark')">
                    <img src="@/assets/icon-dark.svg" alt="dark">
                    <div class="setting-drawer-index-selectIcon">
                        <a-icon type="check" v-if="(themeSider || '') === 'dark'"/>
                    </div>
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
    }
</script>

<style lang="less" scoped>

</style>