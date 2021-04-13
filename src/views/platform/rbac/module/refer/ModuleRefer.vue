<template>
    <a-tree-select
            :value="value"
            :disabled="disabled"
            :tree-data="treeData"
            :replaceFields="replaceFields"
            :showSearch="true"
            :allowClear="true"
            searchPlaceholder="搜索模块"
            treeNodeFilterProp="title"
            @change="onChange"
            @search="onSearch"
            @select="onSelect"
            @treeExpand="onTreeExpand"
            @focus="onFocus"
            @blur="onBlur">
    </a-tree-select>
</template>

<script>
    import service from '@/views/platform/rbac/module/service'
    import {array2Tree} from "@/utils/data";

    export default {
        name: "ModuleRefer",

        props: {
            value: {
                type: String,
                required: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            // 强制从后台同步数据
            sync: {
                type: Boolean,
                default: false
            }
        },

        data() {
            return {
                replaceFields: {key: 'id', value: 'id', title: 'title', children: 'children'},
                treeData: []
            }
        },

        methods: {
            //
            onChange(value, label, extra) {
                this.$emit('change', value, label, extra)
            },

            onSearch(value) {
                this.$emit('search', value)
            },

            onSelect(value, node, extra) {
                this.$emit('select', value, node, extra)
            },

            onTreeExpand(expandedKeys) {
                this.$emit('treeExpand', expandedKeys)
            },

            onFocus(e) {
                this.$emit('focus', e)
            },

            onBlur(e) {
                this.$emit('blur', e)
            },

            async syncData() {
                const modules = await service.fetchAll()
                // 转换为树形结构数据
                this.treeData = array2Tree(modules, {})
            }

        },

        mounted() {
            this.syncData()
        },

        watch: {
            sync(value) {
                if (value) {
                    this.syncData()
                }
            }
        }

    }
</script>

<style lang="less" scoped>

</style>