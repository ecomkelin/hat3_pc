<template>
  <div class="filter-box">
    <div>
      <input
        v-model="filter.searchKeywords"
        :placeholder="'search: ' + props.searchFields"
      />
    </div>
    <div>
      <input
        v-model="sort.sortKey"
        placeholder="排序的字段"
        @blur="sortBlurHandle"
      />
      <el-select
        v-model="sort.sortVal"
        class="m-2"
        placeholder="Select"
        size="small"
      >
        <el-option
          v-for="item in [1, -1]"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </div>
  </div>
</template>

<script>
import { reactive, watch } from "vue-demi";
import { useStore } from "vuex";

export default {
  name: "ReqData",
  props: ["searchFields"],
  setup(props) {
    const store = useStore();

    const filter = reactive({
      searchKeywords: "",
    });
    const sort = reactive({
      sortKey: "",
      sortVal: 1,
    });

    watch(filter, () => {
      store.commit("Request/MT_filterSet", {
        search: { fields: props.searchFields, keywords: filter.searchKeywords },
      });
    });
    const sortBlurHandle = () => {
      let sortParam = {};
      let keys = sort.sortKey.split(" ");

      let flag = false;
      for (let i in keys) {
        const key = keys[i].replace(/^\s*/g, "");
        if(key.length > 0) {
          flag = true;
          sortParam[key] = sort.sortVal;
        }
      }
      if(flag) store.commit("Request/MT_sortSet", sortParam);
    };
    watch(
      () => sort.sortVal,
      () => {
        sortBlurHandle();
      }
    );

    return {
      props,
      filter,
      sort,

      sortBlurHandle,
    };
  },
};
</script>



<style>
.filter-box {
  border: 2px skyblue solid;
  padding: 10px;
}
</style>