<template>
  <el-form :model="form">
    <el-form-item label="编号" :label-width="'140px'">
      <el-input v-model="form.code" autocomplete="off" />
    </el-form-item>

    <el-form-item label="名称" :label-width="'140px'">
      <el-input v-model="form.name" autocomplete="off" />
    </el-form-item>

    <!-- <div v-if="Cateb_formats">
      原后台类目: {{ Cateb_formats[0]?.label }} -- {{ Cateb_formats[1]?.label }}
    </div>
    <el-form-item label="后台类目" :label-width="'140px'">
      <el-cascader
        v-model="Cateb_formats"
        :options="Cateb_options"
        @change="handleCatebChange"
        clearable
      />
    </el-form-item> -->

    <el-form-item label="描述" :label-width="'140px'">
      <el-input v-model="form.desc" autocomplete="off" />
    </el-form-item>

    <el-form-item label="备注" :label-width="'140px'">
      <el-input v-model="form.note" autocomplete="off" />
    </el-form-item>

    <el-form-item label="排序" :label-width="'140px'">
      <el-input v-model="form.sort" autocomplete="off" />
    </el-form-item>

    <el-button type="primary" @click="submitHandle" v-show="isChange"
      >保存</el-button
    >
    <el-button type="primary" plain @click="submitHandle" v-show="!isChange"
      >关闭</el-button
    >
  </el-form>
</template>
<script>
import { computed, reactive, ref } from "vue";
import { useStore } from "vuex";

export default {
  name: "PdUpd",
  props: ["object", "hideUpdHandle"],
  setup(props) {
    const store = useStore();

    const form = reactive({
      code: props.object.code,
      name: props.object.name,
      // Cateb: props.object.Cateb || "",
      desc: props.object.desc,
      note: props.object.note,
      sort: props.object.sort,
    });

    // let Cateb_options = computed(() => {
    //   let Catebs = store.state.Cateb.objects;
    //   let options = [];
    //   for (let i in Catebs) {
    //     const Cateb = Catebs[i];
    //     const option = {
    //       value: Cateb._id,
    //       label: Cateb.code,
    //     };
    //     if (Cateb.Cateb_sons instanceof Array) {
    //       option.children = [];
    //       for (let j in Cateb.Cateb_sons) {
    //         let son = Cateb.Cateb_sons[j];
    //         option.children.push({
    //           value: son._id,
    //           label: son.code,
    //         });
    //       }
    //     }
    //     options.push(option);
    //   }
    //   return options;
    // });
    // const handleCatebChange = (value) => {
    //   try {
    //     form.Cateb = value[1];
    //   } catch (e) {
    //     form.Cateb = "";
    //   }
    // };

    /** 是否有变化 */
    let isChange = ref(false);
    isChange = computed(() => {
      for (let key in form) {
        if (props.object[key] !== form[key]) {
          if(!props.object[key] && !form[key]) continue;
          return true;
        }
      }
      return false;
    });

    const submitHandle = async () => {
      if (isChange.value) {
        await store.dispatch("Pd/update", {
          filter: { _id: props.object._id },
          update: form,
        });
      }
      props.hideUpdHandle();
    };
    return {
      isChange,

      form,

      // Cateb_formats: props.object.Cateb_formats,
      // Cateb_options,
      // handleCatebChange,

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
