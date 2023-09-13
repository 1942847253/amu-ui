
import { defineComponent } from "vue";
import "./style/index.less";
export default defineComponent({
  name: "AIcon",
  props: {
    name: {
      type: String,
      defalut: "amu-amudesign",
    },
  },
  setup(props) {
    return () => (
      <span class={`iconfont icon-${props.name}`}></span>
    )
  },
});
