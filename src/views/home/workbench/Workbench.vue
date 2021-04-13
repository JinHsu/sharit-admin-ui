<template>
    <div class="workbench">
        <div class="content">
            <a-card :bordered="false" :bodyStyle="{width: '360px'}" style="margin-right: 16px;">
                <template slot="title">
                    快速导航
                </template>
                <div>
                    <a-row :gutter="[16, 16]">
                        <a-col :span="12">
                            <router-link :to="{path: '/platform/rbac/userrole'}">
                                <a-icon type="link"/>
                                用户权限
                            </router-link>
                        </a-col>
                        <a-col :span="12">
                            <router-link :to="{path: '/platform/rbac/rolemenu'}">
                                <a-icon type="link"/>
                                角色权限
                            </router-link>
                        </a-col>
                        <a-col :span="12">
                            <router-link :to="{path: '/platform/rbac/buttonauth'}">
                                <a-icon type="link"/>
                                按钮权限
                            </router-link>
                        </a-col>
                    </a-row>
                </div>
            </a-card>

            <a-card :bordered="false" :bodyStyle="{minWidth: '400px'}" style="margin-right: 16px;">
                <template slot="title">
                    个人动态
                </template>
                <a-list item-layout="horizontal" :data-source="list">
                    <a-list-item slot="renderItem" slot-scope="item, index">
                        <a-list-item-meta
                                description="Ant Design, a design language for background applications, is refined by Ant UED Team, Ant Design, a design language for background applications, is refined by Ant UED Team"
                        >
                            <a slot="title" href="https://www.antdv.com/">{{ item.title }}</a>
                            <a-avatar
                                    slot="avatar"
                                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                            />
                        </a-list-item-meta>
                    </a-list-item>
                </a-list>
            </a-card>

            <a-card :bordered="false" :bodyStyle="{width: '360px'}">
                <template slot="title">
                    日历
                </template>
                <a-calendar :fullscreen="false" @panelChange="onPanelChange"/>
            </a-card>
        </div>

        <div class="activity">

        </div>


    </div>
</template>

<script>
    export default {
        name: "Workbench",

        data() {
            return {
                list: [
                    {
                        title: 'Ant Design Title 1',
                    },
                    {
                        title: 'Ant Design Title 2',
                    },
                    {
                        title: 'Ant Design Title 3',
                    },
                    {
                        title: 'Ant Design Title 4',
                    },
                ]
            }
        },

        methods: {
            onPanelChange() {
            }
        }
    }
</script>

<style lang="less" scoped>
    .workbench {

        .content {
            display: flex;
            align-items: stretch;
            margin-bottom: 16px;
        }
    }

</style>