<template>
  <h1>求和count: {{ storeDate.count }}</h1>
  <button @click="increament">+</button>
</template>

<script>
import { 
  // reactive, 
  computed } from "vue";
import { useStore } from "vuex";
export default {
  name: "TestVuex",
  props: ["msg"],
  setup() {
    const store = useStore();
    // const data = reactive({});
    const storeDate = {}
    storeDate.count = computed(() => store.state.count);

    function increament() {
      store.dispatch("at_increament", 1);
    }

    return {
      // data,
      storeDate,
      increament,
    };
  },
};
</script>

<style>
</style>