import $bus from "../../bus/bus";
import {
  DefineComponent,
  defineComponent,
  onBeforeMount,
  onBeforeUnmount,
  provide,
  ref,
} from "vue";
import "./style/index.less";

export enum EAction {
  OPEN = "open",
  CLOSE = "close",
}

export enum EventName {
  UPDATE_MODEL_VALUE = "update-modelValue",
}

export default defineComponent({
  name: "ACollapse",
  props: {
    modelValue: {
      type: [Array<string>, String],
      default: [],
    },
    accordion: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit, slots }) {
    const panels = slots.default!() as any;
    const currentName = ref("");
    console.log('test');
    
    onBeforeMount(() => {
      initEvent();
    });

    onBeforeUnmount(() => {
      $bus.$off(EventName.UPDATE_MODEL_VALUE);
    });

    const initEvent = () => {
      $bus.$on(EventName.UPDATE_MODEL_VALUE, updataValue);
    };

    const updataValue = (flag: string, value: string | []) => {
      let result: string | string[] = [];
      if (Array.isArray(props.modelValue)) {
        switch (flag) {
          case EAction.OPEN:
            result = [...new Set([...props.modelValue, ...value])];
            break;
          case EAction.CLOSE:
            result = props.modelValue;
            result.forEach((item, index) => {
              if (item === value) {
                (result as []).splice(index, 1);
              }
            });
            break;
        }
      } else {
        result = value;
        props.accordion && (currentName.value = value as string);
      }
      emit("update:modelValue", result);
    };

    provide("model-value", props.modelValue);
    provide("accordion", props.accordion);
    
    return () => (
      <div class="a-collapse-content">
        {panels.map((panelComponent: DefineComponent) => {
          return <panelComponent currentName={currentName.value} />;
        })}
      </div>
    );
  },
});
