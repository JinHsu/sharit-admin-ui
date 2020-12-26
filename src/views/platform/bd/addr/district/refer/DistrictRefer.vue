<template>
    <a-select :value="value"
              :open="open"
              allowClear
              placeholder="选择县（区）"
              @select="onSelect"
              @change="onChange"
              @dropdownVisibleChange="onDropdownVisibleChange">
        <a-select-option v-if="district" :key="district.id" :value="district.id">
            {{district.name}}
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
                <a-tab-pane key="3" :tab="district ? district.title : '县/区'" :disabled="districts.length === 0">
                    <div class="tab-pane">
                        <a-row :gutter="[8, 8]">
                            <template v-for="district in districts">
                                <a-col :span="8">
                                    <a @click="onDistrictClick(district)"> {{district.title}} </a>
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
    import districtService from '@/views/platform/bd/addr/district/service'
    import {arraySort} from "@/utils/data"

    export default {
        name: "DistrictRefer",

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
                districts: [],

                province: null, // 选中的省/直辖市
                city: null, // 选中的市
                district: null,
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
                if (key <= 2) { // city
                    this.districts = []
                    this.district = null
                }

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
                this.city = city
                this.fetchDistricts()
                this.activeTabKey = '3'
            },

            onDistrictClick(district) {
                if (!this.district || this.district.id !== district.id) {
                    this.onChange(district.id)
                } else {
                    this.onSelect(district.id)
                }
                this.district = district
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

            async fetchDistricts() {
                const district = await districtService.fetchAll({parentId: this.city.id})
                arraySort(district, 'code')
                this.districts = district
            },

            async fetchDistrict() {
                if (this.value) {
                    this.district = await districtService.fetchOne(this.value)
                    if (this.district) {
                        this.city = await cityService.fetchOne(this.district.parentId)
                        if (this.city) {
                            this.province = await provinceService.fetchOne(this.city.parentId)
                        }
                    }
                }
            }

        },

        mounted() {
            this.fetchAllProvince()
        },

        watch: {
            sync(value) {
                if (value) {
                    this.activeTabKey = '1'

                    this.cities = []
                    this.districts = []

                    this.province = null
                    this.city = null
                    this.district = null

                }
            },

            value(n, o) {
                if (n && !o) {
                    this.fetchDistrict()
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