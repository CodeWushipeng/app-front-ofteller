<template>
  <div class="voucher-wrap">
    <div class="form-wrap">
      <div class="title">凭证种类</div>
      <el-select v-model="voucherType" placeholder="请选择凭证种类">
        <el-option v-for="(item, index) in voucherTypeList" :key="index" :label="item.label"
                   :value="item.value"></el-option>
      </el-select>
      <div class="search" @click="searchVoucher">
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </div>
    </div>
    <el-table :data="voucherData" :highlight-current-row="true">
      <el-table-column
        v-for="(item, index) in voucherConfig"
        :key="index"
        :prop="item.value"
        :label="item.label"
        align="center"
      ></el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      background
      :page-size="10"
      layout="prev, pager, next"
      :total="voucherTotalNum"
    >
    </el-pagination>
    <div class="tips-wrap">
      <el-button type="primary" icon="el-icon-refresh">刷新</el-button>
    </div>
  </div>
</template>

<script>
  import {getEnumsByEnumTypeId, queryTellerBox} from "@/api/boot";

  export default {
    name: "voucher",
    data() {
      return {
        voucherType: "",
        voucherTypeList: [],
        voucherData: [],
        voucherConfig: [
          {
            label: "凭证种类编码",
            value: "boxCode",
          },
          {
            label: "凭证种类名称",
            value: "boxKind",
          },
          {
            label: "卡种类名称",
            value: "boxStatus",
          },
          {
            label: "批次号",
            value: "boxType",
          },
          {
            label: "起始号码",
            value: "brchCode",
          },
          {
            label: "终止号码",
            value: "brchName",
          },
          {
            label: "数量",
            value: "tlrCode",
          },
          {
            label: "状态",
            value: "tlrName",
          },
        ],

        voucherTotalNum: 0
      };
    },
    methods: {
      searchVoucher() {
        let data = {
          optTeller: "",
          voucherType: this.voucherType
        };
        queryTellerBox(data)
          .then((res) => {
            console.log("queryTellerBox res: {} ", res);
            const {rspCode} = response.header || {};
            if (rspCode === RES_OK) {
              this.voucherData = res.boxList;
              this.end = res.totalNum
              this.start = res.tillTotalNum
            }
          })
          .catch((error) => {
            console.log("queryTellerBox error: {} ", error);
          });
      },

      /**
       * 获取凭证种类枚举值 by scx 2020/12/17
       */
      getVoucherTypeEnum() {
        let reqParams = {
          enumTypeId: "",
          enumId: "",
          sortfield: ""
        };
        getEnumsByEnumTypeId(reqParams).then(
          rsp => {
            console.log("getEnumInfoForXj rsp: {} ", rsp);
            return rsp;
          }
        ).catch(
          error => {
            console.log("getEnumInfoForXj error: {} ", error);
          }
        );
      },

      /**
       * 当前页改变触发方法 by scx 2020/12/23
       */
      handleCurrentChange(currentPageNum) {
        console.log("handleCurrentChange: {} ", currentPageNum)
      }
    },
    mounted() {
      this.getVoucherTypeEnum().then(
        result => {
          this.voucherTypeList = result;
        }
      );
    }
  };
</script>
<style lang="scss" scoped>
  .voucher-wrap {
    background-color: #fff;

    .title {
      background-color: #A0AFC8;
      height: 31px;
      width: 70px;
      box-sizing: border-box;
      line-height: 31px;
      text-align: center;
      align-items: center;
      border-radius: 3px;
      margin-left: 10px;
      color: white;
    }

    .form-wrap {
      display: flex;
      align-items: center;
      /*padding: 0 25px;*/
      height: 40px;
      margin-bottom: 20px;

    }

    .tips-wrap {
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
      height: 40px;
      width: 100%;
      margin-top: 20px;

      .el-button {
        margin-right: 20px;
      }
    }
  }
</style>
