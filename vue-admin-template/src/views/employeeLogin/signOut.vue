<template>
  <div class="org-wrap">
    <el-form v-model="org" label-width="120px">
      <el-form-item label="密码">
        <el-input
          v-model="org.password"
          type="password"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="柜员类型">
        <el-input
          v-model="org.tellerType"
          placeholder="请输入柜员类型"
        ></el-input>
      </el-form-item>
      <el-form-item label="柜员机构代码">
        <el-input
          v-model="org.tellerOrgCode"
          placeholder="请输入柜员机构代码"
        ></el-input>
      </el-form-item>
      <el-form-item label="柜员机构类型">
        <el-input
          v-model="org.tellerOrgType"
          placeholder="请输入柜员机构类型"
        ></el-input>
      </el-form-item>
      <el-form-item label="柜员姓名">
        <el-input
          v-model="org.tellerName"
          placeholder="请输入柜员姓名"
        ></el-input>
      </el-form-item>
      <el-form-item class="btn">
        <el-button type="primary" @click="signOut">柜员签退</el-button>
      </el-form-item>
    </el-form>
    <!-- <iframe
      src="http://192.168.2.120:30396/#/buss/8888?iframe=1"
      frameborder="0"
      width="100%"
      style="height: 90%"
      @load="flowLoaded"
    ></iframe> -->
  </div>
</template>

<script>
import { fetchSignOut } from "@/api/public";
export default {
  name: "orgClose",
  data() {
    return {
      org: {
        password: "",
        returnType: "1",
        tellerType: "",
        tellerOrgCode: "",
        tellerOrgType: "",
        tellerName: "",
        tellerId: "",
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
    // 柜员签退
    signOut() {
      let data = {
        Header: {
          SourceSysId: "123456",
          ConsumerId: "11111",
          Mac: "50-5B-C2-BD-5A-E9",
          KeyId: "2222",
          ServiceCode: "undoTask",
          ServiceName: "query",
          TranCode: "111",
          GlobalSeq: "00000002",
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
        tellerId: "100001",
        tellerName: "1",
        password: "",
        returnType: "1",
        tellerType: "",
        tellerOrgCode: "",
        tellerOrgType: "",
        tellerDate: "2020-09-07",
      };
      fetchSignOut(data)
        .then((res) => {
          if (res.header.RetCode == "000000") {
            this.$message({
              type: "success",
              message: "签退成功",
            });
          } else {
            this.$message({
              type: "error",
              message: "签退失败",
            });
          }
        })
        .catch((error) => {
          this.$message({
            type: "error",
            message: "网络错误，稍后重试",
          });
          console.log(error);
        });
    },
  },
};
</script>

<style>
.org-wrap {
  width: 400px;
  margin: 200px auto 0;
}
.btn {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
</style>