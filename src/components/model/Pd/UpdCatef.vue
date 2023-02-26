<template>
  <el-button type="warning" link @click="dialogFormVisible = true">
    修改
  </el-button>

  <el-dialog v-model="dialogFormVisible" title="修改产品的前台类目" width="300">
    <el-form :model="update">
      <el-form-item label="前台类目" :label-width="'140px'">
        <el-cascader
          :props="{ multiple: true }"
          :options="Catef_options"
          @change="handleCatefChange"
          filterable
          clearable
        />
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
import { computed, reactive, ref } from "vue";
import { useStore } from "vuex";

export default {
  name: "UpdCatef",
  props: ["Pd"],
  setup(props) {
    const store = useStore();
    /** 模态框 控制 弹出隐藏 false 为隐藏 */
    const dialogFormVisible = ref(false);

    /** 要提交的数据 */
    const update = reactive({
      Catefs: props.Pd.Catefs,
    });

    /** Catef 前台类目的 选择 根据前端前台类目来的 */
    let Catef_options = computed(() => {
      let Catefs = store.state.Catef.objects;
      let options = [];
      for (let i in Catefs) {
        const Catef = Catefs[i];
        const option = {
          value: Catef._id,
          label: Catef.code,
        };
        options.push(option);
      }
      return options;
    });
    /** 当前台类目联级选择器变化时 */
    const handleCatefChange = (value) => {
      if (value) {
        const Catefs = [];
        for (let key in value) {
          Catefs.push(value[key][0]);
        }
        update.Catefs = Catefs;
      } else {
        update.Catefs = [];
      }
    };

    /** 提交 form */
    const submitHandle = async () => {
      await store.dispatch("Pd/update", {
        filter: { _id: props.Pd._id },
        update,
      });
      dialogFormVisible.value = false;
    };

    return {
      dialogFormVisible,
      update,
      Catef_options,
      handleCatefChange,

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
