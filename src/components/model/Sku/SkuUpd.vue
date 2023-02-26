<template>
  <!-- Form -->
  <div style="float: right">
    <el-button type="warning" @click="dialogFormVisible = true">
      编辑
    </el-button>
  </div>

  <el-dialog v-model="dialogFormVisible" title="编辑 Sku">
    <el-form :model="update">

      <el-form-item label="描述" :label-width="'140px'">
        <el-input v-model="update.desc" autocomplete="off" />
      </el-form-item>

      <el-form-item label="卖价" :label-width="'140px'">
        <el-input v-model="update.price_sale" autocomplete="off" />
      </el-form-item>

      <el-form-item label="标价" :label-width="'140px'">
        <el-input v-model="update.price_retail" autocomplete="off" />
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button type="danger" @click="handleDeleteSku">删除</el-button>
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="submitHandle"> Confirm </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script>
import { reactive, ref } from "vue";
import { useStore } from "vuex";

export default {
  name: "SkuUpd",
  props: ["Sku"],
  setup(props) {
    const store = useStore();
    /** 模态框 控制 弹出隐藏 false 为隐藏 */
    const dialogFormVisible = ref(false);
    /** 要提交的数据 */
    const update = reactive({
      desc: props.Sku.desc,
      price_retail: props.Sku.price_retail,
      price_sale: props.Sku.price_sale,
    });

    /** 删除 Sku */
    const handleDeleteSku = async() => {
      await store.dispatch("Pd/deleteSku", { filter: {_id: props.Sku._id}, Pd: props.Sku.Pd });
      dialogFormVisible.value = false;
    }

    /** 提交 form */
    const submitHandle = async () => {
      if (isNaN(update.price_sale)) {
        alert("price_sale 必须为数字");
        return;
      }

      await store.dispatch("Pd/updateSku", { filter: {_id: props.Sku._id},update });
      dialogFormVisible.value = false;
    };

    return {
      dialogFormVisible,
      update,

      submitHandle,

      handleDeleteSku
    };
  },
};
</script>

<style scoped>
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
