<template>
  <!-- Form -->
  <div style="float: right">
    <el-button type="primary" @click="dialogFormVisible = true">
      添加属性
    </el-button>
  </div>

  <el-dialog v-model="dialogFormVisible" title="Shipping address" width="100%">
    <el-form :model="form">
      <el-form-item label="名称" :label-width="'140px'">
        <el-input v-model="form.code" autocomplete="off" />
      </el-form-item>

      <el-form-item label="描述" :label-width="'140px'">
        <el-input v-model="form.desc" autocomplete="off" />
      </el-form-item>

    </el-form>
    <template #footer>
      <span class="dialog-footer">
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
  setup() {
    const store = useStore();
    const dialogFormVisible = ref(false);

    const form = reactive({
      code: "",
      desc: "",
    });


    const submitHandle = async () => {
      await store.dispatch("Attr/add", form);
      dialogFormVisible.value = false;
    };
    return {
      dialogFormVisible,
      form,

      submitHandle,
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
