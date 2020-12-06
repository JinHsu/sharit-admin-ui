<template>
    <a-drawer
            placement="right"
            :closable="false"
            :visible="drawerOpened"
            @close="onClose"
            :width="300"
            :bodyStyle="{padding: 0}">
        <div class="setting-drawer">
            <!--边侧栏颜色设置-->
            <ThemeSider/>
            <a-divider/>

            <!--主题颜色设置-->
            <ThemeColor/>
            <a-divider/>

            <!---->
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
                    padding-left: 0px;
                    padding-right: 0px;
                    text-align: center;
                    color: #fff;
                    font-weight: 700;

                    i {
                        font-size: 14px;
                    }
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

            &-selectIcon {
                position: absolute;
                top: 0;
                right: 0;
                width: 100%;
                padding-top: 15px;
                padding-left: 24px;
                height: 100%;
                color: #1890ff;
                font-size: 14px;
                font-weight: 700;
            }

        }
    }
</style>