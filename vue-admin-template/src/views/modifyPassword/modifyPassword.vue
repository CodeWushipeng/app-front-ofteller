<template>
  <div class="modifyPassword">
    <el-form class="from-wrap" label-width="120px">
      <el-form-item label="登录名">
        <el-input placeholder="请输入登录名" v-model="customerLoginId"></el-input>
      </el-form-item>
      <el-form-item label="渠道号">
        <el-input placeholder="请输入渠道号" v-model="sourceSystemId"></el-input>
      </el-form-item>
      <el-form-item label="原密码">
        <el-input placeholder="请输入原密码" v-model="oldLoginPwd"></el-input>
      </el-form-item>
      <el-form-item label="新密码">
        <el-input placeholder="请输入新密码" v-model="newLoginPwd"></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input placeholder="请再次输入密码" v-model="againLoginPwd"></el-input>
      </el-form-item>
    </el-form>
    <div class="modify">
      <el-button type="primary" @click="modifyPassword">修改密码</el-button>
    </div>
  </div>
</template>

<script>
import { fetchemployeeChangePassword } from "@/api/login/login";
export default {
  data() {
    return {
      customerLoginId: "",
      sourceSystemId: "",
      oldLoginPwd: "",
      newLoginPwd: "",
      againLoginPwd: "",
    };
  },
  methods: {
    modifyPassword() {
      // let data = {
      //   customerLoginId: this.customerLoginId,
      //   sourceSystemId: this.sourceSystemId,
      //   oldLoginPwd: this.oldLoginPwd,
      //   newLoginPwd: this.newLoginPwd,
      //   againLoginPwd: this.againLoginPwd,
      // };
      let data = {
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
        userLoginId: "100089",
        oldLoginPwd:
          "7250FF04464D1DD01434969818F589B222241F9BC00E6770C1835CF051AF09AA",
        newLoginPwd:
          "207CF410532F92A47DEE245CE9B11FF71F578EBD763EB3BBEA44EBD043D018FB",
        againLoginPwd:
          "207CF410532F92A47DEE245CE9B11FF71F578EBD763EB3BBEA44EBD043D018FB",
        loginTellerId: "100001",
      };
      fetchemployeeChangePassword(data)
        .then((res) => {
          if (res.header.RetCode === "000000") {
            this.$message({
              trpe: "success",
              message: "密码修改成功",
            });
          } else {
            this.$message({
              trpe: "fail",
              message: "密码修改失败",
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

<style lang="scss" scoped>
.modifyPassword {
  background-color: #fff;
  height: calc(100vh - 160px);
  .from-wrap{
    margin: 0 auto;
    width: 550px;
    padding-top: 60px;
  }
  .el-form-item {
    margin-bottom: 20px;
  }
  .modify {
    display: flex;
    justify-content: center;
  }
}
</style>