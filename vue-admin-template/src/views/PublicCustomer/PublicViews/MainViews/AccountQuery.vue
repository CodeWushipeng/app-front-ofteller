<template>
  <div class="contractView">
    <div class="top_nav ng-scope" style="padding-top: 10px;">
      <span class="left-block"></span>
      <label class="top-nav-label">账户综合信息</label>
    </div>
    <div class="account-from">
      <div class="accountID">
        <el-input v-model="accountID">
          <template slot="prepend"
            >客户账号:</template
          >
        </el-input>
      </div>
      <el-button type="primary" icon="el-icon-search" @click="searchAccount"
        >查询</el-button
      >
    </div>
    <ul class="info-list">
      <li>
        <p class="type">子账户信息</p>
        <div class="info-wrap">
          <el-table :data="AccountData" border style="width: 100%">
            <el-table-column
              align="center"
              v-for="(item, index) in sonAccountData"
              :key="index"
              :label="item.label"
              :prop="item.value"
            ></el-table-column>
          </el-table>
        </div>
      </li>
      <li>
        <p class="type">账户综合信息</p>
        <div class="info-wrap">
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="账户综合信息" name="first">
              <el-card
                class="box-card"
                v-for="(item, index) in basicInfo"
                :key="index"
              >
                <div class="info-card">
                  <div class="title">
                    <span>基本信息</span>
                    <el-button type="primary" icon="el-icon-printer"
                      >打印</el-button
                    >
                  </div>
                  <div class="info-panel">
                    <div class="info-item">
                      <span>账户名称：</span>
                      {{ item.name }}
                    </div>
                    <div class="info-item">
                      <span>开户机构：</span>
                      {{ item.org }}
                    </div>
                    <div class="info-item">
                      <span>账户状态：</span>
                      {{ item.status }}
                    </div>
                    <div class="info-item">
                      <span>货币代号：</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>账户汇钞标志：</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>产品编号：</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>联名账户标志：</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>账户属性：</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>开户日期：</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>销户日期：</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>账户分类：</span>
                      {{ item.code }}
                    </div>
                  </div>
                </div>
                <div class="info-card">
                  <div class="title">
                    <span>账户信息</span>
                    <el-button type="primary" icon="el-icon-printer"
                      >打印</el-button
                    >
                  </div>
                  <div class="info-panel">
                    <div class="info-item">
                      <span>存款种类：</span>
                      {{ item.name }}
                    </div>
                    <div class="info-item">
                      <span>存期：</span>
                      {{ item.org }}
                    </div>
                    <div class="info-item">
                      <span>取现标志：</span>
                      {{ item.status }}
                    </div>
                    <div class="info-item">
                      <span>支取间隔：</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>计费标志：</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>计息标志：</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>是否简单计息：</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>起息方式：</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>到期日期：</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>到期执行利率：</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>利率浮动值：</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>利率浮动比例：</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>转存方式：</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>转存存期：</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>转存金额：</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>余额与总账同步标志：</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>是否对账标志：</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>对账范围：</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>最近对账日期：</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>是否需要年检：</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>最近账户核查日期：</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>主户账号：</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>登记日期：</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>电话号码：</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>账户有效期：</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>收息账号：</span>
                      {{ item.code }}
                    </div>
                  </div>
                </div>
                <div class="info-card">
                  <div class="title">
                    <span>账户余额</span>
                  </div>
                  <div class="info-panel">
                    <div class="info-item">
                      <span>账户余额：</span>
                      {{ item.name }}
                    </div>
                    <div class="info-item">
                      <span>可用余额：</span>
                      {{ item.org }}
                    </div>
                    <div class="info-item">
                      <span>可用额度：</span>
                      {{ item.status }}
                    </div>
                    <div class="info-item">
                      <span>冻结金额：</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>可冻金额：</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>控制金额：</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>开户金额：</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>转账支取标志:</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>现金支取标志:</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>账户金额冻结标志:</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>账户封闭冻结标志:</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>账户只付不收标志:</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>账户只收不付标志:</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>冻结状态:</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>控制状态:</span>
                      {{ item.code }}
                    </div>
                  </div>
                </div>
                <div class="info-card">
                  <div class="title">
                    <span>存入信息</span>
                  </div>
                  <div class="info-panel">
                    <div class="info-item">
                      <span>现金存入标志:</span>
                      {{ item.name }}
                    </div>
                    <div class="info-item">
                      <span>转账存入标志:</span>
                      {{ item.org }}
                    </div>
                    <div class="info-item">
                      <span>存入控制方式:</span>
                      {{ item.status }}
                    </div>
                    <div class="info-item">
                      <span>存入控制方法:</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>单次存入最小金额:</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>单次存入最大金额:</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>存入次数控制方式:</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>最小存入次数:</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>最大存入次数:</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>存入处理顺序:</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>账户留存最大余额:</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>存入金额控制方式:</span>
                      {{ item.code }}
                    </div>
                  </div>
                </div>
                <div class="info-card">
                  <div class="title">
                    <span>支取信息</span>
                  </div>
                  <div class="info-panel">
                    <div class="info-item">
                      <span>支取控制方式:</span>
                      {{ item.name }}
                    </div>
                    <div class="info-item">
                      <span>支取控制方法:</span>
                      {{ item.org }}
                    </div>
                    <div class="info-item">
                      <span>支取自定义控制:</span>
                      {{ item.status }}
                    </div>
                    <div class="info-item">
                      <span>支取预约方式:</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>支取金额控制方式:</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>单次支取最小金额:</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>单次支取最大金额:</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>支取次数控制方式:</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>最小支取次数:</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>最大支取次数:</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>支取违约标准:</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>支取违约处理方式:</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>保护性质:</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>支取保护顺序:</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>账户留存最小余额:</span>
                      {{ item.code }}
                    </div>
                  </div>
                </div>
                <div class="info-card">
                  <div class="title">
                    <span>凭证信息</span>
                  </div>
                  <div class="info-panel">
                    <div class="info-item">
                      <span>凭证种类:</span>
                      {{ item.name }}
                    </div>
                    <div class="info-item">
                      <span>凭证批号:</span>
                      {{ item.org }}
                    </div>
                    <div class="info-item">
                      <span>凭证序号:</span>
                      {{ item.status }}
                    </div>
                    <div class="info-item">
                      <span>凭证状态:</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>支付条件:</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>通兑范围:</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>现金通兑标志:</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>转账通兑标志:</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>凭证启用日期:</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>未登折数:</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>当前行数:</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>可购买支票量:</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>允许未用比例:</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>最后一次业务日期:</span>
                      {{ item.code }}
                    </div>
                  </div>
                </div>
                <div class="info-card">
                  <div class="title">
                    <span>辅助信息</span>
                  </div>
                  <div class="info-panel">
                    <div class="info-item">
                      <span>客户账号类型:</span>
                      {{ item.name }}
                    </div>
                    <div class="info-item">
                      <span>账户经理名称:</span>
                      {{ item.org }}
                    </div>
                    <div class="info-item">
                      <span>账户所属机构:</span>
                      {{ item.status }}
                    </div>
                    <div class="info-item">
                      <span>每期取款金额:</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>执行利率:</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>证件种类:</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>证件号码:</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>相关业务编号:</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>资金监管标志:</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>外汇监管标志:</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>年检状态:</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>核准件编号:</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>贷方累计限额:</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>上级机构:</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>基本户账号:</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>外管账户性质:</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>来源账户账号:</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>来源账户名称:</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>来源账户行号:</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>来源账户行名:</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>指定去向:</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>定向客户账号:</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>定向账户序号:</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>去向解除方式:</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>客户金额冻结标志:</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>客户封闭冻结标志:</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>客户只付不收标志:</span>
                      {{ item.code }}
                    </div>
                    <div class="info-item">
                      <span>客户只收不付标志:</span>
                      {{ item.code }}
                    </div>
                  </div>
                </div>
              </el-card>
            </el-tab-pane>
            <el-tab-pane label="交易明细" name="second">
              <div class="dateWrap">
                <span style="margin-right:20px;">起始日期-终止日期:</span>
                <el-date-picker
                  v-model="tradeDate"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                >
                </el-date-picker>
                <el-button type="primary" style="margin-left:10px"
                  >查询</el-button
                >
                <el-button type="primary">打印</el-button>
              </div>
              <el-table :data="tradeInfo" border style="width:100%">
                <el-table-column
                  v-for="(item, index) in tradConfig"
                  :key="index"
                  :label="item.label"
                  :prop="item.value"
                  align="center"
                >
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="挂失信息" name="third">
              <div class="dateWrap">
                <span style="margin-right:20px;">起始日期-终止日期:</span>
                <el-date-picker
                  v-model="tradeDate"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                >
                </el-date-picker>
                <el-button type="primary" style="margin-left:10px"
                  >查询</el-button
                >
              </div>
              <el-table :data="lossInfo" border style="width:100%">
                <el-table-column
                  v-for="(item, index) in lossConfig"
                  :key="index"
                  :label="item.label"
                  :prop="item.value"
                  align="center"
                >
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="冻结信息" name="fourth">
              <div class="dateWrap">
                <el-button type="primary" style="margin-left:10px"
                  >查询</el-button
                >
              </div>
              <el-table :data="freezeInfo" border style="width:100%">
                <el-table-column
                  v-for="(item, index) in freezeConfig"
                  :key="index"
                  :label="item.label"
                  :prop="item.value"
                  align="center"
                >
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {
  selectCustAccountList,
  selectPartyFinAccountTransList,
  selectPartyFinAccountList
} from "@/api/privateCustomer/index.js";
export default {
  data() {
    return {
      accountID: "",
      AccountData: [],
      sonAccountData: [
        {
          label: "客户账号",
          value: "finAccountCode"
        },
        {
          label: "子账户序号",
          value: "finAccountCode"
        },
        {
          label: "账户汇钞标志",
          value: "currencyUomId"
        },
        {
          label: "账户余额",
          value: "actualBalance"
        },
        {
          label: "可用余额",
          value: "availableBalance"
        },
        {
          label: "账户状态",
          value: "statusId"
        },
        {
          label: "存期",
          value: "statusId"
        },
        {
          label: "存款种类",
          value: "currencyUomId"
        },
        {
          label: "账户名称",
          value: "finAccountName"
        },
        {
          label: "开户日期",
          value: "fromDate"
        }
      ],
      tradeInfo: [],
      tradConfig: [
        {
          label: "客户账号",
          value: "finAccountId"
        },
        {
          label: "账户余额",
          value: "finAccountId"
        },
        {
          label: "借方发生额",
          value: "finAccountId"
        },
        {
          label: "贷方发生额",
          value: "finAccountId"
        },
        {
          label: "货币代号",
          value: "finAccountId"
        },
        {
          label: "交易日期",
          value: "finAccountId"
        },
        {
          label: "存款种类",
          value: "finAccountId"
        },
        {
          label: "产品编号",
          value: "finAccountId"
        },
        {
          label: "对方客户账号",
          value: "finAccountTransId"
        },
        {
          label: "借贷标志",
          value: "entryDate"
        },
        {
          label: "摘要描述",
          value: "transactionDate"
        },
        {
          label: "备注信息",
          value: "amount"
        }
        // {
        //   label: "支付方式",
        //   value: "paymentId"
        // }
      ],
      lossInfo: [],
      lossConfig: [
        {
          label: "挂失处理编号",
          value: ""
        },
        {
          label: "挂失解挂标志",
          value: ""
        },
        {
          label: "交易柜员",
          value: ""
        },
        {
          label: "摘要描述",
          value: ""
        },
        {
          label: "渠道",
          value: ""
        },
        {
          label: "客户账号类型",
          value: ""
        },
        {
          label: "凭证种类",
          value: ""
        },
        {
          label: "挂失日期",
          value: ""
        },
        {
          label: "解挂日期",
          value: ""
        }
      ],
      freezeInfo: [],
      freezeConfig: [
        {
          label: "负债账号",
          value: ""
        },
        {
          label: "子账户序号",
          value: ""
        },
        {
          label: "冻结编号",
          value: ""
        },
        {
          label: "限制类型",
          value: ""
        },
        {
          label: "解冻标志",
          value: ""
        },
        {
          label: "需冻控金额",
          value: ""
        },
        {
          label: "现冻控金额",
          value: ""
        },
        {
          label: "累计解冻控金额",
          value: ""
        },
        {
          label: "冻结时间",
          value: ""
        },
        {
          label: "冻结起始日期",
          value: ""
        },
        {
          label: "冻结终止日期",
          value: ""
        },
        {
          label: "冻结范围",
          value: ""
        },
        {
          label: "冻结指令来源",
          value: ""
        },
        {
          label: "冻结事项",
          value: ""
        },
      ],
      activeName: "first",
      // basicInfo: {
      //   name: "活期存款账户",
      //   org: "中国人民银行",
      //   status: "正常",
      //   code: "01",
      // },
      basicInfo: ["1"],
      tradeDate: ""
    };
  },
  mounted() {
    if (this.activeName == "first") {
      this.searchAccountList();
    }
  },
  methods: {
    // 查询账户信息
    searchAccount() {
      let data = {
        finAccountId: "",
        finAccountTypeId: "",
        statusId: "",
        ownerPartyId: "",
        productId: "",
        productName: "",
        orderId: "",
        finAccountCode: "",
        finAccountPin: "",
        currencyUomId: "",
        organizationPartyId: "",
        pageNum: "",
        pageSize: ""
      };
      selectCustAccountList(data)
        .then(res => {
          if (res.header.RetCode == "000000") {
            this.AccountData = res.body[0].accountList;
            console.log(this.AccountData);
          } else {
            this.$message({
              type: "error",
              message: "查询账户信息失败"
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 内层账户综合信息接口
    searchAccountList() {
      let data = {
        finAccountId: "",
        finAccountTypeId: "",
        statusId: "",
        ownerPartyId: "",
        productId: "",
        productName: "",
        orderId: "",
        finAccountCode: "",
        finAccountPin: "",
        currencyUomId: "",
        organizationPartyId: "",
        pageNum: "1",
        pageSize: "10"
      };
      selectPartyFinAccountList(data)
        .then(res => {
          if (res.header.RetCode == "000000") {
            this.basicInfo = res.body;
          } else {
            this.$message({
              type: "error",
              message: "查询账户详情失败"
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 查询账户交易信息
    searchTradeInfo() {
      let data = {
        finAccountTransId: "",
        finAccountTransTypeId: "",
        finAccountTransTypeDesc: "",
        finAccountId: "",
        partyId: "",
        transactionDateStart: "",
        transactionDateEnd: "",
        amount: "",
        paymentId: "",
        orderId: "",
        pageNum: "",
        pageSize: ""
      };
      selectPartyFinAccountTransList(data)
        .then(res => {
          if (res.header.RetCode == "000000") {
            this.tradeInfo = res.body;
          } else {
            this.$message({
              type: "error",
              message: "查询账户交易信息失败"
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleClick(tab, event) {
      if (tab.label == "交易明细") {
        this.searchTradeInfo();
      } else if (tab.label == "账户综合信息") {
        this.searchAccountList();
      }
      console.log(tab, event);
    }
  }
};
</script>

<style lang="scss" scoped>
.contractView {
  padding: 10px 20px;
  .top_nav {
    height: 40px;
    border-bottom: 1px solid #e2e2e2;
    background-color: #dddddd;
    .left-block {
      border: 2px solid #307fee;
      font-size: 16px;
      margin-left: 20px;
      margin-right: 10px;
    }
    label {
      display: inline-block;
      max-width: 100%;
      margin-bottom: 5px;
      font-weight: 700;
    }
    .top-nav-label {
      color: #000000;
      font-family: "微软雅黑", "regular";
      font-size: 14px;
    }
  }
  .account-from {
    display: flex;
    margin: 20px 0;
    .accountID {
      width: 400px;
      margin-right: 60px;
    }
  }
  .type {
    height: 40px;
    font-size: 14px;
    line-height: 40px;
    border-bottom: 1px solid #333;
    margin-bottom: 30px;
  }
  .info-card,
  .info-list {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .title {
    background-color: #f5f5f5;
    height: 50px;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
  }
  .el-card__body {
    padding: 0;
  }
  .info-panel {
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
    font-size: 14px;
    .info-item {
      margin-bottom: 20px;
      font-size: 12px;
      width: 25%;
    }
  }
  .dateWrap {
    display: flex;
    width: 100%;
    height: 60px;
    background: #f5f5f5;
    justify-content: center;
    align-items: center;
  }
}
</style>
