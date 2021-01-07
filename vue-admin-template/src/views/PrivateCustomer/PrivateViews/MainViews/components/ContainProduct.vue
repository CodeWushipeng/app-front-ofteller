<template>
  <div style="height: 100%">
    <div style="height: 100%" v-if="flowIframeUrl">
    </div>
    <el-container v-else style="height: 100%">
      <el-header class="top-header">
        <div class="l-content">
          <div>{{tagName}}</div>
        </div>
        <div class="r-content">
          <template>
            <el-input
              :placeholder= selectPlaceholder
              size="mini"
              class="input-with-select"
            >
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </template>
        </div>
      </el-header>
      <el-container>
        <el-aside width="180px">
          <div class="t-content">
            <el-button type="primary" icon="el-icon-refresh-right">全部刷新</el-button>
          </div>
          <div class="b-content" id="scrollbar-wrapper2">
            <el-scrollbar wrap-class="scrollbar-wrapper2">
              <el-menu
                :unique-opened="true"
                @select="handleSelect"
                :collapse-transition="false"
              >
                <product-sidebar-item v-for="item in productTree" :key="item.ctlgId" :item="item" />
              </el-menu>
            </el-scrollbar>

          </div>
        </el-aside>
        <el-container>
          <el-main>
            <product-card
              v-for="index in 1"
              :key="index"
              :menuSelected= "menuSelected"
              :selectProductInfo= "selectProductInfo"
              :cardIndex="index"
            ></product-card>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import product_mix from "../mix/product_mix";

  export default {
    mixins: [product_mix],

    props: {
      tagName: String,
      catalogAlias: String,
      selectPlaceholder: String
    },
    created() {
      this.init(this.catalogAlias);
    }
  }
</script>
<style lang="scss" >
  #scrollbar-wrapper2{
    .el-menu-item,
    .el-submenu__title{
      height: 40px!important;
      line-height: 40px!important;
    }
    .el-submenu
    .el-menu-item{
      height: 40px!important;
      line-height: 40px!important;
    }
  }

</style>

<style lang="scss" scoped>
  .el-container .el-container .el-container .el-header{
    background-color: #fff!important;
    color: #333333!important;
    font-weight: bold!important;
    border-bottom: 1px solid #ccc!important;
    font-size: 14px!important;
    border-left: 5px solid #ccc!important;
  }
</style>

<style lang="stylus" scoped>

  .el-container
    .el-header
      height 40px !important
    .top-header
      border-bottom  3px solid white
      display: flex;
      height: 100%;
      align-items: center;
      justify-content: space-between;
      background-color #DDDDDD
      .l-content
        display: flex;
      .r-content
        width: 400px;
        .input-with-select
          border 0
    .el-container
      .el-aside
        background-color #e5e5e5
        position relative
        height 100%
        overflow visible
        .b-content

        .el-button
          width 100%
      .el-container
        background-color white
        .el-header
          line-height: 40px;
          background-color #304156
          color #fff
        .el-main
          padding 0
</style>
