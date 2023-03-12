import { defineComponent } from "vue";

export default defineComponent({
  name: "ATabsPanel",
  props: ["key", "title"],
  setup(props, { slots }) {

    return () => (
      <div>
        {slots.default ? slots.default() : ''}
      </div>
    )
  }
});