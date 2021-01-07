<template>
    <header>
        <div class="l-content">

        </div>
        <div class="r-content">
            <el-button icon="el-icon-search">尾箱</el-button>
            <el-button icon="el-icon-search">退出</el-button>
        </div>
    </header>
</template>

<script>

    export default {
        data() {
            return {
            }
        },

        methods: {
            logOut() {
                this.$router.push(`/login`)
            }
        }
    }
</script>

<style lang="stylus" scoped>
    header
        display: flex;
        height: 100%;
        align-items: center;
        justify-content: space-between;
        .l-content
            display: flex;
            .el-button
                border :0px
        .r-content
            width: 200px;
</style>

