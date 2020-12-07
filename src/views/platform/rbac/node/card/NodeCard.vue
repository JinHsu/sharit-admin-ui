<template>
    <div style="background-color: #fff; padding: 10px; ">
        <!--表头表单-->
        <div style="margin-bottom: 10px;">
            <a-button type="primary" :loading="loading"
                      style="margin-right: 5px;"
                      @click="onSave">保存</a-button>
            <a-button @click="onCancel">取消</a-button>
        </div>

        <!--多页签子表-->

        <!--模态框-->
    </div>
</template>

<script>
    export default {
        name: "NodeCard",

        methods: {
            onSave() {},
            onCancel(){}
        }
    }
</script>

<style scoped>

</style>