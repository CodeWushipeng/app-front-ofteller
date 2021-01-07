export function handleError(msg) {
  this.$message({
    showClose: true,
    message: msg,
    type: 'error'
  })
}

export function handleSuccess(msg) {
  this.$message({
    showClose: true,
    message: msg,
    type: 'success'
  })
}

export function handleWarning(msg) {
  this.$message({
    showClose: true,
    message: msg,
    type: 'warning'
  })
}

export function handleInfo(msg) {
  this.$message({
    showClose: true,
    message: msg,
    type: 'info'
  })
}

export default (Vue) => {
  Vue.prototype.$handleError = handleError;
  Vue.prototype.$handleSuccess = handleSuccess;
  Vue.prototype.$handleWarning = handleWarning;
  Vue.prototype.$handleInfo = handleInfo;
  Vue.prototype.$notifyError = notifyError;
  Vue.prototype.$notifyInfo = notifyInfo;
  Vue.prototype.$notifySuccess = notifySuccess;
  Vue.prototype.$notifyWarning = notifyWarning;
}


export function notifySuccess(msg) {
  this.$notify({
    title: '成功',
    message: msg ||"这是一条错误的提示消息",
    type: 'success'
  });
}

export function notifyWarning(msg) {
  this.$notify({
    title: '警告',
    message: msg ||"这是一条错误的提示消息",
    type: 'warning'
  });
}

export function notifyInfo(msg) {
  this.$notify.info({
    title: '消息',
    message: msg ||"这是一条错误的提示消息",
  });
}

export function notifyError(msg) {
  this.$notify.error({
    title: '错误',
    message: msg ||"这是一条错误的提示消息",
  });
}
