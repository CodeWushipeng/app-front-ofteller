<template>
  <div class="wrap">
    <div class="emploee-wrap">
      <p class="title">登录</p>
      <el-form ref="loginForm" :model="login" label-width="120px">
        <el-form-item label="验证方式">
          <el-select v-model="login.verifyWays" placeholder="请选择验证方式">
            <el-option
              v-for="(item, index) in verifyList"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="账号">
          <el-input v-model="login.userId" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            v-model="login.password"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="权限信息标识">
          <el-select
            v-model="login.competenceMark"
            placeholder="请选择权限信息标识"
          >
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标识">
          <el-select v-model="login.tokenMark" placeholder="请选择标识">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <div class="btn-wrap">
          <el-button type="primary" @click="toLogin">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import {
  queryTellerVerifyWays,
  queryUserByIdExt,
  queryLegalPersonByOrgIdExt,
  fetchlogin,
  queryTellerInfo
} from "@/api/login/login";
export default {
  data() {
    return {
      verifyList: [
        {
          label: "密码",
          value: "PWD"
        },
        {
          label: "指纹信息",
          value: "finger"
        },
        {
          label: "人脸信息",
          value: "face"
        },
        {
          label: "虹膜信息",
          value: "hm"
        }
      ],
      login: {
        verifyWays: "PWD",
        competenceMark: "1",
        tokenMark: "0",
        userId: "100001",
        password:
          "207CF410532F92A47DEE245CE9B11FF71F578EBD763EB3BBEA44EBD043D018FB"
      },
      ways: {},
      tellerInfo:{},
      corporate: null
    };
  },
  methods: {
    // 查询验证方式
    checkType() {
      return new Promise((resolve, reject) => {
        let postData = {
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
            TotalNum: "10"
          },
          userId: this.login.userId,
          sysId: 'A13'
        };
        queryTellerVerifyWays(postData)
          .then(res => {
            console.log(res);
            if (res.header.RetCode == "000000") {
              this.ways = res.ways;
              resolve();
            } else {
              this.$message({
                type: "error",
                message: res.Header.RetMsg
              });
            }
          })
          .catch(error => {
            console.log(error);
          });
      });
    },
    // 查询柜员信息
    queryTellerInfo() {
      return new Promise((resolve, reject) => {
        let postData = {
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
            TotalNum: "10"
          },
          userId: this.login.userId
        };
        queryUserByIdExt(postData)
          .then(res => {
            if (res.header.RetCode == "000000") {
              let tellerInfo = res
              delete tellerInfo.header
              this.tellerInfo = tellerInfo
              localStorage.setItem('tellerInfo',JSON.stringify(this.tellerInfo))
              resolve();
            } else {
              this.$message({
                type: "error",
                message: res.Header.RetMsg
              });
            }
          })
          .catch(error => {
            console.log(error);
          });
      });
    },
    // 根据机构号查询法人信息
    queryLegalPerson() {
      return new Promise((resolve, reject) => {
        let postData = {
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
            TotalNum: "10"
          },
          orgId: this.tellerInfo.orgId
        };
        queryLegalPersonByOrgIdExt(postData)
          .then(res => {
            if (res.header.RetCode == "000000") {
              this.corporate = res.legalPersonInfo
              localStorage.setItem('corporate',JSON.stringify(this.corporate))
              resolve();
            } else {
              this.$message({
                type: "error",
                message: res.Header.RetMsg
              });
            }
          })
          .catch(error => {
            console.log(error);
          });
      });
    },
    // 登录接口
    commitLogin() {
      let data = {
        ...this.login
      };
      fetchlogin(data)
        .then(res => {
          if (res.header.RetCode == "000000") {
            this.$message({
              message: "登录成功",
              type: "success"
            });
            let userInfo = res.body;
            this.$store.commit("user/SET_TOKEN", res.body.token);
            this.$store.commit("user/SET_NAME", res.body.userName);
            this.$store.commit("user/SET_INFO", userInfo);
            localStorage.setItem("userInfo", JSON.stringify(userInfo));
            this.$router.push("/");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 查询柜员信息接口
    getUserInfo() {
      let data = {
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
          TranTeller: "100001",
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
          ExtendContent: "",
          amountAttrName: 0
        },
        tellerId: "100001",
        tellerName: "",
        tellerStatus: "",
        partyId: "100089",
        personType: "",
        gender: "",
        pageNum: "1",
        pageSize: "100",
        loginTellerId: "100089",
        legalPerson: "",
        sysId: "A13"
      };
      queryTellerInfo(data)
        .then(res => {
          if (res.header.RetCode == "000000") {
            if (res.tellerBaseMap.tellerSignStatus == "1") {
              this.$router.push("/");
            } else {
              this.$router.push("/signIn");
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 登录按钮点击综合验证
    toLogin: async function() {
      await this.checkType().then(() => {
        this.queryTellerInfo().then(() => {
          this.queryLegalPerson()
          .then(()=>{
            this.commitLogin()
          })
        });
      });
      // await this.checkType()
      // await this.queryTellerInfo()
      // await this.queryLegalPerson()
      // await this.commitLogin()
    },
    
  }
};
</script>

<style>
.emploee-wrap .el-form-item__label {
  color: #fff;
}
</style>

<style lang="scss" scoped>
.wrap {
  background-color: #2d3a4b;
  // padding-top: 200px;
  height: 100vh;
}
.emploee-wrap {
  height: 43vh;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .title {
    color: #fff;
    font-size: 20px;
    padding-left: 120px;
    text-align: center;
    margin-bottom: 30px;
  }
  .el-form {
    width: 460px;
  }
  .el-select {
    width: 100%;
  }
  .btn-wrap {
    display: flex;
    justify-content: center;
    margin: 60px 0 60px 120px;
  }
}
</style>
