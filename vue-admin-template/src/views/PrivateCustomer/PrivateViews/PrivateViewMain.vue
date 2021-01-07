<template>
  <div class="tabsWrap">
    <div class="tabsNav">
      <a
        href="javascript:void(0)"
        class="heade-tab"
        :class="{ active: privateMainState == item.viewKey }"
        @click="handleHeadeSelect(item.viewKey)"
        v-for="(item, index) in iframePrivateView"
        v-if="item.aTabIf"
        :key="index"
      >
        {{ item.viewName }}
        <i
          class="el-icon-close"
          @click.stop="closeCustomView(item.viewKey)"
          v-if="item.closeIf"
        ></i>
      </a>
    </div>
    <div class="bodyNav">
      <template class="product-view" v-for="(item, index) in iframePrivateView">
        <template v-if="item.isComponent">
          <component
            :key="index"
            :id="item.viewKey"
            :is="item.viewKey"
            @unInitDomFun="unInitDomFun"
            @productFunctionIdFun="productFunctionIdFun"
            :flowParamsInfo="flowParamsInfo"
            :productInfo="productInfo"
            :productFunctionId="productFunctionId"
            v-show="privateMainState == item.viewKey"
          />
        </template>
        <template v-else>
          <iframe
            :key="index"
            v-show="privateMainState == item.viewKey"
            width="100%"
            height="100%"
            :id="item.viewKey"
            @load="iframeLoad(item.viewKey)"
            :src="item.viewKey"
            frameborder="0"
            class="iframe-style"
            scrolling="auto"
          ></iframe>
        </template>
      </template>

      <!--<div class="product-view" v-for="(item, index) in iframePrivateView" :key="index">
        <template v-if="item.isComponent">
          <component :is="item.viewKey" v-show="privateMainState==item.viewKey" />
        </template>
        <template v-else>
          <iframe
            v-show="privateMainState==item.viewKey"
            width="100%"
            height="100%"
            :id="'iframe_' + item"
            :src="item.viewKey"
            frameborder="0"
            class="iframe-style"
            scrolling="auto"
          ></iframe>
        </template>
      </div>-->
    </div>
    <!-- 尾箱按钮 -->
    <!--<el-button type="primary" icon="el-icon-tickets" class="voucher" @click="popupVoucher">凭证尾箱</el-button>-->
    <el-dialog :visible.sync="showVoucher" width="70%">
      <voucher></voucher>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showVoucher = false" type="info">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import financialProduct from "./MainViews/FinancialProduct";
import financialService from "./MainViews/FinancialService";
import myProduct from "./MainViews/MyProduct";
import productRecommen from "./MainViews/ProductRecommen";
import cart from "./MainViews/Cart";
import orderManage from "./MainViews/OrderManage";
import customInfoView from "./MainViews/CustomInfoView";
//import orderInfoView from "./order/OrderInfoView";
import accountView from "./MainViews/accountView";
import contractView from "./MainViews/synthesizeContract";
import voucher from "../../voucherBox/voucher";
import Bus from "@/bus";
export default {
  components: {
    financialProduct,
    financialService,
    myProduct,
    productRecommen,
    cart,
    orderManage,
    customInfoView,
    //orderInfoView,
    accountView,
    contractView,
    voucher
  },
  filters: {
    tabFiter: function(value) {
      if (value.indexOf("http") == "-1") {
        return true;
      }
    }
  },
  data() {
    return {
      fromParentNodeInfo: "",
      isCustomViewShow: false,
      iframeViewShow: false,
      iframeLoading: true,
      showVoucher: false,
      flowParamsInfo: {},
      productInfo: {},
      unInitDom: [],
      productFunctionId: ""
    };
  },
  created() {

    let self = this
    window.showFlowFunction = (url , tranConf )=>{
      if(url && tranConf && tranConf.productFunctionId){
        let tempIf = self.iframePrivateView.find(item => item.viewKey == url)
        if(!tempIf){
          let productFunctionName = ""
          for (let i = 0 ; i < self.productInfo.productFunctionList.length ; i++){
            if(self.productInfo.productFunctionList[i].productFunctionId == tranConf.productFunctionId ){
              productFunctionName = self.productInfo.productFunctionList[i].productFunctionName
            }
          }
          self.fromParentNodeInfo = tranConf
          var iframeObj = new Object();
          iframeObj.aTabIf = true
          iframeObj.viewKey = url
          iframeObj.isComponent = false
          iframeObj.viewName = productFunctionName
          iframeObj.closeIf = true
          self.iframePrivateView.push(iframeObj)
          self.$store.commit("privateViewMain/CHANGE_IFRAME_PRIVATE_VIEW", self.iframePrivateView);
        }
        self.$store.commit("privateViewMain/CHANGE_PRIVATE_MAIN_STATE", url);
        //self.$emit("productFunctionIdFun", tranConf.productFunctionId );
        self.productFunctionIdFun(tranConf.productFunctionId)
        //self.$emit("unInitDomFun", url);
        self.unInitDomFun(url)
      }else{
        self.flowIframeUrl =  ""
      }
    }

    window.addEventListener("message", e => {
      const data = e.data;
      if (data) {
        switch (data.cmd) {
          case "sellOrder":
            console.log("订单过来的数据：" + JSON.stringify(data.params));
            self.flowParamsInfo = data.params;
            var indexTemp = self.unInitDom.findIndex(
              item => item == self.privateMainState
            );
            self.unInitDom.splice(indexTemp, 1);
            self.iframePrivateView.splice(
              self.iframePrivateView.findIndex(
                item => item.viewKey == self.privateMainState
              ),
              1
            );
            self.$store.commit(
              "privateViewMain/CHANGE_PRIVATE_MAIN_STATE",
              "orderInfoView"
            );
            break;
        }
      }
    });
  },
  mounted() {
    Bus.$on('productInfoFun', (val) => {
      this.productInfoFun(val)
    });
  },
  computed: {
    ...mapState({
      privateMainState: state => state.privateViewMain.privateMainState
    }),
    ...mapState({
      iframePrivateView: state => state.privateViewMain.iframePrivateView
    })
  },
  methods: {
    // 尾箱组件弹框
    popupVoucher() {
      this.showVoucher = true;
    },
    productInfoFun(val) {
      this.productInfo = val;
    },
    unInitDomFun(val) {
      this.unInitDom.find(item => item == val) ? "" : this.unInitDom.push(val);
      console.log("this.unInitDom: ", this.unInitDom);
    },
    productFunctionIdFun(val) {
      this.productFunctionId = val;
    },
    iframeLoad(value) {
      document.getElementById(value).contentWindow.postMessage(
        {
          cmd: "fromParentNodeInfo",
          params: {
            fromParentNodeInfo: this.fromParentNodeInfo
          }
        },
        "*"
      );
    },

    handleHeadeSelect(value) {
      this.$store.commit("privateViewMain/CHANGE_PRIVATE_MAIN_STATE", value);
      if (!document.getElementById(value)) {
        this.unInitDom.push(value);
      }
    },
    closeCustomView(value) {

      let _this = this;
      this.$confirm("是否继续关闭?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        var indexTemp = _this.unInitDom.findIndex(item => item == value);
        _this.unInitDom.splice(indexTemp, 1);
        _this.iframePrivateView.splice(
          _this.iframePrivateView.findIndex(item => item.viewKey == value),
          1
        );
        _this.$store.commit(
          "privateViewMain/CHANGE_PRIVATE_MAIN_STATE",
          "financialProduct"
        );
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.tabsWrap {
  font-family: '微软雅黑', Trebuchet MS, Verdana, Helvetica, Arial, sans-serif;
  font-size: 12px;
  font-weight: lighter;
  height: 100%;
  .tabsNav{
    height: 40px;
    display: flex;
    flex-wrap: nowrap;
    border-bottom: 1px solid #ccc;
    box-sizing: content-box;
  }
  .heade-tab {
    // background-image: url('../../../assets/images/title.png');
    background-color: #f5f5f5;
    border: 1px solid #ccc;
    border-top: 0;
    border-bottom: 0;
    height: 40px;
    line-height: 40px;
    display: inline-block;
    min-width: 100px;
    padding: 0 10px;
    text-align: center;
    font-size: 14px;
    font-weight: 500;
    position: relative;
    cursor: pointer;
    flex-shrink: 0;
    margin-right: 10px;

    &.active {
      // background-image: url('../../../assets/images/title_sel.png');
      background-color: #fff;
    }
  }
  .product-view {
    //height 100%
  }
  .bodyNav {
    height: calc(100% - 40px);
    padding-top: 20px;
    >div{
      background: #fff
    }
  }
  .voucher {
      position: fixed;
      right: 50px;
      bottom: 30px;
    }

}
</style>
