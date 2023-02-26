<template>
  <div class="common-layout wrapper">
    <el-container class="scrollable-aside">
      <el-aside width="200px"><CatefList /></el-aside>
      <el-container>
        <el-header class="fixed-header">
          <ReqData :searchFields="['code', 'name']" />
          <hr />
        </el-header>
        <el-main class="fixed-main">
          <PdAdd />
          <PdList />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import PdAdd from "@/components/model/Pd/PdAdd.vue";
import PdList from "@/components/model/Pd/PdList.vue";
import CatefList from "@/components/model/Catef/CatefList.vue";
import ReqData from "@/components/request/ReqData.vue";

export default {
  components: { ReqData, CatefList, PdList, PdAdd },
  setup() {},
};
</script>

<style>
.wrapper {
  display: flex;
  height: 100vh;
}

.scrollable-aside {
  height: 100%;
  overflow: auto;
}
</style>