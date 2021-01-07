<div class="container-fluid product_list_item_container" >
	<div>
		<div class="container_right_item_left" onclick="prodstorageProductDetail('${(objprodcatalogType)!''}','${(obj.availableProduct.productId)!''}')">
			<img src="${(obj.availableProduct.imageAdress)!'../customview/img/medium/103.png'}" style="width:161px;height:80px;cursor:pointer;" />
		</div>
		<div  class="container_right_item_center" onclick="prodstorageProductDetail('${(objprodcatalogType)!''}','${(obj.availableProduct.productId)!''}')">
		  	<p>产品编码：<span style="cursor:pointer;" >${(obj.availableProduct.productId)!''}</span></p>
		  	<p>产品名称：<span style="cursor:pointer;" >${(obj.availableProduct.productName)!''}</span></p>
			<p style="width:100%;white-space:normal;">说明：${(obj.availableProduct.description)!''}</p>
		</div>
		<div class="container_right_item_right" id="prod_list_funcdiv_${prodcatalogType}_${obj.availableProduct.productId}">
		<#if (productFunctionOrAttrListSize>0)>
			<#list obj.productFunctionOrAttrList as func>
			<script type="text/javascript">
				(function(){
				
					try{
						
						var json = {};
						if(window.getCustom){
							json = window.getCustom();
						}
						
						var data = getCustom();
						var tellerInfo = data.tellerInfo;//机构柜员信息
						var customerInfo = data.customerModel;//客户信息
						var agenterInfo = data.agenterModel;//代理人信息
						var prodTabType = "prod";//产品所在标签类型
						if(!agenterInfo){
							agenterInfo = {};
						}
						var productInfo = ${(productInfo)!{}};//产品信息
						var holdProductInfo = {};//持有产品信息TODO
						var sceneCode = '${sceneCode}';
						
						//判断是否显示逻辑
						if('${(func.displayCondition)!}'=='' || eval('${(func.displayCondition)!}')()){
						
							var surveyId = '${(func.CART_ADD)!}';
							if(surveyId!='' && surveyId.indexOf("_")!=-1){
								surveyId = surveyId.substring(0, surveyId.indexOf("_"));
							}
							var d = document.createElement("a");
							d.className = "btn btn-blue product_list_item_btn";
							d.href = "javascript:void(0)";
							d.title="${(func.productFunctionDes)!}";
							d.style.float = "left";
							d.style.minWidth = 0;
							d.style.marginTop = 0;
							d.style.marginBottom = "10px";
							
							var tranConf = {
								pdId:'${(pdId)!}', 
								price:'${(price)!}', 
								productId:'${(obj.availableProduct.productId)!}', 
								productName:'${(obj.availableProduct.productName)!}', 
								productFunctionId:'${(func.productFunctionId)!}', 
								productFunctionName:'${(func.productFunctionName)!}', 
								prodCatalogId:'${(obj.prodCatalogId)!}',
								mutex:'${(func.mutex)!}',
								mutexProd:'${(func.mutexProd)!}',
								deliveryModel:'${(func.deliveryModel)!}',
								requireAmount:'${(func.requireAmount)!}',
								requireInterest:'${(func.requireInterest)!}',
								requireIntRate:'${(func.requireIntRate)!}',
								requireQuantity:'${(func.requireQuantity)!}',
								manualRefNum:'${(func.manualRefNum)!}',
								//20180409理财认、申购业务中调用创建订单传参问题,需要加入isAutoApprove,preAuthBusType,isAuth属性
								isAutoApprove:'${(func.isAutoApprove)!}',
								preAuthBusType:'${(func.preAuthBusType)!}',
								isAuth:'${(func.isAuth)!}',
								//添加客户视图类型标志   1-个人客户  0-对公客户
								thisClientType:data.customerModel.clientType,
								interestFunc:'${(func.interestFunc)!}',
								isAgreementInterest:'${(func.isAgreementInterest)!}',
								amountMin:'${(func.amountMin)!}',
								amountMax:'${(func.amountMax)!}',
								surveyId:surveyId,
								productLineId:'${(obj.availableProduct.productLineId)!}',
								//产品类型
								productTypeId:'${(obj.availableProduct.productTypeId)!}'
							};
	
							if("${(func.funDrive)!}" != ""){
								var driveFunc = eval("${(func.funDrive)!}");
								tranConf = $.extend(tranConf, driveFunc());
							}
							d.onclick = function(){
								if(tranConf.deliveryModel==""){
									alert("功能"+tranConf.productFunctionName+"未返回交付模式deliveryModel(01采购 02销售 03报价 04需求 05交易)，无法创建订单。");
									return;
								}
	
								//添加前置检查，在检查未通过情况下不能使用功能做相应提示
								if("${(func.checkCondition)!}" != ""){
									var res = eval("${(func.checkCondition)!}")();
									if(!res){
										return false;
									}
								}
								prodstorage.openTran(tranConf);
							};
							d.innerHTML = "${(func.productFunctionName)!}";
							document.getElementById("prod_list_funcdiv_${prodcatalogType}_${obj.availableProduct.productId}").appendChild(d);
							
						}
					}catch(err){
						alert(err.message);
					}finally{
						
					}
					
				})();
			</script>
			</#list>
			</#if>
		</div>
	</div>
</div>