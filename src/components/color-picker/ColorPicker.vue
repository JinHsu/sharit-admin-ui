<template>
    <div class="color-picker">
        <div @click.stop="showPicker" class="outline">
            <div class="inner" :style="{backgroundColor: value}">
            </div>
        </div>
        <chrome-picker id="a-color-picker" :value="value" class="chrome" disableAlpha
                       @input="updateValue"
                       v-show="visible"/>
    </div>
</template>

<script>
    import {Sketch} from 'vue-color'

    export default {
        name: "ColorPicker",

        props: {
            value: {
                type: String,
                default: '#ffffff'
            }
        },

        components: {
            ChromePicker: Sketch
        },

        data() {
            return {
                visible: false
            }
        },

        computed: {
            element() {
                return document.getElementById('a-color-picker')
            }
        },

        methods: {
            showPicker() {
                this.visible = true
            },

            updateValue(value) {
                this.$emit('change', value.hex)
            },

            handleDocumentClick(e) {
                this.visible = this.element.contains(e.target)
            },

        },

        mounted() {
            document.addEventListener('click', this.handleDocumentClick)
        },

        destroyed() {
            document.removeEventListener('click', this.handleDocumentClick)
        }

    }
</script>

<style lang="less" scoped>
    .color-picker {
        display: inline-block;
        vertical-align: middle;
        height: 32px;
        width: 100%;

        .outline {
            width: 64px;
            height: 32px;
            background-color: unset;
            border-radius: 4px;
            border: 1px solid #d9d9d9;
            box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);

            display: flex;
            align-items: center;
            justify-content: center;

            .inner {
                width: 56px;
                height: 24px;
                border-radius: 2px;
            }

        }

        .chrome {
            position: absolute;
            z-index: 300;
            transition: all .3s, height 1s;
        }
    }
</style>

<style lang="less">
    .vc-sketch {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15) !important;

        .vc-sketch-field {
            line-height: 16px !important;

            .vc-input__input {
                padding: 4px 0 4px 2px !important;
            }

        }
    }
</style>