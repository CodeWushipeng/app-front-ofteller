<template>
  <div class="create-cust">
    <div class="privateMask"></div>
    <div class="privateDiv">
      <div class="heade">客户识别窗口</div>
      <div class="body">
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item label="识别类型:">
            <el-select v-model="form.region" placeholder="请选择识别类型">
              <el-option
                v-for="(item, index) in typeList"
                :key="index"
                :label="item.discernTypeName"
                :value="item.discernTypeId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="识别号码:">
            <el-input
              type
              v-model="form.regionID"
              placeholder="请输入识别号码"
              @change="discernClient"
            ></el-input>
          </el-form-item>
          <el-form-item label="客户姓名:">
            <el-input
              type="input"
              v-model="form.name"
              placeholder="请输入客户姓名"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-checkbox
              label="是否代理:"
              name="type"
              v-model="form.type"
            ></el-checkbox>
          </el-form-item>
          <template v-if="form.type">
            <el-form-item label="代理人识别类型">
              <el-select
                v-model="form.agentType"
                placeholder="请选择代理人类型"
              >
                <el-option
                  v-for="(item, index) in typeList"
                  :key="index"
                  :label="item.discernTypeName"
                  :value="item.discernTypeId"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="代理人识别号码">
              <el-input
                v-model="form.agentID"
                placeholder="请输入代理人识别号码"
              ></el-input>
            </el-form-item>
            <el-form-item label="代理人姓名">
              <el-input
                v-model="form.agentName"
                placeholder="请输入代理人姓名"
              ></el-input>
            </el-form-item>
            <el-form-item label="证件类型">
              <el-select v-model="form.notarType" placeholder="请选择证件类型">
                <el-option label="居民身份证" value="110001"></el-option>
                <el-option label="外国护照" value="110027"></el-option>
                <el-option
                  label="台湾居民来往大陆通行证"
                  value="110021"
                ></el-option>
                <el-option
                  label="港澳居民往来内地通行证"
                  value="110019"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="证件号码">
              <el-input
                v-model="form.notarNo"
                placeholder="请输入证件号码"
              ></el-input>
            </el-form-item>
          </template>
          <el-form-item class="btn-group">
            <el-button>取消</el-button>
            <el-button type="primary" class="discern" @click="onSubmit"
              >识别客户</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
    <ComDialog ref="comDialog" title="快速开立个人客户">
      <create-cust-info></create-cust-info>
      <!-- <iframe
        src="http://localhost:9529/#/buss/100000"
        frameborder="0"
        width="100%"
        style="height: 90%"
        @load="flowLoaded"
      ></iframe> -->
    </ComDialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import CreateCustInfo from "./PrivateViews/FormComponents/createCustInfo";
import ComDialog from "@/components/ComBase/com-dialog";
import {RES_OK} from "@/api/config";
// import { fetchSelectPersonCustDiscernInfo } from "@/api/privateCustomer/index";
import {
  queryDiscernType,
  queryDiscernInfo,
  referDiscernInfo
} from "@/api/clientApi";
export default {
  components: {
    CreateCustInfo,
    ComDialog
  },
  data() {
    return {
      typeList: [],
      form: {
        name: "",
        region: "ch0001",
        regionID: "",
        date1: "",
        date2: "",
        delivery: false,
        type: false,
        agentType: "",
        agentID: "",
        agentName: "",
        notarType: "",
        notarNo: "",
        resource: "",
        desc: ""
      },
    };
  },
  created() {
    this.getDiscernType();
  },
  methods: {
    // 获取识别类型
    getDiscernType() {
      let postData = {
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
        discernTypeId: "",
        discernTypeName: "",
        pageSize: "10",
        pageNum: "1"
      };
      queryDiscernType(postData)
        .then(res => {
          console.log(res);
          if (res.header.rspCode == RES_OK) {
            this.$message({
              type: "error",
              message: res.header.RetMsg
            });
            this.typeList = res.discernTypeList;
          } else {
            this.$message({
              type: "error",
              message: res.header.RetMsg
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 识别客户
    discernClient() {
      let postData = {
        regionID: this.form.regionID
      };
      queryDiscernInfo(postData)
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 提交客户信息并识别客户
    onSubmit() {
      var postData;
      if (this.form.type) {
        postData = {
          discernType: this.form.region,
          discernId: this.form.regionID,
          custName: this.form.name,
          agentDiscernType: this.form.agentType,
          agentDiscernId: this.form.agentID,
          agentName: this.form.agentName,
          notarType: this.form.notarType,
          notarNo: this.form.notarNo
        };
      } else {
        postData = {
          discernType: this.form.region,
          custName: this.form.name,
          discernId: this.form.regionID ? this.form.regionID : "1001760000",
          // discernId: this.form.regionID,
          agentDiscernType: this.form.agentType,
          agentDiscernId: this.form.agentID,
          agentName: this.form.agentName,
          notarType: this.form.notarType,
          notarNo: this.form.notarNo
        };
      }
      console.log("aaaaa", postData);
      referDiscernInfo(postData)
        .then(res => {
          console.log(res);
          if (res.header.rspCode == RES_OK) {
            this.$message({
              message: "识别成功",
              type: "success"
            });
            if (res.body.length) {
              let custInfo = { ...res };
              console.log(custInfo);
              this.$store.commit("privateViewMain/SET_CUST_INFO", custInfo);
              this.$store.commit(
                "privateViewMain/SET_CUST_NAME",
                res.body[0].custName
              );
              this.$store.commit(
                "privateViewMain/CHANGE_CUST_NO",
                res.body[0].custNo
              );
              this.$store.commit(
                "privateViewMain/SET_CUST_ID",
                res.body[0].idenNo
              );
            }
            this.$router.push(`/customerView`);
          } else if (res.header.rspCode == "999999") {
            this.$refs.comDialog.dialogVisiable = true;
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
.create-cust .el-dialog__body {
  height: calc(100% - 60px);
}
</style>
<style lang="scss" scoped>
.create-cust {
  height: calc(100vh - 81px);
  padding-top: 80px;
  box-sizing: border-box;
  position: relative;
  .privateMask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }
  .privateDiv {
    position: absolute;
    z-index: 1000;
    left: 50%;
    transform: translateX(-50%);
    background-color: white;
    width: 500px;
    border-radius: 3px;
    .heade {
      padding: 20px 70px;
      // border-bottom: 1px solid;
      color: #333;
      position: relative;
    }
    .heade:after {
      position: absolute;
      bottom: 0;
      left: 0;
      content: "";
      width: 74%;
      height: 1px;
      background-color: #ccc;
      transform: translateX(18%);
    }
    .body {
      padding: 20px;
    }
  }
}

.create-cust-head {
  line-height: 30px;
  padding-left: 10px;
  background-color: #f2f2f2;
  font-size: 12px;
  font-weight: 500;
  color: #000;
}
.el-input,
.el-select {
  width: 300px;
}
.btn-group {
  display: flex;
  flex-direction: row-reverse;
}
.discern {
  margin-left: 30px;
}
</style>
