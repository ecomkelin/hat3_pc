<template>
  <!-- 用户组件内部选择器 -->

  <div style="margin-bottom: 20px; margin-top: 20px">
    <el-button @click="listHandle(data.Pds)">刷新产品</el-button>
    <el-button @click="toggleSelection(data.Pds)">反选</el-button>
    <el-button @click="toggleSelection()">取消选择</el-button>
    <el-button @click="clearFilter">清除所有筛选</el-button>
    <span v-if="data.sel_Pds.length > 0" style="margin-left: 10px">
      <el-button @click="deleteManyHandle" type="danger">批量删除</el-button>
      <el-button
        @click="updateSetManyHandle({ is_usable: true })"
        type="warning"
        >批量上架</el-button
      >
      <el-button
        @click="updateSetManyHandle({ is_usable: false })"
        type="warning"
        >批量下架</el-button
      >
    </span>

    <el-input
      v-model="data.searchText"
      size="small"
      placeholder="Type to search"
      width="180"
      maxlength="10"
      show-word-limit
      clearable
    />
  </div>

  <!-- 用户列表 使用 elementPlus table -->
  <el-table
    :data="data.filterPds"
    ref="tableRef"
    row-key="_id"
    style="width: 100%"
    lazy
    stripe
    :default-expand-all="false"
    @selection-change="handleSelectionChange"
  >
    <el-table-column type="expand" fixed="left">
      <template #default="props">
        <div style="margin: 15px">
          <PdDetail :Pd="props.row" />
        </div>
      </template>
    </el-table-column>

    <el-table-column type="index" width="50" fixed="left" />
    <el-table-column type="selection" width="55" />

    <el-table-column label="图片">
      <template #default="{ row }">
        <img
          v-if="row.imgs.length > 0"
          :src="'/h3/abbr' + row.imgs[0]"
          :alt="row.imgs[0]"
          height="40"
        />
      </template>
    </el-table-column>

    <el-table-column label="编号/名称" width="150">
      <template #default="{ row }">
        <div style="color: skyblue">{{ row.code }}</div>
        <div v-text="truncate(row.name)"></div>
      </template>
    </el-table-column>

    <el-table-column label="卖价/标价" width="150">
      <template #default="{ row }">
        <div v-if="row.desc_sale">{{ row.desc_sale }}</div>
        <div v-else style="color: red">卖价错误, 请检查</div>
        <div v-if="row.desc_retail">{{ row.desc_retail }}</div>
        <div v-else style="color: red">标价错误, 请检查</div>
      </template>
    </el-table-column>

    <el-table-column label="前台类目">
      <template #default="{ row }">
        <ul v-if="row.Catefs_as?.length > 0">
          <li v-for="Catef in row.Catefs_as" :key="row._id+Catef._id">{{Catef.code}}</li>
        </ul>
        <UpdCatef :Pd="row" />
      </template>
    </el-table-column>

    <!-- <el-table-column label="后台类目">
      <template #default="{ row }">
        <div v-if="row.Cateb_formats && row.Cateb_as">
          <div>{{ row.Cateb_formats[0]?.label }}</div>
          <div>{{ row.Cateb_as[0]?.code }}</div>
        </div>
      </template>
    </el-table-column> -->

    <!-- <el-table-column prop="desc" sortable label="描述" width="120" /> -->

    <el-table-column label="更新/创建" width="120">
      <template #default="{ row }">
        <div>{{ row.at_upd_format }}</div>
        <div>{{ row.at_crt_format }}</div>
      </template>
    </el-table-column>

    <el-table-column
      fixed="right"
      prop="is_usable"
      label="上架"
      width="100"
      sortable
      :filters="[
        { text: '上架', value: true },
        { text: '下架', value: false },
      ]"
      :filter-method="filterHandler"
      filter-placement="bottom-end"
    >
      <template #default="scope">
        <el-tag
          :type="scope.row.is_usable ? 'success' : 'danger'"
          disable-transitions
        >
          {{ scope.row.sort }}
          <!-- {{ scope.row.is_usable ? "上架" : "下架" }} -->
        </el-tag>
      </template>
    </el-table-column>
  </el-table>

  <PagiNation />
</template>

<script>
import { computed, reactive, ref, watch } from "vue";
import { useStore } from "vuex";
/** 删除确认按钮 */
// import { ElMessage, ElMessageBox } from "element-plus";

import PagiNation from "@/components/request/PagiNation.vue";

import PdDetail from "./PdDetail.vue";
import UpdCatef from './UpdCatef.vue';

export default {
  name: "PdList",
  components: { PdDetail, PagiNation, UpdCatef },
  setup() {
    const store = useStore();

    const data = reactive({
      req: {},

      Pds: [],
      dataFilter: [],

      filterPds: [],
      searchText: "",

      sel_Pds: [],
    });

    data.req = computed(() => store.state.Request);

    data.Pds = computed(() => {
      return store.state.Pd.objects;
    });
    data.dataFilter = computed(() => {
      return store.state.Pd.dataFilter;
    });

    /** 本页面 filter */
    data.filterPds = computed(() => {
      if (!data.searchText) {
        return data.Pds;
      }
      return data.Pds.filter((item) =>
        item.code.toLowerCase().includes(data.searchText.toLowerCase())
      );
    });

    watch(
      data.req,
      async () => {
        await store.dispatch("Pd/list", data.req);
      },
      { immediate: true }
    );
    const listHandle = async () => {
      await store.dispatch("Pd/list", data.req);
    };

    /** 多选用的 比如日期筛选 */
    const filterHandler = (value, row, column) => {
      const property = column["property"];
      return row[property] === value;
    };

    /** 最后一行 tag 的筛选 给 is_usable 预留的 */
    const filterTag = (value, row) => {
      return row.tag === value;
    };

    const tableRef = ref([]);
    /** checkbox 模块的操作  */
    const toggleSelection = (rows) => {
      if (rows) {
        rows.forEach((row) => {
          tableRef.value.toggleRowSelection(row, undefined);
        });
      } else {
        tableRef.value.clearSelection();
      }
    };

    const clearFilter = () => {
      tableRef.value.clearFilter();
    };

    const handleSelectionChange = (selection) => {
      data.sel_Pds = selection;
    };

    /** 批量删除 */
    const deleteManyHandle = () => {
      /** 找出要删除的 ids */
      const ids = [];
      for (let i in data.sel_Pds) {
        const PdObj = data.sel_Pds[i];
        ids.push(PdObj._id);
      }
      /** 弹出确认对话框 */
      const confirmed = confirm("确定要批量删除吗？");
      if (confirmed) store.dispatch("Pd/deleteMany", ids);
    };

    const updateSetManyHandle = async (updateSet) => {
      /** 找出要修改的 ids */
      const ids = [];
      /** 根据身份筛选 */
      for (let i in data.sel_Pds) {
        const PdObj = data.sel_Pds[i];
        ids.push(PdObj._id);
      }

      /** 弹出确认对话框 */
      const confirmed = confirm("确定要批量修改吗？");
      if (confirmed)
        store.dispatch("Pd/updateMany", { ids, update: { $set: updateSet } });
      location.reload();
    };

    const truncate = (str) => {
      const maxLength = 20;
      if (str.length > maxLength) {
        return str.substring(0, maxLength) + "...";
      } else {
        return str;
      }
    };

    return {
      filterHandler,
      filterTag,
      toggleSelection,
      clearFilter,
      handleSelectionChange,
      updateSetManyHandle,

      deleteManyHandle,
      listHandle,

      tableRef, // 表格的 ref

      data,
      truncate, // 省略号
    };
  },
};
</script>
