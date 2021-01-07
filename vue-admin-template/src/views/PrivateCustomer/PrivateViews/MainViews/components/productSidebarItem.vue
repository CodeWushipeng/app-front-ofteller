<template>
  <div class="sidebar-item-wrapper">
    <template v-if="!item.children">
      <el-menu-item :index="item.ctlgId">
        <span>{{item.ctlgName}}</span>
      </el-menu-item>
    </template>

    <el-submenu v-else ref="subMenu" :index="item.ctlgId" popper-append-to-body>
      <template slot="title">
        <span>{{item.ctlgName}}</span>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.ctlgId"
        :is-nest="true"
        :item="child"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>

export default {
  name: 'SidebarItem',
  props: {
    item: {
      type: Object,
      required: true
    },
  },
  data() {
    return {}
  },
  methods: {

  }
}
</script>
