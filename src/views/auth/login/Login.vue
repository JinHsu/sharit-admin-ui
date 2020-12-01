<template>
    <h1>
        登录2
        <br>
        <i-circle :percent="80">
            <span class="demo-Circle-inner" style="font-size:24px">80%</span>
        </i-circle>
        <Circle :percent="100" stroke-color="#5cb85c">
            <Icon type="ios-checkmark" size="60" style="color:#5cb85c"></Icon>
        </Circle>
        <i-switch/>

        <Switch/>
    </h1>
</template>

<script>
    export default {
        name: "Login"
    }
</script>

<style scoped>

</style>