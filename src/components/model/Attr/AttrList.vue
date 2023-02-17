<template>
  <div>
    <el-table
      :data="data.Attks"
      style="width: 100%"
      row-key="id"
      border
      :default-expand-all="true"
      lazy
      :load="load"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column type="expand" fixed="left">
        <template #default="props">
          <div style="margin: 15px">
            <AttrDetail :Attk="props.row" />
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="code" label="名称" />
      <el-table-column prop="desc" label="描述" />
      <el-table-column prop="_id" label="_id" />
    </el-table>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from "vue-demi";
import { useStore } from "vuex";

import AttrDetail from "./AttrDetail.vue"
export default {
  name: "AttrList",
  components: {AttrDetail},
  setup() {
    const store = useStore();
    const load = (row, treeNode, resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 31,
            date: "2016-05-01",
            name: "wangxiaohu",
            address: "No. 189, Grove St, Los Angeles",
          },
          {
            id: 32,
            date: "2016-05-01",
            name: "wangxiaohu",
            address: "No. 189, Grove St, Los Angeles",
          },
        ]);
      }, 1000);
    };

    const data = reactive({
      Attks: [],
    });
    data.Attks = computed(() => {
      return store.state.Attr.objects;
    });

    onMounted(() => {
      store.dispatch("Attr/list");
    });

    return {
      load,
      data,
    };
  },
};
</script>
