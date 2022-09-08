import { onClickOutside } from "@vueuse/core";

export default {
  mounted(el: HTMLElement) {
    let menuChildHeight = 0;
    let onSelectorInput = el.querySelector(".selector-input");
    let onSelectorMenu = el.querySelector(".selector-menu") as HTMLElement;
    const onInput = onSelectorInput!.querySelector(
      ".input"
    ) as HTMLInputElement;
    const onPlaceholder = onSelectorInput!.querySelector("label")!;
    const onIconfont = onSelectorInput!.querySelector("span")!;
    const readOnly = onInput.readOnly;

    const menuShow = () => {
      let menuChild = onSelectorMenu.querySelectorAll(
        ".menu-item"
      ) as NodeListOf<HTMLDivElement>;
      if (!menuChild[0] || !menuChild[0].offsetHeight) {
        onSelectorMenu.style.height = 35 + "px";
       return
      }else{
        
      }
      menuChildHeight = menuChild[0].offsetHeight * menuChild.length;
      // onSelectorMenu.style.height = 285 + "px";
      if (menuChildHeight > 185) {
        onSelectorMenu.style.height = 185 + "px";
        onSelectorMenu.style.overflowY = "scroll";
      } else {
        onSelectorMenu.style.height = menuChildHeight + "px";
        onSelectorMenu.style.overflowY = "hidden";
      }
      readOnly && (onIconfont.style.transform = "rotate(-180deg)");
      onPlaceholder.style.display = "none";
      onIconfont.className = `iconfont ${
        readOnly ? "icon-xiangxia" : "icon-sousuo"
      }`;
    };

    const menuHide = () => {
      onSelectorMenu.style.height = "0";
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
