<template>
    <a-select :value="value"
              show-search
              allowClear
              placeholder="选择国家/地区"
              option-filter-prop="children"
              :filter-option="filterOption"
              :open="open"
              @select="onSelect"
              @change="onChange"
              @dropdownVisibleChange="onDropdownVisibleChange">
        <template v-for="(nation, index) in nations">
            <a-select-option :key="index" :value="nation.id">
                {{nation.title}}
            </a-select-option>
        </template>
    </a-select>
</template>

<script>
    import service from '../service'
    import {arraySort} from "@/utils/data"

    export default {
        name: "NationRefer",

        props: {
            value: {
                type: String,
                required: false,
            }
        },

        data() {
            return {
                open: false,
                nations: []
            }
        },

        methods: {
            onDropdownVisibleChange(open) {
                this.open = open
                if (open) {
                    this.fetchAll()
                }
            },

            onChange(value) {
                this.$emit('change', value)
            },

            onSelect(value) {
                this.$emit('select', value)
            },

            filterOption(input, option) {
                return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
            },

            async fetchAll() {
                const nations = await service.fetchAll()
                this.nations = arraySort(nations, 'code')
            },

            async fetchOne() {
                const nation = await service.fetchOne(this.value)
                this.nations = [nation]
            }

        },

        watch: {
            value(n, o) {
                if (n && n !== o) {
                    this.fetchOne()
                }
            },
        }

    }
</script>

<style scoped>

</style>