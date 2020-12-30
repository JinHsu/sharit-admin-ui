<template>
    <ul>
        <li>
            <b>类</b><br>
            <span>示例：<code>com.company.MyCustomListener</code></span><br>
            <span>该类须实现接口：<code>org.flowable.engine.delegate.TaskListener</code></span>
        </li>
        <li>
            <b>表达式</b><br>
            <span>示例：<code>${myObject.callMethod(task, task.eventName)}</code></span>
        </li>
        <li>
            <b>委托表达式</b><br>
            <span>示例：<code>${myListenerSpringBean}</code></span><br>
            <span>该<code>springBean</code>须实现接口：<code>org.flowable.engine.delegate.TaskListener</code></span>
        </li>
    </ul>
</template>

<script>
    export default {
        name: "TypeTooltip"
    }
</script>

<style lang="less" scoped>

</style>