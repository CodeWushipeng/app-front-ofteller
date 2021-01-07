<template>
    <div class="create-cust">
      <!-- <el-header class="create-cust-head" height="30px">快速开立企业客户</el-header> -->
      <el-main class="create-cust-main">
        <div>
          <div class="cust-info">客户信息</div>
          <el-form class="cust-basic-info" ref="openPartyGroupCustModel" :rules="rules" :model="openPartyGroupCustModel" label-width="243px" label-position="right">
            <el-col :span="24">
              <el-form-item label="客户名称:" prop="custName" required>
                <el-input v-model="openPartyGroupCustModel.custName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="客户属性:" prop="custAttribute">
                <el-select v-model="openPartyGroupCustModel.custAttribute" placeholder="请选择" filterable>
                  <el-option
                    v-for="(item,index) in DICTS.custAttribute_type"
                    :key="index"
                    :label="item.text2"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="国籍:" prop="countryCitizen" required>
                <el-select v-model="openPartyGroupCustModel.countryCitizen" placeholder="请选择" filterable>
                  <el-option
                    v-for="(item,index) in DICTS.cus_country"
                    :key="index"
                    :label="item.text2"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="客户类型:" prop="custType" required>
                <el-select v-model="openPartyGroupCustModel.custType" placeholder="请选择" filterable>
                  <el-option
                    v-for="(item,index) in DICTS.custType_type"
                    :key="index"
                    :label="item.text2"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
             <el-col :span="8">
              <el-form-item label="与我行关系:" prop="withMybankRelat">
                <el-select v-model="openPartyGroupCustModel.withMybankRelat" placeholder="请选择" filterable>
                  <el-option
                    v-for="(item,index) in DICTS.withMybankRelat_type"
                    :key="index"
                    :label="item.text2"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
             <el-col :span="8">
              <el-form-item label="建立日期:" prop="buildDate">
                <el-date-picker
                  v-model="openPartyGroupCustModel.buildDate"
                  value-format="yyyyMMdd"
                  format="yyyyMMdd"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
           <el-col :span="8">
              <el-form-item label="证件类型:" prop="idenType" required>
                <el-select v-model="openPartyGroupCustModel.idenType" placeholder="请选择" filterable>
                  <el-option
                    v-for="(item,index) in DICTS.com_idenType_type"
                    :key="item.value"
                    :label="item.text2"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
             <el-col :span="8">
              <el-form-item label="证件号码:" prop="idNo" required>
                <el-input v-model="openPartyGroupCustModel.idNo"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="证件到期日期:" prop="expireDate" required>
                <el-date-picker
                  v-model="openPartyGroupCustModel.expireDate"
                  value-format="yyyyMMdd"
                  format="yyyyMMdd"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="客户经理代码:" prop="custManagerId">
                <el-input v-model="openPartyGroupCustModel.custManagerId"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="国税登记号码:" prop="countryTaxNo">
                <el-input v-model="openPartyGroupCustModel.countryTaxNo"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="注册资本币种:" prop="regCapitalCcy" required>
                <el-select v-model="openPartyGroupCustModel.regCapitalCcy" placeholder="请选择" filterable>
                  <el-option
                    v-for="(item,index) in DICTS.cus_ccy"
                    :key="index"
                    :label="item.text2"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="注册资本:" prop="regCapital">
                <el-input v-model="openPartyGroupCustModel.regCapital"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="开户机构:" prop="openBranch">
                <el-input v-model="openPartyGroupCustModel.openBranch"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="许可证号码:" prop="openAgreeNo">
                <el-input v-model="openPartyGroupCustModel.openAgreeNo"></el-input>
              </el-form-item>
            </el-col>

            <!-- <el-col :span="24">
              <el-form-item label="经营地址:" prop="operateAddress" required>
                <el-input v-model="openPartyGroupCustModel.operateAddress"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="经营地址行政区划:" prop="provinceOperateNum" required>
                <el-cascader
                  v-model="openPartyGroupCustModel.provinceOperateNum"
                  :options="cityData"
                  :props="{ expandTrigger: 'hover' }"
                >
                </el-cascader>
              </el-form-item>
            </el-col> -->
            <el-col :span="8">
              <el-form-item label="中征码:" prop="signature">
                <el-input v-model="openPartyGroupCustModel.signature"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24" class="public-info">【法人/单位负责人】信息录入区</el-col>
            <el-col :span="8">
              <el-form-item label="法人代表名称:" prop="legalClientName" required>
                <el-input v-model="openPartyGroupCustModel.legalClientName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="联系人电话:" prop="contactPhone" required>
                <el-input v-model="openPartyGroupCustModel.contactPhone"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="法定代表人证件类型:" prop="legalGlobalType" required>
                <el-select v-model="openPartyGroupCustModel.legalGlobalType" placeholder="请选择" filterables>
                  <el-option
                    v-for="(item,index) in DICTS.cus_idenType_type"
                    :key="index"
                    :label="item.text2"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="法人代表证件号码:" prop="legalGlobalId" required>
                <el-input v-model="openPartyGroupCustModel.legalGlobalId"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="法人证件失效日期:" prop="legalTdenExpdate" required>
                <el-date-picker
                  v-model="openPartyGroupCustModel.legalTdenExpdate"
                  value-format="yyyyMMdd"
                  format="yyyyMMdd"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="主经营范围:" prop="businessScope">
                <el-input type="textarea" v-model="openPartyGroupCustModel.businessScope" :rows="7"></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </div>
      </el-main>
      <el-footer class="create-cust-footer">
        <el-button size="mini" type="primary" @click="submitForm">确定</el-button>
        <el-button size="mini" @click="cancel">取消</el-button>
      </el-footer>
    </div>
</template>

<script>
import { cityData } from '@/dict/city.data'
import { DICTS } from '@/dict/dicts'
import {
  fetchUpdatePartyGroupCust
} from '@/api/privateCustomer'
import { mapState, mapActions } from "vuex";

export default {
  props:{
    publicCustInfo:{}
  },
  data() {
    return {
      DICTS:DICTS,
      cityData:cityData,
      openPartyGroupCustModel: {

      },
      rules: {
      }

    }
  },
  mounted(){
    this.openPartyGroupCustModel = this.publicCustInfo;
  },
  methods: {
    submitForm() {
      this.$refs.openPartyGroupCustModel.validate((valid) => {
        if (valid) {
          this.fetchUpdatePartyGroupCustFn();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    fetchUpdatePartyGroupCustFn(){
      let params = this.openPartyGroupCustModel;
      fetchUpdatePartyGroupCust(params).then((res) => {
        if(res.header.RetCode == '000000') {
          this.$emit("confirm");
          this.$parent.$parent.dialogVisiable = false;
        }
      })
    },
    cancel(){
      this.$parent.$parent.dialogVisiable = false;
    }
  },
  computed: {
    ...mapState({
        // publicCustInfo:state=>state.privateViewMain.publicCustInfo
    })
  },
}
</script>

<style lang="scss" scoped>
.create-cust{
  .create-cust-head{
    line-height: 30px;
    padding-left:10px ;
    background-color: #f2f2f2;
    font-size: 12px;
    font-weight: 500;
    color: #000;
  }
  /deep/.el-main{
    height:calc(100vh - 170px);
  }
  .create-cust-main{
    padding: 15px;
    .public-info{
      font-weight: 800;
      text-align: center;
      font-size: 14px;
      line-height: 28px;
      padding-top: 5px;
      border-top: 1px solid #ebebeb;
    }
    .cust-info{
      margin-left: 15px;
      font-size: 14px;
      line-height: 21px;
      padding-right: 60px;
      border-bottom: 1px solid #ebebeb;
    }
    .cust-basic-info{
      overflow: hidden;
      padding-top:15px;
      padding-right: 80px;
      /deep/.el-form-item__label{
        color: #000;
        font-weight: 600;
      }
      /deep/.el-form-item__content{
        padding:0 15px;
      }
    }
  }
  .create-cust-footer{
    display: flex;
    justify-content:flex-end;
    padding:15px;
    height: 67px;
  }
}

</style>

