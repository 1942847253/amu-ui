<template>
  <ATable
    class="vp-raw"
    style="max-width: max-content"
    max-height="350px"
    :data="tableData.tBody"
    :columns="tableData.tHead"
  ></ATable>
</template>

<script lang="ts" setup>
import { ref, h } from "vue";
import { AButton } from "amu-ui";

const tableData = ref({
  tHead: [
    {
      key: "id",
      title: "ID",
    },
    {
      key: "name",
      title: "商品名称",
    },
    {
      key: "brand",
      title: "品牌",
      render(row) {
        return h(
          AButton,
          {
            size: "small",
            type: "success",
          },
          {
            default: () => row.brand,
          }
        );
      },
    },
    {
      key: "price",
      title: "价格",
    },
    {
      key: "description",
      title: "描述",
    },
    {
      key: "operation",
      title: "操作",

      render() {
        return h(
          AButton,
          {
            size: "small",
            type: "error",
          },
          {
            default: () => "删除",
          }
        );
      },
    },
  ],
  tBody: [
    {
      id: 1,
      name: "iPhone 13",
      price: 899,
      quantity: 100,
      category: "手机",
      brand: "Apple",
      description: "全新款iPhone 13，性能更强，摄像头更出色。",
      rating: 4.8,
      availability: "有货",
      dateAdded: "2024-04-22",
    },
    {
      id: 2,
      name: "Galaxy S25",
      price: 799,
      quantity: 80,
      category: "手机",
      brand: "Samsung",
      description: "三星最新的Galaxy S系列旗舰手机，性能卓越。",
      rating: 4.7,
      availability: "有货",
      dateAdded: "2024-04-20",
    },
    {
      id: 3,
      name: "MacBook Pro 2024",
      price: 1999,
      quantity: 50,
      category: "笔记本电脑",
      brand: "Apple",
      description: "全新款MacBook Pro，更轻薄，性能更强大。",
      rating: 4.9,
      availability: "有货",
      dateAdded: "2024-04-18",
    },
    {
      id: 4,
      name: "Pixel 6",
      price: 699,
      quantity: 120,
      category: "手机",
      brand: "Google",
      description: "谷歌最新推出的Pixel 6，拍照更出色，操作更流畅。",
      rating: 4.6,
      availability: "有货",
      dateAdded: "2024-04-16",
    },
    {
      id: 5,
      name: "ThinkPad X1 Carbon",
      price: 1599,
      quantity: 40,
      category: "笔记本电脑",
      brand: "Lenovo",
      description: "联想旗下顶级商务笔记本，轻薄便携，性能稳定。",
      rating: 4.7,
      availability: "有货",
      dateAdded: "2024-04-14",
    },
    {
      id: 6,
      name: "Sony PlayStation 6",
      price: 499,
      quantity: 200,
      category: "游戏机",
      brand: "Sony",
      description: "索尼最新一代游戏机，性能强劲，游戏体验更佳。",
      rating: 4.8,
      availability: "有货",
      dateAdded: "2024-04-12",
    },
    {
      id: 7,
      name: "Surface Pro 8",
      price: 1299,
      quantity: 60,
      category: "平板电脑",
      brand: "Microsoft",
      description: "微软Surface Pro系列的最新款，性能升级。",
      rating: 4.7,
      availability: "有货",
      dateAdded: "2024-04-10",
    },
    {
      id: 8,
      name: "AirPods Pro",
      price: 249,
      quantity: 150,
      category: "耳机",
      brand: "Apple",
      description: "苹果AirPods Pro，主动降噪，音质卓越。",
      rating: 4.6,
      availability: "有货",
      dateAdded: "2024-04-08",
    },
    {
      id: 9,
      name: "Surface Laptop 5",
      price: 1199,
      quantity: 70,
      category: "笔记本电脑",
      brand: "Microsoft",
      description: "微软Surface Laptop系列的最新款，轻薄便携。",
      rating: 4.5,
      availability: "有货",
      dateAdded: "2024-04-06",
    },
    {
      id: 10,
      name: "LG OLED C2",
      price: 1999,
      quantity: 30,
      category: "电视",
      brand: "LG",
      description: "LG OLED C2系列电视，画质惊艳，影音体验一流。",
      rating: 4.9,
      availability: "有货",
      dateAdded: "2024-04-04",
    },
    {
      id: 11,
      name: "Xbox Series Z",
      price: 599,
      quantity: 80,
      category: "游戏机",
      brand: "Microsoft",
      description: "微软Xbox最新一代游戏机，性能强劲。",
      rating: 4.8,
      availability: "有货",
      dateAdded: "2024-04-02",
    },
    {
      id: 12,
      name: "Kindle Oasis 2024",
      price: 299,
      quantity: 100,
      category: "电子书阅读器",
      brand: "Amazon",
      description: "亚马逊Kindle Oasis系列的最新款，阅读体验更佳。",
      rating: 4.7,
      availability: "有货",
      dateAdded: "2024-03-31",
    },
  ],
}) as any;
</script>
