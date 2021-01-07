<template>
  <el-main>
    <el-form>
      <el-form-item label="凭证种类">
        <el-select v-model="voucher">
          <el-option
            v-for="(item, index) in voucherList"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-button :class="'search'" type="primary" icon="el-icon-search" @click="queryInventoryVoucher">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column v-for="(item, index) in tableConfig" :key="index" :label="item"></el-table-column>
        </el-table>
      </el-form-item>
    </el-form>
    <div class="cancel">
      <el-button type="info" @click="hideDioag">取消</el-button>
    </div>
  </el-main>
</template>

<script>
import {
  queryTillVchrList,
  queryTillVchrListDetail,
  queryTillVchrNum,
} from "@/api/boot";
export default {
  data() {
    return {
      voucher: "",
      faceValue: 0,
      totalNum: 10,
      cardType: '',
      flag: '',
      voucherList: [
        {
          label: "全部",
          value: "0",
        },
        {
          label: "现金支票",
          value: "1",
        },

        {
          label: "转账支票",
          value: "2",
        },
        {
          label: "商业承兑汇票",
          value: "3",
        },
        {
          label: "储蓄活期存折",
          value: "4",
        },
      ],
      tableData: [],
      tableConfig: [
        "凭证种类编码",
        "凭证种类名称",
        "卡种类名称",
        "批次号",
        "起始号码",
        "终止号码",
        "数量",
        "状态",
      ],
    };
  },
  mounted(){},
  methods:{
    queryInventoryVoucher(){
      let data = {
        tellerID: '',
        vchrType: this.voucher,
        faceValue: this.faceValue,
        totalNum: this.totalNum,
        cardType: this.cardType,
        flag: this.flag,
        header: {}
      }
      queryTillVchrList(data)
      .then( res => {
        if(res.header.RetCode === "000000"){

        }else{

        }
      })
      .catch( error => {
        console.log(error)
      })
    },
    hideDioag(){
      this.$parent.$parent.$parent.$parent.$refs.endBox.dialogVisiable = false
      console.log(this)
    }
  },

};
</script>

<style scoped>
.search {
  margin-left: 30px;
}
.cancel {
  position: absolute;
  right: 30px;
  bottom: 30px;
}
</style>