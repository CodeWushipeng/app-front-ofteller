<template>
  <el-container ref="container">
    <el-container class="top-content">
      <el-aside>
        <private-view-aside></private-view-aside>
      </el-aside>
      <el-main>
        <!--<private-view-main></private-view-main>-->
        <private-view-main></private-view-main>
      </el-main>
    </el-container>
    <el-footer ref="footer">
      <private-views-footer></private-views-footer>
    </el-footer>
    <ComDialog ref="endBox" title="凭证尾箱库存查询">
      <end-box></end-box>
    </ComDialog>
  </el-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import PrivateViewAside from "./PrivateViewAside";
import PrivateViewMain from "./PrivateViewMain";
import PrivateViewsFooter from "./PrivateViewsFooter";
// import elementResizeDetectorMaker from 'element-resize-detector'
import ComDialog from "@/components/ComBase/com-dialog";
import endBox from "./FormComponents/endBox";

export default {
  data() {
    return {};
  },
  components: {
    PrivateViewAside,
    PrivateViewMain,
    PrivateViewsFooter,
    ComDialog,
    endBox,
  },
  mounted() {
    // const _this = this
    // const erd = elementResizeDetectorMaker()
    // erd.listenTo(this.$refs.container.$el,(element)=>{
    //     _this.$nextTick(()=>{
    //         this.$refs.footer.$el.style.width= element.offsetWidth+'px'
    //     })
    // })
  },
};
</script>

<style lang="stylus" scoped>
.el-container {
  height: calc(100vh - 81px);

  .top-content {
    min-height 600px
    padding-bottom: 44px;
    .el-aside {
      width: 340px !important;
    }

    .el-main {
      width: calc(100% - 340px) !important;
    }
  }

  .el-footer {
    height: 45px !important;
    border-top: 1px solid #ccc;
    padding: 0;
    // width: calc(100% - 150px);
    background-color: white;
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 9999;
  }

  .el-main {
    padding: 0 !important;
  }
}

.create-cust-info {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  background-color: #fff;
}
</style>
