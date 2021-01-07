<template>
  <div class="org-wrap" v-loading="loading">
    <!-- <el-form v-model="org" label-width="80px">
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
        <el-button type="primary" @click="companyOpen">机构开门</el-button>
      </el-form-item>
    </el-form> -->
    <iframe
      src="http://192.168.2.120:30396/#/buss/6666?iframe=1"
      frameborder="0"
      width="100%"
      style="height: 500px"
      @load="flowLoaded"
    ></iframe>
  </div>
</template>

<script>
import { fetchSignOrg } from "@/api/public";
export default {
  name: "orgOpen",
  data() {
    return {
      loading: true,
      org: {
        id: "",
        type: "",
        branchId: "",
        tellerName: "",
        tellerType: "",
        date: new Date().toLocaleDateString(),
      },
      flowParamsInfo:{}
    };
  },
  mounted() {
    window.addEventListener("message", this.receiveMessage);
  },
  beforeDestory(){
    window.removeEventListener("message", this.receiveMessage)
  },
  methods:{
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
        console.log('机构签到'+postData,event)
        switch (data.cmd) {
          case "sellOrder":
            this.flowParamsInfo = postData;
            break;
        }
        this.companyOpen(this.flowParamsInfo)
        this.$parent.$parent.dialogVisiable = false;
      }
    },
    // iframe加载完成事件
    flowLoaded(){
      this.loading = false
    },
    // 机构开门
    companyOpen() {
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
        branchId: "1",
        isForceClose: "1",
        tellerName: "1",
        tellerType: "1",
        orgDate: "2022-09-07",
      };
      fetchSignOrg(data)
        .then((res) => {
          if (res.header.GlobalSeq == "00000001") {
            this.$message({
              type: "success",
              message: "机构签到成功",
            });
          } else {
            this.$message({
              type: "error",
              message: "机构签到失败",
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  }
};
</script>

<style>
.org-wrap{
  width: 800px;
}
.btn{
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
</style>