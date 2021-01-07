<template>
  <div class="create-cust" v-loading="loading">
    <!-- <el-header class="create-cust-head" height="30px">快速开立个人客户</el-header> -->
    <el-main class="create-cust-main">
      <!-- <div>
        <div class="cust-info">客户信息</div>
        <el-form
          class="cust-basic-info"
          ref="custBasicInfoModel"
          :rules="rules"
          :model="custBasicInfoModel"
          label-width="243px"
          label-position="right"
        >
          <el-col :span="24">
            <el-form-item label="客户姓名:" prop="custName" required>
              <el-input v-model="custBasicInfoModel.custName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证件类型:" prop="idenType" required>
              <el-select v-model="custBasicInfoModel.idenType" placeholder="请选择" filterable>
                <el-option
                  v-for="item in DICTS.cus_idenType_type"
                  :key="item.value"
                  :label="item.text2"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证件号码:" prop="idNo" required>
              <el-input v-model="custBasicInfoModel.idNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证件到期日期:" prop="expireDate" required>
              <el-date-picker
                v-model="custBasicInfoModel.expireDate"
                value-format="yyyyMMdd"
                format="yyyyMMdd"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="性别:" prop="gender" required>
              <el-select v-model="custBasicInfoModel.gender" placeholder="请选择" filterable>
                <el-option
                  v-for="item in DICTS.cus_gender"
                  :key="item.value"
                  :label="item.text2"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="国籍:" prop="country" required>
              <el-select v-model="custBasicInfoModel.country" placeholder="请选择" filterable>
                <el-option
                  v-for="item in DICTS.cus_country"
                  :key="item.value"
                  :label="item.text2"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="民族:" prop="nation" required>
              <el-select v-model="custBasicInfoModel.nation" placeholder="请选择" filterable>
                <el-option
                  v-for="item in DICTS.cus_nation"
                  :key="item.value"
                  :label="item.text2"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="出生日期:" prop="birthDate">
              <el-date-picker
                v-model="custBasicInfoModel.birthDate"
                value-format="yyyyMMdd"
                format="yyyyMMdd"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="职业:" prop="occupation" required>
              <el-select v-model="custBasicInfoModel.occupation" placeholder="请选择" filterable>
                <el-option
                  v-for="item in DICTS.cus_occupation"
                  :key="item.value"
                  :label="item.text2"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系电话:" prop="phoneNo" required>
              <el-input v-model="custBasicInfoModel.phoneNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="工作单位:" prop="employerName">
              <el-input v-model="custBasicInfoModel.employerName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="单位电话:" prop="employerPhone">
              <el-input v-model="custBasicInfoModel.employerPhone" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="户籍地址:" prop="globalAddress" required>
              <el-input v-model="custBasicInfoModel.globalAddress"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="常住地址:" prop="homeAddress" required>
              <el-input v-model="custBasicInfoModel.homeAddress"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否面签:" prop="visaFlag" required>
              <el-select v-model="custBasicInfoModel.visaFlag" placeholder="请选择" filterable>
                <el-option
                  v-for="item in DICTS.cus_yesOrNo"
                  :key="item.value"
                  :label="item.text2"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="税收居民身份:" prop="reveIdentity" required>
              <el-select v-model="custBasicInfoModel.reveIdentity" placeholder="请选择" filterable>
                <el-option
                  v-for="item in DICTS.custAttribute_type"
                  :key="item.value"
                  :label="item.text2"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form>
      </div>
      <div>
        <div class="cust-info">代理人信息</div>
        <el-form
          class="cust-basic-info"
          ref="custBasicInfoModel1"
          :model="custBasicInfoModel"
          label-width="243px"
          label-position="right"
        >
          <el-col :span="24">
            <el-form-item label="代理人姓名:" prop="proxyName">
              <el-input v-model="custBasicInfoModel.proxyName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="代理人证件类型:" prop="proxyIdenType">
              <el-select v-model="custBasicInfoModel.proxyIdenType" placeholder="请选择" filterable>
                <el-option
                  v-for="item in DICTS.cus_idenType_type"
                  :key="item.value"
                  :label="item.text2"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="代理人证件号码:" prop="proxyIdenNum">
              <el-input v-model="custBasicInfoModel.proxyIdenNum"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证件到期日期:" prop="proxyIdenExpiraDate">
              <el-date-picker
                v-model="custBasicInfoModel.proxyIdenExpiraDate"
                value-format="yyyyMMdd"
                format="yyyyMMdd"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系电话:" prop="proxyTelNum">
              <el-input v-model="custBasicInfoModel.proxyTelNum"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </div> -->
      <iframe
        src="http://192.168.2.120:30396/#/buss/100000?iframe=1"
        frameborder="0"
        width="100%"
        style="height: 90%"
        @load="flowLoaded"
      ></iframe>
    </el-main>
    <el-footer class="create-cust-footer">
      <el-button size="mini" type="primary" @click="submitForm">确定</el-button>
      <el-button size="mini" @click="cancel">取消</el-button>
    </el-footer>
  </div>
</template>

<script>
import {
  fetchCreatePersonCust,
  fetchUpdatePersonCust
} from "@/api/privateCustomer";
import { mapState, mapActions } from "vuex";
import { DICTS } from "@/dict/dicts";
export default {
  // props: ["custBasicInfoModel"],
  data() {
    return {
      DICTS: DICTS,
      custBasicInfoModel: {
        country: "CHN"
      },
      rules: {},
      custNo: "",
      loading: true,
      flowParamsInfo: {}
    };
  },
  computed: {
    // ...mapState('custNo'),
  },
  mounted() {
    window.addEventListener("message", this.receiveMessage);
  },
  beforeDestory() {
    window.removeEventListener("message", this.receiveMessage);
  },
  methods: {
    // 快速开户message监听事件
    receiveMessage(event) {
      const data = event.data;
      if (data.cmd) {
        let tempData = data.params.flowNodeParas;
        let postData = {};
        for (const key in tempData) {
          if (tempData.hasOwnProperty(key)) {
            const element = tempData[key];
            Object.assign(postData, element.up);
          }
        }
        console.log("快速开户message监听事件" + postData);
        switch (data.cmd) {
          case "sellOrder":
            this.flowParamsInfo = postData;
            break;
        }
        // fetchCreatePersonCust(this.flowParamsInfo).then(res => {
        //   if (res.header.RetCode == "000000") {
        //     this.$store.commit("privateViewMain/CHANGE_CUST_NO", res.custNo);
        //     this.$store.commit(
        //       "privateViewMain/CHANGE_CUST_VIEW_VISIABLE_STATE",
        //       ""
        //     );
        //   }
        //   this.$parent.$parent.dialogVisiable = false;
        // });
      }
    },
    // iframe加载完成事件
    flowLoaded() {
      this.loading = false;
    },
    submitForm() {
      this.fetchCreatePersonCustFn();
      // this.$refs.custBasicInfoModel.validate((valid) => {
      //   if (valid) {
      //     // this.fetchCreatePersonCustFn();
      //     this.updata()
      //   } else {
      //     console.log("error submit!!");
      //     return false;
      //   }
      // });
    },
    updata() {
      console.log(this.$store);
      let data = {
        ...this.custBasicInfoModel
      };
      fetchUpdatePersonCust(this.custBasicInfoModel).then(res => {
        console.log(res);
        if (res.header.RetCode == "000000") {
          this.$parent.$parent.dialogVisiable = false;
        }
      });
    },
    fetchCreatePersonCustFn() {
      let params = {
        existingCustomer: "N",
        ...this.flowParamsInfo
      };
      fetchCreatePersonCust(params).then(res => {
          if (res.header.RetCode == "000000") {
            this.$store.commit("privateViewMain/CHANGE_CUST_NO", res.custNo);
            this.$store.commit(
              "privateViewMain/CHANGE_CUST_VIEW_VISIABLE_STATE",
              ""
            );
          }
          this.$parent.$parent.dialogVisiable = false;
          window.removeEventListener("message", this.receiveMessage);
        });
    },
    cancel() {
      this.$parent.$parent.dialogVisiable = false;
      window.removeEventListener("message", this.receiveMessage);
    }
  }
};
</script>

<style lang="scss" scoped>
.create-cust {
  height: 100%;
  .create-cust-head {
    line-height: 30px;
    padding-left: 10px;
    background-color: #f2f2f2;
    font-size: 12px;
    font-weight: 500;
    color: #000;
  }
  // /deep/.el-main{
  //   height:calc(100vh - 170px);
  // }
  .create-cust-main {
    padding: 15px;
    height: calc(100% - 60px);
    .cust-info {
      margin-left: 15px;
      font-size: 14px;
      line-height: 21px;
      padding-right: 60px;
      border-bottom: 1px solid #ebebeb;
    }
    .cust-basic-info {
      overflow: hidden;
      padding-top: 15px;
      padding-right: 80px;
      /deep/.el-form-item__label {
        color: #000;
        font-weight: 600;
      }
      // /deep/.el-form-item__content{
      //   padding:0 15px;
      // }
    }
  }
  .create-cust-footer {
    display: flex;
    justify-content: flex-end;
    padding: 15px;
    height: 67px;
  }
}
</style>
