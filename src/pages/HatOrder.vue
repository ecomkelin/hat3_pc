<template>
  <!-- 用户组件内部选择器 -->

  <div style="margin-bottom: 20px; margin-top: 20px">
    <el-button @click="listHandle(dt.Orders)">刷新订单</el-button>
  </div>

  <!-- 用户列表 使用 elementPlus table -->
  <el-table
    :data="dt.Orders"
    ref="tableRef"
    row-key="_id"
    style="width: 100%"
    lazy
    stripe
    :default-expand-all="false"
  >
    <el-table-column type="expand">
      <template #default="props">
        <div style="margin: 15px">
          <OrderDetail :Order="props.row" />
        </div>
      </template>
    </el-table-column>

    <el-table-column type="index" width="50" />

    <el-table-column prop="code" sortable label="编号" width="150" />
    <el-table-column label="状态" width="80">
      <template #default="{ row }">
        <div>{{ row.desc_step }}</div>
      </template>
    </el-table-column>

    <el-table-column label="客户" width="150">
      <template #default="{ row }">
        <div v-if="row.Client_as">{{ row.Client_as[0].name }}</div>
      </template>
    </el-table-column>

    <el-table-column label="卖价/标价" width="150">
      <template #default="{ row }">
        <div v-if="row.goods_sale">{{ row.goods_sale }}</div>
        <div v-else style="color: red">卖价错误, 请检查</div>
        <div v-if="row.goods_retail">{{ row.goods_retail }}</div>
        <div v-else style="color: red">标价错误, 请检查</div>
      </template>
    </el-table-column>

    <el-table-column label="配送信息">
      <template #default="{ row }">
        <div v-if="row.freight_info">
          <div>{{ row.freight_info.name }}</div>
          <div>{{ row.freight_info.tel }}</div>
          <div>{{ row.freight_info.city }}</div>
          <div>{{ row.freight_info.addr }}</div>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="下单时间" width="120">
      <template #default="{ row }">
        <div>{{ row.at_crt_format }}</div>
      </template>
    </el-table-column>
  </el-table>
  <PagiNation />
</template>

<script setup>
import { computed, reactive, watch } from "vue";
import { useStore } from "vuex";

import PagiNation from "@/components/request/PagiNation.vue";

import OrderDetail from "@/components/model/Order/OrderDetail.vue";

const store = useStore();

/** checkbox 模块的操作  */
// const tableRef = ref([]);  // 暂时不做 多数据操作

/** 数据 */
const dt = reactive({
  Orders: [], // 获取的数据
  dataFilter: [], // store对获取的数据的归纳，可以进行数据筛选
});
const skip = computed(() => store.state.Request.skip);
const limit = computed(() => store.state.Request.limit);


/** 获取 Orders */
dt.Orders = computed(() => store.state.Order.objects);
/** 获取 本页筛选条件 */
dt.dataFilter = computed(() => store.state.Order.dataFilter);

/** 页面变动 */
watch(
  skip,
  async () => {
    await store.dispatch("Order/list", {skip: skip.value, limit: limit.value});
  },
  { immediate: true }
);
/** 重新设置 订单 自动再获取 */
const listHandle = async () => {
  await store.dispatch("Order/list", {skip: skip.value, limit: limit.value});
};
</script>
