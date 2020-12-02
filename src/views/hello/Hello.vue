<template>
    <div style="padding: 20px;">
        <h1>Hello World!</h1>

        <!---->
        <el-divider content-position="left">起步</el-divider>
        <el-alert title="成功提示的文案" type="success"/>

        <!---->
        <el-divider content-position="left">国际化</el-divider>
        <el-select v-model="language" placeholder="选择语言" @change="locale => $i18n.locale = locale">
            <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
        </el-select>
        <el-divider direction="vertical"/>
        <el-date-picker/>

        <!---->
        <el-divider content-position="left">主题切换</el-divider>
        <el-row :gutter="20">
            <el-col :span="6">
                <el-button type="primary">按钮</el-button>
            </el-col>
        </el-row>

        <!---->
        <el-divider/>


    </div>
</template>

<script>
    export default {
        name: "Hello",
        data() {
            return {
                language: '',
                options: [
                    {label: '中文', value: 'zhCN'},
                    {label: '英文', value: 'en'},
                ]
            }
        },
    }
</script>

<style scoped>

</style>