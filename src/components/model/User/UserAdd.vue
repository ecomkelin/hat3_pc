<template>
  <!-- Form -->
  <div style="float: right">
    <el-button type="primary" @click="dialogFormVisible = true">
      添加用户
    </el-button>
  </div>

  <el-dialog v-model="dialogFormVisible" title="Shipping address" width="100%">
    <el-form :model="form">
      <el-form-item label="编号" :label-width="'140px'">
        <el-input v-model="form.code" autocomplete="off" />
      </el-form-item>

      <el-form-item label="密码" :label-width="'140px'">
        <el-input type="password" v-model="form.pwd" autocomplete="off" />
      </el-form-item>

      <el-form-item label="角色" :label-width="'140px'">
        <el-select v-model="form.role" placeholder="Please select a zone">
          <el-option
            v-for="(item, index) in data.role"
            :key="index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
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
  setup() {
    const store = useStore();
    const payload = store.state.Auth.payload;
    const dialogFormVisible = ref(false);

    const form = reactive({
      code: "",
      pwd: "111111",
      role: "20",
    });

    const roleConf = {
      10: "manager",
      20: "sfer",
      30: "pder",
      40: "designer",
      100: "Client",
    };
    const data = reactive({
      role: [],
    });
    data.role = computed(() => {
      const keys = Object.keys(roleConf);
      let drs = [];
      for (let i in keys) {
        let key = parseInt(keys[i]);
        if (payload.role < key) {
          drs.push({ label: roleConf[key], value: key });
        }
      }
      return drs;
    });

    const submitHandle = async () => {
      await store.dispatch("User/add", form);
      dialogFormVisible.value = false;
    };
    return {
      dialogFormVisible,
      form,
      data,

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
