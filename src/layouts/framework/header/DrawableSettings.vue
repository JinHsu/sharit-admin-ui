<template>
    <a-drawer
            placement="right"
            :closable="false"
            :visible="drawerOpened"
            @close="onClose"
            :width="300"
            :bodyStyle="{padding: 0}">
        <div class="setting-drawer">
            <!--主题颜色设置-->
            <ThemeColor/>
            <a-divider/>
            <!--边侧栏颜色设置-->
            <ThemeSider/>
            <a-divider/>
            <!--系统语言-->
            <Language/>
            <a-divider/>

        </div>

    </a-drawer>
</template>

<script>
    import {framework} from '@/mixins'
    import {Language, ThemeColor, ThemeSider} from './settings'

    export default {
        name: "DrawableSettings",

        components: {Language, ThemeColor, ThemeSider},

        mixins: [framework],

        methods: {
            onClose() {
                this.setDrawerOpened(false)
            }
        }
    }
</script>

<style lang="less">
    .setting-drawer {
        padding: 20px;

        &-index {
            margin-bottom: 24px;

            &-theme-color {
                height: 20px;

                &-block {
                    width: 20px;
                    height: 20px;
                    border-radius: 2px;
                    float: left;
                    cursor: pointer;
                    margin-right: 8px;
                    padding: 0;
                    text-align: center;
                    font-weight: 700;
                }
            }

            &-title {
                margin-bottom: 12px;
                line-height: 22px;
                font-size: 16px;
                font-weight: 700;
            }

            &-blockChecbox {
                display: flex;
            }

            &-item {
                margin-right: 16px;
                position: relative;
                border-radius: 4px;
                cursor: pointer;

                img {
                    width: 48px;
                }
            }

        }
    }
</style>