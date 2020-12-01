<template>
    <div class="i-entry">
        <EntryHeader/>
        <router-view/>
        <EntryFooter/>
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

<style lang="css" scoped>
    .i-entry {

    }
</style>