<template>
  <el-upload
    v-model:file-list="fileData.fileList"
    list-type="picture-card"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-upload="handleBeforeUpload"
  >
    <!-- <el-icon>+</el-icon> -->
  </el-upload>

  <el-dialog v-model="dialogVisible">
    <img
      w-full
      :src="dialogImageUrl"
      alt="Preview Image"
      style="max-width: 100%; max-height: 100%"
    />
  </el-dialog>

  <input multiple type="file" @change="handleFileChange" />
</template>

<script setup>
import { computed, reactive, ref, defineProps } from "vue";
import { useStore } from "vuex";
const store = useStore();

const props = defineProps({
  object: Object,
});
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
const handleRemove = async (uploadFile, uploadFiles) => {
  /** 占位符 */
  if (uploadFiles.name) uploadFiles.name = 1;
  let url = uploadFile.url;
  if (url) {
    url = url.split("/h3")[1];
    if (url) {
      await store.dispatch("Pd/update", {
        filter: { _id: props.object._id },
        update: {
          $remove: {
            imgs: [url],
          },
        },
      });
    }
  }
};
const handleBeforeUpload = (rawFile) => {
  alert("暂时不用这个功能");
  if (rawFile.type !== "image/jpeg") {
    alert("请上传图片");
    return false;
  }
};

/** 要提交的文件 */
async function handleFileChange(event) {
  const filter = { _id: props.object._id }
  const flagArrs = ["imgs"];

  const files = event.target.files;

  const formData = new FormData();
  formData.append("body", JSON.stringify({ filter, update: {}, flagArrs }));
  for(let i in files) {
    formData.append("imgs", files[i]);
  }
  await store.dispatch("Pd/update", formData);
}
</script>

<style>
</style>