<template>
  <div>
    <iframe :id='processInfo.id' name="item" :src="processInfo.url" width="100%" height="600px" frameborder="0"></iframe>
  </div>
</template>

<script>
  export default {
    name: "processControl",
    data() {
      return {
      }
    },
    props: {
      processInfo: {
        type: Object,
        required: true
      }
    },
  }
</script>

<style scoped>

</style>
