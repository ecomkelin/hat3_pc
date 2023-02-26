<template>
  <div style="padding: 10px; border: 1px solid black;">
    <div style="margin-bottom: 10px"> 点击按钮 选择批量上传 的产品 excel</div>
    <input type="file" ref="fileInput" @change="handleChangeIpt" />
  </div>
</template>

<script>
import { ref } from "vue-demi";
import * as XLSX from "xlsx";
import { useStore } from "vuex";

export default {
  name: "PdMany",
  setup() {
    const store = useStore();
    const fileInput = ref(null);

    // 读取 Excel 文件
    const reader = new FileReader();
    const handleChangeIpt = () => {
      const file = fileInput.value.files[0];

      reader.onload = async (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });

        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        let documents = [];
        for (let iRow = 0; iRow < jsonData.length; iRow++) {
          if (iRow < 1) continue;
          //   if(iRow === 3) break;
          const number = jsonData[iRow]["欧米兰产品上传"]; // 序号
          const code = jsonData[iRow].__EMPTY_1 || ""; // 如果 name 列的值为 null 或 undefined，则将其设置为空字符串
          const document = {
            code,
            name: jsonData[iRow].__EMPTY_2 || "",
            Skus: [
              {
                price_sale: jsonData[iRow].__EMPTY_3 || "",
                price_retail: jsonData[iRow].__EMPTY_4 || "",
              },
            ],
            desc: jsonData[iRow].__EMPTY_5 || "",
            number,
          };
          documents.push(document);
          if (documents.length % 100 === 0) {
            try {
              await store.dispatch("Pd/insertMany", documents);
            } catch (e) {
              const alertMsg = `${number - 100} - ${number} 之间存在错误: ${e}`;
              alert(alertMsg);
              break;
            }
            documents = [];
          }
        }
        if (documents.length > 0) {
          await store.dispatch("Pd/insertMany", documents);
        }
        documents = [];
      };
      reader.readAsBinaryString(file);
    };

    return {
      fileInput,

      handleChangeIpt,
    };
  },
};
</script>