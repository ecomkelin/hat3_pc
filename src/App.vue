<template>
  <PcLayout v-if="ui.isLogin" />
  <LoginUser v-else />
</template>

<script>
import { useStore } from "vuex";
import localforage from "localforage";

import { computed, reactive } from "@vue/runtime-core";
import PcLayout from "./components/_global/layout/PcLayout.vue";
import LoginUser from "./components/_global/noAuth/LoginUser.vue";

export default {
  name: "App",
  components: {
    PcLayout,
    LoginUser,
  },
  setup() {
    const store = useStore();
    const ui = reactive({
      isLogin: false,
    });

    /** 根据 Vuex Auth模块的信息 判断是否登录 */
    ui.isLogin = computed(() => {
      // console.log(1231, store.state.Auth)
      return store.state.Auth.isLogin;
    });
    /** 如果 缓存中没有登录 则去浏览器存储查找 如果查找到 则放入缓存 */
    if (!ui.isLogin) {
      getPayload(store);
    }

    return {
      ui,
    };
  },
};

const getPayload = async (store) => {
  const Auth = await localforage.getItem("Auth");
  if (!Auth) return;
  const { accessToken, refreshToken, payload = {} } = Auth;
  if (!accessToken || !refreshToken || !payload._id) return;
  store.commit("Auth/MT_login", Auth);
};
</script>Ï



<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>