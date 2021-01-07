import {
  queryCatalogTreeForChannelOrg,
  queryProdListForCategory
} from "@/api/financialProduct/financialproduct";
import { RES_OK } from "@/api/config";

// 获取产品树
export function ajaxProductTree(catalogAlias) {

  let params = {
    "catalogAlias": catalogAlias,
    "channelId": "1234",
    "orgId": "800000",
  }
  return queryCatalogTreeForChannelOrg(params).then(data => {
    if(data.header.rspCode == RES_OK){
      return productTreeFommat({
        arrayList: data.body.ctlgList,
        pidStr: "parentId",
        idStr: "ctlgId"
      })[0].children;
    }else{
      alert(data.header.RetMsg)
    }
  });
}

// 获取产品产品目录
export function ajaxQueryProdListForCategory(categoryId , menuSelected) {
  let params = {
    "channelId": "10",
    "productStoreId":"xj10000",
    "categoryId":categoryId
  }
  return queryProdListForCategory(params).then(data => {
    if(data.header.rspCode == RES_OK){
      return data.body.productList.find(item => item.availableProduct.productId == menuSelected)
    }else{
      alert(data.header.RetMsg)
    }
  });
}

// 格式化产品树数据
export function productTreeFommat({
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
}



