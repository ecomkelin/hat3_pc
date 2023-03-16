<template>
  <div>
    <el-button @click="handleReloadCatefList">
      <i class="el-icon-refresh"></i>
      刷新前台类目
    </el-button>
    <!-- <el-table :data="data.Catefs" style="width: 20%" row-key="id" border> -->
    <el-table
      :data="data.Catefs"
      style="width: 100%"
      highlight-current-row
      border
    >
      <el-table-column label="图片">
        <template #default="{ row }">
          <img
            v-if="row.icon"
            :src="'/h3/abbr' + row.icon"
            :alt="row.icon"
            height="40"
          />
        </template>
      </el-table-column>

      <el-table-column label="前台类目名称">
        <template #default="props">
          <div @click="handleCatefClick(props.row)" style="display: flex">
            <div style="flex: 2">{{ props.row.code }}</div>
            <div style="flex: 1">[{{ props.row.sort }}]</div>
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="code" label="前台类目名称" /> -->
    </el-table>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, reactive } from "vue-demi";
import { useStore } from "vuex";

const store = useStore();

const data = reactive({
  Catefs: [],
});
data.Catefs = computed(() => store.state.Catef.objects);

if (data.Catefs.length < 1) {
  store.dispatch("Catef/list");
}
/** 手动刷新 前台类目列表 */
const handleReloadCatefList = () => {
  store.dispatch("Catef/list");
};
/** 卸载之前 清除 已经选中的 前台类目 */
onBeforeUnmount(() => {
  store.commit("Catef/MT_clearOne");
});

/** 手动选中 一个前台类目 */
const handleCatefClick = (CatefObj) => {
  store.commit("Request/MT_CatefsSet", CatefObj._id);
  store.commit("Catef/MT_selectOne", CatefObj._id);
};
</script>
