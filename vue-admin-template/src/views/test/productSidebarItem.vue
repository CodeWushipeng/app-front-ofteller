<template>
  <!-- 商家端-添加分期规则 -->
  <div class="divisionForm">
    <el-form :model="divisionForm" label-width="120px">
      <el-row>
        <el-col :span="17">
          <el-form-item label="分期期数" prop="lists" style="margin-bottom: 0;">
            <div ref="fenqi" class="fenqi">
              <ul>
                <li class="item" v-for='(list,index) in divisionForm.lists' :key='index'>
                  <span class="fenqi_span">{{index + 1}}</span>
                  <input class="fenqi_input" v-model="list.percent" placeholder='输入0-100的数字' style="display: inline-block;"/>
                  <span class="fenqi_percent">(%)</span>
                  <i v-if="index==0" class="el-icon-circle-plus-outline" @click="addNumber"></i>
                  <i v-else class="el-icon-remove-outline" @click="delNumber(index)"></i>
                </li>
              </ul>
            </div>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {Button,Form,FormItem,Dialog,Input,Row,Col,Icon} from 'element-ui';
  Vue.use(Button).use(Form).use(FormItem).use(Dialog).use(Input).use(Row).use(Col).use(Icon);
  export default {
    data() {
      return {
        divisionForm: {
          lists: [
            { percent:''}
          ],//分期期数数组
        }
      }
    },
    methods: {
      //新增分期期数
      addNumber(){
        let list = {
          percent: ""
        };
        this.divisionForm.lists.push(list);
      },
      //删除分期期数
      delNumber(index) {
        this.divisionForm.lists.splice(index, 1);
      },

    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .divisionForm {
    /deep/ .el-dialog {
      min-width: 830px;
    }
  }
  .fenqi {
    .item {
      margin-bottom: 20px;
      input::-webkit-input-placeholder {
        color: #bbb;
      }
      input:-moz-input-placeholder {
        color: #bbb;
      }
      input::-moz-input-placeholder {
        color: #bbb;
      }
      input:-ms-input-placeholder {
        color: #bbb;
      }
      .fenqi_span {
        width: 80px;
        text-align: center;
        color: #999;
        margin-right: 20px;
      }
      .fenqi_input {
        width: 258px;
        margin-right: 8px;
      }
      .fenqi_percent {
        color: #aaa;
        margin-right: 20px;
        font-size: 18px;
      }
      /deep/ {
        .el-icon-circle-plus-outline,.el-icon-remove-outline {
          color: #aaa;
          font-size: 24px;
        }
      }
      .fenqi_span,.fenqi_input {
        -webkit-appearance: none;
        background-color: #FFF;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #DCDFE6;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        color: #606266;
        display: inline-block;
        font-size: inherit;
        height: 40px;
        line-height: 40px;
        outline: 0;
        padding: 0 15px;
        -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      }
    }
  }
</style>
