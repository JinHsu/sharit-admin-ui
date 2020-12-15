<template>
    <div class="entry-footer">
        <div class="links">
            <a href="https://www.antdv.com/docs/vue/introduce-cn/" target="_blank">
                <a-icon type="ant-design"/>
                Antdv
            </a>
            <a href="https://spring.io/projects/spring-boot" target="_blank">
                <icon-font type="icon-spring"/>
                SpringBoot
            </a>
            <a href="https://github.com/JinHsu/sharit-admin" target="_blank">
                <a-icon type="github"/>
                SharitAdmin
            </a>
        </div>
        <div class="copyright">
            Copyright &copy; 2020 北京分享网络科技
            <a-divider type="vertical"/>
            京ICP备19020199号-1
        </div>
    </div>
</template>

<script>
    export default {
        name: "EntryFooter"
    }
</script>

<style lang="less" scoped>
    .entry-footer {
        position: absolute;
        width: 100%;
        bottom: 0;
        padding: 24px;
        text-align: center;

        .links {
            margin-bottom: 8px;

            a {
                color: rgba(0, 0, 0, .45);

                &:not(:last-child) {
                    margin-right: 40px;
                }
            }
        }

        .copyright {
            color: rgba(0, 0, 0, .45);
        }

    }

</style>