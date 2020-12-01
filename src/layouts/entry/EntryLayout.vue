<template>
    <div class="i-entry">
        <EntryHeader class="i-entry-header"/>
        <router-view/>
        <EntryFooter class="i-entry-footer"/>
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
    .i-entry {

        &-header {
            background-color: green;
        }


        .i-entry-footer {
            background-color: red;
        }
    }
</style>