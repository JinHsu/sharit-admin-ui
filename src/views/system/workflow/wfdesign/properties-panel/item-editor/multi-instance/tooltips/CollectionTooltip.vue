<template>
    <a-tooltip :overlayStyle="{minWidth: '360px'}" placement="right" trigger="click">
        <a-icon type="info-circle" theme="filled" style="color: #1890ff;"/>
        <template slot="title">
            <span>
                属性会作为表达式进行解析。<br/>
                如果表达式解析为字符串而不是一个集合，不论是因为本身配置的就是静态字符串值，还是表达式计算结果为字符串，这个字符串都会被当做变量名，并从流程变量中用于获取实际的集合。
            </span>
        </template>
    </a-tooltip>
</template>

<script>
    export default {
        name: "CollectionTooltip"
    }
</script>

<style lang="less" scoped>

</style>