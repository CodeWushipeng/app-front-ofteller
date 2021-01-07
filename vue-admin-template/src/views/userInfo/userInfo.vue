<template>
  <div class="user-wrap">
    <!-- <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="柜员基本信息" name="1">
        <div>所属机构：{{userInfo.orgName}}</div>
        <div>用户名：{{userInfo.userName}}</div>
        <div v-for="(item, index) in userInfo.userPostList" :key="index">
          <div>岗位体系：{{item.postFrameName}}</div>
          <div>岗位：{{item.postName}}</div>
        </div>
      </el-collapse-item>
    </el-collapse>-->
    <el-form label-width="80px" :inline="true" label-position="left">
      <el-form-item label="行员号:">
        <el-input v-model="tellerId" placeholder="请输入行员号"></el-input>
      </el-form-item>
      <el-form-item style="margin-left:20px">
        <el-button type="primary" icon="el-icon-search" @click="getUserInfo">查询</el-button>
      </el-form-item>
    </el-form>
    <h6 style="margin-bottom:30px;border-bottom:1px solid #eee;padding-bottom:20px;">柜员详细信息</h6>
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <span>生日：</span>
          {{employeeInfo.birthday}}
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <span>邮箱：</span>
          {{employeeInfo.email}}
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <span>姓名：</span>
          {{employeeInfo.tellerName}}
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <span>性别：</span>
          {{employeeInfo.gender | traSex}}
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <span>手机：</span>
          {{employeeInfo.telephone}}
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <span>证件类型：</span>
          {{employeeInfo.certificateType}}
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <span>证件号码：</span>
          {{employeeInfo.identityCard}}
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <span>学历：</span>
          {{employeeInfo.educationDegree}}
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <span>签到状态:</span>
          {{employeeInfo.tellerSignStatus | tanStatus}}
        </div>
      </el-col>
      <!-- <el-col :span="6">
        <div class="grid-content bg-purple">
          <span>行员状态：</span>
          {{employeeInfo.status}}
        </div>
      </el-col> -->
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <span>密码策略标识：</span>
          {{employeeInfo.planId}}
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <span>密码策略描述：</span>
          {{employeeInfo.planDescription}}
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <span>用户类型：</span>
          {{employeeInfo.personType}}
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <span>是否分配岗位：</span>
          {{employeeInfo.isAllotPost | traStation}}
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <span>机构标识：</span>
          {{employeeInfo.orgId}}
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <span>机构名称：</span>
          {{employeeInfo.orgName}}
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <span>是否录入指纹:</span>
          {{employeeInfo.isCollectFinger | traFinger}}
        </div>
      </el-col>
      
      <el-col :span="6">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple"></div>
      </el-col>
    </el-row>
    <div class="emplyeeInfo">
      
      <!-- <div> <span>岗位名称：</span> {{employeeInfo.postRoleData.postName}} </div>
      <div> <span>岗位标识:</span> {{employeeInfo.postRoleData.postId}} </div>
      <div> <span>角色标识:</span> {{employeeInfo.postRoleData.roleIds}} </div>
      <div> <span>角色名称:</span> {{employeeInfo.postRoleData.roleNames}} </div>-->
      <!-- <div>
        <span>角色列表</span>
        <div v-for="(item, index) in employeeInfo.roleList" :key="index">
          <div>角色标识: {{item.roleId}}</div>
          <div>角色名称: {{item.roleName}}</div>
        </div>
      </div>
      <div>
        <span>权限列表</span>
        <div v-for="(item, index) in employeeInfo.permissionLost" :key="index">
          <div>角色标识: {{item.permissionId}}</div>
          <div>角色名称: {{item.permissionName}}</div>
        </div>
      </div>
      <div>
        <span>可登录系统列表</span>
        <div v-for="(item, index) in employeeInfo.sysList" :key="index">
          <div>系统标识: {{item.sysId}}</div>
          <div>系统名称: {{item.sysName}}</div>
          <div>登录验证方式标识: {{item.waysId}}</div>
          <div>登录验证方式描述: {{item.waysDescription}}</div>
        </div>
      </div>
      <div>
        <span>密码使用天数:</span>
        {{employeeInfo.cipherUseDayCount}}
      </div>
      <div>
        <span>密码使用次数:</span>
        {{employeeInfo.cipherUseCount}}
      </div>
      <div>
        <span>法人编号:</span>
        {{employeeInfo.legalPerson}}
      </div> -->
    </div>
    <!-- <el-button type="primary" icon="el-icon-switch-button" @click="userLogout">退出登录</el-button> -->
  </div>
</template>

<script>
import {
  fetchemployeeInfo,
  fetchqueryPartyDetailedInfo,
  fetchlogout,
} from "@/api/login/login";
export default {
  data() {
    return {
      activeNames: ["1"],
      userInfo: JSON.parse(localStorage.getItem("userInfo")),
      tellerId: "",
      employeeInfo: {},
      partyInfo: {},
    };
  },
  computed: {
    loginTellerId: function () {
      return this.userInfo.tellerId;
    },
  },
  filters: {
    tanStatus: function (value) {
      if (value == "1") {
        return "已签到";
      } else if (value == "2") {
        return "已签退";
      }
    },
    traSex: function (value) {
      if (value == "1") {
        return "男";
      } else if (value == "2") {
        return "女";
      }
    },
    traFinger: function (value) {
      if (value == true) {
        return "是";
      } else if (value == false) {
        return "否";
      }
    },
    traStation: function (value) {
      if (value == true) {
        return "是";
      } else if (value == false) {
        return "否";
      }
    },
  },
  mounted(){
    this.getUserInfo()
  },
  methods: {
    handleChange(val) {
      console.log(val);
    },
    userLogout() {
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      let data = {
        Header: {
          SourceSysId: "123",
          ConsumerId: "123",
          Mac: "000d874E8046",
          KeyId: "1232123llp",
          ServiceCode: "0023",
          ServiceName: "testing",
          TranCode: "9063852697",
          GlobalSeq: "923456789",
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
          ExtendContent: "",
          amountAttrName: 0,
        },
        userLoginId: userInfo.tellerId,
      };
      fetchlogout(data)
        .then((res) => {
          if (res.header.RetCode == "000000") {
            this.$message("已退出登录");
          } else {
            this.$message({
              type: "error",
              message: "退出登录失败",
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getUserInfo() {
      // let data = {
      //   tellerId: this.tellerId,
      //   loginTellerId: this.loginTellerId,
      // };
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
          amountAttrName: 0,
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
        sysId: "A13",
      };
      fetchemployeeInfo(data)
        .then((res) => {
          this.employeeInfo = res.tellerBaseMap;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    searchPartyDetailedInfo() {
      fetchqueryPartyDetailedInfo(data)
        .then((res) => {
          this.partyInfo = res.partyInfo;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.user-wrap {
  padding: 30px 30px;
  background: #fff;
  div {
    margin-bottom: 20px;
  }
}
</style>