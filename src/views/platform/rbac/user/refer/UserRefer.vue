<template>
    <a-select :value="value"
              show-search
              allowClear
              placeholder="选择用户"
              option-filter-prop="children"
              :filter-option="filterOption"
              @select="onSelect">
        <template v-for="(user, index) in users">
            <a-select-option :key="index" :value="user.id">
                {{user.username}}
            </a-select-option>
        </template>
    </a-select>
</template>

<script>
    import service from '../service'
    import {arraySort} from "@/utils/data";

    export default {
        name: "UserRefer",

        props: {
            value: {
                type: String,
                required: false,
            }
        },

        data() {
            return {
                users: []
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
                const users = await service.fetchAll()
                this.users = arraySort(users, 'username')
            }

        },

        created() {
            this.fetchAll()
        },

        watch: {}
    }
</script>

<style lang="less" scoped>

</style>