<template>
    <a-select :value="value"
              :open="open"
              allowClear
              placeholder="选择市（市辖区）"
              @select="onSelect"
              @change="onChange"
              @dropdownVisibleChange="onDropdownVisibleChange">
        <a-select-option v-if="city" :key="city.id" :value="city.id">
            {{city.name}}
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
                <a-tab-pane key="2" :tab="city ? city.title : '市/直辖区'" :disabled="cities.length === 0">
                    <div class="tab-pane">
                        <a-row :gutter="[8, 8]">
                            <template v-for="city in cities">
                                <a-col :span="8">
                                    <a @click="onCityClick(city)"> {{city.title}} </a>
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
    import provinceService from '@/views/platform/bd/addr/province/service'
    import cityService from '@/views/platform/bd/addr/city/service'
    import {arraySort} from "@/utils/data"

    export default {
        name: "CityRefer",

        props: {
            value: {
                type: String,
                required: false,
            },

            sync: {
                type: Boolean,
                default: false
            }
        },

        data() {
            return {
                open: false,
                activeTabKey: '1',

                provinces: [],
                cities: [],

                province: null, // 选中的省/直辖市
                city: null, // 选中的市
            }
        },

        methods: {
            onDropdownVisibleChange(open) {
                this.open = open
            },

            onChange(value) {
                this.$emit('change', value)
            },

            onSelect(value) {
                this.$emit('select', value)
            },

            onTabChange(activeTabKey) {
                this.activeTabKey = activeTabKey

                const key = parseInt(activeTabKey)

                if (key <= 1) {
                    this.cities = []
                    this.city = null
                }
            },

            onProvinceClick(province) {
                this.province = province
                this.fetchCities()
                this.activeTabKey = '2'
            },

            onCityClick(city) {
                if (!this.city || this.city.id !== city.id) {
                    this.onChange(city.id)
                } else {
                    this.onSelect(city.id)
                }
                this.city = city
                this.open = false
            },

            async fetchAllProvince() {
                const provinces = await provinceService.fetchAll()
                arraySort(provinces, 'code')
                this.provinces = provinces
            },

            async fetchCities() {
                const cities = await cityService.fetchAll({parentId: this.province.id})
                arraySort(cities, 'code')
                this.cities = cities
            },

            async fetchCity() {
                if (this.value) {
                    this.city = await cityService.fetchOne(this.value)
                    if (this.city) {
                        this.province = await provinceService.fetchOne(this.city.parentId)
                    }
                }
            }

        },

        mounted() {
            this.fetchAllProvince()
        },

        watch: {
            sync(value) {
                if (value && !this.value) {
                    this.activeTabKey = '1'

                    this.cities = []

                    this.province = null
                    this.city = null
                }
            },

            value(n, o) {
                if (n && n !== o) {
                    this.fetchCity()
                }
            }

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