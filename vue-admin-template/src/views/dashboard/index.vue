<template>
  <div class="dashboard-container">
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      text-color="#333"
      :unique-opened="false"
      :collapse-transition="true"
      active-text-color="#409EFF"
      @select="handleSelect"
    >
      <menuTree v-for="menu in menuTreeData" :menu="menu" :key="menu.id" ></menuTree>
    </el-menu>

    <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
      <el-tab-pane
        v-for="(item, index) in editableTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
      >
        <process-control :process-info="item.processInfo"></process-control>
      </el-tab-pane>
    </el-tabs>

    <div class="tellerBox">
      <el-button class="el-button el-button--primary el-button--small" icon="el-icon-search" @click="showEndBox">
        凭证尾箱
      </el-button>
    </div>

    <el-dialog title="凭证尾箱库存查询"
               :visible.sync="isShowVoucherBox"
               width="60%"
               :close-on-click-modal="false"
    >
      <voucher></voucher>
    </el-dialog>
  </div>
</template>

<script>
  import {mapGetters, mapState} from "vuex";
  import menuTree from "@/components/MenuTree/menuTree";
  import {fetchMenuList} from "@/api/auth/menu";
  import {listQuery, RES_OK} from "@/api/config";
  import {arry2Tree, sortArray} from "@/utils";
  import Voucher from "@/views/voucherBox/voucher";
  import ProcessControl from "@/components/ProcessControl/index";

  export default {
    name: "Dashboard",
    components: {ProcessControl, Voucher, menuTree},
    computed: {
      ...mapGetters(["name", "permission_routes"])
    },
    mounted() {
      fetchMenuList(listQuery).then(response => {
        console.log('fetchMenuList response', response);
        const {rspCode} = response.header || {};
        const {menus} = response.body || {};
        console.log('----menus:', menus);
        this.menuData = menus;
        if (rspCode === RES_OK) {
          const mymenus = arry2Tree(menus, "-1", "menuCode", "parentMenuCode", 'subMenus');
          // 升序
          sortArray(mymenus).forEach(item => {
            if (item.subMenus) {
              sortArray(item.subMenus)
            }
          })
          console.log('----menusTree:', mymenus[0].subMenus)
          this.menuTreeData = mymenus[0].subMenus;
        } else {

        }
      }).catch(error => {
        console.log(error);
      })
    },
    data() {
      return {
        menuTreeData: [],
        menuData: [],
        isShowVoucherBox: false,

        editableTabsValue: "",
        editableTabs: [],
      }
    },

    methods: {
      handleSelect(key, keyPath) {
        console.log("menuTree.handleSelect: key:{}, keyPath{}", key, keyPath);
        const itemMenu = this.menuData.find(value => {
          return value.id === key;
        });
        console.log("menuTree.handleSelect: item:{}，processCode:{}", itemMenu, itemMenu.processCode);

        let tabObject = {
          title: itemMenu.menuName,
          name: itemMenu.menuName,
          processInfo: {
            id: itemMenu.processCode,
            url: "http://192.168.2.120:30396/#/buss/" + itemMenu.processCode + "?iframe=1"
          }
        };
        this.addTab(tabObject);
      }
      ,
      showEndBox() {
        this.isShowVoucherBox = true;
      },
      addTab(tabObject) {
        debugger
        this.editableTabs.push(tabObject);
        this.editableTabsValue = tabObject.name;
      },
      removeTab(targetName) {
        console.log('removeTab editableTabs start: {}', this.editableTabs);
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }
        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
        console.log('removeTab editableTabs end: {}', this.editableTabs);
      }
    }
  }
  ;
</script>
<style lang="scss" scoped>
  .dashboard {
    &-container {
      .el-menu-demo {
        padding-left: 15px;
        display: flex;
      }
    }

    &-text {
      font-size: 30px;
      line-height: 46px;
      padding-left: 30px;
      padding-top: 30px;
    }
  }

  .tellerBox {
    width: 100%;
    border-top: 1px solid #ccc;
    position: fixed;
    bottom: 0px;
    left: 0px;

    .el-button {
      margin-right: 50px;
      float: right;
    }
  }
</style>
