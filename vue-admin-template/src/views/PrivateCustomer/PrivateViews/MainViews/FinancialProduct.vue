<template>
    <contain-product
      :tagName = "tagName"
      :selectPlaceholder = "selectPlaceholder"
      :catalogAlias = "catalogAlias"
    ></contain-product>
</template>

<script>
  import containProduct from "./components/ContainProduct";

  export default {
    components: {
      containProduct,
    },
    data(){
      return {
        tagName : "金融产品",
        catalogAlias : "gm_catalog",
        selectPlaceholder : "产品编号或产品名称"
      }
    }
  }
</script>
