import Mock from 'mockjs'


const flowList = Mock.mock({
  'list|4': [{
    'id|+1': 10001,
    'menuCode|1': ['M0003','M0004','M0005','M0006',],
    "menuCssIcon": "css-icon",
    "menuHidden": "2",
    'menuName|1': ['流控列表', '流控Demo',],
    'parentMenuCode|1': ['M0001'],
    'menuPath|1': ['flow1', 'flow2', 'flow3','flow4','flow5'],
    "pathMethod": "",
    'menuOrder|+1': 1,
    "isMenu": '1',
    'assUrl': "flow/index2",

  }]
})


const flowList2 = Mock.mock({
  'list|3': [{
    'id|+1': 11001,
    'menuCode|1': ['M0007','M0008','M0009','M00010'],
    "menuCssIcon": "css-icon",
    "menuHidden": "2",
    'menuName|1': ['菜单1', '菜单2',],
    'parentMenuCode|1': ['M0002'],
    'menuPath|1': ['menu1', 'menu2', 'menu3','menu4','menu5'],
    "pathMethod": "",
    'menuOrder|+1': 11,
    "isMenu": '1',
    'assUrl': "menu/menu1",

  }]
})


const parent = Mock.mock({
  'list': [
    {
      'id|+1': 20001,
      'menuCode|1': ['M0001'],
      "menuCssIcon": "css-icon",
      "menuHidden": "2",
      'menuName|1': ['流控管理'],
      'parentMenuCode': [''],
      'menuPath|1': ['flow'],
      "pathMethod": "",
      'menuOrder': 21,
      "isMenu": '1',
      'assUrl': "flow/index11",
    },
    {
      'id|+1': 20002,
      'menuCode|1': ['M0002'],
      "menuCssIcon": "css-icon",
      "menuHidden": "2",
      'menuName|1': ['菜单管理'],
      'parentMenuCode': [''],
      'menuPath|1': ['flow'],
      "pathMethod": "",
      'menuOrder': 23,
      "isMenu": '1',
      'assUrl': "menu/menu",
    }

  ]
})


const qryFlowDetail = Mock.mock({
  define: {
    flowCode: "10010",
    flowName: "交易",
    flowDescribe: "10010",
    projectId: "委分自厂习法",
    subProjectId: "于易究儿种建明行员"
  },
  detail:[
    {
      "id": 1,
      "nodeCode": "AA",
      "nodeName": "开始节点",
      "flowCode": 10001,
      "flowName": "还款",
      "type": "01",
      "checkStart": "",
      "rollback": "",
      "rollbackData": "",
      "returnNode": "",
      "nextNode": "BB",
      "inputConfig": "",
      "inputFormCode": "",
      "outputFromCode": "",
      "commitType": "",
      "commitFunc": "",
      "checkParam": "",
      "authParam": "",
      "preNode": [],
      "asyn_data": "getUser",
      "ico": "el-icon-user",
      "nodeId": "k3lnhrg4ri",
      "mapLeft": "51px",
      "mapTop": "41px",
      "state": "success"
    },
    {
      "id": 3,
      "nodeCode": "BB",
      "nodeName": "表单节点",
      "flowCode": 10001,
      "flowName": "还款",
      "type": "03",
      "checkStart": "",
      "rollback": "",
      "rollbackData": "",
      "returnNode": "",
      "nextNode": "CC,DD",
      "inputConfig": "",
      "inputFormCode": "",
      "outputFromCode": "",
      "commitType": "",
      "commitFunc": "",
      "checkParam": "",
      "authParam": "",
      "preNode": [
        "AA"
      ],
      "asyn_data": "getUser",
      "ico": "el-icon-notebook-2",
      "nodeId": "ql7wv7ox04",
      "mapLeft": "68px",
      "mapTop": "191px",
      "state": "success"
    },
    {
      "id": 4,
      "nodeCode": "CC",
      "nodeName": "复核节点",
      "flowCode": 10001,
      "flowName": "还款",
      "type": "04",
      "checkStart": "",
      "rollback": "",
      "rollbackData": "",
      "returnNode": "",
      "nextNode": "DD",
      "inputConfig": "",
      "inputFormCode": "",
      "outputFromCode": "",
      "commitType": "",
      "commitFunc": "",
      "checkParam": "",
      "authParam": "",
      "preNode": [
        "BB"
      ],
      "asyn_data": "getUser",
      "ico": "el-icon-circle-check",
      "nodeId": "cd4xwpdl4f",
      "mapLeft": "50px",
      "mapTop": "345px",
      "state": "success"
    },
    {
      "id": 2,
      "nodeCode": "DD",
      "nodeName": "结束节点",
      "flowCode": 10001,
      "flowName": "还款",
      "type": "02",
      "checkStart": "",
      "rollback": "",
      "rollbackData": "",
      "returnNode": "",
      "nextNode": "",
      "inputConfig": "",
      "inputFormCode": "",
      "outputFromCode": "",
      "commitType": "",
      "commitFunc": "",
      "checkParam": "",
      "authParam": "",
      "preNode": [
        "CC",
        "BB"
      ],
      "asyn_data": "getUser",
      "ico": "el-icon-time",
      "nodeId": "mtlw0tzv5u",
      "mapLeft": "445px",
      "mapTop": "181px",
      "state": "success"
    }
  ]
})

export default [
  //查询流程列表
  {
    url: '/menus/findAlls',
    type: 'post',
    response: config => {


      return  {
        statusCode: 200,
        body:{
          define:{
            records:flowList.list.concat(parent.list).concat(flowList2.list)
            // records:flowList.list
          }
        },
        header:{
          rspStatus:'成功'
        }
      }
    }
  },
  // 新增流程定义
  {
    url: '/insertDefine',
    type: 'post',
    response: config => {
      return  {
        body:null,
        header:{
          rspStatus:'成功'
        }
      }
    }
  },
  // 删除流程定义
  {
    url: '/deleteDefine',
    type: 'post',
    response: config => {
      return  {
        body:null,
        header:{
          rspStatus:'成功'
        }
      }
    }
  },
  // 查询节点明细
  {
    url: '/qryFlowDetail',
    type: 'post',
    response: config => {
      return  {
        statusCode: 200,
        body:{
          define:qryFlowDetail.define,
          detail:{
            records: qryFlowDetail.detail
          }
        },
        header:{
          rspStatus:'成功'
        }
      }
    }
  },
  // 新增节点明细
  {
    url: '/insertDetail',
    type: 'post',
    response: config => {
      return  {
        body:null,
        header:{
          rspStatus:'成功'
        }
      }
    }
  },
  // 修改流程节点信息
  {
    url: '/alterFlow',
    type: 'post',
    response: config => {
      return  {
        body:null,
        header:{
          rspStatus:'成功'
        }
      }
    }
  },
  // 修改流程信息
  {
    url: '/alterFlowDefine',
    type: 'post',
    response: config => {
      return  {
        body:null,
        header:{
          rspStatus:'成功'
        }
      }
    }
  }
]











