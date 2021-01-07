import Vue from "vue";
import Router from "vue-router";
import store from "../store/index";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
const isHidden = false;
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true
  },
  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    meta: { title: "Dashboard", icon: "dashboard" },
    name: "dashboard",
    hidden:isHidden,
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "首页", icon: "dashboard",affix: true }
      }
    ]
  },
  //  {
  //    path: "/",
  //    component: Layout,
  //    redirect: "/login"
  //  },
  {
    path: "/employee",
    name: "employee",
    hidden: true,
    component: () => import("@/views/employeeLogin/employeeLogin")
  },
  {
    path: "/employeeLogin",
    redirect: "/employee",
    component: Layout,
    children: [
      {
        path: "/userInfo",
        name: "userInfo",
        hidden: true,
        component: () => import("@/views/userInfo/userInfo"),
        meta: { title: "柜员信息", icon: "form" }
      },
      {
        path: "/modifyPassword",
        name: "modifyPassword",
        hidden: true,
        component: () => import("@/views/modifyPassword/modifyPassword"),
        meta: { title: "修改密码", icon: "form" }
      }
    ]
  },
  {
    path: "/boot",
    redirect: "/voucherBox",
    component: Layout,
    children: [
      {
        path: "/voucherBox",
        name: "voucherBox",
        hidden: true,
        component: () => import("@/views/boot/getVoucherBox"),
        meta: { title: "尾箱分配", icon: "dashboard" }
      }
    ]
  },
  {
    path: "/pagePrivate",
    redirect: "/private",
    component: Layout,
    children: [
      {
        path: "/private",
        name: "private",
        component: () => import("@/views/PrivateCustomer/PrivateCustomer"),
        meta: { title: "对私客户", icon: "menu" }
      },
      {
        path: "/customerView",
        name: "customerView",
        hidden: true,
        component: () =>
          import("@/views/PrivateCustomer/PrivateViews/CustomerView"),
        meta: {
          title: "客户视图",
          icon: "form",
          processCode: "10002"
        }
      },
      {
        path: "/orgOpen",
        name: "orgOpen",
        hidden: true,
        component: () => import("@/views/org/orgOpen"),
        meta: { title: "机构签到" }
      },
      {
        path: "/orgClose",
        name: "orgClose",
        hidden: true,
        component: () => import("@/views/org/orgClose"),
        meta: { title: "机构签退" }
      },
      {
        path: "/signIn",
        name: "signIn",
        hidden: true,
        component: () => import("@/views/employeeLogin/signIn"),
        meta: { title: "柜员签到" }
      },
      {
        path: "/signOut",
        name: "signOut",
        hidden: true,
        component: () => import("@/views/employeeLogin/signOut"),
        meta: { title: "柜员签退" }
      }
    ]
  },
  {
    path: "/pagePublic",
    redirect: "/public",
    component: Layout,
    children: [
      {
        path: "/public",
        name: "public",
        component: () => import("@/views/PublicCustomer/PublicCustomer"),
        meta: { title: "对公客户", icon: "customer" }
      },
      {
        path: "/publicView",
        name: "publicView",
        hidden: true,
        component: () => import("@/views/PublicCustomer/PublicViews/PublicView")
      }
    ]
  },
  {
    path: "/pageMission",
    redirect: "/mission",
    component: Layout,
    children: [
      {
        path: "/mission",
        name: "mission",
        component: () => import("@/views/MissionCenter/MissionCenter"),
        meta: { title: "任务中心", icon: "task" }
      }
    ]
  }
];
export const asyncRoutes = [];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    mode: "hash",
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
    // routes: constantRoutes.concat(asyncRoutes)
  });

const router = createRouter();
router.beforeEach((to, from, next) => {
  if (to.name != "employee" && !localStorage.getItem("userInfo")) {
    next({ path: "/employee" });
  } else {
    next();
  }
  /* 必须调用 `next` */
});
// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
