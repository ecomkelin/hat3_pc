<template>
  后台类目详情:
  <div v-if="data.object">
    <ul>
      <li>名称: {{ data.object.code }}</li>
      <li v-if="data.object.desc">描述: {{ data.object.desc }}</li>
      <li>sort: {{ data.object.sort }}</li>
    </ul>
    <div style="float: right; margin-top: 50px">
      <!-- <AttrUpd /> -->
      <el-button type="danger" @click="deleteOneHandle"> 删除 </el-button>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from "vue-demi";
import { useStore } from "vuex";

// import AttrUpd from "./AttrUpd.vue"

export default {
  name: "AttrDetail",
  // components: {AttrUpd},
  setup() {
    const store = useStore();

    const data = reactive({
      object: null,
    });

    data.object = computed(() => {
      return store.state.Attr.object;
    });

    const deleteOneHandle = async () => {
      const confirmed = confirm("确定要删除该项吗？");
      if (confirmed) await store.dispatch("Attr/deleteOne", {is_Attk: true, _id: data.object._id});
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