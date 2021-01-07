<template>
  <el-container style="height: 100%" ref="container">
    <el-container>
      <el-aside>
        <public-view-aside></public-view-aside>
      </el-aside>
      <el-main>
        <public-view-main></public-view-main>
      </el-main>
    </el-container>
    <el-footer ref="footer">
      <public-views-footer ></public-views-footer>
    </el-footer>
  </el-container>

</template>

<script>
import { mapState, mapActions } from "vuex";
import PublicViewAside from './PublicViewAside'
import PublicViewMain from './PublicViewMain'
import PublicViewsFooter from './PublicViewsFooter'
import CreatePublicInfo from './FormComponents/createPublicInfo'
    // import elementResizeDetectorMaker from 'element-resize-detector'

    export default {
        data(){
          return{
            modifyComInfoVisible:false,
          }
        },
        components: {
            PublicViewAside,
            PublicViewMain,
            PublicViewsFooter,
            CreatePublicInfo
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
    }
</script>

<style lang="stylus" scoped>
.el-container
  .el-container
    .el-aside
      margin-bottom 45px
      width: 220px !important
    .el-main
      margin-left 5px
      padding 0
      width: calc(100% - 340px) !important;
  .el-footer
    height: 45px !important;
    position: fixed;
    right: 0;
    bottom: 0;
    padding 0
    background-color: white;

.create-cust-info
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  background-color: #fff;
</style>
