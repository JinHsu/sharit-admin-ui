<template>
    <a-select
            :value="value"
            placeholder="选择角色"
            @change="onChange"
            @search="onSearch"
            allowClear
            :filter-option="filterOption">

        <template v-for="(role, index) in roles">
            <a-select-option :key="index" :value="role.id">
                {{role.title}}
            </a-select-option>
        </template>
    </a-select>
</template>

<script>
    import service from '../service'

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
            onChange(value) {
                this.$emit('input', value)
            },

            onSearch() {

            },

            // eslint-disable-next-line no-unused-vars
            filterOption(value, option) {

            },

            async fetchAll() {
                this.roles = await service.fetch()
            }

        },

        created() {
            this.fetchAll()
        }
    }
</script>

<style scoped>

</style>