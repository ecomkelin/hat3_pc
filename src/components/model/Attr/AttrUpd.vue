<template>
  <!-- Form -->
  <div>
    <el-button type="warning" @click="dialogFormVisible = true">
      编辑
    </el-button>
  </div>

  <el-dialog v-model="dialogFormVisible" title="更新后台类目">
    <el-form :model="form">
      <el-form-item label="名称" :label-width="'140px'">
        <el-input v-model="form.code" autocomplete="off" />
      </el-form-item>

      <el-form-item label="描述" :label-width="'140px'">
        <el-input v-model="form.desc" autocomplete="off" />
      </el-form-item>

      <el-form-item label="排序" :label-width="'140px'">
        <el-input v-model="form.sort" autocomplete="off" />
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
import { reactive, ref, watch } from "vue";
import { useStore } from "vuex";

export default {
  name: "AttrUpd",
  setup() {
    const store = useStore();
    const dialogFormVisible = ref(false);

    const form = reactive({
      code: "",
      desc: "",
      sort: "",
    });
    
    let _id;
    watch(dialogFormVisible, () => {
      const object = store.state.Attr.object;
      if (object) {
        _id = object._id;
        form.code = object.code;
        form.desc = object.desc;
        form.sort = object.sort;
      }
    });

    const submitHandle = async () => {
      await store.dispatch("Attr/update", {
        filter: { _id },
        update: form,
      });
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
