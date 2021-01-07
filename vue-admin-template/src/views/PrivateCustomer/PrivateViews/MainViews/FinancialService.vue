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
        tagName : "金融服务",
        catalogAlias : "gr_jrfw",
        selectPlaceholder : "服务编号或服务名称"
      }
    }
  }
</script>
