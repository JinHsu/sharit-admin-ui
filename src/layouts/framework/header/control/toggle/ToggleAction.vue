<template>
    <toggle-action-wrapper @click.native="onToggle"/>
</template>

<script>
    import {framework} from '@/mixins'
    import ToggleActionWrapper from './ToggleActionWrapper'

    export default {
        name: "ToggleAction",

        components: {
            ToggleActionWrapper
        },

        mixins: [framework],

        methods: {
            onToggle() {
                this.setCollapsed(!this.collapsed)
            }
        }
    }
</script>

<style scoped>

</style>