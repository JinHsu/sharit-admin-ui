<template>
    <svg :style="svgStyle" aria-hidden="true">
        <use :xlink:href="`#${name}`"/>
    </svg>
</template>

<script>
    export default {
        name: "ElIcon",
        props: {
            name: {
                type: String,
                default: ''
            },
            size: {
                type: Number,
                default: 36
            },
            color: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                svgStyle: {
                    width: `${this.size}px`,
                    height: `${this.size}px`,
                    overflow: 'hidden',
                    fill: `${this.color}`
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>