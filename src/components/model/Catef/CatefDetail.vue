<template>
  前台类目详情:
  <div v-if="data.Catef">
    <ul>
      <li>名称: {{ data.Catef.code }}</li>
      <li v-if="data.Catef.desc">描述: {{ data.Catef.desc }}</li>
      <li>sort: {{ data.Catef.sort }}</li>
    </ul>
    <div style="float: right; margin-top: 50px">
      <CatefUpd />
      <el-button type="danger" @click="deleteOneHandle"> 删除 </el-button>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from "vue-demi";
import { useStore } from "vuex";

import CatefUpd from "./CatefUpd.vue"

export default {
  name: "CatefDetail",
  components: {CatefUpd},
  setup() {
    const store = useStore();

    const data = reactive({
      Catef: null,
    });

    data.Catef = computed(() => {
      return store.state.Catef.object;
    });

    const deleteOneHandle = async () => {
      const confirmed = confirm("确定要删除该项吗？");
      if (confirmed) await store.dispatch("Catef/deleteOne", data.Catef._id);
    };

    return {
      data,

      deleteOneHandle,
    };
  },
};
</script>

<style>
</style>