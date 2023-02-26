<template>
  <div style="margin: 20px">
    <el-pagination
      background
      :page-size="50"
      layout="prev, pager, next"
      :total="2000"
      @current-change="handleCurrentPage"
    />
  </div>
</template>

<script>
import { useStore } from "vuex";
export default {
  name: "PagiNation",
  setup() {
    const store = useStore();
    const handleCurrentPage = (page) => {
        if(isNaN(page)) {
            alert("page 页码错误")
        } else {
            store.commit("Request/MT_pageSet", page);
        }
    };
    return {
      handleCurrentPage,
    };
  },
};
</script>

<style>
</style>