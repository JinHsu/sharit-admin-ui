<template>
    <a-icon class="trigger" :type="iconType" @click="onToggle"/>
</template>

<script>
    import {device, framework} from '@/mixins'

    export default {
        name: "ToggleButton",

        mixins: [device, framework],

        computed: {
            iconType() {
                return this.collapsed ? 'menu-unfold' : 'menu-fold'
            }
        },

        methods: {
            onToggle() {
                this.setCollapsed(!this.collapsed)
            }
        }

    }
</script>

<style scoped>
    .trigger {
        font-size: 20px;
        line-height: 64px;
        padding: 0 24px;
        cursor: pointer;
        -webkit-transition: color 0.3s;
        transition: color 0.3s;
    }
</style>