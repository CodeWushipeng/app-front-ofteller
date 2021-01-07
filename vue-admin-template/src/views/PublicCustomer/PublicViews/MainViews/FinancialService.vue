<template>
  <div class="financialWrap">
    <div class="top_nav ng-scope" style="padding-top: 10px">
      <span class="left-block"></span>
      <label class="top-nav-label">产品货架</label>
    </div>
    <div class="productWrap">
      <div class="productLists">
        <div class="product-item">
          <div class="productImg"><img src="../../../../assets/images/no_card.png" alt="" /></div>
          <div class="productInfo">
            <p>产品编码: <span></span></p>
            <p>产品名称: <span></span></p>
            <p>说明: <span></span></p>
          </div>
          <div class="btn-wrap">
            <el-button type="danger">部提</el-button>
            <el-button type="danger">销户</el-button>
            <el-button type="danger">开户</el-button>
          </div>
        </div>
      </div>
      <div class="tips"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  methods: {
    logOut() {
      this.$router.push(`/login`);
    }
  }
};
</script>

<style lang="scss" scoped>
.financialWrap {
  .top_nav {
    height: 40px;
    border-bottom: 1px solid #e2e2e2;
    background-color: #dddddd;
    .left-block {
      border: 2px solid #307fee;
      font-size: 16px;
      margin-left: 20px;
      margin-right: 10px;
    }
    label {
      display: inline-block;
      max-width: 100%;
      margin-bottom: 5px;
      font-weight: 700;
    }
    .top-nav-label {
      color: #000000;
      font-family: "微软雅黑", "regular";
      font-size: 14px;
    }
  }
  .productWrap {
    padding: 20px 10px;
  }
  .product-item {
    background-color: #f9f9f9;
    width: 100%;
    height: 110px;
    display: flex;
    border-width: 1px 0;
    border-style: solid;
    border-color: #eee;
    padding: 10px 5px;
    .productImg{
        width: 160px;
        height: 80px;
        margin-right: 20px;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .btn-wrap{
        position: absolute;
        right: 50px;
    }
  }
}
</style>
