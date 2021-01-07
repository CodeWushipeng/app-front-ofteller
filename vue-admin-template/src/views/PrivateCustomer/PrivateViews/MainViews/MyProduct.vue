<template>
  <div class="productLists">
    <div class="product" v-for="(item, index) in productLists" :key="index"></div>
  </div>
</template>

<script>
import {selectProductPartyRoleList} from "@/api/privateCustomer/index.js"
import { RES_OK } from "@/api/config";

export default {
  data() {
    return {
      productLists: [],
    };
  },
  mounted() {
    this.selectProducts();
  },
  methods: {
    selectProducts() {
      let data = {
        productId: "",
        partyId: "",
        status: "",
      };
      selectProductPartyRoleList(data)
        .then((res) => {
          if (res.header.rspCode == RES_OK) {
            this.productLists = res.body.prodCustList;
          } else {
            this.$message({
              type: "error",
              message: "产品查询失败",
            });
          }
        })
        .catch((error) => {
					console.log(error)
				});
    },
  },
};
</script>

<style lang="scss" scoped>

</style>

