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
            <template v-for="tab in panes">
                <a-tab-pane :key="tab.key">
                    <template slot="tab">
                        <a-dropdown :trigger="['contextmenu']">
                            <span>{{tab.title}}</span>
                            <a-menu slot="overlay" @click="onContextClick">
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
    export default {
        name: "MultiTab",

        components: {},

        data() {
            const panes = []
            for (let index = 0; index < 20; index++) {
                panes.push({key: index, title: 'Tab ' + index})
            }

            return {
                panes,
                activeKey: 0
            }
        },

        methods: {
            onEdit(targetKey) {
                this.remove(targetKey)
            },

            remove(targetKey) {
                let activeKey = this.activeKey;
                let lastIndex;
                this.panes.forEach((pane, i) => {
                    if (pane.key === targetKey) {
                        lastIndex = i - 1;
                    }
                });
                const panes = this.panes.filter(pane => pane.key !== targetKey);
                if (panes.length && activeKey === targetKey) {
                    if (lastIndex >= 0) {
                        activeKey = panes[lastIndex].key;
                    } else {
                        activeKey = panes[0].key;
                    }
                }
                this.panes = panes;
                this.activeKey = activeKey;
            },

            onContextClick({key, keyPath}) {
                console.log(keyPath)
                this[key]()
            },

            //
            closeLeft() {
                console.log("closeLeft")
            },
            closeRight() {
                console.log("closeRight")
            },
            closeOther() {
                console.log("closeOther")
            },
            closeAll() {
                console.log("closeAll")
            },

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