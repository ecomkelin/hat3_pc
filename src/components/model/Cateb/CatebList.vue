<template>
  <div>
    <el-button @click="handleReloadCatebList">
      <i class="el-icon-refresh"></i>
      刷新后台类目
    </el-button>
    <el-button @click="handleClearSelected">
      <i class="el-icon-refresh"></i>
      清空选择
    </el-button>
    <!-- <el-table :data="data.Catebs" style="width: 20%" row-key="id" border> -->
    <el-table
      :data="data.Catebs"
      style="width: 100%"
      highlight-current-row
      border
    >
      <el-table-column type="expand">
        <template #default="props">
          <div style="margin-left: 60px">
            <el-table
              :data="props.row.Cateb_sons"
              style="width: 100%"
              row-key="id"
              border
            >
              <el-table-column prop="code" />
            </el-table>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="后台类目名称">
        <template #default="props">
          <div @click="handleCatebClick(props.row)" style="display: flex">
            <div style="flex: 2"> {{ props.row.code }} </div>
             <div style="flex: 1">[{{ props.row.sort }}] </div>
            <div style="flex: 1 text-align: right;"> {{ props.row.Cateb_sons? props.row.Cateb_sons.length : 0 }} </div>
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="code" label="后台类目名称" /> -->
    </el-table>
  </div>
</template>

<script>
import { computed, onBeforeUnmount, reactive } from "vue-demi";
import { useStore } from "vuex";

export default {
  name: "CatebList",

  setup() {
    const store = useStore();

    const data = reactive({
      Catebs: [],
    });
    data.Catebs = computed(() => store.state.Cateb.objects);

    if(data.Catebs.length < 1) {
      store.dispatch("Cateb/list");
    }
    /** 手动刷新 后台类目列表 */
    const handleReloadCatebList = () => {
      store.dispatch("Cateb/list");
    }
    /** 手动清除 已经选中的 后台类目 */
    const handleClearSelected = () => {
      store.commit("Cateb/MT_clearOne");
    }
    /** 卸载之前 清除 已经选中的 后台类目 */
    onBeforeUnmount(() => {
      store.commit("Cateb/MT_clearOne");
    })

    /** 手动选中 一个后台类目 */
    const handleCatebClick = (CatebObj) => {
      store.commit("Cateb/MT_selectOne", CatebObj._id);
    };

    return {
      data,
      handleCatebClick,
      handleReloadCatebList,
      handleClearSelected
    };
  },
};
</script>
