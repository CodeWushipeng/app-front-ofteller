<template>
  <div class="navbar">
    <div class="nav-header">
      <span class="title">
        柜面系统
        <span class="date">会计日期：2020年6月29日</span>
      </span>
      <div class="right-menu">
        <el-button type="text" @click="dialogIMVisible = true" icon="el-icon-s-comment iconCla"></el-button>

        <template>
          <screenfull id="screenfull" class="right-menu-item hover-effect" />
        </template>

        <el-dropdown class="avatar-container" trigger="click">
          <div class="avatar-wrapper">
            <img src="../../assets/images/user.png" class="user-avatar" />
            <i class="el-icon-caret-bottom" />
          </div>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <router-link to="/modifyPassword">
              <el-dropdown-item>修改密码</el-dropdown-item>
            </router-link>
            <!-- <router-link to="/voucherBox">
              <el-dropdown-item>领取尾箱</el-dropdown-item>
            </router-link> -->
            <!-- <a target="_blank" href="https://github.com/PanJiaChen/vue-admin-template/">
              <el-dropdown-item>Github</el-dropdown-item>
            </a>
            <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
              <el-dropdown-item>Docs</el-dropdown-item>
            </a>-->
            <el-dropdown-item divided @click.native="logout">
              <span @click="userLogout">退出登录</span>
            </el-dropdown-item>
            <!-- <el-dropdown-item divided @click.native="signOut">
              <span>柜员签退</span>
            </el-dropdown-item> -->
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <!-- <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#304156"
      text-color="#fff"
      active-text-color="#409EFF"
      router
    >
        <el-submenu index="1">
          <template slot="title">产品中心</template>
          <el-menu-item index="searchBoxStore" :router="{path:'/searchBoxStore'}">尾箱查库</el-menu-item>
          <el-menu-item :router="{path:'/checkBoxStore'}">尾箱碰库</el-menu-item>
          <el-menu-item index="voucherBox">尾箱领取</el-menu-item>
        </el-submenu>
      <el-submenu index="2">
        <template slot="title">公共管理</template>
        <el-menu-item @click="companyOpen">机构开门</el-menu-item>
        <el-menu-item @click="companyClose">机构关门</el-menu-item>
      </el-submenu>
      <el-menu-item index="3">消息中心</el-menu-item>
    </el-menu> -->
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <breadcrumb class="breadcrumb-container" />

    <el-dialog :visible.sync="dialogIMVisible">
      <iframe
        width="100%"
        height="100%"
        src="http://192.168.2.120:30903/#/chat?token=zhuoxihua&imType=1"
        frameborder="0"
        name="myFrameName"
        id="myFrameName"
      ></iframe>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import Screenfull from "@/components/Screenfull";
import { fetchlogout } from "@/api/login/login";
import { fetchSignOut, fetchSignOrg, fetchSignOutOrg } from "@/api/public";

export default {
  components: {
    Breadcrumb,
    Hamburger,
    Screenfull,
  },
  data() {
    return {
      dialogIMVisible: false,
      activeIndex: "1",
    };
  },
  computed: {
    ...mapGetters(["sidebar", "avatar"]),
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
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
              message: "机构开门成功",
            });
          } else {
            this.$message({
              type: "error",
              message: "机构开门失败",
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
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
/* .navbar .el-submenu__title .el-submenu__icon-arrow {
    display: block !important;
  } */
</style>
<style lang="scss" scoped>
.navbar {
  // height: 80px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  color: #fff;
  border-bottom: 1px solid #ddd;

  .nav-header {
    line-height: 50px;
    height: 50px;
    background-color: #304156;

    .title {
      font-size: 20px;
      padding-left: 15px;
    }

    .date {
      padding-left: 14px;
      font-size: 18px;
    }
  }
  .hamburger-container {
    line-height: 30px;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
    height: 30px;
    line-height: 30px;
  }

  .right-menu {
    float: right;
    height: 40px;
    line-height: 40px;
    .el-button {
      padding: 0;
      /deep/ {
        i {
          font-size: 30px;
          vertical-align: 4px;
        }
      }
    }
    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #fff;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }

  .el-dialog__wrapper {
    width: 100%;
    /deep/ {
      .el-dialog {
        width: 70%;
        height: auto;
        margin-top: 0 !important;
        .el-dialog__header {
          padding: 0;
        }
        .el-dialog__body {
          padding: 0;
          height: 650px;
        }
      }
    }
  }
}
</style>
