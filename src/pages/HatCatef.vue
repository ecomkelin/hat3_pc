<template>
  <div class="common-layout wrapper">
    <el-container class="scrollable-aside">
      <el-aside width="500px">
        <CatefList :showMore="true"/>
      </el-aside>
      <el-container>
        <el-header class="fixed-header">
          <CatefAdd />
        </el-header>
        <el-main class="fixed-main">
          <CatefDetail />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import CatefAdd from "@/components/model/Catef/CatefAdd.vue";
import CatefList from "@/components/model/Catef/CatefList.vue";
import CatefDetail from "@/components/model/Catef/CatefDetail.vue";
</script>
