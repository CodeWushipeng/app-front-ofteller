<template>
  <el-dialog
    ref="dialog"
    :visible.sync="dialogVisiable"
    custom-class="create-cust-info"
    destroy-on-close
    width="80%">
    <slot v-if="dialogVisiable"></slot>
    <div slot="title">
      <el-header class="create-cust-head" height="30px">{{title}}</el-header>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name:'ComDialog',
  props:{
    title:"",
  },
  data() {
    return {
      dialogVisiable:false
    }
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
/deep/.create-cust-info{
  height: 90vh;
  margin-top: 5vh!important;
  overflow-y: scroll;
}
.create-cust-head{
    line-height: 30px;
    padding-left:10px ;
    background-color: #f2f2f2;
    font-size: 12px;
    font-weight: 500;
    color: #000;
  }
</style>
