<template>
    <svg :style="svgStyle" aria-hidden="true">
        <use :xlink:href="`#${lang}`"/>
    </svg>
</template>

<script>
    export default {
        name: "ElIconLang",
        props: {
            lang: {
                type: String,
                default: ''
            },
            size: {
                type: Number,
                default: 20
            }
        },

        data() {
            return {
                svgStyle: {
                    width: `${this.size * 3}px`,
                    height: `${this.size * 2}px`,
                    overflow: 'hidden'
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>