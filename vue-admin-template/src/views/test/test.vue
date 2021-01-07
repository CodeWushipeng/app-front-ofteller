<!-- 最左边的选择框 -->
<template>
  <div class="mycard">
    <header>
      <img :src="user.avatar" class="avatar" @click="drawer = true">
    </header>
    <div class="navbar" @click="clearSearch">
      <router-link to="/financialProduct" class="icon iconfont icon-msg" >12121</router-link>
      <router-link to="/pagePublic" class="icon iconfont el-icon-chat-line-round" >432423</router-link>
    </div>
    <footer>
      <i class="icon iconfont icon-more"></i>
    </footer>

    <el-drawer
      :visible.sync="drawer"
      :with-header="false"
      direction="ltr"
      size = '10%'
    >
      <span>我来啦!</span>
    </el-drawer>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    computed: {
      ...mapState([
        'user',
        'imType'
      ]),
      getIMType (){
        return this.imType
      }
    },
    data() {
      return {
        drawer: false,
        direction: 'rtl',
        type:1
      };
    },
    methods: {
      clearSearch() {
        this.$store.dispatch('search', '')
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    }
  }
</script>
