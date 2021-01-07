<template>
  <el-container style="height: 100%">
    <el-header height="40px">
      <header>
        <a href="javascript:void(0)"
           class="heade-tab"
           :class="{ active: headeSelect == 'home' }"
           @click="handleHeadeSelect('home')"
        >首页</a>
        <a href="javascript:void(0)"
                class="heade-tab"
                :class="{ active: headeSelect == 'accountQuery' }"
                @click="handleHeadeSelect('accountQuery')"
        >
          账户综合查询
        </a>
        <a href="javascript:void(0)"
                class="heade-tab"
                :class="{ active: headeSelect == 'financialService' }"
                @click="handleHeadeSelect('financialService')"
        >
          金融服务
        </a>
      </header>
    </el-header>
    <el-main>
      <div v-show="headeSelect == 'home'">
        <home></home>
      </div>
      <div v-show="headeSelect == 'accountQuery'">
        <account-query></account-query>
      </div>
      <div v-show="headeSelect == 'financialService'">
        <financial-service></financial-service>
      </div>
    </el-main>
  </el-container>
</template>

<script>
    import Home from './MainViews/Home'
    import AccountQuery from "./MainViews/AccountQuery";
    import FinancialService from './MainViews/FinancialService'

    export default {
        components: {
            Home,
            AccountQuery,
            FinancialService
        },
        data() {
            return {
                headeSelect: 'home',
            };
        },
        methods: {
            handleHeadeSelect(value) {
                this.headeSelect = value;
            },
        }
    }
</script>

<style lang="stylus" scoped>
  .el-container
    font-family: "微软雅黑", Trebuchet MS, Verdana, Helvetica, Arial, sans-serif;
    font-size: 12px;
    font-weight: lighter;
    .el-header
      padding-left: 10px;
      border-left: 5px solid #176AA8;
      background-color white
      .heade-tab
        background-image: url(../../../assets/images/title.png);
        background-color: transparent;
        margin-top 10px
        height: 30px;
        line-height: 30px;
        display: inline-block;
        width: 120px;
        text-align: center;
        font-size: 14px;
        font-weight: 500;
        position: relative;
        cursor: pointer;
        &.active
          background-image: url(../../../assets/images/title_sel.png);
    .el-main
      padding 0 !important
      margin-top 20px
      background-color white

</style>
