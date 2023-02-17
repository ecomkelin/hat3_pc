<template>
  <div class="body-pc">
    <PcSidebar />
    <div class="placehoder-sidebar"></div>
    <PcContent />
  </div>
</template>

<script>
import PcSidebar from "./PcSidebar.vue";
import PcContent from "./PcContent.vue";
export default {
  name: "PcLayout",
  components: {
    PcSidebar,
    PcContent,
  },
};
</script>

<style src="./css/PcLayout.css" scoped>
</style>