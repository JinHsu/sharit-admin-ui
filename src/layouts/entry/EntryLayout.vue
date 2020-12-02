<template>
    <div class="el-entry">
        <div class="el-entry-wrapper">
            <entry-header/>
            <router-view/>
            <entry-footer/>
        </div>
    </div>
</template>

<script>
    import {EntryFooter, EntryHeader} from '@/components/entry'

    export default {
        name: "EntryLayout",
        components: {
            EntryHeader, EntryFooter
        }

    }
</script>

<style lang="scss" scoped>
    .el-entry {
        height: 100vh;
        /*overflow: hidden;*/

        &-wrapper {
            width: 100%;
            min-height: 100%;
            background: #F2F6FC url(~@/assets/background.svg) no-repeat 50%;
            background-size: 100%;
            padding: 100px 0;
            position: relative;
        }

    }

</style>