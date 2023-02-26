<template>
  <!-- Form -->
  <div>
    <el-button type="warning" @click="dialogFormVisible = true">
      编辑
    </el-button>
  </div>

  <el-dialog v-model="dialogFormVisible" title="更新前台类目">
    <el-form :model="update">
      <el-form-item label="名称" :label-width="'140px'">
        <el-input v-model="update.code" autocomplete="off" />
      </el-form-item>

      <!-- <el-form-item label="描述" :label-width="'140px'">
        <el-input v-model="update.desc" autocomplete="off" />
      </el-form-item> -->

      <el-form-item label="排序" :label-width="'140px'">
        <el-input v-model="update.sort" autocomplete="off" />
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
import { reactive, ref, watch } from "vue";
import { useStore } from "vuex";

export default {
  name: "CatefUpd",
  setup() {
    const store = useStore();
    const dialogFormVisible = ref(false);

    const update = reactive({
      code: "",
      // desc: "",
      sort: "",
    });

    let _id;
    watch(dialogFormVisible, () => {
      const object = store.state.Catef.object;
      if (object) {
        _id = object._id;
        update.code = object.code;
        // update.desc = object.desc;
        update.sort = object.sort;
      }
    });

    /** 要提交的文件 */
    const file = ref([]);
    function handleFileChange(event) {
      file.value = event.target.files[0];
    }

    const submitHandle = async () => {
      let filter = { _id };
      if (file.value) {
        const formData = new FormData();
        formData.append("icon", file.value);
        formData.append("body", JSON.stringify({ filter, update }));
        await store.dispatch("Catef/update", formData);
      } else {
        await store.dispatch("Catef/update", {
          filter,
          update,
        });
      }
      dialogFormVisible.value = false;
    };

    return {
      dialogFormVisible,
      update,

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
