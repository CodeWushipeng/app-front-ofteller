<template>
  <div class="customer-wrap">
    <div class="top_nav ng-scope" style="padding-top: 10px;">
      <span class="left-block"></span>
      <label class="top-nav-label">客户视图</label>
    </div>
    <el-card class="el-card-cust" :body-style="{ padding: '0' }">
      <el-collapse
        class="cust-coll"
        v-model="activeNames"
        @change="handleChange"
      >
        <el-collapse-item class="panel" name="baseInfo">
          <template slot="title">
            <div class="coll-tit">
              <div>客户信息</div>
              <div>
                <button @click.stop="modifyCustInfo">
                  <i class="el-icon-edit-outline"></i>维护
                </button>
                <button><i class="el-icon-printer"></i>打印</button>
              </div>
            </div>
          </template>
          <ul>
            <li>
              <div class="title">客户基础信息</div>
              <hr class="hr-top-bom" />
              <el-row>
                <el-col :span="24"
                  >客户姓名:<span class="colr-b">{{
                    custInfo.custName
                  }}</span></el-col
                >
                <el-col :span="8"
                  >证件类型:<span class="colr-b">{{
                    custInfo.idenType
                  }}</span></el-col
                >
                <el-col :span="8"
                  >证件号码:<span class="colr-b">{{
                    custInfo.idNo
                  }}</span></el-col
                >
                <el-col :span="8"
                  >证件到期日期:<span class="colr-b">{{
                    custInfo.expireDate
                  }}</span></el-col
                >
                <el-col :span="8"
                  >性别:<span class="colr-b">{{
                    custInfo.gender | tranSex
                  }}</span></el-col
                >
                <el-col :span="8"
                  >国籍:<span class="colr-b">{{
                    custInfo.country
                  }}</span></el-col
                >
                <el-col :span="8"
                  >民族:<span class="colr-b">{{
                    custInfo.nation
                  }}</span></el-col
                >
                <el-col :span="8"
                  >出生日期:<span class="colr-b">{{
                    custInfo.birthDate
                  }}</span></el-col
                >
                <el-col :span="8"
                  >职业 :<span class="colr-b">{{
                    custInfo.occupation
                  }}</span></el-col
                >
                <el-col :span="8"
                  >联系电话:<span class="colr-b">{{
                    custInfo.phoneNo
                  }}</span></el-col
                >
                <el-col :span="24"
                  >工作单位:<span class="colr-b">{{
                    custInfo.employerName
                  }}</span></el-col
                >
                <el-col :span="24"
                  >户籍地址:<span class="colr-b">{{
                    custInfo.globalAddress
                  }}</span></el-col
                >
                <el-col :span="24"
                  >常住地址:<span class="colr-b">{{
                    custInfo.homeAddress
                  }}</span></el-col
                >
                <el-col :span="8"
                  >是否面签:<span class="colr-b">{{
                    custInfo.visaFlag
                  }}</span></el-col
                >
                <el-col :span="8"
                  >税收居民身份:<span class="colr-b">{{
                    custInfo.reveIdentity
                  }}</span></el-col
                >
              </el-row>
            </li>
            <li>
              <div class="title">代理人信息</div>
              <hr class="hr-top-bom" />
              <el-row>
                <el-col :span="24"
                  >代理人姓名:<span class="colr-b">{{custInfo.agentName}}</span></el-col
                >
                <el-col :span="8"
                  >代理人证件类型:<span class="colr-b"></span
                ></el-col>
                <el-col :span="8"
                  >代理人证件号码:<span class="colr-b"></span
                ></el-col>
                <el-col :span="8"
                  >证件到期日期:<span class="colr-b"></span
                ></el-col>
                <el-col :span="8">联系电话:<span class="colr-b"></span></el-col>
              </el-row>
            </li>
          </ul>
        </el-collapse-item>
        <!-- <el-collapse-item class="panel" name="2">
            <template slot="title">
              <div class="coll-tit">
                <div>个人税收居民身份信息</div>
                <div>
                  <button @click.stop="modifyTaxInfo"><i class="el-icon-edit-outline"></i>维护</button>
                  <button><i class="el-icon-refresh"></i>刷新</button>
                </div>
              </div>
            </template>
            <ul>
              <el-row>
                <el-col :span="24">姓名:<span class="colr-b">1</span></el-col>
                <el-col :span="12">本人声明:<span class="colr-b"></span></el-col>
                <el-col :span="12">非居民标识:<span class="colr-b"></span></el-col>
                <el-col :span="12">姓(英文或拼音):<span class="colr-b"></span></el-col>
                <el-col :span="12">名(英文或拼音):<span class="colr-b"></span></el-col>
                <el-col :span="24">出生日期:<span class="colr-b"></span></el-col>
                <el-col :span="24">现居地址(中文):<span class="colr-b"></span></el-col>
                <el-col :span="24">详细地址(中文)：<span class="colr-b"></span></el-col>
                <el-col :span="24">现居地址(英文或拼音):<span class="colr-b"></span></el-col>
                <el-col :span="24">详细地址(英文或拼音):<span class="colr-b"></span></el-col>
                <el-col :span="24">出生地(中文):<span class="colr-b"></span></el-col>
                <el-col :span="24">详细地址(中文):<span class="colr-b"></span></el-col>
                <el-col :span="24">出生地(英文或拼音):<span class="colr-b"></span></el-col>
                <el-col :span="24">详细地址(英文或拼音):<span class="colr-b"></span></el-col>
                <el-col :span="12">税收居民国(地区):<span class="colr-b"></span></el-col>
                <el-col :span="12">纳税人识别号:<span class="colr-b"></span></el-col>
                <el-col :span="12">无纳税人识别号原因类型:<span class="colr-b"></span></el-col>
                <el-col :span="12">无纳税人识别号具体原因:<span class="colr-b"></span></el-col>
              </el-row>
            </ul>
          </el-collapse-item> -->
        <!-- <el-collapse-item class="panel" name="3">
            <template slot="title">
              <div class="coll-tit">
                <div>客户理财风险评估</div>
                <div>
                  <button><i class="el-icon-edit-outline"></i>风险评估</button>
                </div>
              </div>
            </template>
            <ul>
              <el-row>
                <el-col :span="8">理财风险评估类型:<span class="colr-b">1</span></el-col>
                <el-col :span="8">风险承受能力等级:<span class="colr-b"></span></el-col>
                <el-col :span="8">风险评估日期:<span class="colr-b"></span></el-col>
                <el-col :span="8">评分:<span class="colr-b"></span></el-col>
                <el-col :span="8">风险等级标识:<span class="colr-b"></span></el-col>
                <el-col :span="8">失效日期:<span class="colr-b"></span></el-col>
                <el-col :span="8">匹配的产品风险等级:<span class="colr-b"></span></el-col>
              </el-row>
            </ul>
          </el-collapse-item> -->
        <el-collapse-item class="panel" name="familyInfo">
          <template slot="title">
            <div class="coll-tit">
              <div>客户家庭信息</div>
            </div>
          </template>
          <ul>
            <el-row>
              <el-col :span="8"
                >家庭关系是否稳定:<span class="colr-b">{{
                  familyInfo.familyStatus
                }}</span></el-col
              >
              <el-col :span="8"
                >家庭对外担保总额:<span class="colr-b">{{
                  familyInfo.totalAssureAmt
                }}</span></el-col
              >
              <el-col :span="8"
                >车辆总估值:<span class="colr-b">{{
                  familyInfo.carTotalValue
                }}</span></el-col
              >
              <el-col :span="8"
                >家庭人口:<span class="colr-b">{{
                  familyInfo.peopleNum
                }}</span></el-col
              >
              <el-col :span="8"
                >主要经济来源:<span class="colr-b">{{
                  familyInfo.mainPocketbook
                }}</span></el-col
              >
              <el-col :span="8"
                >在我行存款余额:<span class="colr-b">{{
                  familyInfo.depositBal
                }}</span></el-col
              >
              <el-col :span="8"
                >子女人数:<span class="colr-b">{{
                  familyInfo.kidNum
                }}</span></el-col
              >
              <el-col :span="8"
                >主要支出方向:<span class="colr-b">{{
                  familyInfo.mainExpend
                }}</span></el-col
              >
              <el-col :span="8"
                >在我行理财余额:<span class="colr-b">{{
                  familyInfo.manageMoneyBal
                }}</span></el-col
              >
              <el-col :span="8"
                >未成年子女数量:<span class="colr-b">{{
                  familyInfo.nonageKidNum
                }}</span></el-col
              >
              <el-col :span="8"
                >居住状况:<span class="colr-b">{{
                  familyInfo.liveStatus
                }}</span></el-col
              >
              <el-col :span="8"
                >在我行贷款余额:<span class="colr-b">{{
                  familyInfo.loanBal
                }}</span></el-col
              >
              <el-col :span="8"
                >家庭总资产:<span class="colr-b">{{
                  familyInfo.totalAssets
                }}</span></el-col
              >
              <el-col :span="8"
                >房产数量:<span class="colr-b">{{
                  familyInfo.housePropertyNum
                }}</span></el-col
              >
              <el-col :span="8"
                >在我行担保余额:<span class="colr-b">{{
                  familyInfo.assureBal
                }}</span></el-col
              >
              <el-col :span="8"
                >家庭总负债:<span class="colr-b">{{
                  familyInfo.totalIndebted
                }}</span></el-col
              >
              <el-col :span="8"
                >房产总估值:<span class="colr-b">{{
                  familyInfo.housePropertyValue
                }}</span></el-col
              >
              <el-col :span="8"
                >家庭情况总体说明:<span class="colr-b">{{
                  familyInfo.description
                }}</span></el-col
              >
              <el-col :span="8"
                >家庭年收入:<span class="colr-b">{{
                  familyInfo.annualIncome
                }}</span></el-col
              >
              <el-col :span="8"
                >车辆数量:<span class="colr-b">{{
                  familyInfo.carNum
                }}</span></el-col
              >
            </el-row>
          </ul>
        </el-collapse-item>
        <!-- <el-collapse-item class="panel" name="5">
            <template slot="title">
              <div class="coll-tit">
                <div>客户联系偏好信息</div>
              </div>
            </template>
            <el-row class="cust-cile">
              <el-col :span="6" class="cust-cile-block">
                <div class="cust-cile-blue">
                  <div class="cust-cile-des">是否可以联系</div>
                  <div>--</div>
                </div>
              </el-col>
              <el-col :span="6" class="cust-cile-block">
                <div class="cust-cile-blue">
                  <div class="cust-cile-des">偏好联系日</div>
                  <div>--</div>
                </div>
              </el-col>
              <el-col :span="6" class="cust-cile-block">
                <div class="cust-cile-blue">
                  <div class="cust-cile-des">偏好联系开始时间</div>
                  <div>--</div>
                </div>
              </el-col>
              <el-col :span="6" class="cust-cile-block">
                <div class="cust-cile-blue">
                  <div class="cust-cile-des">偏好联系截止时间</div>
                  <div>--</div>
                </div>
              </el-col>
              <el-col :span="6" class="cust-cile-block">
                <div class="cust-cile-blue">
                  <div class="cust-cile-des">偏好联系方式</div>
                  <div>--</div>
                </div>
              </el-col>
              <el-col :span="6" class="cust-cile-block">
                <div class="cust-cile-blue">
                  <div class="cust-cile-des">偏好联系电话</div>
                  <div>--</div>
                </div>
              </el-col>
              <el-col :span="6" class="cust-cile-block">
                <div class="cust-cile-blue">
                  <div class="cust-cile-des">偏好联系地址</div>
                  <div>--</div>
                </div>
              </el-col>
              <el-col :span="6" class="cust-cile-block">
                <div class="cust-cile-blue">
                  <div class="cust-cile-des">是否接受营销短信</div>
                  <div>--</div>
                </div>
              </el-col>
              <el-col :span="8" class="cust-cile-block">
                <div class="cust-cile-blue">
                  <div class="cust-cile-des">是否接受营销电话</div>
                  <div>--</div>
                </div>
              </el-col>
              <el-col :span="8" class="cust-cile-block">
                <div class="cust-cile-blue">
                  <div class="cust-cile-des">是否参加营销活动</div>
                  <div>--</div>
                </div>
              </el-col>
              <el-col :span="8" class="cust-cile-block">
                <div class="cust-cile-blue">
                  <div class="cust-cile-des">联系禁忌</div>
                  <div>--</div>
                </div>
              </el-col>
            </el-row>
          </el-collapse-item> -->
        <el-collapse-item class="panel" name="contactInfo">
          <template slot="title">
            <div class="coll-tit">
              <div>联系人方式信息</div>
              <div>
                <button @click.stop="addFamilyRelationInfo">
                  <i class="el-icon-edit-outline"></i>新增
                </button>
              </div>
            </div>
          </template>
          <div class="cust-table-cont">
            <el-table
              :data="relationInfo"
              style="width:100%"
              border
              header-row-class-name="cust-table-sty"
            >
              <el-table-column label="操作" width="100" align="center">
                <template>
                  <el-button type="text" size="small">查看</el-button>
                </template>
              </el-table-column>
              <el-table-column
                prop="telephoneType"
                label="电话类型"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="countryCode"
                label="国家码"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="areaCode"
                label="区号"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="contactNumber"
                label="联系号码"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="subNumber"
                label="电话分机号"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="askForName"
                label="联系人称呼"
                align="center"
              ></el-table-column>
            </el-table>
          </div>
        </el-collapse-item>
        <el-collapse-item class="panel" name="credentials">
          <template slot="title">
            <div class="coll-tit">
              <div>证件信息</div>
            </div>
          </template>
          <div class="cust-table-cont">
            <el-table
              :data="tableCertificateInfo"
              style="width:100%"
              border
              header-row-class-name="cust-table-sty"
            >
              <el-table-column
                prop="idType"
                label="证件类型"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="idNo"
                label="证件号码"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="issueDate"
                label="证件签发日期"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="expireDate"
                label="证件到期日期"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="issueCountry"
                label="发证国家"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="issueGovernment"
                label="签发机关"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="registAddress"
                label="执照注册地址"
                align="center"
              ></el-table-column>
            </el-table>
          </div>
        </el-collapse-item>
        <el-collapse-item class="panel" name="workInfo">
          <template slot="title">
            <div class="coll-tit">
              <div>工作单位信息</div>
            </div>
          </template>
          <div class="cust-table-cont">
            <el-table
              :data="tableWorkUnitInfo"
              style="width:100%"
              border
              header-row-class-name="cust-table-sty"
            >
              <el-table-column
                prop="comName"
                label="工作单位"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="comType"
                label="单位性质"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="workType"
                label="工作性质"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="occupation"
                label="职业"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="post"
                label="职务"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="title"
                label="职称"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="startDate"
                label="入职时间"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="endDate"
                label="离职时间"
                align="center"
              ></el-table-column>
            </el-table>
          </div>
        </el-collapse-item>
        <el-collapse-item class="panel" name="otherInfo">
          <template slot="title">
            <div class="coll-tit">
              <div>其他信息</div>
            </div>
          </template>
          <div class="cust-table-cont">
            <div class="cust-table-tit">联系地址信息</div>
            <el-table
              :data="tableContactAddressInfo"
              style="width:100%"
              border
              header-row-class-name="cust-table-sty"
            >
              <el-table-column
                prop="addressType"
                label="地址类型"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="address1"
                label="地址(完整)"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="postalCode"
                label="邮编"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="isDefault"
                label="是否常用地址"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="lastUpdateStamp"
                label="最后更新时间"
                align="center"
              ></el-table-column>
            </el-table>
          </div>
        </el-collapse-item>
        <el-collapse-item class="panel" name="accounts">
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
              style="width:100%"
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
      </el-collapse>
    </el-card>
    <ComDialog ref="modifyDialog" title="维护个人客户">
      <create-cust-info :custBasicInfoModel="custInfo"></create-cust-info>
    </ComDialog>
    <ComDialog ref="taxDialog" title="维护个人税收居民身份声明信息">
      <tax-cust-info></tax-cust-info>
    </ComDialog>
    <ComDialog ref="relDialog" title="客户关联关系新增">
      <family-relation-info></family-relation-info>
    </ComDialog>
  </div>
</template>

<script>
import ComDialog from "@/components/ComBase/com-dialog";
import CreateCustInfo from "../FormComponents/createCustInfo";
import TaxCustInfo from "../FormComponents/taxCustInfo";
import FamilyRelationInfo from "../FormComponents/familyRelationInfo";
import {
  selectPersonCustInfo,
  fetchCheckCertificateIsExistAccout,
  fetchSelectCustFamilyInfo,
  fetchSelectCustContactIinformation,
  fetchSelectCustAddressList,
  fetchSelectCustResumeInformation,
  fetchSelectCustCertificateInfo,
  selectCustAccountList
} from "@/api/privateCustomer";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    CreateCustInfo,
    TaxCustInfo,
    FamilyRelationInfo,
    ComDialog
  },
  data() {
    return {
      activeNames: ["baseInfo"],
      custInfo: {},
      familyInfo: {},
      relationInfo: [],
      tableCertificateInfo: [], //证件信息
      tableWorkUnitInfo: [], //工作单位信息
      tableContactAddressInfo: [], //联系地址信息
      cstAcctTable: [] //账户信息
    };
  },
  mounted() {
    this.queryCustInfo();
  },
  filters: {
    tranSex(val) {
      if (val == 1) {
        return "男";
      } else if (val == 2) {
        return "女";
      }
    }
  },
  methods: {
    queryCustInfo() {
      let params = {
        custNo: this.custNo
      };
      selectPersonCustInfo(params).then(res => {
        if (res.header.RetCode == "000000") {
          this.custInfo = res;
        }
      });
    },
    //客户家庭基本信息
    queryCustFamilyInfo() {
      fetchSelectCustFamilyInfo({ custNo: this.custNo }).then(res => {
        if (res.header.RetCode == "000000") {
          this.familyInfo = res;
        }
      });
    },
    //查询证件列表
    queryCredentials() {
      fetchCheckCertificateIsExistAccout({ custNo: this.custNo }).then(res => {
        if (res.header.RetCode == "000000") {
          this.tableCertificateInfo = res.custCertificateList;
        }
      });
    },
    //查询联系方式信息列表
    queryConnectionInfoList() {
      fetchSelectCustContactIinformation({ custNo: this.custNo }).then(res => {
        if (res.header.RetCode == "000000") {
          this.relationInfo = res.telephoneInfoList;
        }
      });
    },
    //查询单位信息列表
    queryResumeInformationList() {
      fetchSelectCustResumeInformation({ custNo: this.custNo }).then(res => {
        if (res.header.RetCode == "000000") {
          this.tableWorkUnitInfo = res.resumeInfoList;
        }
      });
    },
    //查询联系地址信息列表
    queryAddressInfoList() {
      fetchSelectCustAddressList({ custNo: this.custNo }).then(res => {
        if (res.header.RetCode == "000000") {
          this.tableContactAddressInfo = res.addressInfoList;
        }
      });
    },
    //查询账户列表
    queryAccountList() {
      selectCustAccountList({ custNo: this.custNo }).then(res => {
        if (res.header.RetCode == "000000") {
          this.cstAcctTable = res.accountList;
        }
      });
    },
    handleChange(e) {
      let nowPanel = e[e.length - 1];
      if(nowPanel=='familyInfo' && this.familyInfo=={}){
        this.queryCustFamilyInfo();
      }
      if(nowPanel=='contactInfo' && this.relationInfo.length==0){
        this.queryConnectionInfoList();
      }
      if(nowPanel=='credentials' && this.tableCertificateInfo.length==0){
        this.queryCredentials();
      }
      if(nowPanel=='workInfo' && this.tableWorkUnitInfo.length==0){
        this.queryResumeInformationList();
      }
      if(nowPanel=='otherInfo' && this.tableContactAddressInfo.length==0){
        this.queryAddressInfoList();
      }
      if(nowPanel=='accounts' && this.cstAcctTable.length==0){
        this.queryAccountList();
      }
    },
    //维护客户信息
    modifyCustInfo() {
      this.$refs.modifyDialog.dialogVisiable = true;
    },
    //新增客户家庭信息
    addFamilyRelationInfo() {
      this.$refs.relDialog.dialogVisiable = true;
    }
  },
  computed: {
    ...mapState({
      custNo: state => state.privateViewMain.custNo
    })
  }
};
</script>

<style lang="scss" scoped>
.customer-wrap {
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
  .el-card-cust {
    margin: 10px 0;
  }
  .el-collapse-item {
    border: 1px solid transparent;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
    border-color: #ddd;
  }
  .panel {
    font-weight: 400;
    color: #000000;
    font-family: "微软雅黑", "light";
  }
  .el-collapse-item + .panel {
    margin-top: 5px;
  }
  .el-collapse-item__header {
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
  }
  .hr-top-bom {
    border: 0;
    border-top: 1px solid #eee;
    margin-top: 0;
    margin-bottom: 0;
  }
  .el-collapse-item {
    li {
      margin-bottom: 10px;
    }
    .title {
      padding-bottom: 10px;
    }
  }
  .el-card-cust {
    font-size: 14px;
    .el-row {
      color: #000;
      font-size: 12px;
      .el-col {
        margin: 5px 0;
      }
      .colr-b {
        color: #3b95f2;
        margin-left: 10px;
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
    .cust-table-sty {
      color: #000;
      line-height: 24px;
      font-weight: bold;
      font-size: 12px;
      text-align: center;
    }
    .cust-table-tit {
      font-size: 12px;
      color: #333;
      background-color: #f5f5f5;
      padding: 3px 15px 6px;
    }
  }

  .create-cust-info {
    height: 90vh;
    margin-top: 5vh;
    overflow: scroll;
  }
}
</style>
