<template>
    <div style="background-color: #ffffff; ">
        <div style="padding: 10px">
            <el-button type="primary">按钮</el-button>
            <el-divider/>
            <el-button type="primary">按钮</el-button>
            <el-divider/>
            <el-tag>标签一</el-tag>
            <el-divider/>

            <el-icon-lang lang="zh_CN"/>
            <el-divider direction="vertical"/>
            <el-icon-lang lang="en_US"/>
            <el-divider/>

            <el-icon name="qq" :size="20"/>
        </div>
    </div>
</template>

<script>

    export default {
        name: "Workbench",
    }
</script>

<style scoped>

</style>