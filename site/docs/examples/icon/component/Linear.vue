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
  "a-jingbao",
  "a-yifu",
  "a-jiangbei",
  "a-shuju",
  "a-paihang",
  "a-huangguan",
  "a-vip",
  "a-geshishua",
  "a-dengpao",
  "a-yuedu",
  "a-anquan",
  "a-daiban",
  "a-biaoqian",
  "a-anquan1",
  "a-guangbo",
  "a-kapian",
  "a-gouwudai",
  "a-gouwuche",
  "a-qianbao",
  "a-liwu",
  "a-shuqian",
  "a-nan",
  "a-nv",
  "a-riqi",
  "a-renyuanxinxi",
  "a-zuoxuanzhuan",
  "a-caidan",
  "a-zhankai",
  "a-shouqi",
  "a-xiexian",
  "a-daima",
  "a-kaobei",
  "a-biaoqing",
  "a-fanhui",
  "a-dingwei",
  "a-cha",
  "a-gengduo",
  "a-bofang",
  "a-fenxiang",
  "a-gou1",
  "a-jiahao",
  "a-jianhao",
  "a-gou2",
  "a-jiantouxiangxia",
  "a-guanji",
  "a-biyan",
  "a-jiazai",
  "a-lingdang",
  "a-mubiao",
  "a-jinggao",
  "a-quanjia",
  "a-quancha",
  "a-quanxiangyou",
  "a-quanxiangzuo",
  "a-quangou",
  "a-pinglun",
  "a-saoma",
  "a-qian",
  "a-shanchu",
  "a-qun",
  "a-shezhi",
  "a-shijian",
  "a-sousuo",
  "a-shangchuan",
  "a-shangchuan1",
  "a-taiyang",
  "a-tupian",
  "a-tishi",
  "a-tianxie",
  "a-touxiang1",
  "a-shuaxin1",
  "a-touxiang2",
  "a-tongji",
  "a-wenjianjiajia",
  "a-wenjianjiaguan",
  "a-wenjian",
  "a-fangda1",
  "a-suoxiao1",
  "a-fangda",
  "a-suoxiao",
  "a-xiangshang",
  "a-wenjianjiakai",
  "a-shuaxin",
  "a-xiangzuo",
  "a-xiangxia",
  "a-xiazai1",
  "a-suo",
  "a-xiazai",
  "a-a-xiangxia2",
  "a-wujiaoxing",
  "a-xin",
  "a-a-xiangshang2",
  "a-xinxi",
  "a-xiangyou",
  "a-tuichu",
  "a-yanjing",
  "a-yingyong",
  "a-xiangji",
  "a-xiugai",
  "a-youxuanzhuan",
  "a-zan",
  "a-youjian",
  "a-zhuce",
  "a-yueliang",
  "a-zhuce2",
  "a-zanting",
  "a-yiwen",
  "a-zhuye",
];
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
