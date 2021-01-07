import axios from "axios";
import {dateFormat} from "./index";
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
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  baseURL: "",
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 50000 // request timeout
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
      body: data.body ? data.body : data,
      header: {
        //"gloSeqNo": "10A07"+ dateFormat("YYYYmmdd", new Date()) + (new Date()).getTime().toString().substr(-4,4),
        "gloSeqNo": "10A072020"+ (new Date()).getTime().toString().substr(-8,8),
        "reqSeqNo": dateFormat("YYYYmmddHHMMSS", new Date()) + (new Date()).getTime().toString().substr(-3,3),
        "reqTime": dateFormat("YYYYmmddHHMMSSsss", new Date()),
        "channel": "10",
        "projectId": "subProjectId",
        "subProjectId": "subProjectId",
        "terminalCode": "terminalCode",
        "branchId": "966999",
        "serviceId": "serviceId",
        "serviceName": "test",
        "serviceGroupid": "serviceGroupid",
        "sourceSysId": "10",
        "consumerId": "consumerId",
        "pageIndex": pageIndex || 0,
        "pageSize": pageSize || 999,
        "mac": "mac",
        "keyId": "keyId",
        "extend": {
          "TranTeller": "99988999",
          "AuthFlag":"as",
          "LocalLang":"12",
          "LegalRepCode": "123456"
        },
        "userInfo": {
          "username": "123",
          "role": []
        },

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
    const headers = response.headers;

    if (headers["content-disposition"]) {
      let filename = headers["content-disposition"];
      filename = decodeURIComponent(
        filename.substring(filename.indexOf("=") + 1)
      );
      console.log("文件" + filename);

      let blob = new Blob([response.data], { type: "application/pdf" });

      const elink = document.createElement("a");
      if ("download" in elink) {
        // 非IE下载
        elink.href = window.URL.createObjectURL(blob); //创建下载的链接
        elink.download = filename; //下载后文件名
        elink.style.display = "none";
        document.body.appendChild(elink);
        elink.click(); //点击下载
        document.body.removeChild(elink); //下载完成移除元素
        window.URL.revokeObjectURL(elink.href); //释放掉blob对象
      } else {
        // IE10+下载
        navigator.msSaveBlob(blob, filename);
      }
      return;
    }
    const res = response.data;
    // if (process.env.NODE_ENV === "development") {
    // if(header.rspCode == RES_OK || header.rspCode == ERR_OK) {
    if (typeof res == "object") {
      if (res.size && res.type) {
        let promise = new Promise(function(resolve, reject) {
          var reader = new FileReader();
          reader.readAsText(res, "utf-8");
          reader.onload = () => {
            let result = JSON.parse(reader.result);
            result.body = result.body ? result.body : { statusCode: 200 };
            if (result && result.header && result.body) {
              const { header, body } = result;
              if (typeof body !== "object") {
                resolve(
                  Object.assign(
                    {},
                    { statusCode: 200, ...header, body: body }
                  )
                );
              } else {
                resolve(
                  Object.assign({}, { statusCode: 200, ...header, ...body })
                );
              }
            } else {
              return resolve(Object.assign({}, result));
            }
          };
        });
        return promise;
      } else {
        return Promise.resolve(res);
      }
    } else {
      Message({
        message: res.message || "Error",
        type: "error",
        duration: 5 * 1000
      });
      return Promise.reject(new Error(res.message || "Error"));
    }
    // }

    // if (res.statusCode !== 200) {
    //   Message({
    //     message: res.message || "Error",
    //     type: "error",
    //     duration: 5 * 1000
    //   });

    //   // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
    //   if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //     // to re-login
    //     MessageBox.confirm(
    //       "You have been logged out, you can cancel to stay on this page, or log in again",
    //       "Confirm logout",
    //       {
    //         confirmButtonText: "Re-Login",
    //         cancelButtonText: "Cancel",
    //         type: "warning"
    //       }
    //     ).then(() => {
    //       store.dispatch("user/resetToken").then(() => {
    //         location.reload();
    //       });
    //     });
    //   }
    //   return Promise.reject(new Error(res.message || "Error"));
    // } else {
    //   return res;
    // }
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
