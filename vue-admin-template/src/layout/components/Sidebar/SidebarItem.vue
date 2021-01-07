<template>
  <div v-if="!item.hidden" class="sidebar-item-wrapper" @click="changeMenu(item)">
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        !item.alwaysShow
      "
    >
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{ 'submenu-title-noDropdown': !isNest }"
        >
          <item
            :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"
            :title="onlyOneChild.meta.title"
          />
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu
      v-else
      ref="subMenu"
      :index="resolvePath(item.path)"
      popper-append-to-body
    >
      <template slot="title">
        <item
          v-if="item.meta"
          :icon="item.meta && item.meta.icon"
          :title="item.meta.title"
        />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from "path";
import { isExternal } from "@/utils/validate";
import Item from "./Item";
import AppLink from "./Link";
import FixiOSBug from "./FixiOSBug";

export default {
  name: "SidebarItem",
  components: { Item, AppLink },
  mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true,
    },
    isNest: {
      type: Boolean,
      default: false,
    },
    basePath: {
      type: String,
      default: "",
    },
  },
  data() {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: refactor with render function
    this.onlyOneChild = null;
    return {
      privateViews: [
        {
          viewKey: "productRecommen",
          viewName: "产品推荐",
          aTabIf:true,
          closeIf: false,
          isComponent: true,
        },

        {
          viewKey: "myProduct",
          viewName: "我的产品",
          aTabIf:true,
          closeIf: false,
          isComponent: true,
        },

        {
          viewKey: "financialProduct",
          viewName: "金融产品",
          aTabIf:true,
          closeIf: false,
          isComponent: true,
        },

        {
          viewKey: "financialService",
          viewName: "金融服务",
          aTabIf:true,
          closeIf: false,
          isComponent: true,
        },

        // {
        //   viewKey: "http://localhost:9529/#/buss/100000?iframe=1",
        //   viewName: "iframe1",
        //   closeIf: true
        // },

        // {
        //   viewKey: "http://localhost:9529/#/buss/100000",
        //   viewName: "iframe2",
        //   closeIf: true
        // }

        {
          viewKey: "orderInfoView",
          viewName: "订单结算",
          aTabIf:false,
          closeIf: "",
          isComponent: true
        }
      ],
    };
  },
  methods: {
    // 切换菜单时还原stroe中修改的对私组件视图
    changeMenu(val) {
      console.log(val);
      if (val.path == "/pagePrivate") {
        this.$store.commit(
          "privateViewMain/CHANGE_IFRAME_PRIVATE_VIEW",
          this.privateViews
        );
      }
    },
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter((item) => {
        if (item.hidden) {
          return false;
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item;
          return true;
        }
      });

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true;
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: "", noShowingChildren: true };
        return true;
      }

      return false;
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath;
      }
      if (isExternal(this.basePath)) {
        return this.basePath;
      }
      return path.resolve(this.basePath, routePath);
    },
  },
};
</script>
