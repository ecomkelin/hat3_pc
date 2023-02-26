<template>
  <div>
    <el-button @click="handleReloadAttrList">
      <i class="el-icon-refresh"></i>
      刷新后台类目
    </el-button>
    <el-button @click="handleClearSelected">
      <i class="el-icon-refresh"></i>
      清空选择
    </el-button>
    <!-- <el-table :data="data.objects" style="width: 20%" row-key="id" border> -->
    <el-table
      :data="data.objects"
      style="width: 100%"
      highlight-current-row
      border
    >
      <el-table-column type="expand">
        <template #default="props">
          <div style="margin-left: 60px">
            <el-table
              :data="props.row.Attvs"
              style="width: 100%"
              row-key="id"
              border
            >
              <el-table-column prop="code" />
            </el-table>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="属性名称">
        <template #default="props">
          <div @click="handleAttrClick(props.row)" style="display: flex">
            <div style="flex: 3">{{ props.row.code }}</div>
            <div style="flex: 1 text-align: right;">
              {{ props.row.Attvs ? props.row.Attvs.length : 0 }}
            </div>
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="code" label="属性名称" /> -->
    </el-table>
  </div>
</template>

<script>
import { computed, onBeforeUnmount, reactive } from "vue-demi";
import { useStore } from "vuex";

export default {
  name: "AttrList",

  setup() {
    const store = useStore();

    const data = reactive({
      objects: [],
    });
    data.objects = computed(() => store.state.Attr.objects);

    if (data.objects.length < 1) {
      store.dispatch("Attr/list");
    }
    /** 手动刷新 属性列表 */
    const handleReloadAttrList = () => {
      store.dispatch("Attr/list");
    };
    /** 手动清除 已经选中的 属性 */
    const handleClearSelected = () => {
      store.commit("Attr/MT_clearOne");
    };
    /** 卸载之前 清除 已经选中的 属性 */
    onBeforeUnmount(() => {
      store.commit("Attr/MT_clearOne");
    });

    /** 手动选中 一个属性 */
    const handleAttrClick = (object) => {
      store.commit("Attr/MT_selectOne", object._id);
    };

    return {
      data,
      handleAttrClick,
      handleReloadAttrList,
      handleClearSelected,
    };
  },
};
</script>
