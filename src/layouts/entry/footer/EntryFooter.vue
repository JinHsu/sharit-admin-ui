<template>
    <div class="entry-footer">
        <div class="links">
            <a href="#">帮助</a>
            <a href="#">隐私</a>
            <a href="#">条款</a>
        </div>
        <div class="copyright">
            Copyright &copy; 2020 北京分享网络科技
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