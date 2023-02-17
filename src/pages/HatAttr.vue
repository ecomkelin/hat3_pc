<template>
  <h2>Attr Page</h2>
  <hr />
  <AttrAdd />
  <AttrList />
</template>

<script>
import AttrAdd from "@/components/model/Attr/AttrAdd.vue";
import AttrList from "@/components/model/Attr/AttrList.vue";
export default {
  name: "HatAttr",
  components: {
    AttrList,
    AttrAdd,
  },
};
</script>

<style>
</style>