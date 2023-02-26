<template>
  <!-- 用户组件内部选择器 -->

  <div style="margin: 20px">
    <div class="detail">
      hello User Detail
      <div class="info">
        <p style="margin: 10px">编号: {{ data.User.code }}</p>
        <p style="margin: 10px">角色: {{ data.User.role }}</p>
      </div>
      <div class="upd"></div>
    </div>
    <div style="float: right; margin-right: 50px">
      <el-button @click="deleteOneHandle" type="danger">删除</el-button>
    </div>
    <UserUpd :object="data.User" />
    <!-- <h3>Family</h3>
          <el-table :data="data.User.family" :border="childBorder">
            <el-table-column label="Name" prop="name" />
            <el-table-column label="State" prop="state" />
            <el-table-column label="City" prop="city" />
            <el-table-column label="Address" prop="address" />
            <el-table-column label="Zip" prop="zip" />
          </el-table> -->
  </div>
</template>

<script>
import { computed, reactive } from "vue-demi";
import { useStore } from "vuex";

import UserUpd from "./UserUpd.vue";

export default {
  name: "UserDetail",
  components: { UserUpd },
  props: ["User"],
  setup(props) {
    const store = useStore();
    const payload = store.state.Auth.payload;

    const data = reactive({
      User: {},
    });

    data.User = computed(() => {
      return props.User;
    });

    const deleteOneHandle = async () => {
      if (payload.role >= data.User.role) {
        alert("您无权删除此角色");
        return;
      }

      const confirmed = confirm("确定要删除该项吗？");
      if (confirmed) await store.dispatch("User/deleteOne", data.User._id);
    };

    const ui = reactive({
      isEdit: false,
    });
    return {
      deleteOneHandle,
      data,
      ui,
    };
  },
};
</script>
