<template>
  <div class="sidebar" :class="ui.spreadbar">
    <div class="logo_content">
      <div class="logo">
        <i class="bx bxl-c-plus-plus"></i>
        <div class="logo_name">Kelinlab</div>
      </div>
      <i class="bx bx-menu" @click="spreadbarToggleHandle"></i>
    </div>

    <ul class="nav_list">
      <li>
        <i class="bx bx-search" @click="spreadbarSearchHandle"></i>
        <input
          type="text"
          ref="iptSearch"
          class="links_name"
          placeholder="Search..."
        />
        <span class="tooltip">Search</span>
      </li>

      <li v-for="(nav, index) in ui.navs" :key="nav.id + index">
        <router-link :to="nav.to">
          <i :class="nav.class"></i>
          <span class="links_name">{{ nav.title }}</span>
        </router-link>
        <span class="tooltip">{{ nav.title }}</span>
      </li>
    </ul>

    <div class="profile_content">
      <div class="profile">
        <div class="profile_details">
          <img src="@/asset/avatar.png" alt="" />
          <div class="name_job">
            <div class="name">{{ data.payload.code }}</div>
            <div class="job">{{ data.payload.role }}</div>
          </div>
        </div>
        <i class="bx bx-log-out" id="log_out" @click="logoutHandle"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive, ref } from "vue";
import { useStore } from "vuex";

export default {
  name: "PcSidebar",
  setup() {
    const store = useStore();
    const ui = reactive({
      spreadbar: "spreadbar",
      navs: [
        { id: "nav01-", title: "Home", to: "/", class: "bx bx-grid-alt" },
        { id: "nav03-", title: "产品", to: "/Pd", class: "bx bx-grid-alt" },
        { id: "nav04-", title: "Order", to: "/Order", class: "bx bx-cart-alt" },
        { id: "nav05-", title: "前台类目", to: "/Catef", class: "bx bx-chat" },
        { id: "nav06-", title: "Saved", to: "/save", class: "bx bx-heart" },
        { id: "nav07-", title: "Setting", to: "/setting", class: "bx bx-cog" },
      ],
    });

    function spreadbarToggleHandle() {
      ui.spreadbar = ui.spreadbar ? "" : "spreadbar";
    }
    /** 获取dom元素 */
    const iptSearch = ref(null);
    function spreadbarSearchHandle() {
      if (!ui.spreadbar) {
        ui.spreadbar = "spreadbar";
        iptSearch.value.focus();
      } else {
        console.info("");
      }
    }

    const data = reactive({
      payload: {},
    });
    data.payload = computed(() => {
      return store.state.Auth.payload;
    });
    async function logoutHandle() {
      await store.dispatch("Auth/logout");
    }

    return {
      logoutHandle,
      data,

      spreadbarToggleHandle,
      spreadbarSearchHandle,
      iptSearch,
      ui,
    };
  },
};
</script>

<style src="./css/PcSidebar.css" scoped>
</style>