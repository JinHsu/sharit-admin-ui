<template>
    <a-tooltip :overlayStyle="{minWidth: '360px'}" placement="right" trigger="click">
        <a-icon type="info-circle" theme="filled" style="color: #1890ff;"/>
        <template slot="title">
            <span>
                每创建一个用户任务前，先以该元素变量为label，集合中的一项为value，创建（局部）流程变量，该局部流程变量被用于指派用户任务。<br />
                一般来说，该字符串应与指定人员变量相同。
            </span>
        </template>
    </a-tooltip>
</template>

<script>
    export default {
        name: "ElementVariableTooltip"
    }
</script>

<style lang="less" scoped>

</style>