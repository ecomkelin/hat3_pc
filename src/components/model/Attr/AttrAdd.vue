<template>
  <!-- Form -->
  <div style="float: right">
    <el-button type="primary" @click="dialogFormVisible = true">
      {{ form.Attk.length > 0 ? "添加属性值" : "添加属性名" }}
    </el-button>
  </div>

  <el-dialog v-model="dialogFormVisible" title="添加新的 Attr">
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
import { watch, reactive, ref } from "vue";
import { useStore } from "vuex";

export default {
  name: "AttrAdd",
  setup() {
    const store = useStore();
    const dialogFormVisible = ref(false);

    const form = reactive({
      Attk: "",
      code: "",
      desc: "",
    });

    watch(dialogFormVisible, () => {
      form.code = "";
      form.desc = "";
      if (store.state.Attr.object) {
        form.Attk = store.state.Attr.object._id;
      } else {
        form.Attk = "";
      }
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
