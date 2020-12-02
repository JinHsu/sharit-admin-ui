<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    import {deviceEnquire} from '@/mixins'

    export default {
        name: 'App',
        mixins: [deviceEnquire]
    }
</script>

<style lang="scss">

</style>
