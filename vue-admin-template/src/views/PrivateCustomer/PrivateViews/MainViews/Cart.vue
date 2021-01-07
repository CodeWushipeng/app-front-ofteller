<template>
    <el-container>
        <el-header height="40px">购物车</el-header>
        <el-main>
            <el-table
                ref="multipleTable"
                :data="cartData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column width="150">
                    <template>
                        <img src="../../../../assets/images/no_card.png" min-width="70" height="70">
                    </template>
                </el-table-column>
                <el-table-column>
                    <template slot-scope="scope">
                        <div>{{ scope.row.id }}</div>
                        <div>{{ scope.row.name }}</div>
                    </template>
                </el-table-column>
                <el-table-column>
                    <template slot-scope="scope">
                        <div>风险等级：{{ scope.row.level }}</div>
                        <div>币种：{{ scope.row.coinType }}</div>
                        <div>金额：{{ scope.row.money }}</div>
                    </template>
                </el-table-column>
                <el-table-column>
                    <template slot-scope="scope">
                        <el-button type="primary">修改</el-button>
                        <el-button type="primary">删除</el-button>
                    </template>
                </el-table-column>
                <!-- <el-table-column
                    label="日期"
                    width="120">
                <template slot-scope="scope">{{ scope.row.date }}</template>
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="姓名"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="地址"
                    show-overflow-tooltip>
                </el-table-column> -->
            </el-table>
            <div style="margin-top: 20px;float:right">
                <span>合计：123元</span>
                <el-button @click="toggleSelection([cartData[1], cartData[2]])">结算</el-button>
                <el-button @click="toggleSelection()">清空购物车</el-button>
            </div>
            {{ multipleSelection }}
        </el-main>
    </el-container>
</template>

<script>

export default {
    data() {
        return {
            cartData: [{
                id: 111111,
                name: '一家亲。钻卡',
                img: '../../../../assets/images/no_card.png',
                level: 1,
                coinType: '人民币',
                money: 123.123
            }, {
                id: 222222,
                name: '一家亲。钻卡',
                img: '../../../../assets/images/no_card.png',
                level: 1,
                coinType: '人民币',
                money: 123.123
            }, {
                id: 333333,
                name: '一家亲。钻卡',
                img: '../../../../assets/images/no_card.png',
                level: 1,
                coinType: '人民币',
                money: 123.123
            }, {
                id: 444444,
                name: '一家亲。钻卡',
                img: '../../../../assets/images/no_card.png',
                level: 1,
                coinType: '人民币',
                money: 123.123
            }],
            multipleSelection: []
            }
        },

        methods: {
            toggleSelection(rows) {
                if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            
        }
    }
</script>

<style lang="scss" scoped>
    .el-header {
        line-height: 40px;
        background-color: #304156;
        color: #fff;
    }
</style>

