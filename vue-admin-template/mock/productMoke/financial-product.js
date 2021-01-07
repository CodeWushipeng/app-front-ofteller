import Mock from 'mockjs'
import productMenu from './product-menu'
import productList from './product-list'

export default [
  {
    url: '/queryCatalogTreeForChannelOrg',
    type: 'post',
    response: config => {
      return productMenu
    }
  },
  {
    url: '/queryProdViaChannelOrgCataType',
    type: 'post',
    response: config => {
      return productList
    }
  }
]
