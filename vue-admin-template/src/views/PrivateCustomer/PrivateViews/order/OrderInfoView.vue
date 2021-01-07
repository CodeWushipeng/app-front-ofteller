<template>
    <div class="order-info-view">
      <el-container>
        <el-header class="top_nav" style="padding-top: 10px;">
          <span class="left-block"></span>
          <label class="top-nav-label">销售</label>
        </el-header>
        <!--{{flowParamsInfo}}
        {{productInfo}}-->
        <el-main>
          <div class="cust-table-cont">
            <div class="cust-table-tit-r">订单数量（{{orderItems.length}}）</div>
            <el-table
              :data="orderItems" style="width:100%" border header-row-class-name="cust-table-sty">
              <el-table-column prop="productId" label="产品编号" align="center"></el-table-column>
              <el-table-column prop="productName" label="产品名称" align="center"></el-table-column>
              <el-table-column prop="productFunctionName" label="产品功能" align="center"></el-table-column>
              <el-table-column prop="showOrderAmount" label="金额" align="center"></el-table-column>
              <el-table-column prop="desc" label="备注" align="center"></el-table-column>
              <el-table-column prop="promoDesc" label="促销信息" align="center"></el-table-column>
            </el-table>
            <div class="pay-sts">
              <el-button type="primary" @click="openDiaChangePaySts">订单支付方式选择</el-button>
            </div>
            <div class="pay-method-sel">
              <div v-show="paymentMethodTypeId=='CASH_CACLACC'">
                <div>现金待销账</div>
                <el-form :inline="false" :model="maincom" size="mini" label-width="150px" label-position="left">
                  <el-form-item label="现金项目代码">
                    <el-select v-model="maincom.cashCaseCodeForSell" placeholder="请选择">
                      <el-option
                        v-for="(item,index) in DICTS.cus_projectCashCode"
                        :key="index"
                        :label="item.text2"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
              </div>
              <div v-show="paymentMethodTypeId=='CORPORAT_EACCOUNT'">
                <div>本行对公账号</div>
                <el-form :inline="false" :model="maincom" size="mini" label-width="150px" label-position="left">
                  <el-form-item label="付款账户">
                    <el-input v-model="maincom.accountNumberForSell"></el-input>
                  </el-form-item>
                  <el-form-item label="付款账户户名">
                    <el-input v-model="maincom.accountNameForSell"></el-input>
                  </el-form-item>
                  <el-form-item label="账户开户行号/机构">
                    <el-input v-model="maincom.paymentIssuerPartyIdForSell"></el-input>
                  </el-form-item>
                  <el-form-item label="支付方式">
                    <el-select v-model="maincom.agreementTypeFeeForSell" placeholder="请选择">
                      <el-option
                        v-for="(item,index) in []"
                        :key="index"
                        :label="item.text2"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="授权协议内容">
                    <el-input v-model="maincom.agreementContentNameForBatch"></el-input>
                  </el-form-item>
                  <el-form-item label="凭证种类">
                    <el-select v-model="maincom.certificateTypeFeeForSell" placeholder="请选择">
                      <el-option
                        v-for="(item,index) in DICTS.cus_certificateType"
                        :key="index"
                        :label="item.text2"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="凭证号码">
                    <el-input v-model="maincom.certificateIdFeeForSell"></el-input>
                  </el-form-item>
                  <el-form-item label="凭证批次">
                    <el-input v-model="maincom.certificateBatchFeeForSell"></el-input>
                  </el-form-item>
                  <el-form-item label="出票日期">
                    <el-input v-model="maincom.chequeNoteDateFeeForSell"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-show="paymentMethodTypeId=='DEBIT_CARD'">
                <div>本行借记卡</div>
                <el-form :inline="false" :model="maincom" size="mini" label-width="150px" label-position="left">
                  <el-form-item label="付款账户">
                    <el-input v-model="maincom.accountNumberForSell"></el-input>
                  </el-form-item>
                  <el-form-item label="付款账户户名">
                    <el-input v-model="maincom.accountNameForSell"></el-input>
                  </el-form-item>
                  <el-form-item label="支付方式">
                    <el-select v-model="maincom.agreementTypeFeeForSell" placeholder="请选择">
                      <el-option
                        v-for="(item,index) in []"
                        :key="index"
                        :label="item.text2"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="授权协议内容">
                    <el-input v-model="maincom.agreementContentNameForBatch"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-show="paymentMethodTypeId=='STAY_CACLACC'">
                <div>代销帐</div>
                <el-form :inline="false" :model="maincom" size="mini" label-width="150px" label-position="left">
                  <el-form-item label="付款账户">
                    <el-input v-model="maincom.accountNumberForSell"></el-input>
                  </el-form-item>
                  <el-form-item label="付款账户户名">
                    <el-input v-model="maincom.accountNameForSell"></el-input>
                  </el-form-item>
                  <el-form-item label="账户开户行号/机构">
                    <el-input v-model="maincom.paymentIssuerPartyIdForSell"></el-input>
                  </el-form-item>
                  <el-form-item label="待销账来源账号">
                    <el-input v-model="maincom.drwAcctForSell"></el-input>
                  </el-form-item>
                  <el-form-item label="待销账来源账号子账户序号">
                    <el-input v-model="maincom.subPyrAcctNumForSell"></el-input>
                  </el-form-item>
                  <el-form-item label="待销账来源户名">
                    <el-input v-model="maincom.drawNmForSell"></el-input>
                  </el-form-item>
                  <el-form-item label="待销账来源账户类型">
                    <el-input v-model="maincom.pymtAcctTpForSell"></el-input>
                  </el-form-item>
                </el-form>
              </div>

            </div>
            <div class="cust-table-tit-l">金额汇总</div>
            <el-row class="font-14">
              <el-col :span="8">费用种类</el-col>
              <el-col :span="8">币种</el-col>
              <el-col :span="8">金额</el-col>
              <el-col :span="8">订单总金额</el-col>
              <el-col :span="8">人民币</el-col>
              <el-col :span="8">{{flowParamsInfo.flowOrderInfo && flowParamsInfo.flowOrderInfo.price}}</el-col>
              <el-col :span="8">费用金额</el-col>
              <el-col :span="8">人民币</el-col>
              <el-col :span="8">{{flowParamsInfo.flowOrderInfo && flowParamsInfo.flowOrderInfo.price}}</el-col>
            </el-row>
          </div>
        </el-main>
        <el-footer>
        <el-button type="primary" @click="dialogIMVisible = true"><i class="el-icon-edit-outline"></i>修改</el-button>
          <el-button type="primary" class="footer-btn-l" @click="orderControlSubmitClickForSell"><i class="el-icon-shopping-cart-2"></i>结算</el-button>
          <div>合计：{{flowParamsInfo.flowOrderInfo && flowParamsInfo.flowOrderInfo.price}}元</div>
        </el-footer>
      </el-container>

      <el-dialog
        title="选择支付方式"
        :visible.sync="dialogVisible"
        width="50%">
        <div>
          <el-row>
            <el-col :span="24" class="change-pay-sts">现金待销账<el-button type="primary" size="mini" @click="changePaySts('CASH_CACLACC')">选择</el-button></el-col>
            <el-col :span="24" class="change-pay-sts">本行对公账号<el-button type="primary" size="mini" @click="changePaySts('CORPORAT_EACCOUNT')">选择</el-button></el-col>
            <el-col :span="24" class="change-pay-sts">本行借记卡<el-button type="primary" size="mini" @click="changePaySts('DEBIT_CARD')">选择</el-button></el-col>
            <el-col :span="24" class="change-pay-sts">代销帐<el-button type="primary" size="mini" @click="changePaySts('STAY_CACLACC')">选择</el-button></el-col>
          </el-row>
        </div>
      </el-dialog>
    </div>
</template>

<script>
import { sellOrder } from './sell_order.js';

export default {
  name: "OrderInfoView",
  mixins: [sellOrder],

}
</script>

<style lang="stylus" scoped>
  .order-info-view
    position: relative;
    height: 100%;
    .el-container
      height: 100%;

      .top_nav
          width: 100%;
          height: 40px!important;
          border-bottom: 1px solid #e2e2e2;
          background-color: #dddddd;
          .left-block
            border: 2px solid #307fee;
            font-size: 16px;
            margin-left: 20px;
            margin-right: 10px;
          label
            display: inline-block;
            max-width: 100%;
            margin-bottom: 5px;
            font-weight: 700;
          .top-nav-label
            color: #000000;
            font-family: "微软雅黑", "regular";
            font-size: 14px;
      .el-main
        overflow-y: scroll;
        padding: 0
        background-color: #FFF
        padding:15px 15px 0;
        .cust-table-cont
          margin: 0 auto;
          /deep/.cust-table-sty
            color: #000;
            line-height: 24px;
            font-weight: bold;
            font-size: 12px;
            text-align: center;
          .pay-sts
            margin-top: 15px;
          .cust-table-tit-r
            text-align: right;
            font-size: 14px;
            color: #333;
            padding: 3px 15px 6px;
          .cust-table-tit-l
            margin-top: 15px;
            font-size: 14px;
            color: #333;
            padding: 15px 0
            border-bottom: 1px solid #e4d5d5;
          .font-14
            font-size: 14px;
            line-height: 23px;
          .pay-method-sel
            margin-top: 30px;
            font-size: 14px;
      .el-footer
        display: flex;
        flex-direction: row-reverse;
        width:100%;
        background-color: #fff;
        height: 40px!important;
        line-height: 40px;
        padding-right: 30px;
        margin-bottom: 20px;
        .footer-btn-l
          margin-right: 10px;
    .el-dialog
      .change-pay-sts
        display: flex;
        line-height: 40px;
        border-bottom: 1px solid #eee;
        justify-content: space-between;
        align-items: center;
        .el-button
          height: 30px;
          display: block;
</style>
