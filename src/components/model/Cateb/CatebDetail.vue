<template>
  后台类目详情:
  <div v-if="data.Cateb">
    <ul>
      <li>名称: {{ data.Cateb.code }}</li>
      <li v-if="data.Cateb.desc">描述: {{ data.Cateb.desc }}</li>
      <li>sort: {{ data.Cateb.sort }}</li>
    </ul>
    <div style="float: right; margin-top: 50px">
      <CatebUpd />
      <el-button type="danger" @click="deleteOneHandle"> 删除 </el-button>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from "vue-demi";
import { useStore } from "vuex";

import CatebUpd from "./CatebUpd.vue"

export default {
  name: "CatebDetail",
  components: {CatebUpd},
  setup() {
    const store = useStore();

    const data = reactive({
      Cateb: null,
    });

    data.Cateb = computed(() => {
      return store.state.Cateb.object;
    });

    const deleteOneHandle = async () => {
      const confirmed = confirm("确定要删除该项吗？");
      if (confirmed) await store.dispatch("Cateb/deleteOne", data.Cateb._id);
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