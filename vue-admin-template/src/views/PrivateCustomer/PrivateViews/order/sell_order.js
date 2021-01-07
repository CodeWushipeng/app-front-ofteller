import { DICTS } from '@/dict/dicts'
import { processOrderPFExt } from '@/api/orderAPI'
import { mapState, mapActions } from "vuex";
import { messageSplicing } from './message_splicing.js';//订单提交相关方法
import { showProductPayToolsForSell, sellOrderInit } from './func_order.js';//订单提交相关方法
/*import {
  queryCatalogTreeForChannelOrg,
  getAvailableProduct
} from "@/api/financialProduct/financialproduct";*/

export const sellOrder = {
  components:{
  },
  props: {
    flowParamsInfo: {
      required: true,
      type: Object
    },
    productInfo: {
      required: true,
      type: Object
    },
    productFunctionId: {
      required: true,
      type: String
    },
  },
  data() {
    return {
      //flowParamsInfo:{},
      //productInfo:{},
      //productFunctionId:"7410003",

      DICTS:DICTS,
      orderItems:[],
      orderItems1:[],
      dialogVisible:false,
      paymentMethodTypeId:"",
      maincom:{}
    }
  },
  computed: {
    ...mapState({
      iframePrivateView: (state) => state.privateViewMain.iframePrivateView,
    }),
    flowParamsInfoNew() {
      this.productInfo = {"availableProduct":{"productGroupId":"G08962","description":"个人活期账户取款","productTemplateId":"B089620003","productManagerList":[{"productManagerNo":"123","productManagerName":"123"}],"productName":"个人活期账户取款","introductionDate":"2020-09-01 00:00:00","lastModifiedByUserLogin":"100001","businessCode":"123","currencyName":"金融产品","currency":"0","createdByUserLogin":"100001","salesPostList":[{"salesPostName":"123","salesPostNo":"123"}],"manufacturerPartyId":"1111","productTemplateName":"荣鹏飞的基础产品名称","productLineId":"L89","workStatus":"0","inOutTableMode":"0","productId":"P08962000300003","fromStatus":"01","lastModifiedDate":"2020-09-25 07:57:39","releaseDate":"2021-01-31 00:00:00","marketDepartmentList":[{"marketDepartmentName":"123","marketDepartmentNo":"123"}],"crmProductTreeCode":"123","productGroupName":"袁平方产品组","productTypeId":"DIGITAL_GOOD","createdDate":"2020-09-25 07:57:39","isVariant":"Y","productLineName":"袁平方产品线","isVirtual":"N","manageDepartmentList":[]},"productFeatureCatagoryList":[],"productFunctionList":[{"productFunctionName":"个人活期账户取款","productFunctionType":"0","productFunctionDes":"个人活期账户取款","productFunctionId":"FUNC000010","productSupplierList":[{"workeffortId":"760018","productSupplierName":"name","productFactoryId":"60001","productFactoryName":"productFactoryName","productSupplierId":"1"}],"productModeList":[]}],"productContentList":[],"productMsgs":[],"productPriceList":null,"productFunctionOrAttrList":[{"productFunctionName":"个人活期账户取款","productSurveyList":[],"productFunctionId":"FUNC000010","productPriceList":[{"price":"1.00","priceType":"DEFAULT_PRICE","currency":"CNY"}],"productAttrList":[]}],"isOccupyQuota":"0","isOccupyParentQuota":"","distributionMode":"","releaseMode":"","total":null,"totalLocation":null,"reservedLocation":null}
      this.flowParamsInfo = {"flowNodeParas":{"BB":{"up":{"idType":"0","custName":"99"},"down":{"idType":"0","custName":"99","rspCode":"SP000000"}},"DD":{"up":{"custName":"99测试表单数据提取配置功能","minzu":"","xingbie":"","date_1594626575000_93837":"","guoji":"","singletext_1594626570000_72824":"","select_1594780751000_75545":"","select_1594780755000_13298":"","select_1594780757000_10501":"","shoujihao":"","huoquyanzhengma":"","yanzhengma":"","tiaoguoyanzheng":""},"down":{"custName":"99测试表单数据提取配置功能","minzu":"","xingbie":"","date_1594626575000_93837":"","guoji":"","singletext_1594626570000_72824":"","select_1594780751000_75545":"","select_1594780755000_13298":"","select_1594780757000_10501":"","shoujihao":"","huoquyanzhengma":"","yanzhengma":"","tiaoguoyanzheng":"","rspCode":"SP000000"}},"EE":{"up":{"chanpinxuanzhe":"1","shifouyuyuekahao":"1"},"down":{"chanpinxuanzhe":"1","shifouyuyuekahao":"1","rspCode":"SP000000"}}},"flowOrderInfo":{"amount":1,"price":"2.2","sum":0}}
      if(JSON.stringify(this.productInfo) != "{}" && JSON.stringify(this.flowParamsInfo) != "{}"){
        let itemObj = sellOrderInit(this.productFunctionId, this.productInfo, this.flowParamsInfo)
        this.orderItems.push(itemObj)
      }
      return JSON.parse(JSON.stringify(this.flowParamsInfo))
    }
  },
  methods:{
    openDiaChangePaySts(){
      this.dialogVisible = true;
    },
    changePaySts(value){
      this.paymentMethodTypeId = value;
      this.dialogVisible = false;
    },
    async orderControlSubmitClickForSell(){
      let processOrderPFExtObj = await messageSplicing(this.productInfo, this.productFunctionId, this.flowParamsInfo)
      this.$handleSuccess(
        "成功"
      );
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

      /*let time = (new Date()).getTime().toString().substr(-8,8)
      let params = {
        "header": {
          "SourceSysId": "A07",
            "TranCode": "888807",
            "Channel": "10",
            "ConsumerId": "A07",
            "TranDate": "20201021",
            "KeyId": "CBSRZPKCUPS",
            "PageTotalNum": "20",
            "BranchId": "801101",
            "PageEnd": "19",
            "LegalRepCode": "123456",
            "PageStart": "0",
            "ServiceName": "processOrderPFExt",
            "CurrentPageNum": "1",
            "LocalLang": "001",
            "ServiceCode": "C0420009",
            "TranTime": (new Date()).getTime().toString().substr(-8,8),
            "GlobalSeq": "10A072020"+ (new Date()).getTime().toString(),
            "TranTeller": "150178",
            "AuthFlag": "01",
            "TranSeq": "A0719901021000000000"
        },
        "isAutoApprove": "Y",
        "orderPaymentItems": [
          {
            "paymentItem": {
              "amount": this.flowParamsInfo.flowOrderInfo.price + "",
              "paymentMethodInfo": {
                "accountName": "李四",
                "accountNumber": "23423234567889076",
                "paymentMethodId":"210024",
                "paymentPartyId":"999001"
              },
              "currencyUomId": "156",
              "manualRefNum": "",
              "paymentPurpose": "PURCHASE",
              "paymentMethodType": "DEBIT_CARD",
              "cdFlag": "D"
            }
          }
        ],
        "orderHeader": {
          "userLoginId": "TEST_0007",
          "salesChannelEnumId": "10",
          "currencyUomId": "156",
          "entryDate": "20200514",
          "orderTypeId": "SALES_ORDER",
          "transactionId": "IBS121200e1410212248",
          "tradePartyId": "999001",
          "productStoreId": "PS10000",
          "orderName": "个人存款开户"
        },
        "partyId": "1001760000",
        "orderItems": [
          {
            "orderItemSeqId": "1",
            "amount": this.flowParamsInfo.flowOrderInfo.price + "",
            "quantity": "1",
            "productId": this.productInfo.availableProduct.productId,
            "price": "1",
            "productFunctionId": this.productFunctionId,
            "surveyAnswers": [
              {
                "answer": "CORPORAT_EACCOUNT",
                "question": "oppPaymentMethodType"
              },
              {
                "answer": "0801220000002148",
                "question": "oppAccountNumber"
              }
            ]
          }
        ]
      }
      processOrderPFExt(params).then(data => {
        if (data.error) {
          alert(data.error);
          return;
        }
        if (data.warning) {
          alert(data.warning);
          return;
        }
        if (data.Header.RetStatus == "S") {
          this.$handleSuccess(
            "成功"
          );
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
        }else {
          alert("流水号：" + data.Header.GlobalSeq + "。" + data.Header.RetMsg);
        }
      })*/
    },
    ajaxQueryProdListForCategory(val){
      let params = {
        "productId": val
      }
      let _this = this
      getAvailableProduct(params).then(data => {
        let itemObj = {}
        itemObj.productId = _this.productInfo.availableProduct.productId
        itemObj.productName = data.availableProduct.productName
        let funObj = data.productFunctionList.find(item => item.productFunctionId == _this.productInfo.productFunctionList)
        itemObj.productFunctionName = funObj ? funObj.productFunctionName : ""
        itemObj.showOrderAmount = _this.flowParamsInfo.flowOrderInfo.price
        itemObj.desc = ""
        itemObj.promoDesc = ""
        _this.orderItems.push(itemObj)
      });
    },
  },
  created(){
    //showProductPayToolsForSell('sellPaymentTools')
    //messageSplicing(productInfo, productFunctionId, flowParamsInfo)
    //this.productInfo = JSON.parse(localStorage.getItem("productList"))[2]
    //this.flowParamsInfo = {flowOrderInfo:{price:"15"} }
  },
  watch: {
    flowParamsInfoNew: {
      handler: (val, olVal) => {
        console.log('我变化了', val, olVal)
      },
      deep: true
    },
  },
}
