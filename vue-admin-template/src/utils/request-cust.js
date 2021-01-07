import axios from "axios";
import { MessageBox, Message } from "element-ui";
import { Loading } from "element-ui"; //加载中

let loadingObj = [];
let loadCount = 0;
var loading = {
  open: function(text = "加载中...") {
    loadingObj.push(
      Loading.service({
        text: text,
        lock: true,
        background: "rgba(255,255,255,.4)",
        target: document.querySelector(".app-main") // 设置加载动画区域
      })
    );
  },
  close: function() {
    if (loadingObj.length > 0) {
      loadCount--;
      if (loadCount == 0) {
        loadingObj.map(v => {
          v.close();
          loadingObj = [];
        });
      }
    }
  }
};

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 50000, // request timeout
  headers: { "X-Requested-With": "XMLHttpRequest" }
});
console.log(loadingObj);
// request interceptor
service.interceptors.request.use(
  config => {
    if (!config.hideLoging) {
      loading.open();
      loadCount++;
    }
    let { pageIndex, pageSize, header, ...data } = config.data || {};
    config.data = {
      ...data,
      Header: {
        // "AuthFlag": "f",
        // "AuthPwd": "123456",
        // "AuthTeller": "admin",
        // "BranchId": "321",
        // "Channel": "1",
        // "ConsumerId": "123",
        // "CurrentNum": "1",
        // "ExtendContent": "",
        // "GlobalSeq": "123456789",
        // "KeyId": "1232123llp",
        // "LegalRepCode": "123456",
        // "LocalLang": "001",
        // "Mac": "000d874E8046",
        // "PageEnd": "10",
        // "PageStart": "0",
        // "PgUpDownFlag": "1",
        // "ServiceCode": "0023",
        // "ServiceName": "openPartyGroupCust",
        // "SourceSysId": "123",
        // "TerminalCode": "32132",
        // "TotalNum": "10",
        // "TranCode": "9063852697",
        // "TranDate": "20200324",
        // "TranSeq": "9063852697",
        // "TranTeller": "admin",
        // "TranTime": "1518",
        // "amountAttrName": "0",

        SourceSysId: "123",
        ConsumerId: "123",
        Mac: "000d874E8046",
        KeyId: "1232123llp",
        ServiceCode: "0023",
        ServiceName: "testing",
        TranCode: "9063852697",
        GlobalSeq: "123456789",
        TranSeq: "9063852697",
        Channel: "1",
        TerminalCode: "32132",
        BranchId: "321",
        TranTeller: "admin",
        AuthTeller: "admin",
        AuthPwd: "123456",
        AuthFlag: "f",
        TranDate: "20200324",
        TranTime: "1518",
        LocalLang: "001",
        PgUpDownFlag: "1",
        TotalNum: "10",
        CurrentNum: "1",
        PageStart: "0",
        PageEnd: "10",
        LegalRepCode: "123456",
        ExtendContent: "ss",
        amountAttrName: 0,
        ...header
      }
    };
    return config;
  },
  error => {
    // do something with request error
    loading.close();
    Message({
      message: error,
      type: "error",
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    loading.close();
    const res = response.data;
    console.log(res);
    return res;
  },
  error => {
    loading.close();
    Message({
      showClose: true,
      message: error,
      type: "error",
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default service;
