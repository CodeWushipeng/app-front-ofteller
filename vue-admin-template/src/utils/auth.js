import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}


export const WNToken = "eyJ0eXBlIjoiSldUIiwiYWxnIjoiUlM1MTIifQ.eyJzdWIiOiJ6aGFuZ3NhbiIsInJvbGUiOlsiYWRtaW4iLCJ1c2VyIl0sImlzcyI6IkdlbnQuTmkiLCJleHAiOjE1OTIzNTkxMDQsImlhdCI6MTU5MjM1ODUwNH0.W5AMeFUY_rBK9D8Tj7jDuZfney4kTxpma0VbH7LGklZMsSalLOl8XuOLEHxwEMjLs5cl0rOv242K4jzSqF0UeNNTv3NE8q0bb25WtgXQv-9CjkbOFdJgW4o3i8lb-ZGGp9WJpPsvw-d69VNTlXtXGJThzEs9MZQdD8TuT5rz47Y"
