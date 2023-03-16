<template>
  <!-- Form -->
  <div style="float: right">
    <el-button type="primary" @click="dialogFormVisible = true">
      新增 Sku
    </el-button>
  </div>

  <el-dialog v-model="dialogFormVisible" title="新的 Sku" width="500px">
    <el-form :model="document">
      <el-form-item label="属性选择" :label-width="'140px'">
        <el-cascader
          placeholder="选择属性"
          :options="Attr_options"
          :props="{ multiple: true }"
          @change="handleAttrChange"
          filterable
          clearable
        />
      </el-form-item>

      <el-form-item label="描述" :label-width="'140px'">
        <el-input v-model="document.desc" autocomplete="off" />
      </el-form-item>

      <el-form-item label="卖价" :label-width="'140px'">
        <el-input v-model="document.price_sale" autocomplete="off" />
      </el-form-item>

      <el-form-item label="标价" :label-width="'140px'">
        <el-input v-model="document.price_retail" autocomplete="off" />
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
  name: "SkuAdd",
  props: ["Pd"],
  setup(props) {
    const store = useStore();
    /** 模态框 控制 弹出隐藏 false 为隐藏 */
    const dialogFormVisible = ref(false);
    /** 要提交的数据 */
    const document = reactive({
      Pd: props.Pd._id,
      desc: "",
      kv_attrs: [],
      price_retail: props.Pd?.Skus_as[0]?.price_retail,
      price_sale: props.Pd?.Skus_as[0]?.price_sale,
    });

    let Attr_options = computed(() => {
      let options = [];
      if(props.Pd.kvs_attrs instanceof Array) {
        for (let i in props.Pd.kvs_attrs) {
          const attr = props.Pd.kvs_attrs[i];
          if (attr.Attvs instanceof Array) {
            const option = {
              value: attr.Attk,
              label: attr.Attk,
              children: [],
            };
            for (let j in attr.Attvs) {
              let Attv = attr.Attvs[j];
              option.children.push({
                value: Attv,
                label: Attv,
              });
            }
            options.push(option);
          }
        }
      }
      return options;
    });

    const handleAttrChange = (value) => {
      document.kv_attrs = [];
      if (value) {
        for (let i in value) {
          let Attk = value[i][0];
          let Attv = value[i][1];

          let index = 0;
          for (; index < document.kv_attrs.length; index++) {
            if (document.kv_attrs[index].Attk === Attk) break;
          }
          if (index === document.kv_attrs.length) {
            document.kv_attrs.push({
              Attk,
              Attv,
            });
          }
        }
      }
    };

    /** 提交 form */
    const submitHandle = async () => {
      if (isNaN(document.price_sale)) {
        alert("price_sale 必须为数字");
        return;
      }

      await store.dispatch("Pd/add", { document });
      dialogFormVisible.value = false;
    };

    return {
      dialogFormVisible,
      document,

      Attr_options,
      handleAttrChange,

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
