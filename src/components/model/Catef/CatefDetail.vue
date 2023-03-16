<template>
  前台类目详情:
  <div v-if="dt.Catef">
    <ul>
      <li>名称: {{ dt.Catef.code }}</li>
      <li v-if="dt.Catef.desc">描述: {{ dt.Catef.desc }}</li>
      <li>是否可用: {{ dt.Catef.show_list ? '是': '否' }}</li>
      <li>产品展示: {{ dt.Catef.show_home ? '是': '否' }}</li>
      <li>购物车推荐: {{ dt.Catef.show_cart ? '是': '否' }}</li>
      <li>个人中心推荐: {{ dt.Catef.show_profile ? '是': '否' }}</li>
      <li>sort: {{ dt.Catef.sort }}</li>
      
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

    const dt = reactive({
      Catef: null,
    });

    dt.Catef = computed(() => {
      return store.state.Catef.object;
    });

    const deleteOneHandle = async () => {
      const confirmed = confirm("确定要删除该项吗？");
      if (confirmed) await store.dispatch("Catef/deleteOne", dt.Catef._id);
    };

    return {
      dt,

      deleteOneHandle,
    };
  },
};
</script>

<style>
</style>