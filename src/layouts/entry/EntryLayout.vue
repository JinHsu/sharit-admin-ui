<template>
    <div class="ant-layout-entry">
        <div class="wrapper">
            <entry-header/>
            <router-view/>
            <entry-footer/>
        </div>
    </div>
</template>

<script>
    import EntryHeader from './header'
    import EntryFooter from './footer'

    export default {
        name: "EntryLayout",
        components: {
            EntryHeader, EntryFooter
        }

    }
</script>

<style lang="less" scoped>
    .ant-layout-entry {
        height: 100vh;

        .wrapper {
            position: relative;

            width: 100%;
            height: 100%;
            min-height: 100%;
            background: #F0F2F5 url(~@/assets/background.svg) no-repeat 50%;
            background-size: 100%;

            padding: 100px 0;
        }

    }

</style>