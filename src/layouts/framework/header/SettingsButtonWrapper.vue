<template>
    <SettingsButton @click.native="onClick"/>
</template>

<script>
    import SettingsButton from "@/layouts/framework/header/SettingsButton"

    export default {
        name: "SettingsButtonWrapper",

        components: {SettingsButton},

        methods: {
            onClick() {
                console.log("onClick")
            }
        }
    }
</script>

<style scoped>

</style>