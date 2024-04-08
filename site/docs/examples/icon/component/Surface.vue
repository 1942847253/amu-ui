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
"arrow-up-filling",
  "arrow-down-filling",
  "arrow-left-filling",
  "arrow-right-filling",
  "caps-unlock-filling",
  "comment-filling",
  "check-item-filling",
  "clock-filling",
  "delete-filling",
  "decline-filling",
  "dynamic-filling",
  "intermediate-filling",
  "favorite-filling",
  "layout-filling",
  "help-filling",
  "history-filling",
  "filter-filling",
  "file-common-filling",
  "news-filling",
  "edit-filling",
  "fullscreen-expand-filling",
  "smile-filling",
  "rise-filling",
  "picture-filling",
  "notification-filling",
  "user-filling",
  "setting-filling",
  "switch-filling",
  "work-filling",
  "task-filling",
  "success-filling",
  "warning-filling",
  "folder-filling",
  "map-filling",
  "prompt-filling",
  "meh-filling",
  "cry-filling",
  "top-filling",
  "home-filling",
  "sorting"
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
  display: flex;
  flex-wrap: wrap;
  padding-inline-start: 0px;
  li {
    width: 138px;
    padding: 16px;
    margin-bottom: -1px;
    margin-right: -1px;
    text-align: center;
    list-style: none !important;
    cursor: default;
    border: 1px solid var(--a-border-color);
    border-bottom: none;
    .iconfont {
      cursor: pointer;
      display: block;
      height: 64px;
      line-height: 64px;
      font-size: 35px;
      margin: 0px auto 10px;
      color: var(--a-text-color);
      transition: color 0.3s, width 0.3s,font-size 0.3s, width 0.3s !important;
    }
    .iconfont:hover {
      font-size: 55px;
      color: var(--a-primary-color);
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
