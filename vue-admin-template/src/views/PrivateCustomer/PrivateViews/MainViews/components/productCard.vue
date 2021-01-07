<template>
  <div class="product-card" :id="`productCard-${cardIndex}`">
    <iframe width="100%" height="100%" :srcdoc="productHtml" frameborder="0" id="myFrameName"></iframe>

    <el-dialog
      title="产品详情"
      :visible.sync="dialogVisible"
      :close-on-click-modal="true">
      <iframe v-if="iframeUrl" width="100%" height="600" :src="iframeUrl" frameborder="0"></iframe>
      <iframe v-else width="100%" height="600" :srcdoc="iframeHtml" frameborder="0"></iframe>
    </el-dialog>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapState, mapActions } from "vuex";
import { queryTemplete } from '@/api/financialProduct/templete'

export default {
    props: {
      menuSelected: String ,
      selectProductInfo: Object ,
      cardIndex: Number
    },
    data() {
      return {
        dialogVisible: false,
        iframeUrl: '',
        iframeHtml: '',
        productHtml: '',
        TempleteInput:JSON.parse(JSON.stringify(new Object()))
      }
    },
    computed: {
      ...mapState({
          privateMainState:state=>state.privateViewMain.privateMainState,
          custInfo:state=>state.privateViewMain.custInfo
      })
    },
    methods: {
      dialogHandler(templateCode, productId) {
        let params = {
            templateCode: templateCode,
            templateType: productId,
            inputParam: this.TempleteInput
        }
        queryTemplete(params).then(data => {
          if (data.body.cached) {
            this.iframeHtml = ''
            this.iframeUrl = data.body.data
          } else {
            this.iframeHtml = data.body.data
            this.iframeUrl = ''
          }
          this.dialogVisible = true
        })

      },
      ajaxTemplateTest(TempleteInput) {
          let params = {
              templateCode: "product-list-template",
              templateType: "0002",
              inputParam: this.TempleteInput
              //dataArgs: dataArgs
          }
          let that = this
          queryTemplete(params).then(data => {
              this.productHtml = data.body.data

          })
      },
    },
    watch: {
      "menuSelected": {
        deep: true,
        handler(val) {
          var productFunctionOrAttrList = new Array()
          if(this.selectProductInfo && this.selectProductInfo != {}){
            let availableProduct = JSON.parse(JSON.stringify(new Object()))
            availableProduct.productId = this.selectProductInfo.availableProduct.productId
            availableProduct.productName = this.selectProductInfo.availableProduct.productName
            availableProduct.description = this.selectProductInfo.availableProduct.description
            this.TempleteInput.availableProduct = availableProduct

            for (let i = 0 ; i < this.selectProductInfo.productFunctionOrAttrList.length ; i++){
              let productFunctionOrAttr = this.selectProductInfo.productFunctionOrAttrList[i]
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
            this.TempleteInput.productFunctionOrAttrList = productFunctionOrAttrList

            this.TempleteInput.productMsgs = this.selectProductInfo.productMsgs
            this.TempleteInput.productFeatureList = this.selectProductInfo.productFeatureList ? this.selectProductInfo.productFeatureList : []

            //客户信息
            if(window.localStorage.getItem("userInfo")){
              this.TempleteInput.userInfo = window.localStorage.getItem("userInfo")
            }else{
              this.TempleteInput.userInfo = ""
            }
            //代理人信息
            if(window.localStorage.getItem("agenterModel")){
              this.TempleteInput.agenterModel = window.localStorage.getItem("agenterModel")
            }else{
              this.TempleteInput.agenterModel = ""
            }
            //柜员信息
            if(window.localStorage.getItem("tellerInfo")){
              this.TempleteInput.tellerInfo = window.localStorage.getItem("tellerInfo")
            }else{
              this.TempleteInput.tellerInfo = ""
            }
            this.ajaxTemplateTest(this.TempleteInput)
          }else{
            productHtml = ""
          }
        },
      },
    },
    mounted() {
        //this.ajaxTemplateTest()
    },
    created(){
      let self = this
      window.showProductDetail = (templateCode, productId)=>{
        self.dialogHandler(templateCode, productId)
      }
    }
}
</script>

<style lang="scss">
  .product-card {
    width: 100%;
    height: 100%;
    border-bottom: 1px solid #bbb;
    padding: 8px;

    .productcard-content {
      width: 100%;
      color:red;
      display: flex;
      justify-content: space-between;
      .productcard-l {
        display: flex;
        width: 400px;

        img {
          height: 100px;
        }

        .product-info {
          margin-left: 10px;
        }
      }
    }

    .el-dialog__body {
      padding: 0;
    }
  }
</style>
