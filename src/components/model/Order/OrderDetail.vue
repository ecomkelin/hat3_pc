<template>
  <div style="margin: 20px 200px">
    <div class="detail">
      <div class="info">
        <p style="margin: 10px">编号: {{ props.Order.code }}</p>
        <p style="margin: 10px">创建时间: {{ props.Order.at_crt_format }}</p>
        <div style="margin: 10px">
          状态: {{ props.Order.desc_step }}
          <el-button
            type="danger"
            round
            v-if="props.Order.step === 1"
            @click="changeStep(props.Order._id, 5)"
            >客户线下已付</el-button
          >
          <el-button
            type="danger"
            round
            v-else-if="props.Order.step === 5"
            @click="changeStep(props.Order._id, 10)"
            >完成
          </el-button>
          <el-button
            type="danger"
            round
            v-else-if="props.Order.step === 10"
            @click="changeStep(props.Order._id, 1)"
            >设定为未付状态
          </el-button>
        </div>
      </div>
    </div>

    <el-table
      :data="props.Order.lines"
      :default-sort="{ prop: 'date', order: 'descending' }"
      style="width: 100%"
    >
      <el-table-column label="图片" width="180">
        <template #default="{ row }">
          <img
            v-if="row.img"
            :src="'/h3/abbr' + row.img"
            :alt="row.img"
            height="40"
          />
        </template>
      </el-table-column>

      <el-table-column prop="name" label="名称" sortable />
      <el-table-column prop="qty" label="数量" sortable width="180" />
      <el-table-column prop="price_sale" label="卖价" sortable width="180" />
      <el-table-column prop="price_retail" label="标价" sortable width="180" />
    </el-table>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { useStore } from "vuex";
const store = useStore();
const props = defineProps({
  Order: Object,
});
async function changeStep(_id, step) {
  let info;
  switch (step) {
    case 1:
      info = "确定返回未付状态";
      break;
    case 5:
      info = "确定客户线下已付钱";
      break;
    case 10:
      info = "确定已经完成";
  }
  /** 弹出确认对话框 */
  const confirmed = confirm(info);
  if (confirmed) store.dispatch("Order/update", {_id, step});
}
</script>

<style>
</style>