<template>
    <div class="el-navbar-message">
        <el-popover :width="300" placement="top-end">
            <el-tabs v-model="activeName" stretch>
                <el-tab-pane label="通知" name="first">
                    <div>
                        用户管理
                        <el-divider/>
                        用户管理
                        <el-divider/>
                        用户管理
                        <el-divider/>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="消息" name="second">
                    配置管理
                    <el-divider/>
                    配置管理
                    <el-divider/>
                    配置管理
                    <el-divider/>

                </el-tab-pane>
                <el-tab-pane label="代办" name="third">角色管理</el-tab-pane>
            </el-tabs>


            <el-badge :value="5" slot="reference">
                <i class="el-icon-message-solid"></i>
                <!--            <span>消息</span>-->
            </el-badge>
        </el-popover>

    </div>
</template>

<script>
    export default {
        name: "Message",
        data() {
            return {
                activeName: 'first'
            }
        }
    }
</script>

<style lang="scss">
    .el-navbar-message {
        font-size: 16px;
        color: #888888;
        width: 40px;
        height: 64px;
        line-height: 64px;
        cursor: pointer;
        padding: 0 10px;
        text-align: center;

        &:hover {
            background: #f9f9f9;
        }

        .el-badge {

        }

        .el-badge__content.is-fixed {
            top: 20px;
        }

        > i {
            padding: 12px;
        }

    }
</style>