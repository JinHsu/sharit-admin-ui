<template>
    <ul>
        <li>
            <b>create（创建）</b><br>
            <span>当任务已经创建，并且所有任务参数都已经设置时触发。</span>
        </li>
        <li>
            <b>assignment（指派）</b><br>
            <span>当任务已经指派给某人时触发。请注意：当流程执行到达用户任务时，在触发create事件之前，会首先触发assignment事件。</span>
        </li>
        <li>
            <b>complete（完成）</b><br>
            <span>当任务已经完成，从运行时数据中删除前触发。</span><br>
        </li>
        <li>
            <b>delete（删除）</b><br>
            <span>在任务即将被删除前触发。请注意任务由completeTask正常完成时也会触发。</span><br>
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