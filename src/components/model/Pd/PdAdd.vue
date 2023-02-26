<template>
  <!-- Form -->
  <div style="float: right">
    <el-button type="primary" @click="dialogFormVisible = true">
      添加新产品
    </el-button>
  </div>

  <el-dialog v-model="dialogFormVisible" title="添加产品">
    <el-form :model="document">
      <el-form-item label="编号" :label-width="'140px'">
        <el-input v-model="document.code" autocomplete="off" />
      </el-form-item>

      <el-form-item label="名称" :label-width="'140px'">
        <el-input v-model="document.name" autocomplete="off" />
      </el-form-item>

      <el-form-item label="卖价" :label-width="'140px'">
        <el-input v-model="document.price_sale" autocomplete="off" />
      </el-form-item>

      <el-form-item label="标价" :label-width="'140px'">
        <el-input v-model="document.price_retail" autocomplete="off" />
      </el-form-item>

      <!-- <el-form-item label="后台类目" :label-width="'140px'">
        <el-cascader
          :options="Cateb_options"
          @change="handleCatebChange"
          filterable
          clearable
        />
      </el-form-item> -->

      <el-form-item label="描述" :label-width="'140px'">
        <el-input v-model="document.desc" autocomplete="off" />
      </el-form-item>

      <el-form-item label="备注" :label-width="'140px'">
        <el-input v-model="document.note" autocomplete="off" />
      </el-form-item>

      <el-form-item label="排序" :label-width="'140px'">
        <el-input v-model="document.sort" autocomplete="off" />
      </el-form-item>

      <el-form-item label="图片" :label-width="'140px'">
        <input type="file" multiple @change="handleFileChange" />
      </el-form-item>

      <el-form-item label="属性" :label-width="'140px'">
        <el-cascader
          placeholder="选择属性"
          :options="Attr_options"
          :props="{ multiple: true }"
          @change="handleAttrChange"
          filterable
          clearable
        />
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
import { computed, onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";

export default {
  name: "PdAdd",
  setup() {
    const store = useStore();
    /** 模态框 控制 弹出隐藏 false 为隐藏 */
    const dialogFormVisible = ref(false);

    /** 要提交的数据 */
    const document = reactive({
      code: "0001",
      name: "name01",
      Cateb: "",
      desc: "desc01",
      note: "note01",
      sort: 0,
      kvs_attrs: [],

      price_retail: 0,
      price_sale: 0,
    });

    /** 要提交的文件 */
    const files = ref([]);
    function handleFileChange(event) {
      files.value = event.target.files;
    }

    // /** 备用  Cateb 后台类目的 选择 根据前端后台类目来的 */
    // let Cateb_options = computed(() => {
    //   let Catebs = store.state.Cateb.objects;
    //   let options = [];
    //   for (let i in Catebs) {
    //     const Cateb = Catebs[i];
    //     if (Cateb.Cateb_sons instanceof Array) {
    //       const option = {
    //         value: Cateb._id,
    //         label: Cateb.code,
    //         children: [],
    //       };
    //       for (let j in Cateb.Cateb_sons) {
    //         let son = Cateb.Cateb_sons[j];
    //         option.children.push({
    //           value: son._id,
    //           label: son.code,
    //         });
    //       }
    //       options.push(option);
    //     }
    //   }
    //   return options;
    // });
    // /** 当后台类目联级选择器变化时 */
    // const handleCatebChange = (value) => {
    //   /** Cateb 接收二级后台类目 */
    //   document.Cateb = value ? value[1] : "";
    // };

    /** 有可能 Attrs 还没有被加载
     * 000000 已经在App那里加入了 dispatch 这为什么不能直接收到？？
    */
    let Attrs = store.state.Attr.objects;
    onMounted(async () => {
      if (Attrs.length === 0) {
        await store.dispatch("Attr/list");
        Attrs = store.state.Attr.objects;
      }
    });
    let Attr_options = computed(() => {
      let options = [];
      for (let i in Attrs) {
        const Attk = Attrs[i];
        if (Attk.Attvs instanceof Array) {
          const option = {
            value: Attk.code,
            label: Attk.code,
            children: [],
          };
          for (let j in Attk.Attvs) {
            let Attv = Attk.Attvs[j];
            option.children.push({
              value: Attv.code,
              label: Attv.code,
            });
          }
          options.push(option);
        }
      }
      return options;
    });

    const handleAttrChange = (value) => {
      document.kvs_attrs = [];
      if (value) {
        for (let i in value) {
          let Attk = value[i][0];
          let Attv = value[i][1];

          let index = 0;
          for (; index < document.kvs_attrs.length; index++) {
            if (document.kvs_attrs[index].Attk === Attk) break;
          }
          if (index < document.kvs_attrs.length) {
            document.kvs_attrs[index].Attvs.push(Attv);
          } else {
            document.kvs_attrs.push({
              Attk,
              Attvs: [Attv],
            });
          }
        }
      }
    };

    /** 提交 form */
    const submitHandle = async () => {
      if(isNaN(document.price_sale)) {
        alert("price_sale 必须为数字")
        return;
      }
      if (files.value.length > 0) {
        const formData = new FormData();
        for (let i = 0; i < files.value.length; i++) {
          formData.append("imgs", files.value[i]);
        }
        formData.append(
          "body",
          JSON.stringify({ document, flagArrs: ["imgs"] })
        );
        await store.dispatch("Pd/add", formData);
      } else {
        await store.dispatch("Pd/add", { document });
      }
      dialogFormVisible.value = false;
    };

    return {
      dialogFormVisible,
      document,
      // Cateb_options,
      // handleCatebChange,
      Attr_options,
      handleAttrChange,

      submitHandle,
      handleFileChange,
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
