<template>
  <section class="app-main">
    <!--iframe-->
    <template v-for="(item,index) in iframeViews">
      <iframe v-show="lastUrlOrPath == item.path"  width="100%" height="100%"  :src="item.path" frameborder="0" name="loadInIframe" class="loadInIframe" :id="'loadInIframe'+index"></iframe>
    </template>
    <!--组件-->
    <div v-show="loadPageInIframe==false">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="cachedViews">
          <router-view :key="key" />
        </keep-alive>
      </transition>
    </div>
  </section>
</template>

<script>
  function getId(id) {
    return document.getElementById(id);
  }
  function getClass(className) {
    return document.getElementsByClassName(className)[0];
  }
  export default {
    name: 'AppMain',
    computed: {
      iframeViews(){
        return this.$store.state.tagsView.iframeViews;
      },
      lastUrlOrPath(){
        return this.$store.state.tagsView.lastUrlOrPath;
      },
      cachedViews() {
        return this.$store.state.tagsView.cachedViews;
      },
      key() {
        return this.$route.path;
      },
      loadPageInIframe(){
        return this.$store.state.tagsView.loadPageInIframe;
      }
    },
    beforeMount() {
      //window.addEventListener('resize', this.$_resizeIframeHandler)
    },
    beforeDestroy() {
      //window.removeEventListener('resize', this.$_resizeIframeHandler)
    },
    watch: {
      loadPageInIframe:{
        handler: function (boolValue) {
          //this.$_resizeIframeHandler();
        },
        immediate: true
      }
    },
    methods:{
      $_resizeIframeHandler() {
        setTimeout(() => {
          const $navBarHeight = getClass('navbar').offsetHeight;
          const $tagViewHeight = getId('tags-view-container').offsetHeight;
          const fixPx = 4;
          const rect = document.body.getBoundingClientRect();
          this.iframeViews.forEach((iframe,index) => {
            let $id = getId('loadInIframe'+index)
            $id.style.height = (rect.height - $navBarHeight - $tagViewHeight - fixPx) + 'px';
          })
          // if ($iframes) {
          //   $iframe.style.height = (rect.height - $navBarHeight - $tagViewHeight -fixPx) + 'px';
          // } else {
          // alert("can't find iframe")
          // }
        }, 300)
      }
    }
  }
</script>

<style scoped>
  .app-main {
    /*50 = navbar  */
    min-height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    overflow: hidden;
  }
  .fixed-header+.app-main {
    padding-top: 114px;
  }
</style>

<style lang="scss">
  // fix css style bug in open el-dialog
  .el-popup-parent--hidden {
    .fixed-header {
      padding-right: 15px;
    }
  }

  .loadInIframe{
    /*border:1px solid red;*/
    min-height: 600px;
  }

</style>
