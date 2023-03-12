export const editTdStat = (Element:HTMLDivElement) => {
    Element.style.height = "23.5px";
    Element.style.lineHeight = "23.5px";
    Element.className = "td-content td-ediit";
}

export const initTdStats = (Element: HTMLDivElement) => {
  Element.style.height = "100%";
  Element.style.lineHeight = "";
  Element.className = "td-content";
};



