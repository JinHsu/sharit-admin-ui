<template>
    <div class="setting-drawer-index">
        <div class="setting-drawer-index-title">主题颜色</div>
        <div class="setting-drawer-index-theme-color">
            <template v-for="(item, index) in colorList">
                <a-tooltip placement="top" :open-delay="200"
                           class="setting-drawer-index-theme-color-block"
                           :key="index">
                    <template slot="content">
                        {{ item.title }}
                    </template>
                    <a-tag :color="item.value" @click="changeThemeColor(item.value)">
                        <!-- colorTheme: computed property of mixin -->
                        <a-icon type="check" v-if="themeColor === item.value"/>
                    </a-tag>
                </a-tooltip>
            </template>
        </div>
    </div>
</template>

<script>
    import {framework} from '@/mixins'
    import colorReplacer from '@/utils/theme'

    export default {
        name: "ThemeColor",

        data() {
            return {
                colorList: [
                    {title: '薄暮', value: '#F5222D'},
                    {title: '火山', value: '#FA541C'},
                    {title: '日暮', value: '#FAAD14'},
                    {title: '明青', value: '#13C2C2'},
                    {title: '极光绿', value: '#52C41A'},
                    {title: '拂晓蓝（默认）', value: '#1890FF'},
                    {title: '极客蓝', value: '#2F54EB'},
                    {title: '酱紫', value: '#722ED1'}
                ]
            }
        },

        mixins: [framework],

        methods: {
            changeThemeColor(color) {
                this.$message.loading({content: '正在切换主题颜色...', key: 'changeThemeColor'})
                const delay = () => this.$message.success({content: '切换主题颜色成功！', key: 'changeThemeColor'})
                const callback = () => this.setThemeColor(color).then(() => setTimeout(() => delay(), 500))
                colorReplacer(color, callback)
            }
        }

    }
</script>

<style lang="less" scoped>

</style>