<template>
    <div class="create-cust">
      <!-- <el-header class="create-cust-head" height="30px">维护个人税收居民身份声明信息</el-header> -->
      <el-main class="create-cust-main">
        <div>
          <div class="cust-info"></div>
          <el-form class="cust-basic-info" ref="taxPersonInfoModifyModel" :rules="rules" :model="taxPersonInfoModifyModel" label-width="243px" label-position="right">
            <el-col :span="24">
              <el-form-item label="客户姓名:" prop="custName">
                <el-input v-model="taxPersonInfoModifyModel.custName" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="本人声明:" prop="institutionalTaxResidentID">
                <el-select v-model="taxPersonInfoModifyModel.institutionalTaxResidentID" placeholder="请选择">
                  <el-option
                    v-for="item in [{label:'1-仅为中国税收居民',value:'1'}]"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="非居民标识:" prop="selfCertification">
                <el-select v-model="taxPersonInfoModifyModel.selfCertification" placeholder="请选择">
                  <el-option
                    v-for="item in [{label:'0-居民',value:'0'},{label:'1-非居民',value:'1'}]"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="姓(英文或拼音):" prop="firstName">
                <el-input v-model="taxPersonInfoModifyModel.firstName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="名(英文或拼音):" prop="lastName">
                 <el-input v-model="taxPersonInfoModifyModel.lastName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="出生日期:" prop="birthDate">
                <el-date-picker
                  v-model="taxPersonInfoModifyModel.birthDate"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item prop="zhCountryDomicile" class="tax-address-label">
                <span slot="label">现居地址(中文):<br><span class='required-span'>(境外地址可不填此项)</span></span>
                <el-cascader
                  v-model="taxPersonInfoModifyModel.zhCountryDomicile"
                  :options="cityData"
                  :props="{ expandTrigger: 'hover' }"
                >
                </el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="详细地址(中文):" prop="zhAddressDomicile">
                <el-input v-model="taxPersonInfoModifyModel.zhAddressDomicile"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="现居地址(英文或拼音):" prop="enCountryDomicile">
                <el-cascader
                  v-model="taxPersonInfoModifyModel.enCountryDomicile"
                  :options="cityData"
                  :props="{ expandTrigger: 'hover' }"
                >
                </el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="详细地址(英文或拼音)：" prop="enAddressDomicile">
                <el-input v-model="taxPersonInfoModifyModel.enAddressDomicile"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item prop="zhCountryBirth" class="tax-address-label">
                <span slot="label">出生地(中文):<br><span class='required-span'>(境外地址可不填此项)</span></span>
                <el-cascader
                  v-model="taxPersonInfoModifyModel.zhCountryBirth"
                  :options="cityData"
                  :props="{ expandTrigger: 'hover' }"
                >
                </el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="详细地址(中文):" prop="zhAddressBirth">
                <el-input v-model="taxPersonInfoModifyModel.zhAddressBirth"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="出生地(英文或拼音):" prop="enCountryBirth">
                <el-cascader
                  v-model="taxPersonInfoModifyModel.enCountryBirth"
                  :options="cityData"
                  :props="{ expandTrigger: 'hover' }"
                >
                </el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="税收居民国(地区):" prop="resCountryCode">
                <el-select v-model="taxPersonInfoModifyModel.resCountryCode" multiple placeholder="请选择">
                  <el-option
                    v-for="item in [{label:'AFG-阿富汗',value:'AFG'},{label:'AGO-安哥拉共和国',value:'AGO'}]"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="纳税人识别号:" prop="taxpayerNo">
                <el-input v-model="taxPersonInfoModifyModel.taxpayerNo"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="无纳税人识别号原因类型:" prop="reasonType">
                <el-select v-model="taxPersonInfoModifyModel.reasonType" multiple placeholder="请选择">
                  <el-option
                    v-for="item in [{label:'1-居民国地区不发放纳税人识别号',value:'1'},{label:'2-账户持有人未能取得纳税人识别号',value:'2'}]"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="无纳税人识别号具体原因:" prop="reasonContent">
                <el-input type="textarea" v-model="taxPersonInfoModifyModel.reasonContent" :rows="3"></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </div>
      </el-main>
      <el-footer class="create-cust-footer">
        <el-button size="mini" type="primary" @click="submitForm">确定</el-button>
        <el-button size="mini" @click="cancel">取消</el-button>
      </el-footer>
    </div>
</template>

<script>
import { cityData } from '@/dict/city.data'
export default {
    data() {
        return {
          taxPersonInfoModifyModel:{},
          cityData:cityData,
          rules: {
            custName: [
              { required: true, message: '请填写客户姓名', trigger: 'blur' }
            ],
            institutionalTaxResidentID: [
              { required: true, message: '请选择本人声明', trigger: 'change' }
            ],
            selfCertification: [
              { required: true, message: '请选择非居民标识', trigger: 'change' }
            ],
            firstName: [
              { required: true, message: '请填写姓(英文或拼音)', trigger: 'blur' }
            ],
            lastName: [
              { required: true, message: '请填写名(英文或拼音)', trigger: 'blur' }
            ],
            birthDate: [
              { required: true, message: '请选择出生日期', trigger: 'change' }
            ],
            enCountryDomicile: [
              { required: true, message: '请选择现居地址', trigger: 'change' }
            ],
            enCountryBirth: [
              { required: true, message: '请选择出生地（英文或拼音）', trigger: 'change' }
            ]
          }

        }
    },

    methods: {
      submitForm() {
        this.$refs.taxPersonInfoModifyModel.validate((valid) => {
          if (valid) {
            this.$parent.$parent.dialogVisiable = false;
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      cancel(){
        this.$parent.$parent.dialogVisiable = false;
      }
    }
}
</script>

<style lang="scss" scoped>
.create-cust{
  .create-cust-head{
    line-height: 30px;
    padding-left:10px ;
    background-color: #f2f2f2;
    font-size: 12px;
    font-weight: 500;
    color: #000;
  }
  /deep/.el-main{
    height:calc(100vh - 170px);
  }
  .create-cust-main{
    padding: 15px;
    .cust-info{
      margin-left: 15px;
      font-size: 14px;
      line-height: 21px;
      padding-right: 60px;
      border-bottom: 1px solid #ebebeb;
    }
    .cust-basic-info{
      overflow: hidden;
      padding-top:15px;
      padding-right: 80px;
      /deep/.el-form-item__label{
        color: #000;
        font-weight: 600;
      }
      /deep/.el-form-item__content{
        padding:0 15px;
      }
      .tax-address-label{
        /deep/.el-form-item__label{
          line-height: 20px;
        }
        .required-span{
          color: red;
        }
      }
      .el-input{
        display: block;
      }
      .el-select{
        display: block;
      }
      .el-cascader{
        display: block;
      }
    }
  }
  .create-cust-footer{
    display: flex;
    justify-content:flex-end;
    padding:15px;
    height: 67px;
  }
}

</style>

