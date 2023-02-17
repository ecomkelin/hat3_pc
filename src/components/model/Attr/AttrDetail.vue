<template>
  <span v-for="Attv in data.Attvs" :key="Attv._id">- [ {{Attv.code}} ] -</span>
</template>

<script>
import { computed, reactive } from 'vue-demi';
import { useStore } from 'vuex'

export default {
  name: "AttrDetail",
  props: ["Attk"],
  setup(props) {
    const store = useStore();
    const data = reactive({
      Attvs: []
    })
    data.Attvs = computed(() => {
      const Attks = store.state.Attr.objects;
      for(let i in Attks) {
        if(props.Attk._id === Attks[i]._id) return Attks[i].Attvs
      }
    })
    return {
      props,
      data
    }
  }

}
</script>

<style>

</style>