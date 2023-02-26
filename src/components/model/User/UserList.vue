<template>
  <!-- 用户组件内部选择器 -->

  <div style="margin-bottom: 20px; margin-top: 20px">
    <el-button @click="toggleSelection(data.Users)">反选</el-button>
    <el-button @click="toggleSelection()">取消选择</el-button>
    <el-button @click="resetDateFilter">清除日期筛选</el-button>
    <el-button @click="clearFilter">清除所有筛选</el-button>
    <span v-if="data.sel_Users.length > 0" style="margin-left: 10px">
      <el-button @click="deleteManyHandle" type="danger">批量删除</el-button>
      <el-button @click="updateSetManyHandle({is_usable: true})" type="warning">批量上架</el-button>
      <el-button @click="updateSetManyHandle({is_usable: false})" type="warning">批量下架</el-button>
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
    :data="data.filterUsers"
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
          <UserDetail :User="props.row" />
        </div>
      </template>
    </el-table-column>

    <el-table-column type="index" width="50" fixed="left" />
    <el-table-column type="selection" width="55" />

    <el-table-column prop="code" sortable label="编号" width="120" />

    <el-table-column
      prop="at_crt_format"
      label="Date"
      sortable
      column-key="at_crt"
      :filters="data.dataFilter.at_crt_format"
      :filter-method="filterHandler"
    />

    <el-table-column prop="_role" sortable label="角色" />

    <el-table-column
      fixed="right"
      prop="is_usable_format"
      label="在用"
      width="100"
      sortable
      :filters="[
        { text: '在用', value: '在用' },
        { text: '禁用', value: '禁用' },
      ]"
      :filter-method="filterHandler"
      filter-placement="bottom-end"
    >
      <template #default="scope">
        <el-tag
          :type="scope.row.is_usable_format === '禁用' ? 'danger' : 'success'"
          disable-transitions
          >{{ scope.row.is_usable_format }}</el-tag
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { computed, reactive, ref, watch } from "vue";
import { useStore } from "vuex";
import moment from "moment";
/** 删除确认按钮 */
// import { ElMessage, ElMessageBox } from "element-plus";

import UserDetail from "./UserDetail.vue";

export default {
  name: "UserList",
  components: { UserDetail },
  setup() {
    const store = useStore();
    const payload = store.state.Auth.payload;

    const data = reactive({
      req: {},

      Users: [],
      dataFilter: [],

      filterUsers: [],
      searchText: "",

      sel_Users: [],
    });

    data.req = computed(() => {
      return store.state.Request;
    });

    data.Users = computed(() => {
      return store.state.User.objects;
    });
    data.dataFilter = computed(() => {
      return store.state.User.dataFilter;
    });

    data.filterUsers = computed(() => {
      if (!data.searchText) {
        return data.Users;
      }
      return data.Users.filter((item) =>
        item.code.toLowerCase().includes(data.searchText.toLowerCase())
      );
    });

    watch(
      data.req,
      async () => {
        await store.dispatch("User/list", data.req);
      },
      { immediate: true }
    );

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

    const resetDateFilter = () => {
      tableRef.value.clearFilter(["at_crt"]);
    };
    const clearFilter = () => {
      tableRef.value.clearFilter();
    };

    const handleSelectionChange = (selection) => {
      data.sel_Users = selection;
    };

    /** 批量删除 */
    const deleteManyHandle = () => {
      /** 找出要删除的 ids */
      const ids = [];
      /** 根据身份筛选 */
      for (let i in data.sel_Users) {
        const user = data.sel_Users[i];
        if (payload.role < user.role) ids.push(user._id);
      }
      if (ids.length !== data.sel_Users.length) {
        alert("您选择的角色中 有些因为角色权限问题 不可删除");
        return;
      }
      /** 弹出确认对话框 */
      const confirmed = confirm("确定要批量删除吗？");
      if (confirmed) store.dispatch("User/deleteMany", ids);
    };

    const updateSetManyHandle = async(updateSet) => {
      /** 找出要修改的 ids */
      const ids = [];
      /** 根据身份筛选 */
      for (let i in data.sel_Users) {
        const user = data.sel_Users[i];
        if (payload.role < user.role) ids.push(user._id);
      }
      if (ids.length !== data.sel_Users.length) {
        alert("您选择的角色中 有些因为角色权限问题 不可修改");
        return;
      }

      /** 弹出确认对话框 */
      const confirmed = confirm("确定要批量修改吗？");
      if (confirmed) store.dispatch("User/updateMany", {ids, update:{"$set": updateSet}});
      location.reload();
    }

    return {
      moment,

      filterHandler,
      filterTag,
      toggleSelection,
      resetDateFilter,
      clearFilter,
      handleSelectionChange,
      updateSetManyHandle,

      deleteManyHandle,

      tableRef,

      data,
    };
  },
};
</script>
