<template>
  <div>
    <div class="top_nav ng-scope" style="padding-top: 10px">
      <span class="left-block"></span>
      <label class="top-nav-label">企业视图</label>
    </div>
    <el-card class="el-card-cust" :body-style="{ padding: '0' }">
      <el-collapse
        class="cust-coll"
        v-model="activeNames"
        @change="handleChange"
      >
        <el-collapse-item class="panel" name="1">
          <template slot="title">
            <div class="coll-tit">
              <div>企业信息</div>
              <div>
                <button @click.stop="modifyComInfo">
                  <i class="el-icon-edit-outline"></i>维护
                </button>
                <button><i class="el-icon-printer"></i>打印</button>
              </div>
            </div>
          </template>
          <ul>
            <li>
              <div>企业基础信息</div>
              <hr class="hr-top-bom" />
              <el-row>
                <el-col :span="24"
                  >客户号:<span class="colr-b">{{
                    publicCustInfo.custNo
                  }}</span></el-col
                >
                <el-col :span="24"
                  >客户名称:<span class="colr-b">{{
                    publicCustInfo.custName
                  }}</span></el-col
                >
                <el-col :span="8"
                  >国籍:<span class="colr-b">{{
                    publicCustInfo.countryCitizen
                  }}</span></el-col
                >
                <el-col :span="8"
                  >证件类型:<span class="colr-b">{{
                    publicCustInfo.idenType
                      | formatterDicts("com_idenType_type")
                  }}</span></el-col
                >
                <el-col :span="8"
                  >证件号码:<span class="colr-b">{{
                    publicCustInfo.idNo
                  }}</span></el-col
                >
                <el-col :span="8"
                  >证件到期日期:<span class="colr-b">{{
                    publicCustInfo.expireDate
                  }}</span></el-col
                >
                <el-col :span="8"
                  >建立日期:<span class="colr-b">{{
                    publicCustInfo.buildDate
                  }}</span></el-col
                >
                <el-col :span="8"
                  >联系人电话:<span class="colr-b">{{
                    publicCustInfo.contactPhone
                  }}</span></el-col
                >
                <el-col :span="8"
                  >客户属性:<span class="colr-b">{{
                    publicCustInfo.custAttribute
                  }}</span></el-col
                >
                <el-col :span="8"
                  >客户类型:<span class="colr-b">{{
                    publicCustInfo.custType | formatterDicts("custType_type")
                  }}</span></el-col
                >
                <el-col :span="8"
                  >正式客户标志:<span class="colr-b">{{
                    publicCustInfo.existingCustomer
                  }}</span></el-col
                >
                <el-col :span="8"
                  >投向行业:<span class="colr-b">{{
                    publicCustInfo.investTrade
                  }}</span></el-col
                >
                <el-col :span="24"
                  >税务登记号:<span class="colr-b">{{
                    publicCustInfo.countryTaxNo
                  }}</span></el-col
                >
                <el-col :span="8"
                  >注册资金币种:<span class="colr-b">{{
                    publicCustInfo.regCapitalCcy | formatterDicts("cus_ccy")
                  }}</span></el-col
                >
                <el-col :span="8"
                  >注册资金（元）:<span class="colr-b">{{
                    publicCustInfo.regCapital
                  }}</span></el-col
                >
                <el-col :span="8"
                  >机构类别:<span class="colr-b">{{
                    publicCustInfo.orgType
                  }}</span></el-col
                >
                <el-col :span="8"
                  >机构税收居民身份:<span class="colr-b">{{
                    publicCustInfo.reveIdentity
                  }}</span></el-col
                >
                <el-col :span="8"
                  >企业中征码<span class="colr-b">{{
                    publicCustInfo.signature
                  }}</span></el-col
                >
                <el-col :span="8"
                  >登记机构:<span class="colr-b">{{
                    publicCustInfo.registerOrgId
                  }}</span></el-col
                >
                <el-col :span="16"
                  >登记人:<span class="colr-b">{{
                    publicCustInfo.registerUserLogin
                  }}</span></el-col
                >

                <el-col :span="16"
                  >最后更新用户:<span class="colr-b">{{
                    publicCustInfo.lastUpdateCust
                  }}</span></el-col
                >
                <el-col :span="8"
                  >最后更新机构:<span class="colr-b">{{
                    publicCustInfo.lastUpdateOrgId
                  }}</span></el-col
                >
                <el-col :span="16"
                  >最后更新日期:<span class="colr-b">{{
                    publicCustInfo.lastUpdateTime
                  }}</span></el-col
                >
                <el-col :span="8"
                  >纳税人类型:<span class="colr-b">{{
                    publicCustInfo.taxpayerType
                  }}</span></el-col
                >
                <el-col :span="16"
                  >纳税人识别号:<span class="colr-b">{{
                    publicCustInfo.reveIdentiNo
                  }}</span></el-col
                >
                <el-col :span="24"
                  >经营范围:<span class="colr-b">{{
                    publicCustInfo.businessScope
                  }}</span></el-col
                >
              </el-row>
            </li>
            <hr class="hr-top-bom" />
            <li>
              <div>【法人/单位负责人】信息</div>
              <el-row>
                <el-col :span="24"
                  >姓名:<span class="colr-b">{{
                    publicCustInfo.legalClientName
                  }}</span></el-col
                >
                <el-col :span="12"
                  >证件类型:<span class="colr-b">{{
                    publicCustInfo.legalGlobalType
                  }}</span></el-col
                >
                <el-col :span="12"
                  >证件号码:<span class="colr-b">{{
                    publicCustInfo.legalGlobalId
                  }}</span></el-col
                >
                <el-col :span="12"
                  >证件到期日期:<span class="colr-b">{{
                    publicCustInfo.legalTdenExpdate
                  }}</span></el-col
                >
                <el-col :span="12"
                  >联系电话:<span class="colr-b">{{
                    publicCustInfo.contactPhone
                  }}</span></el-col
                >
              </el-row>
            </li>
            <hr class="hr-top-bom" />
            <li>
              <div>【关联企业】信息</div>
              <el-row>
                <el-col :span="24"
                  >上级法人或主管单位名称/控股股东或实际控制人:<span
                    class="colr-b"
                    >1</span
                  ></el-col
                >
                <el-col :span="12"
                  >基本存款账户开户许可证核准号:<span class="colr-b"></span
                ></el-col>
                <el-col :span="12"
                  >组织机构代码:<span class="colr-b"></span
                ></el-col>
                <el-col :span="24">姓名:<span class="colr-b"></span></el-col>
                <el-col :span="12"
                  >证件种类:<span class="colr-b"></span
                ></el-col>
                <el-col :span="12"
                  >证件号码:<span class="colr-b"></span
                ></el-col>
                <el-col :span="12"
                  >证件到期日期:<span class="colr-b"></span
                ></el-col>
              </el-row>
            </li>
          </ul>
        </el-collapse-item>
        <el-collapse-item class="panel" name="2">
          <template slot="title">
            <div class="coll-tit">
              <div>机构税收居民身份信息</div>
              <div>
                <button><i class="el-icon-edit-outline"></i>维护</button>
                <button><i class="el-icon-refresh"></i>刷新</button>
              </div>
            </div>
          </template>
          <ul>
            <el-row>
              <el-col :span="16">机构名称:<span class="colr-b">1</span></el-col>
              <el-col :span="8">非居民标识:<span class="colr-b"></span></el-col>
              <div class="ft-sz-16">一、机构类别:</div>
              <el-col :span="24">机构类别:<span class="colr-b"></span></el-col>
              <div class="ft-sz-16">二、机构税收居民身份:</div>
              <el-col :span="24"
                >机构税收居民身份:<span class="colr-b"></span
              ></el-col>
              <div class="ft-sz-16">三、机构基本信息:</div>
              <el-col :span="24"
                >机构名称(英文):<span class="colr-b"></span
              ></el-col>
              <el-col :span="24"
                >机构地址(英文或拼音):<span class="colr-b"></span
              ></el-col>
              <el-col :span="24"
                >详细地址(英文或拼音):<span class="colr-b"></span
              ></el-col>
              <el-col :span="24"
                >机构地址(中文):<span class="colr-b"></span
              ></el-col>
              <el-col :span="24"
                >详细地址(中文): :<span class="colr-b"></span
              ></el-col>
              <div class="ft-sz-16">四、税收居民国(地区)及纳税人识别号:</div>
              <el-col :span="12"
                >税收居民国(地区):<span class="colr-b"></span
              ></el-col>
              <el-col :span="12"
                >纳税人识别号:<span class="colr-b"></span
              ></el-col>
              <el-col :span="12"
                >无纳税人识别号原因类型:<span class="colr-b"></span
              ></el-col>
              <el-col :span="12"
                >无纳税人识别号具体原因:<span class="colr-b"></span
              ></el-col>
            </el-row>
          </ul>
        </el-collapse-item>
        <el-collapse-item class="panel" name="3">
          <template slot="title">
            <div class="coll-tit">
              <div>控制人税收居民身份信息</div>
              <div>
                <button><i class="el-icon-edit-outline"></i>维护</button>
                <button><i class="el-icon-refresh"></i>刷新</button>
              </div>
            </div>
          </template>
          <ul>
            <el-row>
              <el-row>
                <el-col :span="24">姓名:<span class="colr-b">1</span></el-col>
                <el-col :span="24"
                  >本人声明:<span class="colr-b">--</span></el-col
                >
                <div class="ft-sz-16">一、机构信息:</div>
                <el-col :span="24"
                  >所控机构名称(英文):<span class="colr-b"></span
                ></el-col>
                <el-col :span="24"
                  >机构地址(英文或拼音):<span class="colr-b"></span
                ></el-col>
                <el-col :span="24"
                  >详细地址(英文或拼音):<span class="colr-b"></span
                ></el-col>
                <el-col :span="12"
                  >税收居民国(地区):<span class="colr-b"></span
                ></el-col>
                <el-col :span="12"
                  >纳税人识别号:<span class="colr-b"></span
                ></el-col>
                <div class="ft-sz-16">二、控制人信息：</div>
                <el-col :span="12"
                  >姓(英文或拼音):<span class="colr-b"></span
                ></el-col>
                <el-col :span="12"
                  >名(英文或拼音):<span class="colr-b"></span
                ></el-col>
                <el-col :span="24"
                  >出生日期:<span class="colr-b"></span
                ></el-col>
                <el-col :span="24"
                  >现居地址(中文):<span class="colr-b"></span
                ></el-col>
                <el-col :span="24"
                  >详细地址(中文):<span class="colr-b"></span
                ></el-col>
                <el-col :span="24"
                  >现居地址(英文或拼音):<span class="colr-b"></span
                ></el-col>
                <el-col :span="24"
                  >详细地址(英文或拼音):<span class="colr-b"></span
                ></el-col>
                <el-col :span="24"
                  >出生地(中文):<span class="colr-b"></span
                ></el-col>
                <el-col :span="24"
                  >详细地址(中文):<span class="colr-b"></span
                ></el-col>
                <el-col :span="24"
                  >出生地(英文或拼音):<span class="colr-b"></span
                ></el-col>
                <el-col :span="24"
                  >详细地址(英文或拼音):<span class="colr-b"></span
                ></el-col>
                <el-col :span="12"
                  >税收居民国(地区):<span class="colr-b"></span
                ></el-col>
                <el-col :span="12"
                  >纳税人识别号:<span class="colr-b"></span
                ></el-col>
                <el-col :span="12"
                  >无纳税人识别号原因类型:<span class="colr-b"></span
                ></el-col>
                <el-col :span="12"
                  >无纳税人识别号具体原因:<span class="colr-b"></span
                ></el-col>
                <div class="ft-sz-16">三、其他信息:</div>
                <el-col :span="24"
                  >签名人身份:<span class="colr-b"></span
                ></el-col>
              </el-row>
            </el-row>
          </ul>
        </el-collapse-item>
        <el-collapse-item class="panel" name="4">
          <template slot="title">
            <div class="coll-tit">
              <div>账户列表</div>
              <div>
                <button><i class="el-icon-printer"></i>打印</button>
              </div>
            </div>
          </template>
          <div class="cust-table-cont">
            <el-table
              :data="cstAcctTable"
              style="width: 100%"
              border
              header-row-class-name="cust-table-sty"
            >
              <el-table-column
                prop="cstAcctNo"
                label="客户账户"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="childAcctSeqNo"
                label="子账户序号"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="cstAcctNo"
                label="账户分类"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="acctBalance"
                label="账户余额"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="useBalance"
                label="可用余额"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="acctStatus"
                label="账户状态"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="storagePeriod"
                label="存期"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="dpstClass"
                label="存款种类"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="acctNm"
                label="账户名称"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="openAcctDate"
                label="开户日期"
                align="center"
              ></el-table-column>
            </el-table>
          </div>
        </el-collapse-item>
        <el-collapse-item class="panel" name="5">
          <template slot="title">
            <div class="coll-tit">
              <div>联系人列表</div>
            </div>
          </template>
          <div class="cust-table-cont">
            <div class="cust-table-tit">
              <span>联系人列表</span>
              <div>
                <el-button><i class="el-icon-edit"></i>新增</el-button>
                <el-button><i class="el-icon-edit-outline"></i>修改</el-button>
                <el-button><i class="el-icon-close"></i>删除</el-button>
              </div>
            </div>
            <el-table
              :data="contactTable"
              style="width: 100%"
              border
              header-row-class-name="cust-table-sty"
            >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column
                prop="relationshipTypeId"
                label="联系人类型"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="custName"
                label="联系人姓名"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="idenType"
                label="证件种类"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="idenNum"
                label="证件号码"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="acctNoteNum"
                label="联系号码"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="idenExpiraDate"
                label="证件到期日期"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="permanentAddress"
                label="对账单寄送地址"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="agreementFlag"
                label="是否签约短信"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="recordNo"
                label="联系人编号"
                align="center"
              ></el-table-column>
            </el-table>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-card>
    <ComDialog ref="comDialog" title="维护企业客户">
      <create-public-info
        :publicCustInfo="publicCustInfo"
        @confirm="comInfoUpdata"
      ></create-public-info>
    </ComDialog>
  </div>
</template>

<script>
import { fetchSelectPartyGroupCust } from "@/api/privateCustomer";
import { mapState, mapActions } from "vuex";
import { DICTS } from "@/dict/dicts";
import { getDictsLabel } from "@/utils";
import ComDialog from "@/components/ComBase/com-dialog";
import createPublicInfo from "../FormComponents/createPublicInfo";

export default {
  components: {
    ComDialog,
    createPublicInfo,
  },
  data() {
    return {
      activeNames: ["1"],
      publicCustInfo: {}, //企业客户信息
      contactTable: [], //联系地址信息
      cstAcctTable: [], //账户信息
    };
  },
  filters: {
    formatterDicts(value, type) {
      let showLabel;
      showLabel = getDictsLabel(DICTS[type], value);
      return showLabel;
    },
  },
  mounted() {
    this.fetchSelectPartyGroupCustFn();
  },
  methods: {
    handleChange(e) {
      console.log(e);
    },
    fetchSelectPartyGroupCustFn() {
      let params = {
        custNo: this.publicCustNo,
      };
      fetchSelectPartyGroupCust(params).then((res) => {
        if (res.header.RetCode == "000000") {
          this.publicCustInfo = res;
        }
      });
    },
    //维护企业客户信息
    modifyComInfo() {
      this.$refs.comDialog.dialogVisiable = true;
    },
    comInfoUpdata() {
      this.fetchSelectPartyGroupCustFn();
    },
  },
  computed: {
    ...mapState({
      publicCustNo: (state) => state.privateViewMain.publicCustNo,
    }),
  },
};
</script>

<style lang="scss" scoped>
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
/deep/.el-card-cust {
  margin: 10px;
}
/deep/.el-collapse-item {
  border: 1px solid transparent;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  border-color: #ddd;
}
.panel {
  font-weight: 400;
  color: #000000;
  font-family: "微软雅黑", "light";
}
/deep/.el-collapse-item + .panel {
  margin-top: 5px;
}
/deep/.el-collapse-item__header {
  height: 37px;
  line-height: 37px;
  background-color: #f5f5f5;
}
.coll-tit {
  padding-left: 15px;
  width: 100%;
  font-weight: 400;
  display: flex;
  justify-content: space-between;
}
button {
  padding: 5px 10px;
  font-size: 12px;
  line-height: 1.5;
  border-radius: 3px;
  background-color: #5b8ddc;
  color: white;
  text-align: center;
  font-weight: 400;
  cursor: pointer;
  border: 1px solid #ccc;
  outline: none;
}
.hr-top-bom {
  border: 0;
  border-top: 1px solid #eee;
  margin-top: 0;
  margin-bottom: 0;
}
/deep/.el-card-cust {
  font-size: 14px;
  .el-row {
    color: #000;
    font-size: 12px;
    .colr-b {
      color: #3b95f2;
      padding-left: 5px;
    }
  }
}
.cust-cile {
  padding-top: 25px;
}
.cust-cile-block {
  padding: 0 15px;
  .cust-cile-blue {
    background-color: #3c97f1;
    border: 1px solid #3c97f1;
    border-radius: 5px;
    font-size: 15.5px;
    padding: 0 10px;
    margin: 0 0 20px;
    color: #fff;
    .cust-cile-des {
      margin: 5px 0;
      font-size: 14px;
    }
  }
}

.cust-table-cont {
  padding: 15px 15px 0;
  width: 100%;
  /deep/.cust-table-sty {
    color: #000;
    line-height: 24px;
    font-weight: bold;
    font-size: 12px;
    text-align: center;
  }
  .cust-table-tit {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #333;
    background-color: #f5f5f5;
    padding: 3px 15px 6px;
    line-height: 30px;
  }
}
.ft-sz-16 {
  font-size: 14px;
  padding-left: 10px;
}
</style>

