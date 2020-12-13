<template>
    <div class="multi-tab">
        <a-tabs
                type="editable-card"
                hide-add=""
                v-model="activeKey"
                size="default"
                :tabBarGutter="10"
                :tabBarStyle="{borderBottom: 'unset', margin: 0,}"
                @edit="onEdit">
            <template v-for="page in pages">
                <a-tab-pane :key="page.fullPath">
                    <template slot="tab">
                        <a-dropdown :trigger="['contextmenu']">
                            <span>{{page.meta.title}}</span>
                            <a-menu slot="overlay" @click="({key}) => onContextClick(key, page.fullPath)">
                                <a-menu-item key="closeLeft">
                                    <a-icon type="arrow-left"/>
                                    <span>关闭左侧</span>
                                </a-menu-item>
                                <a-menu-item key="closeRight">
                                    <a-icon type="arrow-right"/>
                                    <span>关闭右侧</span>
                                </a-menu-item>
                                <a-menu-item key="closeOther">
                                    <a-icon type="close"/>
                                    <span>关闭其他</span>
                                </a-menu-item>
                                <a-menu-item key="closeAll">
                                    <a-icon type="close-circle"/>
                                    <span>全部关闭</span>
                                </a-menu-item>
                            </a-menu>
                        </a-dropdown>
                    </template>
                </a-tab-pane>
            </template>
        </a-tabs>
    </div>
</template>

<script>
    import {framework} from '@/mixins'

    export default {
        name: "MultiTab",

        components: {},

        data() {
            return {
                fullPathList: [],
                pages: [],
                activeKey: 0
            }
        },

        mixins: [framework],

        methods: {
            onEdit(targetKey) {
                this.remove(targetKey)
                this.saveMultiTab()
            },

            remove(targetKey) {
                this.pages = this.pages.filter(page => page.fullPath !== targetKey)
                this.fullPathList = this.fullPathList.filter(path => path !== targetKey)
                if (!this.fullPathList.includes(this.activeKey)) {
                    this.selectedLastPath()
                }
            },

            selectedLastPath() {
                this.activeKey = this.fullPathList[this.fullPathList.length - 1]
            },

            onContextClick(key, fullPath) {
                this[key](fullPath)
                this.saveMultiTab()
            },

            //
            closeLeft(fullPath) {
                const currentIndex = this.fullPathList.indexOf(fullPath)
                if (currentIndex > 0) {
                    this.fullPathList.forEach((item, index) => {
                        if (index < currentIndex) {
                            this.remove(item)
                        }
                    })
                }
            },

            closeRight(fullPath) {
                const currentIndex = this.fullPathList.indexOf(fullPath)
                if (currentIndex < (this.fullPathList.length - 1)) {
                    this.fullPathList.forEach((item, index) => {
                        if (index > currentIndex) {
                            this.remove(item)
                        }
                    })
                }
            },

            closeOther(fullPath) {
                const currentIndex = this.fullPathList.indexOf(fullPath)
                this.fullPathList.forEach((item, index) => {
                    if (index !== currentIndex) {
                        this.remove(item)
                    }
                })
            },

            closeAll() {
                this.fullPathList.forEach((item) => {
                    this.remove(item)
                })
            },

            saveMultiTab() {
                const {activeKey, fullPathList, pages} = this
                this.setMultiTab({activeKey, fullPathList, pages})
            }

        },

        created() {
            const {fullPathList, pages, activeKey} = this.multiTab
            this.fullPathList = fullPathList
            this.pages = pages
            if (activeKey) {
                this.activeKey = activeKey
            } else {
                const {fullPath, meta} = this.$route
                this.activeKey = fullPath
                if (this.fullPathList.indexOf(fullPath) < 0) {
                    this.fullPathList.push(fullPath)
                    this.pages.push({fullPath, meta})
                }
            }
        },

        watch: {
            '$route'(newVal) {
                const {fullPath, meta} = newVal
                this.activeKey = fullPath
                if (this.fullPathList.indexOf(fullPath) < 0) {
                    this.fullPathList.push(fullPath)
                    this.pages.push({fullPath, meta})
                }
                this.saveMultiTab()
            },

            activeKey(newPathKey) {
                this.$router.push({path: newPathKey})
            },

            multiTab(newVal) {
                const {fullPathList, pages, activeKey} = newVal
                this.fullPathList = fullPathList
                this.pages = pages
                this.activeKey = activeKey
            }
        }

    }
</script>

<style lang="less">
    .multi-tab {
        z-index: 105;
        padding: 0 12px;

        .ant-tabs-tab {
            margin-right: 6px !important;
        }

        .ant-tabs-nav-container {
            margin: 4px 0;

            .ant-tabs-tab-prev, .ant-tabs-tab-next {
                height: 40px;
                line-height: 40px;
                color: rgba(0, 0, 0, 0.65);
            }

            .ant-tabs-tab-next {
                right: 0;
            }

            .ant-tabs-tab-prev-icon-target, .ant-tabs-tab-next-icon-target {
                font-size: 14px;
            }

            .ant-tabs-nav-wrap {
                margin: 0;
                padding: 4px 0;

                .ant-tabs-ink-bar {
                    height: 0;
                    background-color: unset;
                }
            }
        }

        .ant-tabs.ant-tabs-card .ant-tabs-card-bar {
            .ant-tabs-tab {
                background: white;
                border-radius: 4px;
                height: 32px;
                line-height: 32px;
                border: unset;
                margin-right: 4px;

                color: rgba(0, 0, 0, 0.45);

                &:hover {
                    color: unset;
                }

            }

            .ant-tabs-tab-active {
                color: #1890ff;
            }
        }

    }
</style>