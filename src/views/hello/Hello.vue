<template>
    <div style="padding: 20px;">
        <h1>Hello World!</h1>

        <!---->
        <el-divider/>
        <el-alert title="成功提示的文案" type="success"/>

        <!---->
        <el-divider/>
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