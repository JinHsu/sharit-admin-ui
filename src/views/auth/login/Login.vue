<template>
    <div>
        登录2
        <br>
        <i-circle :percent="80">
            <span class="demo-Circle-inner" style="font-size:24px">80%</span>
        </i-circle>
        <Circle :percent="100" stroke-color="#5cb85c">
            <Icon type="ios-checkmark" size="60" style="color:#5cb85c"></Icon>
        </Circle>
        <i-switch/>
        <Switch/>
        <br>

        <label>
            <Select v-model="lang" @on-change="locale => $i18n.locale = locale" style="width: 200px;">
                <Option value="zh" key="zh">中文</Option>
                <Option value="en" key="en">英文</Option>
            </Select>
        </label>
        <span>
            {{lang}}
        </span>

        <br>

        <DatePicker/>

    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                lang: 'en'
            }
        },
        created() {
            this.lang = 'en'
            this.$i18n.locale = this.lang
        }
    }
</script>

<style scoped>

</style>