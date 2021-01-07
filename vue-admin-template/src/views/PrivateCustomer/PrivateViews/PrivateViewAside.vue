<template>
  <el-container style="height: 100%">
    <el-header>
      <header>
        <div class="h-content">
          <el-button icon="el-icon-search" @click="toCart">购物车(2)</el-button>
          <el-button icon="el-icon-search" @click="toOrderManage"
            >订单管理</el-button
          >
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
          >
            客户信息
          </div>
          <div
            class="heade-tab"
            :class="{ active: headeSelect == 'agent' }"
            @click="handleHeadeSelect('agent')"
          >
            代理人信息
          </div>
        </el-header>
        <el-main class="cl-aside">
          <div v-show="headeSelect == 'custome'">
            <div class="topDiv">
              <div class="leftDiv">
                <img :src="userImg" />
              </div>
              <div class="rightDiv">
                <div>
                  <span>客户姓名:</span>
                  <span>{{ custName }}</span>
                </div>
                <div>
                  <span>客&nbsp;户&nbsp;号:</span>
                  <span>{{ custNo }}</span>
                </div>
                <div>
                  <span>客户姓名:</span>
                  <span>{{ custName }}</span>
                </div>
                <div>
                  <span>黑名单:</span>
                  <span>{{ custName }}</span>
                </div>
                <!-- <div>
                  <el-button
                    type="text"
                    @click="dialogIMCusVisible = true"
                    icon="el-icon-s-comment iconCla"
                  ></el-button>
                </div> -->
              </div>
              <div
                class="indenDiv"
                style="display: flex; width: 90%; box-sizing: border-box"
              >
                <span>证件:</span>
                <span>{{ custID }}</span>
              </div>
              <div>
                <span>未核查</span>
                <el-button
                  class="noborder"
                  icon="el-icon-search"
                  @click="checkIdCard"
                  >联网核查</el-button
                >
              </div>
            </div>
            <div class="bottomDiv">
              <div>
                <el-button
                  class="noborder l-half-but"
                  icon="el-icon-user-solid"
                  @click="handleCustomView"
                  >客户视图</el-button
                >
                <el-button
                  class="noborder r-half-but"
                  icon="el-icon-money"
                  @click="handleContractView"
                  >账户综合查询(A)</el-button
                >
              </div>
              <div
                style="
                  padding-top: 20px;
                  width: 100%;
                  display: flex;
                  justify-content: center;
                "
              >
                <el-button
                  style="width: 60%"
                  @click="handleAccountView"
                  type="primary"
                  >综合签约</el-button
                >
              </div>
            </div>
          </div>
          <div v-show="headeSelect == 'agent'">
            <div style="min-height: 100px">43545y4</div>
          </div>
        </el-main>
        <el-footer>
          <div class="imageList">
            <!-- <div v-for="(item,index) in cardList" :key="index"></div> -->
            <el-carousel height="145px" trigger="click" :autoplay="false" arrow="always" indicator-position="outside">
              <el-carousel-item v-for="item in 4" :key="item">
                <img :src="cardImg" height="145px" />
              </el-carousel-item>
            </el-carousel>
            <!-- <img :src="cardImg" />
            <div class="card-wrap">
              <el-pagination
                background
                layout="prev, pager, next"
                :total="cardNumber"
                class="cardPage"
                @current-change="changeCard"
              ></el-pagination>
            </div> -->
          </div>
        </el-footer>
      </el-container>
    </el-main>
    <el-dialog :visible.sync="dialogIMCusVisible">
      <iframe
        width="100%"
        height="100%"
        src="http://192.168.2.120:30903/#/chat?token=zhuoxihua&imType=2"
        frameborder="0"
      ></iframe>
    </el-dialog>
  </el-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import {
  fetchSelectCustCertificateInfo,
  selectProductPartyRoleList,
} from "@/api/privateCustomer/index";
export default {
  data() {
    return {
      headeSelect: "custome",
      userImg: require("../../../assets/images/user.png"),
      // cardImg: require("../../../assets/images/no_card.png"),
      cardImg: require("../../../assets/images/no_card_1.jpg"),
      cardNumber: 30,
      dialogIMCusVisible: false,
      cardList: [],
    };
  },
  computed: {
    ...mapState({
      iframePrivateView: (state) => state.privateViewMain.iframePrivateView,
    }),
    ...mapState({
      custName: (state) => state.privateViewMain.custName,
    }),
    ...mapState({
      custNo: (state) => state.privateViewMain.custNo,
    }),
    ...mapState({
      custID: (state) => state.privateViewMain.custID,
    }),
    ...mapState({
      idType: (state) => state.privateViewMain.idType,
    }),
  },
  methods: {
    // 查询证件
    checkIdCard() {
      let data = {
        custNo: this.custNo,
        idType: this.idType,
        idNo: this.custID,
      };
      fetchSelectCustCertificateInfo(data)
        .then((res) => {
          if (res.header.RetCode == "000000") {
            this.$message({
              type: "success",
              message: res.header.RetMsg,
            });
          } else {
            this.$message({
              type: "error",
              message: res.header.RetMsg,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 查询账户列表
    queryAccount() {
      let data = {
        partyId: this.custNo,
      };
      selectProductPartyRoleList(data)
        .then((res) => {
          if (res.header.RetCode == "000000") {
            this.cardList = res.prodCustList;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleHeadeSelect(value) {
      this.headeSelect = value;
    },
    toCart() {
      if (this.checkView("cart")) {
        this.$store.commit(
          "privateViewMain/CHANGE_PRIVATE_MAIN_STATE",
          "cart"
        );
        return;
      }
      var viewObj = {
        viewKey: "cart",
        viewName: "购物车",
        closeIf: true,
        isComponent: true,
      };
      this.iframePrivateView.push(viewObj);
      this.$store.commit(
        "privateViewMain/CHANGE_IFRAME_PRIVATE_VIEW",
        this.iframePrivateView
      );
      this.$store.commit(
        "privateViewMain/CHANGE_PRIVATE_MAIN_STATE",
        "cart"
      );
    },
    toOrderManage() {
      if (this.checkView("orderManage")) {
        this.$store.commit(
          "privateViewMain/CHANGE_PRIVATE_MAIN_STATE",
          "orderManage"
        );
        return;
      }
      var viewObj = {
        viewKey: "orderManage",
        viewName: "订单管理",
        aTabIf:false,
        closeIf: true,
        isComponent: true,
      };
      this.iframePrivateView.push(viewObj);
      this.$store.commit(
        "privateViewMain/CHANGE_IFRAME_PRIVATE_VIEW",
        this.iframePrivateView
      );
      this.$store.commit(
        "privateViewMain/CHANGE_PRIVATE_MAIN_STATE",
        "orderManage"
      );
    },
    checkView(view) {
      let tabViews = this.$store.state.privateViewMain.iframePrivateView;
      for (let i = 0; i < tabViews.length; i++) {
        if (tabViews[i].viewKey == view) {
          return true;
        }
      }
      return false;
    },
    handleCustomView() {
      debugger;
      if (this.checkView("customInfoView")) {
        this.$store.commit(
          "privateViewMain/CHANGE_PRIVATE_MAIN_STATE",
          "customInfoView"
        );
        return;
      }
      var viewObj = {
        viewKey: "customInfoView",
        viewName: "客户视图",
        closeIf: true,
        isComponent: true,
      };
      this.iframePrivateView.push(viewObj);
      this.$store.commit(
        "privateViewMain/CHANGE_IFRAME_PRIVATE_VIEW",
        this.iframePrivateView
      );
      this.$store.commit(
        "privateViewMain/CHANGE_PRIVATE_MAIN_STATE",
        "customInfoView"
      );
    },
    handleAccountView() {
      if (this.checkView("accountView")) {
        this.$store.commit(
          "privateViewMain/CHANGE_PRIVATE_MAIN_STATE",
          "accountView"
        );
        return;
      }
      var viewObj = {
        viewKey: "accountView",
        viewName: "综合签约",
        closeIf: true,
        isComponent: true,
      };
      this.iframePrivateView.push(viewObj);
      this.$store.commit(
        "privateViewMain/CHANGE_IFRAME_PRIVATE_VIEW",
        this.iframePrivateView
      );
      this.$store.commit(
        "privateViewMain/CHANGE_PRIVATE_MAIN_STATE",
        "accountView"
      );
    },
    handleContractView() {
      if (this.checkView("contractView")) {
        this.$store.commit(
          "privateViewMain/CHANGE_PRIVATE_MAIN_STATE",
          "contractView"
        );
        return;
      }
      var viewObj = {
        viewKey: "contractView",
        viewName: "账户视图",
        closeIf: true,
        isComponent: true,
      };
      this.iframePrivateView.push(viewObj);
      this.$store.commit(
        "privateViewMain/CHANGE_IFRAME_PRIVATE_VIEW",
        this.iframePrivateView
      );
      this.$store.commit(
        "privateViewMain/CHANGE_PRIVATE_MAIN_STATE",
        "contractView"
      );
    },
    changeCard() {},
  },
};
</script>

<style>
.el-container .cl-aside{
  flex: none;
}
</style>
<style lang="scss" scoped>
.el-container {
  font-family: '微软雅黑', Trebuchet MS, Verdana, Helvetica, Arial, sans-serif;
  font-size: 12px;
  font-weight: lighter;
  height: 100%;

  .el-header {
    padding: 0 !important;
    height: 40px !important;

    .h-content {
      height: 40px;
      width: 300px;
      border-bottom: 1px solid #ccc;
      background-color: white;
      padding: 0 20px;
      display: flex;
      justify-content: space-around;

      .el-button {
        border: 0;
        height: 100%;
      }
    }
  }

  .el-main {
    margin: 20px 20px 0px 20px;
    padding: 0 !important;
    background-color: white;

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
        font-weight: 500;
        position: relative;
        cursor: pointer;
        background-color: #DDDDDD;

        &.active {
          background-color: white;
          color: rgb(64, 158, 255);
        }
      }
    }

    .el-main {
      background-color: white;
      padding-top: 20px;

      .leftDiv {
        width: 40%;
        display: inline-block;

        img {
          width: 80px;
          height: 80px;
        }
      }

      .noborder {
        border: 0;
        color: #409EFF;
      }

      .rightDiv {
        width: 60%;
        float: right;
        display: inline-block;

        div {
          margin-bottom: 10px;

          .el-button {
            padding: 0;

            /deep/ {
              i {
                font-size: 30px;
                vertical-align: 4px;
              }
            }
          }
        }
      }

      .indenDiv {
        margin: 10px 0;
      }

      .bottomDiv {
        margin-top: 5px;
        padding-top: 10px;
        border-top: 1px solid #ccc;

        .l-half-but {
          width: 38%;
          padding: 10px 0;
        }

        .r-half-but {
          width: 55%;
          padding: 10px 0;
        }

        .all-but {
          width: 260px;
        }
      }
    }

    .el-footer {
      border-top: 5px solid #F3F3F3;
      padding: 20px 20px 10px;
      background-color: white;
      height: 200px !important;
      margin-top: 3px;

      img {
        width: 100%;
      }

      .card-wrap {
        display: flex;
        justify-content: center;
      }

      .cardPage {
        margin-top: 60px;
      }
    }
  }

  .el-dialog__wrapper {
    width: 100%;

    /deep/ {
      .el-dialog {
        width: 70%;
        height: auto;
        margin-top: 0 !important;

        .el-dialog__header {
          padding: 0;
        }

        .el-dialog__body {
          padding: 0;
          height: 650px;
        }
      }
    }
  }
}
</style>
