<template>
  <div>
    <el-button @click="handleReloadCatefList">
      <i class="el-icon-refresh"></i>
      刷新前台类目
    </el-button>
    <el-button @click="handleClearSelected">
      <i class="el-icon-refresh"></i>
      清空选择
    </el-button>
    <!-- <el-table :data="data.Catefs" style="width: 20%" row-key="id" border> -->
    <el-table
      :data="data.Catefs"
      style="width: 100%"
      highlight-current-row
      border
    >
      <el-table-column label="图片" width="70">
        <template #default="{ row }">
          <img
            v-if="row.icon"
            :src="'/h3/abbr' + row.icon"
            :alt="row.icon"
            height="40"
          />
        </template>
      </el-table-column>

      <el-table-column label="前台类目名称" >
        <template #default="{ row }">
          <div @click="handleCatefClick(row)" style="display: flex">
            <div
              style="flex: 2"
              :style="{ color: row.show_list ? 'black' : 'red' }"
            >
              {{ row.code }}
            </div>
            <div
              style="flex: 1"
            >
              [{{ row.sort }}]
            </div>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="首页展示" v-if="props.showMore" width="90">
        <template #default="{ row }">
          <div v-if="row.show_home">是</div>
        </template>
      </el-table-column>
      <el-table-column label="购物车" v-if="props.showMore" width="90">
        <template #default="{ row }">
          <div v-if="row.show_cart">是</div>
        </template>
      </el-table-column>
      <el-table-column label="个人中心" v-if="props.showMore" width="90">
        <template #default="{ row }">
          <div v-if="row.show_profile">是</div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, reactive, defineProps } from "vue";
import { useStore } from "vuex";
const store = useStore();

const props = defineProps({
  showMore: Boolean,
});

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
/** 手动清除 已经选中的 前台类目 */
const handleClearSelected = () => {
  store.commit("Request/MT_CatefsUnset");
  store.commit("Catef/MT_clearOne");
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
