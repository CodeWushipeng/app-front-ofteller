<template>
  <div class="account-wrap">
    <div class="top_nav ng-scope" style="padding-top: 10px;">
      <span class="left-block"></span>
      <label class="top-nav-label">综合签约</label>
    </div>
    <div class="main">
      <div class="account-from">
        <div class="accountID">
          <div class="preText">当前账号:</div>
          <input class="accountInput" v-model="accountID" />
        </div>
        <div class="search" @click="searchAccount">查询</div>
      </div>
      <ul class="info-list">
        <li>
          <p class="type">渠道类</p>
          <!-- <p class="type">{{item.description}}</p> -->
          <div class="info-wrap">
            <el-table
              :data="canelData"
              border
              style="width: 100%"
              :show-header="status"
            >
              <el-table-column align="center" prop="canel"></el-table-column>
              <el-table-column align="center" prop="level"></el-table-column>
              <el-table-column align="center" prop="status"></el-table-column>
              <el-table-column align="center">
                <template>
                  <el-button
                    icon="el-icon-search"
                    type="text"
                    @click="searchAccount"
                    >查询</el-button
                  >
                </template>
              </el-table-column>
              <el-table-column align="center">
                <template>
                  <el-button icon="el-icon-document" type="text"
                    >签约</el-button
                  >
                </template>
              </el-table-column>
              <el-table-column align="center">
                <template>
                  <el-button icon="el-icon-edit" type="text">修改</el-button>
                </template>
              </el-table-column>
              <el-table-column align="center">
                <template>
                  <el-button icon="el-icon-document-delete" type="text"
                    >解约</el-button
                  >
                </template>
              </el-table-column>
              <!-- <el-table-column align="center">
              <template>
                <el-button icon="el-icon-refresh" type="primary" plain>重置</el-button>
              </template>
            </el-table-column> -->
            </el-table>
          </div>
        </li>
        <li>
          <p class="type">其他类</p>
          <div class="info-wrap">
            <el-table
              :data="otherData"
              border
              style="width: 100%"
              :show-header="status"
            >
              <el-table-column align="center" prop="canel"></el-table-column>
              <el-table-column align="center" prop="level"></el-table-column>
              <el-table-column align="center" prop="status"></el-table-column>
              <el-table-column align="center">
                <template>
                  <el-button icon="el-icon-search" type="text">查询</el-button>
                </template>
              </el-table-column>
              <el-table-column align="center">
                <template>
                  <el-button
                    icon="el-icon-document"
                    type="text"
                    @click="addContract"
                    >签约</el-button
                  >
                </template>
              </el-table-column>
              <el-table-column align="center">
                <template>
                  <el-button
                    icon="el-icon-edit"
                    type="text"
                    @click="modifyContract"
                    >修改</el-button
                  >
                </template>
              </el-table-column>
              <el-table-column align="center">
                <template>
                  <el-button
                    icon="el-icon-document-delete"
                    type="text"
                    @click="deleteContract"
                    >解约</el-button
                  >
                </template>
              </el-table-column>
              <!-- <el-table-column align="center">
              <template>
                <el-button icon="el-icon-refresh" type="primary" plain>重置</el-button>
              </template>
            </el-table-column> -->
            </el-table>
          </div>
        </li>
        <li>
          <p class="type">短信通知</p>
          <div class="info-wrap">
            <el-table
              :data="infoData"
              border
              style="width: 100%"
              :show-header="status"
            >
              <el-table-column align="center" prop="canel"></el-table-column>
              <el-table-column align="center" prop="level"></el-table-column>
              <el-table-column align="center" prop="status"></el-table-column>
              <el-table-column align="center">
                <template>
                  <el-button icon="el-icon-search" type="text">查询</el-button>
                </template>
              </el-table-column>
              <el-table-column align="center">
                <template>
                  <el-button icon="el-icon-document" type="text"
                    >签约</el-button
                  >
                </template>
              </el-table-column>
              <el-table-column align="center">
                <template>
                  <el-button icon="el-icon-edit" type="text">修改</el-button>
                </template>
              </el-table-column>
              <el-table-column align="center">
                <template>
                  <el-button icon="el-icon-document-delete" type="text"
                    >解约</el-button
                  >
                </template>
              </el-table-column>
              <!-- <el-table-column align="center">
              <template>
                <el-button icon="el-icon-refresh" type="primary" plain>重置</el-button>
              </template>
            </el-table-column> -->
            </el-table>
          </div>
        </li>
      </ul>
      <div class="submit-btn">
        <el-button type="primary">统一提交并打印</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  fetchQueryBpPerCompreAgreementInfo,
  fetchSelectBpAgreementResumeList,
  fetchCreateBpPerCompreAgreementInfo,
  fetchUpdateBpPerCompreAgreementInfo,
  fetchCancelBpPerCompreAgreementInfo
} from "@/api/privateCustomer/index";
import { mapState } from "vuex";
export default {
  data() {
    return {
      accountID: "",
      status: false,
      productList: [],
      pageNum: "",
      pageSize: "",
      totalNum: "",
      canelData: [
        {
          canel: "网络银行",
          level: "客户层",
          status: "已签约"
        },
        {
          canel: "手机银行",
          level: "客户层",
          status: "未签约"
        }
      ],
      otherData: [
        {
          canel: "利率个性化协议",
          level: "客户层",
          status: "已签约"
        },
        {
          canel: "费率个性化协议",
          level: "客户层",
          status: "未签约"
        }
      ],
      infoData: [
        {
          canel: "短信通知",
          level: "客户层",
          status: "已签约"
        }
      ]
    };
  },
  computed: {
    ...mapState({
      custNo: state => state.privateViewMain.custNo
    })
  },
  methods: {
    searchAccount() {
      let data = {
        Header: {
          SourceSysId: "123",
          ConsumerId: "123",
          Mac: "000d874E8046",
          KeyId: "1232123llp",
          ServiceCode: "0023",
          ServiceName: "testing",
          TranCode: "9063852697",
          GlobalSeq: "123456789",
          TranSeq: "9063852697",
          Channel: "1",
          TerminalCode: "32132",
          BranchId: "321",
          TranTeller: "admin",
          AuthTeller: "admin",
          AuthPwd: "123456",
          AuthFlag: "f",
          TranDate: "20200324",
          TranTime: "1518",
          LocalLang: "001",
          PgUpDownFlag: "1",
          TotalNum: "10",
          CurrentNum: "1",
          PageStart: "0",
          PageEnd: "10",
          LegalRepCode: "123456",
          ExtendContent: "ss",
          amountAttrName: 0
        },
        // custNo: "TEST_0005",
        custNo: this.custNo,
        acctNo: "12345678",
        idenType: "",
        idenNo: "",
        agreementId: "",
        custName: ""
      };
      fetchQueryBpPerCompreAgreementInfo(data)
        .then(res => {
          if (res.header.RetCode == "000000") {
            this.$message("查询成功");
          } else if (res.header.RetCode == "501CCP22000") {
            this.$message({
              type: "error",
              message: "客户不存在"
            });
          } else {
            this.$message({
              type: "error",
              message: "查询失败"
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    searchContractList() {
      let data = {
        Header: {
          SourceSysId: "123",
          ConsumerId: "123",
          Mac: "000d874E8046",
          KeyId: "1232123llp",
          ServiceCode: "0023",
          ServiceName: "testing",
          TranCode: "9063852697",
          GlobalSeq: "123456789",
          TranSeq: "9063852697",
          Channel: "1",
          TerminalCode: "32132",
          BranchId: "321",
          TranTeller: "admin",
          AuthTeller: "admin",
          AuthPwd: "123456",
          AuthFlag: "f",
          TranDate: "20200324",
          TranTime: "1518",
          LocalLang: "001",
          PgUpDownFlag: "1",
          TotalNum: "10",
          CurrentNum: "1",
          PageStart: "0",
          PageEnd: "10",
          LegalRepCode: "123456",
          ExtendContent: "ss",
          amountAttrName: 0
        },
        fromDate: "",
        partyIdFrom: "",
        productId: "",
        accountNum: "",
        statusId: "",
        agreementId: "",
        agreementTypeId: "",
        description: "",
        pageSize: "10",
        partyIdTo: "",
        pageNum: "1",
        thruDate: ""
      };
      fetchSelectBpAgreementResumeList(data)
        .then(res => {
          if (res.header.RetCode == "000000") {
            this.$message({
              type: "success",
              message: "查询成功"
            });
            this.productList = res.agreementList;
            this.pageNum = res.pageNum;
            this.pageSize = res.pageSize;
            this.totalNum = res.totalNum;
          }
        })
        .catch();
    },
    addContract() {
      let data = {
        Header: {
          SourceSysId: "123",
          ConsumerId: "123",
          Mac: "000d874E8046",
          KeyId: "1232123llp",
          ServiceCode: "0023",
          ServiceName: "testing",
          TranCode: "9063852697",
          GlobalSeq: "123456789",
          TranSeq: "9063852697",
          Channel: "1",
          TerminalCode: "32132",
          BranchId: "321",
          TranTeller: "admin",
          AuthTeller: "admin",
          AuthPwd: "123456",
          AuthFlag: "f",
          TranDate: "20200324",
          TranTime: "1518",
          LocalLang: "001",
          PgUpDownFlag: "1",
          TotalNum: "10",
          CurrentNum: "1",
          PageStart: "0",
          PageEnd: "10",
          LegalRepCode: "123456",
          ExtendContent: "ss",
          amountAttrName: 0
        },
        checkType: "1",
        custNo: "TEST_0005",
        contractDate: "20200712",
        updateDate: "20200712",
        singleLimit: "12",
        contractEndDate: "20200811",
        unitNumber: "1",
        updateOrg: "cit009",
        custName: "zhangsan",
        acctName: "zhangsan",
        udateUser: "liuer",
        dailySumNumber: "100",
        monSumNumber: "3",
        acctNo: "121",
        dailySumLimit: "12",
        contractUser: "zhangsan11",
        acctType: "11",
        agreementId: "10001",
        currencyId: "21",
        contractOrg: "1321",
        contractFlag: "1",
        contractType: "3",
        monSumList: ""
      };
      fetchCreateBpPerCompreAgreementInfo(data)
        .then(res => {
          if (res.header.RetCode == "000000") {
            this.$message({
              type: "success",
              message: "新增协议成功"
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    modifyContract() {
      let data = {
        Header: {
          SourceSysId: "123",
          ConsumerId: "123",
          Mac: "000d874E8046",
          KeyId: "1232123llp",
          ServiceCode: "0023",
          ServiceName: "testing",
          TranCode: "9063852697",
          GlobalSeq: "123456789",
          TranSeq: "9063852697",
          Channel: "1",
          TerminalCode: "32132",
          BranchId: "321",
          TranTeller: "admin",
          AuthTeller: "admin",
          AuthPwd: "123456",
          AuthFlag: "f",
          TranDate: "20200324",
          TranTime: "1518",
          LocalLang: "001",
          PgUpDownFlag: "1",
          TotalNum: "10",
          CurrentNum: "1",
          PageStart: "0",
          PageEnd: "10",
          LegalRepCode: "123456",
          ExtendContent: "ss",
          amountAttrName: 0
        },
        checkType: "1",
        custNo: "TEST_0005",
        contractDate: "20200712",
        updateDate: "20200712",
        singleLimit: "12",
        contractEndDate: "20200811",
        unitNumber: "1",
        updateOrg: "cit009",
        custName: "zhangsan",
        acctName: "zhangsan",
        udateUser: "liuer",
        dailySumNumber: "100",
        monSumNumber: "3",
        acctNo: "121",
        dailySumLimit: "12",
        contractUser: "zhangsan11",
        acctType: "11",
        agreementId: "10001",
        currencyId: "21",
        contractOrg: "1321",
        contractFlag: "1",
        contractType: "3",
        monSumList: ""
      };
      fetchUpdateBpPerCompreAgreementInfo(data)
        .then(res => {
          if (res.header.RetCode == "000000") {
            this.$message({
              type: "success",
              message: "修改成功"
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    deleteContract() {
      let data = {
        Header: {
          SourceSysId: "123",
          ConsumerId: "123",
          Mac: "000d874E8046",
          KeyId: "1232123llp",
          ServiceCode: "0023",
          ServiceName: "testing",
          TranCode: "9063852697",
          GlobalSeq: "123456789",
          TranSeq: "9063852697",
          Channel: "1",
          TerminalCode: "32132",
          BranchId: "321",
          TranTeller: "admin",
          AuthTeller: "admin",
          AuthPwd: "123456",
          AuthFlag: "f",
          TranDate: "20200324",
          TranTime: "1518",
          LocalLang: "001",
          PgUpDownFlag: "1",
          TotalNum: "10",
          CurrentNum: "1",
          PageStart: "0",
          PageEnd: "10",
          LegalRepCode: "123456",
          ExtendContent: "ss",
          amountAttrName: 0
        },
        checkType: "1",
        custNo: "TEST_0005",
        contractDate: "20200711",
        updateDate: "20200711",
        singleLimit: "12",
        contractEndDate: "20200811",
        unitNumber: "1",
        updateOrg: "cit009",
        custName: "zhangsan",
        acctName: "zhangsan",
        udateUser: "liuer",
        dailySumNumber: "100",
        monSumNumber: "3",
        acctNo: "12345678",
        dailySumLimit: "12",
        contractUser: "zhangsan",
        acctType: "11",
        agreementId: "1225",
        currencyId: "21",
        contractOrg: "1321",
        contractFlag: "1",
        contractType: "1",
        monSumList: ""
      };
      fetchCancelBpPerCompreAgreementInfo(data)
        .then(res => {
          if (res.header.RetCode == "000000") {
            this.$message({
              type: "success",
              message: "删除成功"
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
<style>
.account-wrap .el-table__body,
.account-wrap .el-button {
  font-size: 14px;
}
</style>
<style lang="scss" scoped>
.account-wrap {
  padding: 0;
}
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
.main {
  padding: 0 20px;
  .account-from {
    margin: 20px 0;
    display: flex;
    align-items: center;
    .accountID {
      width: 400px;
      display: flex;
      .preText {
        font-size: 14px;
        background-color: gray;
        width: 120px;
        color: #fff;
        border-radius: 3px 0 0 3px;
        text-align: center;
        line-height: 32px;
      }
      .accountInput {
        display: inline-block;
        width: 300px;
        border: 1px solid #ccc;
        outline: none;
        text-indent: 10px;
      }
      .accountInput:focus{
        border: 1px solid #409EFF;
      }
    }
    .search {
      display: inline-block;
      border-radius: 0 3px 3px 0;
      width: 80px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      background-color: #409EFF;
      cursor: pointer;
      color: #fff;
      font-size: 14px;
    }
  }
  .type {
    height: 40px;
    font-size: 14px;
    line-height: 40px;
    margin: 0;
    color: #666;
    font-weight: bold;
  }
  .info-list {
    margin: 0;
    padding: 0;
    list-style: none;
    > li {
      margin-bottom: 40px;
    }
  }
  .submit-btn {
    margin-top: 60px;
    display: flex;
    flex-direction: row-reverse;
  }
}
</style>
