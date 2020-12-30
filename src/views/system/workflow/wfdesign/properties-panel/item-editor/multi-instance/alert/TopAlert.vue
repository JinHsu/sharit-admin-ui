<template>
    <a-alert style="margin-bottom: 20px;">
        <span slot="message">
            <span>按照BPMN2.0规范的要求，用于为每个实例创建执行的父执行，会提供下列变量:</span>
            <ul>
                <li>nrOfInstances：实例总数。</li>
                <li>nrOfActiveInstances：当前活动的（即未完成的），实例数量。对于顺序多实例，这个值总为1。</li>
                <li>nrOfCompletedInstances：已完成的实例数量。</li>
                <li>loopCounter：给定实例在for-each循环中的index。</li>
            </ul>
        </span>
    </a-alert>
</template>

<script>
    export default {
        name: "TopAlert"
    }
</script>

<style scoped>

</style>