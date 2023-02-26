<template>
  <!-- 用户组件内部选择器 -->

  <div style="margin: 20px">
    <el-button @click="toggleUpdHandle" type="warning">编辑</el-button>
    <PdUpd
      :object="data.Pd"
      :hideUpdHandle="hideUpdHandle"
      v-show="ui.isEdit"
    />
    <div class="detail" v-show="!ui.isEdit">
      <div class="info">
        <p style="margin: 10px">编号: {{ data.Pd.code }}</p>
        <p style="margin: 10px">名称: {{ data.Pd.name }}</p>
        <!-- <p
          style="margin: 10px"
          v-if="data.Pd.Cateb_formats && data.Pd.Cateb_as"
        >
          后台类目:
          {{ data.Pd.Cateb_formats[0]?.label }} --
          {{ data.Pd.Cateb_as[0]?.code }}
        </p> -->
        <div
          style="margin: 10px"
          v-if="data.Pd.Catefs_as && data.Pd.Catefs_as.length > 0"
        >
          <span style="margin-right: 20px"> 前台类目: </span>
          <span style="margin-right: 10px" v-for="Catef in data.Pd.Catefs_as" :key="'detail'+data.Pd._id+Catef._id">{{Catef.code}}</span>
        </div>
        <div style="margin: 10px" v-if="data.Pd.kvs_attrs">
          <div
            v-for="(attr, i) in data.Pd.kvs_attrs"
            :key="i + attr.Attk"
            style="margin-top: 20px"
          >
            <span style="margin-right: 20px"> {{ attr.Attk }}: </span>
            <span
              style="margin-right: 10px"
              v-for="(Attv, j) in attr.Attvs"
              :key="j + Attv"
              >{{ Attv }}</span
            >
          </div>
        </div>

        <p style="margin: 10px">描述: {{ data.Pd.desc }}</p>
        <!-- <p style="margin: 10px">备注: {{ data.Pd.note }}</p> -->
        <p style="margin: 10px">更新时间: {{ data.Pd.at_upd_format }}</p>
        <p style="margin: 10px">创建时间: {{ data.Pd.at_crt_format }}</p>
        <PdFile :object="data.Pd" />
      </div>
      <div class="upd"></div>
    </div>

    <el-row style="margin-top: 20px; margin-bottom: 10px">
      <SkuAdd :Pd="data.Pd" />
    </el-row>

    <SkuList :Skus="data.Pd.Skus_as" />
    <!-- <h3>Family</h3>
    <el-table :data="data.Pd.Skus" :border="childBorder">
      <el-table-column label="Address" prop="address" />
      <el-table-column label="标价" prop="price_list" />
      <el-table-column label="折扣价" prop="price_sale" />
      <el-table-column label="采购价" prop="price_cost" />
    </el-table> -->
  </div>
</template>

<script>
import { computed, reactive } from "vue-demi";

import PdUpd from "./PdUpd.vue";
import PdFile from "./PdFile.vue";

import SkuList from "../Sku/SkuList.vue";
import SkuAdd from "../Sku/SkuAdd.vue";

export default {
  name: "PdDetail",
  components: { PdUpd, PdFile, SkuList, SkuAdd },
  props: ["Pd"],
  setup(props) {
    const data = reactive({
      Pd: {},
    });
    data.Pd = computed(() => {
      return props.Pd;
    });

    const ui = reactive({
      isEdit: false,
    });
    const toggleUpdHandle = () => {
      ui.isEdit = !ui.isEdit;
    };
    const hideUpdHandle = () => {
      ui.isEdit = false;
    };

    return {
      toggleUpdHandle,
      hideUpdHandle,
      data,
      ui,
    };
  },
};
</script>
