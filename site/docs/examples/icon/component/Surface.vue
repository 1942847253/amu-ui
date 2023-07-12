<template>
  <div class="icon-content">
    <ul class="icon-list">
      <li v-for="icon in iconList">
        <a-icon @click="copyIcon(icon)" :name="icon"></a-icon>
        <div class="code-name">{{ icon }}</div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { AMessage } from "../../../../../packages/amu-ui";
const iconList = [
  "a-paihang",
  "a-geshishua",
  "a-jingbao",
  "a-huangguan",
  "a-vip",
  "a-jiangbei",
  "a-yuedu",
  "a-anquan",
  "a-anquan1",
  "a-daiban",
  "a-biaoqian",
  "a-dengpao",
  "a-gouwudai",
  "a-guangbo",
  "a-kapian",
  "a-gouwuche",
  "a-qianbao",
  "a-renyuanxinxi",
  "a-liwu",
  "a-shuqian",
  "a-riqi",
  "a-shangchuan",
  "a-bofang",
  "a-quanjia",
  "a-cha",
  "a-zanting",
  "a-jinggao",
  "a-biaoqing",
  "a-biyan",
  "a-dingwei",
  "a-gengduo",
  "a-fenxiang",
  "a-jiantouxiangxia",
  "a-lingdang",
  "a-fanhui",
  "a-shijian",
  "a-qian",
  "a-suo",
  "a-saoma",
  "a-shezhi",
  "a-qun",
  "a-taiyang",
  "a-wenjian",
  "a-tongji",
  "a-xiazai",
  "a-xiangyou",
  "a-mubiao",
  "a-xiangxia",
  "a-xiangji",
  "a-youjian",
  "a-yanjing",
  "a-tianxie",
  "a-xin",
  "a-tuichu",
  "a-wenjianjiakai",
  "a-wenjianjiaguan",
  "a-wenjianjiajia",
  "a-xiangzuo",
  "a-yiwen",
  "a-wujiaoxing",
  "a-yueliang",
  "a-yingyong",
  "a-xiangshang",
  "a-xiugai",
  "a-zhuye",
  "a-tupian",
  "a-zhuce"
];;
const copyIcon = (icon: string) => {
  const iconTemplate = `<a-icon name="${icon}" />`;
  navigator.clipboard
    .writeText(iconTemplate)
    .then(() => {
      AMessage.success({
        message: `已复制到剪切板`,
      });
    })
    .catch((error) => {
      AMessage.success({
        message: `复制到剪贴板时出错`,
      });
    });
};
</script>

<style lang="less" scoped>
.icon-list {
  width: 100% !important;
  overflow: hidden;
  *zoom: 1;
  display: flex;
  flex-wrap: wrap;
  padding-inline-start: 0px;
  li {
    width: 130px;
    padding: 16px;
    margin-bottom: -1px;
    margin-right: -1px;
    text-align: center;
    list-style: none !important;
    cursor: default;
    border: 1px solid #e8e8e888;
    .icon {
      cursor: pointer;
      display: block;
      height: 64px;
      line-height: 64px;
      font-size: 30px;
      margin: 0px auto 10px;
      color: #1e2025;
      transition: font-size 0.3s ease-in-out, width 0.3s ease-in-out;
      transition: color 0.3s ease-in-out, width 0.3s ease-in-out;
    }
    .icon:hover {
      font-size: 50px;
      color: #0468dc;
    }
    .svg-icon {
      /* 通过设置 font-size 来改变图标大小 */
      width: 1em;
      /* 图标和文字相邻时，垂直对齐 */
      vertical-align: -0.15em;
      /* 通过设置 color 来改变 SVG 的颜色/fill */
      fill: currentColor;
      /* path 和 stroke 溢出 viewBox 部分在 IE 下会显示
      normalize.css 中也包含这行 */
      overflow: hidden;
    }
    .code-name {
      line-height: 1.2;
      font-size: 10px;
    }
  }
}
</style>
