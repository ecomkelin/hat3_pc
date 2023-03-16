<template>
  <div class="page-box">
    <div>页面链接:</div>
    <div class="nav-box">
      <div
        v-for="(nav, index) in navs"
        :key="nav.id + index"
        style="flex: 1; margin: 20px 0"
      >
        <router-link :to="nav.to" class="nav-item">
          <i :class="nav.class"></i>
          <span class="links_name">{{ nav.title }}</span>
        </router-link>
      </div>
    </div>
  </div>

  <div class="page-box">
    <PdMany />
  </div>
</template>

<script setup>
import PdMany from "@/components/setting/PdMany.vue";

const navs = [
  {
    id: "set01-",
    title: "Analytics",
    to: "/analysisOrder",
    class: "bx bx-pie-chart-alt-2",
  },
  { id: "set02-", title: "后台类目", to: "/Cateb", class: "bx bx-chat" },
  { id: "set03-", title: "属性", to: "/attr", class: "bx bx-grid-alt" },
  { id: "set04-", title: "图片资源", to: "/images", class: "bx bx-grid-alt" },
  { id: "set04-", title: "首页商品", to: "/HomePd", class: "bx bx-grid-alt" },
];
</script>

<style scoped>
.page-box {
  margin: 10px;
  padding: 10px;
  border: 1px solid black;
}
.nav-box {
  display: flex;
}
.nav-item {
  border: 1px solid black;
  border-radius: 10px;
  margin: 5px;
  padding: 5px;

  text-decoration: none;
}

</style>