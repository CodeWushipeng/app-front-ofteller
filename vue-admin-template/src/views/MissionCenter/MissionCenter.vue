<template>
  <div class="missionDiv">
    <el-container>
      <el-header>
        <div class="headerDiv">
          复核任务
        </div>
      </el-header>
      <el-main>
        <el-form ref="form" :model="form" label-width="80px">
          <el-row>
            <el-col :span="2">
              <div class="grid-content bg-purple">
                <span>全局流水号:</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light">
                <el-input v-model="form.name"></el-input>
              </div>
            </el-col>
            <el-col :span="2">
              <div class="grid-content bg-purple">
                <span>发起柜员:</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light">
                <el-input v-model="form.name"></el-input>
              </div>
            </el-col>
            <el-col :span="2">
              <div class="grid-content bg-purple">
                <span>状态:</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light">
                <el-select v-model="form.region" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="2">
              <div class="grid-content bg-purple">
                <span>复核日期:</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
              </div>
            </el-col>
            <el-col :span="2">
              <div class="grid-content bg-purple">
                <span>至</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
              </div>
            </el-col>
            <el-col :span="2">
              <div class="grid-content bg-purple">
                <el-button type="primary" @click="onSubmit">搜索</el-button>
              </div>
            </el-col>
          </el-row>

        </el-form>
      </el-main>
      <el-footer>
        <el-table
                :data="tableData"
                style="width: 100%"
                max-height="250">
          <el-table-column
                  fixed
                  prop="date"
                  label="日期"
                  width="150">
          </el-table-column>
          <el-table-column
                  prop="name"
                  label="姓名"
                  width="120">
          </el-table-column>
          <el-table-column
                  prop="province"
                  label="省份"
                  width="120">
          </el-table-column>
          <el-table-column
                  prop="city"
                  label="市区"
                  width="120">
          </el-table-column>
          <el-table-column
                  prop="address"
                  label="地址"
                  width="300">
          </el-table-column>
          <el-table-column
                  prop="zip"
                  label="邮编"
                  width="120">
          </el-table-column>
          <el-table-column
                  fixed="right"
                  label="操作"
                  width="120">
            <template slot-scope="scope">
              <el-button
                      @click.native.prevent="deleteRow(scope.$index, tableData)"
                      type="text"
                      size="small">
                移除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-footer>
    </el-container>

  </div>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                tableData: [{
                    date: '2016-05-03',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-02',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-08',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-06',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-07',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }]
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            },
            deleteRow(index, rows) {
                rows.splice(index, 1);
            }
        }
    }
</script>

<style lang="stylus" scoped>
  .missionDiv
    background-color: white
    .el-header
      height: 40px !important
      background-color: rgb(221, 221, 221);
      .headerDiv
        border-left: 5px solid #f00;
        margin: 10px 0px;
        font-size: 20px;
        padding-left: 10px;
    .el-main
      height: 140px !important
      .el-col
        padding: 1px 5px;
    .el-footer
      height: 300px !important
    span
      height: 40px;
      line-height: 40px;
      font-size: 13px;

</style>
