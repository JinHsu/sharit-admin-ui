<template>
    <div style="background-color: #ffffff; ">
        <div style="padding: 10px">
            <a-button type="primary">按钮</a-button>
            <a-divider/>
            <a-checkbox type="primary" checked="">中文</a-checkbox>
            <a-divider/>
            <a-radio checked>A</a-radio>
            <a-divider/>
            <a-alert description="这是一段描述"></a-alert>
            <a-divider/>
            <a-button block>按钮</a-button>
            <a-divider/>
            <a-tag>标签一</a-tag>
            <a-divider/>
            <a-table></a-table>
            <a-divider/>
            <a-table></a-table>
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