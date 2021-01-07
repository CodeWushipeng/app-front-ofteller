<!-- 搜索 -->
<!-- <div class="quickSearch">
	<div class="quickSearch_input" style="margin:10px;">
		<div class="quickSearch_bg">
			<img src="img/quickSearch_search.png"/>
			<input type="text" name="quickSearch" maxLength="20" width="343"/>
			<a style="font-sizt:16pt;padding-left:50px;" href="javascript:void(0)" ng-click="maincom.prodListDl(productCategoryId)">返回</a>
		</div>
		
	</div>
</div> -->
<div class="top_nav" style="padding-top: 10px;">		
<left-block></left-block>
<label class="top-nav-label">产品详情</label>					
</div>
<div ng-style="maincom.CSS_PAGESEARCHHEIGHT" >			
<ul class="list-group" style="overflow:auto;">
		
	<!-- 基本信息 -->		
	<li class="list-group-item" style="border-top-left-radius:0px;border-top-right-radius:0px;padding:0px;">
		<div class="container-fluid">
			<div >
				<div style="width:50%;float:left;">
					<div class="padd">
						<div style="padding:24px 10px 10px 10px;">
							<img ng-src="../customview/img/medium/103.png" err-src="../customview/img/medium/103.png" ng-style="maincom.CSS_CUSTIMG" style="width:380px;height:220px;" />						
						</div>	
					</div>
				</div>
				<div  style="width:50%;float:right;padding:15px;">
					<div class="padd">
						<div style="padding:24px 10px 10px 20px;">
							  	<span>产品编码：<label >${(obj.availableProduct.productId)!''}</label></span><br/>
							  	<span>产品名称：<label >${(obj.availableProduct.productName)}</label></span><br/>
							  	<span>产品描述：<label >${(obj.availableProduct.description)!''}</label></span><br/>
								<span id="prod_detail_funcdiv_${obj.availableProduct.productId}">
								<#list obj.productFunctionList as funOne>
								
								<script type="text/javascript">
								/**
								*暂时屏蔽在详情中的入口
									(function(){
										var json = {};
										if(window.getCustom){
											json = window.getCustom();
										}
										var data = getCustom();
										var tellerInfo = data.tellerInfo;//机构柜员信息
										var customerInfo = data.customerModel;//客户信息
										var agenterInfo = data.agenterModel;//代理人信息
										if(!agenterInfo){
											agenterInfo = {};
										}
										var productInfo = ${(productInfo)!{}};//产品信息
										var holdProductInfo = {};//持有产品信息TODO
										
										//判断是否显示逻辑
										if('${(funOne.displayCondition)!}'=='' || eval(${(funOne.displayCondition)!})()){
											var surveyId = '${(funOne.CART_ADD)!}';
											if(surveyId!='' && surveyId.indexOf("_")!=-1){
												surveyId = surveyId.substring(0, surveyId.indexOf("_"));
											}
											var d = document.createElement("button");
											d.className = "btn btn-default";
											d.title="${(funOne.productFunctionDes)!}";
											var tranConf = {
												pdId:'${(pdId)!}', 
												price:'${(price)!}',
												productId:'${(obj.availableProduct.productId)!}', 
												productName:'${(obj.availableProduct.productName)!}', 
												productFunctionId:'${(funOne.productFunctionId)!}', 
												productFunctionName:'${(funOne.productFunctionName)!}', 
												prodCatalogId:'${(obj.prodCatalogId)!}',
												mutex:'${(funOne.mutex)!}',
												mutexProd:'${(funOne.mutexProd)!}',
												deliveryModel:'${(funOne.deliveryModel)!}',
												requireAmount:'${(funOne.requireAmount)!}',
												requireInterest:'${(funOne.requireInterest)!}',
												requireIntRate:'${(funOne.requireIntRate)!}',
												requireQuantity:'${(funOne.requireQuantity)!}',
												manualRefNum:'${(funOne.manualRefNum)!}',
												surveyId:surveyId
											};
											if("${(funOne.funDrive)!}" != ""){
												var driveFunc = eval("${(funOne.funDrive)!}");
												tranConf = $.extend(tranConf, driveFunc());
											}
											d.onclick = function(){
												if(tranConf.deliveryModel==""){
													alert("功能【"+tranConf.productFunctionName+"】未返回交付模式deliveryModel(01采购 02销售 03报价 04需求 05交易)，无法创建订单。");
													return;
												}
												prodstorage.openTran(tranConf);
												$('#angModal-cancel').click();
											};
											d.innerHTML = "${(funOne.productFunctionName)!}";
											document.getElementById("prod_detail_funcdiv_${obj.availableProduct.productId}").appendChild(d);
										}
									})();
									*/
								</script>
								</#list>
								</span>
								<button type="button" class="btn btn-default" onclick="$('#angModal-cancel').click();">返回</button>			
						</div>
					</div>
				</div>
			</div>
		</div>
	</li>
	
	<!-- 产品详情 -->		
	<li class="list-group-item" style="border-top-left-radius:0px;border-top-right-radius:0px;padding:0px;">
		
			<div style="width:100%;height:40px;background-color:#eee;display:block;">
				 <label><p style="padding:10px;font-size:16px;font-weight:800;">产品详情</p></label>
			</div>
			<div style="width:100%;display:block;min-height:100px;padding:10px;font-size:14px;white-space:normal;" >
				
				<#list obj.productMsgs as msgone>
					<p><font style="font-weight: 500">${msgone.attrName}:</font><br>
						&nbsp;&nbsp;&nbsp;&nbsp;${msgone.attrValue}
					</p>
				</#list> 
				 
			</div>
	</li>
	
	
	<!-- 产品配置-->		
	<li class="list-group-item" style="border-top-left-radius:0px;border-top-right-radius:0px;padding:0px;">
		
			<div style="width:100%;height:40px;background-color:#eee;display:block;">
				 <label><p style="padding:10px;font-size:16px;font-weight:800;">产品配置</p></label>
			</div>
			<div style="width:100%;display:block;min-height:100px;padding:10px;font-size:14px;white-space:normal;" >
				<ul>
				<#list obj.productFeatureList as feature>
					<li>${(feature.productFeatureCategoryName)!}:
					<hr>
						<#list feature.productFeatureTypeList as featuretype>
						<div class="row">
								<div class="col-sm-2">${(featuretype.productFeatureTypeName)!}:</div>
								<div class="col-sm-10">
									<#list featuretype.productFeatureList as f>
										${(f.productFeatureLocalCode)!}-${(f.productFeatureName)!};
									</#list>
								</div>
						</div>
						</#list>
					</li>
					<br><br>
				</#list>
				</ul>
			</div>
				
		
	</li>
	
	<!-- 评论 -->		
	<li class="list-group-item" style="border-top-left-radius:0px;border-top-right-radius:0px;border-bottom-right-radius:0px;border-bottom-left-radius:0px;padding:0px;">
		
			<div style="width:100%;height:40px;background-color:#eee;display:block;">
				 <label><p style="padding:10px;font-size:16px;font-weight:800;">评论</p></label>
			</div>
			<div style="width:100%;display:block;min-height:100px;padding:10px;font-size:14px;white-space:normal;">
				
			</div>
				
		
	</li>
	
	
	</ul>
		
</div>		
