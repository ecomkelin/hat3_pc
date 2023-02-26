<template>
  <el-table :data="objects" stripe :border="true" style="width: 900px">
    <el-table-column type="index" width="50" fixed="left" />

    <el-table-column fixed="left" label="操作" width="80">
      <template #default="{ row }">
        <!-- <el-button link type="primary" size="small" @click="handleClick"
          >Detail</el-button
        > -->
        <!-- <el-button link type="primary" size="small" @click="handelSkuUpd">编辑</el-button> -->
        <SkuUpd :Sku="row" />
      </template>
    </el-table-column>

    <el-table-column prop="desc" label="描述" width="180" />

    <el-table-column label="属性">
      <template #default="{ row }">
        <ul v-if="row.kv_attrs">
          <li v-for="(attr, i) in row.kv_attrs" :key="i + attr.Attk">
            {{ attr.Attk }}: {{ attr.Attv }}
          </li>
        </ul>
      </template>
    </el-table-column>

    <el-table-column prop="price_retail" label="标价" width="180" />
    <el-table-column prop="price_sale" label="售价" width="180" />
    <!-- <el-table-column prop="price_cost" label="采购价" /> -->
  </el-table>
</template>

<script>
import { computed } from "vue-demi";
import SkuUpd from "./SkuUpd.vue";
export default {
  name: "SkuList",
  components: { SkuUpd },
  props: ["Skus"],
  setup(props) {
    const objects = computed(() => {
      return props.Skus;
    });

    return {
      objects,
    };
  },
};
</script>
