import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import { getToken, setToken, removeTokenm,WNToken } from '@/utils/auth'
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 50000, // request timeout
})

const token = WNToken || getToken();

// request interceptor
service.interceptors.request.use(
  config => {
    // if (token) {
    //   config.headers['token'] = token;
    // }else{
    //   config.headers['token'] = "no token";
    // }
    // console.log('config',config)

    config.data = {
      "body":config.data,
      "header":{
        // "antiWeightSeqNo": "consequat minim nulla Duis esse",
        "gloSeqNo": "magna voluptate incididunt",
        "pageIndex": 27415051,
        "pageSize": -64645370,
        "projectId": "labore dolore esse ex laborum",
        "reqSeqNo": "quis dolor",
        "reqTime": "consectetur incididunt",
        "serviceGroupid": "ea voluptate ad",
        "serviceId": "nostrud",
        "serviceName": "nulla sunt",
        "subProjectId": "quis",
        "userInfo": {
          "role": [
            "occaecat labore commodo consectetur in",
            "Ut eu nostrud",
            "occaecat ex amet aliqua cupidatat"
          ],
          "username": "esse"
        }
      }
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

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
    const res = response.data
    // if(process.env.NODE_ENV === 'development') {
    //   const { header, body } = res;
    //   return Promise.resolve(Object.assign({},{"statusCode":200,...header,...body}))
    // }

    if (res.statusCode !== 200) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service
