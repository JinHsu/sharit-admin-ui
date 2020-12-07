<template>
    <div>
        <a-button type="primary" @click="onEdit">修改</a-button>
        <a-descriptions style="margin-top: 12px;"
                        :column="{ xxl: 3, xl: 3, lg: 2, md: 2, sm: 1, xs: 1 }">
            <a-descriptions-item label="昵称">
                {{(this.userInfo || {}).nickname}}
            </a-descriptions-item>
            <a-descriptions-item label="性别">
                {{(this.userInfo || {}).sex === -1 ? '保密' : (this.userInfo || {}).sex === 1 ? '男' : '女'}}
            </a-descriptions-item>
            <a-descriptions-item label="生日">
                {{(this.userInfo || {}).birthday}}
            </a-descriptions-item>
            <a-descriptions-item label="所在地区">
                {{(this.userInfo || {}).area}}
            </a-descriptions-item>
        </a-descriptions>

        <edit-modal v-model="visible"></edit-modal>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import EditModal from "./EditModal";

    export default {
        name: "BasicSetting",

        components: {EditModal},

        props: {},

        data() {
            return {
                visible: false
            }
        },

        methods: {
            onEdit() {
                this.visible = true
            }
        },

        computed: {
            ...mapState('app', ['userInfo'])
        },

        created() {
        },

        mounted() {

        },

        watch: {}

    }
</script>

<style lang="less" scoped>

</style>