<template>
  <div class="common-layout wrapper">
    <el-container class="scrollable-aside">
      <el-aside width="200px">
        <AttrList />
      </el-aside>
      <el-container>
        <el-header class="fixed-header">
        <AttrAdd />
        </el-header>
        <el-main class="fixed-main">
  <AttrDetail />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import AttrAdd from "@/components/model/Attr/AttrAdd.vue";
import AttrList from "@/components/model/Attr/AttrList.vue";
import AttrDetail from "@/components/model/Attr/AttrDetail.vue";
export default {
  components: { AttrList, AttrDetail, AttrAdd },
  setup() {},
};
</script>
