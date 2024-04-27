<template>
  <ATable class="vp-raw" :data="tableData.tBody" :columns="tableData.tHead">
  </ATable>
</template>

<script lang="ts" setup>
import { ref, h } from "vue";
import { AButton, AMessage } from "amu-ui";

const tableData = ref({
  tHead: [
    {
      key: "id",
      title: "学号",

    },
    {
      key: "name",
      title: "姓名",

      render(row) {
        return h(
          AButton,
          {
            size: 'small',
            type: 'success',
          },
          {
            default: () => row.name
          }
        )
      }
    },
    {
      key: "age",
      title: "年龄",
    },
    {
      key: "chinese",
      title: "语文",
    },
    {
      key: "math",
      title: "数学",
    },

    {
      key: "english",
      title: "英语",
    },
    {
      key: "operation",
      title: "操作",
      width: 100,
      render(row) {
        return h(
          AButton,
          {
            size: 'small',
            type: 'info',
            onClick: () => play(row)
          },
          {
            default: () => 'Play'
          }
        )
      }
    },
  ],
  tBody: [
    {
      id: 1,
      name: "Yjj",
      age: 21,
      chinese: 121,
      math: 90,
      english: 138,
    },
    {
      id: 2,
      name: "嘿毛",
      age: 20,
      chinese: 111,
      math: 32,
      english: 43,
    },
    {
      id: 3,
      name: "big龙",
      age: 19,
      chinese: 44,
      math: 21,
      english: 11,
    },
    {
      id: 4,
      name: "嫖瓜",
      age: 21,
      chinese: 80,
      math: 40,
      english: 45,
    }
  ]
}) as any;

const play = (row) => {
  AMessage.message({
    message: row
  })
}
</script>
