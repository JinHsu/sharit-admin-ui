<template>
    <a-breadcrumb class="header-breadcrumb">
        <template v-for="(bread, index) in breadList">
            <a-breadcrumb-item :key="index">
                {{bread.name}}
            </a-breadcrumb-item>
        </template>
    </a-breadcrumb>
</template>

<script>
    export default {
        name: "BreadCrumbTab",

        data() {
            return {
                breadList: []
            }
        },

        methods: {
            getBreadcrumbList() {
                this.breadList = []
                this.$route.matched.forEach(item => item.name !== 'root' && this.breadList.push(item))
            }
        },

        created() {
            this.getBreadcrumbList()
        },

        watch: {
            '$route'() {
                this.getBreadcrumbList()
            }
        }

    }
</script>

<style lang="less" scoped>
    .header-breadcrumb {
        height: 64px;
        line-height: 64px;
    }
</style>