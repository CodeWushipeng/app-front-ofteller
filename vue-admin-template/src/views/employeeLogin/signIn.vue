<template>
  <div class="org-wrap">
    <el-form v-model="org" label-width="120px">
      <el-form-item label="机构代码">
        <el-input v-model="org.Code" placeholder="请输入机构代码"></el-input>
      </el-form-item>
      <el-form-item label="柜员姓名">
        <el-input
          v-model="org.tellerName"
          placeholder="请输入柜员姓名"
        ></el-input>
      </el-form-item>
      <el-form-item class="btn">
        <el-button type="primary" @click="signIn">柜员签到</el-button>
      </el-form-item>
    </el-form>
    <!-- <iframe
      src="http://192.168.2.120:30396/#/buss/7777?iframe=1"
      frameborder="0"
      width="100%"
      style="height: 90%"
      @load="flowLoaded"
    ></iframe> -->
  </div>
</template>

<script>
import { modifyTeller } from "@/api/login/login";
export default {
  name: "orgClose",
  data() {
    return {
      org: {
        Code: "",
        tellerName: "",
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
    // 柜员签到
    signIn() {
      let user_data = {
        Header: {
          SourceSysId: "1",
          ConsumerId: "1",
          ServiceCode: "1",
          TranCode: "1",
          GlobalSeq: "1",
          TranSeq: "1",
          Channel: "1",
          BranchId: "1",
          TranTeller: "100001",
          AuthFlag: "1",
          TranDate: "20180821",
          TranTime: "230651354",
          LocalLang: "1",
          LegalRepCode: "1",
          PageStart: "0",
          PageEnd: "1",
          TotalNum: "10",
        },
        tellerId: "123456",
        userLoginId: "123456",
        status: "1",
        tellerName: "柜员test123456",
        email: "190916516@qq.com",
        gender: "1",
        personType: "TELLER",
        birthday: "2020-07-02",
        telephone: "15529038219",
        certificateType: "119999",
        identityCard: "234323422345322344",
        planId: "TellerPwdPlan",
        orgId: "800000",
        tellerSignStatus: "1",
        postRoleData: [
          {
            postId: "Admin",
            roleIds: "AllMenuRole",
          },
        ],
        legalPerson: "FR001",
        headPortrait: "",
      };
      modifyTeller(user_data)
        .then((res) => {
          if (res.header.RetCode == "000000") {
            this.$message({
              type: "success",
              message: "签到成功",
            });
            this.$router.back();
          } else {
            this.$message({
              type: "error",
              message: "签到失败",
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