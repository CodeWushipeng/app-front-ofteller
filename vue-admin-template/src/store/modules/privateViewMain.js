import { fetchSelectPartyGroupCust } from "@/api/privateCustomer";

const state = {
  privateMainState: "financialProduct", //主页视图，如我的产品，金融产品    financialProduct  orderInfoView
  custNo: "1001710003", //对私客户id
  custName: "测试客户",
  custID: "141011198612540034",
  custInfo:{},
  idType: "1",
  publicCustNo: "2000660000", //对公客户id
  iframePrivateView: [
    {
      viewKey: "productRecommen",
      viewName: "产品推荐",
      aTabIf:true,
      closeIf: false,
      isComponent: true
    },
    {
      viewKey: "myProduct",
      viewName: "我的产品",
      aTabIf:true,
      closeIf: false,
      isComponent: true
    },
    {
      viewKey: "financialProduct",
      viewName: "金融产品",
      aTabIf:true,
      closeIf: false,
      isComponent: true
    },
    {
      viewKey: "financialService",
      viewName: "金融服务",
      aTabIf:true,
      closeIf: false,
      isComponent: true
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
  ]
};

const mutations = {
  CHANGE_PRIVATE_MAIN_STATE: (state, privateMainState) => {
    state.privateMainState = privateMainState;
  },
  CHANGE_CUST_NO: (state, custNo) => {
    state.custNo = custNo;
  },
  SET_CUST_NAME: (state, custName) => {
    state.custName = custName;
  },
  SET_CUST_INFO: (state, custInfo) => {
    state.custInfo = custInfo;
  },
  SET_CUST_ID_TYPE: (state, custIdType) => {
    state.idType = custIdType;
  },
  SET_CUST_ID: (state, custID) => {
    state.custID = custID;
  },
  CHANGE_PUBLIC_CUST_INFO: (state, publicCustInfo) => {
    state.publicCustInfo = publicCustInfo;
  },
  CHANGE_IFRAME_PRIVATE_VIEW: (state, iframePrivateView) => {
    state.iframePrivateView = iframePrivateView;
  }
};

const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
