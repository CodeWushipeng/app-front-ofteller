<template>
  <div>
    <el-container>
        <el-header height="40px">订单管理</el-header>
        <el-main>
            <el-form :inline="true" :model="searchForm" class="demo-form-inline">
                <el-form-item label="订单编号">
                    <el-input v-model="searchForm.id" placeholder="请输入订单编号"></el-input>
                </el-form-item>
                <el-form-item label="订单类型">
                    <el-select v-model="searchForm.type" placeholder="请选择订单类型">
                    <el-option label="全部" value="0"></el-option>
                    <el-option label="销售订单" value="1"></el-option>
                    <el-option label="采购订单" value="2"></el-option>
                    <el-option label="批量订单" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="订单状态">
                    <el-select v-model="searchForm.state" placeholder="请选择订单状态">
                    <el-option label="已创建" value="0"></el-option>
                    <el-option label="已核准" value="1"></el-option>
                    <el-option label="已完成" value="2"></el-option>
                    <el-option label="已取消" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="下单时间">
                    <el-date-picker
                        v-model="searchForm.time"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
            <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                    label="订单编号"
                    width="180">
                  <template slot-scope="scope">
                    <span>{{ scope.row.orderId }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                    label="订单名称"
                    width="180">
                  <template slot-scope="scope">
                    <span>{{ scope.row.name }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                    label="订单金额">
                  <template slot-scope="scope">
                    <span>{{ scope.row.address }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                    label="订单状态">
                  <template slot-scope="scope">
                    <span>{{ scope.row.status }}</span>
                  </template>
                </el-table-column>
                <el-table-column>
                    <template slot-scope="scope">
                        <el-button @click="handleDetail(scope.row.orderId)" type="primary">详情</el-button>
                        <el-button type="primary">打印</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-main>
    </el-container>

    <el-dialog
      title="订单详情"
      :visible.sync="dialogVisible"
      width="50%">
      <div>
        <el-form ref="detailObj" :model="detailObj" label-width="120px">
          <el-form-item label="订单交易时间">
            <el-input v-model="detailObj.entryDate" readonly ></el-input>
          </el-form-item>
          <el-form-item label="订单ID">
            <el-input v-model="detailObj.orderId" readonly></el-input>
          </el-form-item>
          <el-form-item label="订单名称">
            <el-input v-model="detailObj.orderName" readonly></el-input>
          </el-form-item>
          <el-form-item label="订单金额">
            <el-input v-model="detailObj.orderAmount" readonly></el-input>
          </el-form-item>
          <el-form-item label="订单状态">
            <el-input v-model="detailObj.orderStatusIdDescription" readonly></el-input>
          </el-form-item>

          <el-form-item>
            <!--<el-button type="primary" >立即创建</el-button>-->
            <el-button @click="dialogVisible = false" type="info">关闭</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { queryOrderList , queryOrderBasicInfo } from '@/api/orderAPI'

export default {
    data() {
        return {
          searchForm: {
              id: '',
              type: '',
              state: '',
              time: ''
          },
          dialogVisible:false,
          tableData: new Array(),
          detailObj:{
            entryDate:"",
            orderAmount:"",
            orderId:"",
            orderName:"",
            orderStatusIdDescription:"",
          }
        }
    },
    methods: {
      handleDetail(orderId){
        this.getQueryOrderBasicInfo(orderId)
        this.dialogVisible = true;
      },
      getQueryOrderList(){
        let params = {
          Header : {
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
          },
          "partyId":"1001760000"
        }
        let _this = this
        queryOrderList(params).then(data => {
          if(data.body && data.body.length > 0){
            _this.tableData = new Array()
            Object.keys(data.body).forEach(index => {
              const orderObj = data.body[index]
              const temp = new Object()
              temp.orderId = orderObj.orderId
              temp.date = orderObj.entryDate
              temp.name = orderObj.orderName
              temp.address = orderObj.orderAmount
              temp.status = orderObj.orderStatusIdDescription
              _this.tableData.push(temp)
            })
          }
        });
      },
      getQueryOrderBasicInfo(orderId){
        let params = {
          "orderId":orderId
        }
        let _this = this
        queryOrderBasicInfo(params).then(data => {
          if(data.orderHeader){
            _this.detailObj.entryDate =  data.orderHeader.entryDate
            _this.detailObj.orderAmount =  data.orderHeader.orderAmount
            _this.detailObj.orderId =  data.orderHeader.orderId
            _this.detailObj.orderName =  data.orderHeader.orderName
            _this.detailObj.orderStatusIdDescription =  data.orderHeader.orderStatusIdDescription
          }
        });
      },
      onSubmit() {
          console.log('submit!');
      }
    },
    created(){
      this.getQueryOrderList()
    },
}
</script>

<style lang="scss" scoped>
    .el-header {
        line-height: 40px;
        background-color: #304156;
        color: #fff;
    }
</style>

