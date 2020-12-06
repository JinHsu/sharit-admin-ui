<template>
    <SettingsButton @click.native="onClick"/>
</template>

<script>
    import SettingsButton from "@/layouts/framework/header/SettingsButton"
    import {framework} from '@/mixins'

    export default {
        name: "SettingsButtonWrapper",

        components: {SettingsButton},

        mixins: [framework],

        methods: {
            onClick() {
                this.setDrawerOpened(true)
            }
        }
    }
</script>

<style scoped>

</style>