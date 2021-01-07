const defaultSettings = require("@/settings.js");
const urlPrefix = defaultSettings.debugStatus == true ? "/requestForward" : "";
import request from "@/utils/request";

// 签退
export function fetchSignOut(data) {
  return request({
    method: "post",
    data,
    url: urlPrefix + "/signOutTeller"
  });
}

// 机构开门
export function fetchSignOrg(data) {
  return request({
    method: "post",
    data,
    url: urlPrefix + "/signOrg"
  });
}

// 机构关门
export function fetchSignOutOrg(data) {
  return request({
    method: "post",
    data,
    url: urlPrefix + "/signOutOrg"
  });
}
