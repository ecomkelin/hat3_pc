<template>
  <h2>User Page</h2>
  <hr />
  <ReqData searchFields="code"/>
  <UserAdd />
  <UserList />
  <hr/>
  <h1>User Page end</h1>
</template>

<script>
import UserAdd from "@/components/model/User/UserAdd.vue";
import UserList from "@/components/model/User/UserList.vue";
import ReqData from "@/components/request/ReqData.vue";
export default {
  components: { UserList, ReqData, UserAdd},
  setup() {},
};
</script>
