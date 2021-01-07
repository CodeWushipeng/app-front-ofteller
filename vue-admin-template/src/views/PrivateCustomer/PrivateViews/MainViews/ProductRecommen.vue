<template>
  <el-container style="height: 100%">
    <el-header>
      <header>
        <template v-for="item in iframeRecommenView">
          <a  href="javascript:void(0)"
              class="heade-tab"
              :class="{ active: recommenMainState == item.viewKey }"
              @click="handleHeadeSelect(item.viewKey)"
          >
            {{item.viewName}}
            <i class="el-icon-close" v-if=item.closeIf @click.stop="closeCustomVieww( item.viewKey )"></i>
          </a>
        </template>

      </header>
    </el-header>
    <el-main>
      <!--<template v-for="item in unInitRecommenDom">
        <div class="product-view" :id="item" v-show="privateMainState == item" >
          <iframe :id='"iframe_" + item' @load="iframeLoad(item)" :src="item" frameborder="0" class="iframe-style" scrolling="auto"></iframe>
        </div>
      </template>-->
      <iframe width="100%" height="100%" :srcdoc="productHtml" frameborder="0" id="myFrameName"></iframe>

      <el-dialog
        title="产品详情"
        :visible.sync="dialogVisible"
        :close-on-click-modal="true">
        <iframe v-if="iframeUrl" width="100%" height="600" :src="iframeUrl" frameborder="0"></iframe>
        <iframe v-else width="100%" height="600" :srcdoc="iframeHtml" frameborder="0"></iframe>
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script>
import {
  queryCatalogTreeForChannelOrg,
  queryProdListForCategory
} from "@/api/financialProduct/financialproduct";
import { productAnay } from '@/utils/productOrderManger'
import { queryTemplete } from '@/api/financialProduct/templete'

export default {
  data() {
    return {
      recommenMainState:"HOT_SAL_PRD",
      dialogVisible: false,
      productHtml:"",
      iframeUrl: '',
      iframeHtml: '',
      iframeRecommenView:[{
          viewKey:"PRM_SAL_PRD",
          viewName:"促销产品",
          closeIf:false
        },{
          viewKey:"HOT_SAL_PRD",
          viewName:"热销产品",
          closeIf:false
        },{
          viewKey:"1",
          viewName:"系统推荐",
          closeIf:false
        },{
          viewKey:"2",
          viewName:"我的关注",
          closeIf:false
        },{
          viewKey:"3",
          viewName:"我的收藏",
          closeIf:false
        },
      ]
    };
  },

  methods: {
    dialogHandler(templateCode, productId) {
      let params = {
        templateCode: templateCode,
        templateType: productId
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
    handleHeadeSelect(value) {
      this.recommenMainState = value;
    },
    ajaxProductTree(val) {
      // 异步获取产品树
      let params = {
        "channelId": "10",
        "orgId":"801102",
        "prodCatalogType": val ? val : "PRM_SAL_PRD"
      }
      queryCatalogTreeForChannelOrg(params).then(data => {
        if (data.Header.RetCode == "000000"){
          let productTree = this.productTreeFommat({
            arrayList: data.ctlgList,
            pidStr: "parentId",
            idStr: "ctlgId"
          })[0].children;
          this.ajaxQueryProdListForCategory(productTree[0].parentId)
        }else{
          alert(data.Header.RetMsg)
          this.productHtml = ""
        }
      });
    },
    ajaxQueryProdListForCategory(categoryId){
      let params = {
        "channelId": "10",
        "productStoreId":"xj10000",
        "categoryId":categoryId
      }
      queryProdListForCategory(params).then(data => {
        if(data.Header.RetCode == "000000"){
          let productInfoAnay = productAnay(data.productList)

          var TempleteInput = new Object()
          TempleteInput.productInfo = productInfoAnay
          this.ajaxTemplateTest(TempleteInput)
        }else{
          alert(data.Header.RetMsg)
        }
      });
    },
    ajaxTemplateTest(TempleteInput) {
      console.log("TempleteInput: ",JSON.stringify(TempleteInput))
      let params = {
        templateCode: "order_33333",
        templateType: "0002",

        inputParam: TempleteInput
        //dataArgs: dataArgs
      }
      let that = this
      queryTemplete(params).then(data => {
        that.productHtml = data.data
      })
    },
    // 格式化产品树数据
    productTreeFommat({
      arrayList,
      pidStr = "pid",
      idStr = "id",
      childrenStr = "children"
    }) {
      let listOjb = {}; // 用来储存{key: obj}格式的对象
      let treeList = []; // 用来储存最终树形结构数据的数组
      for (let i = 0; i < arrayList.length; i++) {
        // 将数据变换成{key: obj}格式，方便下面处理数据
        listOjb[arrayList[i][idStr]] = arrayList[i];
      }
      for (let j = 0; j < arrayList.length; j++) {
        // 根据pid来将数据进行格式化
        let haveParent = listOjb[arrayList[j][pidStr]]; // 判断父级是否存在
        if (haveParent) {
          !haveParent[childrenStr] && (haveParent[childrenStr] = []); // 如果有没有父级children字段，就创建一个children字段
          haveParent[childrenStr].push(arrayList[j]); // 在父级里插入子项
        } else {
          treeList.push(arrayList[j]); // 如果没有父级直接插入到最外层
        }
      }
      return treeList;
    },
  },
  created() {
    //todo
    //this.ajaxProductTree(this.recommenMainState);
    let self = this
    window.showRecommenDetail = (templateCode, productId)=>{
      self.dialogHandler(templateCode, productId)
    }
  },
  watch: {
    "recommenMainState": {
      deep: true,
      handler(val) {
        //todo
        //this.ajaxProductTree(val)
      },
    },
  },
};
</script>

<style lang="stylus" scoped>
  .el-container
    .el-header
      height 40px !important
      padding-left: 10px;
      border-left: 5px solid #176AA8;
      background-color white
      .heade-tab
        background-color: transparent;
        margin-top 10px
        height: 30px;
        line-height: 30px;
        display: inline-block;
        width: 120px;
        text-align: center;
        font-size: 14px;
        font-weight: 500;
        position: relative;
        cursor: pointer;
        &.active
          border-bottom: 4px solid blue;
    .el-main
      height:100%
      padding 0 !important
      margin-top 20px
      background-color white
      .productcard-l
        display: flex;
        width: 400px;
        img
          height: 100px;
        .product-info
          margin-left: 10px;
  /*.product-card {
    width: 100%;
    height: 150px;
    border-bottom: 1px solid #bbb;
    padding: 8px;

    .productcard-content {
      width: 100%;
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
  }*/
</style>
