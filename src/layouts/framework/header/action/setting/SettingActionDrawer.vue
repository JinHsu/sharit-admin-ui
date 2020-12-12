<template>
    <a-drawer
            placement="right"
            :closable="false"
            :visible="drawerOpened"
            @close="onClose"
            :width="300"
            :bodyStyle="{padding: 0}">
        <div class="setting">
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
    import {Language, ThemeColor, ThemeSider} from './items'

    export default {
        name: "SettingActionDrawer",

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
    .setting {
        padding: 20px;

        &-index {
            margin-bottom: 24px;

            &-theme-color {
                height: 24px;

                .ant-tag {
                    height: 24px;
                    border-radius: 4px;
                    cursor: pointer;
                    padding: 2px 0 0;
                }

                &-block {
                    width: 24px;
                    height: 24px;
                    float: left;
                    cursor: pointer;
                    margin-right: 8px;
                    padding-left: 0;
                    padding-right: 0;
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

            &-block-checbox {
                display: flex;

                img {
                    border-radius: 4px;
                }
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