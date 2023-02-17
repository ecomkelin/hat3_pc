<template>
  <h1>Test Page</h1>
  <input ref="ipt" />
  <input ref="ipt1" />
  <div ref="rg">This is a rg element</div>
<div style="font-size: 20px">
    <!-- 由于SVG图标默认不携带任何属性 -->
    <!-- 你需要直接提供它们 -->

  </div>
  <div style="color: red;font-size: 40px;">
  <el-icon><Plus /></el-icon>
   <el-icon> <AddLocation /></el-icon>
  </div>
  <ul>
    <li
      v-for="(item, i) in list"
      :key="i"
      :ref="
        (el) => {
          if (el) divs[i] = el;
        }
      "
    >
      {{ item }}
    </li>
  </ul>
</template>

<script>
import { onBeforeUpdate, onMounted, reactive, ref } from "vue-demi";
import { AddLocation, Plus } from '@element-plus/icons'
export default {
  name: "HatTest",
  components: {AddLocation, Plus},
  setup() {
    const ipt = ref(null);
    const ipt1 = ref(null);
    const rg = ref(null);

    const list = reactive([1, 2, 3]);
    const divs = ref([]);
    onMounted(() => {
      // DOM元素在出事渲染后分配给ref
      ipt.value.focus();
      ipt1.value.value = 1;
      rg.value.textContent = "hello";
      console.log("关于单个ref", rg.value);

      divs.value[1].textContent = "wol";
      console.log("关于多个 ref", divs.value[1]);
    });
    onBeforeUpdate(() => {
      divs.value = [];
    });

    return {
      ipt,
      ipt1,
      rg,

      list,
      divs,
    };
  },
};
</script>

<style>
</style>