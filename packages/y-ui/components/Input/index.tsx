import { getStyleAttributeValue } from "../../shared/utils";
import { computed, defineComponent, nextTick, onMounted, ref, watch } from "vue";
import './index.scss';

export default defineComponent({
    name: 'YInput',
    props: {
        value: [String],
        modelValue: [String],
        width: [Number, String],
        height: [Number, String]
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        const state = {
            width: 0,
            height: 0
        }
        const inputContentRef = ref<HTMLDivElement | null>(null);
        const inputRef = ref<HTMLDivElement | null>(null);
        const inputContentStyle = computed(() => {
            return {
                width: props.width ? props.width + 'px' : '100%',
                height: props.height ? props.height + 'px' : '30px'
            }
        })

        watch(() => [props.width, props.height], () => {
            initInputWidth()
        }, { deep: true })

        onMounted(() => {
            initInputWidth();
        })

        const initInputWidth = () => {
            inputContentRef.value!.style.flexGrow = props.width ? '0' : '1'
        }
        return () => (
            <div class="y-input-content">
                <div class="y-input-wrapper" ref={inputContentRef}>
                    <input
                        style={inputContentStyle.value}
                        placeholder="Please input"
                        class="input"
                        type="text"
                        value={props.value}
                        ref={inputRef}
                    />
                </div>

            </div>
        )
    }
})