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
  "3column",
  "column-4",
  "add",
  "add-circle",
  "adjust",
  "arrow-up-circle",
  "arrow-right-circle",
  "arrow-down",
  "ashbin",
  "arrow-right",
  "browse",
  "bottom",
  "back",
  "bad",
  "arrow-double-left",
  "arrow-left-circle",
  "arrow-double-right",
  "caps-lock",
  "camera",
  "chart-bar",
  "attachment",
  "code",
  "close",
  "check-item",
  "calendar",
  "comment",
  "column-vertical",
  "column-horizontal",
  "complete",
  "chart-pie",
  "cry",
  "customer-service",
  "delete",
  "direction-down",
  "copy",
  "cut",
  "data-view",
  "direction-down-circle",
  "direction-right",
  "direction-up",
  "discount",
  "direction-left",
  "download",
  "electronics",
  "drag",
  "elipsis",
  "export",
  "explain",
  "edit",
  "eye-close",
  "email",
  "error",
  "favorite",
  "file-common",
  "file-delete",
  "file-add",
  "film",
  "fabulous",
  "file",
  "folder-close",
  "filter",
  "good",
  "hide",
  "home",
  "history",
  "file-open",
  "forward",
  "import",
  "image-text",
  "keyboard-26",
  "keyboard-9",
  "link",
  "layout",
  "fullscreen-shrink",
  "layers",
  "lock",
  "fullscreen-expand",
  "map",
  "meh",
  "menu",
  "loading",
  "help",
  "minus-circle",
  "modular",
  "notification",
  "mic",
  "more",
  "pad",
  "operation",
  "play",
  "print",
  "mobile-phone",
  "minus",
  "navigation",
  "pdf",
  "prompt",
  "move",
  "refresh",
  "run-up",
  "picture",
  "run-in",
  "pin",
  "save",
  "search",
  "share",
  "scanning",
  "security",
  "sign-out",
  "select",
  "stop",
  "success",
  "smile",
  "switch",
  "setting",
  "survey",
  "task",
  "skip",
  "text",
  "time",
  "telephone-out",
  "toggle-left",
  "toggle-right",
  "telephone",
  "top",
  "unlock",
  "user",
  "upload",
  "work",
  "training",
  "warning",
  "zoom-in",
  "zoom-out",
  "add-bold",
  "arrow-left-bold",
  "arrow-up-bold",
  "close-bold",
  "arrow-down-bold",
  "minus-bold",
  "arrow-right-bold",
  "select-bold"
]
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
    width: 138px;
    padding: 16px;
    margin-bottom: -1px;
    margin-right: -1px;
    text-align: center;
    list-style: none !important;
    cursor: default;
    border: 1px solid #e8e8e888;
    .iconfont {
      cursor: pointer;
      display: block;
      height: 64px;
      line-height: 64px;
      font-size: 35px;
      margin: 0px auto 10px;
      color: #1e2025;
      transition: font-size 0.3s ease-in-out, width 0.3s ease-in-out !important;
      transition: color 0.3s ease-in-out, width 0.3s ease-in-out;
    }
    .iconfont:hover {
      font-size: 55px;
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
