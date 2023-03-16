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

      <el-form-item label="可用" :label-width="'140px'">
        <el-radio-group v-model="update.show_list" class="ml-4">
          <el-radio :label="true" size="large">可用</el-radio>
          <el-radio :label="false" size="large">禁用</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="产品展示" :label-width="'140px'">
        <el-radio-group v-model="update.show_home" class="ml-4">
          <el-radio :label="true" size="large">是</el-radio>
          <el-radio :label="false" size="large">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="购物车推荐" :label-width="'140px'">
        <el-radio-group v-model="update.show_cart" class="ml-4">
          <el-radio :label="true" size="large">是</el-radio>
          <el-radio :label="false" size="large">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="个人中心推荐" :label-width="'140px'">
        <el-radio-group v-model="update.show_profile" class="ml-4">
          <el-radio :label="true" size="large">是</el-radio>
          <el-radio :label="false" size="large">否</el-radio>
        </el-radio-group>
      </el-form-item>
  
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
      show_list: true,
      show_home: false,
      show_cart: false,
      show_profile: false,
      sort: "",
    });

    let _id;
    watch(dialogFormVisible, () => {
      const object = store.state.Catef.object;
      if (object) {
        _id = object._id;
        update.code = object.code;
        update.show_list = object.show_list;
        update.show_home = object.show_home;
        update.show_cart = object.show_cart;
        update.show_profile = object.show_profile;
        update.sort = object.sort;
      }
    });
    /** 监视 是否可用 */
    // watch(update, () => {
    //   if (update.show_list === false) {
    //     update.show_home = false
    //   }
    // });

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
