export default {
  mounted(el, binding) {
    el.addEventListener("click", function (e) {
      let x = e.clientX - el.offsetLeft;
      let y = e.clientY - el.offsetTop;
      //在鼠标位置增加一个span标签
      let span = document.createElement("span");
      span.style.position = "absolute";
      span.style.background = binding.value || "rgba(150, 91, 91, .8)";
      span.style.opacity = '1';
      span.style.borderRadius = "50%";
      el.append(span);
      let width = 0;
      let height = 0;
      let opacity = 1;
      let max_length =
        Math.sqrt(
          el.offsetWidth * el.offsetWidth + el.offsetHeight * el.offsetHeight
        ) * 2;

      let time = setInterval(() => {
        width += 5;
        height += 5;
        opacity -= 0.01;
        //判断超出最大值时，清除定时，并且删除span
        if (width < max_length) {
          span.style.width = width + "px";
          span.style.height = height + "px";
          span.style.opacity = opacity+'';
          span.style.left = x - span.offsetWidth / 2 + "px";
          span.style.top = y - span.offsetHeight / 2 + "px";
        } else {
          clearInterval(time);
          time = null;
          span.remove();
        }
      }, 10);
    });
  },
};
