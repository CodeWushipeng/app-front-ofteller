<template>
  <div class="org-wrap">
    <el-form v-model="org" label-width="80px">
      <el-form-item label="机构ID">
        <el-input v-model="org.id" placeholder="请输入机构ID"></el-input>
      </el-form-item>
      <el-form-item label="机构类型">
        <el-input v-model="org.type" placeholder="请输入机构类型"></el-input>
      </el-form-item>
      <el-form-item label="银行ID">
        <el-input v-model="org.branchId" placeholder="请输入银行ID"></el-input>
      </el-form-item>
      <el-form-item label="柜员姓名">
        <el-input v-model="org.tellerName" placeholder="请输入柜员姓名"></el-input>
      </el-form-item>
      <el-form-item label="柜员类型">
        <el-input v-model="org.tellerType" placeholder="请输入柜员类型"></el-input>
      </el-form-item>
      <el-form-item class="btn">
        <el-button type="primary" @click="companyClose">机构关门</el-button>
      </el-form-item>
    </el-form>
    <!-- <iframe
      src="http://192.168.2.120:30396/#/buss/9999?iframe=1"
      frameborder="0"
      width="100%"
      style="height: 90%"
      @load="flowLoaded"
    ></iframe> -->
  </div>
</template>

<script>
import { fetchSignOutOrg } from "@/api/public";
export default {
  name: "orgClose",
  data() {
    return {
      org: {
        id: "",
        type: "",
        branchId: "",
        tellerName: "",
        tellerType: "",
        date: new Date().toLocaleDateString(),
      },
    };
  },
  mounted() {
    window.addEventListener("message", this.receiveMessage, false);
  },
  beforeDestory(){
    window.removeEventListener("message", this.receiveMessage)
  },
  methods: {
    // iframe接收消息
    receiveMessage(event){
      const data = event.data
      if (data.cmd) {
        let tempData = data.params.flowNodeParas;
        let postData = {}
        for (const key in tempData) {
          if (tempData.hasOwnProperty(key)) {
            const element = tempData[key];
            Object.assign(postData,element.up)
          }
        }
        console.log(postData)
        switch (data.cmd) {
          case "sellOrder":
            this.flowParamsInfo = postData;
            break;
        }
        fetchCreatePersonCust(this.flowParamsInfo).then((res) => {
        if (res.header.RetCode == "000000") {
          this.$store.commit("privateViewMain/CHANGE_CUST_NO", res.custNo);
          this.$store.commit(
            "privateViewMain/CHANGE_CUST_VIEW_VISIABLE_STATE",
            ""
          );
        }
        this.$parent.$parent.dialogVisiable = false;
      });
      }
    },
    // iframe加载完成事件
    flowLoaded(){
      this.loading = false
    },
    // 机构关门
    companyClose() {
      let data = {
        Header: {
          SourceSysId: "123456",
          ConsumerId: "11112",
          Mac: "50-5B-C2-BD-5A-E9",
          KeyId: "2222",
          ServiceCode: "signOrgOut",
          ServiceName: "query",
          TranCode: "111",
          GlobalSeq: "00000001",
          TranSeq: "888888888",
          Channel: "A1",
          TerminalCode: "333",
          BranchId: "444",
          TranTeller: "100001",
          AuthTeller: "0460",
          AuthPwd: "123456",
          AuthFlag: "1",
          TranDate: "20200728",
          TranTime: "095001",
          LocalLang: "1",
          CurrentPageNum: "1",
          PageStart: "1",
          PageEnd: "10",
          LegalRepCode: "C009",
          ExtendContent: "F0098",
          TotalNum: "10",
        },
        orgId: "800000",
        orgType: "1",
        branchId: "001",
        isForceClose: "0",
        tellerName: "CY",
        tellerType: "1",
        orgDate: "2020-09-07",
      };
      fetchSignOutOrg(data)
        .then((res) => {
          if (res.header.GlobalSeq == "00000001") {
            this.$message({
              type: "success",
              message: "机构关门成功",
            });
          } else {
            this.$message({
              type: "error",
              message: "机构关门失败",
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
.org-wrap{
  width: 400px;
  margin: 200px auto 0;
}
.btn{
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
</style>