<template>
    <a-tooltip :overlayStyle="{minWidth: '360px'}" placement="right" trigger="click">
        <a-icon type="info-circle" theme="filled" style="color: #1890ff;"/>
        <template slot="title">
            <span>
                多实例活动在所有实例都完成时结束，然而也可以指定一个表达式，在每个实例结束时进行计算。<br/>
                当表达式计算为true时，将销毁所有剩余的实例，并结束多实例活动，继续执行流程。<br/>
                例如 ${nrOfCompletedInstances/nrOfInstances >= 0.6 }，表示当任务完成60%时，该节点就算完成。
            </span>
        </template>
    </a-tooltip>
</template>

<script>
    export default {
        name: "CompletionConditionTooltip"
    }
</script>

<style lang="less" scoped>

</style>