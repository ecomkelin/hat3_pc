<template>
  <el-upload
    v-model:file-list="fileData.fileList"
    list-type="picture-card"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
  >
    <!-- <el-icon>+</el-icon> -->
  </el-upload>

  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>

  <!-- <el-form-item label="图片">
    <el-upload
      v-model:file-list="fileData.fileList"
      :auto-upload="false"
      :on-success="onSuccess"
      :before-upload="beforeUpload"
      :on-exceed="handleExceed"
      multiple
      list-type="picture-card"
    >
      <template #trigger>
        <el-button size="small" type="primary">选取文件</el-button>
      </template>

    </el-upload>
  </el-form-item> -->
</template>

<script>
import { computed, reactive, ref } from "vue-demi";
export default {
  name: "PdFile",
  props: ["object"],
  setup(props) {
    const fileData = reactive({
      fileList: [],
    });
    fileData.fileList = computed(() => {
      const imgs = props.object.imgs;
      const fls = [];
      if (imgs && imgs.length > 0) {
        for (let i in imgs) {
          let img = imgs[i];
          fls.push({
            name: "img" + i,
            url: "/h3" + img,
          });
        }
      }
      return fls;
    });

    const dialogImageUrl = ref("");
    const dialogVisible = ref(false);
    const handlePreview = (uploadFile) => {
      dialogImageUrl.value = uploadFile.url;
      dialogVisible.value = true;
    };
    const handleRemove = (uploadFile, uploadFiles) => {
      console.debug(" @@ 占位 ", uploadFiles);
      const url = uploadFile.url;
      console.debug(" @@ 占位 ", url);
    };
    const handleChange = (uploadFile, uploadFiles) => {
      console.debug(" @@ 占位 ", uploadFile.name);
      console.debug(" @@ 占位 ", uploadFiles);

      return;
      // const url = uploadFile.url;
      // fileData.fileList.push({
      //   name: "newImgs",
      //   url,
      //   uid: 1676887455849,
      //   status: "success"
      // })
      // fileData.fileList.push(uploadFile);
    };

    // const onSuccess = () => {
    //   console.log("onSuccess");
    // };
    // const beforeUpload = () => {
    //   console.log("beforeUpload");
    // };
    // const handleExceed = () => {
    //   console.log("handleExceed")
    // };

    return {
      fileData,

      dialogImageUrl,
      dialogVisible,
      handlePreview,
      handleRemove,
      handleChange,

      // onSuccess,
      // beforeUpload,
      // handleExceed,
    };
  },
};
</script>

<style>
</style>