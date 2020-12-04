<template>
    <el-tabs v-model="activeName" stretch>
        <el-tab-pane label="通知" name="first" key="1">
            <div>
                用户管理
                <el-divider/>
                用户管理
                <el-divider/>
                用户管理
                <el-divider/>
            </div>
        </el-tab-pane>
        <el-tab-pane label="消息" name="second" key="2">
            配置管理
            <el-divider/>
            配置管理
            <el-divider/>
            配置管理
            <el-divider/>

        </el-tab-pane>
        <el-tab-pane label="代办" name="third" key="3">角色管理</el-tab-pane>
    </el-tabs>
</template>

<script>
    export default {
        name: "MessageContentPane",

        data() {
            return {
                activeName: 'second'

            }
        },

        created() {
            this.activeName = 'second'
        }
    }
</script>

<style scoped>

</style>