<template>
  <div class="common-layout wrapper">
    <el-container class="scrollable-aside">
      <el-aside width="200px">
        <CatebList />
      </el-aside>
      <el-container>
        <el-header class="fixed-header">
        <CatebAdd />
        </el-header>
        <el-main class="fixed-main">
  <CatebDetail />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CatebAdd from "@/components/model/Cateb/CatebAdd.vue";
import CatebList from "@/components/model/Cateb/CatebList.vue";
import CatebDetail from "@/components/model/Cateb/CatebDetail.vue";
export default {
  name: "HatCateb",
  components: { CatebList, CatebDetail, CatebAdd },
  setup() {},
};
</script>
