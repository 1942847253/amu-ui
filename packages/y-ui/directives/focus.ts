import { onClickOutside } from "@vueuse/core";

export default {
  mounted(el: HTMLElement) {
    let onSelectorInput = el.querySelector(".selector-input");
    let onSelectorMenu = el.querySelector(".selector-menu") as HTMLElement;
    const onInput = onSelectorInput!.querySelector(
      ".input"
    ) as HTMLInputElement;
    const onPlaceholder = onSelectorInput!.querySelector("label")!;
    const onIconfont = onSelectorInput!.querySelector("span")!;
    const readOnly = onInput.readOnly;

    const menuShow = () => {
      onSelectorMenu.style.transform = "scaleY(1)";
      readOnly && (onIconfont.style.transform = "rotate(-180deg)");
      onPlaceholder.style.display = "none";
      onIconfont.className = `iconfont ${
        readOnly ? "icon-xiangxia" : "icon-sousuo"
      }`;
    };

    const menuHide = () => {
      onSelectorMenu.style.transform = "scaleY(0)";
      onIconfont.className = "iconfont icon-xiangxia";
      onIconfont.style.transform = "rotate(0deg)";
      onInput.value.length === 0 && (onPlaceholder.style.display = "block");
    };

    onClickOutside(el, () => {
      menuHide();
    });

    onInput.addEventListener("input", () => {
      menuShow();
    });

    onInput.addEventListener(
      "focus",
      () => {
        menuShow();
      },
      false
    );
  },
};
