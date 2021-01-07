import { processOrderPFExt } from '@/api/orderAPI'
let flowParamsInfoTemp = ""
let price = ""
//import { formatDate } from '@/utils/index'

/**
 * 格式化日期
 * @param {fmt} 时间
 */
Date.prototype.formatDate = function(fmt) {
  var o = {
    "M+" : this.getMonth()+1,                 //月份
    "d+" : this.getDate(),                    //日
    "h+" : this.getHours(),                   //小时
    "m+" : this.getMinutes(),                 //分
    "s+" : this.getSeconds(),                 //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S"  : this.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt)) {
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  }
  for(var k in o) {
    if(new RegExp("("+ k +")").test(fmt)){
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    }
  }
  return fmt;
}

//个人卡实时发卡
let t140001 =  [
  {
    "answer": "0",
    "question": "openCardFlag"
  },
  {
    "answer": "10010",//
    "question": "crtfctTp"
  },
  {
    "answer": "421003005200036294",//
    "question": "crtfctNo"
  },
  {
    "answer": "张宝明",//
    "question": "cstmNm"
  },
  {
    "answer": "1001760000",//
    "question": "cstNum"
  },
  {
    "answer": "623999683000000026",//
    "question": "cardNo"
  },
  {
    "answer": "1010",
    "question": "pdId"
  },
  {
    "answer": price,//
    "question": "txnAmt"
  },
  {
    "answer": "一类户",//
    "question": "acctnCgy"
  },
  {
    "answer": "一类户开卡",//
    "question": "cardDsc"
  },
  {
    "answer": "061",
    "question": "voucherType"
  },
  {
    "answer": "",
    "question": "vourcherBatchNo"
  },
  {
    "answer": "121",
    "question": "customerAccountType"
  },
  {
    "answer": "123300",
    "question": "pdFuId"
  },
  {
    "answer": "张宝明",//
    "question": "acctName"
  }
]

//个人活期账户存入
let t140004 = [
  {
    "answer": "623999683000000026",//
    "question": "cstAcct"
  },
  {
    "answer": "000156",
    "question": "subAccNum"
  },
  {
    "answer": "一类户",//
    "question": "cstAcctTp"
  },
  {
    "answer": "156",
    "question": "ccyCd"
  },
  {
    "answer": "0",
    "question": "acctCurrExgFlg"
  },
  {
    "answer": "DPGRHQCK",
    "question": "pdId"
  },
  {
    "answer": price,//
    "question": "txnAmt"
  },
  {
    "answer": price,//
    "question": "actDeptAmt"
  },
  {
    "answer": "3M",
    "question": "depPrd"
  },
  {
    "answer": "1001760000",//
    "question": "custNo"
  }

]

//个人活期账户取款
let t140005 = [
  {
    "answer": "623999683000000026",//
    "question": "finAccountCode"
  },
  {
    "answer": "156",
    "question": "currency"
  },
  {
    "answer": "",
    "question": "cashProjectCode"
  },
  {
    "answer": price,//
    "question": "transAmount"
  },
  {
    "answer": "",
    "question": "remark"
  },
  {
    "answer": "1001760000",//
    "question": "custNo"
  }
]

//个人卡销卡
let t140002 = [
  {
    "answer": "1",
    "question": "crdCloseWhy"
  },
  {
    "answer": "2",
    "question": "crdCloseMd"
  },
  {
    "answer": "1",
    "question": "cclPrccFlg"
  },
  {
    "answer": "623999683000000026",//
    "question": "mainCdNum"
  },
  {
    "answer": "10023",
    "question": "pdId"
  },
  {
    "answer": "本行一类户",
    "question": "mainCdDscrptn"
  },
  {
    "answer": "10001",
    "question": "crtfctTp"
  },
  {
    "answer": "421003005200036294",//
    "question": "crtfctNo"
  },
  {
    "answer": "张宝明",//
    "question": "cstName"
  },
  {
    "answer": "1001760000",//
    "question": "cstNo"
  },
  {
    "answer": "1",
    "question": "rptNo"
  },
  {
    "answer": "2",
    "question": "moneyFro"
  },
  {
    "answer": "621333020200302336",//
    "question": "othrAcct"
  },
  {
    "answer": "DB2036",
    "question": "abstCd"
  },
  {
    "answer": "销卡交易",
    "question": "abstDsc"
  },
  {
    "answer": "一类户",//
    "question": "acctnCgy"
  },
  {
    "answer": price,//
    "question": "txnAmt"
  }
]

//个人存款账户开户
let t140003 = [
  {
    "answer": "1001760000",//
    "question": "cstNum"
  },
  {
    "answer": "620333539680003389",//
    "question": "cstAcct"
  },
  {
    "answer": "张明",//
    "question": "acctOfNm"
  },
  {
    "answer": "156",
    "question": "ccyCd"
  },
  {
    "answer": "0",
    "question": "acctCurrExgFlg"
  },
  {
    "answer": "6000",//
    "question": "acctBalanFnd"
  },
  {
    "answer": "0",
    "question": "geneExchRange"
  },
  {
    "answer": "DPZCZQ",
    "question": "pdId"
  },
  {
    "answer": "3Y",//
    "question": "depPrd"
  },
  {
    "answer": "一类户",
    "question": "acctnCgy"
  },
  {
    "answer": "11",
    "question": "acctAttr"
  },
  {
    "answer": (new Date()).formatDate("yyyyMMdd"),//
    "question": "intrstDt"
  },
  {
    "answer": "20231020",//
    "question": "exprDt"
  },
  {
    "answer": "整存整取3年",//
    "question": "pdCmnt"
  },
  {
    "answer": "10000005",
    "question": "vchrSrl"
  },
  {
    "answer": "025",
    "question": "vchrTp"
  },
  {
    "answer": "1000",
    "question": "vchrBtchNum"
  },
  {
    "answer": "张宝明",//
    "question": "custName"
  },
  {
    "answer": price,//
    "question": "openMny"
  }
]

//个人定期部提
let t140006 = [
  {
    "answer": "620333539680003332",//
    "question": "finAccountCode"
  },
  {
    "answer": "156",
    "question": "currency"
  },
  {
    "answer": "0",
    "question": "cashProjectCode"
  },
  {
    "answer": price,//
    "question": "transAmount"
  },
  {
    "answer": "1001760000",//
    "question": "custNo"
  }
]

//个人存款账户销户
let t140007 = [
  {
    "answer": "1",
    "question": "cclMde"
  },
  {
    "answer": "620333539680003332",//
    "question": "cstAcct"
  },
  {
    "answer": "张宝明",//
    "question": "acctOfNm"
  },
  {
    "answer": "0",
    "question": "acctCurrExgFlg"
  },
  {
    "answer": "156",
    "question": "ccyCd"
  },
  {
    "answer": "DPZCZQXH",
    "question": "pdId"
  },
  {
    "answer": "定期销户",
    "question": "pdDsc"
  },
  {
    "answer": price,//
    "question": "acctBalanFnd"
  },
  {
    "answer": price,//
    "question": "cclAmunt"
  },
  {
    "answer": "1001760000",//
    "question": "custNo"
  }
]

//订单报文拼接
export function messageSplicing(productInfo,productFunctionId,flowParamsInfo) {
  const promise =  new Promise((resolve,reject)=>{
    debugger
    flowParamsInfoTemp = flowParamsInfo
    price = flowParamsInfoTemp.flowOrderInfo.price + ""
    let productFunctionOrAttrList = productInfo.productFunctionOrAttrList.find(item => item.productFunctionId == productFunctionId)
    let surveyAnswers = []
    if(productFunctionOrAttrList.productSurveyList && productFunctionOrAttrList.productSurveyList.length > 0){
      let surveyObj = productFunctionOrAttrList.productSurveyList.find(item => item.surveyApplType == "CART_ADD")
      if(surveyObj){
        let type = surveyObj.surveyId
        if(type == "140001"){
          surveyAnswers = t140001
        }else if(type == "140004"){
          surveyAnswers = t140004
        }else if(type == "140005"){
          surveyAnswers = t140005
        }else if(type == "140002"){
          surveyAnswers = t140002
        }else if(type == "140003"){
          surveyAnswers = t140003
        }else if(type == "140006"){
          surveyAnswers = t140006
        }else if(type == "140007"){
          surveyAnswers = t140007
        }
      }else{
        alert("流程id没有配置")
        return false
      }
    }else{
      alert("流程id没有配置")
      return false
    }
    debugger

    let processOrderPFExtObj = new Object()
    processOrderPFExtObj.Header = {
      "SourceSysId": "A07",
      "TranCode": "888808",
      "Channel": "10",
      "ConsumerId": "A07",
      "TranDate": (new Date()).formatDate("yyyyMMdd"),//
      "KeyId": "CBSRZPKCUPS",
      "PageTotalNum": "20",
      "BranchId": "30001",
      "PageEnd": "19",
      "LegalRepCode": "123456",//法人
      "PageStart": "0",
      "ServiceName": "processOrderPFExt",
      "CurrentPageNum": "1",
      "LocalLang": "001",
      "ServiceCode": "C0420009",
      "TranTime": (new Date()).getTime().toString().substr(-8,8),
      "GlobalSeq": "10A072020"+ (new Date()).getTime().toString(),
      "TranTeller": "30001",//柜员
      "AuthFlag": "01",
      "TranSeq": "A07"+ (new Date()).getTime().toString().substr(-17,0)
    }
    processOrderPFExtObj.isAutoApprove = "Y"
    processOrderPFExtObj.orderPaymentItems = [
      {
        "paymentItem": {
          "amount": price,//
          "paymentMethodInfo": {
            "accountName": "李四",//
            "accountNumber": "23423234567889076",//
            "paymentMethodId":"210024",
            "paymentPartyId":"999001"
          },
          "currencyUomId": "156",
          "manualRefNum": "",
          "paymentPurpose": "PURCHASE",
          "paymentMethodType": "DEBIT_CARD",
          "cdFlag": "D"
        }
      }
    ]
    processOrderPFExtObj.orderHeader =  {
      "userLoginId": "1001760000",
      "salesChannelEnumId": "10",
      "currencyUomId": "156",
      "entryDate": (new Date()).formatDate("yyyyMMdd"),//
      "orderTypeId": "SALES_ORDER",
      "transactionId": "IBS121200e1410212248",//TranSeq
      "tradePartyId": "999001",
      "productStoreId": "PS310100",
      "orderName": productFunctionOrAttrList.productFunctionName
    }
    processOrderPFExtObj.partyId = "1001760000"//
    processOrderPFExtObj.orderItems = [
      {
        "orderItemSeqId": "1",
        "amount": price,//
        "quantity": "1",
        "productId": productInfo.availableProduct.productId,//
        "price": "1",
        "productFunctionId": productFunctionId,//
        "surveyAnswers": surveyAnswers
      }
    ]

    processOrderPFExt(processOrderPFExtObj).then(data => {
      if (data.error) {
        alert(data.error);
        return;
      }
      if (data.warning) {
        alert(data.warning);
        return;
      }
      debugger
      if (data.Header.RetStatus == "S") {
        alert(
          "成功"
        );
        resolve(processOrderPFExtObj)
      }else {
        alert("流水号：" + data.Header.GlobalSeq + "。" + data.Header.RetMsg);
      }
    })

  })
  return promise;
}



