import { searchPaymentMethod, CalRate, CalFee } from '@/api/orderAPI'


//清楚页面的方法
export function initOrderClearForSell(productInfo,productFunctionId,flowParamsInfo) {

}

/**
 * 进入页面时调用此方法初始化 incomeType进入类型:
 * orglist-由订单列表页，订单补偿功能进入,survey-由调查顶中，立即购买进入,shopcart-由购物车进入
 * orderType:订单类型: sell-销售，purchase-采购 orderId
 * 由调查项中，立即购买进入是，为“”，由订单列表页进入时，传具体的orderId
 */
export function sellOrderInit (productFunctionId, productInfo, flowParamsInfo, orderItemsForSell, incomeType, orderId) {
  let orderItems = []
  let itemObj = {}
  itemObj.productId = productInfo.availableProduct.productId
  itemObj.productName = productInfo.availableProduct.productName
  let funObj = productInfo.productFunctionList.find(item => item.productFunctionId == productFunctionId)
  itemObj.productFunctionName = funObj ? funObj.productFunctionName : ""
  itemObj.showOrderAmount = flowParamsInfo.flowOrderInfo.price
  itemObj.desc = ""
  itemObj.promoDesc = ""
  return itemObj
}

/**
 * searchPaymentMethod
 * 打开订单的支付工具页面 sellPaymentTools:销售订单的支付工具
 * purchasePaymentTools:采购订单支付工具 feeForSellPaymentTools:销售订单的费用支付工具
 * feeForPurchasePaymentTools:采购订单的费用支付工具
 */
export function showProductPayToolsForSell(paymentToolsType) {
  let params = {
    "partyId": "800102",
  }
  searchPaymentMethod(params).then(data => {
    if (data.header.RetStatus == "S") {
      console.log(data.body)
    }else {
      alert("流水号：" + data.header.GlobalSeq + "。" + data.header.RetMsg);
    }
  })
}

// 利率试算
export function calRate(data) {

}

// 费用试算
export function calFee(data) {

}



