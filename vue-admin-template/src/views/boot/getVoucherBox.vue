<template>
  <div class="voucher-box">
    <el-form label-width="120px" :model="form" ref="form">
      <el-form-item label="柜员号">
        <el-input v-model="form.empId" placeholder="请输入柜员号"></el-input>
      </el-form-item>
      <el-form-item label="尾箱号">
        <el-input v-model="form.tillNo" placeholder="请输入尾箱号"></el-input>
      </el-form-item>
      <el-form-item label="操作标识">
        <el-input v-model="form.flag" placeholder="请输入操作标识"></el-input>
      </el-form-item>
      <el-form-item label="尾箱类别">
        <el-select v-model="form.boxKind" placeholder="请选择尾箱类别">
          <el-option value="1" label="凭证"></el-option>
          <el-option value="2" label="现金"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="尾箱标志">
        <el-input v-model="form.boxType" placeholder="请输入尾箱标志"></el-input>
      </el-form-item>
      <el-form-item class="btn-wrap">
        <el-button type="primary" @click="generateBox">生成尾箱</el-button>
      </el-form-item>
    </el-form>
    <!-- <iframe
      src="http://192.168.2.120:30396/#/buss/5555?iframe=1"
      frameborder="0"
      width="100%"
      style="height: 90%"
      @load="flowLoaded"
    ></iframe> -->
  </div>
</template>

<script>
import { issueTill,chkTill } from "@/api/boot";
export default {
  data() {
    return {
      form: {
        empId: "",
        tillNo: "",
        flag: "",
        boxKind: "",
        boxType: "",
      },
    };
  },
  mounted() {
    window.addEventListener("message", this.receiveMessage,false);
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
        this.generateBox()
        switch (data.cmd) {
          case "sellOrder":
            this.flowParamsInfo = postData;
            break;
        }
      }
    },
    // iframe加载完成事件
    flowLoaded(){
      this.loading = false
    },
    generateBox() {
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
        chkTeller: "1",
        boxKind: "",
        vchrList: [
          {
            voucherType: "01",
            stock: 1000,
            fromNo: "1",
            endNo: "10",
            quantity: "20",
            voucherNum: "20",
          },
        ],
      };
      chkTill(data)
        .then((res) => {
          if (res.header.RetCode == "000000") {
            this.queryIssueTill()
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    queryIssueTill() {
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
          BranchId: "10001",
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
        flag: "0",  //0-分配 1-上缴 2-强制上缴
        empId: "20001",
        tillNo: "1003",
        //boxType: "0"  0-混合尾箱 1-现金尾箱 2-凭证尾箱 
      };
      issueTill(data)
        .then((res) => {
          if (res.header.RetCode == "000000") {
            this.$message({
              message: "尾箱领取成功",
              type: "success",
            });
          }else if(res.header.RetCode == "501999999"){
            this.$message({
              message: res.header.RetMsg,
              type: "warning",
            });
          }
        })
        .catch();
    },
  },
};
</script>

<style lang="scss" scoped>
.voucher-box{
  height: 90vh;
  form{
    width: 500px;
    margin: 0 auto;
    padding-top: 60px;
    .btn-wrap{
      display: flex;
      justify-content: center;
      margin-top: 60px;
    }
    .el-select{
      width: 100%;
    }
  }
}
</style>