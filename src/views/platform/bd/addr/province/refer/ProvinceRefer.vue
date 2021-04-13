<template>
    <a-select :value="value"
              :open="open"
              allowClear
              placeholder="选择省（直辖市）"
              @select="onSelect"
              @change="onChange"
              @dropdownVisibleChange="onDropdownVisibleChange">
        <a-select-option v-if="province" :key="province.id" :value="province.id">
            {{province.name}}
        </a-select-option>
        <div slot="dropdownRender" slot-scope="menu">
            <a-tabs default-active-key="1" v-model="activeTabKey"
                    @change="onTabChange" @mousedown="e => e.preventDefault()">
                <a-tab-pane key="1" :tab="province ? province.title : '省/直辖市'" :disabled="provinces.length === 0">
                    <div class="tab-pane">
                        <a-row :gutter="[8, 8]">
                            <template v-for="province in provinces">
                                <a-col :span="8">
                                    <a @click="onProvinceClick(province)"> {{province.title}} </a>
                                </a-col>
                            </template>
                        </a-row>
                    </div>
                </a-tab-pane>
            </a-tabs>
        </div>
    </a-select>
</template>

<script>
    import {arraySort} from "@/utils/data"
    import service from '../service'

    export default {
        name: "ProvinceRefer",

        props: {
            value: {
                type: String,
                required: false,
            }
        },

        data() {
            return {
                open: false,
                activeTabKey: '1',

                provinces: [],
                province: null, // 选中的省/直辖市
            }
        },

        methods: {
            onDropdownVisibleChange(open) {
                this.open = open
                if (open) {
                    this.fetchAllProvince()
                }
            },

            onChange(value) {
                this.$emit('change', value)
            },

            onSelect(value) {
                this.$emit('select', value)
            },

            onTabChange(activeTabKey) {
                this.activeTabKey = activeTabKey
            },

            onProvinceClick(province) {
                if (!this.province || this.province.id !== province.id) {
                    this.onChange(province.id)
                } else {
                    this.onSelect(province.id)
                }
                this.province = province
                this.open = false
            },

            async fetchAllProvince() {
                const provinces = await service.fetchAll()
                arraySort(provinces, 'code')
                this.provinces = provinces
            },

            async fetchProvince() {
                if (this.value) {
                    this.province = await service.fetchOne(this.value)
                }
            }

        },

        watch: {
            value(n, o) {
                if (n && n !== o) {
                    this.fetchProvince()
                }
            },

        }

    }
</script>

<style lang="less" scoped>
    .tab-pane {
        margin: 0 16px 16px;

        /deep/ a {
            color: rgba(0, 0, 0, 0.65);
        }

        /deep/ a:hover {
            color: #40a9ff;
        }

    }
</style>