/**
 * 产品模板数据解析
 */
export function productAnay(targetProductInfo) {
  if(targetProductInfo){
    var TempleteInput = JSON.parse(JSON.stringify(new Array()))
    for (var i = 0 ; i < targetProductInfo.length ; i ++){
      var TempleteInputObj = JSON.parse(JSON.stringify(new Object()))

      var availableProduct = JSON.parse(JSON.stringify(new Object()))
      availableProduct.productId = targetProductInfo[i].availableProduct.productId
      availableProduct.productName = targetProductInfo[i].availableProduct.productName
      availableProduct.description = targetProductInfo[i].availableProduct.description
      TempleteInputObj.availableProduct = availableProduct

      if(targetProductInfo[i].productFunctionOrAttrList && targetProductInfo[i].productFunctionOrAttrList.length > 0){
        var productFunctionOrAttrList = new Array()
        for (let j = 0 ; j < targetProductInfo[i].productFunctionOrAttrList.length ; j++){
          let productFunctionOrAttr = targetProductInfo[i].productFunctionOrAttrList[j]
          let productFunctionOrAttrListObj = new Object()
          productFunctionOrAttrListObj.productFunctionId = productFunctionOrAttr.productFunctionId
          productFunctionOrAttrListObj.productFunctionName = productFunctionOrAttr.productFunctionName
          Object.keys(productFunctionOrAttr.productSurveyList).forEach(key => {
            if(productFunctionOrAttr.productSurveyList[key].surveyApplType == "CART_ADD"){
              productFunctionOrAttrListObj.CART_ADD = productFunctionOrAttr.productSurveyList[key].surveyId
            }
          })
          Object.keys(productFunctionOrAttr.productAttrList).forEach(key => {
            productFunctionOrAttrListObj[productFunctionOrAttr.productAttrList[key].attrName] = productFunctionOrAttr.productAttrList[key].attrValue
          })
          productFunctionOrAttrList.push(productFunctionOrAttrListObj)
        }
        TempleteInputObj.productFunctionOrAttrList = productFunctionOrAttrList
      }

      TempleteInput.push(TempleteInputObj)
    }

    return TempleteInput;
  }else{
    return {}
  }
}


