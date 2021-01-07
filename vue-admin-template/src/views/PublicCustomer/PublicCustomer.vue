<template>
  <div class="createPublic">
    <div class="privateMask"></div>
    <div class="privateDiv">
      <div class="heade">
        企业识别窗口<span
          class="el-icon-close close"
          @click="pathToHome"
        ></span>
      </div>
      <div class="body">
        <el-form ref="publicForm" :model="publicForm" :rules="publicRules" label-width="120px">
          <el-form-item label="识别类型:" prop="region">
            <el-select v-model="publicForm.region" placeholder="请选择识别类型">
              <el-option label="客户号识别" value="ch0001"></el-option>
              <el-option label="卡号识别" value="kh0001"></el-option>
              <el-option label="统一社会信用代码" value="610065"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="识别号码:" prop="regionID">
            <el-input type v-model="publicForm.regionID"></el-input>
          </el-form-item>
          <el-form-item label="客户名称:">
            <el-input type="input" v-model="publicForm.name"></el-input>
          </el-form-item>
          <el-form-item class="btn-group">
            <el-button @click="pathToHome">取消</el-button>
            <el-button class="discern" type="primary" @click="onSubmit"
              >识别企业</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchSelectCompCustDiscernInfo } from "@/api/privateCustomer/index";
export default {
  data() {
    return {
      publicForm: {
        name: "",
        region: "ch0001",
        regionID: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      publicRules: {
        region: [
          { required: true, message: "请选择识别类型", trigger: "change" }
        ],
        regionID: [
          { required: true, message: "请输入识别号码", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 点击取消回到首页
    pathToHome() {
      this.$router.push("/dashboard");
    },
    onSubmit() {
      this.$refs["publicForm"].validate(valid => {
        if (valid) {
          let postData = {
            discernType: this.publicForm.region,
            discernId: this.publicForm.regionID
          };
          fetchSelectCompCustDiscernInfo(postData)
            .then(res => {
              console.log(res);
              if (res.header.RetCode == "000000") {
                this.$message({
                  showClose: true,
                  message: "识别成功",
                  type: "success"
                });
                this.$router.push(`/publicView`);
              } else {
                this.$message({
                  showClose: true,
                  message: res.header.RetMsg,
                  type: "error"
                });
              }
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.createPublic {
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
    background-color: white;
    width: 500px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 3px;

    .heade {
      padding: 20px 60px;
      color: #333;
      position: relative;
      .close {
        position: absolute;
        right: 40px;
        bottom: 20px;
        z-index: 100;
        cursor: pointer;
      }
    }
    .heade:after {
      position: absolute;
      bottom: 0;
      left: 0;
      content: "";
      width: 80%;
      height: 1px;
      background-color: #ccc;
      transform: translateX(15%);
    }
    .body {
      padding: 20px;
      .btn-group {
        display: flex;
        flex-direction: row-reverse;
        padding-right: 20px;
        .discern {
          margin-left: 30px;
        }
      }
    }
  }

  .create-cust {
    position: relative;
    height: calc(100vh - 80px);
  }

  .create-cust-info {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
    background-color: #fff;
  }

  .el-input,
  .el-select {
    width: 300px;
  }
}
</style>
