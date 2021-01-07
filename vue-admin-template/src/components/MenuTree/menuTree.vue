<template>
  <div class="tree-wrap">
    <el-submenu v-if="menu.subMenus" :index="menu.id">
      <template slot="title">
        <span>{{menu.menuName}}</span>
      </template>
      <menu-tree
        v-for="child in menu.subMenus"
        :key="child.id"
        :menu="child"
      />
    </el-submenu>
    <template v-else>
      <el-menu-item :index="menu.id">
        <span>{{menu.menuName}}</span>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
  export default {
    name: "menuTree",
    data() {
      return {};
    },
    props: {
      menu: {
        type: Object,
        required: true
      }
    },
  }
</script>

<style lang="scss">
  .tree-wrap {
    min-width: 120px;
  }
  .tree-wrap {
    .el-submenu {
      .el-submenu__title {
        height: 40px;
        display: flex;
        align-items: center;
      }
    }
  }
  .tree-wrap .el-menu-item {
    height: 40px;
    display: flex;
    align-items: center;
  }
</style>
<style scoped>

</style>
