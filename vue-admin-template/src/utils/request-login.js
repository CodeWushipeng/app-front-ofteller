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
