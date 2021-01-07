/**
 * 销售支付页面
 */
var authSellFlag = false;
var authLayerFlag = false;

define([], function() {

	"use strict";
	return {
		init : function(_this, $rootScope, $filter, userService) {
			_this.CSS_TABHEIGHT_AUTO_ORDER = {
				width : '100%',
				height : _this.CSS_TABHEIGHT.height - 20,
				overflow : 'auto'
			};

			_this.initOrderClearForSell = function() {
				_this.optTitleForSell = ""; // 上方的操作标题
				_this.orderItemsInitForSell = []; // 本页面中展示的产品
				_this.orderPayTotalAmtForSell = 0; // 实际支付的订单总金额
				_this.orderProductCountForSell = 0; // 订单项的数量
				
				_this.orderNameForSell = ""; //订单产品名称

				_this.isShowProductPayForSell = false; // 是否显示订单支付类型对应的账号输入框
				$("#productPayToolsNameForSell").text(""); // 订单的支付工具类型中文名
				$("#feePaymentToolName").text(""); // /订单的费用支付工具类型中文名
				_this.productPayMethodTypeForSell = ""; // 订单的支付工具类型英文名
				_this.isVerifyProductPayTools = false;  // 是否验证过产品的支付工具

				_this.isShowFeePayToolsForSell = false; // 是否显示费用支付工具选择按钮
				_this.isShowProductPayToolsForSell = false; // 是否显示订单支付工具选择按钮				
				_this.feePayMethodTypeNameForSell = ""; // 订单的费用支付工具类型英文名
				_this.isVerifyFeePayTools = false;  // 是否验证过费用的支付工具

				_this.isAutoApproveForSell = "Y"; // 订单是否自动核准
							
				_this.orderHeaderForSell = {};
				_this.orderItemsForSell = [];
				_this.orderItemAttrForSell = [];
				_this.shipGroupsForSell = []; // 货运信息：暂无货运信息
				_this.orderAdjustmentsForSell = []; // 订单调整列表:交易调整信息
				_this.orderPayItemsForSell = []; // 订单支付项信息:办理业务的付款信息
				_this.orderTermsForSell = [];
				_this.orderAttributesForSell = [];
				_this.orderRolesForSell = [];
				_this.orderAuthRolesForSell = [];
				_this.orderRoleCustomerGrantForSell="";
				_this.orderRoleEndCustomerForSell="";
				_this.certificateTypeForSell = ""; // 订单支付工具凭证种类初始化
				_this.certificateTypeFeeForSell = ""; // 费用支付工具凭证种类初始化
				
				_this.publicCstNumSell = "";  //对公客户号
				
				_this.isShowProductPromoUseInfoList = false; // 促销信息控制
				_this.productPromoUseInfoList = []; // 返回的促销信息
				
				_this.financialInfoSasAgreementForSell = ""; //是否签约理财(0-否， 1-是)
				
				_this.orderAdjustmentsPrimaryListForSell = []; //原始的费用调整项
				
				_this.agreementContentNameForSell = "授权协议内容"; 
				
				_this.agreementContentNameFeeForSell = "授权协议内容";
				
				//获取配置文件信息
//				var sysParamStr = sessionStorage.getItem('sysParam');
//				var sysParam = JSON.parse(sysParamStr); 
//				_this.noNeedReadCardTranCodeList = sysParam.noNeedReadCardTranCode;
				
				//签章服务器地址 --开发地址
				//_this.interfaceServerUrl = "http://10.6.5.118:7001/xjbankservice/services/StampServiceIf";  
				//签章服务器地址 --联调地址
				//_this.interfaceServerUrl = "http://10.6.2.205:7001/xjbankservice/services/StampServiceIf";  
				_this.SysparamForSell = userService.querySealServerUrl();
				//验印服务器地址
				_this.interfaceServerUrl = _this.SysparamForSell.sealServerUrl; 
				//不允许刷卡交易码列表
				_this.noNeedReadCardTranCodeList = _this.SysparamForSell.noNeedReadCardTranCodeList; 

				_this.productPromoUseInfoListForSell = [
					{
						"promoCode" : "37R2V"
					}
				]; // 促销信息

				//20180424当前页面控制重复费用试算标志
				//20180712与合伟钢确认，费用试算可能会根据支付方式不同收取费用不一样
				//_this.isCalculateShoppingCartFeeForSellFlag = true;
				
				// 统一支付（不走统一支付处理则传值“000000”，其他非人工认证场景不传值）
				//20180511张超,王居宝确认，如果支付工具是现金，必须得走统一支付，不需到判断产品的功能属性manualRefNum值
				_this.isManualRefNumForSell = "";
				// 利息试算（Y：需要，N：不需要）
				_this.isRequireInterestForSell = "N";
				// 利率优惠试算（验证该利率试算接口后，把isRequireIntRate修改为N）
				_this.isRequireIntRateForSell = "N";
				// 是否协议利率产品
				_this.isAgreementInterest == "N";
				
				//资金账户信息查询返回信息
				_this.rsFundAcctInfmationQry = {};

				// 个人证件类型
				_this.payerCertTypesForSell = userService.selectXXMXList("idenType");				
				// 对公证件类型
				_this.companyCertTypesForSell = userService.selectXXMXList("compDiscernType");
				
				//现金项目代码
				_this.cashCaseCodesForSell = userService.selectXXMXList("projectCashCode");
			
				// 客户类型
				_this.sysCustTypes = [
					{value : "无", text : "无"},
					{value : "0", text : "系统外客户"},
					{value : "1", text : "系统内客户"}
				];	
											

				// 钞汇标志
				_this.cashOrRemitFlags = [
					{value : "0", text : "钞"},
					{value : "1", text : "汇"}
				];
				
				_this.curIncomeTypeForSell = ""; // 当前进入类型
				_this.curOrderIdForSell = ""; // 当前的订单ID
				showErrorMsg("");

				_this.initPayItemForSell();
				_this.initFeePayItemForSell();
				_this.initPayItemInputForSell();
				_this.initFeePayItemInputForSell();
		
				_this.isDisabledOrderSubmitBtnForSell = false;//结算按钮置灰
				_this.commitOrderSubmitBtnForSell = true; //结算按钮是否可提交
				
				_this.sellGlobalSeq = "";//订单流水
				_this.sellTranSeq = "";//交易流水
				_this.dcResOrderStatus = "";//点钞用订单状态
			};

			/**
			 * 进入页面时调用此方法初始化 incomeType进入类型:
			 * orglist-由订单列表页，订单补偿功能进入,survey-由调查顶中，立即购买进入,shopcart-由购物车进入
			 * orderType:订单类型: sell-销售，purchase-采购 orderId
			 * 由调查项中，立即购买进入是，为“”，由订单列表页进入时，传具体的orderId
			 */
			$rootScope.sellOrderInit = function(orderItemsForSell, incomeType, orderId) {
				_this.initOrderClearForSell();
				
				_this.curIncomeTypeForSell = incomeType;
				_this.curOrderIdForSell = orderId;

				if (_this.curIncomeTypeForSell == "orglist") {
					_this.optTitleForSell = "销售订单补偿";
				} else {
					_this.optTitleForSell = "销售";
				}

				//定义订单项本页面初始化变量
				_this.orderItemsInitForSell = [];
				$('#orderItemsTableForSell').bootstrapTable({});
				
				_this.orderProductCountForSell = orderItemsForSell.length;

				_this.tranCodeForSell = orderItemsForSell[0]._trancode_; //交易码
				// 产品代码列表
				_this.productIdList = [];
				// 产品代码与功能代码列表
				_this.productIdAndFuncIdList = [];	
				//账户可用余额
				_this.avlBalForSell = 0.00;
				//费用账户可用余额
				_this.avlBalFeeForSell = 0.00;
				//促销总金额
				_this.sumPromoAmtForSell = 0.00;
				// 订单总金额
				var subAmt = 0.00;
				var tempSubAmt = 0.00;
				// 利息
				var interestValueDes = 0.00;
				// 利息税
				var interestTaxValueDes = 0.00;				
				//所有利息总额
				var sumInterestValue = 0.00;
				//所有利息税总额
				var sumInterestTaxValue = 0.00;
				var orderItemSeqId = 1; //订单项标识
				//税后利息
				_this.sumAfterInterestValueForSell = 0.00;
				//20180516交易中心接口调整利息、利息税放入订单调整项orderAdjustments				
				angular.forEach(orderItemsForSell, function(orderItem) {					
					tempSubAmt = parseFloat(tempSubAmt) + parseFloat(orderItem.amount);
					// 控制金额域后面多出许多位js-bug
					subAmt = tempSubAmt.toFixed(2);
					_this.orderNameForSell  = _this.orderNameForSell + orderItem.productName+"-"+orderItem.productFunctionName+" ";					
					_this.isManualRefNumForSell = orderItem.manualRefNum;
					_this.isRequireInterestForSell = orderItem.requireInterest;
					_this.isRequireIntRateForSell = orderItem.requireIntRate;
					// ---利息、利息税---start
					if (orderItem.requireInterest == "1" || orderItem.requireInterest == "2" || orderItem.requireInterest == "3" || orderItem.requireInterest == "5") {						
						angular.forEach(orderItem.orderAdjustment, function(orderAdjustment) {
							var orderAdjustmentSubmit = {};
							orderAdjustmentSubmit.orderItemSeqId = orderItemSeqId+"";
							//获取利息
							if (orderAdjustment.attrName == "interestValue") {
								interestValueDes = orderAdjustment.attrValue;
								orderAdjustmentSubmit.orderAdjustmentTypeId = "INTEREST_VALUE";  //调整类型--利息
								orderAdjustmentSubmit.amount = interestValueDes;  //利息
								orderAdjustmentSubmit.description = "利息"
							} else if (orderAdjustment.attrName == "interestTaxValue") { //获取利息税
								interestTaxValueDes = orderAdjustment.attrValue;
								orderAdjustmentSubmit.amount = interestTaxValueDes;  //利息税
								orderAdjustmentSubmit.orderAdjustmentTypeId = "INTEREST_TAX_VALUE";  //调整类型--利息税
								orderAdjustmentSubmit.description = "利息税"
							}else if (orderAdjustment.attrName == "sumRetInt") { //
								interestValueDes = orderAdjustment.attrValue;
								orderAdjustmentSubmit.amount = interestValueDes;  //利息税
								orderAdjustmentSubmit.orderAdjustmentTypeId = "INTEREST_VALUE";  //调整类型--应收应计利息
								orderAdjustmentSubmit.description = "归还利息"
							}	
							//20180803贷款归还本金不需加入到调整项中
							if(orderAdjustment.attrName !== "tmRetTotAmt"){
								//利息、利息税放入订单调整项orderAdjustments
								_this.orderAdjustmentsForSell.push(orderAdjustmentSubmit);
							}							
						});
						// 订单总金额=产品金额+利息-利息税,判断利息或者利息税可能为空的字符串
						if(interestValueDes == ""){
							interestValueDes = 0.00;
						}if(interestTaxValueDes == "" || typeof interestTaxValueDes == "undefined"){//20180525目前该接口字段interestTaxValueDes不传
							interestTaxValueDes = 0.00;
						}						
						sumInterestValue = parseFloat(sumInterestValue) + parseFloat(interestValueDes);
						sumInterestTaxValue = parseFloat(sumInterestTaxValue) + parseFloat(interestTaxValueDes);
					}	
					//利息减去利息税
					_this.sumAfterInterestValueForSell = parseFloat(sumInterestValue) - parseFloat(sumInterestTaxValue);
					_this.sumAfterInterestValueForSell = _this.sumAfterInterestValueForSell.toFixed(2);	
					
					//订单金额
					var initOrderAmount = 0;
					// 判断订单不以金额计，则以数量计金额(20180504由于预开户即不以金额也不以数量记，所以得加入requireQuantity=Y条件)
					if(orderItem.requireAmount == "N" && orderItem.requireQuantity == "Y"){
						initOrderAmount = "1";
					}else{
						initOrderAmount = orderItem.amount;
					}
					
					//向订单对象加入订单项标识orderItemSeqId
					var orderItems = {
						orderItemSeqId : orderItemSeqId + "",
						isAgreementInterest :orderItem.isAgreementInterest,
						agreementInterest :orderItem.agreementInterest,
						amount : initOrderAmount+"",
						currencyUomId : orderItem.currencyUomId,
						deliveryModel : orderItem.deliveryModel,
						manualRefNum : orderItem.manualRefNum,
						mutex : orderItem.mutex,							
						mutexProd :orderItem.mutexProd,
						price : orderItem.price+"",
						prodCatalogId : orderItem.prodCatalogId,
						productFunctionId : orderItem.productFunctionId,
						productFunctionName : orderItem.productFunctionName,
						productId : orderItem.productId,							
						productName :orderItem.productName,
						quantity : orderItem.quantity+"",
						requireIntRate : orderItem.requireIntRate,
						requireInterest : orderItem.requireInterest,						
						surveyAnswers : orderItem.surveyAnswers,
						orderItemAttr : orderItem.orderItemAttr,
						requireAmount : orderItem.requireAmount,
						requireQuantity : orderItem.requireQuantity,						
						orderAdjustment : _this.orderAdjustmentsForSell,
						productLineId : orderItem.productLineId,
						showOrderAmount : orderItem.amount
					}
					_this.orderItemsInitForSell.push(orderItems);
					orderItemSeqId = orderItemSeqId+1;
					
					// ---利息、利息税---end
					var orderProductId = {
						productId : orderItem.productId
					};

					_this.productIdList.push(orderProductId);
					
					//20180709定期账户开户利率试算，需要传入存期字段
					var depPrd = ""; //存期
					angular.forEach(orderItem.surveyAnswers, function(surveyAnswer) {
						if(typeof surveyAnswer.question !== "undefined" && surveyAnswer.question == "depPrd"){		
							depPrd = surveyAnswer.answer ;
						}
					});					
					var productIdFunction = {
						productId : orderItem.productId,
						productFunctionId : orderItem.productFunctionId,
						depPrd : depPrd,
						amount:orderItem.amount+""
					};
					_this.productIdAndFuncIdList.push(productIdFunction);
				});
				
				//产品金额
				_this.orderProAmountForSell = parseFloat(subAmt);
				
				//订单总额=订单总额+税后利息
				subAmt = parseFloat(subAmt) + parseFloat(_this.sumAfterInterestValueForSell);
				subAmt = subAmt.toFixed(2);
				
				// 20180408加入判断，如果订单的总金额大于0，则需要显示订单支付工具按钮
				if(subAmt > 0){
					_this.isShowProductPayToolsForSell = true;		
				}
				
				// 订单头信息
				_this.orderHeaderForSell = {
					orderTypeId : "SALES_ORDER", // 订单类型
					tradePartyId : $rootScope.data.tellerInfo.orgId, // 交易机构
					productStoreId : $rootScope.data.tellerInfo.productStoreId, //
					userLoginId : $rootScope.data.tellerInfo.userId,  // 柜员
					entryDate : $rootScope.data.tellerInfo.tradeDate,  // 订单录入日期--20180717与王居宝确认，订单头信息的日期修改为核心日期
					salesChannelEnumId : "10",
					currencyUomId : "156",  // 订单币种
					transactionId : "" , // 流水号
					orderName : _this.orderNameForSell
				};
				
				// 如果订单产品金额为0,则需要进行费用试算
				if(subAmt == 0 || subAmt == 0.00){
					// 费用试算
					_this.calculateShoppingCartFeeForSell();
				}

				// 调用利率试算--20180327计价中心把产品功能编号-productFunctionId修改为必输项
				// 20180505增加是否为协议利率产品的判断条件(协议利率产品不需要调用计价系统的利率试算接口)
				// 是否协议利率产品标志
				_this.isAgreementInterest = _this.orderItemsInitForSell[0].isAgreementInterest;
				if (_this.isRequireIntRateForSell == "Y" && _this.isAgreementInterest == "N") {
					_this.getCalIntRateFloatForSell(_this.productIdAndFuncIdList);
				}
				// 订单产品总金额
				_this.orderPayTotalAmtForSell = subAmt;							
				$('#orderItemsTableForSell').bootstrapTable('load', _this.orderItemsInitForSell);	
			//	$('#orderItemsTableForSell').bootstrapTable('load', orderItemsForSell);
				// 初始化产品金额及订单金额
			//	$('#showOrderPayTotalAmtForSell').text(_this.orderPayTotalAmtForSell);
			//	$('#submintOrderPayTotalAmtForSell').text(_this.orderPayTotalAmtForSell);
				//格式化成千分位金额
				$('#showOrderPayTotalAmtForSell').text($filter('money')(_this.orderPayTotalAmtForSell, ""));
				$('#submintOrderPayTotalAmtForSell').text($filter('money')(_this.orderPayTotalAmtForSell, ""));
				// 初始化费用金额
				$('#showOrderPayFeeTotalAmtForSell').text("0.00");
				$rootScope.$digest();		

			};

			/**
			 * 打开订单的支付工具页面 sellPaymentTools:销售订单的支付工具
			 * purchasePaymentTools:采购订单支付工具 feeForSellPaymentTools:销售订单的费用支付工具
			 * feeForPurchasePaymentTools:采购订单的费用支付工具
			 */
			_this.showProductPayToolsForSell = function(paymentToolsType) {
				$rootScope.data.payOrderType = paymentToolsType;
				$rootScope.queryPayToolsByProductIds(_this.productIdAndFuncIdList);
				//如果支付工具只有一个，则不需弹出页面选择
				if($rootScope.data.paymentMethods.length == 1){						
					$rootScope.selectPayTool($rootScope.data.paymentMethodTheOne.paymentMethodTypeId,$rootScope.data.paymentMethodTheOne.description);										
				}else{
					$rootScope.angModal({
						title : '选择支付方式',
						width : ($("html").width() - 600),
						height : ($("html").height() - 280),
						url : '../customview/components/tabs/paymentmanage.html'
					});
				}
				
				// 获取支付工具的支付账号焦点
				// $("[ng-model='maincom.accountNumberForSell']").focus();
			};

			/**
			 * 初始化隐藏产品支付项输入框
			 */
			_this.initPayItemForSell = function() {
				_this.isShowProductPayForSell = false;   // 产品支付工具内容输入框
				_this.isShowAccountNumberForSell = false; // 支付工具信息：支付账号
				_this.isShowAccountNameForSell = false; // 支付账户户名
				_this.isShowSubAccountNumberForSell = false; // 支付子序号
				// 20180417理财支付加入证件类型，证件号码
				_this.isShowPayerCertTypeForSell = false; // 证件类型
				_this.isShowPayerCertNoForSell = false; // 证件号码
				_this.isShowPaymentIssuerPartyIdForSell = false; // 账户开户行号/机构
				_this.isShowAgreementTypeForSell = false; // 支付信息：授权类型
				_this.isShowAgreementContentForSell = false; // 授权协议内容
				_this.isShowSummaryCodeForSell = false; // 摘要码
				_this.isShowPurposeForSell = false; // 支付用途
				_this.isShowCashCaseCodeForSell = false; // 业务扩展信息：现金项目代码
				_this.isShowCertificateTypeForSell = false; // 凭证种类
				_this.isShowCertificateIdForSell = false; // 凭证号码
				_this.isShowChequeNoteDateForSell = false; // 出票日期
				_this.isShowCertificateBatchForSell = false; // 凭证批次
				_this.isShowCashOrRemitFlagForSell = false; // 钞汇标志
				_this.isShowSysCustTypeForSell = false; //客户类型
				_this.isShowDrwAcctForSell = false; //待销账来源账号			
				_this.isShowSubPyrAcctNumForSell = false; //待销账来源账号子账户序号
				_this.isShowDrawNmForSell = false; //待销账来源户名
				_this.isShowPymtAcctTpForSell = false; //待销账来源账户类型
				_this.isShowWtofSrlNumForSell = false; //待销账序号
				_this.isShowAccountNumberOBForSell = false;  //支付账号(他行)
				_this.isShowAccountNameOBForSell = false;  //支付账户户名(他行)
				_this.isShowPaymentPartyNameOBForSell = false;  //支付行名/机构名(他行)
				_this.isShowPaymentPartyIdOBForSell = false;  //支付行号/机构
				_this.isShowAccountAddressForSell =false;  //支付账户地址
			};
			
			/**
			 * 初始化隐藏费用支付项输入框
			 */
			_this.initFeePayItemForSell = function() {
				_this.isShowFeeAccountNumberForSell = false; // 支付工具信息：支付账号
				_this.isShowFeeAccountNameForSell = false; // 支付账户户名
				_this.isShowFeeSubAccountNumberForSell = false; // 支付子序号
				_this.isShowFeePaymentIssuerPartyIdForSell = false; // 账户开户行号/机构
				_this.isShowFeeAgreementTypeForSell = false; // 支付信息：授权类型
				_this.isShowFeeAgreementContentForSell = false; // 授权协议内容
				_this.isShowFeeSummaryCodeForSell = false; // 摘要码
				_this.isShowPurposeFeeForSell = false; // 支付用途
				_this.isShowFeeCashCaseCodeForSell = false; // 业务扩展信息：现金项目代码
				_this.isShowFeeCertificateTypeForSell = false; // 凭证种类
				_this.isShowFeeCertificateIdForSell = false; // 凭证号码
				_this.isShowFeeChequeNoteDateForSell = false; // 出票日期
				_this.isShowFeeCertificateBatchForSell = false; // 凭证批次
				_this.isShowFeeCashOrRemitFlagForSell = false; // 钞汇标志
				_this.isShowFeePayerCertTypeForSell = false; // 证件类型
				_this.isShowFeePayerCertNoForSell = false; // 证件号码
				_this.isShowFeeSysCustTypeForSell = false; //客户类型
				_this.isShowVerifyFeePayBtnForSell = false;  // 验证费用支付工具按钮
				_this.isShowFeeDrwAcctForSell = false; //待销账来源账号			
				_this.isShowFeeSubPyrAcctNumForSell = false; //待销账来源账号子账户序号
				_this.isShowFeeDrawNmForSell = false; //待销账来源户名
				_this.isShowFeePymtAcctTpForSell = false; //待销账来源账户类型
				_this.isShowWtofSrlNumFeeForSell = false; //待销账序号
			};
			
			/**
			 * 格式化产品支付工具输入框
			 */
			_this.initPayItemInputForSell = function() {
				_this.accountNumberForSell = ""; // 支付工具信息：支付账号
				_this.accountNameForSell = ""; // 支付账户户名
				_this.subAccountNumberForSell = ""; // 支付子序号
				_this.paymentIssuerPartyIdForSell = ""; // 账户开户行号/机构
				_this.paymentIssuerPartyNameForSell = ""; // 账户开户行名称/机构名称
				_this.agreementTypeForSell = "";
				_this.agreementContentForSell = ""; // 授权协议内容
				_this.summaryCodeForSell = ""; // 摘要码
				_this.cashCaseCodeForSell = ""; // 业务扩展信息：现金项目代码
				_this.certificateTypeForSell = ""; // 凭证种类
				_this.certificateIdForSell = ""; // 凭证号码
				_this.chequeNoteDateForSell = ""; // 出票日期				
				_this.drwAcctForSell = ""; // 待销账来源账号
				_this.subPyrAcctNumForSell = ""; // 待销账来源账号子账户序号
				_this.drawNmForSell = ""; // 待销账来源户名
				_this.pymtAcctTp = ""; // 待销账来源账户类型
				_this.wtofSrlNumForSell = ""; //待销账序号
				_this.payerCertNoForSell = ""; //证件号码
				_this.payerCertTypeForSell = ""; //证件类型
				_this.certificateBatchForSell = "";//凭证批次	
				_this.accountNumberOBForSell = ""; //支付账号(他行)
				_this.accountNameOBForSell = ""; //支付账户户名(他行)
				_this.paymentPartyNameOBForSell = ""; //支付行名/机构名(他行)
				_this.paymentPartyIdOBForSell = ""; //支付行号/机构(他行)
				_this.accountAddressForSell = "";  // 支付账户地址	
				_this.purposeForSell = ""; //支付用途
				
			};
			
			/**
			 * 格式化费用支付工具输入框
			 */
			_this.initFeePayItemInputForSell = function() {
				_this.accountNumberFeeForSell = ""; // 支付工具信息：支付账号
				_this.accountNameFeeForSell = ""; // 支付账户户名
				_this.subAccountNumberFeeForSell = ""; // 支付子序号
				_this.paymentIssuerPartyIdFeeForSell = ""; // 账户开户行号/机构
				_this.agreementTypeFeeForSell = "";
				_this.agreementContentFeeForSell = ""; // 授权协议内容
				_this.summaryCodeFeeForSell = ""; // 摘要码
				_this.cashCaseCodeFeeForSell = ""; // 业务扩展信息：现金项目代码
				_this.certificateTypeFeeForSell = ""; // 凭证种类
				_this.certificateIdFeeForSell = ""; // 凭证号码
				_this.chequeNoteDateFeeForSell = ""; // 出票日期
				_this.drwAcctFeeForSell = ""; // 待销账来源账号
				_this.subPyrAcctNumFeeForSell = ""; // 待销账来源账号子账户序号
				_this.drawNmFeeForSell = ""; // 待销账来源户名
				_this.pymtAcctTp = ""; // 待销账来源账户类型
				_this.wtofSrlNumFeeForSell = ""; //待销账序号
				_this.payerCertNoFeeForSell = ""; //证件号码
				_this.payerCertTypeFeeForSell = ""; //证件类型
				_this.certificateBatchFeeForSell = "";//凭证批次
				_this.purposeFeeForSell = ""; //支付用途
			};

			/**
			 * 产品的支付工具
			 */
			$rootScope.selectPayToolForSellOrder = function(pdPayToolId, pdPayTool) {
				showErrorMsg("");	
				// 凭证类型
				_this.certificateTypes = userService.selectXXMXList("certificateType");
				//更换产品支付工具时，可以结算
				_this.commitOrderSubmitBtnForSell = true;
				_this.isVerifyProductPayTools = false;
				_this.productPayMethodTypeForSell = pdPayToolId;
				// 清空上次选择的支付工具信息
				_this.initPayItemForSell();
		        _this.initPayItemInputForSell();
		        _this.agreementContentNameForSell = "授权协议内容";
				// 20180719支付工具加入现金入待销账
				if (pdPayToolId == "CASH" || pdPayToolId == "CASH_CACLACC") { // 现金
					_this.isShowProductPayForSell = true;
					// 费用试算
				//	if(_this.isCalculateShoppingCartFeeForSellFlag){
						_this.calculateShoppingCartFeeForSell();
						// 调用促销试算接口
					 	_this.calculateShoppingCartPromoForSell();
				//	}						
					// 现金代码
					_this.isShowCashCaseCodeForSell = true;
					// 客户类型
					_this.isShowSysCustTypeForSell = false;
					_this.isVerifyProductPayTools = true;
					_this.isShowVerifyPayBtnForSell = false; // 现金支付工具不需要验证支付项信息
				}else if(pdPayToolId == "PERSONAL_ACCOUNT_OB" || pdPayToolId == "CORPORAT_EACCOUNT_OB"){ //他行个人账号,他行对公账号
					_this.isShowProductPayForSell = true; // 打开支付工具栏
					_this.isVerifyProductPayTools = true;  //他行账户不需要验证支付项信息
					_this.isShowVerifyPayBtnForSell = false; //他行支付工具不显示验证支付项按钮
					_this.isShowAccountNumberOBForSell = true; //支付账号(他行)
					_this.isShowAccountNameOBForSell = true; //支付账户户名(他行)
					_this.isShowPaymentPartyNameOBForSell = true; //支付行名/机构名(他行)
					_this.isShowPaymentPartyIdOBForSell = true; //支付行号/机构(他行)
					_this.isShowAccountAddressForSell = false;  // 支付账户地址
					_this.isShowCashOrRemitFlagForSell = true; // 钞汇标志
					_this.calculateShoppingCartFeeForSell();
				}else {
					_this.isShowVerifyPayBtnForSell = true; // 截至20180425,除了现金其他需要验证支付信息
					// 截至20180421除了现金支付工具，支付账号，账户名称,开户行号/机构这3项都魏必输
					_this.isShowProductPayForSell = true; // 打开支付工具栏
					_this.isShowAccountNumberForSell = true; // 支付账号
					_this.isShowAccountNameForSell = true;  // 账户名称
					_this.isShowPaymentIssuerPartyIdForSell = true; // 开户行号/机构
					//20180724加入重新由对公账户改为个人账户
					_this.payerCertTypesForSell = userService.selectXXMXList("idenType");
					// 本行借记卡、本行借记IC支付信息一样
					//20180719增加单位结算卡
					if (pdPayToolId == "DEBIT_CARD" || pdPayToolId == "DEBIT_CARD_IC" || pdPayToolId == "CORPORATE_CARD") { 
						_this.isShowAgreementTypeForSell = true; // 授权类型
						_this.isShowAgreementContentForSell = true; // 授权内容
						_this.isShowSummaryCodeForSell = true;
						// 20180413测试用，待子账户查询功能调试完毕，去掉_this.isShowSubAccountNumberForSell=true这一句
						_this.isShowSubAccountNumberForSell = true; // 支付子序号
						_this.agreementTypes = [
							{value : "1", text : "凭密码"}
						];
						_this.isShowSummaryCodeForSell = true; // 摘要代码
						_this.isShowCashOrRemitFlagForSell = true; // 钞汇标志
						_this.isShowCertificateTypeForSell = true; // 凭证种类
						_this.isShowSysCustTypeForSell = false;// 客户类型
						if(pdPayToolId == "DEBIT_CARD" || pdPayToolId == "CORPORATE_CARD"){ //20180521本行借记卡支付新增凭证批次、凭证号码
							_this.isShowCertificateIdForSell = true; // 凭证号码
							_this.isShowCertificateBatchForSell = true; // 凭证批次
						}
						if(pdPayToolId == "CORPORATE_CARD"){ //20180719增加单位结算卡
							_this.isShowPayerCertTypeForSell = true; // 证件类型
							_this.isShowPayerCertNoForSell = true; // 证件号码
							_this.isShowSysCustTypeForSell = false;// 客户类型
						}
					} else if (pdPayToolId == "DEPOSIT_BOOK" || pdPayToolId== "CREDIT_ACCOUNT" || pdPayToolId== "PERSONAL_ACCOUNT"
						|| pdPayToolId == "PERSONAL_OTHER" || pdPayToolId == "CORPORATE_OTHER" || pdPayToolId == "CORPORAT_EACCOUNT" ) { // 本行存折,本行信贷账户,本行个人账号,本行个人其他,本行对公其他,本行对公账号
						_this.isShowAgreementTypeForSell = true; // 授权类型
						_this.isShowAgreementContentForSell = true; // 授权内容
						_this.isShowSummaryCodeForSell = true; // 摘要代码
						_this.isShowPayerCertTypeForSell = true; // 证件类型
						_this.isShowPayerCertNoForSell = true; // 证件号码
						_this.isShowSysCustTypeForSell = false;// 客户类型
						_this.agreementTypes = [
							{value : "1", text : "凭密码"},
							{value : "2", text : "凭证件"},
							{value : "3", text : "凭密码+证件"}
						];						
						if(pdPayToolId == "DEPOSIT_BOOK" || pdPayToolId== "PERSONAL_ACCOUNT" || pdPayToolId== "PERSONAL_OTHER"){
							_this.isShowSubAccountNumberForSell = true; // 支付子序号
						}
						if( pdPayToolId == "CORPORATE_OTHER" || pdPayToolId == "CORPORAT_EACCOUNT"){
							_this.payerCertTypesForSell = _this.companyCertTypesForSell;
						}
						if(pdPayToolId== "CREDIT_ACCOUNT"){
							_this.isShowSysCustTypeForSell = false;// 客户类型
						}
						if(pdPayToolId == "DEPOSIT_BOOK"){ // 本行存折
							_this.isShowCertificateTypeForSell = true; // 凭证种类
							_this.isShowCertificateIdForSell = true; // 凭证号码
							_this.isShowCertificateBatchForSell = true; // 凭证批次
						}
						if(pdPayToolId == "CORPORAT_EACCOUNT" || pdPayToolId == "CORPORATE_OTHER"){ // 20180824本行对公账号、本行对公其他加入凭证批次
							_this.isShowCertificateBatchForSell = true; // 凭证批次
						}							
						if(pdPayToolId== "CREDIT_ACCOUNT" || pdPayToolId== "PERSONAL_ACCOUNT" || pdPayToolId == "CORPORAT_EACCOUNT"){ // 本行信贷账户,本行个人账号,本行对公账号
							_this.isShowCashOrRemitFlagForSell = true; // 钞汇标志
							if(pdPayToolId== "PERSONAL_ACCOUNT" || pdPayToolId == "CORPORAT_EACCOUNT"){
								_this.isShowSysCustTypeForSell = false;// 客户类型
							}							
						}
						if(pdPayToolId== "CORPORATE_OTHER" || pdPayToolId == "CORPORAT_EACCOUNT"){ // 行对公其他,本行对公账号
							_this.isShowCertificateTypeForSell = true; // 凭证种类
							_this.isShowCertificateIdForSell = true; // 凭证号码
							_this.agreementTypes = [
								{value : "4", text : "凭密码+印鉴"},
								{value : "5", text : "凭印鉴/签名"},
								{value : "6", text : "凭支付密码"}
							];
							_this.isShowSysCustTypeForSell = false;// 客户类型
						}						
					} else if (pdPayToolId == "II-ACCOUNT" || pdPayToolId == "III-ACCOUNT"  || pdPayToolId == "CHECKING_CASH" || pdPayToolId == "CHECKING_TRANSFER") { // 本行二类账户,本行三类账户
						if(pdPayToolId == "II-ACCOUNT" || pdPayToolId == "CHECKING_CASH" || pdPayToolId == "CHECKING_TRANSFER"){
							_this.isShowSubAccountNumberForSell = true; // 支付子序号
							_this.isShowPurposeForSell = true; //用途
						}
						_this.isShowAgreementTypeForSell = true; // 授权类型
						_this.isShowAgreementContentForSell = true; // 授权内容
						_this.isShowSummaryCodeForSell = true; // 摘要代码
						_this.isShowAgreementTypeForSell = true; // 授权类型
						_this.agreementTypes = [
							{value : "1", text : "凭密码"}
						];
						_this.isShowCashOrRemitFlagForSell = true; // 钞汇标志
						_this.isShowCertificateTypeForSell = true; // 凭证种类
						_this.isShowCertificateIdForSell = true; // 凭证号码
						_this.isShowCertificateBatchForSell = true; // 凭证批次
						_this.isShowChequeNoteDateForSell = true;  //出票日期
						_this.isShowCashOrRemitFlagForSell = true; //用途
						//20181013现金支票、转账支票需要增加协议类型
						if(pdPayToolId == "CHECKING_CASH" || pdPayToolId == "CHECKING_TRANSFER"){
							_this.agreementTypes = [
								{value : "1", text : "凭密码"},
								{value : "2", text : "凭证件"},
								{value : "3", text : "凭密码+证件"},
								{value : "4", text : "凭密码+印鉴"},
								{value : "5", text : "凭印鉴/签名"},
								{value : "6", text : "凭支付密码"},
								{value : "8", text : "凭协议"},
								{value : "a", text : "凭硬件/支付密码"}
							];
						}
					}else if(pdPayToolId == "COURSE_ACCOUNT" || pdPayToolId == "INNER_ACCOUNT" || pdPayToolId == "STAY_CACLACC"
						|| pdPayToolId == "MONEY_ORDER_BANK" || pdPayToolId == "MONEY_ORDER_COMPANY"){ // 本行科目类账户,内部户,待销账,银行汇票,商业汇票
						_this.isShowSummaryCodeForSell = true; // 摘要代码
						if( pdPayToolId == "COURSE_ACCOUNT"){// 本行科目类账户
							_this.isShowAgreementTypeForSell = true; // 授权类型
							_this.agreementTypes = [
								{value : "0", text : "无"}
							];
						}
						if(pdPayToolId == "INNER_ACCOUNT"){// 内部户
							_this.isShowCashOrRemitFlagForSell = false; // 钞汇标志
							_this.isShowSysCustTypeForSell = false;// 客户类型
							_this.isShowSummaryCodeForSell = false; // 摘要代码
							_this.cashOrRemitFlagForSell = "0";
						}
						if(pdPayToolId == "STAY_CACLACC"){//待销账
							_this.isShowCashOrRemitFlagForSell = false; // 钞汇标志
							_this.isShowSysCustTypeForSell = false;// 客户类型
							_this.isShowWtofSrlNumForSell = true; //待销账序号
							_this.isShowDrwAcctForSell = true;// 待销账来源账号
							_this.isShowSubPyrAcctNumForSell = true;// 待销账来源账号子账户序号
							_this.isShowDrawNmForSell = true;// 待销账来源户名
							_this.isShowPymtAcctTpForSell = true;// 待销账来源账户类型
							_this.isShowSummaryCodeForSell = false; // 摘要代码
							_this.cashOrRemitFlagForSell = "0";
						}
					}
				}

				//20180926支付工具凭证种类初始化
				if(pdPayToolId == "CORPORAT_EACCOUNT" || pdPayToolId == "CORPORATE_OTHER" || pdPayToolId == "INNER_ACCOUNT"){ //判断本行对公账号、本行对公其他及内部户
					_this.certificateTypeForSell = "099";
				}else if(pdPayToolId == "CORPORATE_CARD"){ //判断单位结算卡
					_this.certificateTypes = [
						{value : "062", text : "业务委托书"},
						{value : "099", text : "其他"}
					];
					_this.certificateTypeForSell = "062";
				}else if(pdPayToolId == "CHECKING_TRANSFER"){ //转账支票
					_this.certificateTypes = [
						{value : "002", text : "转账支票"}
					];
					_this.certificateTypeForSell = "002";
				}else if(pdPayToolId == "CHECKING_CASH"){ //现金支票
					_this.certificateTypes = [
						{value : "001", text : "现金支票"}
					];
					_this.certificateTypeForSell = "001";
				}
				//20181026本行对公账号及其他，凭证种类重新赋值
				if(pdPayToolId == "CORPORAT_EACCOUNT" || pdPayToolId == "CORPORATE_OTHER"){
					_this.certificateTypes = [
						{value : "099", text : "其他"},
						{value : "062", text : "业务委托书"},
						{value : "002", text : "转账支票"},
						{value : "005", text : "商业承兑汇票"},
						{value : "006", text : "银行承兑汇票"},
						{value : "003", text : "银行汇票"}
					];	
					_this.isShowPayerCertTypeForSell = false; // 证件类型
					_this.isShowPayerCertNoForSell = false; // 证件号码
					_this.isShowSummaryCodeForSell = false; // 摘要代码
					_this.isShowCashOrRemitFlagForSell = false; // 钞汇标志
					_this.isShowChequeNoteDateForSell = true;  //出票日期
				}
				//20181027本行个人账号，本行个人其他,本行借记卡隐藏支付项
				if(pdPayToolId == "PERSONAL_ACCOUNT" || pdPayToolId == "PERSONAL_OTHER" || pdPayToolId == "DEBIT_CARD"){
					if(pdPayToolId == "DEBIT_CARD"){
						_this.isShowPayerCertTypeForSell = false; // 证件类型
						_this.isShowPayerCertNoForSell = false; // 证件号码
					}else{
						_this.isShowPayerCertTypeForSell = true; // 证件类型
						_this.isShowPayerCertNoForSell = true; // 证件号码
					}										
					_this.isShowSubAccountNumberForSell = false;  //子账户序号
					_this.isShowPaymentIssuerPartyIdForSell = false; //开户机构
					_this.isShowSummaryCodeForSell = false; // 摘要代码
					_this.isShowCashOrRemitFlagForSell = false; // 钞汇标志					
					_this.isShowCertificateTypeForSell = false; // 凭证种类
					_this.isShowCertificateIdForSell = false; // 凭证号码
					_this.isShowCertificateBatchForSell = false; // 凭证批次
				}
				//20181031单位结算卡
				if(pdPayToolId == "CORPORATE_CARD"){
					_this.isShowSubAccountNumberForSell = false;  //子账户序号
					_this.isShowSummaryCodeForSell = false; // 摘要代码
					_this.isShowCashOrRemitFlagForSell = false; // 钞汇标志	
				}	
				$("#productPayToolsNameForSell").text(pdPayTool);				
				// --更换支付工具时初始化费用支付工具-start--
				_this.initFeePayItemForSell();
			// _this.initFeePayItemInputForSell();
				$("#feePaymentToolName").text("");
			//	$rootScope.$digest();
				// --更换支付工具时初始化费用支付工具-end--
				//20180815加入调用刷磁刷卡回显账号
				//本行借记卡,本行借记IC卡,本行存折,单位结算卡
				//20181016加入本行个人账号
				if(pdPayToolId == "DEBIT_CARD" || pdPayToolId == "DEBIT_CARD_IC" || pdPayToolId == "DEPOSIT_BOOK" || pdPayToolId == "CORPORATE_CARD" || pdPayToolId == "PERSONAL_ACCOUNT"){
					if(typeof _this.noNeedReadCardTranCodeList !== "undefined" && _this.noNeedReadCardTranCodeList.length > 0){
						var noNeedReadCardFlag = true; //可刷卡标志
						for(var i=0;i<_this.noNeedReadCardTranCodeList.length;i++){
							//sysparam配置文件noNeedReadCardTranCode交易码
							var tranCodeFormConfig = _this.noNeedReadCardTranCodeList[i];
							//如果noNeedReadCardTranCode配置的交易码与当前交易码一致，则不允许刷卡
							if(_this.tranCodeForSell == tranCodeFormConfig){
								showErrorMsg("当前交易不支持刷卡，请手工输入卡号并不可以拔出IC卡！");	
								noNeedReadCardFlag = false;
								break;
							}														
						}	
						//调用刷卡
						if(noNeedReadCardFlag){
							_this.alertNeedReadCardForSell();
						}
						return ;
					}					
				}
				//20181114控制光标调至支付工具第一个文本域
				//如果支付工具为他行个人账号或者他行对公账号
				if(pdPayToolId == "PERSONAL_ACCOUNT_OB" || pdPayToolId == "CORPORAT_EACCOUNT_OB"){
					setTimeout(function(){
						$("#accountNumberOBForSellId").focus();
					},200);
				}else{ //其他的支付工具跳至支付账号文本域
					setTimeout(function(){
						$("#accountNumberForSellId").focus();
					},200);
				}
							
			};
			
			// 弹出读卡确认框
			_this.alertNeedReadCardForSell = function() {
				$.confirm({
					title : '提示',
					content : '<h5 style="text-align: center">是否读卡?</h5>',
					buttons : {
						confirm : {
							text : '是',
							btnClass : 'btn btn-blue-ok',
							keys : [ 'enter' ],
							action : function() {
								_this.alertNeedReadMagnetismForSell();
							}
						},
						cancel : {
							text : '否',
							keys : [ 'esc' ],
							btnClass : 'btn btn-blue-cancal',
							action : function() {
								setTimeout(function(){
									$("#accountNumberForSellId").focus();
								},200);
							}
						}						
					}
				});
			};
			
			// 弹出刷卡、刷磁确认框
			_this.alertNeedReadMagnetismForSell = function() {
				var cardNo = "";
				$.confirm({
					title : '提示',
					content : '<h5 style="text-align: center">确认-读取IC卡,取消-刷磁</h5>',
					buttons : {
						confirm : {
							text : '确认',
							btnClass : 'btn btn-blue-ok',
							keys : [ 'enter' ],
							action : function() {
								cardNo = userService.NeedReadICCardForOrder();
							//	alert("刷卡cardNo=="+cardNo);
								//设置支付账号
								_this.accountNumberForSell = cardNo;								
								$rootScope.$digest();
								setTimeout(function(){
									$("#accountNumberForSellId").focus();
								},200);
							}
						},
						cancel : {
							text : '取消',
							keys : [ 'esc' ],
							btnClass : 'btn btn-blue-cancal',
							action : function() {
								cardNo = userService.NeedReadMagnetismForOrder();
						//		alert("刷磁cardNo=="+cardNo);
								//设置支付账号
								_this.accountNumberForSell = cardNo;
								$rootScope.$digest();
								setTimeout(function(){
									$("#accountNumberForSellId").focus();
								},200);
							}
						}
					}
				});				
			};

			/**
			 * 费用的支付工具
			 */
			$rootScope.selectCostPayToolForSellOrder = function(feePayToolId, feePayToolName) {	
				showErrorMsg("");	
				// 凭证类型
				_this.certificateTypes = userService.selectXXMXList("certificateType");
				//更换产品费用支付工具时，可以结算
				_this.commitOrderSubmitBtnForSell = true;
				_this.isVerifyFeePayTools = false;
				_this.feePayMethodTypeNameForSell = feePayToolId;
				_this.isShowProductFeePayForSell = true; // 打开费用支付信息
				_this.initFeePayItemForSell();
				_this.initFeePayItemInputForSell();
				_this.agreementContentNameFeeForSell = "授权协议内容";
				// 20180719费用支付工具加入现金入待销账
				if (feePayToolId == "CASH" || feePayToolId == "CASH_CACLACC") { // 现金
					// 现金项目代码
					_this.isShowFeeCashCaseCodeForSell = true;
					// 客户类型
					_this.isShowFeeSysCustTypeForSell = false;
					_this.isVerifyFeePayTools = true;
					_this.isShowVerifyFeePayBtnForSell = false;	// 现金支付工具不需要验证费用支付项信息
				} else {
					_this.isShowVerifyFeePayBtnForSell = true; // 截至20180425,除了现金其他需要验证支付信息
					// 截至20180421除了现金支付工具，支付账号，账户名称,开户行号/机构这3项都魏必输
					_this.isShowFeeProductPayForSell = true; // 打开支付工具栏
					_this.isShowFeeAccountNumberForSell = true; // 支付账号
					_this.isShowFeeAccountNameForSell = true;  // 账户名称
					_this.isShowFeePaymentIssuerPartyIdForSell = true; // 开户行号/机构
					_this.isShowFeeSysCustTypeForSell = false;// 客户类型
					//20180724加入重新由对公账户改为个人账户
					_this.payerCertTypesForSell = userService.selectXXMXList("idenType");
					// 本行借记卡、本行借记IC支付信息一样
					//20180719增加单位结算卡
					if (feePayToolId == "DEBIT_CARD" || feePayToolId == "DEBIT_CARD_IC" || feePayToolId == "CORPORATE_CARD") { 
						_this.isShowFeeAgreementTypeForSell = true; // 授权类型
						_this.isShowFeeAgreementContentForSell = true; // 授权内容
						_this.isShowFeeSummaryCodeForSell = true;
						// 20180413测试用，待子账户查询功能调试完毕，去掉_this.isShowSubAccountNumberForSell=true这一句
						_this.isShowFeeSubAccountNumberForSell = true; // 支付子序号
						_this.agreementTypes = [
							{value : "1", text : "凭密码"}
						];
						_this.isShowFeeSummaryCodeForSell = true; // 摘要代码
						_this.isShowFeeCashOrRemitFlagForSell = true; // 钞汇标志
						_this.isShowFeeCertificateTypeForSell = true; // 凭证种类
						if(feePayToolId == "DEBIT_CARD" || feePayToolId == "CORPORATE_CARD"){ //20180521本行借记卡支付新增凭证批次、凭证号码
							_this.isShowFeeCertificateIdForSell = true; // 凭证号码
							_this.isShowFeeCertificateBatchForSell = true; // 凭证批次
						}
						if(feePayToolId == "CORPORATE_CARD"){ //20180719增加单位结算卡
							_this.isShowFeePayerCertTypeForSell = true; // 证件类型
							_this.isShowFeePayerCertNoForSell = true; // 证件号码
							_this.isShowFeeSysCustTypeForSell = false;// 客户类型
						}
					} else if (feePayToolId == "DEPOSIT_BOOK" || feePayToolId== "CREDIT_ACCOUNT" || feePayToolId== "PERSONAL_ACCOUNT"
						|| feePayToolId == "PERSONAL_OTHER" || feePayToolId == "CORPORATE_OTHER" || feePayToolId == "CORPORAT_EACCOUNT" ) { // 本行存折,本行信贷账户,本行个人账号,本行个人其他,本行对公其他,本行对公账号
						_this.isShowFeeAgreementTypeForSell = true; // 授权类型
						_this.isShowFeeAgreementContentForSell = true; // 授权内容
						_this.isShowFeeSummaryCodeForSell = true; // 摘要代码
						_this.isShowFeePayerCertTypeForSell = true; // 证件类型
						_this.isShowFeePayerCertNoForSell = true; // 证件号码
						_this.agreementTypes = [
							{value : "1", text : "凭密码"},
							{value : "2", text : "凭证件"},
							{value : "3", text : "凭密码+证件"}
						];		
						if(feePayToolId == "DEPOSIT_BOOK" || feePayToolId== "PERSONAL_ACCOUNT" || feePayToolId== "PERSONAL_OTHER"){
							_this.isShowFeeSubAccountNumberForSell = true; // 支付子序号
						}
						if( feePayToolId == "CORPORATE_OTHER" || feePayToolId == "CORPORAT_EACCOUNT"){
							_this.payerCertTypesForSell = _this.companyCertTypesForSell;
						}
						if(feePayToolId== "CREDIT_ACCOUNT"){
							_this.isShowFeeSysCustTypeForSell = false;// 客户类型
						}
						if(feePayToolId == "DEPOSIT_BOOK"){ // 本行存折
							_this.isShowFeeCertificateTypeForSell = true; // 凭证种类
							_this.isShowFeeCertificateIdForSell = true; // 凭证号码
							_this.isShowFeeCertificateBatchForSell = true; // 凭证批次
						}
						if(feePayToolId == "CORPORAT_EACCOUNT" || feePayToolId == "CORPORATE_OTHER"){ // 20180824本行对公账号、本行对公其他加入凭证批次
							_this.isShowFeeCertificateBatchForSell = true; // 凭证批次
						}
						if(feePayToolId== "CREDIT_ACCOUNT" || feePayToolId== "PERSONAL_ACCOUNT" || feePayToolId == "CORPORAT_EACCOUNT"){ // 本行信贷账户,本行个人账号,本行对公账号
							_this.isShowFeeCashOrRemitFlagForSell = true; // 钞汇标志
							if(feePayToolId== "PERSONAL_ACCOUNT" || feePayToolId == "CORPORAT_EACCOUNT"){
								_this.isShowFeeSysCustTypeForSell = false;// 客户类型
							}	
						}
						if(feePayToolId== "CORPORATE_OTHER" || feePayToolId == "CORPORAT_EACCOUNT"){ // 行对公其他,本行对公账号
							_this.isShowFeeCertificateTypeForSell = true; // 凭证种类
							_this.isShowFeeCertificateIdForSell = true; // 凭证号码
							_this.agreementTypes = [
								{value : "4", text : "凭密码+印鉴"},
								{value : "5", text : "凭印鉴/签名"},
								{value : "6", text : "凭支付密码"}
							];
							_this.isShowFeeSysCustTypeForSell = false;// 客户类型
						}						
					}
					// 本行二类账户,本行三类账户  20180802增加现金支票和转账支票支付工具
					else if (feePayToolId == "II-ACCOUNT" || feePayToolId == "III-ACCOUNT" || feePayToolId == "CHECKING_CASH" || feePayToolId == "CHECKING_TRANSFER") { 
						if(feePayToolId == "II-ACCOUNT" || feePayToolId == "CHECKING_CASH" || feePayToolId == "CHECKING_TRANSFER"){
							_this.isShowFeeSubAccountNumberForSell = true; // 支付子序号
							_this.isShowPurposeFeeForSell = true; //用途
						}
						_this.isShowFeeAgreementTypeForSell = true; // 授权类型
						_this.isShowFeeAgreementContentForSell = true; // 授权内容
						_this.isShowFeeSummaryCodeForSell = true; // 摘要代码
						_this.isShowFeeAgreementTypeForSell = true; // 授权类型
						_this.agreementTypes = [
							{value : "1", text : "凭密码"}
						];
						_this.isShowFeeCashOrRemitFlagForSell = true; // 钞汇标志
						_this.isShowFeeCertificateTypeForSell = true; // 凭证种类
						_this.isShowFeeCertificateIdForSell = true; // 凭证号码
						_this.isShowFeeCertificateBatchForSell = true; // 凭证批次
						_this.isShowFeeChequeNoteDateForSell = true;  //出票日期
						_this.isShowFeeCashOrRemitFlagForSell = true; //用途
						//20181013现金支票、转账支票需要增加协议类型
						if(feePayToolId == "CHECKING_CASH" || feePayToolId == "CHECKING_TRANSFER"){
							_this.agreementTypes = [
								{value : "1", text : "凭密码"},
								{value : "2", text : "凭证件"},
								{value : "3", text : "凭密码+证件"},
								{value : "4", text : "凭密码+印鉴"},
								{value : "5", text : "凭印鉴/签名"},
								{value : "6", text : "凭支付密码"},
								{value : "8", text : "凭协议"},
								{value : "a", text : "凭印鉴/支付密码"}
							];
						}
					}else if(feePayToolId == "COURSE_ACCOUNT" || feePayToolId == "INNER_ACCOUNT" || feePayToolId == "STAY_CACLACC"
						|| feePayToolId == "MONEY_ORDER_BANK" || feePayToolId == "MONEY_ORDER_COMPANY"){ // 本行科目类账户,内部户,待销账,银行汇票,商业汇票
						_this.isShowFeeSummaryCodeForSell = true; // 摘要代码
						if( feePayToolId == "COURSE_ACCOUNT"){// 本行科目类账户
							_this.isShowFeeAgreementTypeForSell = true; // 授权类型
							_this.agreementTypes = [
								{value : "0", text : "无"}
							];
						}
						if(feePayToolId == "INNER_ACCOUNT"){// 内部户
							_this.isShowFeeCashOrRemitFlagForSell = false; // 钞汇标志
							_this.isShowFeeSysCustTypeForSell = false;// 客户类型
							_this.isShowFeeSummaryCodeForSell = false; // 摘要代码
							_this.cashOrRemitFlagFeeForSell = "0";
						}
						if( feePayToolId == "STAY_CACLACC"){//待销账							
							_this.isShowFeeCashOrRemitFlagForSell = false; // 钞汇标志
							_this.isShowFeeSysCustTypeForSell = false;// 客户类型		
							_this.isShowWtofSrlNumFeeForSell = true; //待销账序号
							_this.isShowFeeDrwAcctForSell = true;// 待销账来源账号
							_this.isShowFeeSubPyrAcctNumForSell = true;// 待销账来源账号子账户序号
							_this.isShowFeeDrawNmForSell = true;// 待销账来源户名
							_this.isShowFeePymtAcctTpForSell = true;// 待销账来源账户类型
							_this.isShowFeeSummaryCodeForSell = false; // 摘要代码
							_this.cashOrRemitFlagFeeForSell = "0";
						}
					} 
					_this.isShowVerifyFeePayBtnForSell = true;	
				}					
	
				//20180926支付工具凭证种类初始化
				if(feePayToolId == "CORPORAT_EACCOUNT" || feePayToolId == "CORPORATE_OTHER" || feePayToolId == "INNER_ACCOUNT"){ //判断本行对公账号、本行对公其他及内部户
					_this.certificateTypeFeeForSell = "099";
				}else if(feePayToolId == "CORPORATE_CARD"){ //判断单位结算卡
					_this.certificateTypes = [
						{value : "062", text : "业务委托书"},
						{value : "099", text : "其他"}
					];
					_this.certificateTypeFeeForSell = "062";
				}else if(feePayToolId == "CHECKING_TRANSFER"){ //转账支票
					_this.certificateTypes = [
						{value : "002", text : "转账支票"}
					];
					_this.certificateTypeFeeForSell = "002";
				}else if(feePayToolId == "CHECKING_CASH"){ //现金支票
					_this.certificateTypes = [
						{value : "001", text : "现金支票"}
					];
					_this.certificateTypeFeeForSell = "001";
				}
				//20181026本行对公账号及其他，凭证种类重新赋值
				if(feePayToolId == "CORPORAT_EACCOUNT" || feePayToolId == "CORPORATE_OTHER"){
					_this.certificateTypes = [
						{value : "099", text : "其他"},
						{value : "062", text : "业务委托书"},
						{value : "002", text : "转账支票"},
						{value : "005", text : "商业承兑汇票"},
						{value : "006", text : "银行承兑汇票"},
						{value : "003", text : "银行汇票"}
					];
					_this.isShowFeePayerCertTypeForSell = false; // 证件类型
					_this.isShowFeePayerCertNoForSell = false; // 证件号码
					_this.isShowFeeSummaryCodeForSell = false; // 摘要代码
					_this.isShowFeeCashOrRemitFlagForSell = false; // 钞汇标志
					_this.isShowFeeChequeNoteDateForSell = true;  //出票日期
				}
				//20181027本行个人账号，本行个人其他,本行借记卡隐藏支付项
				if(feePayToolId == "PERSONAL_ACCOUNT" || feePayToolId == "PERSONAL_OTHER" || feePayToolId == "DEBIT_CARD"){
					if(feePayToolId == "PERSONAL_ACCOUNT" || feePayToolId == "PERSONAL_OTHER"){
						_this.isShowFeePayerCertTypeForSell = false; // 证件类型
						_this.isShowFeePayerCertNoForSell = false; // 证件号码
					}					
					_this.isShowFeeSubAccountNumberForSell = false;  //子账户序号
					_this.isShowFeePaymentIssuerPartyIdForSell = false; //开户机构
					_this.isShowFeeSummaryCodeForSell = false; // 摘要代码
					_this.isShowFeeCashOrRemitFlagForSell = false; // 钞汇标志
					_this.isShowFeePayerCertTypeForSell = true; // 证件类型
					_this.isShowFeePayerCertNoForSell = true; // 证件号码
					_this.isShowFeeCertificateTypeForSell = false; // 凭证种类
					_this.isShowFeeCertificateIdForSell = false; // 凭证号码
					_this.isShowFeeCertificateBatchForSell = false; // 凭证批次
				}
				
				//20181031单位结算卡
				if(feePayToolId == "CORPORATE_CARD"){
					_this.isShowFeeSubAccountNumberForSell = false;  //子账户序号
					_this.isShowFeeSummaryCodeForSell = false; // 摘要代码
					_this.isShowFeeCashOrRemitFlagForSell = false; // 钞汇标志
				}
				
				$("#feePaymentToolName").text(feePayToolName);		
				
				//20181031手续费加入刷卡,刷折
				if(feePayToolId == "DEBIT_CARD" || feePayToolId == "DEBIT_CARD_IC" || feePayToolId == "DEPOSIT_BOOK" || feePayToolId == "CORPORATE_CARD" || feePayToolId == "PERSONAL_ACCOUNT"){
					if(typeof _this.noNeedReadCardTranCodeList !== "undefined" && _this.noNeedReadCardTranCodeList.length > 0){						
						var noNeedReadCardFlag = true; //可刷卡标志
						for(var i=0;i<_this.noNeedReadCardTranCodeList.length;i++){
							//sysparam配置文件noNeedReadCardTranCode交易码
							var tranCodeFormConfig = _this.noNeedReadCardTranCodeList[i];
							//如果noNeedReadCardTranCode配置的交易码与当前交易码一致，则不允许刷卡
							if(_this.tranCodeForSell == tranCodeFormConfig){
								showErrorMsg("当前交易不支持刷卡，请手工输入卡号并不可以拔出IC卡！");	
								noNeedReadCardFlag = false;
								break;
							}														
						}	
						//调用刷卡
						if(noNeedReadCardFlag){
							_this.alertNeedReadCardFeeForSell();
						}
						return ;
			
					}					
				}
				//20181114控制光标调至费用支付工具第一个文本域
				setTimeout(function(){
					$("#accountNumberFeeForSellId").focus();
				},200);
		//		$rootScope.$digest();
			};
			
			
			// 弹出读卡确认框
			_this.alertNeedReadCardFeeForSell = function() {
				$.confirm({
					title : '提示',
					content : '<h5 style="text-align: center">是否读卡?</h5>',
					buttons : {
						confirm : {
							text : '是',
							btnClass : 'btn btn-blue-ok',
							keys : [ 'enter' ],
							action : function() {
								_this.alertNeedReadMagnetismFeeForSell();
							}
						},
						cancel : {
							text : '否',
							keys : [ 'esc' ],
							btnClass : 'btn btn-blue-cancal',
							action : function() {
								setTimeout(function(){
									$("#accountNumberFeeForSellId").focus();
								},200);
							}
						}
					}
				});
			};
			
			// 弹出刷卡、刷磁确认框
			_this.alertNeedReadMagnetismFeeForSell = function() {
				var cardNo = "";
				$.confirm({
					title : '提示',
					content : '<h5 style="text-align: center">确认-读取IC卡,取消-刷磁</h5>',
					buttons : {
						confirm : {
							text : '确认',
							btnClass : 'btn btn-blue-ok',
							keys : [ 'enter' ],
							action : function() {
								cardNo = userService.NeedReadICCardForOrder();
							//	alert("刷卡cardNo=="+cardNo);
								//设置费用支付账号
								_this.accountNumberFeeForSell = cardNo;								
								$rootScope.$digest();
								setTimeout(function(){
									$("#accountNumberFeeForSellId").focus();
								},200);
							}
						},
						cancel : {
							text : '取消',
							keys : [ 'esc' ],
							btnClass : 'btn btn-blue-cancal',
							action : function() {
								cardNo = userService.NeedReadMagnetismForOrder();
						//		alert("刷磁cardNo=="+cardNo);
								//设置费用支付账号
								_this.accountNumberFeeForSell = cardNo;
								$rootScope.$digest();
								setTimeout(function(){
									$("#accountNumberFeeForSellId").focus();
								},200);
							}
						}
					}
				});				
			};
			
			//根据行名查询行号
			$rootScope.queryBankInfoForSellEnter = function(event){	
				showErrorMsg("");	
				setTimeout(function(){
					if (event.keyCode == 13) {
						$rootScope.setBankNameForOrder(_this.paymentPartyNameOBForSell);
						$rootScope.initQueryBankInfoList();
		//				var result = userService.queryBankInfoForOrder(_this.paymentPartyNameOBForSell);								
						$rootScope.angModal({
							title : '选择行号信息',
							width : ($("html").width() - 600),
							height : ($("html").height() - 270),
							url : '../customview/components/tabs/queryBankInfo_order.html'
						});
//						setTimeout(function(){
//							$('#queryBankInfoListTable').bootstrapTable('load', result);
//						},1000);
					}
				},300);
			}
			
			/**
			 * 设置选中的行号
			 *
			 **/
			$rootScope.selectBankInfoOrderForSell = function(BankId) {
				showErrorMsg("");
				//设置行号
				_this.paymentPartyIdOBForSell = BankId;
				$rootScope.$digest();
			};
			
			//订单支付工具子账户序号回车触发方法
			$rootScope.subaccountNumberQueryForSellEnter = function(event){		
				showErrorMsg("");
				setTimeout(function(){
					if (event.keyCode == 13) {
						_this.subaccountNumberQueryForSell();
					}
				},300);
			}
			
			/**
			 * 子账户序号查询
			 */
			_this.subaccountNumberQueryForSell = function() {
				showErrorMsg("");	
				if(_this.accountNumberForSell == undefined || _this.accountNumberForSell == ""){
					showErrorMsg("请输入付款账户!");
					return true;
				}	
				//20180508由于内部户不能调用子账户接口查询，修改为调用资金账户信息查询接口
				if(_this.productPayMethodTypeForSell == "INNER_ACCOUNT"){
					var dataModel = {
						"cstAcct" : _this.accountNumberForSell
					};
					//调用资金账户信息查询接口
					_this.fundAcctInfmationQryForSell(dataModel);
					// 账户名称
					_this.accountNameForSell = _this.rsFundAcctInfmationQry.acctOfNm;
					// 账户开户行号/机构
					_this.paymentIssuerPartyIdForSell = _this.rsFundAcctInfmationQry.acctBusineOrg;
					$rootScope.$digest();
					//往账户名称及开户机构赋值
					//$rootScope.selectSubAccountNumberForSell("",_this.rsFundAcctInfmationQry.acctBusineOrg,_this.rsFundAcctInfmationQry.acctOfNm,"","","");
				}
				//20180509增加待销账信息查询
				else if(_this.productPayMethodTypeForSell == "STAY_CACLACC"){
			//		_this.forInformationEnquiryForSell( _this.accountNumberForSell,_this.wtofSrlNumForSell);
					_this.forInformationEnquiryForSell();
				}
				else{
					// 20180417修改为调用交易中心的查询子账户接口SubaccountNumberQuery
					// 20180729查询子账户信息接口修改为调用存款账户信息查询queryDepositAccountInformationInquiry接口
					var resData = userService.queryDepositAccountInformationInquiry("1",_this.accountNumberForSell);
					if(resData.Header.RetStatus == "S") {
						//查询返回账户信息
						var resDepositAccountInfo = resData.Body;
						//查询开户机构名
						_this.paymentIssuerPartyNameForSell = resData.orgNameCn;
						//调用订单支付工具赋值
						$rootScope.selectSubAccountNumberForSell(resDepositAccountInfo);	
					}else{
						showErrorMsg("查询子账户信息失败,流水号：" + resData.Header.GlobalSeq + "。" + resData.Header.RetMsg);
						return true;
					}					
				}			
				return true;
			};
			window.subaccountNumberQueryForSell = _this.subaccountNumberQueryForSell;
			
			//待销账序号触发方法
			$rootScope.forInformationEnquiryForSellEnter = function(event){	
				showErrorMsg("");
				setTimeout(function(){
					if (event.keyCode == 13) {
						_this.forInformationEnquiryForSell();
					}
				},300);
			}
			
			//待销账信息查询
			/*
			 * accountNumber: 账号
			 * wtofSrlNum: 待销账序号  
			 */
			_this.forInformationEnquiryForSell = function() {
				showErrorMsg("");	
				var accountNumber =  _this.accountNumberForSell;
				var wtofSrlNum = _this.wtofSrlNumForSell;
				if((typeof accountNumber == "undefined" || accountNumber == "") && ( typeof wtofSrlNum == "undefined" || wtofSrlNum == "")){
					showErrorMsg("请输入账号或者待销账序号!");
					return true;
				}	
				var dataModel = {};
				if(wtofSrlNum !== ""){
					dataModel = {
							"acctBusOrgNum" :  $rootScope.data.tellerInfo.orgId,
							"wtofSrlNum" : wtofSrlNum,
							"startNumOfPn" : "0",
							"findNumOfPn" : "10000"
					};
				}else if(accountNumber !== ""){
					dataModel = {
							"acctBusOrgNum" :  $rootScope.data.tellerInfo.orgId,
							"cstAcct" : accountNumber,
							"startNumOfPn" : "0",
							"findNumOfPn" : "10000"
					};
				} 	
				$.ajax({
					url : _contextPath_ + "/order/ForInformationEnquiry.jsoncall",
					type : "POST",
					dataType : "json",
					async : false,
					data : dataModel,
					success : function(data, textStatus) {
						if (data.Header.RetStatus == "S") {			
							_this.forInformationEnquiryList = data.Body.tblDaixzh;
							if(wtofSrlNum !== ""){	
								//根据待销张序号查询回来只有一笔待销账信息
								var forInformationEnquiry = _this.forInformationEnquiryList[0];								 
 								//* 待销账序号wtofSrlNum,支付账户户名 cstmNm,支付行号/机构acctBusOrgNum,待销账来源账号cstAcct
								// * 待销账来源账号子账户序号 subAccNum,待销账来源户名 cstmNm,待销账来源账户类型 cstAcctTp,钞汇标志 noteOfRmt
								_this.accountNumberForSell = forInformationEnquiry.wtofSrlNum;
								_this.accountNameForSell = forInformationEnquiry.cstmNm;
								_this.paymentIssuerPartyIdForSell = forInformationEnquiry.acctBusOrgNum;
								_this.drwAcctForSell = forInformationEnquiry.cstAcct;
								_this.subPyrAcctNumForSell = forInformationEnquiry.subAccNum;
								_this.drawNmForSell = forInformationEnquiry.cstmNm;
								_this.pymtAcctTpForSell = forInformationEnquiry.cstAcctTp;
								_this.cashOrRemitFlagForSell = forInformationEnquiry.noteOfRmt;	
								$rootScope.$digest();
							}else if(accountNumber !== ""){
								$rootScope.angModal({
									title : '选择待销账信息',
									width : ($("html").width() - 600),
									height : ($("html").height() - 280),
									url : '../customview/components/tabs/forinformation_enquiry_manage.html'
								});
								setTimeout(function() {
									$rootScope.queryForInformationEnquiryList(_this.forInformationEnquiryList);
								}, 1000);
							}							
						}else{
							showErrorMsg("请与业务集成平台联系,流水号：" + data.Header.GlobalSeq + "。" + data.Header.RetMsg);
							return true;
						}
					},
					error : function(XMLHttpRequest, textStatus, errorThrown) {
						showErrorMsg("请与业务集成平台联系，异常信息："+errorThrown);
						return true;
					}
				});
				return true;
			};
			window.forInformationEnquiryForSell = _this.forInformationEnquiryForSell;
			
			//费用待销账回车触发方法
			$rootScope.forInformationEnquiryFeeForSellEnter = function(event){	
				showErrorMsg("");
				setTimeout(function(){
					if (event.keyCode == 13) {
						_this.forInformationEnquiryFeeForSell();
					}
				},300);
			}			
			
			//费用支付待销账信息查询
			/*
			 * accountNumber: 账号
			 * wtofSrlNum: 待销账序号  
			 */
			_this.forInformationEnquiryFeeForSell = function() {
				showErrorMsg("");	
				var accountNumber =  _this.accountNumberFeeForSell;
				var wtofSrlNum = _this.wtofSrlNumFeeForSell;
				if((typeof accountNumber == "undefined" || accountNumber == "") && ( typeof wtofSrlNum == "undefined" || wtofSrlNum == "")){
					showErrorMsg("请输入账号或者待销账序号!");
					return true;
				}	
				var dataModel = {};
				if(wtofSrlNum !== ""){
					dataModel = {
							"acctBusOrgNum" :  $rootScope.data.tellerInfo.orgId,
							"wtofSrlNum" : wtofSrlNum,
							"startNumOfPn" : "0",
							"findNumOfPn" : "10000"
					};
				}else if(accountNumber !== ""){
					dataModel = {
							"acctBusOrgNum" :  $rootScope.data.tellerInfo.orgId,
							"cstAcct" : accountNumber,
							"startNumOfPn" : "0",
							"findNumOfPn" : "10000"
					};
				} 		
				$.ajax({
					url : _contextPath_ + "/order/ForInformationEnquiry.jsoncall",
					type : "POST",
					dataType : "json",
					async : false,
					data : dataModel,
					success : function(data, textStatus) {
						if (data.Header.RetStatus == "S") {			
							_this.forInformationEnquiryList = data.Body.tblDaixzh;
							if(wtofSrlNum !== ""){									
								//根据待销张序号查询回来只有一笔待销账信息
								var forInformationEnquiry = _this.forInformationEnquiryList[0];								 
 								//* 待销账序号wtofSrlNum,支付账户户名 cstmNm,支付行号/机构acctBusOrgNum,待销账来源账号cstAcct
								// * 待销账来源账号子账户序号 subAccNum,待销账来源户名 cstmNm,待销账来源账户类型 cstAcctTp,钞汇标志 noteOfRmt
								_this.accountNumberFeeForSell = forInformationEnquiry.wtofSrlNum;
								_this.accountNameFeeForSell = forInformationEnquiry.cstmNm;
								_this.paymentIssuerPartyIdFeeForSell = forInformationEnquiry.acctBusOrgNum;
								_this.drwAcctFeeForSell = forInformationEnquiry.cstAcct;
								_this.subPyrAcctNumFeeForSell = forInformationEnquiry.subAccNum;
								_this.drawNmFeeForSell = forInformationEnquiry.cstmNm;
								_this.pymtAcctTpFeeForSell = forInformationEnquiry.cstAcctTp;
								_this.cashOrRemitFlagFeeForSell = forInformationEnquiry.noteOfRmt;	
								$rootScope.$digest();
							}else if(accountNumber !== ""){
								$rootScope.angModal({
									title : '选择待销账信息',
									width : ($("html").width() - 600),
									height : ($("html").height() - 280),
									url : '../customview/components/tabs/forinformation_enquiry_manage.html'
								});
								setTimeout(function() {
									$rootScope.queryForInformationEnquiryList(_this.forInformationEnquiryList);
								}, 1000);
							}							
						}else{
							showErrorMsg("请与业务集成平台联系,流水号：" + data.Header.GlobalSeq + "。" + data.Header.RetMsg);
							return true;
						}
					},
					error : function(XMLHttpRequest, textStatus, errorThrown) {
						showErrorMsg("请与业务集成平台联系，异常信息："+errorThrown);
						return true;
					}
				});
				return true;
			};
			window.forInformationEnquiryForSell = _this.forInformationEnquiryForSell;			
			
			//资金账户信息查询
			_this.fundAcctInfmationQryForSell = function(dataModel) {
				showErrorMsg("");	
				$.ajax({
					url : _contextPath_ + "/order/FundAcctInfmationQry.jsoncall",
					type : "POST",
					dataType : "json",
					async : false,
					data : dataModel,
					success : function(data, textStatus) {
						if (data.Header.RetStatus == "S") {
							_this.rsFundAcctInfmationQry = data.Body;
						}else{
							showErrorMsg("请与业务集成平台联系,流水号：" + data.Header.GlobalSeq + "。" + data.Header.RetMsg);
							return true;
						}
					},
					error : function(XMLHttpRequest, textStatus, errorThrown) {
						showErrorMsg("请与业务集成平台联系，异常信息："+errorThrown);
						return true;
					}
				});
				return true;
			};
			
			/**
			 * 单位卡关联查询
			 * 参数： crdNum  卡号
			 * 参数： uitCrdQueryTp     子单位卡查询类型(0:客户,1:非客户,2:经办人)
			 */
			_this.UnitCardAssociationQueryForSell = function(crdNum,uitCrdQueryTp) {
				showErrorMsg("");	
				var dataModel = {
						"crdNum" : crdNum, 
						"uitCrdQueryTp" : "1", 
						"startNumOfPn" : "0", 
						"findNumOfPn" : "20"
				};
				$.ajax({
					url : _contextPath_ + "/order/UnitCardAssociationQuery.jsoncall",
					type : "POST",
					dataType : "json",
					async : false,
					data : dataModel,
					success : function(data, textStatus) {
						if (data.Header.RetStatus == "S") {
							_this.publicCstNumSell = data.Body.listnm[0].publicCstNum; //对公客户号
						}else{
							showErrorMsg("请与业务集成平台联系,流水号：" + data.Header.GlobalSeq + "。" + data.Header.RetMsg);
							return true;
						}
					},
					error : function(XMLHttpRequest, textStatus, errorThrown) {
						showErrorMsg("请与业务集成平台联系，异常信息："+errorThrown);
						return true;
					}
				});
				return true;
			};
			
			
			/**
			 * 单位卡关联查询
			 * 参数： crdNum  卡号
			 * 参数： uitCrdQueryTp     子单位卡查询类型(0:客户,1:非客户,2:经办人)
			 */
			_this.UnitCardAssociationQueryFeeForSell = function(crdNum,uitCrdQueryTp) {
				showErrorMsg("");	
				var dataModel = {
						"crdNum" : crdNum, 
						"uitCrdQueryTp" : "1", 
						"startNumOfPn" : "0", 
						"findNumOfPn" : "20"
				};
				$.ajax({
					url : _contextPath_ + "/order/UnitCardAssociationQuery.jsoncall",
					type : "POST",
					dataType : "json",
					async : false,
					data : dataModel,
					success : function(data, textStatus) {
						if (data.Header.RetStatus == "S") {
							_this.publicCstNumFeeSell = data.Body.listnm[0].publicCstNum; //对公客户号
						}else{
							showErrorMsg("请与业务集成平台联系,流水号：" + data.Header.GlobalSeq + "。" + data.Header.RetMsg);
							return true;
						}
					},
					error : function(XMLHttpRequest, textStatus, errorThrown) {
						showErrorMsg("请与业务集成平台联系，异常信息："+errorThrown);
						return true;
					}
				});
				return true;
			};
						
			//费用子账户序号回车触发方法
			$rootScope.subaccountNumberQueryFeeForSellEnter = function(event){				
				setTimeout(function(){
					if (event.keyCode == 13) {
						_this.selectSubAccountNumberFeeForSell();
					}
				},300);
			}

			/**
			 * 费用工具子账户序号查询
			 */
			_this.selectSubAccountNumberFeeForSell = function() {
				showErrorMsg("");	
				if(_this.accountNumberFeeForSell == undefined || _this.accountNumberFeeForSell == ""){
					showErrorMsg("请输入费用工具付款账户!");
					return true;
				}	
				//20180508由于内部户不能调用子账户接口查询，修改为调用资金账户信息查询接口
				if(_this.feePayMethodTypeNameForSell == "INNER_ACCOUNT"){
					var dataModel = {
						"cstAcct" : _this.accountNumberFeeForSell
					};
					//调用资金账户信息查询接口
					_this.fundAcctInfmationQryForSell(dataModel);
					// 账户名称
					_this.accountNameFeeForSell = _this.rsFundAcctInfmationQry.acctOfNm;
					// 账户开户行号/机构
					_this.paymentIssuerPartyIdFeeForSell = _this.rsFundAcctInfmationQry.acctBusineOrg;
					$rootScope.$digest();
					//往账户名称及开户机构赋值
					//$rootScope.selectSubAccountNumberFeeForSell("",_this.rsFundAcctInfmationQry.acctBusineOrg,_this.rsFundAcctInfmationQry.acctOfNm,"","","");
					}//20180509增加待销账信息查询
					else if(_this.feePayMethodTypeNameForSell == "STAY_CACLACC"){
						_this.forInformationEnquiryFeeForSell();
					}
					else{
					// 20180417修改为调用交易中心的查询子账户接口SubaccountNumberQuery
					// 20180729查询子账户信息接口修改为调用存款账户信息查询queryDepositAccountInformationInquiry接口
					var resData = userService.queryDepositAccountInformationInquiry("1", _this.accountNumberFeeForSell);
					if(resData.Header.RetStatus == "S") {
						//查询返回账户信息
						var resDepositAccountInfo = resData.Body;
						//调用订单支付工具赋值
						_this.paymentIssuerPartyNameForSell = resData.orgNameCn;
						$rootScope.selectSubAccountNumberFeeForSell(resDepositAccountInfo);	
					}else{
						showErrorMsg("查询子账户信息失败,流水号：" + resData.Header.GlobalSeq + "。" + resData.Header.RetMsg);
						return true;
					}
					
				}
				return true;
			};
			window.subaccountNumberQueryFeeForSell = _this.selectSubAccountNumberFeeForSell;
			
			/**
			 * 客户凭证查询
			 * 参数：
			 * 	1.客户账号
			 * 	2.凭证种类
			 * 	3.凭证批号
			 */
			_this.queryCustmerVoucher = function(custAccNum, vcherType, vcherNum, pageStart, pageSize){
				var trancode='160024';
				var arrTree= new Array();
				arrTree[arrTree.length]="custAccNum="+custAccNum;
				arrTree[arrTree.length]="vcherType="+vcherType; //凭证种类
				arrTree[arrTree.length]="vcherNum="+vcherNum; //凭证批号
				arrTree[arrTree.length]="startNumOfPn="+pageStart;
				arrTree[arrTree.length]="findNumOfPn="+pageSize;
				
				itemProductService.getQueryInfo(trancode,arrTree);
				var data = itemProductService.dataBack;
				
				try{
					var outList = JSON.parse(data.map.outList);
					return outList;
				}catch(e){
					showErrorMsg("查询客户凭证时，返回报文异常，请检查！");
					return;
				}
			}
			
			/**
			 * 设置选中的行号
			 *
			 **/
			$rootScope.selectBankInfoOrderForSell = function(BankId) {
				//设置行号
				_this.paymentPartyIdOBForSell = BankId;
				$rootScope.$digest();
			};
			
			/**
			 * 设置选中的子账户序号
			 */
			$rootScope.selectSubAccountNumberForSell = function(accountInfo) {
				// 子序号
				_this.subAccountNumberForSell = accountInfo.subAccNum;
				// 账户名称
				_this.accountNameForSell = accountInfo.acctOfNm;
				// 账户开户行号/机构
				_this.paymentIssuerPartyIdForSell = accountInfo.opInst;
				//账户钞汇标志
				_this.cashOrRemitFlagForSell = accountInfo.acctCurrExgFlg;
				//货币代号
				_this.ccyCdForSell = accountInfo.ccyCd;
				//凭证种类
				_this.certificateTypeForSell = accountInfo.vchrTp;
				//凭证号码
				_this.certificateIdForSell = accountInfo.vchrSrl;
				//凭证批次
				_this.certificateBatchForSell = accountInfo.vchrBtchNum;
				//20180926支付工具凭证种类初始化,以下支付工具不能用2022查询回来的凭证号码及凭证批次，必须置空
				if(_this.productPayMethodTypeForSell == "CORPORAT_EACCOUNT" || _this.productPayMethodTypeForSell == "CORPORATE_OTHER" || _this.productPayMethodTypeForSell == "INNER_ACCOUNT"){ //判断本行对公账号、本行对公其他及内部户
					_this.certificateTypeForSell = "099";
					_this.certificateIdForSell = "";
					_this.certificateBatchForSell = "";
				}else if(_this.productPayMethodTypeForSell == "CORPORATE_CARD"){ //判断单位结算卡
					_this.certificateTypeForSell = "062";
					_this.certificateIdForSell = "";
					_this.certificateBatchForSell = "";
				}else if(_this.productPayMethodTypeForSell == "CHECKING_TRANSFER"){ //转账支票
					_this.certificateTypes = [
						{value : "002", text : "转账支票"}
					];
					_this.certificateTypeForSell = "002";
					_this.certificateIdForSell = "";
					_this.certificateBatchForSell = "";
				}else if(_this.productPayMethodTypeForSell == "CHECKING_CASH"){ //现金支票
					_this.certificateTypes = [
						{value : "001", text : "现金支票"}
					];
					_this.certificateTypeForSell = "001";
					_this.certificateIdForSell = "";
					_this.certificateBatchForSell = "";
				}
				//证件类型
				_this.payerCertTypeForSell = accountInfo.crtfctTp;
				//证件号码 
				_this.payerCertNoForSell = accountInfo.idenNum;
				//授权类型
				_this.agreementTypeForSell = accountInfo.payCdtn;
				//20181024业务在QXGL20181023770696编号确认
				//如果授权类型为凭密码，页面显示名称：密码
				if(_this.agreementTypeForSell == "1"){
					_this.agreementContentNameForSell = "密码";
				}
				//客户号
				_this.custNoForSell = accountInfo.cstNum;
				//账户可用余额
				//_this.avlBalForSell = accountInfo.avlBal;
				//20180917核心任伟杰确认，可用余额修改为可用额度
				_this.avlBalForSell = accountInfo.avlCr;  
				//客户类型(20180530目前子账户查询返回的客户类型都为系统内类型，不是支付工具里所需要的系统内外客户)
				//_this.sysCustTypeForSell = _this.customerSubaccountNumberInfo.cstTp;
				//客户账号类型
				_this.cstAcctTpForSell = accountInfo.cstAcctTp;
				//20190402加入贷款提前还款，隐藏支付方式和密码，业务单号： I-20190329-0001 运营部孙玉梅，李俊玲已签字
				//以下交易代码免密
				//150004	贷款归还
				//150005	贷款特殊归还
				//150009	贴息归还
				//150006	贷款单期归还
				//150007	贷款核销归还
				//150103	贷款提前还款
				if(_this.tranCodeForSell == "150004" || _this.tranCodeForSell == "150005" || _this.tranCodeForSell == "150009" 
					|| _this.tranCodeForSell == "150006" || _this.tranCodeForSell == "150007" || _this.tranCodeForSell == "150103"){
					//如果是凭密码或者凭密码+证件，则隐藏免密
					if(_this.agreementTypeForSell == "1" || _this.agreementTypeForSell == "3"){
						_this.isShowAgreementTypeForSell = false;
						_this.isShowAgreementContentForSell = false;
					}					
				}
				//20190619 银行端确认缴款时，不校验只收不付，只付不收账户余额。
				if(_this.tranCodeForSell == "271011"){
					_this.acctOpaFlgForSell = accountInfo.acctOpaFlg;
					_this.acctOapFlgForSell = accountInfo.acctOapFlg;
				}
				$rootScope.$digest();
			};
			
			/**
			 * 费用支付工具设置选中的子账户序号
			 */
			$rootScope.selectSubAccountNumberFeeForSell = function(accountInfo) {
				// 子序号
				_this.subAccountNumberFeeForSell = accountInfo.subAccNum;
				// 账户名称
				_this.accountNameFeeForSell = accountInfo.acctOfNm;
				// 账户开户行号/机构
				_this.paymentIssuerPartyIdFeeForSell = accountInfo.opInst;
				//账户钞汇标志
				_this.cashOrRemitFlagFeeForSell = accountInfo.acctCurrExgFlg;
				//货币代号
				_this.ccyCdFeeForSell = accountInfo.ccyCd;
				//凭证种类
				_this.certificateTypeFeeForSell = accountInfo.vchrTp;
				//凭证号码
				_this.certificateIdFeeForSell = accountInfo.vchrSrl;
				//凭证批次
				_this.certificateBatchFeeForSell = accountInfo.vchrBtchNum;
				//20180926支付工具凭证种类初始化,以下支付工具不能用2022查询回来的凭证号码及凭证批次，必须置空
				if(_this.feePayMethodTypeNameForSell == "CORPORAT_EACCOUNT" || _this.feePayMethodTypeNameForSell == "CORPORATE_OTHER" || _this.feePayMethodTypeNameForSell == "INNER_ACCOUNT"){ //判断本行对公账号、本行对公其他及内部户
					_this.certificateTypeFeeForSell = "099";
					_this.certificateIdFeeForSell = "";
					_this.certificateBatchFeeForSell = "";
				}else if(_this.feePayMethodTypeNameForSell == "CORPORATE_CARD"){ //判断单位结算卡
					_this.certificateTypeFeeForSell = "062";
					_this.certificateIdFeeForSell = "";
					_this.certificateBatchFeeForSell = "";
				}else if(_this.feePayMethodTypeNameForSell == "CHECKING_TRANSFER"){ //转账支票
					_this.certificateTypes = [
						{value : "002", text : "转账支票"}
					];
					_this.certificateTypeFeeForSell = "002";
					_this.certificateIdFeeForSell = "";
					_this.certificateBatchFeeForSell = "";
				}else if(_this.feePayMethodTypeNameForSell == "CHECKING_CASH"){ //现金支票
					_this.certificateTypes = [
						{value : "001", text : "现金支票"}
					];
					_this.certificateTypeFeeForSell = "001";
					_this.certificateIdFeeForSell = "";
					_this.certificateBatchFeeForSell = "";
				}
				//证件类型
				_this.payerCertTypeFeeForSell = accountInfo.crtfctTp;
				//证件号码 
				_this.payerCertNoFeeForSell = accountInfo.idenNum;
				//授权类型
				_this.agreementTypeFeeForSell = accountInfo.payCdtn;
				//20181024业务在QXGL20181023770696编号确认
				//如果授权类型为凭密码，页面显示名称：密码
				if(_this.agreementTypeFeeForSell == "1"){
					_this.agreementContentNameFeeForSell = "密码";
				}
				//客户号
				_this.custNoFeeForSell = accountInfo.cstNum;
				//账户可用余额
				//_this.avlBalFeeForSell = accountInfo.avlBal;
				//20180917核心任伟杰确认，可用余额修改为可用额度
				_this.avlBalFeeForSell = accountInfo.avlCr;				
				//客户类型(20180530目前子账户查询返回的客户类型都为系统内类型，不是支付工具里所需要的系统内外客户)
				//_this.sysCustTypeFeeForSell = _this.customerSubaccountNumberFeeInfo.cstTp;
				//客户账号类型
				_this.cstAcctTpFeeForSell = accountInfo.cstAcctTp;
				
				//20190619 银行端确认缴款时，不校验只收不付，只付不收账户余额。
				if(_this.tranCodeForSell == "271011"){
					_this.acctOpaFlgFeeForSell = accountInfo.acctOpaFlg;
					_this.acctOapFlgFeeForSell = accountInfo.acctOapFlg;
				}
				$rootScope.$digest();
			};
			
			/**
			 *选中待销账信息
			 * 待销账序号wtofSrlNum,支付账户户名 accountName,支付行号/机构paymentPartyId,待销账来源账号drwAcct
			 * 待销账来源账号子账户序号 subPyrAcctNum,待销账来源户名 drawNm,待销账来源账户类型 pymtAcctTp,钞汇标志 noteOfRmt
			 */
			$rootScope.selectForInformationEnquiryForSell = function(payOrderType,wtofSrlNum,accountName,paymentPartyId,drwAcct,subPyrAcctNum,drawNm,pymtAcctTp,noteOfRmt) {
				showErrorMsg("");	
				if(payOrderType == "sellPaymentTools"){
					_this.accountNumberForSell = wtofSrlNum;
					_this.wtofSrlNumForSell = wtofSrlNum;
					_this.accountNameForSell = accountName;
					_this.paymentIssuerPartyIdForSell = paymentPartyId;
					_this.drwAcctForSell = drwAcct;
					_this.subPyrAcctNumForSell = subPyrAcctNum;
					_this.drawNmForSell = drawNm;
					_this.pymtAcctTpForSell = pymtAcctTp;
					_this.cashOrRemitFlagForSell = noteOfRmt;
				}else if(payOrderType == "feeForSellPaymentTools"){
					_this.accountNumberFeeForSell = wtofSrlNum;
					_this.wtofSrlNumFeeForSell = wtofSrlNum;
					_this.accountNameFeeForSell = accountName;
					_this.paymentIssuerPartyIdFeeForSell = paymentPartyId;
					_this.drwAcctFeeForSell = drwAcct;
					_this.subPyrAcctNumFeeForSell = subPyrAcctNum;
					_this.drawNmFeeForSell = drawNm;
					_this.pymtAcctTpFeeForSell = pymtAcctTp;
					_this.cashOrRemitFlagFeeForSell = noteOfRmt;
				}
				$rootScope.$digest();
			};			

			/**
			 * 产品支付工具验证（包含试算）
			 */
			_this.verifyProductPayInfoForSell = function() {	
				showErrorMsg("");	
				//20180926校验当支付工具为对公、对公其他、单位结算卡、现金支票、转账支票,凭证种类默认已经有值，凭证号码、凭证批次不为空
			 	if( _this.productPayMethodTypeForSell == "CHECKING_TRANSFER" || _this.productPayMethodTypeForSell == "CHECKING_CASH"){ 
			 		if(_this.certificateIdForSell == ""){
						showErrorMsg("该支付工具凭证号码不能为空，请输入！");
						return;
					}
					if(_this.certificateBatchForSell == ""){
						showErrorMsg("该支付工具凭证批次不能为空，请输入！");
						return;
					}
					//校验客户凭证
			 		var outList = _this.queryCustmerVoucher(_this.accountNumberForSell, _this.certificateTypeForSell, _this.certificateBatchForSell, 0 ,20);
			 		var isFlag = false;
			 		var vcherStatu = "";
			 		var pageNumber = 0;
			 		while(outList.length>0){
						for(var i=0; i<outList.length; i++){
							if(outList[i].vchserSeq == _this.certificateIdForSell){
								isFlag = true;
								vcherStatu = outList[i].vcherStatu;
								break;
							}
						}
						if(isFlag){
							break;
						}
						pageNumber = pageNumber + 1;
						outList = _this.queryCustmerVoucher(_this.accountNumberForSell, _this.certificateTypeForSell, _this.certificateBatchForSell, pageNumber*20, 20)
			 		}
			 		if(!isFlag){
						showErrorMsg("订单支付工具录入的凭证未出售给该客户，请重新输入！");
						return;
					}else {
						if(vcherStatu != "0"){
							showErrorMsg("订单支付工具录入的凭证状态为："+$filter("certificateStatusForDesc")(vcherStatu)+" ,必须为正常状态。");
							return;
						}
					}
				}	
			 	//20181026凭证种类为099其他时，不需校验凭证号码、凭证批次
			 	if(_this.productPayMethodTypeForSell == "CORPORATE_CARD" || _this.productPayMethodTypeForSell == "CORPORAT_EACCOUNT" || _this.productPayMethodTypeForSell == "CORPORATE_OTHER"){
			 		if(_this.certificateTypeForSell !== "099"){
			 			if(_this.certificateIdForSell == ""){
							showErrorMsg("该支付工具凭证号码不能为空，请输入！");
							return;
						}
						if(_this.certificateBatchForSell == ""){
							showErrorMsg("该支付工具凭证批次不能为空，请输入！");
							return;
						}
						//校验客户凭证
				 		var outList = _this.queryCustmerVoucher(_this.accountNumberForSell, _this.certificateTypeForSell, _this.certificateBatchForSell, 0 ,20);
				 		var isFlag = false;
				 		var vcherStatu = "";
				 		var pageNumber = 0;
				 		while(outList.length>0){
							for(var i=0; i<outList.length; i++){
								if(outList[i].vchserSeq == _this.certificateIdForSell){
									isFlag = true;
									vcherStatu = outList[i].vcherStatu;
									break;
								}
							}
							if(isFlag){
								break;
							}
							pageNumber = pageNumber + 1;
							outList = _this.queryCustmerVoucher(_this.accountNumberForSell, _this.certificateTypeForSell, _this.certificateBatchForSell, pageNumber*20, 20)
				 		}
				 		if(!isFlag){
							showErrorMsg("订单支付工具录入的凭证未出售给该客户，请重新输入！");
							return;
						}else {
							if(vcherStatu != "0"){
								showErrorMsg("订单支付工具录入的凭证状态为："+$filter("certificateStatusForDesc")(vcherStatu)+" ,必须为正常状态。");
								return;
							}
						}
			 		}
			 	}
				//20180629如果为待销账或者内部户不验证是否为本客户账号及账户余额
				if(_this.productPayMethodTypeForSell !== "STAY_CACLACC" && _this.productPayMethodTypeForSell !== "INNER_ACCOUNT"){						
					//如果支付工具为单位结算卡时,则需要通过单位卡关联查询对公客户号
					if(_this.productPayMethodTypeForSell == "CORPORATE_CARD"){
						_this.UnitCardAssociationQueryForSell(_this.accountNumberForSell,"1");
						if(_this.publicCstNumSell !== $rootScope.data.customerModel.custNo){
							showErrorMsg("订单支付工具的单位结算卡不属于为本客户账号，请重新输入！");
							return;
						}
					}else if(_this.custNoForSell !== $rootScope.data.customerModel.custNo){ //不是单位结算卡，通过子账户查询确认是否为本客户账号
						showErrorMsg("订单支付工具的支付账号不是为本客户账号，请重新输入！");
						return;
					}					
					//20180523校验账户可用余额	
					//20180729账户可用余额通过存款账户信息查询接口已查出
					//_this.accountAmountInformationQueryForSell(_this.accountNumberForSell,_this.subAccountNumberForSell,_this.lbyTpNoForSell,_this.cashOrRemitFlagForSell,_this.ccyCdForSell);
					//如果账户可用余额订单总金额减去促销总金额 

					if(_this.avlBalForSell < _this.orderPayTotalAmtForSell){
						if(_this.tranCodeForSell == "271011"){//0否1是
							////20190619 银行端确认缴款时，不校验只收不付，只付不收账户余额。
						}else{
							showErrorMsg("该账户可用余额："+_this.avlBalForSell+",不足以支付订单金额:"+_this.orderPayTotalAmtForSell+"，请选择其他支付方式!");
							return ;
						}
					}
				}				
				// 验密码
				// _this.verifyProductPaymentToolPassword();	
				//20180619理财产品校验账号是否签约
				var orderItem = {};
				for(var i=0;i<_this.orderItemsInitForSell.length;i++){
					orderItem = _this.orderItemsInitForSell[i];
					//如果产品线id为L3，则为理财产品，需要校验账号是否已签约
					if(orderItem.productLineId == "L3"){
						//调用查询理财签约规则信息接口
						_this.selectAgreementFinancialInfoForSell(_this.accountNumberForSell);
						//判断该账号是否已签约
						if(typeof _this.financialInfoSasAgreementForSell  !== "undefined" && _this.financialInfoSasAgreementForSell == "0"){
							showErrorMsg("订单支付工具输入的账号："+_this.accountNumberForSell+"未做理财签约，请重新输入账号！");
							_this.financialInfoSasAgreementForSell = "";
							return;
						}
					}					
				}	
				//授权类型
				//20180809凭协议,授权类型为8
				if(_this.agreementTypeForSell == "4" || _this.agreementTypeForSell == "5" || _this.agreementTypeForSell == "a" || _this.agreementTypeForSell == "8"){
//					//订单支付工具电子验印
					_this.isNeedSealVerifyStampServiceForSell();					
				}
				//授权类型凭密码
				//20180809凭硬件加支付密码,授权类型为a
				//20180910凭证件+密码,授权类型为3
				//20181013凭支付密码不需要调用加密
				//_this.agreementTypeForSell == "1";
				//if(_this.agreementTypeForSell == "1" || _this.agreementTypeForSell == "3" || _this.agreementTypeForSell == "6" || _this.agreementTypeForSell == "a"){
				//20190402加入贷款提前还款，隐藏支付方式和密码，业务单号： I-20190329-0001 运营部孙玉梅，李俊玲已签字
				//以下交易代码免密
				//150004	贷款归还
				//150005	贷款特殊归还
				//150009	贴息归还
				//150006	贷款单期归还
				//150007	贷款核销归还
				//150103	贷款提前还款
				if(_this.tranCodeForSell != "150004" && _this.tranCodeForSell != "150005" && _this.tranCodeForSell != "150009" 
					&& _this.tranCodeForSell != "150006" && _this.tranCodeForSell != "150007" && _this.tranCodeForSell != "150103"){	
					if(_this.agreementTypeForSell == "1" || _this.agreementTypeForSell == "3"){
						if(typeof top.windowexternal !== "undefined" ){
							var inCard = ""; //截取账号12位
							var inCardNo = _this.accountNumberForSell;
							//账号长度
					    	var len = inCardNo.length;
					    	if(len > 14){
					    		//截取倒数第3位开始往前12位卡号
					    		inCard = inCardNo.substring(len-13,len-1);
					    	}else{
					    		alert("账号长度不正确，请重新输入！");
					    		return;
					    	}
					    	//是否为开发模式
					    	var isdeveloper = _this.SysparamForSell.isdeveloper;
					 //   	alert("isdeveloper=="+isdeveloper);
					    	var rtnPass = "";
					    	var isdev = ""; //开发模式转换标志(1:开发模式，0：非开发模式)
					    	if(isdeveloper){ //开发模式
					    		isdev = "1";
					 // 		    alert("开发模式");
					//    		alert(_this.agreementContentForSell+" | "+inCard+" | "+isdev+" |0");
					    		//如果开发模式,第一个参数为协议内容					    	
					    		rtnPass = top.windowexternal.getEncryptPIN(_this.agreementContentForSell,inCard,isdev,"0");
					    	}else{ //非开发模式
					    		isdev = "0";
					  //  		alert("非开发模式");
					  //  		alert(" | "+inCard+" | "+isdev+" |0");
					    		//如果非开发模式,第一个参数为空
					    		rtnPass = top.windowexternal.getEncryptPIN("",inCard,isdev,"0");
					    	}				    	
							//转PIN码
					   // 	alert(rtnPass+" | "+inCardNo+" | "+inCardNo);
							var orderPwdForSell = userService.passwordTransPinForOrder(rtnPass,inCardNo,inCardNo);	
						//	alert("支付工具转PIN码===="+orderPwdForSell);
						//	alert("返回密码======================"+orderPwdForSell);
							if(orderPwdForSell.dstPinBlock !== "" && orderPwdForSell.dstPinBlock !== "undefined"){
								//返回密文
								_this.agreementContentForSell = orderPwdForSell.dstPinBlock;
								//20180917加入密码校验外围(订单支付工具)		
								var passwordCheckRes = userService.passwordCheckForOrder(_this.cstAcctTpForSell,_this.accountNumberForSell,"2",_this.agreementContentForSell);
								//如果返回的报文状态为不成功，则验密失败
								if(passwordCheckRes.Header.RetStatus !== "S"){			
				        	    	showErrorMsg("订单支付工具密码校验外围失败,请联系业务集成平台,交易流水号："+passwordCheckRes.Header.GlobalSeq+",错误信息："+passwordCheckRes.Header.RetMsg);
				        	    	return;
				        	    }
							}						
						}
				}
				
					
				}
					
			//	if(_this.isCalculateShoppingCartFeeForSellFlag){
					// 费用试算
					_this.calculateShoppingCartFeeForSell();
					// 20180411费用试算时如果费用金额为0, 也不需要客户选择费用的支付工具，优惠试算、添加优惠码
					// 调用促销试算接口
				 	_this.calculateShoppingCartPromoForSell();
			//	}			 	
				_this.isVerifyProductPayTools = true;
			};
			
			//订单支付工具弹出是否需要验印确认框
			_this.isNeedSealVerifyStampServiceForSell = function() {
				$.confirm({
					title : '提示',
					content : '<h5 style="text-align: center">是否需要进行电子验印?</h5>',
					buttons : {
						confirm : {
							text : '需要',
							btnClass : 'btn btn-blue-ok',
							keys : [ 'enter' ],
							action : function() {
								if(typeof top.windowexternal !== "undefined" ){
									//调用验印
									_this.sealVerifyStampServiceForSell(_this.accountNumberForSell,_this.chequeNoteDateForSell,_this.certificateIdForSell,_this.certificateTypeForSell,_this.orderPayTotalAmtForSell,"0");
									if(_this.resSealVerifyPayForSell == "0"){
										showErrorMsg("订单支付验印不通过");
										return;
									}
								}	
							}
						},
						cancel : {
							text : '不需要',
							keys : [ 'esc' ],
							btnClass : 'btn btn-blue-cancal',
							action : function() {								
							}
						}
					}
				});
			};
			
			/**
			 * 费用支付工具验证
			 */
			_this.verifyFeePayInfoForSell = function() {
				//20180926校验当费用支付工具为对公、对公其他、单位结算卡、现金支票、转账支票,凭证种类默认已经有值，凭证号码、凭证批次不为空
			 	if(_this.feePayMethodTypeNameForSell == "CHECKING_TRANSFER" || _this.feePayMethodTypeNameForSell == "CHECKING_CASH"){ 
					if(_this.certificateTypeFeeForSell == ""){
						showErrorMsg("该费用支付工具凭证号码不能为空，请输入！");
						return;
					}
					if(_this.certificateBatchFeeForSell == ""){
						showErrorMsg("该费用支付工具凭证批次不能为空，请输入！");
						return;
					}
					//校验客户凭证
			 		var outList = _this.queryCustmerVoucher(_this.accountNumberFeeForSell, _this.certificateTypeFeeForSell, _this.certificateBatchFeeForSell, 0 ,20);
			 		var isFlag = false;
			 		var vcherStatu = "";
			 		var pageNumber = 0;
			 		while(outList.length>0){
						for(var i=0; i<outList.length; i++){
							if(outList[i].vchserSeq == _this.certificateIdFeeForSell){
								isFlag = true;
								vcherStatu = outList[i].vcherStatu;
								break;
							}
						}
						if(isFlag){
							break;
						}
						pageNumber = pageNumber + 1;
						outList = _this.queryCustmerVoucher(_this.accountNumberFeeForSell, _this.certificateTypeFeeForSell, _this.certificateBatchFeeForSell, pageNumber*20, 20);
			 		}
					if(!isFlag){
						showErrorMsg("订单支付工具录入的凭证未出售给该客户，请重新输入！");
						return;
					}else {
						if(vcherStatu != "0"){
							showErrorMsg("订单支付工具录入的凭证状态为："+$filter("certificateStatusForDesc")(vcherStatu)+" ,必须为正常状态。");
							return;
						}
					}
				}
			 	//20181026凭证种类为099其他时，不需校验凭证号码、凭证批次
			 	if(_this.feePayMethodTypeNameForSell == "CORPORATE_CARD"  || _this.feePayMethodTypeNameForSell == "CORPORAT_EACCOUNT" || _this.feePayMethodTypeNameForSell == "CORPORATE_OTHER"){
			 		if(_this.certificateTypeFeeForSell !== "099"){
			 			if(_this.certificateTypeFeeForSell == ""){
							showErrorMsg("该费用支付工具凭证号码不能为空，请输入！");
							return;
						}
						if(_this.certificateBatchFeeForSell == ""){
							showErrorMsg("该费用支付工具凭证批次不能为空，请输入！");
							return;
						}
				 		
						//校验客户凭证
				 		var outList = _this.queryCustmerVoucher(_this.accountNumberFeeForSell, _this.certificateTypeFeeForSell, _this.certificateBatchFeeForSell, 0 ,20);
				 		var isFlag = false;
				 		var vcherStatu = "";
				 		var pageNumber = 0;
				 		while(outList.length>0){
							for(var i=0; i<outList.length; i++){
								if(outList[i].vchserSeq == _this.certificateIdFeeForSell){
									isFlag = true;
									vcherStatu = outList[i].vcherStatu;
									break;
								}
							}
							if(isFlag){
								break;
							}
							pageNumber = pageNumber + 1;
							outList = _this.queryCustmerVoucher(_this.accountNumberFeeForSell, _this.certificateTypeFeeForSell, _this.certificateBatchFeeForSell, pageNumber*20, 20);
				 		}
						if(!isFlag){
							showErrorMsg("订单支付工具录入的凭证未出售给该客户，请重新输入！");
							return;
						}else {
							if(vcherStatu != "0"){
								showErrorMsg("订单支付工具录入的凭证状态为："+$filter("certificateStatusForDesc")(vcherStatu)+" ,必须为正常状态。");
								return;
							}
						}
			 		}
			 	}
				//20180629如果为待销账或者内部户不验证是否为本客户账号及账户余额
				if(_this.feePayMethodTypeNameForSell !== "STAY_CACLACC" && _this.feePayMethodTypeNameForSell !== "INNER_ACCOUNT"){
					//如果支付工具为单位结算卡时,则需要通过单位卡关联查询对公客户号
					if(_this.feePayMethodTypeNameForSell == "CORPORATE_CARD"){
						_this.UnitCardAssociationQueryFeeForSell(_this.accountNumberFeeForSell,"1");
						if(_this.publicCstNumFeeSell !== $rootScope.data.customerModel.custNo){
							showErrorMsg("订单费用支付工具的单位结算卡不属于为本客户账号，请重新输入！");
							return;
						}
					}else if(_this.custNoFeeForSell !== $rootScope.data.customerModel.custNo){ //验证费用支付工具输入账号是否为本客户的账号
						showErrorMsg("费用支付工具的支付账号不是为本客户账号，请重新输入！");
						return;
					}
					//20180523查询账户可用余额	
					//20180729账户可用余额通过存款账户信息查询接口已查出
					//_this.accountAmountInformationQueryForSell(_this.accountNumberFeeForSell,_this.subAccountNumberFeeForSell,_this.lbyTpNoFeeForSell,_this.cashOrRemitFlagFeeForSell,_this.ccyCdFeeForSell);	
					//判断是否用同一个账号支付订单（校验账号+子序号+负债账号）
					if((_this.accountNumberFeeForSell == _this.accountNumberForSell) && (_this.subAccountNumberFeeForSell == _this.subAccountNumberForSell)
							&& (_this.lbyTpNoFeeForSell == _this.lbyTpNoForSell)){
						//获取订单总金额（包括促销、费用金额）
						var payAllAmt = parseFloat(_this.sumAdjustmentsAmtForSell) + parseFloat(_this.orderPayTotalAmtForSell);
						payAllAmt = payAllAmt.toFixed(2);
						//判断账户余额与订单总金额（减去促销金额）、费用金额
						if(_this.avlBalFeeForSell < payAllAmt){
							if(_this.tranCodeForSell == "271011"){//0否1是
								////20190619 银行端确认缴款时，不校验只收不付，只付不收账户余额。
							}else{
								showErrorMsg("该账户可用余额："+_this.avlBalFeeForSell+",不足以支付订单金额(包括费用金额):"+payAllAmt+"，请选择其他支付方式!");
								return ;
							}
						}
					}else{
						//判断账户可用余额是否够订单总金额减去促销总金额
						if(_this.avlBalFeeForSell < _this.sumAdjustmentsAmtForSell){
							if(_this.tranCodeForSell == "271011"){//0否1是
								////20190619 银行端确认缴款时，不校验只收不付，只付不收账户余额。
							}else{
								showErrorMsg("该账户可用余额："+_this.avlBalForSell+",不足以支付订单金额:"+_this.sumAdjustmentsAmtForSell+"，请选择其他支付方式!");
								return ;
							}
						}
					}
				}				
				// 验密码
				// _this.verifyProductPaymentToolPassword();				
						
				//授权类型
				if(_this.agreementTypeFeeForSell == "4" || _this.agreementTypeFeeForSell == "5"  || _this.agreementTypeFeeForSell == "a" || _this.agreementTypeFeeForSell == "8"){
					//调用电子验印控件
					_this.isNeedSealVerifyStampServiceFeeForSell();					
				}
				//授权类型凭密码
				//20180910凭证件+密码,授权类型为3
				//20181013凭支付密码不需要调用加密
				//if(_this.agreementTypeFeeForSell == "1" || _this.agreementTypeFeeForSell == "3" || _this.agreementTypeFeeForSell == "6" || _this.agreementTypeFeeForSell == "a"){
				if(_this.agreementTypeFeeForSell == "1" || _this.agreementTypeFeeForSell == "3" ){
					if(typeof top.windowexternal !== "undefined" ){
	
						var inCard = ""; //截取账号12位
						var inCardNo = _this.accountNumberFeeForSell;
				//		alert("卡号=========================="+inCardNo);
						//账号长度
				    	var len = inCardNo.length;
				    	if(len > 14){
				    		//截取倒数第3位开始往前12位卡号
				    		inCard = inCardNo.substring(len-13,len-1);
				    	}else{
				    		alert("账号长度不正确，请重新输入！");
				    		return;
				    	}
				    	//是否为开发模式
				    	var isdeveloper = _this.SysparamForSell.isdeveloper;
				    	var rtnPass = "";
				    	var isdev = ""; //开发模式转换标志(1:开发模式，0：非开发模式)
				    	if(isdeveloper){ //开发模式
				    		isdev = "1";
				    		//如果开发模式,第一个参数为协议内容					    	
				    		rtnPass = top.windowexternal.getEncryptPIN(_this.agreementContentFeeForSell,inCard,isdev,"0");
				    	}else{ //非开发模式
				    		isdev = "0";
				    		//如果非开发模式,第一个参数为空
				    		rtnPass = top.windowexternal.getEncryptPIN("",inCard,isdev,"0");
				    	}				    	
				//		alert("算密码=="+rtnPass);
						//转PIN码
						var orderPwdFeeForSell = userService.passwordTransPinForOrder(rtnPass,inCardNo,inCardNo);	
				//		alert("费用支付工具转PIN码===="+orderPwdFeeForSell);
						//返回密文
				//		alert("返回密文======"+orderPwdFeeForSell);
						if(orderPwdFeeForSell.dstPinBlock !== "" && orderPwdFeeForSell.dstPinBlock !== "undefined"){
							_this.agreementContentFeeForSell = orderPwdFeeForSell.dstPinBlock;
							//20180917加入密码校验外围(订单费用支付工具)		
							var feePasswordCheckFlag = userService.passwordCheckForOrder(_this.cstAcctTpFeeForSell,_this.accountNumberFeeForSell,"2",_this.agreementContentFeeForSell);
							//如果返回的报文状态为不成功，则验密失败
							if(feePasswordCheckFlag.Header.RetStatus !== "S"){
								showErrorMsg("订单费用支付工具密码校验外围失败,请联系业务集成平台,交易流水号："+feePasswordCheckFlag.Header.GlobalSeq+",错误信息："+feePasswordCheckFlag.Header.RetMsg);
			        	    	return;
			        	    }
						}
					}
										
				}				
											 	
				_this.isVerifyFeePayTools = true;
			};
			
			
			//费用支付工具弹出是否需要验印确认框
			_this.isNeedSealVerifyStampServiceFeeForSell = function() {
				$.confirm({
					title : '提示',
					content : '<h5 style="text-align: center">是否需要进行电子验印?</h5>',
					buttons : {
						confirm : {
							text : '需要',
							btnClass : 'btn btn-blue-ok',
							keys : [ 'enter' ],
							action : function() {
								if(typeof top.windowexternal !== "undefined" ){
									//调用验印
								_this.sealVerifyStampServiceForSell(_this.accountNumberFeeForSell,_this.chequeNoteDateFeeForSell,_this.certificateIdFeeForSell,_this.certificateTypeFeeForSell,_this.sumAdjustmentsAmtForSell,"1");
									if(_this.resSealVerifyPayFeeForSell == "0"){
										showErrorMsg("费用支付验印不通过");
										return;
									}
								}
							}
						},
						cancel : {
							text : '不需要',
							keys : [ 'esc' ],
							btnClass : 'btn btn-blue-cancal',
							action : function() {								
							}
						}
					}
				});
			};
			
			/**
			 * 验印
			 * 参数： accountNumber  账号
			 * 参数： chequeNoteDate  出票日期
			 * 参数： vchno  凭证号
			 * 参数： certificateType  凭证类型
			 * 参数： amount  金额
			 * 参数： flag 0:订单支付，1：费用支付
			 */
			_this.sealVerifyStampServiceForSell = function(accountNumber,chequeNoteDate,vchno,certificateTypeSel,amount,flag) {			
				//验印结果
				var resSealVerifyForSell = "";
			//	alert("certificateType=============="+certificateTypeSel);
				//如果出票日期为空，取系统日期
				if(chequeNoteDate == ""){					
			//		chequeNoteDate = $filter('date')(new Date() , 'yyyyMMdd');//系统日期,yyyymmdd
					chequeNoteDate = $rootScope.data.tellerInfo.tradeDate;//核心日期,yyyymmdd
				}
				//凭证号
				var vchno = vchno;
				if(typeof vchno == "undefined" || vchno == ""){
					vchno = "999";
				}
				var vchtype_name = "";//凭证名称
				for(var i=0;i<_this.certificateTypes.length;i++){
					var certificateType = _this.certificateTypes[i];
					if(certificateType.value == certificateTypeSel){
						vchtype_name = certificateType.text;
					}					
				}
			//	alert("interfaceServerUrl_SIT=============="+interfaceServerUrl_SIT);
			//	alert("accountNumber================="+accountNumber);
			//	alert("vchno================="+vchno);
			//	alert("chequeNoteDate============="+$filter('date')(new Date() , 'yyyyMMdd'));
				//验印请求入口参数
				var sealVerifyInputData = {
						"accno" : accountNumber,
						"vchno" : vchno,
						"amount" : amount+"",
						"vchdate" : chequeNoteDate,
			//			"vchdate" : "20171127", //系统时间与测试服务器时间不一致，故测试时填上该值
						"vchtype_code" : certificateTypeSel, //凭证类型
						"vchtype_name" : vchtype_name,
						"clkno" : $rootScope.data.tellerInfo.userId,
						"depno" : $rootScope.data.tellerInfo.orgId,
						"interfaceUrl" : _this.interfaceServerUrl 
				};	
				//alert("sealVerifyInputData================="+sealVerifyInputData);
				var sealVerifyInputBody = {
						"body" : sealVerifyInputData
				};
				sealVerifyInputBody = JSON.stringify(sealVerifyInputBody);
				var sealVerifyOutputData = top.windowexternal.SealVerify(sealVerifyInputBody);
				var resJsonObj = $.parseJSON(sealVerifyOutputData);		
				var sysidres = resJsonObj.sysidres; //系统结果,1 系统通过  0-系统不过 2-系统可疑
				var manidres = resJsonObj.manidres;  //人工结果,1 人工通过  0-人工不过 
				var syssptres = resJsonObj.sysstpres;  //系统结果串--每个章的系统结果串
				var manstpres = resJsonObj.manstpres; //人工结果串--每个章的人工结果串
//				alert("sysidres=="+resJsonObj.sysidres);
//				alert("manidres=="+resJsonObj.manidres);
//				alert("syssptres=="+resJsonObj.syssptres);
//				alert("manstpres=="+resJsonObj.manstpres);
				//系统自动通过
				if(sysidres == "1" && manidres == "1"){
					resSealVerifyForSell = "1";
				}else if(sysidres !== "1" && manidres == "1" ){ //人工通过
					resSealVerifyForSell = "1";
				}
//				else if(manidres ！= "1"){ // 验印不过
//					return false;
//				}
				else{
					resSealVerifyForSell = "0";
				}	
		//		alert("resSealVerifyForSell========="+resSealVerifyForSell);
				if(flag == "0"){
					_this.resSealVerifyPayForSell = resSealVerifyForSell;
				}else if(flag == "1"){
					_this.resSealVerifyPayFeeForSell = resSealVerifyForSell;
				}
		//		alert("支付验印结果====="+_this.resSealVerifyPayForSell);
		//		alert("费用验印结果======"+_this.resSealVerifyPayFeeForSell);
			};
			
			
			
			/**
			 * 控制订单重复提交
			 */
			_this.orderControlSubmitClickForSell = function() {
				showErrorMsg("");	
				//黑名单角色初始化
				var LRstr ="";
				//黑名单岗位初始化
				var LPstr ="";
				var ret;
		        $.ajax({
		            url:_contextPath_+"/order/rolePosts.jsoncall",
		            type:"POST",
		            async: false,
		            data:{},
		            success:function(data, textStatus){
	            		ret = data;
	            		LRstr = ret.localAuthTellerRoles
	            		LPstr = ret.localAuthTellerPost
		            },
		            error:function(XMLHttpRequest, textStatus, errorThrown){
			            ret = {};
		                showErrorMsg(XMLHttpRequest.responseText);
		            }
		        });
				
				
				//获取登录柜员号
    			var userInfoStr = sessionStorage.getItem('userInfo');
    			var userInfoEntity = JSON.parse(userInfoStr);
    			var tellerNo = userInfoEntity.userId;
    			var sessionOrgId = userInfoEntity.orgId;
    			
				if(authSellFlag == true){
					layer.open({
						title: '授权',
						type: 2,
						offset: 'rb',
						fixed: true, //不固定
						area: ['450px', '300px'],
						content: _contextPath_ + '/reviewAuth/auth_customer_iframe.jsp?tellerNo='+tellerNo+'&_contextPath_='+_contextPath_+'&sessionOrgId='+sessionOrgId+'&LRstr='+LRstr+'&LPstr='+LPstr,
						shade: 0, //不显示遮罩
						end: function(){
							_this.orderSubmitClickForSell_layera(authLayerFlag);
						},
							success: function(layero, index){
						    var body = layer.getChildFrame('body', index);
						    body.find('span')[0].innerHTML ="销售订单手续费减免增加【无条件授权】";
						  }
					});
				}else{
					_this.orderSubmitClickForSell_layerb();
				}
				
			}
			
			_this.orderSubmitClickForSell_layera = function(authLayerFlag){
				if(authLayerFlag){
					if(_this.commitOrderSubmitBtnForSell == true){					
						_this.orderSubmitClickForSell();
					}
				}
			}
			
			_this.orderSubmitClickForSell_layerb = function(){
				if(_this.commitOrderSubmitBtnForSell == true){					
					_this.orderSubmitClickForSell();
				}
			}
			
			
			
			
			
//			/**
//			 * 控制订单重复提交（原黄远乐留下）
//			 */
//			_this.orderControlSubmitClickForSell = function() {
//				if(_this.commitOrderSubmitBtnForSell == true){					
//					_this.orderSubmitClickForSell();
//				}
//			}

			
			/**
			 * 销售订单 结算提交
			 */
			_this.orderSubmitClickForSell = function() {
				showErrorMsg("");	
				//如果订单金额为0，则不需要核对产品支付工具
				if(_this.orderPayTotalAmtForSell>0){
					if (_this.productPayMethodTypeForSell == "") {
						showErrorMsg("请选择支付工具！");
						return;
					}
					if (_this.isVerifyProductPayTools == false) {
						showErrorMsg("请验证产品的支付信息！");
						return;
					}
				}
				//判断费用支付工具
				if (_this.isShowFeePayToolsForSell) {
					if (_this.feePayMethodTypeNameForSell == undefined || _this.feePayMethodTypeNameForSell == "") {
						showErrorMsg("请选择费用支付工具！");
						return;
					}
					if (_this.isVerifyFeePayTools == false) {
						showErrorMsg("请验证费用的支付信息！");
						return;
					}
				}
				//20180612加入授权类型必输判断
				if(_this.isShowAgreementTypeForSell == true && _this.agreementTypeForSell == ""){
					showErrorMsg("支付工具中授权类型为必输项，请选择输入！");
					return;
				}
				if(_this.isShowFeeAgreementTypeForSell == true && _this.agreementTypeFeeForSell == ""){
					showErrorMsg("费用支付工具中授权类型为必输项，请选择输入！");
					return;
				}
								
				//20180809授权类型为凭密码时，授权内容不能为空
				//20190403
				//以下交易代码免密
				//150004	贷款归还
				//150005	贷款特殊归还
				//150009	贴息归还
				//150006	贷款单期归还
				//150007	贷款核销归还
				//150103	贷款提前还款
				if(_this.tranCodeForSell != "150004" && _this.tranCodeForSell != "150005" && _this.tranCodeForSell != "150009" 
					&& _this.tranCodeForSell != "150006" && _this.tranCodeForSell != "150007" && _this.tranCodeForSell != "150103"){
					if(_this.agreementTypeForSell == "1" || _this.agreementTypeForSell == "3" || _this.agreementTypeForSell == "6" || _this.agreementTypeForSell == "a"){
						 if(_this.agreementContentForSell == ""){
							 showErrorMsg("订单支付工具中授权类型为凭密码，授权协议内容不能为空，请重新输入！");
							 return;
						 }	
					}
				}
				
				if(_this.agreementTypeFeeForSell == "1" || _this.agreementTypeFeeForSell == "3" || _this.agreementTypeFeeForSell == "6" || _this.agreementTypeFeeForSell == "a"){
					if(_this.agreementContentFeeForSell == ""){
						showErrorMsg("订单费用支付工具中授权类型为凭密码，授权协议内容不能为空，请重新输入！");
						return;
					}
				}

				if(_this.agreementTypeForSell == "4" || _this.agreementTypeForSell == "5" || _this.agreementTypeForSell == "a" || _this.agreementTypeForSell == "8"){
					if(_this.resSealVerifyPayForSell == "0"){
						showErrorMsg("订单支付工具验印不通过，请重新验印");
						return;
					}
				}

				if(_this.agreementTypeFeeForSell == "4" || _this.agreementTypeFeeForSell == "5"  || _this.agreementTypeFeeForSell == "a" || _this.agreementTypeFeeForSell == "8"){
					if(_this.resSealVerifyPayFeeForSell == "0"){
						showErrorMsg("订单费用支付工具验印不通过，请重新验印");
						return;
					}
				}
				
				//支付工具验证他行账号验证必输项
				if(_this.productPayMethodTypeForSell == "PERSONAL_ACCOUNT_OB" || _this.productPayMethodTypeForSell == "CORPORAT_EACCOUNT_OB"){
					if(_this.accountNumberOBForSell == ""){
						showErrorMsg("支付工具中支付账号不能为空，请重新输入");
						return;
					}
					if(_this.accountNameOBForSell == ""){
						showErrorMsg("支付工具中支付账户户名不能为空，请重新输入");
						return;
					}
					if(_this.paymentPartyNameOBForSell == ""){
						showErrorMsg("支付工具中支付行名/机构名不能为空，请重新输入");
						return;
					}
					if(_this.paymentPartyIdOBForSell == ""){
						showErrorMsg("支付工具中支付行号/机构不能为空，请重新输入");
						return;
					}
				}

				_this.commitOrderSubmitBtnForSell = false;				
				// 20180423费用试算返回有费用信息时，费用支付工具选择现金时没有把费用信息放入支付项
//				if(_this.sumAdjustmentsAmtForSell>0){
//					_this.orderPayItemsForSell.push(getProductFeePayInfo());
//				}
				_this.sumAdjustmentsAmtForSellTemp = []; 
				var paymentItemInfoTemp = {};
				//20180531由于没有成功提交订单成功留在本页面，导致多个费用，需要把支付项的手续费清空，留最后一个
				if(_this.sumAdjustmentsAmtForSell>0 || _this.orderPayTotalAmtForSell >0 ){
					var orderPayItem = {};
					for(var i=0;i<_this.orderPayItemsForSell.length;i++){
						orderPayItem = _this.orderPayItemsForSell[i];	
						paymentItemInfoTemp = orderPayItem.paymentItem;
						var paymentMethodAttributeTemp = orderPayItem.paymentMethodAttribute;
						//判断是否为产品购买类型
						if(orderPayItem.paymentItem.paymentPurpose == "PURCHASE"){
							//20180813加入他行账号，需要在提交结算时赋值(由于他行账户没法验证支付工具，不能在费用试算时加入他行支付信息)
							if(_this.productPayMethodTypeForSell == "PERSONAL_ACCOUNT_OB" || _this.productPayMethodTypeForSell == "CORPORAT_EACCOUNT_OB"){
								if(typeof paymentItemInfoTemp !== "undefined"){
									delete paymentItemInfoTemp["paymentMethodInfo"];
								}
								var temp_paymentMethodOBInfo = {
									"accountNumber" : _this.accountNumberOBForSell, //支付账号(他行)
									"accountName" : _this.accountNameOBForSell, //支付账户户名(他行)
									"paymentPartyId" : _this.paymentPartyIdOBForSell, //支付行号(他行)
									"paymentPartyName" : _this.paymentPartyNameOBForSell, //支付行名(他行)
									"accountAddress" : _this.accountAddressForSell, //支付账户地址
								};
								paymentItemInfoTemp.paymentMethodInfo = temp_paymentMethodOBInfo;
								if(typeof paymentMethodAttributeTemp === "undefined"){
									var paymentMethodAttributeTemp = {};
								}
								paymentMethodAttributeTemp.cashOrRemitFlag = _this.cashOrRemitFlagForSell; //钞汇标志		
								orderPayItem.paymentItem.paymentMethodAttribute = paymentMethodAttributeTemp;
							}
							_this.sumAdjustmentsAmtForSellTemp.push(orderPayItem);
						}
					}
					_this.orderPayItemsForSell = _this.sumAdjustmentsAmtForSellTemp;
					if(_this.sumAdjustmentsAmtForSell>0){
						_this.orderPayItemsForSell.push(getProductFeePayInfo());
					}						
				}	
				
				setTimeout(function() {
					if (_this.curIncomeTypeForSell == "survey") { // survey-由调查顶中，立即购买进入						
						_this.processSellOrderPFExt();						
					} else if (_this.curIncomeTypeForSell == "orglist") { // orglist-由订单列表页
						_this.compensateSellOrderExt();
					} else if (_this.curIncomeTypeForSell == "shopcart") {
						_this.processSellOrderPFExt();
					}					
					if($rootScope.data.customerModel.clientType == "1" ){//对私刷新介质
						$rootScope.acctinfoInit();
					}
					
				}, 100);
			};
			
			// 获取费用的支付信息
			var getProductFeePayInfo = function() {
				var orderPayItemsFeeForSell = {};				
				if (_this.feePayMethodTypeNameForSell == "CASH") {					
					//20180511规则修改为，如果支付工具为现金，一律走统一支付
						orderPayItemsFeeForSell = {
							"paymentItem" : {
								"manualRefNum" : "",
								"amount" : _this.sumAdjustmentsAmtForSell + "",
								"currencyUomId" : "156",
								"paymentMethodType" : _this.feePayMethodTypeNameForSell,
								"cdFlag" : "D",	
								"paymentPurpose" : "FEE",
								"paymentMethodInfo" : {
									"paymentPartyId" : $rootScope.data.tellerInfo.orgId
								},
								"paymentMethodAttribute" : {
									"agreementType" : "9",
									"cashOrRemitFlag" : "0"
								},
								"extendMap" :{
									"cashCaseCode" : _this.cashCaseCodeFeeForSell, // 现金项目代码
									"sysCustType" : _this.sysCustTypeFeeForSell  // 客户类型
								}
							}
						};			
				} else {
					// 支付工具信息
					var tempFee_paymentMethodInfo = {
						"paymentPartyId" : $rootScope.data.tellerInfo.orgId, // 支付行号/机构
						"accountNumber" : _this.accountNumberFeeForSell, // 账号
						"subAccountNumber" : _this.subAccountNumberFeeForSell, // 子账户
						"accountName" : _this.accountNameFeeForSell // 账户名称
					};
	
					var propsA = Object.getOwnPropertyNames(tempFee_paymentMethodInfo);
					for (var i = 0; i < propsA.length; i++) {
						var propName = propsA[i];
						// 如果对应属性对应值不相等，则返回false
						if (tempFee_paymentMethodInfo[propName] == "" || tempFee_paymentMethodInfo[propName] == undefined) {
							delete tempFee_paymentMethodInfo[propName];
						}
					}
	
					// 支付信息
					var tempFee_paymentMethodAttribute = {
						"agreementType" : _this.agreementTypeFeeForSell, // 协议类型
						"agreementContent" : _this.agreementContentFeeForSell, // 协议内容
						"cashOrRemitFlag" : _this.cashOrRemitFlagFeeForSell, // 钞汇标志
						"summaryCode" : _this.summaryCodeFeeForSell // 摘要代码
					};
	
					var propsB = Object.getOwnPropertyNames(tempFee_paymentMethodAttribute);
					for (var i = 0; i < propsB.length; i++) {
						var propName = propsB[i];
						// 如果对应属性对应值不相等，则返回false
						if (tempFee_paymentMethodAttribute[propName] == "" || tempFee_paymentMethodAttribute[propName] == undefined) {
							delete tempFee_paymentMethodAttribute[propName];
						}
					}
					
					// 业务扩展信息
					var tempFee_extendMap = {
						"cashCaseCode" : _this.cashCaseCodeFeeForSell, // 项目现金代码
						"certificateType" : _this.certificateTypeFeeForSell, // 凭证种类
						"certificateId" : _this.certificateIdFeeForSell, // 凭证号码
						"payerCertType" : _this.payerCertTypeFeeForSell, // 证件类型
						"payerCertNo" : _this.payerCertNoFeeForSell, // 证件号码
						"certificateBatch" : _this.certificateBatchFeeForSell, // 凭证批次
						"sysCustType" : _this.sysCustTypeFeeForSell,  // 客户类型					
						"drwAcct" : _this.drwAcctFeeForSell, // 待销账来源账号 
						"subPyrAcctNum" : _this.subPyrAcctNumFeeForSell, // 待销账来源账号子账户序号
						"drawNm" : _this.drawNmFeeForSell, // 待销账来源户名
						"pymtAcctTp" : _this.pymtAcctTpFeeForSell,  // 待销账来源账户类型
						"Purpose" : _this.purposeFeeForSell, //用途
						"SealCheckStatus" : _this.resSealVerifyPayFeeForSell,  //验印结果(0:失败，1：成功)
						"chequeNoteDate" : _this.chequeNoteDateFeeForSell  //出票日期
					};
	
					var propsC = Object.getOwnPropertyNames(tempFee_extendMap);
					for (var i = 0; i < propsC.length; i++) {
						var propName = propsC[i];
						// 如果对应属性对应值不相等，则返回false
						if (tempFee_extendMap[propName] == "" || tempFee_extendMap[propName] == undefined) {
							delete tempFee_extendMap[propName];
						}
					}
					//20180713交易中心王居宝确认，手续费必须得走统一支付
					orderPayItemsFeeForSell = {
						"paymentItem" : {
							"manualRefNum" : "",
							"amount" : _this.sumAdjustmentsAmtForSell + "",
							"currencyUomId" : "156",
							"paymentMethodType" : _this.feePayMethodTypeNameForSell,
							"cdFlag" : "D",
							"paymentPurpose" : "FEE",
							"paymentMethodInfo" : tempFee_paymentMethodInfo,
							"paymentMethodAttribute" : tempFee_paymentMethodAttribute,
							"extendMap" : tempFee_extendMap
						}
					};

				}
				return orderPayItemsFeeForSell;
			};

			/**
			 * 销售订单
			 * 
			 */
			_this.processSellOrderPFExt = function() {
				showErrorMsg("");	
				// 是否需要复核授权，保留当前订单场景，如果下面改成异步通讯，这里失效
				var needReview = false;
				var needAuth = false;
				var needAuthHMD = false;
				window.needAuthFlag = "";
				window.authTypeFlag = "";
				window.authGlobalSeq = ""; //授权流水号
				window.waringmsg = "";//黑白名单授权时的提示信息
				_this.reviewAuthConfForSell = {};
				_this.orderItemsForSell = [];
				for (var i = 0; i < _this.orderItemsInitForSell.length; i++) {
			//		var orderItemSeq = i + 1;
			//		_this.orderItemsInitForSell[i].orderItemSeqId = orderItemSeq;
					var orderItemAttr = _this.orderItemsInitForSell[i].orderItemAttr;
					// 20810419，由于柜面与交易中心在数额、金额问题上理解不一致，
					// 交易中心处理的金额=数额*单价*数量，所以以数量计算的产品把数额设置为1
					var orderItem = _this.orderItemsInitForSell[i];
					//是否协议利率产品标志
					var isAgreementInterest =  _this.orderItemsInitForSell[i].isAgreementInterest;
					//协议利率产品最终执行利率
					_this.agreementInterest =  _this.orderItemsInitForSell[i].agreementInterest;
					
					// 判断订单不以金额计，则以数量计金额(20180504由于预开户即不以金额也不以数量记，所以得加入requireQuantity=Y条件)
					//20180529在订单初始化已经配置,故注释掉
//					var amount = 0;
//					if(orderItem.requireAmount == "N" && orderItem.requireQuantity == "Y"){
//						amount = "1";
//					}else{
//						amount = _this.orderItemsInitForSell[i].amount;
//					}
					
					// 20180505增加协议产品利率，最终执行利率放入订购项
					if(isAgreementInterest == "Y"){
						if(typeof orderItemAttr==="undefined"){
							orderItemAttr = [];
						}
						
						var intRateOrderItemAttrFlag = {};
						intRateOrderItemAttrFlag.attrName = "prefFlag";
						intRateOrderItemAttrFlag.attrValue = "0";
						orderItemAttr.push(intRateOrderItemAttrFlag);
						var intRateActualRateFlag = {};
						intRateActualRateFlag.attrName = "actualRate";
						intRateActualRateFlag.attrValue = _this.agreementInterest + "";
						orderItemAttr.push(intRateActualRateFlag);
					}
					
					// --end
					var orderItem = {
						orderItemSeqId : _this.orderItemsInitForSell[i].orderItemSeqId + "",
						productId : _this.orderItemsInitForSell[i].productId,
						productFunctionId : _this.orderItemsInitForSell[i].productFunctionId,
						amount : _this.orderItemsInitForSell[i].amount + "",
						quantity : _this.orderItemsInitForSell[i].quantity + "",
						price : _this.orderItemsInitForSell[i].price + "",
						surveyAnswers : _this.orderItemsInitForSell[i].surveyAnswers,
						orderItemAttr :  orderItemAttr
					};
					_this.orderItemsForSell.push(orderItem);
				}

				_this.shipGroupsForSell = [
					{
						"shipMethodTypeId" : "NO_SHIPPING"
					}
				];
				// 20180416订单调整项初始化变量把费用试算的结果覆盖掉，导致没有把费用调整项带过去
// _this.orderAdjustmentsForSell = [];
				_this.orderTermsForSell = [];
				_this.orderAttributesForSell = [];
				//20180822增加代理人信息
				var agenterModelCustNo = ""; //代理人客户号
				if(typeof $rootScope.data.agenterModel !== "undefined" &&  typeof $rootScope.data.agenterModel.custNo !== "undefined"){
					agenterModelCustNo = $rootScope.data.agenterModel.custNo; //代理人客户号
					_this.orderRoleCustomerGrantForSell = $rootScope.data.agenterModel.custNo;
					
				}				
				if(agenterModelCustNo == ""){
					_this.orderRolesForSell = [ {
						roleTypeId : "END_USER_CUSTOMER", //最终用户
						party : {
							partyId : $rootScope.data.customerModel.custNo
						}
					} ];
				}else{
					_this.orderRolesForSell = [ {
						roleTypeId : "END_USER_CUSTOMER", //最终用户
						party : {
							partyId : $rootScope.data.customerModel.custNo
						}
					},
					{
						roleTypeId : "CUSTOMER_AGENT", //客户代理人
						party : {
							partyId : agenterModelCustNo
						}
					}
					];
				}
				

				// businessType业务类型
				var businessType = "";
				
				// 20180409理财认、申购业务中调用创建订单传参问题,把根据产品返回的isAutoApprove,preAuthBusType,isAuth给订单orderAttributes赋值----begin
				for (var i = 0; i < _this.orderItemsForSell.length; i++) {
					var orderItemsOrderItemAttr = _this.orderItemsForSell[i].orderItemAttr;					
					for(var j=0;j<orderItemsOrderItemAttr.length;j++){
						var orderItemAttr = orderItemsOrderItemAttr[j];
						// 判断是否有自动核准值
						if(orderItemAttr.attrName == "isAutoApprove"){
							_this.isAutoApproveForSell = orderItemAttr.attrValue;
						}					
						// 判断是否有授权值
						else if(orderItemAttr.attrName == "isAuth"){
							var isAuthAttr = {};
							isAuthAttr.attrName = "isAuth";
							isAuthAttr.attrValue = orderItemAttr.attrValue;
							_this.orderAttributesForSell.push(isAuthAttr);
						}
						// 判断是否有授权模式值(授权模式（K600-预授权；K602-资金冻结）)
						else if(orderItemAttr.attrName == "preAuthBusType"){							
							businessType = orderItemAttr.attrValue;							
							break;
						}
				 	}
				}
							
				// 把业务类型放入PaymentItem中的paymentMethodAttribute的businessType属性
				//20180524订单提交时，需要对调整箱金额进行加减(目前包括促销、利息、利息税)
				//20180614目前包括促销,利息和利息税已在促销试算时加入
				for(var i=0;i<_this.orderPayItemsForSell.length;i++){
					var orderItemPayment = _this.orderPayItemsForSell[i].paymentItem;
					var orderItemPaymentMethodAttribute = orderItemPayment.paymentMethodAttribute;
					var paymentPurpose = orderItemPayment.paymentPurpose; //产品支付用途
					//20180722交易中心武明明确认，支付工具现金或者现金转待销账时不需要传冻结标志 
					if((_this.productPayMethodTypeForSell !== "STAY_CACLACC" && _this.productPayMethodTypeForSell !== "CASH" && paymentPurpose == "PURCHASE")
							||(_this.feePayMethodTypeNameForSell !== "STAY_CACLACC" && _this.feePayMethodTypeNameForSell !== "CASH" && paymentPurpose == "FEE")){
						orderItemPaymentMethodAttribute.businessType = businessType;
						// 如果业务类型是K602,则需在extendMap业务扩展信息的pathId通道复制
						if(businessType == "K602"){
							var orderItemPaymentMethodextendMap = orderItemPayment.extendMap;
							orderItemPaymentMethodextendMap.pathId = "ACCOUNT_PAY";
						}
					}				
					//如果支付用途为产品购买					
					if(paymentPurpose == "PURCHASE"){
						var payMentAmount = parseFloat(orderItemPayment.amount) + parseFloat(_this.sumPromoAmtForSell);
						//20180614由于交易中心促销试算请求报文加入金额验证,需要把利息、利息税放入支付项
						//20180614目前包括促销,利息和利息税已在促销试算时加入
						//payMentAmount = parseFloat(payMentAmount) + parseFloat(_this.sumAfterInterestValueForSell);
						payMentAmount = payMentAmount.toFixed(2);
						orderItemPayment.amount = payMentAmount;
					}
				}
				// ----end
				
				// 20180417支付项加入证件类型，证件号码，暂时应付理财业务场景
				if(typeof _this.payerCertTypeForSell == "undefined"){
					_this.payerCertTypeForSell = "";
				}
				if(typeof _this.payerCertNoForSell == "undefined"){
					_this.payerCertNoForSell = "";
				}
				for(var i=0;i<_this.orderPayItemsForSell.length;i++){
					// 判断在支付中是否有extendMap属性
					var paymentItem = _this.orderPayItemsForSell[i].paymentItem;
					if(typeof paymentItem.extendMap==="undefined"){
						paymentItem.extendMap = {
							"payerCertType": _this.payerCertTypeForSell,
							"payerCertNo" : _this.payerCertNoForSell,
							"cashCaseCode" : _this.cashCaseCodeForSell,
							"sysCustType"  : _this.sysCustTypeForSell,  // 客户类型
							"drwAcct" : _this.drwAcctForSell, // 待销账来源账号 
							"subPyrAcctNum" : _this.subPyrAcctNumForSell, // 待销账来源账号子账户序号
							"drawNm" : _this.drawNmForSell, // 待销账来源户名
							"pymtAcctTp" : _this.pymtAcctTpForSell  // 待销账来源账户类型
						};
					}else{
						// 如果为支付工具为产品购买
						if(paymentItem.paymentPurpose == "PURCHASE"){
							// 证件类型
							paymentItem.extendMap.payerCertType = _this.payerCertTypeForSell;
							 // 证件号码
							paymentItem.extendMap.payerCertNo = _this.payerCertNoForSell;
							// 现金项目代码
							paymentItem.extendMap.cashCaseCode = _this.cashCaseCodeForSell;
							// 客户类型
							paymentItem.extendMap.sysCustType = _this.sysCustTypeForSell;							
							// 待销账来源账号 
							paymentItem.extendMap.drwAcct = _this.drwAcctForSell;
							 // 待销账来源账号子账户序号
							paymentItem.extendMap.subPyrAcctNum = _this.subPyrAcctNumForSell;
							// 待销账来源户名
							paymentItem.extendMap.drawNm = _this.drawNmForSell;
							// 待销账来源账户类型
							paymentItem.extendMap.pymtAcctTp = _this.pymtAcctTpForSell;
						}					
					}					
				}
				
				//20180524促销信息加入订单调整项	
				//20180623促销试算返回所有调整项，所以不许重复加入(去掉此逻辑)
				for(var i=0;i<_this.productPromoUseInfoList.length;i++){
					var productPromo = _this.productPromoUseInfoList[i];
					if(productPromo.orderAdjustmentTypeId=="PROMOTION_ADJUSTMENT"){
						_this.orderAdjustmentsForSell.push(productPromo);
					}				
				}
								
				var orderParams = {
					"isAutoApprove" : _this.isAutoApproveForSell, // 是否自动核准
					"partyId" : $rootScope.data.customerModel.custNo,
					"orderHeader" : JSON.stringify(_this.orderHeaderForSell),
					"orderItems" : JSON.stringify(_this.orderItemsForSell), // 订单项列表:办理的业务明细列表
					"shipGroups" : JSON.stringify(_this.shipGroupsForSell), // 货运组列表:交付列表
					"orderAdjustments" : JSON.stringify(_this.orderAdjustmentsForSell), // 订单调整列表:交易调整信息
					"orderPaymentItems" : JSON.stringify(_this.orderPayItemsForSell), // 订单支付项信息:办理业务的付款信息
					"orderTerms" : JSON.stringify(_this.orderTermsForSell),
					"orderAttributes" : JSON.stringify(_this.orderAttributesForSell),
					"orderRoles" : JSON.stringify(_this.orderRolesForSell)
				};
				$.ajax({
					url : _contextPath_ + "/order/processOrderPFExt.jsoncall",
					type : "POST",
					dataType : "json",
					async : false,
					data : orderParams,
					success : function(data, textStatus) {						
						$rootScope.$digest();
						if (data.error) {
							showErrorMsg(data.error);
							return;
						}
						if (data.warning) {
							showErrorMsg(data.warning);
							return;
						}
						showErrorMsg("流水号：" + data.Service.Header.GlobalSeq + "。" + data.Service.Header.RetMsg);
						window.authGlobalSeq = data.Service.Header.GlobalSeq; //授权流水号
						window.waringmsg = data.Service.Header.RetMsg;//黑白名单授权时的提示信息
						_this.sellGlobalSeq = data.Service.Header.GlobalSeq;
						_this.sellTranSeq = data.Service.Header.TranSeq;
						
						if (data.Service.Header.RetStatus == "S") {
							
							// 接口返回的订单状态
							var resOrderStatus = data.Service.Body.statusMap["orderStatus"];
							_this.dcResOrderStatus = data.Service.Body.statusMap["orderStatus"];
							
							// 订单编号
							_this.orderId = data.Service.Body.orderId;
							// 全局流水号
							_this.globalSeq = data.Service.Header.GlobalSeq;
							
							// 接口返回的
							var resPaymentStatus = data.Service.Body.statusMap["orderPaymentStatus"];
							//20180601测试订单返回已完成状态
							//resOrderStatus = "ORDER_COMPLETED";	
							//resOrderStatus == "ORDER_CREATED";
							//20180822涉及录入复核交易，订单提交直接后，订单状态为已创建、已核准直接跳转至订单管理界面
							if (resOrderStatus == "ORDER_CREATED") {
								//20181113理财超时问题加入以下判断
//								if(resPaymentStatus !== "" && resPaymentStatus.length > 0){
//									for(var i=0;i<resPaymentStatus.length;i++){
//										var paymentStatus = resPaymentStatus[i];
//										//20181113测试用
//										paymentStatus == "PAYMENT_UNKNOW";
//										//如果状态为支付未知
//										if(paymentStatus == "PAYMENT_UNKNOW"){
//											_this.alertTextForSell(_this.orderId, _this.globalSeq, "支付异常，请联系科技人员处理。");
//											break;
//										}
//									}
//								}
								if(_this.isAutoApproveForSell == "P001" || _this.isAutoApproveForSell == "P"){
									_this.currTabId = 'ordermanage';
									_this.refreshOrderCompletedList();
								}else{
									_this.alertTextForSell(_this.orderId, _this.globalSeq, "订单已受理");
								}								
							} else if(resOrderStatus == "ORDER_APPROVED"){	
								if(_this.isAutoApproveForSell == "P001"){
									_this.currTabId = 'ordermanage';
									_this.refreshOrderCompletedList();
								}else{
									_this.alertTextForSell(_this.orderId, _this.globalSeq, "订单处理中");
								}	
							}else if(resOrderStatus == "ORDER_COMPLETED"){//20180601订单已完成则跳转至订单管理页面
								_this.currTabId = 'ordermanage';
								_this.refreshOrderCompletedList();
							//	_this.refreshOrderList();
							//	_this.alertText(_this.orderId, _this.globalSeq, "订单已完成");
							}else if(resOrderStatus == "ORDER_CANCELLED"){
								_this.alertTextForSell(_this.orderId, _this.globalSeq, "订单失败");
							}else{
								_this.alertTextForSell(_this.orderId, _this.globalSeq, "订单未知错误，请联系交易中心");
							}
							if (_this.curIncomeTypeForSell == "shopcart") {
								userService.deleteCartByIds(_this.shopCartIds);
								$rootScope.data.cartCount = userService.getCartCount($rootScope.data.customerModel.custNo);
								_this.curIncomeTypeForSell = "";
							}
							_this.dianchao();
						}else if(data.Service.Header.RetStatus === "C"){// C 黑白名单提交处理     authFlag   c-提醒   d-授权  e-子确认
							var waringCommitorderParams = {
									"isAutoApprove" : _this.isAutoApproveForSell, // 是否自动核准
									"partyId" : $rootScope.data.customerModel.custNo,
									"orderHeader" : JSON.stringify(_this.orderHeaderForSell),
									"orderItems" : JSON.stringify(_this.orderItemsForSell), // 订单项列表:办理的业务明细列表
									"shipGroups" : JSON.stringify(_this.shipGroupsForSell), // 货运组列表:交付列表
									"orderAdjustments" : JSON.stringify(_this.orderAdjustmentsForSell), // 订单调整列表:交易调整信息
									"orderPaymentItems" : JSON.stringify(_this.orderPayItemsForSell), // 订单支付项信息:办理业务的付款信息
									"orderTerms" : JSON.stringify(_this.orderTermsForSell),
									"orderAttributes" : JSON.stringify(_this.orderAttributesForSell),
									"orderRoles" : JSON.stringify(_this.orderRolesForSell),
									"waringCommit" : "2" //如果提交数据 ，表示本地授权或确认通过。
								};
							
							var authflag = data.Service.Header.AuthFlag;
							authflag = authflag.substring(0,1);
							if("c" == authflag||"e"==authflag){ //确认处理
								$.confirm({
									title : '提示',
									content : '<h5 style="text-align: center">黑白名单提示<br/></h5><br/><p>黑白名单提示：'+data.Service.Header.RetMsg+'</p>',
									buttons : {
										confirm : {
											text : '确定',
											btnClass : 'btn btn-blue-ok',
											keys : [ 'enter' ],
											action : function() {
												//提醒提示提交处理
												_this.localWaringCommitProcessSell(waringCommitorderParams);
												//更换产品支付工具时，可以结算
												_this.commitOrderSubmitBtnForSell = true;
												_this.currTabId = 'ordermanage';
												_this.refreshOrderCompletedList();
											}
										},
										cancel : {
											text : '取消',
											btnClass : 'btn btn-blue-cancal',
											keys : [ 'esc' ],
											action : function() {
												//更换产品支付工具时，可以结算
												_this.commitOrderSubmitBtnForSell = true;
												_this.currTabId = 'ordermanage';
												_this.refreshOrderCompletedList();
											}
										}
									}
								});
							}else if("d"==authflag){//授权处理
								 needReview = false;
								 needAuth = false;
								 needAuthHMD = true;
								 _this.reviewAuthConfForSell.status = data.Service.Header.RetStatus;
								 _this.reviewAuthConfForSell.msg = data.Service.Header.RetMsg;
								 _this.reviewAuthConfForSell.globalSeq = data.Service.Header.GlobalSeq;
								 
								 window.waringmsg =  data.Service.Header.RetMsg;//设置黑名单授权提示
							}
							
						}else if(data.Service.Header.RetStatus === "O") { //授权处理
							 needReview = false;
							 needAuth = true;
							 needAuthHMD = false;
							
							_this.reviewAuthConfForSell.status = data.Service.Header.RetStatus;
							_this.reviewAuthConfForSell.msg = data.Service.Header.RetMsg;
							_this.reviewAuthConfForSell.globalSeq = data.Service.Header.GlobalSeq;
						}else if(data.Service.Header.RetStatus === "R"){ //复核处理
							 needReview = true;
							 needAuth = false;
							 needAuthHMD = false;
							
							_this.reviewAuthConfForSell.status = data.Service.Header.RetStatus;
							_this.reviewAuthConfForSell.msg = data.Service.Header.RetMsg;
							_this.reviewAuthConfForSell.globalSeq = data.Service.Header.GlobalSeq;
						}
					},
					error : function(XMLHttpRequest, textStatus, errorThrown) {
						showErrorMsg(errorThrown);
						return false;
					}
				});
				
				if(needAuth||needAuthHMD){
					// 需要复核或授权，收集订单场景数据，发起通讯保存
					var message = JSON.stringify({
						"isAutoApprove" : _this.isAutoApproveForSell, // 是否自动核准
						"partyId" : $rootScope.data.customerModel.custNo,
						"orderHeader" : _this.orderHeaderForSell,
						"orderItems" : _this.orderItemsInitForSell, // 订单项列表:办理的业务明细列表
						"shipGroups" : _this.shipGroupsForSell, // 货运组列表:交付列表
						"orderAdjustments" : _this.orderAdjustmentsForSell, // 订单调整列表:交易调整信息
						"orderPaymentItems" : _this.orderPayItemsForSell, // 订单支付项信息:办理业务的付款信息
						"orderTerms" : _this.orderTermsForSell,
						"orderAttributes" : _this.orderAttributesForSell,
						"orderRoles" : _this.orderRolesForSell,
						"orderPayTotalAmtForSell": _this.orderPayTotalAmtForSell
					});
					
					$.ajax({
						url : _contextPath_ + "/reviewAuth/saveCustom.jsoncall",
						type : "POST",
						async : false,
						dataType : "json",
						data : {globalSeq:_this.reviewAuthConfForSell.globalSeq, message:message,clientType:$rootScope.data.customerModel.clientType},
						success : function(data) {
							if(needAuthHMD){
								window.needAuthFlag = "HMD"; //设置黑名单授权标志。
							}
							window.authTypeFlag = "sell" ;
							var urll = encodeURI(encodeURI(_contextPath_ + "/reviewAuth/runLocalAuth.do?globalSeq="+_this.reviewAuthConfForSell.globalSeq+"&taskId=111111&type="+window.needAuthFlag+"&waringmsg="+window.waringmsg+"&authCusteomType="+$rootScope.data.customerModel.clientType));
							window.authOpenWindow = layer.open({
								type:2,
								title:"授权",
								area:[($("html").width()-100)+"px",($("html").height()-50)+"px"],
								content:urll
							});			
						},
						error : function(XMLHttpRequest, textStatus, errorThrown) {
							showErrorMsg(errorThrown);
							return false;
						}
					});
				}else if(needReview){
					// 需要复核或授权，收集订单场景数据，发起通讯保存
					var message = JSON.stringify({
						"isAutoApprove" : _this.isAutoApproveForSell, // 是否自动核准
						"partyId" : $rootScope.data.customerModel.custNo,
						"orderHeader" : _this.orderHeaderForSell,
						"orderItems" : _this.orderItemsInitForSell, // 订单项列表:办理的业务明细列表
						"shipGroups" : _this.shipGroupsForSell, // 货运组列表:交付列表
						"orderAdjustments" : _this.orderAdjustmentsForSell, // 订单调整列表:交易调整信息
						"orderPaymentItems" : _this.orderPayItemsForSell, // 订单支付项信息:办理业务的付款信息
						"orderTerms" : _this.orderTermsForSell,
						"orderAttributes" : _this.orderAttributesForSell,
						"orderRoles" : _this.orderRolesForSell,
						"orderPayTotalAmtForSell": _this.orderPayTotalAmtForSell
					});
					
					$.ajax({
						url : _contextPath_ + "/reviewAuth/saveCustom.jsoncall",
						type : "POST",
						async : false,
						dataType : "json",
						data : {globalSeq:_this.reviewAuthConfForSell.globalSeq, message:message,clientType:$rootScope.data.customerModel.clientType},
						success : function(data) {
							$.confirm({
								title : '提示',
								content : '<h5 style="text-align: center">'+(_this.reviewAuthConfForSell.status==="O"?"授权":_this.reviewAuthConfForSell.status==="R"?"复核":"未知操作"+_this.reviewAuthConfForSell.status)+'提示<br/>流水号：' + _this.reviewAuthConfForSell.globalSeq + '</h5><br/><p>'+_this.reviewAuthConfForSell.msg+'</p>',
								buttons : {
									confirm : {
										text : '确定',
										btnClass : 'btn btn-blue-ok',
										keys : [ 'enter' ],
										action : function() {
											var writePrintParam = {
													"globalSeq" : _this.reviewAuthConfForSell.globalSeq,
													"tradeDate" : $rootScope.data.tellerInfo.tradeDate,
													"custNo" : $rootScope.data.customerModel.custNo,
													"clientType" : $rootScope.data.customerModel.clientType
												};
											 $.ajax({
													type : "POST",
													url : _contextPath_ + "/order/writePrint.jsoncall",
													async : false,
													data : writePrintParam,
													success : function(dataprint) {
														if(dataprint!=null && dataprint!=""){
															 document.getElementById('printsrc').innerHTML="";
															$('#printsrc').html("<script language='javascript'>"+dataprint+"   \n\r   voucherRePrint();</script>");
														}else{
															showErrorMsg("打印脚本为空");
															return ;
														}
													},
													error : function(XMLHttpRequest, textStatus, errorThrown) {
														showErrorMsg("向页面写入打印脚本失败，异常信息："+errorThrown);
														return ;
													}
												});
											_this.commitOrderSubmitBtnForSell = true;
									//		_this.isDisabledOrderSubmitBtnForSell = false;
											_this.currTabId = 'ordermanage';
											_this.refreshOrderCompletedList();
											_this.dianchao();
										}
									}
								}
							});
							
						},
						error : function(XMLHttpRequest, textStatus, errorThrown) {
							showErrorMsg(errorThrown);
							return false;
						}
					});
				}
			};
			
			//增加订单成功后现金录入券别，张数
			_this.dianchao = function() {
				var resOrderStatus = _this.dcResOrderStatus;
				var tellerId = $rootScope.data.tellerInfo.tellerId;
				var orgId = $rootScope.data.tellerInfo.orgId;
				var date = new Date();
				var Hour = date.getHours().toString();
				var Minute = date.getMinutes().toString();
				var Second = date.getSeconds().toString();
				if(Hour.length == 1){
					Hour = "0" + Hour;
				}
				if(Minute.length == 1){
					Minute = "0" + Minute;
				}
				if(Second.length == 1){
					Second = "0" + Second;
				}
				var time = $rootScope.data.tellerInfo.tradeDate + Hour + Minute + Second;
				var Amt = "";
				if(_this.orderPayTotalAmtForSell.toString().indexOf(".") != -1){
					Amt = _this.orderPayTotalAmtForSell.toString().replace(".","");
				}else{
					Amt = _this.orderPayTotalAmtForSell.toString() + "00";
				}
				var FinishResult = "";
				$.ajax({
						type : "POST",
						url : _contextPath_ + "/order/dianChaoForSellOther.jsoncall",
						async : false,
						data : {
							"GlobalSeq":_this.sellGlobalSeq
						},
						success : function(repResult) {
							
							if(repResult.tranCodeList.indexOf(_this.tranCodeForSell) > -1){
								if(typeof top.windowexternal !== "undefined"){
									FinishResult = top.windowexternal.FinishTransData(tellerId,"1","4","1",orgId,tellerId,"999","999",_this.tranCodeForSell,_this.orderItemsInitForSell[0].productName+"",Amt,time,_this.sellGlobalSeq);
								}else{
									layer.alert("未在客户端执行，无法点钞记录冠字号!");
								}
							}else{
								if(_this.productPayMethodTypeForSell == "CASH" && (resOrderStatus == "ORDER_CREATED"||resOrderStatus == "ORDER_APPROVED"||resOrderStatus == "ORDER_COMPLETED")){
									if(confirm("是否开始点钞?")){
										if(typeof top.windowexternal !== "undefined"){
											var ret = top.windowexternal.StartTransData($rootScope.data.tellerInfo.tellerId);
											if(ret == 0){
												layer.alert("请开始点钞,并在点钞完成后点击确定！");
												FinishResult = top.windowexternal.FinishTransData(tellerId,"1","4","1",orgId,tellerId,"999","999",_this.tranCodeForSell,_this.orderItemsInitForSell[0].productName+"",Amt,time,_this.sellGlobalSeq);
											}else{
												layer.alert("点钞开始失败，请联系科技人员！此功能依赖客户端版本1.0.1.4");
											}
										}else{
											layer.alert("未在客户端执行，无法点钞记录冠字号!");
										}
									}
								}
							}
							if(FinishResult != 0 ){
								layer.alert("登记冠字号失败，错误码:"+FinishResult+",请联系科技人员!");
							}
						},
						error : function(XMLHttpRequest, textStatus, errorThrown) {
							showErrorMsg("通讯失败");
						}
					});
			}

			
			
			/**
			 * 本地授权通过后提交交易
			 * type 2-本地黑白名单授权通过   4-远程黑白名单授权通过   5-授权拒绝   9-普通授权通过
			 */
			_this.localAuthProcessSell = function(type,authTeller){
				
				if(_this.orderRoleCustomerGrantForSell == ""){
					_this.orderAuthRolesForSell = [{
					    roleTypeId : "END_USER_CUSTOMER", //最终用户
							party : {
								partyId : $rootScope.data.customerModel.custNo
							}
						},
					   {
						roleTypeId : "AUTHORIZED_CASHIER", //授权
							party : {
								partyId : authTeller
							}
					   }
					];
				}else{
					_this.orderAuthRolesForSell =[{
					    roleTypeId : "END_USER_CUSTOMER", //最终用户
							party : {
								partyId : $rootScope.data.customerModel.custNo
							}
						},
						{
						roleTypeId : "CUSTOMER_AGENT", //客户代理人
							party : {
								partyId : _this.orderRoleCustomerGrantForSell
							}
					   },
					   {
						roleTypeId : "AUTHORIZED_CASHIER", //授权
							party : {
								partyId : authTeller
							}
					   }
					];
				}
			    
				
			    
				
				var waringCommitorderParams = {
						"isAutoApprove" : _this.isAutoApproveForSell, // 是否自动核准
						"partyId" : $rootScope.data.customerModel.custNo,
						"orderHeader" : JSON.stringify(_this.orderHeaderForSell),
						"orderItems" : JSON.stringify(_this.orderItemsForSell), // 订单项列表:办理的业务明细列表
						"shipGroups" : JSON.stringify(_this.shipGroupsForSell), // 货运组列表:交付列表
						"orderAdjustments" : JSON.stringify(_this.orderAdjustmentsForSell), // 订单调整列表:交易调整信息
						"orderPaymentItems" : JSON.stringify(_this.orderPayItemsForSell), // 订单支付项信息:办理业务的付款信息
						"orderTerms" : JSON.stringify(_this.orderTermsForSell),
						"orderAttributes" : JSON.stringify(_this.orderAttributesForSell),
						"orderRoles" : JSON.stringify(_this.orderAuthRolesForSell),
						"waringCommit" : type //如果提交数据 ，表示本地授权或确认通过。
					};
				
				$.ajax({
					url : _contextPath_ + "/order/processOrderPFExtWaringCommit.jsoncall",
					type : "POST",
					dataType : "json",
					async : false,
					data : waringCommitorderParams,
					success : function(data, textStatus) {						
						$rootScope.$digest();
						if (data.error) {
							showErrorMsg(data.error);
							return;
						}
						if (data.warning) {
							showErrorMsg(data.warning);
							return;
						}
						showErrorMsg("流水号：" + data.Service.Header.GlobalSeq + "。" + data.Service.Header.RetMsg);
						if (data.Service.Header.RetStatus == "S") {
							// 订单编号
							_this.orderId = data.Service.Body.orderId;
							// 全局流水号
							_this.globalSeq = data.Service.Header.GlobalSeq;
							_this.sellGlobalSeq = data.Service.Header.GlobalSeq;
							_this.dcResOrderStatus = data.Service.Body.statusMap["orderStatus"];
							// 接口返回的订单状态
							var resOrderStatus = data.Service.Body.statusMap["orderStatus"];
							//20180601测试订单返回已完成状态
							//resOrderStatus = "ORDER_COMPLETED";		
							//20180822涉及录入复核交易，订单提交直接后，订单状态为已创建、已核准直接跳转至订单管理界面
							if (resOrderStatus == "ORDER_CREATED") {
								if(_this.isAutoApproveForSell == "P001" || _this.isAutoApproveForSell == "P"){
									_this.currTabId = 'ordermanage';
									_this.refreshOrderCompletedList();
								}else{
									_this.alertTextForSell(_this.orderId, _this.globalSeq, "订单已受理");
								}							
							} else if(resOrderStatus == "ORDER_APPROVED"){
								if(_this.isAutoApproveForSell == "P001"){
									_this.currTabId = 'ordermanage';
									_this.refreshOrderCompletedList();
								}else{
									_this.alertTextForSell(_this.orderId, _this.globalSeq, "订单处理中");
								}								
							}else if(resOrderStatus == "ORDER_COMPLETED"){//20180601订单已完成则跳转至订单管理页面
								_this.currTabId = 'ordermanage';
								_this.refreshOrderCompletedList();
								
							//	_this.refreshOrderList();
							//	_this.alertText(_this.orderId, _this.globalSeq, "订单已完成");
							}else if(resOrderStatus == "ORDER_CANCELLED"){
								_this.alertTextForSell(_this.orderId, _this.globalSeq, "订单失败");
							}else{
								_this.alertTextForSell(_this.orderId, _this.globalSeq, "订单未知错误，请联系交易中心");
							}
							if (_this.curIncomeTypeForSell == "shopcart") {
								userService.deleteCartByIds(_this.shopCartIds);
								$rootScope.data.cartCount = userService.getCartCount($rootScope.data.customerModel.custNo);
								_this.curIncomeTypeForSell = "";
							}
							_this.dianchao();
						}else if(data.Service.Header.RetStatus === "C"){// C 黑白名单提交处理     authFlag   c-提醒   d-授权  e-子确认
							var waringCommitorderParams = {
									"isAutoApprove" : _this.isAutoApproveForSell, // 是否自动核准
									"partyId" : $rootScope.data.customerModel.custNo,
									"orderHeader" : JSON.stringify(_this.orderHeaderForSell),
									"orderItems" : JSON.stringify(_this.orderItemsForSell), // 订单项列表:办理的业务明细列表
									"shipGroups" : JSON.stringify(_this.shipGroupsForSell), // 货运组列表:交付列表
									"orderAdjustments" : JSON.stringify(_this.orderAdjustmentsForSell), // 订单调整列表:交易调整信息
									"orderPaymentItems" : JSON.stringify(_this.orderPayItemsForSell), // 订单支付项信息:办理业务的付款信息
									"orderTerms" : JSON.stringify(_this.orderTermsForSell),
									"orderAttributes" : JSON.stringify(_this.orderAttributesForSell),
									"orderRoles" : JSON.stringify(_this.orderRolesForSell),
									"waringCommit" : "2" //如果提交数据 ，表示本地授权或确认通过。
								};
							
							var authflag = data.Service.Header.AuthFlag;
							authflag = authflag.substring(0,1);
							if("c" == authflag||"e"==authflag){ //确认处理
								$.confirm({
									title : '提示',
									content : '<h5 style="text-align: center">黑白名单提示<br/></h5><br/><p>黑白名单提示：'+data.Service.Header.RetMsg+'</p>',
									buttons : {
										confirm : {
											text : '确定',
											btnClass : 'btn btn-blue-ok',
											keys : [ 'enter' ],
											action : function() {
												//提醒提示提交处理
												_this.localWaringCommitProcessSell(waringCommitorderParams);
												//更换产品支付工具时，可以结算
												_this.commitOrderSubmitBtnForSell = true;
												_this.currTabId = 'ordermanage';
												_this.dcResOrderStatus = data.Service.Body.statusMap["orderStatus"];
												_this.refreshOrderCompletedList();
											}
										},
										cancel : {
											text : '取消',
											btnClass : 'btn btn-blue-cancal',
											keys : [ 'esc' ],
											action : function() {
												//更换产品支付工具时，可以结算
												_this.commitOrderSubmitBtnForSell = true;
												_this.currTabId = 'ordermanage';
												_this.refreshOrderCompletedList();
											}
										}
									}
								});
							}else if("d"==authflag){//授权处理
								 _this.reviewAuthConfForSell.status = data.Service.Header.RetStatus;
								 _this.reviewAuthConfForSell.msg = data.Service.Header.RetMsg;
								 _this.reviewAuthConfForSell.globalSeq = data.Service.Header.GlobalSeq;
								 
								 window.waringmsg =  data.Service.Header.RetMsg;//设置黑名单授权提示
								 
								// 需要复核或授权，收集订单场景数据，发起通讯保存
									var message = JSON.stringify({
										"isAutoApprove" : _this.isAutoApproveForSell, // 是否自动核准
										"partyId" : $rootScope.data.customerModel.custNo,
										"orderHeader" : _this.orderHeaderForSell,
										"orderItems" : _this.orderItemsInitForSell, // 订单项列表:办理的业务明细列表
										"shipGroups" : _this.shipGroupsForSell, // 货运组列表:交付列表
										"orderAdjustments" : _this.orderAdjustmentsForSell, // 订单调整列表:交易调整信息
										"orderPaymentItems" : _this.orderPayItemsForSell, // 订单支付项信息:办理业务的付款信息
										"orderTerms" : _this.orderTermsForSell,
										"orderAttributes" : _this.orderAttributesForSell,
										"orderRoles" : _this.orderRolesForSell,
										"orderPayTotalAmtForSell": _this.orderPayTotalAmtForSell
									});
									
									$.ajax({
										url : _contextPath_ + "/reviewAuth/saveCustom.jsoncall",
										type : "POST",
										async : false,
										dataType : "json",
										data : {globalSeq:_this.reviewAuthConfForSell.globalSeq, message:message,clientType:$rootScope.data.customerModel.clientType},
										success : function(data) {
											window.needAuthFlag = "HMD"; //设置黑名单授权标志。
											window.authTypeFlag = "sell" ;
											var urll = encodeURI(encodeURI(_contextPath_ + "/reviewAuth/runLocalAuth.do?globalSeq="+_this.reviewAuthConfForSell.globalSeq+"&taskId=111111&type="+window.needAuthFlag+"&waringmsg="+window.waringmsg+"&authCusteomType="+$rootScope.data.customerModel.clientType));
											window.authOpenWindow = layer.open({
												type:2,
												title:"授权",
												area:[($("html").width()-100)+"px",($("html").height()-50)+"px"],
												content:urll
											});			
										},
										error : function(XMLHttpRequest, textStatus, errorThrown) {
											showErrorMsg(errorThrown);
											return false;
										}
									});
							}
							
						}else if(data.Service.Header.RetStatus === "R"){
							
							var reviewFlag_status = data.Service.Header.RetStatus;
							var reviewFlag_globalSeq = data.Service.Header.GlobalSeq;
							var reviewFlag_msg = data.Service.Header.RetMsg;

							// 需要复核或授权，收集订单场景数据，发起通讯保存
							var message = JSON.stringify({
								"isAutoApprove" : _this.isAutoApproveForSell, // 是否自动核准
								"partyId" : $rootScope.data.customerModel.custNo,
								"orderHeader" : _this.orderHeaderForSell,
								"orderItems" : _this.orderItemsInitForSell, // 订单项列表:办理的业务明细列表
								"shipGroups" : _this.shipGroupsForSell, // 货运组列表:交付列表
								"orderAdjustments" : _this.orderAdjustmentsForSell, // 订单调整列表:交易调整信息
								"orderPaymentItems" : _this.orderPayItemsForSell, // 订单支付项信息:办理业务的付款信息
								"orderTerms" : _this.orderTermsForSell,
								"orderAttributes" : _this.orderAttributesForSell,
								"orderRoles" : _this.orderRolesForSell,
								"orderPayTotalAmtForSell": _this.orderPayTotalAmtForSell
							});
							
							$.ajax({
								url : _contextPath_ + "/reviewAuth/saveCustom.jsoncall",
								type : "POST",
								async : false,
								dataType : "json",
								data : {globalSeq:data.Service.Header.GlobalSeq, message:message,clientType:$rootScope.data.customerModel.clientType},
								success : function(data) {
									$.confirm({
										title : '提示',
										content : '<h5 style="text-align: center">'+(reviewFlag_status==="O"?"授权":reviewFlag_status==="R"?"复核":"未知操作"+reviewFlag_status)+'提示<br/>流水号：' + reviewFlag_globalSeq + '</h5><br/><p>'+reviewFlag_msg+'</p>',
//										content : '<h5 style="text-align: center">'+(_this.reviewAuthConfForSell.status==="O"?"授权":_this.reviewAuthConfForSell.status==="R"?"复核":"未知操作"+_this.reviewAuthConfForSell.status)+'提示<br/>流水号：' + _this.reviewAuthConfForSell.globalSeq + '</h5><br/><p>'+_this.reviewAuthConfForSell.msg+'</p>',
										buttons : {
											confirm : {
												text : '确定',
												btnClass : 'btn btn-blue-ok',
												keys : [ 'enter' ],
												action : function() {
													var writePrintParam = {
															"globalSeq" : _this.reviewAuthConfForSell.globalSeq,
															"tradeDate" : $rootScope.data.tellerInfo.tradeDate,
															"custNo" : $rootScope.data.customerModel.custNo,
															"clientType" : $rootScope.data.customerModel.clientType
														};
													 $.ajax({
															type : "POST",
															url : _contextPath_ + "/order/writePrint.jsoncall",
															async : false,
															data : writePrintParam,
															success : function(dataprint) {
																if(dataprint!=null && dataprint!=""){
																	 document.getElementById('printsrc').innerHTML="";
																	$('#printsrc').html("<script language='javascript'>"+dataprint+"   \n\r   voucherRePrint();</script>");
																}else{
																	showErrorMsg("打印脚本为空");
																	return ;
																}
															},
															error : function(XMLHttpRequest, textStatus, errorThrown) {
																showErrorMsg("向页面写入打印脚本失败，异常信息："+errorThrown);
																return ;
															}
														});
													_this.commitOrderSubmitBtnForSell = true;
											//		_this.isDisabledOrderSubmitBtnForSell = false;
													_this.currTabId = 'ordermanage';
													_this.dcResOrderStatus = data.Service.Body.statusMap["orderStatus"];
													_this.refreshOrderCompletedList();
													_this.dianchao();
												}
											}
										}
									});
									
								},
								error : function(XMLHttpRequest, textStatus, errorThrown) {
									showErrorMsg(errorThrown);
									return false;
								}
							});
						
						}
					},
					error : function(XMLHttpRequest, textStatus, errorThrown) {
						showErrorMsg(errorThrown);
						return false;
					}
				});
				
			};
			
			window.localAuthProcessSell = _this.localAuthProcessSell;
			
			
			_this.authSellCancel = function(){
				_this.commitOrderSubmitBtnForSell = true;
				_this.currTabId = 'ordermanage';
				_this.refreshOrderCompletedList();
			};
			
			window.authSellCancel = _this.authSellCancel;
			
			/**
			 * 黑名单确认后提交处理
			 */
			_this.localWaringCommitProcessSell = function(waringCommitorderParams){
				
				$.ajax({
					url : _contextPath_ + "/order/processOrderPFExtWaringCommit.jsoncall",
					type : "POST",
					dataType : "json",
					async : false,
					data : waringCommitorderParams,
					success : function(data, textStatus) {						
						$rootScope.$digest();
						if (data.error) {
							showErrorMsg(data.error);
							return;
						}
						if (data.warning) {
							showErrorMsg(data.warning);
							return;
						}
						showErrorMsg("流水号：" + data.Service.Header.GlobalSeq + "。" + data.Service.Header.RetMsg);
						if (data.Service.Header.RetStatus == "S") {
							// 订单编号
							_this.orderId = data.Service.Body.orderId;
							// 全局流水号
							_this.globalSeq = data.Service.Header.GlobalSeq;
							_this.dcResOrderStatus = data.Service.Body.statusMap["orderStatus"];
							// 接口返回的订单状态
							var resOrderStatus = data.Service.Body.statusMap["orderStatus"];
							//20180601测试订单返回已完成状态
							//resOrderStatus = "ORDER_COMPLETED";	
							//20180822涉及录入复核交易，订单提交直接后，订单状态为已创建、已核准直接跳转至订单管理界面
							if (resOrderStatus == "ORDER_CREATED") {								
								if(_this.isAutoApproveForSell == "P001" || _this.isAutoApproveForSell == "P"){
									_this.currTabId = 'ordermanage';
									_this.refreshOrderCompletedList();
								}else{
									_this.alertTextForSell(_this.orderId, _this.globalSeq, "订单已受理");
								}								
							} else if(resOrderStatus == "ORDER_APPROVED"){
								if(_this.isAutoApproveForSell == "P001"){
									_this.currTabId = 'ordermanage';
									_this.refreshOrderCompletedList();
								}else{
									_this.alertTextForSell(_this.orderId, _this.globalSeq, "订单处理中");
								}								
							}else if(resOrderStatus == "ORDER_COMPLETED"){//20180601订单已完成则跳转至订单管理页面
								_this.currTabId = 'ordermanage';
								_this.refreshOrderCompletedList();
							//	_this.refreshOrderList();
							//	_this.alertText(_this.orderId, _this.globalSeq, "订单已完成");
							}else if(resOrderStatus == "ORDER_CANCELLED"){
								_this.alertTextForSell(_this.orderId, _this.globalSeq, "订单失败");
							}else{
								_this.alertTextForSell(_this.orderId, _this.globalSeq, "订单未知错误，请联系交易中心");
							}
							if (_this.curIncomeTypeForSell == "shopcart") {
								userService.deleteCartByIds(_this.shopCartIds);
								$rootScope.data.cartCount = userService.getCartCount($rootScope.data.customerModel.custNo);
								_this.curIncomeTypeForSell = "";
							}
							_this.dianchao();
						}
					},
					error : function(XMLHttpRequest, textStatus, errorThrown) {
						showErrorMsg(errorThrown);
						return false;
					}
				});
				
			};
			
			
			// 弹出确认框
			_this.alertTextForSell = function(orderId, globalSeq, text) {
				$.confirm({
					title : '提示',
					content : '<h5 style="text-align: center">' + text + ',订单号：' + orderId + ',流水号：' + globalSeq + ',是否查看详情</h5>',
					buttons : {
						confirm : {
							text : '确定',
							btnClass : 'btn btn-blue-ok',
							keys : [ 'enter' ],
							action : function() {
								_this.commitOrderSubmitBtnForSell = true;
					//			_this.isDisabledOrderSubmitBtnForSell = false;
								_this.openOrderDetailForSell(orderId);
							}
						},
						cancel : {
							text : '取消',
							keys : [ 'esc' ],
							btnClass : 'btn btn-blue-cancal',
							action : function() {
								_this.commitOrderSubmitBtnForSell = true;
								_this.currTabId = 'ordermanage';								
								_this.refreshOrderCompletedList();
							}
						}
					}
				});
			};

			/**
			 * 打开订单详情页
			 */
			_this.openOrderDetailForSell = function(orderId) {
				showErrorMsg("");
				var dataModel = {
					"custNo" : $rootScope.data.customerModel.custNo,
					"orderId" : orderId
				};

				var sellOrderDetailReport = userService.getSellOrderDetail2(dataModel);
				if (sellOrderDetailReport.hasOwnProperty("Service")
					&& sellOrderDetailReport.Service.hasOwnProperty("Header")
					&& sellOrderDetailReport.Service.Header.hasOwnProperty("RetStatus")) {
					if (sellOrderDetailReport.Service.Header.RetStatus == "S") {
						$rootScope.orderDetail = sellOrderDetailReport.Service.Body;
						 var globalseq="";
						 for (var item in sellOrderDetailReport.Service.Body.orderAttributes) {
							 if(sellOrderDetailReport.Service.Body.orderAttributes[item].GlobalSeq!=undefined && sellOrderDetailReport.Service.Body.orderAttributes[item].GlobalSeq!=""){
								 globalseq = sellOrderDetailReport.Service.Body.orderAttributes[item].GlobalSeq;
							 }
						 }
						 $rootScope.orderDetailGlobalSeq = globalseq;
					} else {
						showErrorMsg(sellOrderDetailReport.Service.Header.RetMsg);
						return;
					}
				} else if (sellOrderDetailReport.hasOwnProperty(JSON_KEY_ERROR)) {
					showErrorMsg(sellOrderDetailReport[JSON_KEY_ERROR]);
					return;
				} else {
					showErrorMsg("请与交易中心联系，交易中心返回错误："+sellOrderDetailReport.Service.Header.RetMsg);
					return;
				}
				var url = _contextPath_ + "/customview/components/tabs/orderdetail.html";
				var conf = {
					title : '订单详情',
					url : url,
					width : ($("html").width() - 400),
					height : ($("html").height() - 180)
				};
				$rootScope.angModal(conf);
			};

			/**
			 * 销售订单 订单补偿
			 */
			_this.compensateSellOrderExt = function() {
				showErrorMsg("");	
				if (_this.orderPayItemsForSell == "" || _this.orderPayItemsForSell.length < 1) {
					showErrorMsg("请核对支付工具！");
					return;
				}

				var orderParams = {
					"orderPaymentItems" : JSON.stringify(_this.orderPayItemsForSell),
					"orderId" : _this.curOrderIdForSell,
					"custNo" : $rootScope.data.customerModel.custNo
				};
				$.ajax({
					url : _contextPath_ + "/order/compensateOrderExt.jsoncall",
					type : "POST",
					dataType : "json",
					async : false,
					data : orderParams,
					success : function(data, textStatus) {
						if (data.hasOwnProperty("Header")) {
							if (data.Header.RetStatus == "S") {
								showErrorMsg("订单补偿成功！");
								_this.currTabId = 'ordermanage';
								_this.refreshOrderCompletedList();
							} else {
								showErrorMsg("订单补偿失败！");
							}
						} else {
							showErrorMsg("订单补偿失败！");
						}
					},
					error : function(XMLHttpRequest, textStatus, errorThrown) {
						showErrorMsg(errorThrown);
						return false;
					}
				});
			};

			/**
			 * 利率浮动试算$rootScope.data.tellerInfo.tradeDate
			 */
			_this.getCalIntRateFloatForSell = function(productIdAndFuncIdList) {
				showErrorMsg("");	
				var calIntRateFloatParams = {
					"partyId" : $rootScope.data.customerModel.custNo,
					"tradePartyId" : $rootScope.data.tellerInfo.orgId,
					"productStoreId" : $rootScope.data.tellerInfo.productStoreId,
					"userLoginId" : $rootScope.data.tellerInfo.userId,
					"salesChannelEnumId" : "10",
					"entryDate" :$rootScope.data.tellerInfo.tradeDate,
					"currencyUomId" : "156",
					"productList" : JSON.stringify(productIdAndFuncIdList)
				};

				$.ajax({
					url : _contextPath_ + "/orderCalculate/calIntRateFloat.jsoncall",
					type : "POST",
					dataType : "json",
					async : false,
					data : calIntRateFloatParams,
					success : function(data, textStatus) {
						if (data.hasOwnProperty("Header")) {
							if (data.Header.RetStatus == "S") {
								showErrorMsg("利率浮动试算成功,流水号:"+data.Header.GlobalSeq);
								_this.calIntRateFloatList = data.Body.productList;																						
								if (_this.calIntRateFloatList.length > 0) {
									angular.forEach(_this.orderItemsInitForSell, function(orderItem) {
										angular.forEach(_this.calIntRateFloatList, function(calIntRateFloat) {
											if (orderItem.productId == calIntRateFloat.productId) {
												var prefFlagValue = "";
												var intRateOrderItemAttrFlag = {};
												if (calIntRateFloat.toBnchFlotTpCode == "1" || calIntRateFloat.toBnchFlotTpCode == "2" ||calIntRateFloat.ultExecIntRate == "") {
													intRateOrderItemAttrFlag.attrName = "prefFlag";
													intRateOrderItemAttrFlag.attrValue = "1";
													if(typeof orderItem.orderItemAttr==="undefined"){
														orderItem.orderItemAttr = [];
													}
													orderItem.orderItemAttr.push(intRateOrderItemAttrFlag);
												} else {
													intRateOrderItemAttrFlag.attrName = "prefFlag";
													intRateOrderItemAttrFlag.attrValue = "0";
													if(typeof orderItem.orderItemAttr==="undefined"){
														orderItem.orderItemAttr = [];
													}
													orderItem.orderItemAttr.push(intRateOrderItemAttrFlag);
												}
												
												var orderCalIntRateFloat = Object.getOwnPropertyNames(calIntRateFloat);
												for (var i = 0; i < orderCalIntRateFloat.length; i++) {
													var orderCalIntRateFloatName = orderCalIntRateFloat[i];
													var intRateOrderItemAttr = {};
													if (orderCalIntRateFloatName == "toBnchFlotTpCode") {
														intRateOrderItemAttr.attrName = "prefType";
														intRateOrderItemAttr.attrValue = calIntRateFloat.toBnchFlotTpCode + "";
												// orderItem.orderItemAttr.push(intRateOrderItemAttr);
														if(typeof orderItem.orderItemAttr==="undefined"){
															orderItem.orderItemAttr = [];
														}
														orderItem.orderItemAttr.push(intRateOrderItemAttr);
													} else if (orderCalIntRateFloatName == "floatValue") {
														intRateOrderItemAttr.attrName = "prefValue";
														intRateOrderItemAttr.attrValue = calIntRateFloat.floatValue;
												// orderItem.orderItemAttr.push(intRateOrderItemAttr);
														if(typeof orderItem.orderItemAttr==="undefined"){
															orderItem.orderItemAttr = [];
														}
														orderItem.orderItemAttr.push(intRateOrderItemAttr);
													} else if (orderCalIntRateFloatName == "ultExecIntRate") {
														intRateOrderItemAttr.attrName = "actualRate";
														intRateOrderItemAttr.attrValue = calIntRateFloat.ultExecIntRate;
												// orderItem.orderItemAttr.push(intRateOrderItemAttr);
														if(typeof orderItem.orderItemAttr==="undefined"){
															orderItem.orderItemAttr = [];
														}
														orderItem.orderItemAttr.push(intRateOrderItemAttr);
													} else if (orderCalIntRateFloatName == "productId") {
														orderItem.isRateFloatSign = "Y";
														if (calIntRateFloat.floatValue != undefined && calIntRateFloat.floatValue != "") {
															// 利率上下浮动描述信息
															var rateFloateStrDes = "";
															// 判断利率种类对基准利率浮动类型代码,0-不浮动,1-按点数浮动,2-按百分比浮动
															if(calIntRateFloat.toBnchFlotTpCode=="1"){
																rateFloateStrDes = "按点数浮动:";
															}else if(calIntRateFloat.toBnchFlotTpCode=="2"){
																rateFloateStrDes = "按百分比浮动:";
															}
															orderItem.rateFloateDes = rateFloateStrDes + calIntRateFloat.floatValue;
														} else if (calIntRateFloat.ultExecIntRate != undefined && calIntRateFloat.ultExecIntRate != "") {
															orderItem.rateFloateDes = "最终执行利率" + calIntRateFloat.ultExecIntRate;
														}
													}
												}
											}
										});
									});
									$('#orderItemsTableForSell').bootstrapTable('load', _this.orderItemsInitForSell);
								}
							} else {
								showErrorMsg("利率浮动试算失败，请与交易中心联系,流水号：" + data.Header.GlobalSeq + "。" + data.Header.RetMsg);
							}
						} else {
							showErrorMsg("利率浮动试算失败,返回报文："+data);
						}
					},
					error : function(XMLHttpRequest, textStatus, errorThrown) {
						showErrorMsg("请与交易中心联系，异常信息："+errorThrown);
						return false;
					}
				});
			};

			/**
			 * 获取费用试算结果
			 */
			_this.calculateShoppingCartFeeForSell = function() {
				showErrorMsg("");

				if (_this.isShowProductPayForSell) {
					// 20180408如果订单产品金额为0，则不需要验证支付账号合支付户名
					// if(_this.orderPayTotalAmtForSell>0){
					// if (_this.isShowProductPayForSell && (_this.accountNumberForSell == "" ||
					// _this.accountNumberForSell == null)) {
					// showErrorMsg("请输入支付账号！");
					// return;
					// }
					// if (_this.isShowProductPayForSell && (_this.accountNameForSell == "" ||
					// _this.accountNameForSell == null)) {
					// showErrorMsg("请输入支付账户户名！");
					// return;
					// }
					// }

					var temp_paymentMethodInfo = {
						"accountNumber" : _this.accountNumberForSell,
						"subAccountNumber" : _this.subAccountNumberForSell,
						"accountName" : _this.accountNameForSell,
						"paymentPartyId" : $rootScope.data.tellerInfo.orgId,
						//"paymentPartyName" : $rootScope.data.tellerInfo.orgName,
						"paymentPartyName" : _this.paymentIssuerPartyNameForSell,
						"paymentIssuerPartyId" : _this.paymentIssuerPartyIdForSell,
					};

					var propsA = Object.getOwnPropertyNames(temp_paymentMethodInfo);
					for (var i = 0; i < propsA.length; i++) {
						var propName = propsA[i];
						// 如果对应属性对应值不相等，则返回false
						if (temp_paymentMethodInfo[propName] == "" || temp_paymentMethodInfo[propName] == undefined) {
							delete temp_paymentMethodInfo[propName];
						}
					}

					var temp_paymentMethodAttribute = {
						"agreementType" : _this.agreementTypeForSell, // 协议类型
						"agreementContent" : _this.agreementContentForSell, // 协议内容
						"cashOrRemitFlag" : _this.cashOrRemitFlagForSell, // 汇钞标志
						"summaryCode" : _this.summaryCodeForSell // 摘要代码
				// "paymentPurpose" : "PURCHASE"
					};

					var propsB = Object.getOwnPropertyNames(temp_paymentMethodAttribute);
					for (var i = 0; i < propsB.length; i++) {
						var propName = propsB[i];
						// 如果对应属性对应值不相等，则返回false
						if (temp_paymentMethodAttribute[propName] == "" || temp_paymentMethodAttribute[propName] == undefined) {
							delete temp_paymentMethodAttribute[propName];
						}
					}

					var temp_extendMap = {
						"cashCaseCode" : _this.cashCaseCodeForSell, // 项目现金代码
						"certificateType" : _this.certificateTypeForSell,// 凭证种类
						"certificateId" : _this.certificateIdForSell, // 凭证号码
						"payerCertType" : _this.payerCertTypeForSell, // 证件类型
						"payerCertNo" : _this.payerCertNoForSell, // 证件号码
						"certificateBatch" : _this.certificateBatchForSell, // 凭证批次
						"sysCustType" : _this.sysCustTypeForSell,  // 客户类型
						"Purpose" : _this.purposeForSell, //用途
						"SealCheckStatus" : _this.resSealVerifyPayForSell,  //验印结果(0:失败，1：成功)
						"chequeNoteDate" : _this.chequeNoteDateForSell  //出票日期
					};

					var propsC = Object.getOwnPropertyNames(temp_extendMap);
					for (var i = 0; i < propsC.length; i++) {
						var propName = propsC[i];
						// 如果对应属性对应值不相等，则返回false
						if (temp_extendMap[propName] == "" || temp_extendMap[propName] == undefined) {
							delete temp_extendMap[propName];
						}
					}

					if (_this.productPayMethodTypeForSell == "CASH") {//现金
						_this.orderPayItemsForSell = [
							{
								"paymentItem" : {
									"amount" : _this.orderProAmountForSell + "",
									"currencyUomId" : "156",
									"paymentMethodType" : _this.productPayMethodTypeForSell,
									"cdFlag" : "D",
									"paymentPurpose": "PURCHASE",
									"paymentMethodInfo" : {
										"paymentPartyId" : $rootScope.data.tellerInfo.orgId
									},
									"paymentMethodAttribute" : {
										"agreementType" : "9",
										"cashOrRemitFlag" : "0"
									}
								}
							}
						];
					}else { 
						if (_this.isManualRefNumForSell == "000000") {
							_this.orderPayItemsForSell = [
								{
									"paymentItem" : {
										"manualRefNum" : "000000",
										"amount" : _this.orderProAmountForSell + "",
										"currencyUomId" : "156",
										"paymentMethodType" : _this.productPayMethodTypeForSell,
										"cdFlag" : "D",
										"paymentPurpose" : "PURCHASE",
										"paymentMethodInfo" : temp_paymentMethodInfo,
										"paymentMethodAttribute" : temp_paymentMethodAttribute,
										"extendMap" : temp_extendMap
									}
								}
							];
						} else {
							_this.orderPayItemsForSell = [
								{
									"paymentItem" : {
										"amount" : _this.orderProAmountForSell + "",
										"currencyUomId" : "156",
										"paymentMethodType" : _this.productPayMethodTypeForSell,
										"cdFlag" : "D",
										"paymentPurpose" : "PURCHASE",
										"paymentMethodInfo" : temp_paymentMethodInfo,
										"paymentMethodAttribute" : temp_paymentMethodAttribute,
										"extendMap" : temp_extendMap
									}
								}
							];
						}
					} 
				} 	 

				// 如果订单金额为0，则不需要传paymentItem信息
				if(_this.orderPayTotalAmtForSell == 0){
					_this.orderPayItemsForSell = [];
				}
							
				var trialParams = {
					partyId : $rootScope.data.customerModel.custNo,
					orderHeader : JSON.stringify(_this.orderHeaderForSell),
					orderItems : JSON.stringify(_this.orderItemsInitForSell),
					shipGroups : JSON.stringify(_this.shipGroupsForSell),
					orderPaymentItems : JSON.stringify(_this.orderPayItemsForSell),
					orderTerms : JSON.stringify(_this.orderTermsForSell),
					orderAttributes : JSON.stringify(_this.orderAttributesForSell),
					orderRoles : JSON.stringify(_this.orderRolesForSell)
					// 20180410接口已调整，不需要传入orderAdjustments项
					// orderAdjustments :
					// JSON.stringify(_this.orderAdjustmentsForSell)
				};

				$.ajax({
					url : _contextPath_ + "/orderCalculate/calculateShoppingCartFee.jsoncall",
					type : "POST",
					dataType : "json",
					async : true,
					data : trialParams,
					success : function(data, textStatus) {
						if (data.hasOwnProperty("Header")) {
								if (data.Header.RetStatus == "S") {
									_this.isVerifyProductPayTools = true;	
									// 费用试算总金额
									_this.sumAdjustmentsAmtForSell = 0.00;
									// 判断费用试算返回接口的订单调整项
									if (data.Body.orderAdjustments.length > 0) {			
										//20180713把之前的调整项里的费用项清空
										var orderAdjustmentsForSellTempList = [];
										//清空订单调整项的费用信息 
										var orderAdjustmentsAttrTempForSellList = [];	
										for(var i=0;i<_this.orderAdjustmentsForSell.length;i++){
											var orderAdjustmentsForSellTemp = _this.orderAdjustmentsForSell[i];
											if(orderAdjustmentsForSellTemp.orderAdjustmentTypeId !== "FEE"){
												orderAdjustmentsForSellTempList.push(orderAdjustmentsForSellTemp);
											}
										}
										_this.orderAdjustmentsForSell = orderAdjustmentsForSellTempList;										
										// 接口返回的订单调整列表
										var resOrderAdjustmentsForSell  = data.Body.orderAdjustments;									
										// 迭代接口返回订单调整项列表信息
										angular.forEach(resOrderAdjustmentsForSell, function(orderAdjustment) {
											if(orderAdjustment.orderAdjustmentTypeId == "FEE"){
												//20180516交易中心接口调整利息、利息税放入订单调整项orderAdjustments	
												_this.orderAdjustmentsForSell.push(orderAdjustment);											
												// 费用金额
												var orderAdjustmentAmount = orderAdjustment.amount;
												// 产品标识
												// var productId =
												// orderAdjustment.productId;
												// 2018041021费用试算返回接口有变
												var orderItemSeqId = orderAdjustment.orderItemSeqId;											
												_this.sumAdjustmentsAmtForSell = parseFloat(_this.sumAdjustmentsAmtForSell)+parseFloat(orderAdjustmentAmount);
												_this.sumAdjustmentsAmtForSell = _this.sumAdjustmentsAmtForSell.toFixed(2);
											}
											
											// 迭代订单信息,把返回的订单调整项放入订单信息
											angular.forEach(_this.orderItemsInitForSell, function(orderItem) {																				
												for(var j=0;j<orderItem.orderAdjustmentsAttr;j++){
													var orderAdjustmentsAttrTempForSell = orderItem.orderAdjustmentsAttr[j];
													if(orderAdjustmentsAttrTempForSell.orderAdjustmentTypeId !== "FEE"){
														orderAdjustmentsAttrTempForSellList.push(orderAdjustmentsAttrTempForSell);
													}
												}
												orderItem.orderAdjustmentsAttr = orderAdjustmentsAttrTempForSellList;
												if(orderItemSeqId == orderItem.orderItemSeqId){
													if(typeof orderItem.orderAdjustmentsAttr==="undefined"){
														orderItem.orderAdjustmentsAttr = [];
													}
													orderItem.orderAdjustmentsAttr.push(orderAdjustment);
												}
											});
										});
										
										//20180919用于调整项费用时恢复到初始的费用
//										_this.orderAdjustmentsPrimaryListForSell = orderAdjustmentsAttrTempForSellList;
										angular.copy(orderAdjustmentsAttrTempForSellList,_this.orderAdjustmentsPrimaryListForSell);
										// 判断费用试算总金额，如果大于0才显示费用支付工具
										if(_this.sumAdjustmentsAmtForSell>0){
											// 显示费用支付工具
											_this.isShowFeePayToolsForSell = true; 												
											$rootScope.$digest();
										}
								 }
						//	_this.isCalculateShoppingCartFeeForSellFlag	= false;	
							$('#orderItemsTableForSell').bootstrapTable('load',_this.orderItemsInitForSell);
							// 显示费用总金额
							//$("#showOrderPayFeeTotalAmtForSell").text(_this.sumAdjustmentsAmtForSell);
							// 显示订单总金额
							//$("#showOrderPayTotalAmtForSell").text(_this.orderPayTotalAmtForSell);	
							//格式化千分位金额
							$("#showOrderPayFeeTotalAmtForSell").text($filter('money')(_this.sumAdjustmentsAmtForSell, ""));
							$("#showOrderPayTotalAmtForSell").text($filter('money')(_this.orderPayTotalAmtForSell, ""));
						    // 显示订单合计
							_this.sumOderFeeTotalAmt = parseFloat(_this.orderPayTotalAmtForSell)+parseFloat(_this.sumAdjustmentsAmtForSell);
							//$("#submintOrderPayTotalAmtForSell").text(_this.sumOderFeeTotalAmt);
							$("#submintOrderPayTotalAmtForSell").text($filter('money')(_this.sumOderFeeTotalAmt, ""));
							} else {
								showErrorMsg("订单费用试算失败，请与交易中心联系,流水号：" + data.Header.GlobalSeq + "。" + data.Header.RetMsg);
							}
						} else {
							showErrorMsg("订单费用试算失败,返回报文："+data);
						}
					},
					error : function(XMLHttpRequest, textStatus, errorThrown) {
						showErrorMsg("请与交易中心联系，异常信息："+errorThrown);
						return false;
					}
				});
			};

			/**
			 * 获取促销试算结果
			 */
			_this.calculateShoppingCartPromoForSell = function() {
				showErrorMsg("");
				if (_this.productPayMethodTypeForSell == "") {
					showErrorMsg("请选择支付工具！");
					return;
				}
				
				//20180614由于交易中心促销试算请求报文加入金额验证,需要把利息、利息税放入支付项
				for(var i=0;i<_this.orderPayItemsForSell.length;i++){
					var orderItemPayment = _this.orderPayItemsForSell[i].paymentItem;
					//如果支付用途为产品购买					
					if(orderItemPayment.paymentPurpose == "PURCHASE"){
						var payMentAmount = parseFloat(orderItemPayment.amount) + parseFloat(_this.sumAfterInterestValueForSell);
						payMentAmount = payMentAmount.toFixed(2);
						orderItemPayment.amount = payMentAmount;
					}
				}
				
				//20180713把之前的调整项里的费用项清空
				var orderAdjustmentsForSellTempList = [];
				for(var i=0;i<_this.orderAdjustmentsForSell.length;i++){
					var orderAdjustmentsForSellTemp = _this.orderAdjustmentsForSell[i];
					if(orderAdjustmentsForSellTemp.orderAdjustmentTypeId !== "FEE"){
						orderAdjustmentsForSellTempList.push(orderAdjustmentsForSellTemp);
					}
				}
								
				var trialParams = {
					partyId : $rootScope.data.customerModel.custNo,
					orderHeader : JSON.stringify(_this.orderHeaderForSell),
					orderItems : JSON.stringify(_this.orderItemsInitForSell),
					shipGroups : JSON.stringify(_this.shipGroupsForSell),
					orderPaymentItems : JSON.stringify(_this.orderPayItemsForSell),
					orderTerms : JSON.stringify(_this.orderTermsForSell),
					orderAttributes : JSON.stringify(_this.orderAttributesForSell),
					orderRoles : JSON.stringify(_this.orderRolesForSell),
					orderAdjustments : JSON.stringify(orderAdjustmentsForSellTempList)
				};

				$.ajax({
					url : _contextPath_ + "/orderCalculate/calculateShoppingCartPromo.jsoncall",
					type : "POST",
					dataType : "json",
					async : true,
					data : trialParams,
					success : function(data, textStatus) {
						if (data.hasOwnProperty("Header")) {
							if (data.Header.RetStatus == "S") {
								// 判断返回的报文是否存在促销信息信息
								if(data.Body.hasOwnProperty("orderAdjustments")){
									//接口返回的促销信息--20180623返回所有调整项(前提得把订单调整项放入请求报文)
									_this.productPromoUseInfoList = data.Body.orderAdjustments;		
									var tempSubAmt = 0.00;
									//订单总额与促销相加（交易返回的金额带正负）
									for(var i=0;i<_this.productPromoUseInfoList.length;i++){
										//如果费用类型为推广费
										if(_this.productPromoUseInfoList[i].orderAdjustmentTypeId=="PROMOTION_ADJUSTMENT"){
											//促销金额
											var amount = _this.productPromoUseInfoList[i].amount;
											tempSubAmt = parseFloat(tempSubAmt) + parseFloat(amount);
											// 控制金额域后面多出许多位js-bug
											_this.sumPromoAmtForSell = tempSubAmt.toFixed(2);
										}										
									}
									//订单总金额减去促销总金额
									_this.orderPayTotalAmtForSell = parseFloat(_this.orderPayTotalAmtForSell) + parseFloat(_this.sumPromoAmtForSell); 
									$("#showOrderPayTotalAmtForSell").text($filter('money')(_this.orderPayTotalAmtForSell, ""));
							//		$('#showOrderPayTotalAmtForSell').text(_this.orderPayTotalAmtForSell.toFixed(2));
									 //显示订单合计
									_this.sumOderFeeTotalAmt = parseFloat(_this.orderPayTotalAmtForSell)+parseFloat(_this.sumAdjustmentsAmtForSell);
									$("#submintOrderPayTotalAmtForSell").text($filter('money')(_this.sumOderFeeTotalAmt, ""));
							//		$("#submintOrderPayTotalAmtForSell").text(_this.sumOderFeeTotalAmt.toFixed(2));
									$('#orderItemsTableForSell').bootstrapTable('load',_this.orderItemsInitForSell);
								}
							} else {
								showErrorMsg("订单促销试算失败，请与交易中心联系,流水号：" + data.Header.GlobalSeq + "。" + data.Header.RetMsg);
							}
						} else {
							showErrorMsg("订单促销试算失败,请联系交易中心,返回报文："+data);
						}
					},
					error : function(XMLHttpRequest, textStatus, errorThrown) {
						showErrorMsg("请与交易中心联系，异常信息："+errorThrown);
						return false;
					}
				});
			};

			/**
			 * 获取添加优惠码试算结果
			 */
			_this.calculateShoppingCartAddPromoCodeForSell = function() {
				showErrorMsg("");
				if (_this.productPayMethodTypeForSell == "") {
					showErrorMsg("请选择支付工具！");
					return;
				}
				if (_this.isShowProductPayForSell && (_this.accountNumberForSell == "" || _this.accountNumberForSell == null)) {
					showErrorMsg("请输入账号！");
					return;
				}
				_this.orderPayItemsForSell = [
					{
						"paymentItem" : {
							"manualRefNum" : "000000",
							"amount" : _this.orderPayTotalAmtForSell + "",
							"currencyUomId" : "156",
							"paymentMethodType" : _this.productPayMethodTypeForSell,
							"cdFlag" : "D",
							"paymentMethodInfo" : {
								"accountNumber" : _this.isShowProductPayForSell
							}
						}
					}
				];

				_this.orderItemsPromo = [];
				for (var i = 0; i < _this.orderItemsInitForSell.length; i++) {
					var orderItemSeq = i + 1;
					var orderItems = {
						orderItemSeqId : orderItemSeq + "",
						productId : _this.orderItemsInitForSell[i].productId,
						amount : _this.orderItemsInitForSell[i].amount + "",
						quantity : _this.orderItemsInitForSell[i].quantity + "",
						price : _this.orderItemsInitForSell[i].price + "",
						surveyAnswers : _this.orderItemsInitForSell[i].surveyAnswers,
						orderItemAttr : _this.orderItemsInitForSell[i].orderItemAttr
					}
					_this.orderItemsPromo.push(orderItems);
				}

				var trialParams = {
					partyId : $rootScope.data.customerModel.custNo,
					orderHeader : JSON.stringify(_this.orderHeaderForSell),
					orderItems : JSON.stringify(_this.orderItemsPromo),
					shipGroups : JSON.stringify(_this.shipGroupsForSell),
					orderPaymentItems : JSON.stringify(_this.orderPayItemsForSell),
					orderTerms : JSON.stringify(_this.orderTermsForSell),
					orderAttributes : JSON.stringify(_this.orderAttributesForSell),
					orderRoles : JSON.stringify(_this.orderRolesForSell),
					orderAdjustments : JSON.stringify(_this.orderAdjustmentsForSell),
					productPromoUseInfoList : JSON.stringify(_this.productPromoUseInfoListForSell)
				};

				$.ajax({
					url : _contextPath_ + "/orderCalculate/calculateShoppingCartAddPromoCode.jsoncall",
					type : "POST",
					dataType : "json",
					async : true,
					data : trialParams,
					success : function(data, textStatus) {
						if (data.hasOwnProperty("Header")) {
							if (data.Header.RetStatus == "S") {
					// _this.orderPayTotalAmtForSell =
					// data.Body.displaySubTotal;
					// $("#showOrderPayTotalAmtForSell").text(_this.orderPayTotalAmtForSell);
					// $("#submintOrderPayTotalAmtForSell").text(_this.orderPayTotalAmtForSell);
								// 20180409需要让产品中配置促销码信息，以作后续处理
							} else {
								showErrorMsg("订单添加促销码试算失败！");
							}
						} else {
							showErrorMsg("订单添加促销码试算失败！");
						}
					},
					error : function(XMLHttpRequest, textStatus, errorThrown) {
						showErrorMsg("请与交易中心联系，异常信息："+errorThrown);
						return false;
					}
				});
			};
			
			/**
			 * 查询理财签约规则信息
			 */
			_this.selectAgreementFinancialInfoForSell = function(accountNum) {										
				var trialParams = {
					"accountNum" : accountNum
				};

				$.ajax({
					url : _contextPath_ + "/order/selectAgreementFinancialInfo.jsoncall",
					type : "POST",
					dataType : "json",
					async : false,
					data : trialParams,
					success : function(data, textStatus) {
						if (data.hasOwnProperty("Header")) {
							if (data.Header.RetStatus == "S") {
								// 判断返回的报文是否存在是否签约理财字段
								if(data.Body.hasOwnProperty("hasAgreement")){
									//是否签约理财(0-否， 1-是)
									_this.financialInfoSasAgreementForSell = data.Body.hasAgreement;
								}
							} else {
								showErrorMsg("查询理财签约规则信息，请与客户中心联系,流水号：" + data.Header.GlobalSeq + "。" + data.Header.RetMsg);
							}
						} else {
							showErrorMsg("查询理财签约规则信息,请联系客户中心,返回报文："+data);
						}
					},
					error : function(XMLHttpRequest, textStatus, errorThrown) {
						showErrorMsg("查询理财签约规则信息，异常信息："+errorThrown);
						return false;
					}
				});
			};
			
			/**
			 * 展示利率信息
			 */
			_this.showSellRateFloat = function(value, row, index) {
				var interestValueDes = "";
				var interestTaxValueDes = "";
				var productDesBtn = "";
				//订单标志
				var orderItemSeqId = row.orderItemSeqId;
				angular.forEach(row.orderAdjustment, function(orderAdjustment) {
					if(orderAdjustment.orderItemSeqId == orderItemSeqId){
						if (row.requireInterest == "1" || row.requireInterest == "2" || row.requireInterest == "3" || row.requireInterest == "5") {
							if (orderAdjustment.orderAdjustmentTypeId == "INTEREST_VALUE") {
								interestValueDes = orderAdjustment.amount;
							} else if (orderAdjustment.orderAdjustmentTypeId == "INTEREST_TAX_VALUE") {
								interestTaxValueDes = orderAdjustment.amount;
							}
						}
					}
				});
				
				if (row.isRateFloatSign == "Y" && row.rateFloateDes != undefined) { //利率试算
					var prefType = ""; //浮动类型(0-不浮动,1-按点数浮动,2-按百分比浮动)
					//利率信息
					if(row.orderItemAttr.length > 0){
						for(var i=0;i<row.orderItemAttr.length;i++){
							var orderItemAttrRate = row.orderItemAttr[i];
							var attrName = orderItemAttrRate.attrName;
							if(attrName == "prefType"){
								if(orderItemAttrRate.attrValue == "0"){ //浮动类型,0-不浮动
									productDesBtn = "执行利率:"+ row.rateFloateDes;
									break;
								}else if(orderItemAttrRate.attrValue == "1"){ //浮动类型,1-按点数浮动
									productDesBtn = "利率按点数浮动:"+ row.rateFloateDes;
									break;
								}else if(orderItemAttrRate.attrValue == "2"){ //浮动类型,2-按百分比浮动
									productDesBtn = "利率按百分比浮动:"+ row.rateFloateDes;
									break;
								}
							}							
						}
					}
				} else if (row.requireInterest == "1" || row.requireInterest == "2") { //利息、利息税
					productDesBtn = "<div>利息：" + interestValueDes + "，利息税：" + interestTaxValueDes+"</div>";
				} else if (row.requireInterest == "3" && (interestValueDes > 0 || interestValueDes > 0.00)) {//贷款归还应计利息
					productDesBtn = "<div>应计利息：" + interestValueDes +"</div>";
				}else if (row.requireInterest == "5" && (interestValueDes > 0 || interestValueDes > 0.00)) {//贷款归还应计利息
					productDesBtn = "<div>核销利息：" + interestValueDes +"</div>";
				} 
				
				// 费用结果信息备注
				var orderAdjustmentsAttrDes = "";
				var tempAdjustments = "";
				//订单类型
				var orderType = "02";
				// 获取费用试算结果信息加入到备注
				angular.forEach(row.orderAdjustmentsAttr, function(orderAdjustmentsAttr) {
					if(orderAdjustmentsAttr.orderItemSeqId == orderItemSeqId){
						// 订单调整项类型标识
						var orderAdjustmentTypeId = orderAdjustmentsAttr.orderAdjustmentTypeId;	
						// 订单调整描述
						var orderAdjustmentTypeIdDes = "";	
						//调整金额
						var modifyAmount = orderAdjustmentsAttr.modifyAmount;
						if(typeof modifyAmount == "undefined"){
							modifyAmount = "";
						}
						//调整金额描述
						var modifyReason = orderAdjustmentsAttr.modifyReason; 
						if(typeof modifyReason == "undefined"){
							modifyReason = "";
						}
						if(orderAdjustmentsAttr.hasOwnProperty("description")){
							var orderAdjustmentTypeIdDes = orderAdjustmentsAttr.description;
						}					
						// 费用金额						
						var orderAdjustmentAmount = parseFloat(orderAdjustmentsAttr.amount);
						// 费用备注信息
						var orderAdjustmentFeeInfo = "";
						if(typeof modifyAmount == "undefined" || modifyAmount == "" || modifyAmount == "0"){
							orderAdjustmentFeeInfo = "<div>"+orderAdjustmentTypeIdDes+":"+orderAdjustmentAmount+"<button type=\"button\" style=\"margin-right: 10px\" class=\"btn btn-default\" onclick=\"orderAdjustmentFeeUpdateBySellWin('" + orderAdjustmentsAttr.orderAdjustmentTypeId + "','" + orderAdjustmentsAttr.orderItemSeqId + "','" + orderAdjustmentsAttr.comments + "','"+modifyAmount+"','"+modifyReason+"')\">" + "调整" + "</button></div>";
						}else{										
							orderAdjustmentFeeInfo = "<div>"+orderAdjustmentTypeIdDes+":"+orderAdjustmentAmount+":"+modifyReason+":"+modifyAmount+"<button type=\"button\" style=\"margin-right: 10px\" class=\"btn btn-default\" onclick=\"orderAdjustmentFeeUpdateBySellWin('" + orderAdjustmentsAttr.orderAdjustmentTypeId + "','" + orderAdjustmentsAttr.orderItemSeqId + "','" + orderAdjustmentsAttr.comments + "','"+modifyAmount+"','"+modifyReason+"')\">" + "调整" + "</button>"
							                         +"<button type=\"button\" style=\"margin-right: 10px\" class=\"btn btn-default\" onclick=\"orderAdjustmentFeeDeleteBySellWin('" + orderAdjustmentsAttr.orderAdjustmentTypeId + "','" + orderAdjustmentsAttr.orderItemSeqId + "','" + orderAdjustmentsAttr.comments +"','" + modifyAmount+"')\">" + "删除调整" + "</button></div>";							
						}					
						orderAdjustmentsAttrDes = tempAdjustments + orderAdjustmentFeeInfo;
						tempAdjustments = orderAdjustmentsAttrDes;
					}					
				});
				
				if(orderAdjustmentsAttrDes.indexOf("删除调整")>=0){
					authSellFlag = true;
				}else{
					authSellFlag = false;
				}
				
				return productDesBtn+orderAdjustmentsAttrDes;
			};
			window.showRateFloatBySellWin = _this.showSellRateFloat;
			
			
			/**
			 * 展示促销信息
			 */
			_this.showShoppingCartPromo = function(value, row, index) {
				var productPromoDesc = "";
				for(var i=0;i<_this.productPromoUseInfoList.length;i++) {
					var productPromo = _this.productPromoUseInfoList[i];
					// 如果返回促销的产品代码与表格中的产品代码相等，则显示促销信息
					if(productPromo.orderItemSeqId == row.orderItemSeqId && productPromo.orderAdjustmentTypeId=="PROMOTION_ADJUSTMENT"){
						productPromoDesc = "<div>"+productPromo.description+":"+productPromo.amount+"</div>";
					}
				}		
				return productPromoDesc;
			};
			window.showShoppingCartPromoBySellWin = _this.showShoppingCartPromo;
						
			/**
			 * 格式化订单产品金额
			 */
			_this.orderAmountFormatterForSell = function(value,row,index){
				return $filter('money')(row.showOrderAmount, "");
			}
			window.showOrderAmountFormatterBySellWin = _this.orderAmountFormatterForSell;						
			
			/**
			 * 保存柜员手工调整费用
			 * 参数:  orderAdjustmentFeeAmount 调整费用金额
			 * 参数:  orderAdjustmentFeeDes 调整费用描述
			 * 
			 */
			$rootScope.addOrderAdjustmentFeeForSell = function(orderAdjustmentFeeAmount,orderAdjustmentFeeDes) {
				//校验输入调整费用金额的合法性
				var isMoney = userService.checkAmountForOrder(orderAdjustmentFeeAmount);
				if(!isMoney){
					var alertInfo = "输入调整金额不是合法金额，请重新输入!";
					userService.checkAmountAlertInfo(alertInfo);
					return ; 
				}
				//当前费用总额(包括调整费用金额)
				var sumAdjustmentsAmtForSell = 0;
				//调整项类型
				var orderAdjustmentFeeTypeIdByTeller = $rootScope.data.orderAdjustmentFeeTypeIdByTeller;
				//订单项标识
				var orderItemSeqIdByTeller = $rootScope.data.orderAdjustmentFeeOrderItemSeqIdByTeller;
				//费用代码
				var orderAdjustmentFeeCodeByTeller = $rootScope.data.orderAdjustmentFeeCommentsByTeller;
				angular.forEach(_this.orderItemsInitForSell, function(orderItem) {
					var sumAdjustmentsAmtTemp = 0;
					for(var j=0;j<orderItem.orderAdjustmentsAttr.length;j++){
						var orderAdjustmentsAttrTempForSell = orderItem.orderAdjustmentsAttr[j];
						//调整项标识
						var orderItemSeqId = orderAdjustmentsAttrTempForSell.orderItemSeqId;	
						//费用代码
						var orderAdjustmentsFeeCode = orderAdjustmentsAttrTempForSell.comments;
						//调整项类型为手续费
						if(orderAdjustmentsAttrTempForSell.orderAdjustmentTypeId === "FEE" && orderAdjustmentFeeTypeIdByTeller == "FEE"){	
							//如果订单标识、费用代码相等，则需加入柜员调整金额和调整费用描述
							if(orderItemSeqId == orderItemSeqIdByTeller && orderAdjustmentFeeCodeByTeller == orderAdjustmentsFeeCode){
								//调整金额不能大于该手续费标志(1：大于)
								var orderAdjustmentFeeAmountFlag = "0";
								//20180917与王居宝确认，费用金额为调整后的余额
								//费用调整项金额
								var orderAdjustmentsAmountTemp = orderAdjustmentsAttrTempForSell.amount; 
								//20181022加入减免手续费不能大于当前该手续费
								if(orderAdjustmentFeeAmount < 0 && Math.abs(orderAdjustmentFeeAmount) > orderAdjustmentsAmountTemp){
									orderAdjustmentFeeAmountFlag = "1";
									var alertInfo = "输入调整金额不能大于该手续费，请重新输入!";
									userService.checkAmountAlertInfo(alertInfo);								
								}
								if(orderAdjustmentFeeAmountFlag == "1"){
									orderAdjustmentFeeAmount = "0";
									orderAdjustmentFeeDes = "";
								}
								//调整金额
								orderAdjustmentsAttrTempForSell.modifyAmount = orderAdjustmentFeeAmount;
								//调整费用描述
								orderAdjustmentsAttrTempForSell.modifyReason = orderAdjustmentFeeDes;							
								var sumOrderAdjustmentsAmountTemp =  parseFloat(orderAdjustmentsAmountTemp)+parseFloat(orderAdjustmentFeeAmount);
								orderAdjustmentsAttrTempForSell.amount =sumOrderAdjustmentsAmountTemp.toFixed(2);								
							}
							// 费用金额
							var orderAdjustmentAmountTemp = orderAdjustmentsAttrTempForSell.amount;
							// 费用调整金额
							var orderAdjustmentModifyAmountTemp = orderAdjustmentsAttrTempForSell.modifyAmount;
							if(typeof orderAdjustmentModifyAmountTemp == "undefined" || orderAdjustmentModifyAmountTemp == ""){
								orderAdjustmentModifyAmountTemp = "0";
							}							
							//调整金额+费用金额(每个费用调整项)
						//	var sumAdjustmentsAmtTemp = parseFloat(orderAdjustmentModifyAmountTemp)+parseFloat(orderAdjustmentAmountTemp);
						//	sumAdjustmentsAmtTemp = sumAdjustmentsAmtTemp.toFixed(2);
							sumAdjustmentsAmtForSell = parseFloat(sumAdjustmentsAmtForSell)+parseFloat(orderAdjustmentAmountTemp);
							sumAdjustmentsAmtForSell = sumAdjustmentsAmtForSell.toFixed(2);									
						}
					}
				});		
				// 显示费用合计
				var sumAdjustmentsAmt = parseFloat(sumAdjustmentsAmtForSell);
				if(sumAdjustmentsAmt == 0 || sumAdjustmentsAmt == 0.00){
					_this.isShowFeePayToolsForSell = false; 	
				}
				_this.sumAdjustmentsAmtForSell = sumAdjustmentsAmt;
				$("#showOrderPayFeeTotalAmtForSell").text($filter('money')(sumAdjustmentsAmt));
			    // 显示订单合计
				_this.sumOderFeeTotalAmt = parseFloat(_this.orderPayTotalAmtForSell)+parseFloat(sumAdjustmentsAmt);
				// 格式化金额(千分位)
				$("#submintOrderPayTotalAmtForSell").text($filter('money')(_this.sumOderFeeTotalAmt, ""));
				$('#orderItemsTableForSell').bootstrapTable('load',_this.orderItemsInitForSell);
			};
			
			/**
			 * 删除柜员手工调整费用
			 * 参数： orderAdjustmentFeeTypeId 费用类型
			 * 参数:  orderItemSeqId 订单项标识
			 * 参数： orderAdjustmentFeeCode 费用代码
			 * 参数： orderAdjustmentFeeAmount 调整金额
			 */
			_this.orderAdjustmentFeeDeleteBySell = function(orderAdjustmentFeeTypeIdByTeller,orderItemSeqIdByTeller,orderAdjustmentFeeCodeByTeller,orderAdjustmentFeeAmount){
				//当前费用总额(包括调整费用金额)
				var sumAdjustmentsAmtForSell = 0;	
				var orderAdjustmentsPrimaryAmount = 0;
				angular.forEach(_this.orderItemsInitForSell, function(orderItem) {						
					for(var j=0;j<orderItem.orderAdjustmentsAttr.length;j++){
						var orderAdjustmentsAttrTempForSell = orderItem.orderAdjustmentsAttr[j];
						//调整项标识
						var orderItemSeqId = orderAdjustmentsAttrTempForSell.orderItemSeqId;	
						//费用代码
						var orderAdjustmentsFeeCode = orderAdjustmentsAttrTempForSell.comments;
						//调整项类型为手续费
						if(orderAdjustmentsAttrTempForSell.orderAdjustmentTypeId === "FEE" && orderAdjustmentFeeTypeIdByTeller == "FEE"){
							//如果订单标识、费用代码相等，则需删除柜员调整金额和调整费用描述
							if(orderItemSeqId == orderItemSeqIdByTeller && orderAdjustmentFeeCodeByTeller == orderAdjustmentsFeeCode){
								//调整金额
								orderAdjustmentsAttrTempForSell.modifyAmount = "";
								//调整费用描述
								orderAdjustmentsAttrTempForSell.modifyReason = "";	
								//20180917与王居宝确认，费用金额为调整后的余额
								//20180919与业务确认，每次删除调整恢复到最初费用金额
								for(var i=0;i<_this.orderAdjustmentsPrimaryListForSell.length;i++){
									var orderAdjustmentsPrimaryData = _this.orderAdjustmentsPrimaryListForSell[i];
									var orderAdjustmentsPrimaryItemSeqId = orderAdjustmentsPrimaryData.orderItemSeqId; //订单标识
									var orderAdjustmentsPrimaryTypeId = orderAdjustmentsPrimaryData.orderAdjustmentTypeId; //费用调整类型
									var orderAdjustmentsPrimaryFeeCode = orderAdjustmentsPrimaryData.comments; //费用代码
									if(orderAdjustmentsPrimaryItemSeqId == orderItemSeqIdByTeller && orderAdjustmentsPrimaryTypeId == "FEE" 
										&& orderAdjustmentsPrimaryFeeCode == orderAdjustmentFeeCodeByTeller){
										orderAdjustmentsPrimaryAmount = orderAdjustmentsPrimaryData.amount; //调整项原始金额
										orderAdjustmentsAttrTempForSell.amount = orderAdjustmentsPrimaryAmount;
										break;
									}								
								}
							}else{
								orderAdjustmentsPrimaryAmount = orderAdjustmentsAttrTempForSell.amount;
							}
							
							// 费用调整金额
							var orderAdjustmentModifyAmountTemp = orderAdjustmentsAttrTempForSell.modifyAmount;
							if(typeof orderAdjustmentModifyAmountTemp == "undefined" || orderAdjustmentModifyAmountTemp == ""){
								orderAdjustmentModifyAmountTemp = "0";
							}							
							//调整金额+费用金额(每个费用调整项)
//							var sumAdjustmentsAmtTemp = parseFloat(orderAdjustmentModifyAmountTemp)+parseFloat(orderAdjustmentAmountTemp);
//							sumAdjustmentsAmtTemp = sumAdjustmentsAmtTemp.toFixed(2);
							sumAdjustmentsAmtForSell = parseFloat(sumAdjustmentsAmtForSell)+parseFloat(orderAdjustmentsPrimaryAmount);
							sumAdjustmentsAmtForSell = sumAdjustmentsAmtForSell.toFixed(2);														
						}
					}
				});				
				// 显示费用合计
				var sumAdjustmentsAmt = parseFloat(sumAdjustmentsAmtForSell);
				if(sumAdjustmentsAmt > 0){
					_this.isShowFeePayToolsForSell = true; 	
					$rootScope.$digest();
				}
				_this.sumAdjustmentsAmtForSell = sumAdjustmentsAmt;
				$("#showOrderPayFeeTotalAmtForSell").text($filter('money')(sumAdjustmentsAmt));
			    // 显示订单合计
				_this.sumOderFeeTotalAmt = parseFloat(_this.orderPayTotalAmtForSell)+parseFloat(sumAdjustmentsAmt);
				// 格式化金额(千分位)
				$("#submintOrderPayTotalAmtForSell").text($filter('money')(_this.sumOderFeeTotalAmt, ""));			
				$('#orderItemsTableForSell').bootstrapTable('load',_this.orderItemsInitForSell);
			}
			window.orderAdjustmentFeeDeleteBySellWin = _this.orderAdjustmentFeeDeleteBySell;
			
			
			
			/**
			 * 打开柜员手工调整费用
			 * 参数： orderAdjustmentFeeTypeId 费用类型
			 * 参数:  orderItemSeqId 订单项标识
			 * 参数： orderAdjustmentFeeCode 费用代码
			 * 参数： orderAdjustmentModifyAmount 调整费用金额
			 * 参数： orderAdjustmentModifyReason 调整费用描述
			 */
			_this.orderAdjustmentFeeUpdateForSell = function(orderAdjustmentFeeTypeId,orderItemSeqId,orderAdjustmentFeeCode,orderAdjustmentModifyAmount,orderAdjustmentModifyReason){
				//调整项类型
				$rootScope.data.orderAdjustmentFeeTypeIdByTeller = orderAdjustmentFeeTypeId;
				//订单项标识
				$rootScope.data.orderAdjustmentFeeOrderItemSeqIdByTeller = orderItemSeqId;
				//费用代码
				$rootScope.data.orderAdjustmentFeeCommentsByTeller = orderAdjustmentFeeCode;
				//调整费用金额
				$rootScope.data.orderAdjustmentFeeAmountByTeller = orderAdjustmentModifyAmount;
				// 调整费用描述
				$rootScope.data.orderAdjustmentFeeDesByTeller = orderAdjustmentModifyReason;
				//订单类型(01:采购订单，02:销售订单)
				$rootScope.data.orderTypeAdjustmentFeeByTeller = "02";
				$rootScope.angModal({
					title : '费用调整',
					width : ($("html").width() - 600),
					height : ($("html").height() - 280),
					url : '../customview/components/tabs/orderAdjustmentFeeUpdate.html'
				});
			}
			window.orderAdjustmentFeeUpdateBySellWin = _this.orderAdjustmentFeeUpdateForSell;	
			
			//订单点击修改
			_this.orderLoadDetailForSell = function() {
				//如果购物车过来数据，产品数量大于1，则不允许修改
				if(_this.orderProductCountForSell == 1){			
					 var conf =  userService.orderBackUpdate($rootScope._system_param_orderDetailSurveyInfo);
					 _this.openTranForSell(conf);
				}else{
					showErrorMsg("产品数量大于1，不允许在订单结算页面修改!");
					return ;
				}
				$rootScope.$digest();
			}
			
			_this.openTranForSell = function(conf){		
				if(typeof conf != "object"){
					return;
				}
				
				if(typeof conf.param != "object"){
					conf.param = {};
				}
				conf.param.acctIndex = $rootScope.getCurrAcctIndex();
				
				if(typeof conf.tranType=="undefined"){
					if(typeof conf.url != "undefined"){
						conf.tranType = 0;
					}else if(typeof conf.tranCode!="undefined"){
						conf.tranType = 1;
					}else{
						alert("未知的交易类型，或数据格式错误，代码级错误。");
						return;
					}
				}
				
				if(!_this.isUseTab){//如果未启用选项卡，强制设置0
					conf.page = 0;
				}
				if(typeof conf.page=="undefined"){//page还是未定义，说明启动了选项卡，设置每次新选项卡打开
					conf.page = 'new';
				}
				
				$rootScope.addTab(conf);
				//执行自定义回调函数，传入整理后的conf，和选项卡div的jquery对象
				if(typeof conf.callback=="function"){
					conf.callback(conf, $("#"+conf.id));
				}
				
			};
		}
	}
});