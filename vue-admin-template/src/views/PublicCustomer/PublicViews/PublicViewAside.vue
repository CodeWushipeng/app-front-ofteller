<template>
  <el-container style="height: 100%">
    <el-header>
      <header>
        <div class="h-content">
          <el-button icon="el-icon-search">综合签约</el-button>
          <el-button icon="el-icon-search">订单管理</el-button>
        </div>
      </header>
    </el-header>
    <el-main>
      <el-container>
        <el-header>
          <div
            class="heade-tab"
            :class="{ active: headeSelect == 'custome' }"
            @click="handleHeadeSelect('custome')"
          >金融产品</div>
          <div
            class="heade-tab"
            :class="{ active: headeSelect == 'agent' }"
            @click="handleHeadeSelect('agent')"
          >金融服务</div>
        </el-header>
        <el-main>
          <div v-show="headeSelect == 'custome'">
            <div class="t-content">
              <el-button icon="el-icon-search">全部刷新</el-button>
            </div>
            <div class="b-content">
              <el-tree :data="prodList" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
            </div>
          </div>
          <div v-show="headeSelect == 'agent'">
            <div class="t-content">
              <el-button icon="el-icon-search">全部刷新</el-button>
            </div>
            <div class="b-content">
              <el-tree :data="serveList" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      headeSelect: "custome",
      prodList: [
        {
          label: "票据",
        },
        {
          label: "金融代理",
        },
        {
          label: "理财产品",
          children: [
            {
              label: "封闭式理财",
            },
            {
              label: "开放式理财",
            },
          ],
        },
        {
          label: "同业存款",
        },
        {
          label: "对公存款",
        },
        {
          label: "担保承诺",
        },
      ],
      serveList: [
        {
          label: "批量业务",
        },
        {
          label: "账户管理",
        },
        {
          label: "票据池",
        },
        {
          label: "支付结算",
        },
        {
          label: "信贷",
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  methods: {
    handleHeadeSelect(value) {
      this.headeSelect = value;
    },
    handleNodeClick(data) {
      console.log(data);
    },
  },
};
</script>

<style lang="stylus">
.el-tree {
  background-color: #055CB6;
  color: #fff;

  .el-tree-node {
    border: 1px solid #ddd;
  }

  .el-tree-node__content {
    height: 40px;
  }

  .el-tree-node__content:hover {
    background-color: red;
  }

  .el-tree-node:focus>.el-tree-node__content {
    background-color: red;
  }
}
</style>

<style lang="stylus" scoped>
.el-container {
  font-family: '微软雅黑', Trebuchet MS, Verdana, Helvetica, Arial, sans-serif;
  font-size: 12px;
  font-weight: lighter;

  .el-header {
    padding: 0 !important;
    height: 40px !important;

    .h-content {
      height: 40px;
      background-color: white;

      .el-button {
        border: 0;
        padding: 12px;
        margin-left: 5px;
      }
    }
  }

  .el-main {
    color: white;
    padding: 0 !important;

    .el-header {
      background-color: white;
      padding: 0px;
      text-align: center;

      .heade-tab {
        height: 40px;
        line-height: 40px;
        display: inline-block;
        width: 49%;
        text-align: center;
        font-size: 14px;
        font-weight: 100;
        position: relative;
        cursor: pointer;
        background-color: #DDDDDD;

        &.active {
          background-color: #055CB6;
        }
      }
    }

    .el-main {
      background-color: #055CB6;
      height: 500px;

      .el-button {
        background-color: #055CB6;
        border: 0;
        color: white;
        width: 100%;
      }
    }
  }
}
</style>
