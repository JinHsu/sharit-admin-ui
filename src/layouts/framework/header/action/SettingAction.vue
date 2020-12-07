<template>
    <setting-action-wrapper @click.native="onClick"/>
</template>

<script>
    import SettingActionWrapper from "./SettingActionWrapper"
    import {framework} from '@/mixins'

    export default {
        name: "SettingAction",

        components: {SettingActionWrapper},

        mixins: [framework],

        methods: {
            onClick() {
                this.setDrawerOpened(true)
            }
        }
    }
</script>

<style lang="less" scoped>

</style>