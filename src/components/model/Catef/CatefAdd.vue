<template>
  <!-- Form -->
  <div style="float: right">
    <el-button type="primary" @click="dialogFormVisible = true">
      添加前台类目
    </el-button>
  </div>

  <el-dialog v-model="dialogFormVisible" title="添加新的 Catef">
    <el-form :model="document">
      <el-form-item label="名称" :label-width="'140px'">
        <el-input v-model="document.code" autocomplete="off" />
      </el-form-item>

      <!-- <el-form-item label="描述" :label-width="'140px'">
        <el-input v-model="document.desc" autocomplete="off" />
      </el-form-item> -->

      <el-form-item label="排序" :label-width="'140px'">
        <el-input v-model="document.sort" autocomplete="off" />
      </el-form-item>

      <el-form-item label="图片" :label-width="'140px'">
        <input type="file" @change="handleFileChange" />
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
  name: "CatefAdd",
  setup() {
    const store = useStore();
    const dialogFormVisible = ref(false);

    const document = reactive({
      code: "",
      // desc: "",
      sort: 0,
    });

    watch(dialogFormVisible, () => {
      document.code = "";
      // document.desc = "";
      document.sort = 0;
    });

    /** 要提交的文件 */
    const file = ref([]);
    function handleFileChange(event) {
      file.value = event.target.files[0];
    }

    const submitHandle = async () => {
      if (file.value) {
        const formData = new FormData();
          formData.append("icon", file.value);
        formData.append(
          "body",
          JSON.stringify({document})
        );
        await store.dispatch("Catef/add", formData);
      } else {
        await store.dispatch("Catef/add", {document});
      }
      dialogFormVisible.value = false;
    };

    return {
      dialogFormVisible,
      document,

      handleFileChange,
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
