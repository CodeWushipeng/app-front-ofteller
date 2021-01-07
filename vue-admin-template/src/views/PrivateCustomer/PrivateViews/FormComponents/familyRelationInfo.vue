<template>
    <div class="create-cust">
      <!-- <el-header class="create-cust-head" height="30px">客户关联关系新增</el-header> -->
      <el-main class="create-cust-main">
        <div>
          <div class="cust-info">客户关联关系</div>
          <el-form class="cust-basic-info" ref="partyRelationshipModel" :rules="rules" :model="partyRelationshipModel" label-width="243px" label-position="right">
            <el-col :span="12">
              <el-form-item label="关系人客户号:" prop="relationshipCustNo">
                <el-input v-model="partyRelationshipModel.relationshipCustNo"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="关系人名称:" prop="relationshipCustName">
                <el-input v-model="partyRelationshipModel.relationshipCustName" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="关联关系类型:" prop="relationshipType">
                <el-select v-model="partyRelationshipModel.relationshipType" placeholder="请选择">
                  <el-option
                    v-for="item in [{label:'0100-本人',value:'0100'},{label:'201-夫',value:'201'}]"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="关联关系名称:" prop="relationshipName">
                <el-input v-model="partyRelationshipModel.relationshipName" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="详细描述:" prop="comments">
                <el-input v-model="partyRelationshipModel.comments"></el-input>
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

    export default {
        data() {
            return {
              partyRelationshipModel: {
              },
              rules: {
                relationshipCustNo: [
                  { required: true, message: '请填写关系人客户号', trigger: 'blur' }
                ],
                relationshipType: [
                  { required: true, message: '请选择关联关系类型', trigger: 'change' }
                ]
              }
            }
        },

        methods: {
          submitForm() {
            this.$refs.partyRelationshipModel.validate((valid) => {
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

