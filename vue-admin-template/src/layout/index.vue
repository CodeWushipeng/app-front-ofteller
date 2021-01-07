<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" v-if="showSideBar==true" />
    <div class="main-container" :style="mainContainerStyle">
      <div :class="{'fixed-header':fixedHeader}" v-if="showHeader==true" >
        <navbar />
        <!--<tags-view  v-if="needTagsView"/>-->
      </div>
      <app-main />
      <!-- you can add element-ui's tooltip -->
      <el-tooltip placement="top" content="回到顶部">
        <back-to-top :custom-style="myBackToTopStyle" :visibility-height="300" :back-position="50" transition-name="fade" />
      </el-tooltip>
    </div>
  </div>
</template>

<script>
  import { Navbar, Sidebar, AppMain,TagsView } from './components'
  import BackToTop from '@/components/BackToTop'
  import ResizeMixin from './mixin/ResizeHandler'
  export default {
    name: 'Layout',
    components: {
      Navbar,
      Sidebar,
      AppMain,
      TagsView,
      BackToTop
    },
    data() {
      return {
        showSideBar:true,
        showHeader:true,
        // customizable button style, show/hide critical point, return position
        myBackToTopStyle: {
          right: '10px',
          bottom: '50px',
          width: '40px',
          height: '40px',
          'border-radius': '4px',
          'line-height': '45px', // 请保持与高度一致以垂直居中 Please keep consistent with height to center vertically
          background: '#e7eaf1'// 按钮的背景颜色 The background color of the button
        }
      }
    },
    mixins: [ResizeMixin],
    created() {
      this.hideSideBar()
    },
    computed: {
      mainContainerStyle(){
        return this.showSideBar == true ? '' : 'margin-left:0px;'
      },
      needTagsView(){
        return true;
      },
      sidebar() {
        return this.$store.state.app.sidebar
      },
      device() {
        return this.$store.state.app.device
      },
      fixedHeader() {
        return this.$store.state.settings.fixedHeader
      },
      classObj() {
        return {
          hideSidebar: !this.sidebar.opened,
          openSidebar: this.sidebar.opened,
          withoutAnimation: this.sidebar.withoutAnimation,
          mobile: this.device === 'mobile'
        }
      }
    },
    methods: {
      hideSideBar(){
        // 隐藏sideBar
        const {iframe} = this.$route.query;
        iframe && (this.showSideBar = false);
        iframe && (this.showHeader = false);
      },
      handleClickOutside() {
        this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>
