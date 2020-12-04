<template>
    <el-drawer
            direction="rtl" size="300px"
            :visible="this.drawerOpened" :show-close="true" :modal="true" :append-to-body="true"
            @close="onClose">
        <span slot="title" style="font-size: 16px;">

        </span>

        <div class="setting-drawer">
            <!--边侧栏颜色设置-->
            <div class="setting-drawer-index">
                <div class="setting-drawer-index-title">侧边栏外观</div>
                <div class="setting-drawer-index-blockChecbox">
                    <el-tooltip placement="top" :open-delay="200">
                        <template slot="content">
                            浅色
                        </template>
                        <div class="setting-drawer-index-item">
                            <img src="@/assets/icon-light.svg" alt="light">
                            <div class="setting-drawer-index-selectIcon">
                                <i class="el-icon-check"/>
                            </div>
                        </div>
                    </el-tooltip>
                    <el-tooltip placement="top" :open-delay="200">
                        <template slot="content">
                            深色
                        </template>
                        <div class="setting-drawer-index-item">
                            <img src="@/assets/icon-dark.svg" alt="dark">
                            <div class="setting-drawer-index-selectIcon">
                                <i class="el-icon-check"/>
                            </div>
                        </div>
                    </el-tooltip>
                </div>
            </div>
            <el-divider/>

            <!--主题颜色设置-->
            <div class="setting-drawer-index">
                <div class="setting-drawer-index-title">主题颜色</div>
                <div class="setting-drawer-index-theme-color">
                    <template v-for="(item, index) in colorList">
                        <el-tooltip placement="top" :open-delay="200"
                                    class="setting-drawer-index-theme-color-block"
                                    :key="index">
                            <template slot="content">
                                {{ item.title }}
                            </template>
                            <el-tag :color="item.value">
                                <!-- colorTheme: computed property of mixin -->
                                <i class="el-icon-check"/>
                            </el-tag>
                        </el-tooltip>
                    </template>
                </div>
            </div>
            <el-divider/>

            <!---->
            <div class="setting-drawer-index">
                <div class="setting-drawer-index-title">系统语言</div>

            </div>
            <el-divider/>

        </div>

    </el-drawer>
</template>

<script>
    import {frame} from '@/mixins'

    export default {
        name: "SettingsDrawer",

        data() {
            return {
                colorList: [
                    {title: '薄暮', value: '#F5222D'},
                    {title: '火山', value: '#FA541C'},
                    {title: '日暮', value: '#FAAD14'},
                    {title: '明青', value: '#13C2C2'},
                    {title: '极光绿', value: '#52C41A'},
                    {title: '拂晓蓝（默认）', value: '#1890FF'},
                    {title: '极客蓝', value: '#2F54EB'},
                    {title: '酱紫', value: '#722ED1'}
                ]
            }
        },

        mixins: [frame],

        methods: {
            onClose() {
                this.setDrawerOpened(false)
            }
        }

    }
</script>
<style lang="scss" scoped>
    .setting-drawer {
        padding: 20px;

        &-index {
            margin-bottom: 24px;

            &-theme-color {
                height: 20px;

                &-block {
                    width: 20px;
                    height: 20px;
                    line-height: 20px;
                    border-radius: 2px;

                    cursor: pointer;
                    margin-right: 8px;
                    padding: 0;
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
                font-size: 14px;
                line-height: 22px;
            }

            &-blockChecbox {
                display: flex;
                height: 42px;
                line-height: 42px;
            }

            &-item {
                position: relative;
                margin-right: 16px;
                border-radius: 2px;
                cursor: pointer;
            }

            &-selectIcon {
                position: absolute;
                top: 0;
                right: 0;
                width: 100%;
                height: 100%;
                padding-top: 0;
                padding-left: 24px;
                color: #409EFF;
                font-weight: 700;
                font-size: 16px;
            }

        }
    }
</style>
<style lang="scss">
    .el-drawer__header {
        margin-bottom: 0;
    }

    .setting-drawer-index-theme-color {
        .el-tag {
            border-color: transparent;
        }
    }
</style>