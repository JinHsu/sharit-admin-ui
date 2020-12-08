<template>
    <a-tree-select
            :value="value"
            :disabled="disabled"
            :tree-data="treeData"
            :replaceFields="replaceFields"
            :showSearch="true"
            :allowClear="true"
            searchPlaceholder="搜索页面"
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
    import moduleService from "@/views/platform/rbac/module/service";
    import pageService from "@/views/platform/rbac/page/service";
    import {array2Tree} from "@/utils/data";

    export default {
        name: "PageRefer",
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
                const moduleFetch = moduleService.fetchAll(); // 模块数据查询
                const pageFetch = pageService.fetchAll(); // 页面数据查询

                const results = await Promise.all([moduleFetch, pageFetch]); // 合并异步查询，等待返回结果
                const [modules, pages] = results // 数组解构
                // 封装数据
                const referDatas = []
                modules.forEach(item => referDatas.push({...item, disabled: true}))
                pages.forEach(item => {
                    const {id, version, code, title, moduleId: parentId, remark} = item
                    referDatas.push({id, version, code, title, parentId, remark})
                })
                // 数据转换
                this.treeData = array2Tree(referDatas, {})
            },
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

<style scoped>

</style>