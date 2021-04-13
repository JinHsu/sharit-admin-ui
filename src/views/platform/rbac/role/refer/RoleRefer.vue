<template>
    <a-select :value="value"
              show-search
              allowClear
              placeholder="选择角色"
              option-filter-prop="children"
              :filter-option="filterOption"
              @select="onSelect">
        <template v-for="(role, index) in roles">
            <a-select-option :key="index" :value="role.id">
                {{role.title}}
            </a-select-option>
        </template>
    </a-select>
</template>

<script>
    import service from '../service'
    import {arraySort} from "@/utils/data"

    export default {
        name: "RoleRefer",

        props: {
            value: {
                type: String,
                required: false,
            }
        },

        data() {
            return {
                roles: []
            }
        },

        methods: {
            onSelect(value) {
                this.$emit('input', value)
            },

            filterOption(input, option) {
                return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
            },

            async fetchAll() {
                const roles = await service.fetchAll()
                this.roles = arraySort(roles, 'code')
            }

        },

        created() {
            this.fetchAll()
        }
    }
</script>

<style scoped>

</style>